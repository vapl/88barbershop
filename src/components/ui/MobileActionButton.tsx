"use client";

import React from "react";
import { ContactsData } from "@/lib/types";
import Button from "./Button";
import PhoneIcon from "@/icons/PhoneIcon";
import ContactItem from "../contacts/Contacts";

interface Props {
  contactsData: ContactsData;
}

const MobileActionButton: React.FC<Props> = ({ contactsData }) => {
  return (
    <div className="fixed md:hidden bottom-6 right-4 z-50 flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center h-14 w-14 bg-background-alt/80 shadow-black/50 shadow-lg border-white/3 border rounded-full transition-all duration-200 active:scale-95">
        <Button
          variant="secondary"
          outline={false}
          phoneModal={{
          phone: contactsData.phone.link,
          locations: contactsData.locations,
        }}
          className="!p-0 !px-0 !py-0 h-14 w-14 rounded-full bg-transparent text-primary hover:bg-transparent !inline-flex items-center justify-center"
        >
          <PhoneIcon size={28} className="text-primary" />
        </Button>
      </div>
      <div className="flex items-center justify-center h-14 w-14 bg-background-alt/80 shadow-black/50 shadow-lg border-white/3 border rounded-full transition-all duration-200 active:scale-95">
        <ContactItem
          type="address"
          iconSize={28}
          link={contactsData.address.link}
          value={contactsData.address.label}
          valueVisible={false}
          locations={contactsData.locations}
        />
      </div>
    </div>
  );
};

export default MobileActionButton;
