// src/components/TextToSpeech.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Play, StopCircle } from "lucide-react";
import { stripMarkdown } from "@/lib/stripMarkDown";

interface TextToSpeechProps {
  text: string;
}

export default function TextToSpeech({ text }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Get a plain-text version of the markdown by stripping out markdown syntax.
  const plainText = stripMarkdown(text);

  const startReading = () => {
    if (window.speechSynthesis) {
      // Create a new utterance with the stripped plain text.
      const newUtterance = new SpeechSynthesisUtterance(plainText);

      newUtterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(newUtterance);
      setIsSpeaking(true);
    }
  };



  const stopReading = () => {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Ensure that speech synthesis is cancelled when the component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {!isSpeaking ? (
        <button
          onClick={startReading}
          className="flex items-center gap-1 p-2 border-2 rounded-md cursor-pointer"
        >
          <Play size={16} />
          
        </button>
      ) : (

        
        <button
          onClick={stopReading}
          className="flex items-center gap-1 p-2 border-2 rounded-md cursor-pointer"
        >
          <StopCircle size={16} />
          
        </button>



      )}
    </div>
  );
}
