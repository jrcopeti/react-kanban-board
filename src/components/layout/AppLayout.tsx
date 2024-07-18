import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useOpenSidebar } from "../../hooks/useOpenSidebar";

function AppLayout() {
  const { isSidebarOpen } = useOpenSidebar();
  return (
    <>
      <Navbar />
      <Sidebar />
      <main
        className={`min-h-[100vh] min-w-full p-4 duration-300 ease-in-out ${isSidebarOpen ? "w-[calc(100%-18rem)] translate-x-[18rem]" : "w-full translate-x-0"} bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-400 to-orange-300`}
      >
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default AppLayout;
