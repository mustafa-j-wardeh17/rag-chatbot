"use client";
import { prepare } from "@/actions/prepare";
import PDFFileUpload, { FileProps } from "@/components/pdf-file-uploader";
import { Button } from "@/components/ui/button";
import { PDFSource } from "@/utils/pdf-loader";


import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<FileProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  async function submit() {
    try {
      setLoading(true);
      setLoadingMsg("Initializing Client and creating index...");

      const pdfSource: PDFSource = {
        type: "url",
        source: file?.url ?? "",
      };
      await prepare(pdfSource);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setLoadingMsg("");
      console.log(error);
    }
  }
  return (
    <div>
      <div className="flex flex-1 py-16">
        <div className="w-full min-h-screen container max-w-5xl flex flex-col items-center justify-center mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{loadingMsg || "Processing..."}</p>
            </div>
          ) : file ? (
            <Button onClick={() => submit()} className="cursor-pointer">Upload to Pine cone</Button>
          ) : (
            <PDFFileUpload
              label="Upload You Knowledge Base PDF File Here"
              file={file}
              setFile={setFile}
              endpoint="pdfUpload"
              className="w-full max-w-2xl mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
