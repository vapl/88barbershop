import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <h1 className="font-heading text-6xl text-primary">Welcome to 88 Barbershop</h1>

      <p className="font-sans text-text">Professional cuts, fades & beard styling.</p>

      <button className="bg-primary hover:bg-primary-hover text-background-1 px-6 py-3 rounded-xs font-bold uppercase">
        Book now
      </button>
    </div>
  );
}
