import { Link } from "react-router-dom";
import { routes } from "../../utils";
import { useOpenSidebar } from "../../hooks/useOpenSidebar";
import ToggleTheme from "../ui/ToggleTheme";

function Sidebar() {
  const { sidebarRef, isSidebarOpen } = useOpenSidebar();
  console.log("routes", routes);

  return (
    <aside
      className={`text fixed z-50 flex h-full w-[18rem] grid-cols-1 flex-col gap-10 border-r-[1px] bg-pallette-600 px-[3.2rem] py-[2.4rem] text-3xl text-pallette-100 shadow-md duration-300 ease-in-out dark:bg-slate-700 dark:text-blue-100 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      ref={sidebarRef}
    >
      <div>
        <ToggleTheme />
      </div>

      {routes.map((route) => (
        <Link to={route.to} key={route.to}>
          <div className="flex items-center gap-4 text-xl font-semibold hover:text-pallette-50  dark:hover:text-blue-200">
            <route.icon size={30} />
            {route.label}
          </div>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
