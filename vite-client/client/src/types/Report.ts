type pair = [number, number]

type similarityMatrix = number[][]

interface SimilarityMeasures {
    trace_similarity?: {
        overall: number;
        matrix: similarityMatrix;
    };
    eventually_follows_similarity?: {
        overall: number;
        matrix: similarityMatrix;
    };
    trace_similarity_perfect?: {
        overall: number;
        matrix: similarityMatrix;
    };
    a_subset_b?: boolean;
    b_subset_a?: boolean;
    matchings?: {
        leven_sym? : pair[];
        leven_asym_1? : pair[];
        leven_asym_2? : pair[];
    };
}

interface Aggregation {
    weighted_harmonic_mean?: pair;
    dominance_counting?: {
        leven_sym?: pair;
        leven_asym_1?: pair;
        leven_asym_2?: pair;
    };
    rank_aggregation?: {
        rank_sum_a?: number;
        rank_sum_b?: number;
        normalized_rank_sum_a?: number;
        normalized_rank_sum_b?: number;
    };
}

interface LocalProcessModel {
    name: string;
    fitness?: number;
    precision?: number;
    coverage?: number;
}

export interface ReportData {
    message?: string;
    similarity?: SimilarityMeasures;
    coverage?: {
        coverage_a: number;
        duplicate_coverage_a: number;
        coverage_b: number;
        duplicate_coverage_b: number;
        coverage_mask_a?: number[][];
        coverage_mask_b?: number[][];
        trace_coverages_a?: number[];
        trace_coverages_b?: number[];
    };
    fitness_aggregation?: Aggregation;
    precision_aggregation?: Aggregation;
    lpms_a: LocalProcessModel[];
    lpms_b: LocalProcessModel[];
    event_log?: string[][];
}