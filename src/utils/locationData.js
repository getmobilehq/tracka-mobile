export const dashboardTestData = {
  message: "success",
  data: {
    transaction_stats: {
      customer_to_customer: { num_of_transactions: 2, sum_total: 2000.0 },
      self_storage: { num_of_transactions: 1, sum_total: 1000.0 },
      customer_to_courier: { num_of_transactions: 9, sum_total: 9000.0 },
    },
    daily_stats: {
      "2021-12-29": {
        customer_to_customer: { num_of_transactions: 1, sum_total: 1000.0 },
        self_storage: { num_of_transactions: 1, sum_total: 1000.0 },
        customer_to_courier: { num_of_transactions: 1, sum_total: 1000.0 },
      },
      "2021-12-28": {
        customer_to_customer: { num_of_transactions: 1, sum_total: 1000.0 },
        self_storage: { num_of_transactions: 0, sum_total: 0 },
        customer_to_courier: { num_of_transactions: 1, sum_total: 1000.0 },
      },
      "2021-12-27": {
        customer_to_customer: { num_of_transactions: 0, sum_total: 0 },
        self_storage: { num_of_transactions: 0, sum_total: 0 },
        customer_to_courier: { num_of_transactions: 2, sum_total: 2000.0 },
      },
      "2021-12-26": {
        customer_to_customer: { num_of_transactions: 0, sum_total: 0 },
        self_storage: { num_of_transactions: 0, sum_total: 0 },
        customer_to_courier: { num_of_transactions: 0, sum_total: 0 },
      },
      "2021-12-25": {
        customer_to_customer: { num_of_transactions: 0, sum_total: 0 },
        self_storage: { num_of_transactions: 0, sum_total: 0 },
        customer_to_courier: { num_of_transactions: 0, sum_total: 0 },
      },
      "2021-12-24": {
        customer_to_customer: { num_of_transactions: 0, sum_total: 0 },
        self_storage: { num_of_transactions: 0, sum_total: 0 },
        customer_to_courier: { num_of_transactions: 1, sum_total: 1000.0 },
      },
      "2021-12-23": {
        customer_to_customer: { num_of_transactions: 0, sum_total: 0 },
        self_storage: { num_of_transactions: 0, sum_total: 0 },
        customer_to_courier: { num_of_transactions: 0, sum_total: 0 },
      },
    },
  },
};
