"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LoadingContextType {
  isLoading: boolean;
  canPlayVideo: boolean;
  isInitialLoad: boolean; // True only during the very first entrance animation
  finishLoading: () => void;
  enableVideoPlay: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  canPlayVideo: false,
  isInitialLoad: true,
  finishLoading: () => {},
  enableVideoPlay: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
    // Mark initial entrance complete after entrance animations finish so subpage navigation is instant
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500);
  }, []);

  const enableVideoPlay = useCallback(() => {
    setCanPlayVideo(true);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        canPlayVideo,
        isInitialLoad,
        finishLoading,
        enableVideoPlay,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
