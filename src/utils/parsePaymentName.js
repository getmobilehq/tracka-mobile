const parsePaymentName = (name) => {
  if (name === "self_storage") {
    return "Self Storage";
  }

  if (name === "customer_to_customer") {
    return "Customer to Customer";
  }

  if (name === "customer_to_courier") {
    return "Customer to Courier";
  }
};

export default parsePaymentName;
