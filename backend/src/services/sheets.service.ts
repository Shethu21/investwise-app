import { google } from 'googleapis';
import { ENV } from '../config/env.js';
import { AdvisorSubmissionInput } from '../types/index.js';

export class SheetsService {
  static async appendSubmission(data: AdvisorSubmissionInput, isVerified = false): Promise<void> {
    if (!ENV.GOOGLE_SHEET_ID || !ENV.GOOGLE_SERVICE_ACCOUNT_EMAIL || !ENV.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets integration is not configured');
      return;
    }

    try {
      const formattedPrivateKey = ENV.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
      const auth = new google.auth.JWT({
        email: ENV.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: formattedPrivateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const rowValues = [
        data.fullName,
        data.email,
        data.age,
        data.amount,
        data.currency,
        data.riskAppetite,
        data.goal,
        data.timeline,
        data.hasInvestedBefore,
        data.industryPreference,
        data.detailedReport ? 'Yes' : 'No',
        new Date().toISOString(),
        isVerified ? 'Verified' : 'Pending Verification',
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: ENV.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:M',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowValues],
        },
      });

      console.log(`User submission appended to Google Sheet ID: ${ENV.GOOGLE_SHEET_ID}`);
    } catch (error) {
      console.error('Error appending to Google Sheets:', error);
    }
  }
}
