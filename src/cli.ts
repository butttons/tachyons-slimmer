#!/usr/bin/env node

import cli from './cli/index';
import tachyonsSlimmer from './index';

import signale from 'signale';

import vueHtmlParser from './plugins/vue-html-parser';
import pugParser from './plugins/pug-parser';

import fs from 'fs-extra';
import path from 'path';

if (cli.flags.vuePug && !cli.flags.vue) {
    console.error('Cannot enable vue pug parser without enabling vue first.');
    process.exit();
}
let htmlParser = undefined;
let fileType = cli.flags.fileType;
if (cli.flags.vue) {
    fileType = 'vue';
    htmlParser = cli.flags.vuePug ? vueHtmlParser(pugParser) : vueHtmlParser(false);
}
const slimOptions: TachyonsSlimmer.SlimOptions = {
    logger: true,
    dirName: cli.flags.dir ? cli.flags.dir : undefined,
    preserveImports: cli.flags.preserveImports,
    fileType: fileType,
    outFile: cli.flags.out,
    htmlParser,
    postcss: {
        debugTachyon: cli.flags.tachyonsDebug,
        normalize: cli.flags.tachyonsNormalize
    }
};
(async () => {
    signale.start('Starting process');
    const configFile = path.join(process.cwd(), cli.flags.config);
    const configExists = await fs.pathExists(configFile);
    let loadedConfig: TachyonsSlimmer.SlimOptions = {};
    if (configExists) {
        loadedConfig = require(configFile);
        if (typeof loadedConfig.htmlParser !== undefined) {
            slimOptions.htmlParser = loadedConfig.htmlParser;
        }
    }
    const result = (await tachyonsSlimmer(slimOptions)) as TachyonsSlimmer.ResultSummary;
    signale.info(`Files read: ${result.filesRead}`);
    signale.info(`CSS rules found in files: ${result.cssRulesFound}`);
    signale.info(`Tachyons files added: ${result.cssFileImports.count} | ${result.cssFileImports.files.join(', ')}`);
})();
