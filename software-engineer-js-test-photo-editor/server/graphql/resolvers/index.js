const imagesResolver = require("./images");

module.exports = {
  Query: {
    ...imagesResolver.Query,
  },
  Mutation: {
    ...imagesResolver.Mutation,
  },
};
