#!/usr/bin/env node
import * as glob from 'glob';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';

const rootPath = process.argv[2];
if (!rootPath) {
  throw new Error('Missing root path');
}

const files = glob.sync('**/*', { nodir: true, cwd: rootPath }).filter(f => !f.endsWith('index.ts'));

const importInfos = files.map(filePath => {
  const componentName = _.upperFirst(_.camelCase(path.basename(filePath)));
  return { componentName, filePath };
});

const imports = importInfos.map(({ filePath, componentName }) => `import ${componentName} from './${filePath}'`);

const indexTs = `${imports.join(';\n')};

export {
  ${importInfos.map(importInfo => importInfo.componentName).join(',\n  ')},
};
`;

console.log(indexTs);
fs.writeFileSync(path.join(rootPath, 'index.ts'), indexTs, {
  encoding: 'utf8',
});
