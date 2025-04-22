import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AsyncContentWrapper } from "../components";
import { ProductsList, ProductUpdate } from "../features/products";

import { useGetMeQuery } from "../features/users";

const MyProducts = () => {
  const [product, setProduct] = useState(null);

  const showUpdatePrompt = (data) => {
    setProduct(data);
  };
  const hideUpdatePrompt = () => setProduct(null);

  const { data, ...rest } = useGetMeQuery();

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold mb-1">My Products</h1>

      <div className="card relative">
        <AsyncContentWrapper
          {...rest}
          render={() => (
            <AnimatePresence mode="wait">
              {product ? (
                <motion.div
                  key="edit"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.2,
                  }}
                >
                  <ProductUpdate product={product} onClose={hideUpdatePrompt} />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.2,
                  }}
                >
                  <ProductsList
                    show={showUpdatePrompt}
                    vendorId={data.vendor}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        />
      </div>
    </div>
  );
};

export default MyProducts;
