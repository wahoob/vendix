import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { error404 } from "../assets/images";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 row flex-col py-32 px-4 text-center">
        <img src={error404} alt="404 Error" className="max-w-80 mx-4" />

        <h2 className="text-[22px] font-bold font-quicksand text-[#495057] mb-3 mt-10">
          Oops! Page not found
        </h2>

        <p className="text-[#626E85] max-w-4xl mb-8 font-poppins text-sm">
          It&apos;s looking like you may have taken a wrong turn. Don&apos;t
          worry... it happens to the best of us. Here&apos;s a little tip that
          might help you get back on track.
        </p>

        <Button
          icon="pi pi-arrow-left"
          label="Back to main"
          severity="success"
          pt={{
            root: "bg-[#3BB77E] hover:bg-[#2a9d68] px-10 py-2 rounded",
            label: "text-white font-medium",
            icon: "text-white",
          }}
          onClick={() => navigate("/")}
        />
      </div>

      <p className="font-medium text-[#4F5D77] text-sm pt-8 pb-4 text-center">
        {new Date().getFullYear()} © Vendix. All rights reserved.
      </p>
    </div>
  );
};

export default NotFound;
