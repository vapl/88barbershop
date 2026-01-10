import React from "react";
import PrivacyPolicySection from "@/components/sections/PrivacyPolicySection";
import { getSanityData, PageProps } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import { getSEOData } from "@/lib/getSEOData";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return getSEOData(locale);
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  return (
    <>
      <PrivacyPolicySection privacyData={siteData.privacy} locale={locale} />
    </>
  );
}
