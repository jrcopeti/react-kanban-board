import { Link } from "react-router-dom";

function Navbar() {
  const routes = [
    { to: "/", label: "Home" },
    { to: "/tasks", label: "Tasks" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className='flex items-center justify-around text-lg font-semibold'>
      {routes.map((route) => (
        <Link to={route.to} key={route.to}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
