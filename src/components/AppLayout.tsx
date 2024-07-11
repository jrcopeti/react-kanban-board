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
          className={`h-screen p-4 duration-300 ease-in-out ${isSidebarOpen ? "translate-x-[26rem]" : "translate-x-0"}`}
        >
          <Outlet />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default AppLayout;
