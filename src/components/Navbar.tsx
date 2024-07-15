import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { routes } from "../utils";
import { useOpenSidebar } from "../hooks/useOpenSidebar";

function Navbar() {
  const { toggleSidebar, headerRef } = useOpenSidebar();

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between bg-gray-100 px-12 py-3 text-lg font-semibold"
      ref={headerRef}
    >
      <button onClick={toggleSidebar}>
        <MdOutlineSpaceDashboard size={50} className="cursor-pointer" />
      </button>

      {routes.map((route) => (
        <Link to={route.to} key={route.to}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
