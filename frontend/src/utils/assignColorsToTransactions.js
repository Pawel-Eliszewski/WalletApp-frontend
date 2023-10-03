const categoryColors = {
  "Main expenses": "#fed057",
  Products: "#ffd8d0",
  Car: "rgba(253, 148, 152, 1)",
  "Self care": "rgba(197, 186, 255, 1)",
  "Child care": "#6e78e8",
  "Household products": "#4a56e2",
  Education: "#81e1ff",
  "Other expenses": "#00ad84",
  Entertainment: "#ff77a9",
  Leisure: "rgba(36, 204, 167, 1)",
};

export const assignColorsToTransactions = (transactions) => {
  const colors = {};
  transactions.forEach((transaction) => {
    const { category } = transaction;
    if (category && categoryColors[category]) {
      colors[category] = categoryColors[category];
    }
  });
  return colors;
};
