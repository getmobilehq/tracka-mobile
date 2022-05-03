const numberFormatter = (x) => {
  if (x === 0) {
    return x;
  }
  if (!x) {
    return "";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default numberFormatter;
