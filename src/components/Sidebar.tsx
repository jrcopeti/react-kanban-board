import { Link } from "react-router-dom";
import { routes } from "../utils";
import { useOpenSidebar } from "../hooks/useOpenSidebar";

function Sidebar() {
  const { sidebarRef, isSidebarOpen } = useOpenSidebar();
  console.log("routes", routes);

  return (
    <aside
      className={`bg-pallette-600 text text-pallette-100 fixed z-50 grid h-full w-[26rem] grid-cols-1 grid-rows-[auto,1fr] gap-8 border-r-[1px] px-[3.2rem] py-[2.4rem] text-3xl shadow-md duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}

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
