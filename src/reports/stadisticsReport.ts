import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line-cart';
import { getBarsChart } from './charts/barschart';
import { footerSection } from './sections/footer.section';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  data: TopCountry[];
}

export const getStadisticsReport = async (
  opt: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const [donutChart, lineChart, barsChart, barsChart2] = await Promise.all([
    getDonutChart({
      position: 'left',
      entries: opt.data.map((item) => ({
        label: item.country,
        value: item.customers,
      })),
    }),
    getLineChart(),
    getBarsChart(),
    getBarsChart(),
  ]);

  return {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: opt.title ?? 'Estadisticas de Clientes',
      subTitle: opt.subTitle ?? 'Top 10 paises con mas clientes',
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 paises con mas clientes',
                alignment: 'center',
                marginBottom: 10,
                bold: true,
                fontSize: 18,
              },
              {
                image: donutChart,
                width: 350,
              },
            ],
          },

          {
            width: 'auto',
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Pais', 'Clientes'],
                ...opt.data.map((item) => [item.country, item.customers]),
              ],
            },
          },
        ],
      },
      { image: lineChart, width: 500, margin: [0, 20] },
      {
        columnGap: 10,
        columns: [
          {
            image: barsChart,
            width: 250,
          },
          {
            image: barsChart2,
            width: 250,
          },
        ],
      },
    ],
  };
};
