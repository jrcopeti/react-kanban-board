import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

function Navbar() {
  const routes = [
    { to: "/", label: "Home" },
    { to: "/tasks", label: "Tasks" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="flex items-center justify-between py-3 px-12 text-lg font-semibold bg-gray-100 sticky top-0 z-50">
      <Link to="/">
        <MdOutlineSpaceDashboard size={50} className="cursor-pointer" />
      </Link>
      {routes.map((route) => (
        <Link to={route.to} key={route.to}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
