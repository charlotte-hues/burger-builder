export const updateObject = (state, updatedObject) => {
  return {
    ...state,
    ...updatedObject
  };
};

export const checkValidity = (value, rules) => {
  if (!rules) return;
  let isValid = false;

  if (rules.required) {
    isValid = value.trim() !== "";
  }

  if (rules.minLength) {
    isValid = value.length > rules.minLength;
  }
  return isValid;
};
