"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";
import ReactDOM from "react-dom";
import { useModals } from "@/context/ModalContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (service: "apple" | "google" | "waze", address?: string) => void;
  isIOS: boolean;
  value?: string;
  locations?: Array<{
    id: "gertrudes34" | "akmenu16";
    label: string;
    address?: { label?: string; link?: string };
  }>;
};

const MapSelectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
  isIOS,
  value,
  locations,
}) => {
  const { modals, locale } = useModals();
  const mapModalData = modals.modal;
  const locationOptions = useMemo(
    () =>
      (locations || [])
        .map((loc) => ({
          id: loc.id,
          label: loc.label,
          addressLabel: loc.address?.label || "",
        }))
        .filter((loc) => loc.addressLabel),
    [locations]
  );
  const fallbackLocation = value
    ? [{ id: "single", label: mapModalData.title?.[locale] || "Location", addressLabel: value }]
    : [];
  const locationsToRender = locationOptions.length > 0 ? locationOptions : fallbackLocation;

  if (typeof window === "undefined") return null;
  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="map-modal"
          className="fixed inset-0 z-9999 flex items-center justify-center bg-background/60 backdrop-blur-xs"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1, opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-background/80 w-full mx-4 max-w-[480px] border border-foreground/20 rounded-sm p-6 flex flex-col gap-6 text-center shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              {locationsToRender.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between rounded-xs border border-foreground/30 px-3 py-2 text-extra-small"
                >
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
                    <span className="uppercase tracking-[0.2em] text-foreground/70">
                      {option.label}
                    </span>
                    <span className="truncate text-primary/90">{option.addressLabel}</span>
                  </div>
                  <div className="ml-3 flex items-center gap-3">
                    {isIOS && (
                      <button
                        onClick={() => onSelect("apple", option.addressLabel)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xs cursor-pointer"
                        title="Apple Maps"
                      >
                        <Image
                          src="/icons/apple-maps-icon.svg"
                          alt="Apple Maps"
                          width={48}
                          height={48}
                          priority
                        />
                      </button>
                    )}
                    <button
                      onClick={() => onSelect("google", option.addressLabel)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xs cursor-pointer"
                      title="Google Maps"
                    >
                      <Image
                        src="/icons/google-maps-icon.svg"
                        alt="Google Maps"
                        width={48}
                        height={48}
                        priority
                      />
                    </button>
                    <button
                      onClick={() => onSelect("waze", option.addressLabel)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xs cursor-pointer"
                      title="Waze"
                    >
                      <Image
                        src="/icons/waze-maps-icon.svg"
                        alt="Waze"
                        width={48}
                        height={48}
                        priority
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" outline={false} onClick={onClose}>
              {mapModalData.cancel_button[locale]}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default MapSelectModal;
