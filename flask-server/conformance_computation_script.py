import json
from pathlib import Path
import time
from lpm_set_comparison_python.conformance_computation import (
    compute_conformance_measures,
    compute_conformance_measures_multi_processing,
    compute_coverage_multi_processing
)
import concurrent.futures
from file_importer import convert_stored_pnml_files, convert_stored_xes_file
from lpm_set_comparison_python.lpm import LPMSet

CONFIG_FILE = 'pipeline/conformanceConfig.json'
OUTPUT_FILE = "pipeline/conformanceTimes.json"

def read_config(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: Config file '{file_path}' not found.")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

def save_times(times, output_file=OUTPUT_FILE):
    """
    Write the current times dictionary to the output file.
    """
    try:
        with open(output_file, "w") as file:
            json.dump(times, file)
    except Exception as e:
        print(f"Error saving times to file: {e}")

def main():
    # Read configurations
    print("Reading configurations...")
    config_data = read_config(CONFIG_FILE)
    if config_data is None:
        return
    configs = config_data.get("config", [])
    
    set_log_outputs = []
    for config in configs:
        print(f"Processing configuration: {config['output']}")
        path = Path(f"pipeline/lpm_sets/{config['lpm_path']}")
        pnml_files = list(path.glob('*.pnml')) + list(path.glob('*.apnml'))
        xes_file = Path(f"pipeline/event_logs/{config['event_log']}")
        lpms = convert_stored_pnml_files(pnml_files)
        traces = convert_stored_xes_file(xes_file)
        set_log_outputs.append((lpms, traces, config['output']))
    
    print("Configurations read successfully.")

    empty_lpm_set = LPMSet([])

    times = {}
    print("Starting multiprocessing...")
    with concurrent.futures.ProcessPoolExecutor() as executor:
        multiprocessing_times = {}
        
        for lpms, traces, output in set_log_outputs:
            print(f"(Multi Processing configuration: {output})")
            start_time = time.perf_counter()
            compute_conformance_measures_multi_processing(lpms, empty_lpm_set, traces, executor, use_TBR=True)
            multiprocessing_times[f"{output} - TBR"] = time.perf_counter() - start_time

            # Update output file after computing the TBR measure
            times["multiprocessing"] = multiprocessing_times
            save_times(times)

            start_time = time.perf_counter()
            compute_conformance_measures_multi_processing(lpms, empty_lpm_set, traces, executor, use_TBR=False)
            multiprocessing_times[f"{output} - Alignments"] = time.perf_counter() - start_time

            # Update output file after computing the Alignments measure
            times["multiprocessing"] = multiprocessing_times
            save_times(times)
        
        times["multiprocessing"] = multiprocessing_times

    single_processing_times = {}
    print("Starting single processing...")
    for lpms, traces, output in set_log_outputs:
        print(f"Processing configuration: {output}")
        start_time = time.perf_counter()
        compute_conformance_measures(lpms, empty_lpm_set, traces)
        single_processing_times[f"{output}"] = time.perf_counter() - start_time

        # Update output file after computing the single processing measure
        times["single_processing"] = single_processing_times
        save_times(times)
    
    times["single_processing"] = single_processing_times

    # Final save (optional, as each step has already been saved)
    save_times(times)

if __name__ == '__main__':
    print("Starting pipeline script...")
    main()
