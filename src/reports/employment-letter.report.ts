import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormated } from 'src/helpers';
import { headerSection } from './sections/header.section';
const styleDictionary: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 20, 0],
  },
};

export const getEmploymentLetter = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 60],
    styles: styleDictionary,
    header: headerSection({
      showDate: true,
      showLogo: true,
      title: 'koso',
    }),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `
        Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], 
por medio de la presente certifco que [Nombre del Empleado] ha sido empleado en nuestra 
empresa desde el [Fecha de Inicio del Empleado]. \n\n
Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del 
Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus 
labores.\n\n
La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas 
semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y 
procedimientos establecidos por la empresa.\n\n
Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.\n\n
        `,
        style: {
          alignment: 'justify',
        },
      },
      {
        text: `
        Atentamente,\n
[Nombre del Empleador]\n
[Cargo del Empleador]\n
[Nombre de la Empresa]\n
[Fecha de Emisión]\n


        `,
        style: 'signature',
      },
    ],

    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral',
      style: 'footer',
    },
  };

  return docDefinition;
};
