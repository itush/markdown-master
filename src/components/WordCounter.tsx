// src/components/WordCounter.tsx
import React from 'react';

interface WordCounterProps {
  markdown: string;
}

export default function WordCounter (props: WordCounterProps){
    const words = props.markdown.trim().split(/\s+/).length;
  const characters = props.markdown.length;

  return (
    <div className='md:flex gap-x-2'>
      <p>Words: {words}</p>
      <p>Characters: {characters}</p>
    </div>
  );
}