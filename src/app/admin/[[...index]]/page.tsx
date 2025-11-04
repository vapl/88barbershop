"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../studio-88barbershop/sanity.config";

export default function AdminPage() {
  return <NextStudio config={config} />;
}

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "Admin Panel – 88 Barbershop",
  description: "Internal administration area",
};
