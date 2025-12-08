// src/components/admin/DashboardSideBar.jsx
import { useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiFolder, FiFileText, FiLogOut } from "react-icons/fi";

export default function DashboardSideBar({ logout, setActiveTab }) {
  const navigate = useNavigate();

  return (
    <aside className="w-72 bg-base-100 shadow-2xl flex flex-col p-6 text-base-content backdrop-blur-xl rounded-tr-3xl rounded-br-3xl">
      <h1 className="text-3xl font-black gradient-text mb-10">BornoByte Admin</h1>

      <nav className="flex-1 flex flex-col gap-3">
        {/* Home Button */}
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-base-content/70 hover:bg-base-300/50 hover:text-base-content"
          onClick={() => navigate("/")}
        >
          <FiHome className="text-2xl" /> Home
        </button>

        {/* Team Tab */}
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-base-content/70 hover:bg-base-300/50 hover:text-base-content"
          onClick={() => setActiveTab("team")}
        >
          <FiUsers className="text-2xl" /> Team
        </button>

        {/* Projects Tab */}
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-base-content/70 hover:bg-base-300/50 hover:text-base-content"
          onClick={() => setActiveTab("projects")}
        >
          <FiFolder className="text-2xl" /> Projects
        </button>

        {/* Blogs Tab */}
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-base-content/70 hover:bg-base-300/50 hover:text-base-content"
          onClick={() => setActiveTab("blogs")}
        >
          <FiFileText className="text-2xl" /> Blogs
        </button>
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="btn btn-outline btn-error mt-6 hover:shadow-cta"
      >
        <FiLogOut className="mr-2" /> Logout
      </button>
    </aside>
  );
}
