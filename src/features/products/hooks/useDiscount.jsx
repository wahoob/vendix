const useDiscount = (price, discount) => {
  if (!discount) return { isOnSale: false, newPrice: price, percentageOff: 0 };

  const newPrice = (price - discount.amount).toFixed(2);
  const percentageOff = Math.floor((discount.amount / price) * 100);

  return { isOnSale: true, newPrice, percentageOff };
};

export default useDiscount;
