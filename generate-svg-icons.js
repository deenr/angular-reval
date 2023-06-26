const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, './src/assets/svg');

function generateSvgIconNames(dirPath) {
  const svgIconNames = [];
  console.log('generating svg icons');

  function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isFile() && path.extname(filePath) === '.svg') {
        const iconName = path.basename(file, '.svg');
        const iconPath = filePath.replace(__dirname, '.');
        svgIconNames.push({name: iconName, path: iconPath.replace('src/', '')});
      } else if (fileStat.isDirectory()) {
        processDirectory(filePath);
      }
    });
  }

  processDirectory(dirPath);

  console.log('completed generating svg icons');
  return svgIconNames;
}

const svgIconNames = generateSvgIconNames(directoryPath);
const outputFilePath = path.join(__dirname, './src/app/svg-icons.generated.ts');
const exportContent = `export const SVG_ICONS = ${JSON.stringify(svgIconNames, null, 2)};`;

fs.writeFileSync(outputFilePath, exportContent);
