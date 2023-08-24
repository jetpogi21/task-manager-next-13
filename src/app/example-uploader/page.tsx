"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@/utils/uploadthing";
import { cn } from "@/lib/utils";
import { uploadButtonVariants } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FileState } from "@/interfaces/GeneralInterfaces";
import { FileTable } from "@/components/ui/DataTable/FileTable/FileTable";

const dummyData: FileState[] = [
  {
    name: "file1.txt",
    size: 1024,
    url: "https://example.com/file1.txt",
    uploadedOn: new Date("2023-08-01"),
  },
  {
    name: "image.jpg",
    size: 2048,
    url: "https://example.com/image.jpg",
    uploadedOn: new Date("2023-08-02"),
  },
  {
    name: "document.pdf",
    size: 4096,
    url: "https://example.com/document.pdf",
    uploadedOn: new Date("2023-08-03"),
  },
  {
    name: "data.csv",
    size: 5120,
    url: "https://example.com/data.csv",
    uploadedOn: new Date("2023-08-04"),
  },
  {
    name: "presentation.pptx",
    size: 8192,
    url: "https://example.com/presentation.pptx",
    uploadedOn: new Date("2023-08-05"),
  },
];

export default function Home() {
  const [files, setFiles] = useState<FileState[]>(dummyData);

  return (
    <main className="flex flex-col items-center justify-between flex-1 main-height-less-footer">
      <UploadButton
        className={cn(
          "flex gap-2",
          uploadButtonVariants({ size: "sm", variant: "secondary" })
        )}
        endpoint="imageUploader"
        onUploadProgress={(progress) => {
          console.log(progress);
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        content={{
          button(arg) {
            console.log(arg);
            if (!arg.ready) {
              return <Loader2 className="w-4 h-4 animate-spin" />;
            }

            if (arg.isUploading) {
              return `${arg.uploadProgress}%`;
            }

            return "Upload Image";
          },
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <FileTable files={files} />
    </main>
  );
}
