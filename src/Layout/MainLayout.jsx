import { Outlet } from "react-router";
import Navbar from "../components/common-component/Navbar";
import Footer from "../components/common-component/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;
