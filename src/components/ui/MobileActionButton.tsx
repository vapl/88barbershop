"use client";

import React from "react";
import ContactItem from "../contacts/Contacts";
import { ContactsData } from "@/lib/types";

interface Props {
  contactsData: ContactsData;
}

const MobileActionButton: React.FC<Props> = ({ contactsData }) => {
  return (
    <div className="fixed md:hidden bottom-6 right-4 z-50 flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center h-[56px] w-[56px] bg-background-alt/80 shadow-black/50 shadow-lg border-white/3 border-1 rounded-full transition-all duration-200 active:scale-95">
        <ContactItem
          type="phone"
          iconSize={28}
          link={contactsData.phone.link}
          valueVisible={false}
        />
      </div>
      <div className="flex items-center justify-center h-[56px] w-[56px] bg-background-alt/80 shadow-black/50 shadow-lg border-white/3 border-1 rounded-full transition-all duration-200 active:scale-95">
        <ContactItem
          type="address"
          iconSize={28}
          link={contactsData.address.link}
          value={contactsData.address.label}
          valueVisible={false}
        />
      </div>
    </div>
  );
};

export default MobileActionButton;
