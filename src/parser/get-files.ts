import globby from 'globby';
const getFiles = async (options: TachyonsSlimmer.ParserFileOptions): Promise<TachyonsSlimmer.FileName[]> => {
    return await globby([ `**/*.${options.extension}`, '!node_modules' ], { cwd: options.fullPath });
};
export default getFiles;
