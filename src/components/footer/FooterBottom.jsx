import SupportContact from "./SupportContact";
import SocialMediaLinks from "./SocialMediaLinks";

const FooterBottom = () => {
  return (
    <div className="row flex-wrap gap-5 justify-between">
      <p className="text-sm text-[#7E7E7E]">
        &copy; 2024,{" "}
        <span className="font-semibold text-[#3BB77E]">Vendix</span> - Your
        trusted destination for quality products.
        <br /> All rights reserved.
      </p>

      <SupportContact />

      <div>
        <SocialMediaLinks />

        <p className="text-sm text-[#7E7E7E]">
          Up to 15% discount on your first subscribe
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
