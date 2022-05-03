export const doughnutLegends = [
  { title: "Self Storage", color: "bg-green-500" },
  { title: "Customer - Customer", color: "bg-blue-500" },
  { title: "Courier Service", color: "bg-orange-500" },
];

export const lineLegends = [
  { title: "Organic", color: "bg-teal-600" },
  { title: "Paid", color: "bg-purple-600" },
];

export const barLegends = [
  { title: "Self Storage", color: "bg-green-500" },
  { title: "Customer - Customer", color: "bg-blue-500" },
  { title: "Courier Service", color: "bg-orange-500" },
];

export const pieLegends = [
  { title: "Organic", color: "bg-teal-600" },
  { title: "Paid", color: "bg-purple-600" },
];

var getDates = (numberOfDays) =>
  new Date(Date.now() - numberOfDays * 24 * 60 * 60 * 1000);

const last7Dates = [];

for (let i = 0; i < 7; i++) {
  last7Dates.push(getDates(i).toLocaleDateString());
}

export const doughnutOptions = ({
  self_storage,
  customer_to_customer,
  customer_to_courier,
}) => ({
  data: {
    datasets: [
      {
        data: [self_storage, customer_to_customer, customer_to_courier],
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: ["#10B981", "#3B82F6", "#F97316"],
        label: "Dataset 1",
      },
    ],
    labels: ["Self Storage", "Customer - Customer", "Courier Service"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
});

export const lineOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Organic",
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [43, 48, 40, 54, 67, 73, 70],
        fill: false,
      },
      {
        label: "Paid",
        fill: false,
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [24, 50, 64, 74, 52, 51, 65],
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
  legend: {
    display: false,
  },
};

export const barOptions = ({
  last7Dates = [],
  self_storage_data = [],
  customer_to_customer_data = [],
  customer_to_courier_data = [],
}) => ({
  data: {
    labels: last7Dates,
    datasets: [
      {
        label: "Self Storage",
        backgroundColor: "#10B981",
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: self_storage_data,
      },
      {
        label: "Customer - Customer",
        backgroundColor: "#3B82F6",
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: customer_to_customer_data,
      },
      {
        label: "Courier Service",
        backgroundColor: "#F97316",
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: customer_to_courier_data,
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
});

export const pieOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "# of Votes",
        data: [30, 45, 50, 45, 42, 55],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
  legend: {
    display: false,
  },
};
