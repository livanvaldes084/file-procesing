const FileService = require("../services/file_service");
const path = require("path");
const { FindAllDataSchema } = require("../utils/data_schemas/files");
const csv = require("csv-parser");
const fs = require("fs");
const winston = require("winston");
const CONST = require("../constants");
const moment = require("moment");
const { fork } = require("child_process");

module.exports = {
  /**
   * Create new user and send reset password email
   * @route POST /file
   * @group File - Operations about file
   * @param {boolean} humanreadable.query
   * @produces application/json
   * @consumes application/json
   * @returns {Error}  default - Unexpected error
   * @security JWT
   */
  async list(request, response, next) {
    try {
      const humanreadable = request.query.humanreadable;
      let dirPath = path.join(__dirname, "..", "files");
      const files = await FileService.getAllFiles(dirPath, [], humanreadable);
      return response.status(200).json(files);
    } catch (err) {
      return response.status(400).send({ msg: err.message });
    }
  },
  /**
   * Create new user and send reset password email
   * @route POST /metrics
   * @group File - Operations about file
   * @param {string} filename.query
   * @produces application/json
   * @consumes application/json
   * @returns {Error}  default - Unexpected error
   * @security JWT
   */
  async metrics(request, response, next) {
    try {
      const filename = request.query.filename;
      // fork another process
      const process = fork("./controllers/parser.js");
      // send parse
      process.send({ filename });

      // listen for messages from forked process
      process.on("message", (message) => {
        console.log(`Number of parser count ${message.counter}`);
      });
      return response.status(200).json({
        Status: CONST.STATUS_FILE_READY,
        Started: moment().format(),
      });
    } catch (err) {
      return response.status(400).send({ msg: err.message });
    }
  },
};
