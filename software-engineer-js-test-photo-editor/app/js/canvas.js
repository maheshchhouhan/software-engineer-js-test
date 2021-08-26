import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";
import { log } from "./utils";

// writing some re-usable image canvas functions
const getScaleToFit = (img, canvas, scalePercentage) => {
  let scale;
  // get the scale
  switch (scalePercentage) {
    case 50:
      scale =
        Math.min(canvas.width / img.width, canvas.height / img.height) / 2;
      break;
    case 200:
      scale =
        Math.min(canvas.width / img.width, canvas.height / img.height) * 2;
      break;
    default:
      scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      break;
  }
  return scale;
};

export const fitToCanvas = (img, canvas, scalePercentage) => {
  const ctx = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const scale = getScaleToFit(img, canvas, scalePercentage);
  const x = canvas.width / 2 - (img.width / 2) * scale;
  const y = canvas.height / 2 - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
};

export const readImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      // create HTMLImageElement holding image data
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        // grab some data from the image
        const imageData = {
          width: img.naturalWidth,
          height: img.naturalHeight,
        };
        log(
          "Loaded Image w/dimensions " +
            imageData.width +
            " x " +
            imageData.height,
          "debugContainer"
        );
        resolve(img);
      };
    };
    reader.readAsDataURL(file);
  });
};
