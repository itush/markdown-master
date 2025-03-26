
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "./ui/textarea";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkDownMainProps {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

export default function MarkDownMain({ markdown,setMarkdown }: MarkDownMainProps ) {

  // Custom renderers for headings
  const customComponents = {
    h1: ({ ...props }) => (
      <h1 className="text-4xl font-bold my-6" {...props} />
    ),
    h2: ({ ...props }) => (
      <h2 className="text-3xl font-bold my-5" {...props} />
    ),
    h3: ({ ...props }) => (
      <h3 className="text-2xl font-semibold my-4" {...props} />
    ),
    h4: ({ ...props }) => (
      <h4 className="text-xl font-semibold my-3" {...props} />
    ),
    h5: ({ ...props }) => (
      <h5 className="text-lg font-semibold my-2" {...props} />
    ),
    h6: ({ ...props }) => (
      <h6 className="text-base font-semibold my-1" {...props} />
    ),

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
   
    // Blockquote styling: Adding a border, padding, and rounded corners.
    blockquote: ({ ...props }) => (
      <blockquote 
      className="border-l-8 border-gray-800 bg-gray-300 
      rounded-md py-1 my-4 dark:bg-gray-500 dark:text-slate-900 dark:border-blue-800" {...props} />
    ),

  };

  return (
    // The Tabs parent should span the full available height/width between header and footer.
    <main>
    <Tabs defaultValue="preview" 
    className="flex flex-col h-full mt-2 text-muted-foreground dark:text-slate-500">
      {/* Tabs header with Preview and Edit options */}
      <TabsList className="flex border-b ml-4 ">
        <TabsTrigger value="preview" className="flex-1 text-2xl">
          <span className="text-muted-foreground dark:text-slate-500">Preview</span>
        </TabsTrigger>
        <TabsTrigger value="edit" className="flex-1 text-2xl">
        <span className="text-muted-foreground dark:text-slate-500">Edit</span>
        </TabsTrigger>
      </TabsList>

      {/* Preview Tab Content */}
      <TabsContent value="preview" className="flex-1 h-full overflow-auto p-4">
        {/* Wrap ReactMarkdown in a div to apply typography styling */}
        <div className="prose h-[700px] dark:prose-dark max-w-none">
          <ReactMarkdown 
            components={customComponents}
            remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </div>
      </TabsContent>

      {/* Edit Tab Content */}
      <TabsContent value="edit" className="flex flex-col h-screen w-screen overflow-auto p-4">
      
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-[700px] p-4"
          placeholder="Write your Markdown here..."
        />


      </TabsContent>

    </Tabs>
    </main>
  );
};


