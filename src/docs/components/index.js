const responses = require("./responses");
const schemas = require("./schemas");

module.exports = {
  components: {
    ...responses,
    ...schemas,
  },
};
