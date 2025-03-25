"use client";

import { useState, useEffect } from "react";
import WordCounter from "./WordCounter";
import UpDownLoad from "./UpDownLoad";
import { ModeToggle } from "./ModeToggle";
import { Grip } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

export default function MarkDownHeader() {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {

        localStorage.setItem('markdown-content', markdown);
    }, [markdown]);


    return (
        <>
            <div className="border-b sticky top-0 bg-background z-10">

                <div className="p-4 flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-sky-600">MarkDownMaster</h1>

                    <div className="flex items-center gap-4">

                        <div className="md:hidden">

                            <DropdownMenu >
                                <DropdownMenuTrigger>
                                    <Grip />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="gap-2">
                                    <div className="text-sm text-muted-foreground">
                                        <WordCounter markdown={markdown} />
                                    </div>
                                    <div className="text-sm text-muted-foreground">

                                    <UpDownLoad markdown={markdown} setMarkdown={setMarkdown} />
                                    </div>
                                </DropdownMenuContent>

                            </DropdownMenu>
                        </div>



                        <div className="text-sm text-muted-foreground hidden md:block">
                            <WordCounter markdown={markdown} />
                        </div>

                        <div className="text-sm text-muted-foreground hidden md:block">
                            <UpDownLoad markdown={markdown} setMarkdown={setMarkdown} />
                        </div>

                        <ModeToggle />

                    </div>

                </div>

            </div>

        </>

    )
}
