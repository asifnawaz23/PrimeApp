"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  isInquiryOpen: boolean;
  openInquiry: () => void;
  closeInquiry: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const openInquiry = () => setIsInquiryOpen(true);
  const closeInquiry = () => setIsInquiryOpen(false);

  return (
    <AppContext.Provider value={{ isInquiryOpen, openInquiry, closeInquiry }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
