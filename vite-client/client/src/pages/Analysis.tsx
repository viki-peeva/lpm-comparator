import { CustomAlertDialog } from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";


export default function AnalysisPage({
    setCurrentPage,
  }: {
    setCurrentPage: (page: "start" | "upload" | "analysis") => void;
  }){
    return (
        <>
            <p>Analysis</p>
            <CustomAlertDialog button={
              <Button>Start again</Button>}
              title={"Are you sure you want to start again?"}
              description={"This will clear all computed results and start the process from the beginning."}
              onAction={() => setCurrentPage("start")}
            />
            <CustomAlertDialog button={
              <Button>Fix upload</Button>}
              title={"Are you sure you want to change the uploaded files?"}
              description={"This will clear all computed results."}
              onAction={() => setCurrentPage("upload")}
            />
        </>
        
    );
}