// src/components/UpDownLoad.tsx
import React, { useCallback } from 'react';
import { Button } from './ui/button';
import { Upload, Download } from 'lucide-react';
import { toast } from 'sonner';

interface UpDownLoadProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
}


export default function UpDownLoad({ markdown, setMarkdown }: UpDownLoadProps) {

    const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setMarkdown(content);
            toast(
                'File imported',
                {
                    description: 'Your markdown file has been imported successfully.',
                }
            );
        };
        reader.readAsText(file);
    }, [setMarkdown]);

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

        toast('File exported', {
            description: 'Your markdown file has been downloaded successfully.',
        });
    }, [markdown]);

    return (
        <>
            <div className=" md:flex gap-2">

                <div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('file-import')?.click()}
                        className="cursor-pointer"
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        MD
                    </Button>
                </div>

                <div className="mt-2 md:mt-0">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExport}
                        className="cursor-pointer"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        MD
                    </Button>
                </div>

                <input
                    type="file"
                    id="file-import"
                    className="hidden"
                    accept=".md,.markdown"
                    onChange={handleImport}
                />

            </div>
        </>
    );
};
