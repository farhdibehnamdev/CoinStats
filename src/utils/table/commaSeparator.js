const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const currencyFormat = (numberOfCharacter) => {
  if (numberOfCharacter !== null || numberOfCharacter > 0) {
    if (numberOfCharacter === 13) {
      return "T";
    } else if (numberOfCharacter >= 10 && numberOfCharacter <= 12) {
      return "B";
    } else if (numberOfCharacter >= 7 && numberOfCharacter <= 9) {
      return "M";
    } else if (numberOfCharacter === 5) {
      return "HT";
    }
  }
};

//TODO Issue about fix numbers.
export const commaSeparator = (price, type) => {
  if (type === "marketCap") {
    const getCurrencyFormat = currencyFormat(price.length);
    return `${formatter.format(price) + " " + getCurrencyFormat}`;
  }
  return `${formatter.format(price)}`;
};

export default commaSeparator;
