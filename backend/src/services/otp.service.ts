import crypto from 'crypto';

export class OtpService {
  /**
   * Generates a 6-digit random numeric OTP string.
   */
  static generateOtp(): string {
    const num = crypto.randomInt(100000, 999999);
    return num.toString();
  }

  /**
   * Hashes the OTP using SHA-256.
   */
  static hashOtp(otp: string): string {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }

  /**
   * Verifies an OTP against a stored hash.
   */
  static verifyOtpHash(otp: string, storedHash: string): boolean {
    const computedHash = this.hashOtp(otp);
    return crypto.timingSafeEqual(Buffer.from(computedHash), Buffer.from(storedHash));
  }

  /**
   * Calculates the OTP expiration timestamp (5 minutes from now).
   */
  static getExpiryDate(minutes = 5): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
  }
}
