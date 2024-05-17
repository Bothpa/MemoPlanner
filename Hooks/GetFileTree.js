const fs = require('fs');
const path = require('path');

function getDirectoryContents(dirPath,userid) {
  const items = fs.readdirSync(dirPath);
  return items.map(item => {
    const itemPath = path.join(dirPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    const modifiedPath = itemPath.replace(`/home/jungsonghun/drive_server/${userid}/`, '');
    return {
      name: item,
      path: modifiedPath,
      parentPath: path.dirname(modifiedPath),
      isDirectory: isDirectory,
      children: isDirectory ? getDirectoryContents(itemPath,userid) : null
    };
  });
}

module.exports = getDirectoryContents;
