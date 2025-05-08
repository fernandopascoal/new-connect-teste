declare module "*.css";

declare module "*.svg" {
  import React from "react";

  // Para importar como componente React
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  // Para importar como string (URL do SVG)
  const src: string;
  export default src;
}