"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const tachyons_build_css_1 = __importDefault(require("tachyons-build-css"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const extract_tachyons_1 = __importDefault(require("./tachyons/extract-tachyons"));
const generate_base_1 = __importDefault(require("./tachyons/generate-base"));
const save_base_1 = __importDefault(require("./tachyons/save-base"));
const get_files_1 = __importDefault(require("./parser/get-files"));
const class_list_1 = __importDefault(require("./tachyons/class-list"));
const remove_nodes_1 = __importDefault(require("./tachyons/remove-nodes"));
const tachyonsSlimmer = ({ dirName, preserveImports = false, outFile = 'tachyons.slim.css', fileType = 'html', htmlParser, postcss: { debugTachyon = false, normalize = true } = {} }) => __awaiter(this, void 0, void 0, function* () {
    const result = {
        filesRead: 0,
        cssRulesFound: 0,
        cssFileImports: {
            count: 0,
            files: []
        },
        cssRulesAdded: 0
    };
    try {
        const fullPath = dirName !== undefined ? path_1.default.join(process.cwd(), '..', dirName) : process.cwd();
        const allFiles = yield get_files_1.default({ fullPath, extension: fileType });
        if (allFiles.length === 0) {
            console.warn(`No files found in ${fullPath}`);
            return;
        }
        result.filesRead = allFiles.length;
        const tachyonsClasses = yield class_list_1.default();
        const { files, classNames } = yield extract_tachyons_1.default({
            fullPath,
            allFiles,
            baseClasses: tachyonsClasses,
            transformFile: htmlParser
        });
        result.cssRulesFound = classNames.length;
        result.cssFileImports.count = files.length;
        result.cssFileImports.files = files;
        const baseFile = generate_base_1.default({ fileNames: files, debug: debugTachyon, normalize });
        const tempFile = yield save_base_1.default(baseFile.css);
        const postCssRoot = yield tachyons_build_css_1.default(baseFile.css, {
            from: tempFile,
            to: outFile
        }).then((result) => result.root);
        const resultCss = preserveImports ? postCssRoot : remove_nodes_1.default(postCssRoot, classNames);
        yield fs_extra_1.default.writeFile(String(outFile), resultCss);
        yield fs_extra_1.default.remove(tempFile);
        result.cssRulesAdded = resultCss.nodes ? resultCss.nodes.length : 0;
    }
    catch (e) {
        console.error('ERROR!');
        console.log(e);
    }
    return result;
});
exports.default = tachyonsSlimmer;
