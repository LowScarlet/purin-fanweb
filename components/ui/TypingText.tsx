"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
  text: string;
  speed?: number; // ms per character (default 25ms)
  delay?: number; // ms before starting (default 200ms)
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

export default function TypingText({
  text,
  speed = 22,
  delay = 200,
  className = "",
  showCursor = true,
  cursorChar = "▮",
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      setDisplayedText("");
      setIsTypingComplete(false);

      let currentIndex = 0;
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return (
    <span className={`inline ${className}`}>
      {displayedText}
      {showCursor && !isTypingComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block ml-0.5 text-[#c38a76] font-normal text-[0.85em] align-middle"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}
