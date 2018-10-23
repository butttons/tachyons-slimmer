import parseFile from '../parser/parse-file';
import getClassNames from '../parser/get-class-names';
import { uniq } from 'lodash';
import path from 'path';
const extractTachyons = async (options: TachyonsSlimmer.ExtractTachyonsOptions): Promise<TachyonsSlimmer.FileRules> => {
    const successFiles: string[] = [];
    const successClassNames: string[] = [];
    for (let fileName of options.allFiles) {
        const fullFilePath: TachyonsSlimmer.FilePath = path.join(options.fullPath, fileName);
        const parsedHtml = await parseFile(fullFilePath)(options.transformFile);
        const classNames = getClassNames(parsedHtml);
        for (let className of classNames) {
            const tachyonsFile = Object.keys(options.baseClasses).find((tachyonsClass) => tachyonsClass === className);
            if (tachyonsFile !== undefined && successFiles.indexOf(options.baseClasses[className]) === -1) {
                successFiles.push(options.baseClasses[className]);
            }
            successClassNames.push(className);
        }
    }
    return { files: successFiles, classNames: uniq(successClassNames) };
};
export default extractTachyons;
