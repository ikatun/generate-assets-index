#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob = __importStar(require("glob"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
const rootPath = process.argv[2];
if (!rootPath) {
    throw new Error('Missing root path');
}
const files = glob.sync('**/*', { nodir: true, cwd: rootPath }).filter(f => !f.endsWith('index.ts'));
const importInfos = files.map(filePath => {
    const componentName = lodash_1.default.upperFirst(lodash_1.default.camelCase(path_1.default.basename(filePath)));
    return { componentName, filePath };
});
const imports = importInfos.map(({ filePath, componentName }) => `import ${componentName} from './${filePath}'`);
const indexTs = `${imports.join(';\n')};

export {
  ${importInfos.map(importInfo => importInfo.componentName).join(',\n  ')},
};
`;
console.log(indexTs);
fs_1.default.writeFileSync(path_1.default.join(rootPath, 'index.ts'), indexTs, {
    encoding: 'utf8',
});
//# sourceMappingURL=generate-assets-index.js.map