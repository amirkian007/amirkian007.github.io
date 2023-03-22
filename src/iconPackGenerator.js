const webfontsGenerator = require('./webFont');
const fs = require('fs');
const path = require('path');

function generateIconPack(options) {

  const distFolderPath = path.resolve(process.cwd(), options.dest);
  const iconsFolderPath = path.resolve(process.cwd(), options.icons);
  fs.readdir(iconsFolderPath, (err, files) => {
    if (err) {
      return;
    }

    const svgFiles = files.filter(file => path.extname(file) === '.svg');
    const svgList = svgFiles.map(file => path.resolve(options.icons, file));
    const generatorOptions = { ...options, ...{ files: svgList, dest: options.dest + '/fonts' } }

    function generateFont() {
      webfontsGenerator(generatorOptions, function (error) {
        if (error) {
          console.log('Error generating web-fonts:', error);
        } else {
          console.log('Web-fonts generated successfully');
        }
      });
    }

    if (fs.existsSync(distFolderPath)) {
      deleteFolderRecursive(distFolderPath);
      generateFont()
    } else {
      generateFont()
    }
    
  });
}

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call for subdirectories
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    // Delete empty directory
    fs.rmdirSync(folderPath);
  }
}

module.exports = {
  generateIconPack
}