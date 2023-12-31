export const fetchCurrency = async (query) => {
  const response = await fetch(
    `https://api.nbp.pl/api/exchangerates/rates/c/${query}/last/`
  );

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = await response.json();

  const transformedData = data.rates.map((rate) => {
    return {
      buy: rate.ask,
      sale: rate.bid,
    };
  });

  return transformedData;
};
