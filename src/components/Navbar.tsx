import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { routes } from "../utils";
import { useOpenSidebar } from "../hooks/useOpenSidebar";

function Navbar() {
  const { toggleSidebar, headerRef } = useOpenSidebar();

  return (
    <nav
      className="bg-pallette-100 sticky top-0 z-50 flex items-center justify-between px-12 py-3 text-4xl font-semibold"
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
