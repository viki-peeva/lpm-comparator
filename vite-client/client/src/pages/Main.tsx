import { useState } from "react"
import StartPage from "./Start"
import UploadPage from "./Upload"
import AnalysisPage from "./Analysis"
import FileInfo from "@/types/FileInfo"

type Page = "start" | "upload" | "analysis"

export default function Main(){

    const [currentPage, setCurrentPage] = useState<Page>("start")

    const [eventLog, setEventLog] = useState<FileInfo | null>(null);
    const [lpmsLeft, setLpmsLeft] = useState<FileInfo[]>([]);
    const [lpmsRight, setLpmsRight] = useState<FileInfo[]>([]);


    return(
        <div className="container w-10/12 mx-auto p-4 min-h-screen">
            {currentPage == "start" && <StartPage setCurrentPage={setCurrentPage} />}
            {currentPage == "upload" && <UploadPage setCurrentPage={setCurrentPage} eventLog={eventLog} setEventLog={setEventLog} lpmsLeft={lpmsLeft} setLpmsLeft={setLpmsLeft} lpmsRight={lpmsRight} setLpmsRight={setLpmsRight}/>}
            {currentPage == "analysis" && <AnalysisPage setCurrentPage={setCurrentPage} />}
        </div>
    );
}