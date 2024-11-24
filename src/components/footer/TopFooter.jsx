import { Link } from "react-router-dom";
import { appStore, googlePlay, logo } from "../../assets/images";
import { Headphone, Map, Send, Time } from "../../utils/icons.utils";

import IconLabel from "./IconLabel";
import FooterElement from "./FooterSection";

const footerItems = [
  {
    title: "Company",
    elements: [
      {
        text: "About Us",
        link: "",
      },
      {
        text: "Delivery Information",
        link: "",
      },
      {
        text: "Privacy Policy",
        link: "",
      },
      {
        text: "Terms & Conditions",
        link: "",
      },
      {
        text: "Contact Us",
        link: "",
      },
      {
        text: "Support Center",
        link: "",
      },
      {
        text: "Careers",
        link: "",
      },
    ],
  },
  {
    title: "Account",
    elements: [
      {
        text: "Sign in",
        link: "",
      },
      {
        text: "View Cart",
        link: "",
      },
      {
        text: "My Wishlist",
        link: "",
      },
      {
        text: "Track My Order",
        link: "",
      },
      {
        text: "Help Ticket",
        link: "",
      },
      {
        text: "Shipping Details",
        link: "",
      },
      {
        text: "Compare Products",
        link: "",
      },
    ],
  },
  {
    title: "Corporate",
    elements: [
      {
        text: "Become a Vendor",
        link: "",
      },
      {
        text: "Affiliate Program",
        link: "",
      },
      {
        text: "Farm Business",
        link: "",
      },
      {
        text: "Farm Careers",
        link: "",
      },
      {
        text: "Our Suppliers",
        link: "",
      },
      {
        text: "Accessibility",
        link: "",
      },
      {
        text: "Promotions",
        link: "",
      },
    ],
  },
];

const firstSectionItems = [
  {
    Icon: Map,
    label: "Address",
    text: "5171 W Campbell Ave undefined Kent, Utah 53127 United States",
  },
  {
    Icon: Headphone,
    label: "Call Us",
    text: "(+91) - 540-025-124553",
  },
  {
    Icon: Send,
    label: "Email",
    text: "sale@Nest.com",
  },
  {
    Icon: Time,
    label: "Hours",
    text: "10:00 - 18:00, Mon - Sat",
  },
];

const TopFooter = () => {
  return (
    <div className="flex justify-between gap-10 flex-wrap">
      <div className="max-w-72">
        <Link to="/" className="mb-5">
          <img src={logo} alt="logo" className="max-w-44" />
        </Link>
        <p className="text-[17px] text-[#253D4E] mb-8">
          Awesome store website to provide your needs
        </p>

        <div className="space-y-[15px]">
          {firstSectionItems.map((item, index) => (
            <IconLabel key={index} {...item} />
          ))}
        </div>
      </div>

      {footerItems.map((item, index) => (
        <FooterElement key={index} {...item} />
      ))}

      <div>
        <h3 className="font-quicksand font-bold text-2xl">Install App</h3>

        <div className="mt-16 mb-12 row gap-3 [&>*]:cursor-pointer">
          <img src={appStore} alt="app store" className="max-w-32" />
          <img src={googlePlay} alt="google play" className="max-w-32" />
        </div>

        <p className="text-[15px] text-[#253D4E]">Secured Payment Gatways</p>
      </div>
    </div>
  );
};

export default TopFooter;
