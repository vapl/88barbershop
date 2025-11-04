"use client";

import React, { createContext, useContext, ReactNode } from "react";
// Importējam tipu, kas apraksta visus modālos logus
import { Locale } from "@/lib/pageUtils";
import { ModalData } from "@/lib/types";

type ModalContextType = {
  modals: ModalData;
  locale: Locale;
};
const ModalContext = createContext<ModalContextType | null>(null);

// 2. Create "Provider" component
export function ModalProvider({
  children,
  modals,
  locale,
}: {
  children: ReactNode;
  modals: ModalData;
  locale: Locale;
}) {
  return <ModalContext.Provider value={{ modals, locale }}>{children}</ModalContext.Provider>;
}

// 3. Izveidojam "āķi" (hook), lai komponenti varētu viegli piekļūt datiem
export function useModals() {
  const context = useContext(ModalContext);
  if (context === null) {
    // Kļūda, ja mēģinām izmantot datus ārpus Provider
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
}
