import { Link } from "react-router-dom";
import { routes } from "../utils";
import { useOpenSidebar } from "../hooks/useOpenSidebar";

function Sidebar() {
  const { sidebarRef, isSidebarOpen } = useOpenSidebar();

  return (
    <aside
      className={`fixed z-50 grid h-full w-[26rem] grid-cols-1 grid-rows-[auto,1fr] gap-8 border-r-[1px] bg-cyan-200 px-[3.2rem] py-[2.4rem] shadow-md duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      ref={sidebarRef}
    >
      {routes.map((route) => (
        <Link to={route.to} key={route.to}>
          {route.label}
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
