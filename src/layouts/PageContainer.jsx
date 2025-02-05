import { Outlet } from "react-router-dom";

import { Footer, Navbar } from "../components";

const PageContainer = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PageContainer;
