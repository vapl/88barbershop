export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "Admin Panel – 88 Barbershop",
  description: "Internal administration area",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
