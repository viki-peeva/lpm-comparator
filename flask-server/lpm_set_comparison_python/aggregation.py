from lpm_set_comparison_python.lpm import LPMSet

def get_aggregated_measures(LPMs_a: LPMSet, LPMs_b: LPMSet):
    #Weighted Harmonic mean of fitness and precision
    results_weighted_harmonic_mean = compute_weighted_harmonic_mean(LPMs_a, LPMs_b)

    #Dominance counting
    results_dominance_counting = compute_dominance_counting(LPMs_a, LPMs_b)

    #Rank aggregation
    results_rank_aggregation = compute_rank_aggregation(LPMs_a, LPMs_b)

    return {
        "weighted_harmonic_mean": results_weighted_harmonic_mean,
        "dominance_counting": results_dominance_counting,
        "rank_aggregation": results_rank_aggregation
    }


def compute_weighted_harmonic_mean(LPMs_a: LPMSet, LPMs_b: LPMSet):
    pass

def compute_dominance_counting(LPMs_a: LPMSet, LPMs_b: LPMSet):
    pass

def compute_rank_aggregation(LPMs_a: LPMSet, LPMs_b: LPMSet):
    pass