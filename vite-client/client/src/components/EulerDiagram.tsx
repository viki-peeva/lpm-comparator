import { ReportData } from '@/types/Report';
import { SimilarityMeasure } from '@/components/SimilaritySelection';
import { useEffect, useRef, useState } from 'react';
import { getDataForVennDiagram } from '@/computation/similarity';
import Chart from 'chart.js/auto';
import { EulerDiagramController, ArcSlice } from 'chartjs-chart-venn';

Chart.register(EulerDiagramController, ArcSlice);

export function EulerDiagram({
  report,
  similarityMeasure,
  threshold,
}: {
  report: ReportData;
  similarityMeasure: SimilarityMeasure;
  threshold: number;
}) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (chartRef.current) {
      const similarityData = report.similarity?.[similarityMeasure];
      const similarityMatrix =
        typeof similarityData === 'object' ? similarityData.matrix : undefined;

      if (!similarityMatrix) {
        setNoData(true);
        return;
      }

      const { numSetA, numIntersection, numSetB } = getDataForVennDiagram(
        similarityMatrix,
        threshold,
      );

      const chart = new Chart(chartRef.current, {
        type: 'euler',
        data: {
          labels: ['Set A', 'Set B'],
          datasets: [
            {
              label: 'Euler Diagram',
              data: [
                { sets: ['Set A'], value: numSetA },
                { sets: ['Set B'], value: numSetB },
                { sets: ['Set A', 'Set B'], value: numIntersection },
              ],
              backgroundColor: [
                'hsl(181, 97%, 38%)',
                'hsl(37, 94%, 54%)',
                'hsl(104.78 29.78% 55.88%)',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label(context) {
                  const label = context.label || '';
                  const value = (context.raw as { value: number }).value;
                  return `${label}: ${value}`;
                },
              },
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [threshold, similarityMeasure]);

  return (
    <>
      {noData ? (
        <div className="text-center h-full flex-col">
          <h3 className="my-auto font-bold">No Data to display</h3>
        </div>
      ) : (
        <canvas ref={chartRef} className="max-h-full max-w-full" />
      )}
    </>
  );
}
