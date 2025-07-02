import { TabView, TabPanel } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { motion } from "framer-motion";

import { ProductReviews } from "../../reviews";
import { VendorOverview } from "../../vendors";
import AddReviewForm from "../../reviews/components/AddReviewForm";

const ProductTabs = ({ salesCount, reviews, rating, id, vendor }) => {
  const tabHeaderTemplate = (options) => {
    const header = options.props.children[options.index].props.header;

    return (
      <div
        className={classNames(
          "cursor-pointer border border-[#ECECEC] rounded-full",
          "py-2 px-8",
          options.selected && "shadow-shadow1",
        )}
        onClick={options.onClick}
      >
        <span
          className={classNames(
            "font-quicksand font-bold text-[17px] whitespace-nowrap",
            {
              "text-[#3BB77E]": options.selected,
              "text-[#7E7E7E]": !options.selected,
            },
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

        <motion.div
          className="relative flex justify-center mt-8 h-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.svg
            width="240"
            height="6"
            viewBox="0 0 240 6"
            className="absolute top-0"
          >
            <motion.path
              d="M10,3 C80,10 160,-4 230,3"
              stroke="url(#natureTrail)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: 1.8,
                ease: [0.16, 0.77, 0.47, 0.97],
              }}
            />
            <defs>
              <linearGradient
                id="natureTrail"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3BB77E" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#4DDB94" stopOpacity="1" />
                <stop offset="100%" stopColor="#2D9E6D" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute top-0 h-1 w-full max-w-xs bg-emerald-400 blur-md"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: 1,
              opacity: 0.3,
            }}
            transition={{
              duration: 2,
              delay: 0.8,
              ease: "easeOut",
            }}
          />
        </motion.div>

        <AddReviewForm />
      </TabPanel>
      <TabPanel header="Vendor" headerTemplate={tabHeaderTemplate}>
        <VendorOverview
          {...vendor}
          pt={{
            image: "left-4",
          }}
        />
      </TabPanel>
    </TabView>
  );
};

export default ProductTabs;
