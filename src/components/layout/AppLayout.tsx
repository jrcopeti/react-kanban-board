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
        className={`min-h-[92vh] p-4 duration-300 ease-in-out ${isSidebarOpen ? "w-[calc(100%-18rem)] translate-x-[18rem]" : "w-full translate-x-0"} dark:bg-gradient-to-t-from-cyan-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-400 to-orange-300 dark:bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] dark:from-blue-600 dark:via-slate-500 dark:to-rose-900`}
      >
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default AppLayout;
