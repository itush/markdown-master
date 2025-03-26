"use client";

import { useState } from "react";
import MarkDownHeader from "@/components/MarkDownHeader";
import MarkDownMain from "@/components/MarkDownMain";
import Footer from "@/components/Footer";

export default function Home() {

  // State variable
  const [markdown, setMarkdown] = useState<string>(`
   # Welcome to MarkdownMaster!👋

  ## This is your placeholder Markdown text.

  >Start editing in the **Edit** tab or upload your .md file.

  ---  

  \`Enjoy 😁\` 

    `);

  return (
    <>
      <main className="flex flex-col h-screen">
        {/* Pass state & updater to the header */}
        <MarkDownHeader markdown={markdown} setMarkdown={setMarkdown} />
        {/* Editor & preview part */}
        <MarkDownMain markdown={markdown} setMarkdown={setMarkdown} />
        <Footer />
      </main>
    </>
  );
}
