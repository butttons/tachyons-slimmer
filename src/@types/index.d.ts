declare namespace TachyonsSlimmer {
    export type CssSelector = string;
    export type CssFile = string;
    export type FileName = string;
    export type FilePath = string;
    export type RawFile = string;
    export type ParsedHtml = string;
    export type HtmlContent = string;

    export interface SlimOptions {
        logger?: boolean;
        dirName?: string;
        outFile?: string | undefined;
        preserveImports?: boolean;
        fileType?: string;
        htmlParser?: TransformFile;
        postcss?: {
            debugTachyon?: boolean;
            normalize?: boolean;
            exclude?: string[];
        };
    }
    export interface GenerateBaseOptions {
        fileNames: string[];
        debug?: boolean;
        normalize?: boolean;
        override?: {
            colors?: string | boolean;
            mediaQueries?: string | boolean;
            variables?: string | boolean;
        };
    }
    export interface ParserFileOptions {
        fullPath: FilePath;
        extension: 'html' | 'vue' | string;
    }
    export interface CssRules {
        [key: string]: CssFile;
    }
    export interface FileRules {
        files: string[];
        classNames: string[];
    }
    export interface ExtractTachyonsOptions {
        fullPath: FilePath;
        allFiles: FileName[];
        baseClasses: CssRules;
        transformFile?: TransformFile;
    }
    export interface ResultSummary {
        filesRead: number;
        cssRulesFound: number;
        cssFileImports: {
            count: number;
            files: string[];
        };
        cssRulesAdded: number;
    }
    export type TransformFile = (data: RawFile) => ParsedHtml;
    export type TransformVueTemplate = (data: string) => HtmlContent;
}
