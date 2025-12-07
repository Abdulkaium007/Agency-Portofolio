// src/layout/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiHome, FiUsers, FiFolder, FiFileText, FiSettings, FiLogOut } from "react-icons/fi";

const navItems = [
  { to: "/adminxyz/dashboard", icon: <FiHome />, label: "Dashboard" },
  { to: "/adminxyz/users", icon: <FiUsers />, label: "Team" },
  { to: "/adminxyz/projects", icon: <FiFolder />, label: "Projects" },
  { to: "/adminxyz/blogs", icon: <FiFileText />, label: "Blog" },
  { to: "/adminxyz/settings", icon: <FiSettings />, label: "Settings" },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-base-100 shadow-2xl flex flex-col border-r border-base-300">
        <div className="p-8 border-b border-base-300">
          <h1 className="text-4xl font-black gradient-text">BornoByte</h1>
          <p className="text-sm text-base-content/70 mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "text-base-content/70 hover:bg-base-300/50 hover:text-base-content"
                }`
              }
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-base-300">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "A"}&background=6366f1&color=fff`}
              alt="Avatar"
              className="w-14 h-14 rounded-full ring-4 ring-primary/20"
            />
            <div>
              <p className="font-bold text-lg">{user?.name || "Admin"}</p>
              <p className="text-sm text-base-content/60">Administrator</p>
            </div>
          </div>
          <button onClick={logout} className="btn btn-outline btn-error w-full">
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-base-200">
        <Outlet />
      </main>
    </div>
  );
}