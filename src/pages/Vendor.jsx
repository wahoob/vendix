import { useNavigate, useParams } from "react-router-dom";
import { VendorOverview } from "../features/vendors";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { SellerProducts } from "../features/products";

const Vendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container space-y-8">
      <Button
        label="Go back"
        icon="pi pi-arrow-left"
        severity="contrast"
        onClick={() => navigate(-1)}
        pt={{
          root: "mt-8 group",
          label:
            "text-[#3BB77E] group-hover:text-[#2ea56d] font-medium font-quicksand",
          icon: "text-[#2ea56d]",
        }}
      />

      <div className="border border-[#F5F6F7] rounded-lg shadow-shadow1">
        <VendorOverview
          _id={id}
          pt={{
            topSection: "px-4",
            bottomSection: "px-4",
            button: "hidden",
          }}
        />
      </div>

      <div
        className={classNames(
          "border border-[#F5F6F7] rounded-lg shadow-shadow1 px-4 py-6",
          "font-quicksand text-[#383E50] space-y-6",
        )}
      >
        <h3 className="text-2xl font-bold">Products by seller</h3>

        <SellerProducts vendorId={id} />
      </div>
    </div>
  );
};

export default Vendor;
