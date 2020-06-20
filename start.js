const app = require("./app");
const path = require("path");
app.listen(`${process.env.APP_PORT}`, () => {
  console.log(`Running on port ${process.env.APP_PORT}`);
});
