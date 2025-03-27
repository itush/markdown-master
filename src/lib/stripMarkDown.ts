// src/lib/stripMarkdown.ts
export function stripMarkdown(markdown: string): string {
    let text = markdown;

    // Remove code blocks (``` code ```)
    text = text.replace(/```[\s\S]*?```/g, '');

    // Remove inline code (`code`)
    text = text.replace(/`([^`]+)`/g, '$1');

    // Remove images: ![alt text](url)
    text = text.replace(/!.*?\].*?\)/, '') as string;

    // Remove links but keep the link text: [text](url) => text
    text = text.replace(/\[(.*?) \]\(.*?\) /, '$1');

    // Remove headings: remove '#' characters at the beginning of lines.
    text = text.replace(/^\s*#{1,6}\s+/gm, '');

    // Remove bold and italic markers: **, __, *, _
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');

    // Remove horizontal rules
    text = text.replace(/^-{3,}$/gm, '');

    // Optionally, remove any remaining markdown special characters
    text = text.replace(/\\([\\`*_{}[\]()# +\-!.]) /g, '$1');

    return text;
}
