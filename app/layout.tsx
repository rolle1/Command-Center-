import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">
        <div className="mx-auto max-w-4xl p-6">
          <header className="mb-6">
            <h1 className="text-xl font-semibold">Personal Calendar</h1>
            <p className="text-sm text-neutral-400">Eliminate renegotiation.</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
