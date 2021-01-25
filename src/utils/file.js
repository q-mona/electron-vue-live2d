const fs = require('fs')

function getFilePath(filePath, fileName) {
  return filePath.slice(0, filePath.length - fileName.length)
}

function getFileName(fileName) {
  const type = getFileType(fileName)
  return fileName.slice(0, fileName.length - type.length - 1)
}

function getFileType(fileName) {
  let arr = fileName.split(/\./)
  return arr[arr.length - 1]
}

function setFilePath(filePath, fileName) {
  const path = getFilePath(filePath, fileName)
  const name = getFileName(fileName)
  let n = 1;
  let temp = path + name + '.txt'
  while (fs.existsSync(temp)) {
    temp = path + name + '(' + n + ')' + '.txt' 
    n++
  }
  return temp
}

function writeFile(filePath, fileName, text, callback) {
  fs.writeFile(setFilePath(filePath, fileName), text, err => {
    if (err)
      callback(err)
  })
  const res = 'finish'
  callback(res)
}

export {
  writeFile
}