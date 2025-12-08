"use client"
import { createContext, ReactNode, useState } from "react";

interface createContextType {
  isOpen: boolean;
  setIsOpen: (newV: boolean) => void;
}

export const AsideContext = createContext<createContextType | null>(null);

export const AsideProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AsideContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AsideContext.Provider>
  )
}