"use client";

import { useState, useEffect } from "react";
import MarkDownHeader from "@/components/MarkDownHeader";
import MarkDownMain from "@/components/MarkDownMain";
import Footer from "@/components/Footer";
import { ClipLoader } from "react-spinners";



const DEFAULT_MARKDOWN = `
   # Welcome to MarkdownMaster!👋

  ## This is your placeholder Markdown text.

  >Start editing in the **Edit** tab or upload your .md file.

  ---  

  \`Enjoy 😁\` 

    `

export default function Home() {

  // State variable
 // Use default markdown initially.
 const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
 const [loading, setLoading] = useState<boolean>(true); // New loading state

 // Load content from localStorage on mount (client only).
 useEffect(() => {
   // Check if window exists (it will in the browser)
   if (typeof window !== "undefined") {
     const storedContent = localStorage.getItem("markdown-content");
     if (storedContent) {
       setMarkdown(storedContent); // Load saved content if available
     }
     setLoading(false); // Mark loading as complete
   }
 }, []);

 // Save content to localStorage whenever it changes.
 useEffect(() => {
   if (typeof window !== "undefined" && !loading) {
     // Avoid saving during the initial "loading" phase
     localStorage.setItem("markdown-content", markdown);
   }
 }, [markdown, loading]);

 // Display a loading message or spinner while determining localStorage content
 if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#94a3b8" loading={loading} size={50} />
      {/* You can replace this with a spinner if desired */}
    </div>
  );
}

// Reset function clears localStorage and resets state to default.
const resetMarkdown = () => {
  setMarkdown(DEFAULT_MARKDOWN);
  localStorage.removeItem("markdown-content");
};


  return (
    <>
      <main className="flex flex-col h-screen">
        {/* Pass state & updater to the header */}
        <MarkDownHeader markdown={markdown} setMarkdown={setMarkdown}  />
        {/* Editor & preview part */}
        <MarkDownMain markdown={markdown} setMarkdown={setMarkdown} onReset={resetMarkdown}/>
        <Footer />
      </main>
    </>
  );
}
