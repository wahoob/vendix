import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ProductsList, ProductUpdate } from "../features/products";

const Products = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const showUpdatePrompt = (data) => {
    setProduct(data);
  };
  const hideUpdatePrompt = () => setProduct(null);

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0">
        <h1 className="text-4xl font-bold mb-1">
          {product ? "Edit Product" : "Products list"}
        </h1>
        <Button
          label="Create new"
          icon="pi pi-plus"
          onClick={() => navigate("new")}
          pt={{
            root: "bg-[#3BB77E] px-6 py-2.5 max-sm:hidden",
            icon: "text-white",
            label: "text-white",
          }}
          severity="success"
        />
      </div>

      <div className="card relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {product ? (
            <motion.div
              key="edit"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
            >
              <ProductUpdate product={product} onClose={hideUpdatePrompt} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
            >
              <ProductsList show={showUpdatePrompt} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;
