import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST || 'localhost',
    port: ENV.SMTP_PORT,
    secure: ENV.SMTP_PORT === 465,
    auth: ENV.SMTP_USER && ENV.SMTP_PASSWORD ? {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASSWORD,
    } : undefined,
  });

  static async sendOtpEmail(toEmail: string, name: string, otp: string): Promise<void> {
    if (!ENV.SMTP_HOST || !ENV.SMTP_USER) {
      console.log(`\n==================================================`);
      console.log(`[DEV OTP NOTIFICATION] SMTP credentials not configured.`);
      console.log(`Recipient: ${toEmail} (${name})`);
      console.log(`Verification Passkey (OTP): ${otp}`);
      console.log(`Expires in: 5 minutes`);
      console.log(`==================================================\n`);
      return;
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0;">InvestWise AI</h2>
        <p style="color: #334155; font-size: 16px;">Hi ${name},</p>
        <p style="color: #334155; font-size: 15px;">Your verification code is:</p>
        <div style="background-color: #f1f5f9; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0;">
          <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #10b981;">${otp}</span>
        </div>
        <p style="color: #64748b; font-size: 13px;">This code expires in 5 minutes.</p>
        <p style="color: #64748b; font-size: 13px;">Do not share this code with anyone.</p>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: ENV.EMAIL_FROM,
        to: toEmail,
        subject: 'Your InvestWise AI Verification Code',
        html: htmlContent,
      });
      console.log(`Verification code email dispatched to ${toEmail}`);
    } catch (error) {
      console.error(`Failed to send email to ${toEmail}:`, error);
    }
  }

  static async sendReportEmail(toEmail: string, name: string, report: any): Promise<void> {
    if (!ENV.SMTP_HOST || !ENV.SMTP_USER) {
      console.log(`[DEV MODE] SMTP not configured. Skipped sending report to ${toEmail}`);
      return;
    }

    const instrumentsHtml = (report.instruments || []).map((inst: any) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-weight: bold; color: #0f172a;">${inst.name}</td>
        <td style="padding: 10px; color: #475569;">${inst.type}</td>
        <td style="padding: 10px; font-weight: bold; color: #10b981; text-align: right;">${inst.allocation}</td>
      </tr>
    `).join('');

    const trendingHtml = (report.trendingAssets || []).map((asset: string) => `
      <li style="margin-bottom: 6px; color: #334155;">${asset}</li>
    `).join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">InvestWise <span style="color: #10b981;">AI</span></h1>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 5px;">Personalized Investment Strategy Report</p>
        </div>

        <p style="color: #334155; font-size: 16px;">Hi <strong>${name || 'Investor'}</strong>,</p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">Here is your complete AI-generated investment advisory report, crafted specifically for your financial profile.</p>

        <!-- Risk Profile -->
        <div style="background-color: #f8fafc; border-left: 4px solid #10b981; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <h3 style="margin: 0 0 5px 0; color: #0f172a; font-size: 16px;">Risk Profile: <span style="color: #10b981;">${report.riskClassification || 'Balanced'}</span></h3>
          <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">${report.explanation || ''}</p>
        </div>

        <!-- Strategy -->
        <div style="margin: 20px 0;">
          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Recommended Executive Strategy</h3>
          <p style="color: #334155; font-size: 14px; line-height: 1.6;">${report.strategy || ''}</p>
        </div>

        <!-- Portfolio Allocation Table -->
        <div style="margin: 25px 0;">
          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Asset & Portfolio Allocation</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
            <thead>
              <tr style="background-color: #f1f5f9; text-align: left; color: #475569;">
                <th style="padding: 10px;">Instrument / Asset</th>
                <th style="padding: 10px;">Type</th>
                <th style="padding: 10px; text-align: right;">Allocation</th>
              </tr>
            </thead>
            <tbody>
              ${instrumentsHtml}
            </tbody>
          </table>
        </div>

        <!-- Trending Opportunities -->
        <div style="margin: 25px 0;">
          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Trending Market Opportunities</h3>
          <ul style="padding-left: 20px; font-size: 14px;">
            ${trendingHtml}
          </ul>
        </div>

        <!-- Risk Disclosure -->
        <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 15px; margin: 25px 0;">
          <h4 style="margin: 0 0 5px 0; color: #9f1239; font-size: 14px;">Risk Disclosure & Considerations</h4>
          <p style="margin: 0; color: #881337; font-size: 13px; line-height: 1.5;">${report.risksAndOpportunities || ''}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} InvestWise AI Advisory Platform. All rights reserved.</p>
        </div>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: ENV.EMAIL_FROM,
        to: toEmail,
        subject: '📄 Your InvestWise AI Investment Strategy Report',
        html: htmlContent,
      });
      console.log(`Full Investment Report dispatched to ${toEmail}`);
    } catch (error) {
      console.error(`Failed to dispatch report email to ${toEmail}:`, error);
      throw error;
    }
  }
}

