import pug from 'pug';
const pugParser: TachyonsSlimmer.TransformVueTemplate = (pugString: string): TachyonsSlimmer.HtmlContent => {
    if (pugString.indexOf('  ') === 0) {
        pugString = pugString.replace(/^[ ]{2}/gm, '');
    }
    return pug.render(pugString);
};
export default pugParser;
export { pugParser };
