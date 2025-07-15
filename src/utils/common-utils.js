function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formDataToObject(formData) {
  const obj = {};
  formData.forEach((value, key) => (obj[key] = value));

  return obj;
}

export { sleep, formDataToObject };
