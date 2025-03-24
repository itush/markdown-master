"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner"
import { ModeToggle } from "./ModeToggle";


export default function MarkDownHeader() {
    const [markdown, setMarkdown] = useState('');
    const [wordCount, setWordCount] = useState({ words: 0, characters: 0 });

    useEffect(() => {
        const words = markdown.trim().split(/\s+/).length;
        const characters = markdown.length;
        setWordCount({ words, characters });
        localStorage.setItem('markdown-content', markdown);
    }, [markdown]);


    const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setMarkdown(content);
            toast(
                "File imported", {
                description: "Your markdown file has been imported successfully."
            }
            );
        };
        reader.readAsText(file);
    }, []);

    const handleExport = useCallback(() => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast("File exported", {
            description: "Your markdown file has been downloaded successfully."
        }
        );

    }, [markdown]);

    return (
        <>
            <div className="border-b sticky top-0 bg-background z-10">

                <div className="p-4 flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-sky-600">MarkDownMaster</h1>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                            {wordCount.words} words • {wordCount.characters} characters
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('file-import')?.click()}
                                className="cursor-pointer"
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Import
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleExport}
                                className="cursor-pointer"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                            <input
                                type="file"
                                id="file-import"
                                className="hidden"
                                accept=".md,.markdown"
                                onChange={handleImport}
                            />
                        </div>
                       
                            <ModeToggle />                       
                        
                    </div>

                </div>

            </div>

        </>

    )
}
