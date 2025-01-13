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

const date: Content = {
  text: DateFormated.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 30],
  width: 150,
  fontSize: 10,
};

export const headerSection = (opt: HeaderOptions): Content => {
  const { title, showDate = true, showLogo = true, subTitle } = opt;

  const headerSubtitle: Content = subTitle
    ? {
        text: subTitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 16,
          bold: true,
        },
      }
    : null;
  const headerTitle: Content = title
    ? {
        text: title ? title : null,
        alignment: 'center',
        margin: [0, 15, 0, 0],
        style: {
          bold: true,
          fontSize: 22,
        },
      }
    : null;

  return {
    columns: [
      showLogo ? logo : null,
      {
        stack: [headerTitle, headerSubtitle],
      },
      showDate ? date : null,
    ],
  };
};
