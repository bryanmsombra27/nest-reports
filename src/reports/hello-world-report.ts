import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const helloWorldReport = (opt: ReportOptions): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [`hola motherfucker ${opt.name}`],
  };
  return docDefinition;
};
