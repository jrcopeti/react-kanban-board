import { Link } from "react-router-dom";
import logo from "../assets/images/microchip-icon.png"

function Navbar() {
  const routes = [
    { to: "/", label: "Home" },
    { to: "/tasks", label: "Tasks" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className='flex items-center justify-between text-lg font-semibold px-3 py-2'>
      <img src={logo} alt="logo" className='h-10 w-10' />
      {routes.map((route) => (
        <Link to={route.to} key={route.to}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
