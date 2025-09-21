import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "🏠 Home" },
    { to: "/diario", label: "📓 Diario" },
    { to: "/medicine", label: "💊 Medicine" },
    { to: "/terapie", label: "🧠 Terapie" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-500 p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white text-2xl font-bold mb-2 md:mb-0">
          💙 App per Marco
        </div>
        <div className="flex flex-wrap gap-3 justify-center items-center text-sm md:text-base">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={\`
                px-3 py-2 rounded transition duration-200
                \${location.pathname === item.to
                  ? "bg-white text-blue-600 font-semibold shadow"
                  : "text-white hover:underline"}
              \`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;