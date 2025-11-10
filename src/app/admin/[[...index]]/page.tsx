"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../studio-88barbershop/sanity.config";

export default function AdminPage() {
  return <NextStudio config={config} />;
}
