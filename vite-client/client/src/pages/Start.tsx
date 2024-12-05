import { Button } from "@/components/ui/button";
import { ArrowRight, FileUp } from "lucide-react";


export default function StartPage({
  setCurrentPage,
}: {
  setCurrentPage: (page: "start" | "upload" | "analysis") => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-2rem)] space-y-4">
      <Button onClick={() => setCurrentPage("upload")} size="lg" className="text-lg">
        Start New Analysis <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      {/*}
      <Button onClick={() => fileInputRef.current?.click()} size="lg" className="text-lg">
        Upload Existing Report <FileUp className="ml-2 h-5 w-5" />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "report")}
      />*/}
    </div>
  );
}
