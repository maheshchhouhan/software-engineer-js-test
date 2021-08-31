import { fetchQuery } from "../common/api";
import { CANVAS_WIDTH, CANVAS_HEIGHT, LOADING } from "../config/constants";
import { log, showHideElements } from "../common/utils";

const { ON, OFF } = LOADING;

// writing some re-usable image canvas functions
const getScaleToFit = (image, canvas, scalePercentage) => {
  let scale;
  // get the scale
  switch (scalePercentage) {
    case 50:
      scale =
        Math.min(canvas.width / image.width, canvas.height / image.height) / 2;
      break;
    case 200:
      scale =
        Math.min(canvas.width / image.width, canvas.height / image.height) * 2;
      break;
    default:
      scale = Math.min(
        canvas.width / image.width,
        canvas.height / image.height
      );
      break;
  }
  return scale;
};

export const fitToCanvas = (image, canvas, scalePercentage) => {
  const ctx = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const scale = getScaleToFit(image, canvas, scalePercentage);
  const x = canvas.width / 2 - (image.width / 2) * scale;
  const y = canvas.height / 2 - (image.height / 2) * scale;
  ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
  // Showing JSON object into textarea
  showDataToTextarea(image, canvas, x.toFixed(), y.toFixed());
};

export const readImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      // create HTMLImageElement holding image data
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        // grab some data from the image
        const imageData = {
          width: image.naturalWidth,
          height: image.naturalHeight,
        };
        log(
          "Loaded Image w/dimensions " +
            imageData.width +
            " x " +
            imageData.height,
          "debugContainer"
        );
        resolve(image);
      };
    };
    reader.readAsDataURL(file);
  });
};

export const handleLoading = (type) => {
  if (type) {
    showHideElements(".loadingContainer", "initial");
    showHideElements(".actionButtons", "none");
  } else {
    showHideElements(".loadingContainer", "none");
    showHideElements(".actionButtons", "initial");
  }
};

export const importData = async (canvas) => {
  try {
    const query = `
    query {
      getImage {
        id
        image
        data
        createdAt
      }
    }
  `;

    handleLoading(ON);
    const fetchImage = await fetchQuery(query);
    const {
      data: { getImage },
    } = await fetchImage.json();
    handleLoading(OFF);

    const { data, image: imageSrc } = getImage;
    const { imageWidth, imageHeight, scalePercentage } = JSON.parse(data);
    const image = new Image();
    image.src = imageSrc;
    image.width = imageWidth;
    image.height = imageHeight;
    image.onload = () => {
      fitToCanvas(image, canvas, +scalePercentage);
    };
  } catch (e) {
    handleLoading(OFF);
    log(e.message, "debugContainer");
  }
};

export const showDataToTextarea = (image, canvas, x, y) => {
  const data = {
    canvas: {
      width: canvas.width,
      height: canvas.height,
      photo: {
        width: image.width,
        height: image.height,
        x,
        y,
      },
    },
  };
  const dataString = JSON.stringify(data, undefined, 4);
  const generatedDataTextarea = document.getElementById(
    "generatedDataTextarea"
  );
  generatedDataTextarea.value = dataString;
  generatedDataTextarea.style.display = "block";
};

export const generateData = async (image, canvas, scalePercentage) => {
  try {
    const scale = getScaleToFit(image, canvas, scalePercentage);
    const x = (canvas.width / 2 - (image.width / 2) * scale).toFixed();
    const y = (canvas.height / 2 - (image.height / 2) * scale).toFixed();
    // sending image and canvas data to graphql and saving it to db
    const query = `
      mutation GenerateImage{
        generateImage(
          image: "${image.src}",
          canvasWidth: "${canvas.width}",
          canvasHeight: "${canvas.height}",
          imageWidth: "${image.width}",
          imageHeight: "${image.height}",
          scalePercentage: "${scalePercentage}",
          x: "${x}", 
          y: "${y}"
        ) {
          id
        }
      }
    `;
    handleLoading(ON);
    await fetchQuery(query);
    handleLoading(OFF);

    // Showing JSON object into textarea
    showDataToTextarea(image, canvas, x, y);
  } catch (e) {
    handleLoading(OFF);
    log(e.message, "debugContainer");
  }
};
