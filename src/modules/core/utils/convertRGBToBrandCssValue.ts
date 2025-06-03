export const convertRGBToBrandCssValue = (rgb: string) => {
    return rgb.replace('rgb(', '').replace(')', '').replaceAll(',', ' ');
  };
  