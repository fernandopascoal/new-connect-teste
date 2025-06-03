"use client";

import TabPageTitle from "../../../modules/shared/components/TabPageTitle";
import { ThemeProvider } from "../../../modules/shared/providers/ThemeProvider";
import { StorefrontPreview } from "../../../modules/shared/components/StoreFrontPreview";

import { SignInTemplateSDK } from "w3block-new-lib";

export default function Page() {

  return (
    <>
      <TabPageTitle pageTitle="Login" />
      <ThemeProvider>
        <StorefrontPreview>
          <SignInTemplateSDK
            classes={{
              besideInfoClass: "lg:w-auto lg:pr-[60px]",
              infoComponentClass: "lg:flex-1 lg:w-auto lg:pl-[20px]",
            }}
          />
        </StorefrontPreview>
      </ThemeProvider>
    </>
  );
}
