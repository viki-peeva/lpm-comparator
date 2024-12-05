import { Button } from "@/components/ui/button";


export default function AnalysisPage({
    setCurrentPage,
  }: {
    setCurrentPage: (page: "start" | "upload" | "analysis") => void;
  }){
    return (
        <>
            <p>Analysis</p>
            <Button onClick={() => setCurrentPage("start")}>Start again</Button>
            <Button onClick={() => setCurrentPage("upload")}>Fix upload</Button>
        </>
        
    );
}