import { CustomAlertDialog } from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExportFile } from "@/types/Export";
import { FileInfo } from "@/types/FileInfo";
import { ReportData } from "@/types/Report";
import axios from "axios";
import { Download } from "lucide-react";
import { useState } from "react";
import { ConformanceCard, CoverageCard, CardinalityCard, SimilarityCard, EvaluationCard } from "@/components/DashboardCards"; 

export default function AnalysisPage({
    report,
    setReport,
    setEventLog,
    setLpmsLeft,
    setLpmsRight,
    setCurrentPage,
  }: {
    report: ReportData | null;
    setReport: (reportData: ReportData | null) => void;
    setEventLog: (eventLog: FileInfo | null) => void;
    setLpmsLeft: (lpmsLeft: FileInfo[]) => void;
    setLpmsRight: (lpmsRight: FileInfo[]) => void;
    setCurrentPage: (page: "start" | "upload" | "analysis") => void;
  }){

    const [isExporting, setIsExporting] = useState(false)

    const exportResults = async () => {
      setIsExporting(true)
      try{
        const exportReport = await axios.get<ExportFile>('/api/export');
        const data = exportReport.data;
        //Let the user download the file
        const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a")
        a.href = url
        a.download = "analysis_results.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
      catch(error){
        console.error("Failed to export results", error);
      }
      finally{
        setIsExporting(false)
      }
    }

    const resetSession = async (nextPage: "start" | "upload") => {
        try {
          await axios.delete('/api/report');
        } catch (error) {
          console.error("Failed to reset session", error);
        }

        if (nextPage === "start") {
          setEventLog(null);
          setLpmsLeft([]);
          setLpmsRight([]);
          setReport(null);
        }
        setCurrentPage(nextPage);
    }

    return (
      <>
      <h1 className="text-3xl font-bold mb-6 text-center">Analysis Results</h1>
      <div className="space-y-6">
        {report ? (
          <div className="flex-grow grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
          <ConformanceCard report={report} />
          <CoverageCard report={report} />
          <CardinalityCard report={report} />
          <SimilarityCard report={report} />
          <EvaluationCard report={report} />
        </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <p>No report available</p>
            </CardContent>
          </Card>
        )}
      </div>
          <div className="flex justify-center space-x-4 mt-6">
            <CustomAlertDialog button={
              <Button size="lg">Start new analysis</Button>}
              title={"Are you sure you want to start again?"}
              description={"This will clear all computed results and start the process from the beginning."}
              onAction={() => resetSession("start")}
            />
            <Button onClick={exportResults} size="lg">
              <Download className="mr-2 h-4 w-4" /> {isExporting ? ("Exporting...") : ("Export results")}
            </Button>
            <CustomAlertDialog button={
              <Button size="lg">Edit upload</Button>}
              title={"Are you sure you want to edit the uploaded files?"}
              description={"This will clear all computed results."}
              onAction={() => resetSession("upload")}
            />
          </div>
        </>
        
    );
}