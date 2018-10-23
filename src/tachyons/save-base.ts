import fs from 'fs-extra';
import path from 'path';
const saveBase = async (css: string): Promise<TachyonsSlimmer.FilePath> => {
    const tempFilePath = path.join(__dirname, '..', '..', 'tachyons', 'src', 'tachyons-slim.css');
    await fs.writeFile(tempFilePath, css);
    return tempFilePath;
};
export default saveBase;
