import { Content } from 'pdfmake/interfaces';
import { DateFormated } from 'src/helpers';

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}
const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = (opt: HeaderOptions): Content => {
  const { title, showDate = true, showLogo = true, subTitle } = opt;

  return {
    columns: [
      showLogo ? logo : null,
      {
        text: title ? title : null,
        style: {
          bold: true,
        },
      },
      {
        text: showDate ? DateFormated.getDDMMMMYYYY(new Date()) : null,
        alignment: 'right',
        margin: [20, 20],
      },
    ],
  };
};
