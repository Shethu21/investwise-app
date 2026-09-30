import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { loginOtpSchema } from '../utils/validation.js';
import { OtpService } from '../services/otp.service.js';
import { EmailService } from '../services/email.service.js';

export class AuthController {
  static async loginOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = loginOtpSchema.parse(req.body);
      
      const rawOtp = OtpService.generateOtp();
      const otpHash = OtpService.hashOtp(rawOtp);
      const otpExpiresAt = OtpService.getExpiryDate(5);

      const user = await prisma.user.upsert({
        where: { email },
        update: {
          otpHash,
          otpExpiresAt,
          otpAttempts: 0,
        },
        create: {
          email,
          fullName: 'InvestWise User',
          age: 30,
          amount: 5000,
          currency: 'USD',
          riskAppetite: 'Medium',
          timeline: '5 Years',
          goal: 'Wealth Growth',
          hasInvestedBefore: 'Yes',
          industryPreference: 'Technology',
          otpHash,
          otpExpiresAt,
          otpAttempts: 0,
        },
      });

      await EmailService.sendOtpEmail(user.email, user.fullName, rawOtp);

      res.status(200).json({
        status: 'success',
        message: 'Verification code sent to your email.',
      });
    } catch (error: any) {
      next(error);
    }
  }
}
