import React from "react";
import { exportToDocx } from "@/lib/exportToDocx";
import { Button } from "./ui/button";
import { FileDown } from 'lucide-react';

interface ExportDocxProps {
  markdown: string;
}

export default function ExportToDocx({ markdown }: ExportDocxProps) {
  const handleExport = () => {
    exportToDocx(markdown, "document.docx");
  };

  return (
    <main className="cursor-pointer text-muted-foreground hover:text-foreground ml-2">

    <Button variant="outline" size="sm" 
    onClick={handleExport} 
    >
      <FileDown className="mr-2" /> DOCX
    </Button>
      </main>
  );
}
