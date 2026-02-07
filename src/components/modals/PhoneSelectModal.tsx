import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import Button from "../ui/Button";
import ReactDOM from "react-dom";
import { useModals } from "@/context/ModalContext";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (action: "call" | "whatsapp", phone?: string) => void;
  phone: string;
  locations?: Array<{
    id: "gertrudes34" | "akmenu16";
    label: string;
    phone?: { label?: string; link?: string };
  }>;
  locationId?: "gertrudes34" | "akmenu16";
};

const PhoneSelectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
  phone,
  locations,
  locationId,
}) => {
  const { modals, locale } = useModals();
  const phoneModalData = modals.modal;
  const phoneOptions = useMemo(
    () =>
      (locations || [])
        .filter((loc) => (locationId ? loc.id === locationId : true))
        .map((loc) => ({
          id: loc.id,
          label: loc.label,
          phoneLabel: loc.phone?.label || "",
          phoneLink: loc.phone?.link || "",
        }))
        .filter((loc) => loc.phoneLabel || loc.phoneLink),
    [locations, locationId]
  );
  const [selectedPhone, setSelectedPhone] = useState<{
    id: string;
    label: string;
    phoneLabel: string;
    phoneLink: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (phoneOptions.length > 0) {
      setSelectedPhone(phoneOptions[0]);
    } else {
      setSelectedPhone(null);
    }
  }, [isOpen, phoneOptions]);

  const activePhoneLabel = selectedPhone?.phoneLabel || phone;
  const activePhoneLink = selectedPhone?.phoneLink || phone;

  const formatPhone = (input: string) => {
    const trimmed = input.trim();
    const hasPlus = trimmed.startsWith("+");
    const digits = trimmed.replace(/[^\d]/g, "");
    if (!digits) return input;
    const rest = digits.replace(/^(\d{3})/, "");
    const groups = rest.match(/\d{1,3}/g) || [];
    const grouped = groups.join(" ");
    return hasPlus ? `+${digits.slice(0, 3)} ${grouped}` : `${grouped}`;
  };

  const showHeaderNumber = phoneOptions.length === 0;

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
            className="bg-background/80 w-full mx-4 max-w-[480px] border border-foreground/20 rounded-sm p-6 flex flex-col gap-8 text-center shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-h3 font-heading uppercase">
                {phoneModalData.title?.[locale] || "Piezvanīt"}
              </h3>
              {phoneModalData.subtitle?.[locale] && (
                <p className="text-extra-small text-foreground/70">
                  {phoneModalData.subtitle[locale]}
                </p>
              )}
            </div>

            {showHeaderNumber && <h3 className="text-body">{formatPhone(activePhoneLabel)}</h3>}

            {phoneOptions.length > 0 ? (
              <div className="flex flex-col gap-2">
                {phoneOptions.map((option) => {
                  const number = option.phoneLink || option.phoneLabel;
                  const formattedNumber = formatPhone(number);
                  return (
                    <div
                      key={option.id}
                      className="flex items-center justify-between rounded-xs border border-foreground/30 px-3 py-2 text-extra-small transition"
                    >
                      <button
                        onClick={() => setSelectedPhone(option)}
                        className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left pl-2"
                      >
                        <span className="uppercase tracking-widest text-foreground/70">
                          {option.label}
                        </span>
                        <span className="truncate text-primary/90">{formattedNumber}</span>
                      </button>
                      <button
                        onClick={() => onSelect("call", number)}
                        title={phoneModalData.call[locale]}
                        className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-xs border border-primary/60 bg-primary transition hover:border-primary hover:text-secondary-hover hover:shadow-[0_0_12px_rgba(188,145,59,0.25)] md:hidden"
                      >
                        <FaPhone size={18} color="var(--color-background-alt)" />
                      </button>
                      <div className="ml-3 hidden md:flex items-center">
                        <div className="rounded-xs border border-foreground/20 bg-white p-1.5">
                          <QRCodeCanvas value={`tel:${number}`} size={72} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-3 justify-around">
                {/* WHATSAPP DISABLED FOR NOW */}
                {/* <button
                  onClick={() => onSelect("whatsapp")}
                  className="flex flex-col gap-2 items-center justify-center cursor-pointer"
                >
                  <IoLogoWhatsapp
                    size={56}
                    className="text-primary hover:text-primary-hover active:text-primary-hover transition-all duration-200 active:scale-95"
                  />
                  <span className="text-extra-small">WhatsApp</span>
                </button> */}

                <button
                  onClick={() => onSelect("call", activePhoneLink)}
                  className="flex flex-col gap-2 items-center justify-center cursor-pointer md:hidden"
                >
                  <FaPhone
                    size={56}
                    color="var(--color-primary)"
                    className="text-primary hover:text-primary-hover active:text-primary-hover transition-all duration-200 active:scale-95"
                  />
                  <span className="text-extra-small">{phoneModalData.call[locale]}</span>
                </button>
                <div className="hidden md:flex flex-col items-center gap-3">
                  <div className="rounded-xs border border-foreground/20 bg-white p-2">
                    <QRCodeCanvas value={`tel:${activePhoneLink}`} size={140} />
                  </div>
                  <span className="text-extra-small text-foreground/60">
                    {locale === "lv" && "Noskenē, lai piezvanītu"}
                    {locale === "en" && "Scan to call"}
                    {locale === "ru" && "Сканируйте, чтобы позвонить"}
                  </span>
                </div>
              </div>
            )}
            <Button variant="primary" outline={false} onClick={onClose}>
              {phoneModalData.cancel_button[locale] ?? ""}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default PhoneSelectModal;
