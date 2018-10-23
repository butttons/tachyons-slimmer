import fs from 'fs-extra';
const parseFile = (filePath: string) => async (transform: TachyonsSlimmer.TransformFile | undefined) => {
    const fileData: TachyonsSlimmer.RawFile = await fs.readFile(filePath).then((buffer: Buffer) => buffer.toString());
    return transform ? transform(fileData) : fileData;
};
export default parseFile;
