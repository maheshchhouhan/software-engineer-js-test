// exporting some pure functions
export const log = (msg, debugContainerId) => {
  document.getElementById(debugContainerId).innerHTML = `<p>${msg}</p>`;
};

export const validateImageType = (file, validImageTypes) => {
  const isValidType = validImageTypes.includes(file.type);
  if (!isValidType) throw new Error(`not a valid Image file :${file.name}`);
};
