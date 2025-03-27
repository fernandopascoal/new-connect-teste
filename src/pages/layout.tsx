import { ReactNode } from "react";

export const metadata = {
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
  // Exemplo de função simulando uma requisição SSR.
  // Substitua com a lógica de carregamento de dados reais.
  return { serverTime: new Date().toISOString() };
}