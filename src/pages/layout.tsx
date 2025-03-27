import { ReactNode } from "react";


const metadata = {
  title: "My App",
  description: "This is a server-side rendered layout for Next.js.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Simulação de lógica SSR, como carregar dados iniciais
  const serverData = await fetchDataFromServer();

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <div id="server-data">{JSON.stringify(serverData)}</div>
        {children}
      </body>
    </html>
  );
}

async function fetchDataFromServer() {

  return { serverTime: new Date().toISOString() };
}