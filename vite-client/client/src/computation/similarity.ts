import { SimilarityMeasure } from "@/components/SimilaritySelection";
import { ReportData } from "@/types/Report";

export function getSimilarLPMs(report: ReportData, side: number, lpmIdx: number, threshold: number, similarityMeasure: SimilarityMeasure) {
    const similarityData = report.similarity?.[similarityMeasure];

    const similarityMatrix =
          typeof similarityData === 'object' ? similarityData.matrix : undefined;

    if (!similarityMatrix) {
        return [];
    }

    const similarityVals = side === 1 ? similarityMatrix?.[lpmIdx] : similarityMatrix?.map(row => row[lpmIdx]);
    
    if (!similarityVals) return [];

    const lpms = side === 1 ? report.lpms_b : report.lpms_a;

    const mostSimilar = similarityVals
        .map((similarity, idx) => ({ lpm_id: lpms[idx].id, name: lpms[idx].name, similarity }))
        .filter(sim => sim.similarity >= threshold)
        .sort((a, b) => b.similarity - a.similarity);

    return mostSimilar;
}