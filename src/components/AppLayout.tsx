import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";


function AppLayout() {
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <Sidebar />
        <main className="h-screen">
          <Outlet />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default AppLayout;
