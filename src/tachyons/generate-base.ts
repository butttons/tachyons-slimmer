import postcss from 'postcss';
const generateBase = ({
    fileNames,
    normalize = true,
    debug = false,
    override: { colors = false, mediaQueries = false, variables = false } = {}
}: TachyonsSlimmer.GenerateBaseOptions): postcss.Result => {
    let imports: string[] = [];
    if (normalize) imports = [ ...imports, '_normalize' ];
    imports = [ ...imports, ...fileNames ];
    if (debug) imports = [ ...imports, '_debug-children', '_debug-grid', '_debug' ];
    if (!colors) imports = [ ...imports, '_colors' ];
    if (!mediaQueries) imports = [ ...imports, '_media-queries' ];
    //if (!variables) imports = [ ...imports, '_variables' ];
    const newCss = postcss.root();
    imports.forEach((imp) =>
        newCss.append(
            postcss.atRule({
                name: 'import',
                params: `"./${imp}.css"`
            })
        )
    );
    return newCss.toResult();
};
export default generateBase;
