export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
