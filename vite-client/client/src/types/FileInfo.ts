export interface FileInfo {
    name: string
    size: number
    type: string
    id: string
    file: File
  }

export interface BasicInfo {
    total_places: number;
    total_transitions: number;
    total_arcs: number;
  }
  
export interface SimilarityMeasures {
    trace_similarity: string;
    eventually_follows_similarity: string;
    trace_similarity_perfect: string;
    a_subset_b?: string;
}

export interface ConformanceMeasures {
    coverage_a?: string;
    coverage_b?: string;
    duplicate_coverage_a?: string;
    duplicate_coverage_b?: string;
}

export interface ReportData {
    basic: {
        lpms_a: BasicInfo;
        lpms_b: BasicInfo;
    };
    xes?: string;
    similarity?: SimilarityMeasures;
    conformance?: ConformanceMeasures;
}
