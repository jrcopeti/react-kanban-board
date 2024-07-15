import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { routes } from "../utils";
import { useOpenSidebar } from "../hooks/useOpenSidebar";
import { FiMenu } from "react-icons/fi";

function Navbar() {
  const { toggleSidebar, headerRef } = useOpenSidebar();
  const path = useLocation();
  console.log("pathname", path);

  const pathname =
    path.pathname === "/" ? "home" : path.pathname.split("/").join("");
  console.log("pathname", pathname);

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between bg-gray-100 px-12 py-3 text-lg font-semibold"
      ref={headerRef}
    >
      <button onClick={toggleSidebar}>
        <FiMenu size={40} className="cursor-pointer" />
      </button>

      <div className="capitalize">
        <h2>{pathname}</h2>
      </div>

      <Link to="/">
        <div className="flex cursor-pointer items-center gap-4">
          <h1>Kanban Board</h1>
          <MdOutlineSpaceDashboard size={50} />
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
