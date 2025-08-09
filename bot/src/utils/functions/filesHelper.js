const path = require("path")
const fs = require("fs")

function getFiles(currentPath, arr = []) {
  const foldersOrFiles = fs.readdirSync(currentPath, { withFileTypes: true })

  for (const folderOrFile of foldersOrFiles) {
    const currPath = path.join(currentPath, folderOrFile.name)
    if (folderOrFile.isDirectory()) getFiles(currPath, arr)
    if (folderOrFile.name.endsWith(".js")) arr.push({ name: folderOrFile.name, path: currPath })
  }

  return arr
}

exports.getFiles = getFiles
