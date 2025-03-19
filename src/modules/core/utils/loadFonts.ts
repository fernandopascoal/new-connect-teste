// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadFonts(fonts: Array<any>) {
    if (document) {
      const customFonts = fonts;
      customFonts.map(
        async (res: {
          fontFamily: string;
          src: string;
          fontStyle: string;
          fontWeight: string;
        }) => {
          const font = new FontFace(res.fontFamily, `url(${res.src})`, {
            style: res.fontStyle,
            weight: res.fontWeight,
          });
          await font.load();
          document.fonts.add(font);
        }
      );
      document.body.classList.add('fonts-loaded');
    }
  }
  