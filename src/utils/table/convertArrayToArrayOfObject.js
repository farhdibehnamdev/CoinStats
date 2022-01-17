const convertArrayStringsToNumber = (data) => {
  const result = data.map((data) => parseInt(data?.trim(), 10));
  return result;
};
export default convertArrayStringsToNumber;
