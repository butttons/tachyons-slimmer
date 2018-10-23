import { readFile } from 'fs-extra';
import postcss from 'postcss';
const extractCssRules = async (filePath: string): Promise<string[]> => {
    const cssData = await readFile(filePath).then((buffer: Buffer) => buffer.toString());
    const processed = postcss.parse(cssData);
    const cssRules: TachyonsSlimmer.CssSelector[] = [];
    processed.walk((node: postcss.ChildNode) => {
        if (node.type === 'rule') {
            cssRules.push(node.selector);
        }
    });
    return cssRules;
};
export default extractCssRules;
