const ProductPrice = ({ price, discount }) => {
  const mainPrice = discount ? (price - discount.amount).toFixed(2) : price;

  return (
    <div className="row gap-x-2.5 gap-y-[5px] flex-wrap">
      <h4 className="text-lg font-bold text-[#3BB77E] font-quicksand">
        ${mainPrice}
      </h4>

      {discount && (
        <p className="font-quicksand text-sm font-bold text-[#ADADAD] line-through">
          ${price}
        </p>
      )}
    </div>
  );
};

export default ProductPrice;
