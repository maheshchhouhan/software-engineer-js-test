// exporting some pure functions
export const log = (msg, debugContainerId) => {
  document.getElementById(debugContainerId).innerHTML = `<p>${msg}</p>`;
};

export const validateImageType = (file, validImageTypes) => {
  const isValidType = validImageTypes.includes(file.type);
  if (!isValidType) throw new Error(`not a valid Image file :${file.name}`);
};

export const readImage = (file, imageContainerId) => {
  const reader = new FileReader();
  reader.onload = () => {
    // create HTMLImageElement holding image data
    const img = new Image();
    img.src = reader.result;

    // remove existing images from ImageContainer
    const imageContainer = document.getElementById(imageContainerId);
    while (imageContainer.childNodes.length > 0)
      imageContainer.removeChild(imageContainer.childNodes[0]);

    // add image to container
    imageContainer.appendChild(img);

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
    };
    // do your magic here...
  };
  reader.readAsDataURL(file);
};
