// exporting some pure functions
export const log = (msg, debugContainerId) => {
  document.getElementById(debugContainerId).innerHTML = `<p>${msg}</p>`;
};

export const validateImageType = (file, validImageTypes) => {
  const isValidType = validImageTypes.includes(file.type);
  if (!isValidType) throw new Error(`not a valid Image file :${file.name}`);
};

export const showButtons = (buttons) => {
  if (!buttons.length) return (buttons.style.display = "initial");
  buttons.forEach((button) => {
    button.style.display = "initial";
  });
};

export const showHideElements = (element, displayType) => {
  document.querySelector(element).style.display = displayType;
};
