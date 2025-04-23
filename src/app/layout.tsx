import { ReactNode } from "react";
import "w3block-new-lib/dist/style.css";
import "../../styles/globals.css"
import { PageProvider } from "../components/core/components/PageProvider";

const metadata = {
  title: "My App",
  description: "This is a server-side rendered layout for Next.js.",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <PageProvider>{children}</PageProvider>
      </body>
    </html>
  );
}
