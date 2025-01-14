import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';
interface ContentReplacer {
  [key: string]: string;
}

export const getHtmlContent = (
  html: string,
  replacers: ContentReplacer = {},
) => {
  const { window } = new JSDOM();

  Object.entries(replacers).forEach(([key, value]) => {
    const key1 = `{{ ${key} }}`;
    const key2 = `{{${key}}}`;

    html = html.replaceAll(key1, value).replaceAll(key2, value);
  });

  return htmlToPdfmake(html, window);
};
