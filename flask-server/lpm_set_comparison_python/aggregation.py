from lpm_set_comparison_python.lpm import LPMSet

def get_evaluation_measures(LPMs_a: LPMSet, LPMs_b: LPMSet, matchings, measure="fitness"):
    """
    Takes two sets of LPMs as an input and a measure on which to evaluate the LPMs.
    Returns a dictionary containing the results of the weighted harmonic mean, dominance counting and rank aggregation
    """
    aggregation_results = {}

    #Dominance counting
    aggregation_results["dominance_counting"] = {}
    for name, matching in matchings.items():
        results_dominance_counting, matching_with_ids = compute_dominance_counting(LPMs_a, LPMs_b, matching, measure)
        aggregation_results["dominance_counting"][name] = {
            "dom_count_a": results_dominance_counting[0],
            "dom_count_b": results_dominance_counting[1],
            "matching": matching_with_ids
        }

    #Rank aggregation
    results_rank_aggregation = compute_rank_aggregation(LPMs_a, LPMs_b, measure)

    aggregation_results["rank_aggregation"] = results_rank_aggregation

    return aggregation_results

def compute_dominance_counting(LPMs_a: LPMSet, LPMs_b: LPMSet, matching, measure = "fitness"):
    """
    Takes the two sets of LPMs and a matching as an input and a measure on which to compare the LPMs.
    Returns the number of LPMs that dominate the other set of LPMs in terms of the measure and vice versa.
    """
    dom_count_a = 0
    dom_count_b = 0
    matching_with_ids = []
    for matching_a, matching_b in matching:
        lpm_a = LPMs_a.lpms[matching_a]
        lpm_b = LPMs_b.lpms[matching_b]

        if lpm_a is None or lpm_b is None:
            continue

        if measure == "fitness":
            if lpm_a.get_fitness() > lpm_b.get_fitness():
                dom_count_a += 1
            elif lpm_a.get_fitness() < lpm_b.get_fitness():
                dom_count_b += 1
        elif measure == "precision":
            if lpm_a.get_precision() > lpm_b.get_precision():
                dom_count_a += 1
            elif lpm_a.get_precision() < lpm_b.get_precision():
                dom_count_b += 1
        matching_with_ids.append([lpm_a.id, lpm_b.id])

    return (dom_count_a, dom_count_b), matching_with_ids

def compute_rank_aggregation(LPMs_a: LPMSet, LPMs_b: LPMSet, measure = "fitness"):
    """
    Takes the two sets of LPMs as an input and a measure on which to compare the LPMs.
    First creates a ranking => Ordering the LPMs based on the measure. Then computes the rank sums for each set
    """
    LPMs_a.mark_belongs_to_set(0)
    LPMs_b.mark_belongs_to_set(1)

    all_lpms = LPMs_a.lpms + LPMs_b.lpms
    if measure == "fitness":
        all_lpms.sort(key=lambda x: x.get_fitness(), reverse=True)
    elif measure == "precision":
        all_lpms.sort(key=lambda x: x.get_precision(), reverse=True)
    else:
        return (0, 0)
    
    ranking_ids = []
    
    rank_sum_a = 0
    rank_sum_b = 0
    for i, lpm in enumerate(all_lpms):
        if lpm.belongs_to_set == 0:
            rank_sum_a += (i +1)
            ranking_ids.append({"side": 1, "id": lpm.id})
        else:
            rank_sum_b += (i+1)
            ranking_ids.append({"side": 2, "id": lpm.id})
    
    LPMs_a.unmark_belongs_to_set()
    LPMs_b.unmark_belongs_to_set()

    normalized_rank_sum_a = rank_sum_a / len(LPMs_a.lpms)
    normalized_rank_sum_b = rank_sum_b / len(LPMs_b.lpms)

    return {
        "rank_sum_a": rank_sum_a,
        "rank_sum_b": rank_sum_b,
        "normalized_rank_sum_a": normalized_rank_sum_a,
        "normalized_rank_sum_b": normalized_rank_sum_b,
        "ranking_ids": ranking_ids
    }