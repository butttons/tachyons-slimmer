const DIR_NAME = 'nuxt-ui';

const vueParser = require('vue-parser');
const globby = require('globby');
const path = require('path');
const fs = require('fs-extra');
const fullPath = path.join(__dirname, '..', DIR_NAME);
console.log('fullPath', fullPath);

const vueFile = async (fullPath, fileName) => {
    const filePath = path.join(fullPath, fileName);
    return await fs.readFile(filePath).then((buffer) => buffer.toString());
};
(async () => {
    if (!fs.existsSync(fullPath)) console.error('No directory');
    const paths = await globby([ '**/*.vue', '!node_modules' ], { cwd: fullPath });
    console.log('paths', paths);
})();
