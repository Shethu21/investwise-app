import { AIRecommendationResponse, RecommendedInstrument } from '../types/index.js';

export function validateAndNormalizeRecommendation(rec: any): AIRecommendationResponse {
  if (!rec || typeof rec !== 'object') {
    throw new Error('AI output is not a valid object');
  }

  const riskClassification = typeof rec.riskClassification === 'string' ? rec.riskClassification : 'Medium Risk';
  const explanation = typeof rec.explanation === 'string' ? rec.explanation : 'Personalized AI analysis.';
  const strategy = typeof rec.strategy === 'string' ? rec.strategy : 'Balanced Growth Strategy';
  const risksAndOpportunities = typeof rec.risksAndOpportunities === 'string' ? rec.risksAndOpportunities : 'Standard market volatility applies.';
  const pdfUrl = typeof rec.pdfUrl === 'string' ? rec.pdfUrl : '';

  let trendingAssets: string[] = [];
  if (Array.isArray(rec.trendingAssets)) {
    trendingAssets = rec.trendingAssets.map((a: any) => String(a));
  } else {
    trendingAssets = ['US Equities', 'Global Bonds', 'Digital Innovation'];
  }

  if (!Array.isArray(rec.instruments) || rec.instruments.length === 0) {
    throw new Error('AI output must include an array of recommended instruments');
  }

  const rawInstruments: { name: string; type: string; rawAlloc: number }[] = [];
  let totalPct = 0;

  for (const inst of rec.instruments) {
    if (!inst.name || !inst.type) {
      throw new Error('Each instrument must have a name and type');
    }
    const allocStr = String(inst.allocation || '').replace(/%/g, '').trim();
    const allocNum = parseFloat(allocStr);
    const parsedAlloc = isNaN(allocNum) || allocNum < 0 ? 0 : allocNum;
    
    rawInstruments.push({
      name: String(inst.name),
      type: String(inst.type),
      rawAlloc: parsedAlloc,
    });
    totalPct += parsedAlloc;
  }

  // Normalize allocations to sum to 100% exactly
  const normalizedInstruments: RecommendedInstrument[] = [];
  let currentSum = 0;

  for (let i = 0; i < rawInstruments.length; i++) {
    const inst = rawInstruments[i];
    let allocated: number;
    if (i === rawInstruments.length - 1) {
      allocated = Math.round((100 - currentSum) * 10) / 10;
    } else {
      allocated = totalPct > 0 ? Math.round(((inst.rawAlloc / totalPct) * 100) * 10) / 10 : Math.round((100 / rawInstruments.length) * 10) / 10;
      currentSum += allocated;
    }

    normalizedInstruments.push({
      name: inst.name,
      type: inst.type,
      allocation: `${allocated}%`,
    });
  }

  return {
    riskClassification,
    explanation,
    strategy,
    instruments: normalizedInstruments,
    trendingAssets,
    risksAndOpportunities,
    pdfUrl,
  };
}
