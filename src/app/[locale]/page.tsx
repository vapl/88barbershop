import { useTranslations } from "next-intl";
import Button from "@/components/buttons/Button";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <div className="p-2">
      <Navbar />
      {/* <h1 className="font-heading text-6xl text-primary">{t("title")}</h1>

      <p className="font-sans text-text">Professional cuts, fades & beard styling.</p>

      <Button variant="primary" outline={false} disabled={false}>
        Book now
      </Button> */}
    </div>
  );
}
