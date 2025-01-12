import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormater, DateFormated } from 'src/helpers';
import { footerSection } from './sections/footer.section';

interface ReportValues {
  title?: string;
  subtitle?: string;
  data: CompleteOrder;
}

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 20],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subheader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;
  const { customers, order_details } = data;

  const subtotal = order_details.reduce(
    (acc, value) => acc + Number(value.quantity * +value.products.price),
    0,
  );

  const total = subtotal + subtotal * 0.15;

  return {
    styles: styles,
    header: logo,
    footer: footerSection,
    pageMargins: [40, 60, 40, 60],
    content: [
      { text: 'Tucan Code', style: 'header' },
      {
        columns: [
          {
            text: `Tucan Code\n15 Montgomery Str, Suite 100,\nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com`,
          },
          {
            text: [
              { text: `Recibo N° ${data.order_id}\n`, bold: true },
              `  Fecha del recibo ${DateFormated.getDDMMMMYYYY(data.order_date)} \n Pagar antes de ${DateFormated.getDDMMMMYYYY(new Date())}\n `,
            ],
            alignment: 'right',
          },
        ],
      },

      { qr: 'https://youtube.com', fit: 75, alignment: 'right' },
      {
        text: [
          { text: 'Cobrar a:\n', bold: true, style: 'subheader' },
          `Razón Social: ${customers.customer_name}`,
          `Contacto:${customers.contact_name}`,
        ],
      },

      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripcion', 'Cantidad', 'Precio', 'Total'],

            ...order_details.map((order) => [
              order.order_detail_id.toString(),
              order.products.product_name.toString(),
              order.quantity.toString(),
              {
                text: CurrencyFormater.format(+order.products.price),
                aligment: 'right',
              },
              {
                text: CurrencyFormater.format(
                  +order.products.price * order.quantity,
                ),
                aligment: 'right',
              },
            ]),
          ],
        },
      },
      '\n\n',
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormater.format(subtotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormater.format(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
