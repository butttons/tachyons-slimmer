declare module 'tachyons-build-css' {
    import postcss from 'postcss';
    export interface tachyonsProcessOptions extends postcss.ProcessOptions {
        minify?: boolean;
        plugins?: Function[];
        preserveVariables?: boolean;
        repeat?: number;
        rtl?: boolean;
    }
    export default function(css: string, options?: tachyonsProcessOptions): postcss.LazyResult;
}
