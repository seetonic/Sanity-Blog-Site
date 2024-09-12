import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex justify-between p-8 items-center">
      <NavLink to="/" className="text-3xl font-bold italic">
        <span className="text-sky-500 text-4xl">S</span>eetonic
      </NavLink>
      <div className="flex gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-slate-600" : "hover:text-slate-400"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "text-slate-700" : "hover:text-slate-400"
          }
        >
          Products
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
