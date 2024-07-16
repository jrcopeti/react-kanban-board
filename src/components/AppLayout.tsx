import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useOpenSidebar } from "../hooks/useOpenSidebar";

function AppLayout() {
  const { isSidebarOpen } = useOpenSidebar();
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <Sidebar />
        <main
          className={`p-4 duration-300 ease-in-out ${isSidebarOpen ? "translate-x-[26rem]" : "translate-x-0"} bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-400 to-orange-300`}

        >
          <Outlet />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default AppLayout;
