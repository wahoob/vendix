import BottomFooter from "./FooterBottom";
import TopFooter from "./TopFooter";

const Footer = () => {
  return (
    <footer className="container mt-14">
      <div className="border-b border-[#BCE3C9] py-11">
        <TopFooter />
      </div>
      <div className="py-9">
        <BottomFooter />
      </div>
    </footer>
  );
};

export default Footer;
