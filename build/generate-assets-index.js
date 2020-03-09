#!/usr/bin/env node
"use strict";

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootPath = process.argv[2];

if (!rootPath) {
  throw new Error('Missing root path');
}

const files = _glob.default.sync('**/*', {
  nodir: true,
  cwd: rootPath
}).filter(f => !f.endsWith('index.ts'));

const importInfos = files.map(filePath => {
  const componentName = _lodash.default.upperFirst(_lodash.default.camelCase(_path.default.basename(filePath)));

  return {
    componentName,
    filePath
  };
});
const imports = importInfos.map(({
  filePath,
  componentName
}) => `import ${componentName} from './${filePath}'`);
const indexTs = `${imports.join(';\n')};

export {
  ${importInfos.map(importInfo => importInfo.componentName).join(',\n  ')},
};
`;
console.log(indexTs);

_fs.default.writeFileSync(_path.default.join(rootPath, 'index.ts'), indexTs, {
  encoding: 'utf8'
});