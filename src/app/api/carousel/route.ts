import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  // Path to the images directory
  const dir = path.join(process.cwd(), "public/images/carousel");

  // Read all files in the directory
  const files = fs.readdirSync(dir);

  // Filter for image files
  const images = files
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map((file) => ({
      src: `/images/carousel/${file}`,
      alt: file.replace(/\.[^/.]+$/, ""),
    }));

  // Random shuffle and take 10 images
  const shuffled = images
    .sort(() => Math.random() - 0.5)
    .slice(0, files.length >= 10 ? 10 : files.length);

  return NextResponse.json(shuffled);
}
