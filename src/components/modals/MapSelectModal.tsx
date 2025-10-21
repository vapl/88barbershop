"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { siteData } from "@/data/siteData";
import Image from "next/image";
import Button from "../ui/Button";
import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (service: "apple" | "google" | "waze") => void;
  isIOS: boolean;
  value?: string;
};

const MapSelectModal: React.FC<Props> = ({ isOpen, onClose, onSelect, isIOS, value }) => {
  const locale = useLocale() as "lv" | "en" | "ru";
  if (typeof window === "undefined") return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="map-modal"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur-xs"
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
            <h3 className="text-body mb-2">{value}</h3>

            <div className="flex gap-3 justify-center">
              {isIOS && (
                <button
                  onClick={() => onSelect("apple")}
                  className="flex flex-col gap-2 items-center justify-center cursor-pointer"
                >
                  <Image
                    src="/icons/apple-maps-icon.svg"
                    alt="Apple Maps"
                    width={56}
                    height={56}
                    priority
                  />
                  <span className="text-extra-small">Apple Maps</span>
                </button>
              )}

              <button
                onClick={() => onSelect("google")}
                className="flex flex-col gap-2 items-center justify-center cursor-pointer"
              >
                <Image
                  src="/icons/google-maps-icon.svg"
                  alt="Apple Maps"
                  width={56}
                  height={56}
                  priority
                />
                <span className="text-extra-small">Google Maps</span>
              </button>
              <button
                onClick={() => onSelect("waze")}
                className="flex flex-col gap-2 items-center justify-center cursor-pointer"
              >
                <Image
                  src="/icons/waze-maps-icon.svg"
                  alt="Apple Maps"
                  width={56}
                  height={56}
                  priority
                />
                <span className="text-extra-small">Waze</span>
              </button>
            </div>
            <Button variant="primary" outline={false} onClick={onClose}>
              {siteData.modals.modal.cancel_button[locale]}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default MapSelectModal;
