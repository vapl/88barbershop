import PreloaderComingSoon from "@/components/PreloaderComingSoon";

export default function ComingSoonPage() {
  return (
    <main className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-center overflow-hidden">
      <PreloaderComingSoon />
    </main>
  );
}
