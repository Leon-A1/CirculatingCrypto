export const historyOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: true,
    lineWeight: 2,
  },

  animation: {
    duration: 2000,
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    xAxes: [
      {
        type: "time",
        distribution: "linear",
      },
    ],
  },
};
