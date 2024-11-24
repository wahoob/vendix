import { Carousel, SubscribeBox } from "../";

const items = [
  {
    title: "Exclusive Deals on Tech Products",
    text: "Up to 40% off electronics.",
  },
  {
    title: "Big Fashion Clearance Sale Event",
    text: "Save 60% on clothing and accessories.",
  },
  {
    title: "Best Prices for Home Essentials",
    text: "Discounts on furniture and decor.",
  },
  {
    title: "Fitness Gear Extravaganza Flash Sale",
    text: "50% off sports equipment.",
  },
  {
    title: "Special Grocery Discounts Today",
    text: "Save big on fresh groceries.",
  },
  {
    title: "Luxury Watches Price Drop",
    text: "30% off premium watches.",
  },
  {
    title: "Top-Selling Items on Vendix",
    text: "Trending products across categories.",
  },
  {
    title: "Back-to-School Deals Now",
    text: "Deals on school supplies.",
  },
];

const SlideShow = () => {
  const itemTemplate = (item) => {
    return (
      <div className="space-y-3 sm:space-y-5 md:space-y-7">
        <h1 className="font-quicksand font-bold text-3xl sm:text-5xl md:text-7xl text-[#253D4E]">
          {item.title}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-normal text-[#7E7E7E]">
          {item.text}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-slider-tabpanel rounded-[1.9rem]">
      <Carousel
        itemTemplate={itemTemplate}
        items={items}
        additionalElement={<SubscribeBox />}
      />
    </div>
  );
};

export default SlideShow;
