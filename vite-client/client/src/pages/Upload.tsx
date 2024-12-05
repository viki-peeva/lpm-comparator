import EventLogUpload from "@/components/EventLogUpload";
import PetriNetUpload from "@/components/PetriNetUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FileInfo from "@/types/FileInfo";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";


export default function UploadPage({
    setCurrentPage,
    eventLog,
    setEventLog,
    lpmsLeft,
    setLpmsLeft,
    lpmsRight,
    setLpmsRight
  }: {
    setCurrentPage: (page: "start" | "upload" | "analysis") => void;
    eventLog: FileInfo | null;
    setEventLog: (eventLog: FileInfo | null) => void;
    lpmsLeft: FileInfo[];
    setLpmsLeft: (lpmsLeft: FileInfo[]) => void;
    lpmsRight: FileInfo[];
    setLpmsRight: (lpmsRight: FileInfo[]) => void;
  }){

    const [isLoading, setIsLoading] = useState(true); // Show loading animation
    const [statusText, setStatusText] = useState('Uploading files...'); // Status message


    return (
        <>
        {isLoading ? ( 
             <div className="flex flex-col items-center justify-center min-h-screen">
             {/* Loading animation */}
             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
     
             {/* Status text */}
             <p className="mt-4 text-lg text-gray-600">{statusText}</p>
           </div>
     
        ):(
            <>
            <EventLogUpload eventLog={eventLog} setEventLog={setEventLog} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
              <Card className="flex-1">
                <CardContent className="pt-6">
                  <PetriNetUpload side="Left" files={lpmsLeft} setFiles={setLpmsLeft} />
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardContent className="pt-6">
                <PetriNetUpload side="Right" files={lpmsRight} setFiles={setLpmsRight} />
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-between mt-6">
              <Button onClick={() => 
                  setCurrentPage("start")} size="lg" variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button onClick={() => setCurrentPage("analysis")} size="lg" disabled={!eventLog || lpmsLeft.length === 0 || lpmsRight.length === 0}
              >
                Finish Upload and Analyze
              </Button>
            </div>
            </>
        )}
        </>
    );
}
