import { ReportData } from "@/types/Report";
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
        { lpmSet: "setA", coverage: 1, fill: "hsl(var(--chart-2))" },
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
        <Card className="h-64 flex flex-col overflow-auto">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Overall Coverage</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pt-0">
                <ChartContainer
                config={chartConfig}
                className="w-[50%] mt-0 aspect-square mx-auto"
                >
                <RadialBarChart data={chartData} startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="lpmSet" />}
                    />
                    <RadialBar dataKey="coverage" background>
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

    return (
        <Card className="p-4 h-64 overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Card 3</h3>
            <p>Content for card 3</p>
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
