import Navigation from "./Navigation";
import TopNavbar from "./TopNavbar";
import NavbarFooter from "./NavbarBottom";

const Navbar = () => {
  return (
    <nav>
      <div className="max-sm:hidden">
        <TopNavbar />
      </div>
      <Navigation />
      <div className="max-sm:hidden">
        <NavbarFooter />
      </div>
    </nav>
  );
};

export default Navbar;
