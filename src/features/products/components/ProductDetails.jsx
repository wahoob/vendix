import { useParams } from "react-router-dom";

import { AsyncContentWrapper, ImageGallery } from "../../../components";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

import { useGetProductBySlugQuery } from "../productsApiSlice";

const ProductDetails = () => {
  const { slug } = useParams();
  const product = useGetProductBySlugQuery({ slug });
  const { data } = product;

  return (
    <div>
      <AsyncContentWrapper
        {...product}
        render={() => {
          return (
            <div className="space-y-12">
              <div className="flex max-lg:flex-col gap-[3.4rem]">
                <div className="lg:min-w-80 flex-auto">
                  <ImageGallery {...data} maxWidth={529.42} />
                </div>

                <ProductInfo product={data} {...data} />
              </div>

              <div className="border border-[#ECECEC] lg:px-[3.2rem] px-3 py-10 rounded-2xl">
                <ProductTabs {...data} />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default ProductDetails;
