import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { advisorSubmissionSchema, verifyOtpSchema, resendOtpSchema } from '../utils/validation.js';
import { OtpService } from '../services/otp.service.js';
import { EmailService } from '../services/email.service.js';
import { SheetsService } from '../services/sheets.service.js';
import { AIService } from '../services/ai.service.js';

export class AdvisorController {
  static async submit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedInput = advisorSubmissionSchema.parse(req.body);
      const rawOtp = OtpService.generateOtp();
      const otpHash = OtpService.hashOtp(rawOtp);
      const otpExpiresAt = OtpService.getExpiryDate(5);

      const user = await prisma.user.upsert({
        where: { email: parsedInput.email },
        update: {
          fullName: parsedInput.fullName,
          age: parsedInput.age,
          amount: parsedInput.amount,
          currency: parsedInput.currency,
          riskAppetite: parsedInput.riskAppetite,
          timeline: parsedInput.timeline,
          goal: parsedInput.goal,
          hasInvestedBefore: parsedInput.hasInvestedBefore,
          industryPreference: parsedInput.industryPreference,
          detailedReport: parsedInput.detailedReport ?? true,
          otpHash,
          otpExpiresAt,
          otpAttempts: 0,
          isVerified: false,
        },
        create: {
          fullName: parsedInput.fullName,
          email: parsedInput.email,
          age: parsedInput.age,
          amount: parsedInput.amount,
          currency: parsedInput.currency,
          riskAppetite: parsedInput.riskAppetite,
          timeline: parsedInput.timeline,
          goal: parsedInput.goal,
          hasInvestedBefore: parsedInput.hasInvestedBefore,
          industryPreference: parsedInput.industryPreference,
          detailedReport: parsedInput.detailedReport ?? true,
          otpHash,
          otpExpiresAt,
          otpAttempts: 0,
          isVerified: false,
        },
      });

      // Background async services
      SheetsService.appendSubmission(parsedInput, false).catch((err) =>
        console.error('Sheets logging error:', err)
      );

      await EmailService.sendOtpEmail(user.email, user.fullName, rawOtp);

      res.status(200).json({
        status: 'success',
        message: 'Verification code sent to your email.',
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = verifyOtpSchema.parse(req.body);

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(400).json({
          status: 'failed',
          message: 'No record found for this email address. Please submit your profile first.',
        });
        return;
      }

      if (!user.otpHash || !user.otpExpiresAt) {
        res.status(400).json({
          status: 'failed',
          message: 'No active OTP verification session. Please request a new code.',
        });
        return;
      }

      if (user.otpAttempts >= 5) {
        res.status(429).json({
          status: 'failed',
          message: 'Maximum verification attempts exceeded. Please request a new code.',
        });
        return;
      }

      if (new Date() > user.otpExpiresAt) {
        res.status(400).json({
          status: 'failed',
          message: 'Verification code has expired. Please request a new code.',
        });
        return;
      }

      const isValid = OtpService.verifyOtpHash(otp, user.otpHash);
      if (!isValid) {
        const updatedAttempts = user.otpAttempts + 1;
        await prisma.user.update({
          where: { email },
          data: { otpAttempts: updatedAttempts },
        });

        if (updatedAttempts >= 5) {
          res.status(429).json({
            status: 'failed',
            message: 'Maximum verification attempts exceeded. Please request a new code.',
          });
          return;
        }

        res.status(400).json({
          status: 'failed',
          message: 'Invalid verification code.',
        });
        return;
      }

      // Mark verified & clear OTP
      await prisma.user.update({
        where: { email },
        data: {
          isVerified: true,
          otpHash: null,
          otpExpiresAt: null,
          otpAttempts: 0,
        },
      });

      // Update Sheets status
      SheetsService.appendSubmission(
        {
          fullName: user.fullName,
          email: user.email,
          age: user.age,
          amount: user.amount,
          currency: user.currency,
          riskAppetite: user.riskAppetite as any,
          timeline: user.timeline as any,
          goal: user.goal,
          hasInvestedBefore: user.hasInvestedBefore as any,
          industryPreference: user.industryPreference,
          detailedReport: user.detailedReport,
        },
        true
      ).catch((err) => console.error('Sheets status update error:', err));

      // Generate AI Recommendation
      const recommendation = await AIService.generateRecommendation({
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        amount: user.amount,
        currency: user.currency,
        riskAppetite: user.riskAppetite as any,
        timeline: user.timeline as any,
        goal: user.goal,
        hasInvestedBefore: user.hasInvestedBefore as any,
        industryPreference: user.industryPreference,
        detailedReport: user.detailedReport,
      });

      // Save recommendation in DB
      await prisma.user.update({
        where: { email },
        data: {
          recommendationJson: JSON.stringify(recommendation),
        },
      });

      res.status(200).json({
        status: 'success',
        message: 'OTP verified successfully.',
        data: recommendation,
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = resendOtpSchema.parse(req.body);

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(400).json({
          status: 'failed',
          message: 'No profile found for this email.',
        });
        return;
      }

      const rawOtp = OtpService.generateOtp();
      const otpHash = OtpService.hashOtp(rawOtp);
      const otpExpiresAt = OtpService.getExpiryDate(5);

      await prisma.user.update({
        where: { email },
        data: {
          otpHash,
          otpExpiresAt,
          otpAttempts: 0,
        },
      });

      await EmailService.sendOtpEmail(user.email, user.fullName, rawOtp);

      res.status(200).json({
        status: 'success',
        message: 'A new verification code has been sent.',
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async sendReportMail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, reportData } = req.body;
      if (!email) {
        res.status(400).json({
          status: 'failed',
          message: 'Email address is required to send report.',
        });
        return;
      }

      const user = await prisma.user.findUnique({ where: { email } });
      const name = user?.fullName || 'Investor';

      await EmailService.sendReportEmail(email, name, reportData);

      res.status(200).json({
        status: 'success',
        message: 'Complete investment report sent to your email successfully!',
      });
    } catch (error: any) {
      next(error);
    }
  }
}
