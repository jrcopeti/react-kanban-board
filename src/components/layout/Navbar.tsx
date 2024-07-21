// Router
import { Link, useLocation } from "react-router-dom";

// UI
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

// Hooks
import { useOpenSidebar } from "../../hooks/useOpenSidebar";

function Navbar() {
  const { toggleSidebar, headerRef } = useOpenSidebar();
  const path = useLocation();

  const pathname = () => {
    if (path.pathname === "/") {
      return "home";
    } else if (path.pathname === "/kanban") {
      return "kanban";
    } else if (path.pathname === "/tasks") {
      return "tasks";
    } else if (path.pathname === "/about") {
      return "about";
    } else {
      return "not found";
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between bg-pallette-100 px-12 py-3 text-4xl font-normal dark:bg-gray-900 dark:text-blue-100"
      ref={headerRef}
    >
      <button title="Toggle Sidebar" onClick={toggleSidebar}>
        <FiMenu size={40} className="cursor-pointer" />
      </button>

      <div
        title="Page"
        className="ml-[140px] hidden text-4xl capitalize lg:block"
      >
        <h2>{pathname()}</h2>
      </div>

      <Link to="/">
        <div title="Home" className="flex cursor-pointer items-center gap-4">
          <h1>KanDo</h1>
          <MdOutlineSpaceDashboard size={45} />
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
