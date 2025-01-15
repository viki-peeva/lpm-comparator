import { ReportData } from '@/types/Report';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  SimilarityMeasure,
  SimilaritySelection,
} from '@/components/SimilaritySelection';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import Chart from 'chart.js/auto';
import { EulerDiagramController, ArcSlice } from 'chartjs-chart-venn';
import { EulerDiagram } from '@/components/EulerDiagram';

Chart.register(EulerDiagramController, ArcSlice);

export function SetRelation({ report }: { report: ReportData }) {
  const [similarityMeasure, setSimilarityMeasure] = useState<SimilarityMeasure>(
    'trace_similarity' as SimilarityMeasure,
  );
  const [threshold, setThreshold] = useState(0.9);

  return (
    <Card className="h-[calc(100vh-8rem)] flex flex-col mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Euler Diagram</CardTitle>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-6">
            <SimilaritySelection
              similarityMeasure={similarityMeasure}
              setSimilarityMeasure={setSimilarityMeasure}
            />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 mb-2">
                Threshold:{threshold.toFixed(2)}
              </span>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[threshold]}
                onValueChange={(value) => setThreshold(value[0])}
                className="w-32"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100vh-8rem)] overflow-hidden">
        <EulerDiagram
          report={report}
          similarityMeasure={similarityMeasure}
          threshold={threshold}
        />
      </CardContent>
    </Card>
  );
}
