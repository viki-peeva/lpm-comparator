import { Button } from "@/components/ui/button"
import { AnalysisPage } from "@/pages/Analysis"
import { ReportData } from "@/types/Report";

export default function LpmList({report, goBack}: {report: ReportData, goBack: () => void}) {
  

  return (<>
    {/*Button to go back to the analysis page*/}
    <Button
      onClick={goBack}
      className="mb-4"
    >
        Back to Analysis
    </Button>
    <h3>Lpm List</h3>
    </>
  );
};