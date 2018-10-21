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
const fs_extra_1 = __importDefault(require("fs-extra"));
const parse_vue_file_1 = __importDefault(require("./parse-vue-file"));
const DIR_NAME = 'nuxt-ui';
const fullPath = path_1.default.join(__dirname, '..', '..', DIR_NAME);
const vueFile = (fullPath, fileName) => __awaiter(this, void 0, void 0, function* () {
    const filePath = path_1.default.join(fullPath, fileName);
    return yield fs_extra_1.default.readFile(filePath).then((buffer) => buffer.toString());
});
(() => __awaiter(this, void 0, void 0, function* () {
    //const files: string[] = await getVueFiles(fullPath);
    const files = ['components/home/ProgressBox.vue'];
    console.log('files', files);
    for (let file of files) {
        const parsedVue = yield parse_vue_file_1.default(fullPath, file);
        console.log('parsedVue', parsedVue);
        break;
    }
}))();
