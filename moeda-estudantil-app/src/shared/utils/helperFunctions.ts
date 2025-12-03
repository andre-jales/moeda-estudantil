export const interpolateWithValues = (
  strMakeChanges: string,
  ...values: string[]
) => {
  values.forEach((value) => {
    const matches = strMakeChanges.match(/{[A-Za-z]+}/g);
    if (matches) {
      strMakeChanges = strMakeChanges.replace(matches[0], value);
    }
  });
  return strMakeChanges;
};
