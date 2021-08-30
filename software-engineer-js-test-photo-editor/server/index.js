const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB, PORT } = require("./config.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then(() => {
    const url = `http:localhost:${PORT}`;
    console.log(`🚀 Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
