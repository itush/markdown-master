"use client";

import { useCallback, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "./ui/textarea";
import { SideBar } from "./SideBar";
import FullScreenToggle from "./FullScreenToggle";

// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkDownMainProps {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

export default function MarkDownMain({ markdown, setMarkdown }: MarkDownMainProps) {

  // explain the next line: 
  // The useRef hook is used to create a mutable reference to a DOM element.
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToHeading = useCallback((id: string) => {
    console.log('Scrolling to:', id);
    const element = contentRef.current?.querySelector(`#${id}`) as HTMLElement | null;

    if (element && contentRef.current) {
      console.log('Found element at offset:', element.offsetTop);
      const containerTop = contentRef.current.offsetTop;
      const elementTop = element.offsetTop;
      contentRef.current.scrollTop = elementTop - containerTop;
    } else {
      console.warn('Element not found for id:', id);
    }
  }, []);

  // Custom renderers for headings
  const customComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-');
      return <h1 id={id} className="text-4xl font-bold my-6" {...props} />
    },

    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-');
      return <h2 id={id} className="text-3xl font-bold my-5" {...props} />
    },

    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-');
      return <h3 id={id} className="text-2xl font-semibold my-4" {...props} />
    },
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-');
      return <h4 id={id} className="text-xl font-semibold my-3" {...props} />
    },
    h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-');
      return <h5 id={id} className="text-lg font-semibold my-2" {...props} />
    },
    h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-');
      return <h6 id={id} className="text-base font-semibold my-1" {...props} />
    },

    // h2: ({ ...props }) => (
    //   <h2 className="text-3xl font-bold my-5" {...props} />
    // ),
    // h3: ({ ...props }) => (
    //   <h3 className="text-2xl font-semibold my-4" {...props} />
    // ),
    // h4: ({ ...props }) => (
    //   <h4 className="text-xl font-semibold my-3" {...props} />
    // ),
    // h5: ({ ...props }) => (
    //   <h5 className="text-lg font-semibold my-2" {...props} />
    // ),
    // h6: ({ ...props }) => (
    //   <h6 className="text-base font-semibold my-1" {...props} />
    // ),

    // Unordered list styling: Disc-style bullets, left margin for indentation, and some bottom margin.
    ul: ({ ...props }) => (
      <ul className="list-disc ml-6 mb-4" {...props} />
    ),
    // Ordered list styling: Decimal numbering, margin and bottom spacing.
    ol: ({ ...props }) => (
      <ol className="list-decimal ml-6 mb-4" {...props} />
    ),
    // List item styling: Adding a slight bottom margin to separate items.
    li: ({ ...props }) => <li className="mb-1" {...props} />,

    // Paragraph: add bottom margin and relaxed line spacing.
    p: ({ ...props }) => <p className="mb-8 leading-relaxed" {...props} />,

    a: ({ ...props }) => (
      <a className="text-blue-600 hover:underline" {...props} />
    ),

    // Code block styling: Adding a background color, padding, and rounded corners.
    code: ({ ...props }) => (
      <code className="bg-stone-600 text-slate-200 rounded-md p-2 my-2" {...props} />
    ),

    // Inline code styling: Adding a background color, padding, and rounded corners.
    inlineCode: ({ ...props }) => (
      <code className="bg-slate-500 rounded-md p-2" {...props} />
    ),

    // Table styling: Adding a border, padding, and rounded corners.
    table: ({ ...props }) => (
      <table className="border border-gray-300 rounded-md" {...props} />
    ),
    th: ({ ...props }) => (
      <th className="border border-gray-300 p-2" {...props} />
    ),
    td: ({ ...props }) => (
      <td className="border border-gray-300 p-2" {...props} />
    ),

    // Horizontal rule styling: Adding a border, padding, and rounded corners.
    hr: ({ ...props }) => (
      <hr className="my-4" {...props} />
    ),

    // Blockquote styling: Adding a border, padding, and rounded corners.
    blockquote: ({ ...props }) => (
      <blockquote
        className="border-l-8 border-gray-800 bg-gray-300 
      rounded-md p-1 my-4 inline-block dark:bg-gray-500 
      dark:text-slate-900 dark:border-blue-800" {...props} />
    ),

  };

  return (
    // The Tabs parent should span the full available height/width between header and footer.
    <main className="flex h-[800px]">

      <SideBar markdown={markdown} onHeadingClick={scrollToHeading} />

      <Tabs defaultValue="preview"
        className="flex flex-col mt-2 text-muted-foreground dark:text-slate-500 
    w-full h-full overflow-y-auto">

        {/* Tabs header with Preview and Edit options */}
        <TabsList className="flex border-b ml-4 ">
          <TabsTrigger value="preview" className="flex-1 text-2xl">
            <span className=" text-muted-foreground cursor-pointer dark:text-slate-500">Preview</span>
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex-1 text-2xl">
            <span className=" text-muted-foreground cursor-pointer dark:text-slate-500">Edit</span>
          </TabsTrigger>
        </TabsList>

        {/* Preview Tab Content */}
        <TabsContent ref={contentRef} value="preview" className="flex-1 p-4 overflow-y-auto relative">
          {/* Wrap ReactMarkdown in a div to apply typography styling */}
          <div className="prose dark:prose-dark">
            <ReactMarkdown
              components={customComponents}
              remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
            <div className="absolute bottom-0 right-0">
              <FullScreenToggle targetRef={contentRef} />
            </div>

          </div>
        </TabsContent>



        {/* Edit Tab Content */}
        <TabsContent value="edit" className="flex-1 p-4">

          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="p-4 overflow-y-auto"
            placeholder="Write your Markdown here..."
          />

        </TabsContent>

      </Tabs>


    </main>
  );
};


