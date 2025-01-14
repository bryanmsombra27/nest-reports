import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const communityReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: `Forest Admin Community SAP \n RUT: 44.123.112\nCamino montaña km 14\n Telefono:332-332-332`,
          },
          {
            alignment: 'right',
            width: 140,
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No.', '123-456'],
                        ['Fecha', '2021-09-01'],
                        ['Version', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3a4546',
          },
        ],
      },

      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del cliente',
                fillColor: '#5775e1',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, true],
              },
              {},
              {},
              {},
            ],

            [
              {
                text: 'Razon Social',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
                // border: [false, false, false, true],
              },
              {
                text: 'Nombre de la Empresa',
                fillColor: 'white',
                color: 'white',
                // border: [false, false, false, true],
              },
              {
                text: 'Direccion',
                fillColor: '#343a40',
                // border: [false, false, false, true],
              },
              {
                text: 'Calle koso #36',
                fillColor: 'white',
                // border: [false, false, false, true],
              },
            ],
            [
              {
                text: 'Rut',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
                // border: [false, false, false, true],
              },
              {
                text: '',
                fillColor: 'white',
                color: 'white',
                // border: [false, false, false, true],
              },
              {
                text: 'Telefono',
                fillColor: '#343a40',
                // border: [false, false, false, true],
              },
              {
                text: '',
                fillColor: 'white',
                // border: [false, false, false, true],
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
                // border: [false, false, false, true],
              },
              {
                text: '',
                fillColor: 'white',
                color: 'white',
                // border: [false, false, false, true],
              },
              {
                text: 'Condicion de paga',
                fillColor: '#343a40',
                // border: [false, false, false, true],
              },
              {
                text: '',
                fillColor: 'white',
                // border: [false, false, false, true],
              },
            ],
          ],
        },
      },
    ],
  };

  return docDefinition;
};
