import { ReportData, SimilarityMeasures } from "@/types/Report";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Aggregation } from "@/types/Report"
import { RadialBar, RadialBarChart } from "recharts"

//type AggregationMethod = "weighted_harmonic_mean" | "arithmetic_avg" | "geometric_mean" | "harmonic_mean" | "weighted_arithmetic_avg" | "weighted_geometric_mean";

export const ConformanceCard = ({report}:{report:ReportData;}) => {

    type AggregationMethod = keyof Aggregation;

    const [aggregationMethod, setAggregationMethod] = useState<AggregationMethod>("weighted_harmonic_mean" as AggregationMethod);

    const chartData = [
        { measure: "Fitness", setA: report.fitness_aggregation?.[aggregationMethod]?.[0] ?? 0, setB: report.fitness_aggregation?.[aggregationMethod]?.[1] ?? 0 },
        { measure: "Precision", setA: report.precision_aggregation?.[aggregationMethod]?.[0] ?? 0, setB: report.precision_aggregation?.[aggregationMethod]?.[1] ?? 0 },
      ]
    
    const chartConfig = {
    setA: {
        label: "Set A",
        color: "hsl(var(--chart-2))",
    },
    setB: {
        label: "Set B",
        color: "hsl(var(--chart-3))",
    },
    } satisfies ChartConfig;

    return (
    <Card className="md:row-span-2 flex flex-col overflow-auto">
        <CardHeader>
            <CardTitle className="text-lg font-semibold">Aggregated Conformance</CardTitle>
            <Select onValueChange={(v) => setAggregationMethod(v as AggregationMethod)} defaultValue={aggregationMethod}>
                <SelectTrigger>
                <SelectValue placeholder="Select aggregation method" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="weighted_harmonic_mean">Weighted Harmonic Mean</SelectItem>
                <SelectItem value="arithmetic_avg">Arithmetic Average</SelectItem>
                <SelectItem value="geometric_mean">Geometric Mean</SelectItem>
                <SelectItem value="harmonic_mean">Harmonic Mean</SelectItem>
                <SelectItem value="weighted_arithmetic_avg">Weighted Arithmetic Average</SelectItem>
                <SelectItem value="weighted_geometric_mean">Weighted Geometric Mean</SelectItem>
            </SelectContent>
            </Select>
        </CardHeader>
        <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="w-full min-w-full h-full min-h-full">
          <BarChart accessibilityLayer data={chartData} barCategoryGap={20}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="measure"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              padding={{ left: -30, right: 0 }}
            />
            <YAxis
                tickLine={false}
                tickMargin={30}
                axisLine={false}
                domain={[0, 1]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="setA" fill="var(--color-setA)" radius={4} />
            <Bar dataKey="setB" fill="var(--color-setB)" radius={4} />
            
          </BarChart>
        </ChartContainer>
        </CardContent>
    </Card>
  );
}

export const CoverageCard = ({report}:{report:ReportData;}) => {

    const chartData = [
        { lpmSet: "", coverage: 1, fill: "white" },
        { lpmSet: "setA", coverage: report.coverage?.coverage_a, fill: "hsl(var(--chart-2))" },
        { lpmSet: "setB", coverage: report.coverage?.coverage_b, fill: "hsl(var(--chart-3))" },
    ];
    
    const chartConfig = {
    coverage: {
        label: "Coverage",
    },
    setA: {
        label: "Set A",
        color: "hsl(var(--chart-2))",
    },
    setB: {
        label: "Set B",
        color: "hsl(var(--chart-3))",
    },
    } satisfies ChartConfig;

    return (
        <Card className="h-64 flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Overall Coverage</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pt-0 h-full">
                <ChartContainer
                config={chartConfig}
                className="h-[70%] mt-0 aspect-square mx-auto"
                >
                <RadialBarChart data={chartData}
            innerRadius="10%"
              outerRadius="100%">
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="lpmSet" />}
                    />
                    <RadialBar dataKey="coverage" background className="h-5/6">
                    <LabelList
                        position="insideStart"
                        dataKey="lpmSet"
                        className="fill-white capitalize mix-blend-luminosity"
                        fontSize={11}
                    />
                    </RadialBar>
                </RadialBarChart>
                </ChartContainer>

            </CardContent>
        </Card>
    );
}

export const CardinalityCard = ({report}:{report:ReportData;}) => {

    return (
        <Card className="p-4 h-64 overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Card 2</h3>
            <p>Content for card 2</p>
        </Card>
    );
}

export const SimilarityCard = ({report}:{report:ReportData;}) => {
    
    type SimilarityMeasure = keyof SimilarityMeasures;

    const [similarityMeasure, setSimilarityMeasure] = useState<SimilarityMeasure>("trace_similarity" as SimilarityMeasure);

    // Extract the similarity data for the selected measure
  const similarityData = report.similarity?.[similarityMeasure];
  
  // Get the overall similarity value, ensuring it's a number
  const similarityValue =
    typeof similarityData === 'object' && typeof similarityData.overall === 'number'
      ? similarityData.overall
      : 0;
  
  // Convert to percentage and round
  const percentage = Math.round(similarityValue * 100);

    return (
        <Card className="p-4 h-64 overflow-auto">
            <CardHeader>
            <CardTitle className="text-lg font-semibold">Similarity</CardTitle>
            <Select onValueChange={(v) => setSimilarityMeasure(v as SimilarityMeasure)} defaultValue={similarityMeasure}>
                <SelectTrigger>
                <SelectValue placeholder="Select similarity measure" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="trace_similarity">Trace similarity</SelectItem>
                <SelectItem value="eventually_follows_similarity">Eventually Follows similarity</SelectItem>
                <SelectItem value="trace_similarity_perfect">Perfect trace similarity</SelectItem>
            </SelectContent>
            </Select>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
        <p className="text-6xl font-bold">
          {percentage}%
        </p>
      </CardContent>
        </Card>
    );

}

export const EvaluationCard = ({report}:{report:ReportData;}) => {
    
    return (
        <Card className="p-4 h-64 overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Card 4</h3>
            <p>Content for card 4</p>
        </Card>
    );

}
