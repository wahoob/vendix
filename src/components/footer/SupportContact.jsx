import { Phone } from "../../utils/icons.utils";

const SupportContact = () => {
  return (
    <div className="row gap-3">
      <div className="text-[#808080]">
        <Phone />
      </div>

      <div>
        <h3 className="text-[#3BB77E] font-quicksand font-bold text-2xl leading-[26px]">
          1900 - 6666
        </h3>
        <p className="text-[#7E7E7E] font-medium text-xs leading-3">
          24/7 Support Center
        </p>
      </div>
    </div>
  );
};

export default SupportContact;
