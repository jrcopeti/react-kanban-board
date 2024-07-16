import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useOpenSidebar } from "../hooks/useOpenSidebar";
import { Home } from "lucide-react";

function AppLayout() {
  const { isSidebarOpen } = useOpenSidebar();
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <Sidebar />
        <main
          className={`h-full p-4 duration-300 ease-in-out ${isSidebarOpen ? "translate-x-[26rem]" : "translate-x-0"} bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-400 to-orange-300`}
        >
          <Outlet />
          <Home className="text-center text-9xl font-normal text-pallette-600" />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default AppLayout;
