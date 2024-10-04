from .lpm import LPM, LPMSet
from typing import List, Callable
import numpy as np

def compute_trace_similarity(lpm_a: LPM, lpm_b: LPM):
    traces_a = lpm_a.get_traces()
    traces_b = lpm_b.get_traces()

    union_traces = traces_a.union(traces_b)
    intersection_traces = traces_a.intersection(traces_b)

    return len(intersection_traces) / len(union_traces)

def compute_eventually_follows_similarity(lpm_a: LPM, lpm_b: LPM):
    eventually_follows_a = lpm_a.get_eventually_follows_set()
    eventually_follows_b = lpm_b.get_eventually_follows_set()

    intersection_eventually_follows = eventually_follows_a.intersection(eventually_follows_b)

    denominator =  (len(eventually_follows_a) + len(eventually_follows_b))
    if denominator == 0:
        return 0

    return 2 * len(intersection_eventually_follows) / denominator

def compute_pairwise_similarity_measures(set_a: LPMSet, set_b: LPMSet, similarity_fn: Callable[[LPM, LPM], float]):
    similarity_matrix = []

    for lpm_a in set_a.lpms:
        row = []
        for lpm_b in set_b.lpms:
            trace_similarity = similarity_fn(lpm_a, lpm_b)
            row.append(trace_similarity)
        similarity_matrix.append(row)
    
    return similarity_matrix


def compute_similarity_measures(set_a: LPMSet, set_b: LPMSet):
    print(np.array(compute_pairwise_similarity_measures(set_a, set_b, compute_eventually_follows_similarity)))