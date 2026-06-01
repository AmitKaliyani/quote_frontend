import { Outlet } from "react-router";
import Footer from "../components/common-component/Footer";

function AdminLayout() {
  return (
    <>
      <div>
        <h1> Admin Page</h1>
      </div>

      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
