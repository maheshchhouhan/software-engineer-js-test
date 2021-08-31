import { VALID_IMAGE_TYPES } from "./config/constants";
import { log, showButtons, validateImageType } from "./common/utils";
import { readImage, fitToCanvas, generateData, importData } from "./canvas";

import "../css/main.css";

// grab DOM elements inside index.html
const fileSelector = document.getElementById("fileSelector");
const generateButton = document.getElementById("generateButton");
const importButton = document.getElementById("importButton");
const scaleImageButtons = document.querySelectorAll(".scaleImageButtons");
const canvas = document.getElementById("canvas");

let image;
let scalePercentage;

fileSelector.addEventListener("change", async (e) => {
  try {
    // get all selected Files
    const files = e.target.files;
    for (const file of files) {
      // check if file is valid Image (just a MIME check)
      validateImageType(file, VALID_IMAGE_TYPES);
      // read Image contents from file
      image = await readImage(file, "canvas");
      // fitting image to canvas
      fitToCanvas(image, canvas);
      // displaying buttons
      showButtons(generateButton);
      showButtons(scaleImageButtons);
    }
  } catch (e) {
    log(e.message, "debugContainer");
  }
});

generateButton.addEventListener("click", () =>
  generateData(image, canvas, scalePercentage)
);

importButton.addEventListener("click", () => importData(canvas));

scaleImageButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const { percentage } = e.target.dataset;
    scalePercentage = +percentage;
    fitToCanvas(image, canvas, +percentage);
  })
);

log("Test application ready", "debugContainer");
