import "../globals.css";

export const metadata = {
  title: "Admin | Batumi Private Car Rental",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-100 text-slate-950">
          <header className="border-b border-slate-200 bg-white px-6 py-4">
            <p className="text-lg font-bold">Batumi Private Car Rental Admin</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
