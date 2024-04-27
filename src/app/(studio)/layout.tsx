import "@/src/app/(studio)/layout.scss";

export const metadata = {
  title: "Brush.Ish | Studio",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}