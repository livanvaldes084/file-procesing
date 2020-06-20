const FileService = require("../services/file_service");
const path = require("path");
const { FindAllDataSchema } = require("../utils/data_schemas/files");

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
};
