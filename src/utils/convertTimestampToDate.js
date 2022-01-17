export const convertTimeStampToDate = (arr) => {
  const dataArray = [];
  arr.forEach((ar) => {
    const obj = {
      price: Number(ar.price),
      date: justUnixTimeStampConvert(ar.timestamp),
    };
    dataArray.push(obj);
  });
  return dataArray;
};

export const justUnixTimeStampConvert = (UNIX_timestamp) => {
  const unixMultiply = new Date(UNIX_timestamp * 1000);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = unixMultiply.getFullYear();
  const month = months[unixMultiply.getMonth()];
  const date = unixMultiply.getDate();
  const time = date + "/" + month + "/" + year;
  // const time = year + "-" + month + "-" + date;
  return time;
};

export default convertTimeStampToDate;
