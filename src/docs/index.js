const loocaleInfo = require("./loocaleInfo");
const servers = require("./servers");
const components = require("./components");
const paths = require("./paths");
const tags = require("./tags");

module.exports = {
  ...loocaleInfo,
  ...servers,
  ...components,
  ...paths,
  ...tags,
};
