import { Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    text: `Page ${currentPage} of ${pageCount}`,
    alignment: 'center',
    fontSize: 12,
    bold: true,
    margin: [0, 20, 40, 0],
  };
};
