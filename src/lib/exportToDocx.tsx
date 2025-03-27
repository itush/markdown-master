// src/lib/exportToDocx.ts
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

/**
 * Very basic Markdown-to-DOCX converter.
 * This example splits the markdown by lines and maps lines starting with
 * '#' to headings. All other lines become normal paragraphs.
 * You can expand this logic to be more robust.
 */
export async function exportToDocx(markdown: string, fileName: string = "document.docx") {


  // Split the markdown into lines.
  // (For a better conversion, consider splitting into paragraphs by blank lines,
  // then process each paragraph.)
  const lines = markdown.split("\n").filter(line => line.trim() !== "");

  // Map each line to a docx Paragraph.
  const paragraphs = lines.map(line => {
    // Check for heading markers.
    if (line.startsWith("###### ")) {
      return new Paragraph({
        text: line.replace("###### ", "").trim(),
        heading: HeadingLevel.HEADING_6,
      });
    } else if (line.startsWith("##### ")) {
      return new Paragraph({
        text: line.replace("##### ", "").trim(),
        heading: HeadingLevel.HEADING_5,
      });
    } else if (line.startsWith("#### ")) {
      return new Paragraph({
        text: line.replace("#### ", "").trim(),
        heading: HeadingLevel.HEADING_4,
      });
    } else if (line.startsWith("### ")) {
      return new Paragraph({
        text: line.replace("### ", "").trim(),
        heading: HeadingLevel.HEADING_3,
      });
    } else if (line.startsWith("## ")) {
      return new Paragraph({
        text: line.replace("## ", "").trim(),
        heading: HeadingLevel.HEADING_2,
      });
    } else if (line.startsWith("# ")) {
      return new Paragraph({
        text: line.replace("# ", "").trim(),
        heading: HeadingLevel.HEADING_1,
      });
    } else {
      // Otherwise, treat it as a normal paragraph.
      return new Paragraph({ text: line.trim() });
    }
  });

   // Create a new Document
   const doc = new Document({
    sections: [
        {
            children: paragraphs,
        },
    ],
});

  // Convert the Document to a Blob.
  const blob = await Packer.toBlob(doc);

  // Trigger download using file-saver.
  saveAs(blob, fileName);
}
