/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

import { ModulesType, TemplateData, Theme } from "../../interfaces";

import { page, theme } from "../../mock/page";
import { Banner } from "../Banner/Banner";
import { ImagePlusText } from "../ImagePlusText/ImagePlusText";

interface StorefrontPreviewProps {
  params?: string[];
  children?: ReactNode;
  hasHeader?: boolean;
  hasFooter?: boolean;
  upperTheme?: Theme | null;
  upperPage?: TemplateData | null;
}

export const StorefrontPreview = ({ children }: StorefrontPreviewProps) => {
  console.log(children, "children");

  console.log(page, "page");

  return (
    <div>
      {page.data.modules.map((item) => {
          switch (item.type) {
            /*      case ModulesType.CATEGORIES:
                   return <Menu data={{ ...theme.categories, ...item }} />; */
                case ModulesType.BANNER:
                   return <Banner data={{ ...theme.data.banner as any, ...item }} />;
            
                 case ModulesType.IMAGE_PLUS_TEXT:
                   return (
                     <ImagePlusText
                       data={{ ...theme.data.imagePlusText as any, ...item }}
                     />
                   );
              

                 default:
                   break;
               }
      })}
    </div>
  )
};
