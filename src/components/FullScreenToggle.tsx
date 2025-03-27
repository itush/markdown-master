// src/components/FullScreenToggle.tsx
"use client";

import { Expand, Minimize } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

interface FullScreenToggleProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export default function FullScreenToggle({ targetRef }: FullScreenToggleProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Toggle full-screen mode
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement && targetRef.current) {
      // Request fullscreen on the target element
      targetRef.current.requestFullscreen()
        .then(() => {
          setIsFullScreen(true);
        })
        .catch((err) => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
    } else {
      // Exit fullscreen mode
      document.exitFullscreen()
        .then(() => {
          setIsFullScreen(false);
        })
        .catch((err) => {
          console.error("Error attempting to exit full-screen mode:", err);
        });
    }
  }, [targetRef]);

  // Listen for fullscreen change events
  useEffect(() => {
    const onFullScreenChange = () => {
      // Update state based on whether the document is in fullscreen mode
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange); // for Safari

    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullScreenChange);
    };
  }, []);
  
  return (
    <button onClick={toggleFullScreen} className="p-4">
      {isFullScreen ? (
        <Minimize size={20} className="cursor-pointer text-muted-foreground hover:text-foreground" />
      ) : (
        <Expand size={20} className="cursor-pointer text-muted-foreground hover:text-foreground" />
      )}
    </button>
  );
}
