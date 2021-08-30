const { gql } = require("apollo-server");

module.exports = gql`
  type Image {
    id: ID!
    image: String!
    data: String!
    createdAt: String!
  }
  type Query {
    getImage: Image!
  }
  type Mutation {
    generateImage(
      image: String!
      canvasWidth: String!
      canvasHeight: String!
      imageWidth: String!
      imageHeight: String!
      scalePercentage: String!
      x: String!
      y: String!
    ): Image!
  }
`;
