import { useContext } from "react";
import { StyleConnectConfigContext } from "../../../core/providers/StyleConnectConfigProvider";

export const useStyleConnectConfig = () => {
  const styleConnect = useContext(StyleConnectConfigContext);
  return { ...styleConnect };
};
