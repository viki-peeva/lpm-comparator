from .conformance_computation import compute_conformance_measures, compute_conformance_measures_multi_processing, compute_coverage, compute_coverage_multi_processing
from .similarity_computation import compute_similarity_measures
from .aggregation import get_evaluation_measures
from typing import List, Optional, Tuple
from .lpm import LPMSet
import json
from file_storage import save_computations
import concurrent.futures
import time

def calculate_report(
    set_a: LPMSet,
    set_b: LPMSet,
    event_log: Optional[List[Tuple[str]]],
    session_id: str,
    pipeline: Optional[bool] = False
):
    # Create a dictionary to store the results of the comparison
    report = {}
    if not pipeline:
        yield f"data: {json.dumps({'state': 'IN_PROGRESS', 'message': 'Computing similarity...'})}\n\n"
    similarity_report, matchings = compute_similarity_measures(set_a, set_b)

    report["similarity"] = similarity_report
    print("Computed similarity measures")

    if event_log is not None:
        if not pipeline:
            yield f"data: {json.dumps({'state': 'IN_PROGRESS', 'message': 'Computing coverage...'})}\n\n"
        if len(set_a.lpms) > 10 or len(set_b.lpms) > 10:
            #Use multiprocessing
            print("Using multiprocessing")
            with concurrent.futures.ProcessPoolExecutor() as executor:
                start_coverage_time = time.time()
                report["coverage"], masks, variants = compute_coverage_multi_processing(set_a, set_b, event_log, executor)
                time_coverage = time.time() - start_coverage_time
                print(f"Computed coverage in {time_coverage} seconds")

                if not pipeline:
                    yield f"data: {json.dumps({'state': 'IN_PROGRESS', 'message': 'Computing conformance...'})}\n\n"

                start_conformance_time = time.time()
                compute_conformance_measures_multi_processing(set_a, set_b, event_log, executor)
            time_conformance = time.time() - start_conformance_time
            print(f"Computed conformance measures in {time_conformance} seconds")
        else: 
            start_coverage_time = time.time()
            report["coverage"], masks, variants = compute_coverage(set_a, set_b, event_log)
            time_coverage = time.time() - start_coverage_time
            print("Computed coverage")

            if not pipeline:
                yield f"data: {json.dumps({'state': 'IN_PROGRESS', 'message': 'Computing conformance...'})}\n\n"
            
            start_conformance_time = time.time()
            compute_conformance_measures(set_a, set_b, event_log)
            time_conformance = time.time() - start_conformance_time
            print("Computed conformance measures")

        if not pipeline:
            yield f"data: {json.dumps({'state': 'IN_PROGRESS', 'message': 'Computing aggregations...'})}\n\n"
        
        report["fitness_evaluation"] = get_evaluation_measures(set_a, set_b, matchings, measure="fitness")
        report["precision_evaluation"] = get_evaluation_measures(set_a, set_b, matchings, measure="precision")
        print("Computed aggregations")

        lpms_a = []
        lpms_b = []
        for i, lpm in enumerate(set_a.lpms):
            lpms_a.append({
                "id": lpm.id,
                "name": lpm.name,
                "fitness": lpm.get_fitness(),
                "precision": lpm.get_precision(),
                "coverage": lpm.get_coverage(),
                "index": i
            })
        for i, lpm in enumerate(set_b.lpms):
            lpms_b.append({
                "id": lpm.id,
                "name": lpm.name,
                "fitness": lpm.get_fitness(),
                "precision": lpm.get_precision(),
                "coverage": lpm.get_coverage(),
                "index": i
            })
        report["lpms_a"] = lpms_a
        report["lpms_b"] = lpms_b
        #Event log only when needed (Too big)
        #report["event_log"] = event_log

    other_computations = {
        "masks": masks,
        "variants": variants,
    }
    if not pipeline:
        save_computations(session_id, set_a, set_b, event_log, other_computations, report)
        yield f"data: {json.dumps({'state': 'COMPLETED', 'progress': 100, 'message': 'Task completed', 'report': report})}\n\n"
    #print(f"Report: {report}")


    if pipeline:   
        print(f"Time coverage: {time_coverage}")
        print(f"Time conformance: {time_conformance}")
        yield set_a, set_b, event_log, other_computations, report