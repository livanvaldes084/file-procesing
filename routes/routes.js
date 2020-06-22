const FileController = require("../controllers/file_controller");
const AuthController = require("../controllers/auth_controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  //Auth
  app.post("/api/login", AuthController.login);
  //File
  app.get("/api/files/list", auth, FileController.list);
  app.get("/api/files/metrics", auth, FileController.metrics);
};
