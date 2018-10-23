import * as vueParser from 'vue-parser';
const vueHtmlParser: Function = (transform: TachyonsSlimmer.TransformVueTemplate) => (data: string) => {
    const template: string = vueParser.parse(data, 'template').replace(/[\/]{2,}\n/, '');
    return transform ? transform(template) : template;
};
export default vueHtmlParser;
export { vueHtmlParser };
