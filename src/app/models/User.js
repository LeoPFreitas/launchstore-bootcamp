const Base = require("./Base");

// inicializa a base
Base.init({ table: "users" });

module.exports = {
  ...Base,
};
