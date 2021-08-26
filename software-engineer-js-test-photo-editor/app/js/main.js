import { VALID_IMAGE_TYPES } from "./constants";
import { log, validateImageType } from "./utils";
import { readImage, fitToCanvas } from "./canvas";

import "../css/main.scss";

// grab DOM elements inside index.html
const fileSelector = document.getElementById("fileSelector");
const generateButton = document.getElementById("generateButton");
const scaleImageButtons = document.querySelectorAll(".scaleImageButtons");
const canvas = document.getElementById("canvas");

let image;

fileSelector.addEventListener("change", async (e) => {
  try {
    // get all selected Files
    const files = e.target.files;
    let file = "";
    for (let i = 0; i < files.length; ++i) {
      file = files[i];
      // check if file is valid Image (just a MIME check)
      validateImageType(file, VALID_IMAGE_TYPES);
      // read Image contents from file
      image = await readImage(file, "canvas");
      fitToCanvas(image, canvas);
    }
  } catch (e) {
    log(e.message, "debugContainer");
  }
});

generateButton.onclick = (e) => {
  log(
    "GENERATE BUTTON CLICKED!! Should this do something else?",
    "debugContainer"
  );
};

const scaleImage = (e) => {
  const { percentage } = e.target.dataset;
  fitToCanvas(image, canvas, +percentage);
};

scaleImageButtons.forEach((button) =>
  button.addEventListener("click", scaleImage)
);

log("Test application ready", "debugContainer");
