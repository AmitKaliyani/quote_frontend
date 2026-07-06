import { Outlet } from "react-router";
import Navbar from "../components/common-component/Navbar";
import Footer from "../components/common-component/Footer";
import ScrollToTop from "../components/common-component/scrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;
