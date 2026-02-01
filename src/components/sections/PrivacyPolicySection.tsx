import React from "react";
import fs from "fs";
import path from "path";
import { PrivacyData } from "@/lib/types";
import { PortableText } from "@portabletext/react";

interface Props {
  privacyData: PrivacyData;
  locale: "lv" | "en" | "ru";
}

// Get last update helper
const getLastUpdate = (filePath: string) => {
  const fullPath = path.join(process.cwd(), filePath);
  const stats = fs.statSync(fullPath);

  return stats.mtime; // Returns Date object
};

const PrivacyPolicySection: React.FC<Props> = ({ privacyData, locale }) => {
  const updatedDate = getLastUpdate("src/app/[locale]/privacy/page.tsx");
  const formatted = updatedDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative flex justify-center items-center w-full bg-background-alt px-4 md:px-16 lg:px-32 pt-20">
      <div className="flex flex-col gap-16 w-full max-w-6xl">
        {/* Heading */}
        <div>
          <h1 className="text-h2 md:text-h1 text-foreground font-heading ">
            {privacyData.title[locale]}
          </h1>
          <p>
            {privacyData.date_label[locale]} {formatted}
          </p>
          <PortableText value={privacyData.content[locale]} />
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;
