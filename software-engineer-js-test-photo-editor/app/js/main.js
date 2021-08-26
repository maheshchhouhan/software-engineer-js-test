import { VALID_IMAGE_TYPES } from "./constants";
import { log, validateImageType, readImage } from "./utils";

import "../css/main.scss";

// grab DOM elements inside index.html
const fileSelector = document.getElementById("fileSelector");
const generateButton = document.getElementById("generateButton");

fileSelector.onchange = async (e) => {
  try {
    // get all selected Files
    const files = e.target.files;
    let file = "";
    for (let i = 0; i < files.length; ++i) {
      file = files[i];
      // check if file is valid Image (just a MIME check)
      validateImageType(file, VALID_IMAGE_TYPES);
      // read Image contents from file
      readImage(file, "imageContainer");
    }
  } catch (e) {
    log(e.message, "debugContainer");
  }
};

generateButton.onclick = function (e) {
  log(
    "GENERATE BUTTON CLICKED!! Should this do something else?",
    "debugContainer"
  );
};

log("Test application ready", "debugContainer");
