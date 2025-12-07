// src/layout/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiHome, FiUsers, FiFolder, FiFileText, FiLogOut } from "react-icons/fi";

const navItems = [
  { to: "dashboard", icon: <FiHome />, label: "Dashboard" },
  { to: "users", icon: <FiUsers />, label: "Team" },
  { to: "projects", icon: <FiFolder />, label: "Projects" },
  { to: "blogs", icon: <FiFileText />, label: "Blogs" },
];

export default function DashboardLayout() {
  // eslint-disable-next-line no-unused-vars
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-72 bg-base-100 shadow-lg flex flex-col p-6">
        <h1 className="text-3xl font-bold mb-10">BornoByte Admin</h1>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="btn btn-outline btn-error mt-6">
          <FiLogOut className="mr-2" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-10 bg-base-200">
        <Outlet />
      </main>
    </div>
  );
}
