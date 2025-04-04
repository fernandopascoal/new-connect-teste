import { CookiesData } from "../../interfaces";
import { useTranslation } from "react-i18next";
import { useMobilePreferenceDataWhenMobile } from "../../hooks/useMergeMobileData/useMergeMobileData";
import TranslatableComponent from "../TranslatableComponent";
import { convertSpacingToCSS } from "../../utils/convertSpacingToCSS";
import { useEffect, useState } from "react";

export const Cookies = ({ data }: { data: CookiesData }) => {
  const [translate] = useTranslation();
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  const { styleData, contentData, mobileStyleData, mobileContentData } = data;

  const mergedStyleData = useMobilePreferenceDataWhenMobile(
    styleData,
    mobileStyleData
  );
  const mergedContentData = useMobilePreferenceDataWhenMobile(
    contentData,
    mobileContentData
  );

  const {
    backgroundColor,
    textColor,
    buttonBgColor,
    buttonTextColor,
    privacyPolicy,
    privacyPolicyLinkColor,
    privacyPolicyLink,
    margin,
    //padding,
  } = mergedStyleData;

  const { disclaimer } = mergedContentData;

  useEffect(() => {
    if (window) {
      const acceptedCookies = Boolean(localStorage.getItem("acceptedCookies"));
      setAcceptedCookies(acceptedCookies);
    }
  }, []);

  const handleAcceptCookies  = () => {
    localStorage.setItem("acceptedCookies", "true");
    setAcceptedCookies(true)
  }


  console.log(acceptedCookies, "acceptedCookies");

  const sampleDisclaimer =
    "Nós utilizamos cookies e outras tecnologias semelhantes para coletar dados durante a navegação para melhorar a sua experiência em nossos serviços. Saiba mais em nossa";

  if (acceptedCookies === true) return null;

  return (
    <TranslatableComponent>
      <div
        id="sf-cookies"
        style={{
          backgroundColor,
          margin: convertSpacingToCSS(margin),
          padding: "32px 16px",
        }}
        className="pw-box-border lg:pw-max-h-[89px] pw-py-3 lg:pw-py-[23.5px] pw-px-14 lg:pw-px-[114px] pw-flex pw-justify-center pw-items-center pw-bottom-0 pw-left-0 pw-right-0 pw-z-50 pw-fixed"
      >
        <div className="pw-max-w-[1029px] pw-flex pw-items-center pw-justify-between pw-h-full pw-flex-wrap lg:pw-flex-nowrap pw-gap-2">
          <p
            className="pw-text-sm pw-max-w-[949px] pw-leading-5"
            style={{ color: textColor }}
          >
            {disclaimer || sampleDisclaimer}
            {privacyPolicy && (
              <a
                href={privacyPolicyLink}
                target="_blank"
                style={{ color: privacyPolicyLinkColor }}
                rel="noreferrer"
                className="pw-font-bold"
              >
                {" "}
                {translate("storefront>cookies>privacyPolicy")}
              </a>
            )}
          </p>
          <button
            style={{
              background: buttonBgColor,
              color: buttonTextColor,
            }}
            className="pw-border-none pw-text-sm pw-h-[32px] pw-w-[109px] pw-px-4 pw-py-2 pw-rounded-lg pw-whitespace-nowrap pw-leading-4"
            onClick={() => handleAcceptCookies()}
          >
            {translate("storefront>cookies>iAgree")}
          </button>
        </div>
      </div>
    </TranslatableComponent>
  );
};
