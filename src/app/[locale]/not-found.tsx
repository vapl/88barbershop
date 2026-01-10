import NotFoundClient from "@/components/NotFoundClient";

export const metadata = {
  title: "404 – 88 Barbershop Riga",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFoundPage() {
  return <NotFoundClient />;
}
