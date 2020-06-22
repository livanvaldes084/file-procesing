const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const CONST = require("../constants");

/**
 *
 * @param {*} filename
 */
async function parserFile(filename) {
  let lineParser = 0;
  // logic for count line parser
  let dirPath = path.join(__dirname, "..", "files", filename + ".tsv");
  let dirPathLog = path.join(__dirname, "..", "files", "log.txt");
  const writableStream = fs.createWriteStream(dirPathLog);

  fs.createReadStream(dirPath)
    .pipe(csv())
    .on("data", (row) => {
      writableStream.write(CONST.STATUS_FILE_STARTED);
      lineParser++;
    })
    .on("end", () => {
      return lineParser;
    });
  return lineParser;
}
// receive message from master process
process.on("message", async (message) => {
  const numberOfLineParser = await parserFile(message.filename);

  // send response to master process
  process.send({ counter: numberOfLineParser });
});
