"use client";

import React from "react";
import ContactItem from "../contacts/Contacts";
import { siteData } from "@/data/siteData";
import PhoneIcon from "@/icons/PhoneIcon";

const MobileActionButton = () => {
  return (
    <div className="fixed md:hidden bottom-6 right-4 z-50 flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center h-[56px] w-[56px] bg-background-alt/80 shadow-black drop-shadow-lg rounded-full transition-all duration-200 active:scale-95">
        <ContactItem
          type="phone"
          iconSize={28}
          link={siteData.contacts.phone.link}
          valueVisible={false}
        />
      </div>
      <div className="flex items-center justify-center h-[56px] w-[56px] bg-background-alt/80 shadow-black drop-shadow-lg rounded-full transition-all duration-200 active:scale-95">
        <ContactItem
          type="address"
          iconSize={28}
          link={siteData.contacts.address.link}
          value={siteData.contacts.address.label}
          valueVisible={false}
        />
      </div>
    </div>
  );
};

export default MobileActionButton;
