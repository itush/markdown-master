"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  markdown: string;
  onHeadingClick: (id: string) => void;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}


export function SideBar({ markdown, onHeadingClick }: TableOfContentsProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Extract headings from the markdown content
  const extractHeadings = useCallback((content: string): Heading[] => {
    // const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headingRegex = /^\s*(#{1,6})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;
        
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      headings.push({ level, text, id });
    }
    console.log(headings);
    return headings;
  }, []);

  const headings = extractHeadings(markdown);

  return (
    <div
      className={cn(
        "border-r transition-all duration-300 flex",
        isCollapsed ? "w-[40px]" : "w-[250px]"
      )}
    >
      <div className="flex-1 flex flex-col">
        {!isCollapsed && (
          <>
            <div className="p-4 border-b">
              <h2 className="font-semibold text-muted-foreground">Table of Contents</h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                {headings.map((heading, index) => (
                  <button
                    key={index}
                    onClick={() => onHeadingClick(heading.id)}
                    className={cn(
                      "block text-left w-full hover:text-primary transition-colors py-1",
                      "cursor-pointer text-sm text-muted-foreground hover:underline",
                      heading.level === 1 && "font-semibold",
                      heading.level > 1 && `pl-${(heading.level - 1) * 3}`
                    )}
                  >
                    {heading.text}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 shrink-0 my-2 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}