const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const path = require("path");
// Load environment variables using dotenv
require("dotenv").config();

const app = express();

// API DOCS
if (process.env.NODE_ENV !== "production") {
  const expressSwagger = require("express-swagger-generator")(app);

  let options = {
    swaggerDefinition: {
      info: {
        description: "Documentation",
        title: "Documentation",
        version: "1.0.0",
      },
      host: `${process.env.APP_HOST}:${process.env.APP_PORT}`,
      basePath: "/api",
      produces: ["application/json", "application/xml"],
      schemes: ["http", "https"],
      securityDefinitions: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "x-auth-token",
          description: "",
        },
      },
    },
    basedir: __dirname, //app absolute path
    files: ["./controllers/*.js"], //Path to the API handle folder
  };
  expressSwagger(options);
}
//api
app.use(bodyParser.json());
routes(app);

module.exports = app;
