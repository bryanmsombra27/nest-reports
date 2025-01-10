import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormated } from 'src/helpers';
import { headerSection } from './sections/header.section';

interface ReportValues {
  employerName: String;
  employerPosition: String;
  employeeName: String;
  employeePosition: String;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

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

export const getEmploymentLetterById = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerCompany,
    employeeHours,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeWorkSchedule,
    employerName,
    employerPosition,
  } = values;

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
        Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, 
por medio de la presente certifco que ${employeeName} ha sido empleado en nuestra 
empresa desde el   ${DateFormated.getDDMMMMYYYY(employeeStartDate)}. \n\n
Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition} , demostrando responsabilidad, compromiso y habilidades profesionales en sus 
labores.\n
La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas 
semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y 
procedimientos establecidos por la empresa.\n\n
Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.\n
        `,
        style: {
          alignment: 'justify',
        },
      },
      {
        text: `
        Atentamente,\n
${employerName}\n
${employerPosition}\n
${employerCompany}\n
${DateFormated.getDDMMMMYYYY(new Date())}\n


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
