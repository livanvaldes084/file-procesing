const fs = require("fs");
const path = require("path");
const filesHelper = require("../helpers/files_helper");

class FileService {
  /**
   * List Files
   * @param {*} dirPath
   * @param {*} arrayOfFiles
   */
  static getAllFiles = (dirPath, arrayOfFiles, humanreadable = false) => {
    let files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(
          dirPath + "/" + file,
          arrayOfFiles,
          humanreadable
        );
      } else {
        let stats = fs.statSync(dirPath + "/" + file);
        let fileSize = humanreadable
          ? filesHelper.getFileSize(stats)
          : stats["size"];
        //Valid is the valid file
        if (path.extname(file) == ".tsv")
          arrayOfFiles.push({
            name: file,
            size: fileSize,
          });
      }
    });

    return arrayOfFiles;
  };
}

module.exports = FileService;
