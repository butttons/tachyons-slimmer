import globby from 'globby';
import path from 'path';
import extractCssRules from './extract-css-rules';
const TACHYON_PATH = path.join(__dirname, '..', '..', 'tachyons', 'src');

const tachyonsClassList = async (): Promise<TachyonsSlimmer.CssRules> => {
    const cssFiles = await globby([ '*.css' ], { cwd: TACHYON_PATH });
    const allClasses: TachyonsSlimmer.CssRules = {};
    for (let cssFile of cssFiles) {
        const rules = await extractCssRules(path.join(TACHYON_PATH, cssFile));
        rules.forEach((rule) => (allClasses[rule] = cssFile.replace('.css', '')));
    }
    return allClasses;
};
export default tachyonsClassList;
