import { TabView, TabPanel } from "primereact/tabview";
import { classNames } from "primereact/utils";
import ProductReviews from "../../reviews/components/ProductReviews";
import VendorOverview from "../../vendors/components/VendorOverview";

const ProductTabs = ({ salesCount, reviews, rating, id, vendor }) => {
  const tabHeaderTemplate = (options) => {
    const header = options.props.children[options.index].props.header;

    return (
      <div
        className={classNames(
          "cursor-pointer border border-[#ECECEC] rounded-full",
          "py-2 px-8",
          options.selected && "shadow-shadow1"
        )}
        onClick={options.onClick}
      >
        <span
          className={classNames(
            "font-quicksand font-bold text-[17px] whitespace-nowrap",
            {
              "text-[#3BB77E]": options.selected,
              "text-[#7E7E7E]": !options.selected,
            }
          )}
        >
          {header}
        </span>
      </div>
    );
  };

  return (
    <TabView
      pt={{
        nav: { className: "pb-2.5 gap-2.5 flex-wrap" },
      }}
    >
      <TabPanel
        header={`Reviews (${reviews.length})`}
        headerTemplate={tabHeaderTemplate}
      >
        <ProductReviews
          rating={rating}
          salesCount={salesCount}
          reviews={reviews}
          id={id}
        />
      </TabPanel>
      <TabPanel header="Vendor" headerTemplate={tabHeaderTemplate}>
        <VendorOverview {...vendor} />
      </TabPanel>
    </TabView>
  );
};

export default ProductTabs;
