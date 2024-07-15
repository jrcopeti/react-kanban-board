import { Link } from "react-router-dom";
import { routes } from "../utils";
import { useOpenSidebar } from "../hooks/useOpenSidebar";

function Sidebar() {
  const { sidebarRef, isSidebarOpen } = useOpenSidebar();
  console.log("routes", routes);

  return (
    <aside
      className={`fixed z-50 flex h-full w-[16rem] flex-col gap-[8rem] border-r-[2px] bg-cyan-200 px-[3.2rem] py-[2.4rem] shadow-md duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      ref={sidebarRef}
    >
      {routes.map((route) => (
        <Link to={route.to} key={route.to}>
          <div className="flex items-center gap-4 text-xl font-semibold">
            <route.icon size={30} />
            {route.label}
          </div>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
