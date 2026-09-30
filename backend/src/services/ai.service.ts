import Groq from 'groq-sdk';
import { ENV } from '../config/env.js';
import { AdvisorSubmissionInput, AIRecommendationResponse } from '../types/index.js';
import { validateAndNormalizeRecommendation } from '../utils/recommendation.js';

export class AIService {
  private static getClient(): Groq {
    if (!ENV.GROQ_API_KEY || ENV.GROQ_API_KEY.includes('placeholder')) {
      throw new Error(
        'GROQ_API_KEY is not configured on the backend server. Please provide a valid GROQ_API_KEY in backend/.env.'
      );
    }
    return new Groq({ apiKey: ENV.GROQ_API_KEY });
  }

  static async generateRecommendation(user: AdvisorSubmissionInput): Promise<AIRecommendationResponse> {
    const groqClient = this.getClient();

    const systemPrompt = `You are the recommendation engine for InvestWise AI.
Create an educational, personalized investment strategy based on the user's financial profile.

Return ONLY valid JSON using exactly this structure:
{
  "riskClassification": "string",
  "explanation": "string",
  "strategy": "string",
  "instruments": [
    {
      "name": "string",
      "type": "string",
      "allocation": "string"
    }
  ],
  "trendingAssets": ["string"],
  "risksAndOpportunities": "string"
}

Critical Rules:
1. The instruments allocations (percentages e.g. "40%", "30%", "20%", "10%") MUST total exactly 100%.
2. Provide at least 3-4 distinct instruments with explicit name, type, and allocation.
3. Explain the reasoning in simple, transparent language.
4. Do not promise profits or guaranteed performance.
5. Clearly describe relevant risks.
6. The output is educational information and not a guarantee of investment returns.
7. Return ONLY raw JSON without markdown code block formatting (no \`\`\`json).`;

    const userPrompt = `User Profile:
Name: ${user.fullName}
Age: ${user.age}
Investment Amount: ${user.amount} ${user.currency}
Risk Appetite: ${user.riskAppetite}
Investment Timeline: ${user.timeline}
Goal: ${user.goal}
Previous Investment Experience: ${user.hasInvestedBefore}
Industry Preference: ${user.industryPreference}`;

    try {
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        model: ENV.GROQ_MODEL,
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const responseText = completion.choices[0]?.message?.content || '';

      // Clean potential code block wrapping
      const cleanedJsonText = responseText
        .replace(/^```json\s*/, '')
        .replace(/^```\s*/, '')
        .replace(/\s*```$/, '')
        .trim();

      const parsed = JSON.parse(cleanedJsonText);
      const validatedRec = validateAndNormalizeRecommendation(parsed);
      validatedRec.pdfUrl = ''; // No fake PDF URL

      return validatedRec;
    } catch (error: any) {
      console.error('Groq AI Recommendation error:', error);
      throw new Error(`AI Recommendation Generation Failed: ${error.message || error}`);
    }
  }
}
