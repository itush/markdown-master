
import WordCounter from "./WordCounter";
import UpDownLoad from "./UpDownLoad";
import ExportToDocx from "./ExportToDocx";
import { ModeToggle } from "./ModeToggle";
import { Grip } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";


interface MarkDownHeaderProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
}

export default function MarkDownHeader({ markdown, setMarkdown }: MarkDownHeaderProps) {
 

    return (
        <>
            <div className="border-b sticky top-0 bg-background z-10">

                <div className="p-4 flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-sky-600">MarkDownMaster</h1>

                    <div className="flex items-center gap-4">

                        <div className="md:hidden">

                            <DropdownMenu >
                                <DropdownMenuTrigger>
                                    <Grip className="text-muted-foreground hover:text-foreground cursor-pointer"/>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    
                                        <WordCounter markdown={markdown} />                         

                                        <UpDownLoad markdown={markdown} setMarkdown={setMarkdown} />
                                  
                                        <ExportToDocx markdown={markdown} />

                                </DropdownMenuContent>

                            </DropdownMenu>
                        </div>

                        <div className="text-sm text-muted-foreground hidden md:block">
                            <WordCounter markdown={markdown} />
                        </div>

                        <div className="text-sm text-muted-foreground hidden md:flex">
                            <UpDownLoad markdown={markdown} setMarkdown={setMarkdown} />
                            <ExportToDocx markdown={markdown} />
                        </div>

                        <ModeToggle />

                    </div>

                </div>

            </div>

        </>

    )
}
