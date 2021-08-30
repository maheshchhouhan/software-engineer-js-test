const Image = require("../../models/Image");

module.exports = {
  Query: {
    getImage: async () => {
      try {
        const image = await Image.findOne().sort({ createdAt: -1 });
        return image;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    generateImage: async (
      _,
      {
        image,
        canvasWidth,
        canvasHeight,
        imageWidth,
        imageHeight,
        scalePercentage,
        x,
        y,
      }
    ) => {
      try {
        const data = JSON.stringify({
          canvasWidth,
          canvasHeight,
          imageWidth,
          imageHeight,
          scalePercentage,
          x,
          y,
        });
        const newImage = new Image({
          image,
          data,
          createdAt: new Date().toISOString(),
        });
        return await newImage.save();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
