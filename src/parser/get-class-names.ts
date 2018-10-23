import cheerio from 'cheerio';
import _ from 'lodash';
const getClassNames = (html: TachyonsSlimmer.HtmlContent): string[] => {
    const $ = cheerio.load(html);
    const allElms = $('*')
        .map((_, el) => {
            return el.attribs.class;
        })
        .get()
        .map((classList) => classList.split(' ').map((className) => `.${className}`));
    const classList = _.uniq(_.flattenDepth(allElms, 2)) as string[];
    return classList;
};
export default getClassNames;
