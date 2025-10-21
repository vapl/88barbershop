import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { siteData } from "@/data/siteData";
import Image from "next/image";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import Button from "../ui/Button";
import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (action: "call" | "whatsapp") => void;
  phone: string;
};

const PhoneSelectModal: React.FC<Props> = ({ isOpen, onClose, onSelect, phone }) => {
  const locale = useLocale() as "lv" | "en" | "ru";
  if (!isOpen) return null;

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
            className="bg-background/80 w-full mx-4 max-w-[480px] border border-foreground/20 rounded-sm p-6 flex flex-col gap-8 text-center shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-body mb-2">{phone}</h3>

            <div className="flex gap-3 justify-around">
              <button
                onClick={() => onSelect("whatsapp")}
                className="flex flex-col gap-2 items-center justify-center cursor-pointer"
              >
                <IoLogoWhatsapp
                  size={56}
                  className="text-primary hover:text-primary-hover active:text-primary-hover transition-all duration-200 active:scale-95"
                />
                <span className="text-extra-small">WhatsApp</span>
              </button>

              <button
                onClick={() => onSelect("call")}
                className="flex flex-col gap-2 items-center justify-center cursor-pointer"
              >
                <FaPhone
                  size={56}
                  color="var(--color-primary)"
                  className="text-primary hover:text-primary-hover active:text-primary-hover transition-all duration-200 active:scale-95"
                />
                <span className="text-extra-small">{siteData.modals.modal.call[locale]}</span>
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

export default PhoneSelectModal;
