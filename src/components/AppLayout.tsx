import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="h-screen p-4">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
