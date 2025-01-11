import { countries as Country } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subTitle?: string;
  data: Country[];
}

export const getCountriesReport = (
  opt: ReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, data } = opt;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subTitle: subTitle ?? 'List of countries',
      showLogo: true,
    }),
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        // layout: 'lightHorizontalLines', // optional
        layout: 'customLayout01',
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          // tamaño  que tendran las columnas
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            // los valores deben regresarse en strings para ser impresos en el pdf
            ...data.map((item) => [
              item.id.toString(),
              item.iso2.toString(),
              item.iso3.toString(),
              {
                text: item.name.toString(),
                bold: true,
              },
              item.continent.toString(),
              item.local_name.toString(),
            ]),
          ],
        },
      },
      {
        text: 'Totales',
        marginTop: 50,
        style: {
          fontSize: 18,
          bold: true,
          // margin: [0, 100, 0, 0],
        },
      },
      {
        // marginTop: 100,
        layout: 'noBorders',
        table: {
          headerRows: 1,
          // tamaño  que tendran las columnas
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              { text: 'Total de paises', bold: true, colSpan: 2 },
              {},
              { text: data.length.toString(), bold: true },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
    footer: footerSection,
  };
};
