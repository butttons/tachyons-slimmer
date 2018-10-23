import path from 'path';
import tachyonsBuildCss from 'tachyons-build-css';
import fs from 'fs-extra';
import postcss from 'postcss';

import extractTachyons from './tachyons/extract-tachyons';
import generateBase from './tachyons/generate-base';
import saveBase from './tachyons/save-base';
import getFiles from './parser/get-files';
import tachyonsClassList from './tachyons/class-list';
import removeNodes from './tachyons/remove-nodes';

const tachyonsSlimmer = async ({
    dirName,
    preserveImports = false,
    outFile = 'tachyons.slim.css',
    fileType = 'html',
    htmlParser,
    postcss: { debugTachyon = false, normalize = true } = {}
}: TachyonsSlimmer.SlimOptions) => {
    const result: TachyonsSlimmer.ResultSummary = {
        filesRead: 0,
        cssRulesFound: 0,
        cssFileImports: {
            count: 0,
            files: []
        },
        cssRulesAdded: 0
    };
    try {
        const fullPath = dirName !== undefined ? path.join(process.cwd(), '..', dirName) : process.cwd();
        const allFiles: TachyonsSlimmer.FileName[] = await getFiles({ fullPath, extension: fileType });
        if (allFiles.length === 0) {
            console.warn(`No files found in ${fullPath}`);
            return;
        }
        result.filesRead = allFiles.length;
        const tachyonsClasses: TachyonsSlimmer.CssRules = await tachyonsClassList();
        const { files, classNames }: TachyonsSlimmer.FileRules = await extractTachyons({
            fullPath,
            allFiles,
            baseClasses: tachyonsClasses,
            transformFile: htmlParser
        });
        result.cssRulesFound = classNames.length;
        result.cssFileImports.count = files.length;
        result.cssFileImports.files = files;
        const baseFile: postcss.Result = generateBase({ fileNames: files, debug: debugTachyon, normalize });
        const tempFile: TachyonsSlimmer.FilePath = await saveBase(baseFile.css);

        const postCssRoot: postcss.Root = await tachyonsBuildCss(baseFile.css, {
            from: tempFile,
            to: outFile
        }).then((result: postcss.Result) => result.root);
        const resultCss: postcss.Root = preserveImports ? postCssRoot : removeNodes(postCssRoot, classNames);
        await fs.writeFile(String(outFile), resultCss);
        await fs.remove(tempFile);
        result.cssRulesAdded = resultCss.nodes ? resultCss.nodes.length : 0;
    } catch (e) {
        console.error('ERROR!');
        console.log(e);
    }
    return result;
};
export default tachyonsSlimmer;
export { tachyonsSlimmer };
