// src/components/admin/DashboardMain.jsx
import { useAuth } from "../../hooks/useAuth";
import { FiTrendingUp, FiUsers, FiFolder, FiFileText } from "react-icons/fi";

export default function DashboardMain() {
  const { user } = useAuth();

  const stats = [
    { label: "Total Projects", value: "48", icon: <FiFolder />, color: "text-primary" },
    { label: "Team Members", value: "12", icon: <FiUsers />, color: "text-secondary" },
    { label: "Blog Posts", value: "89", icon: <FiFileText />, color: "text-accent" },
    { label: "Revenue 2025", value: "$284k", icon: <FiTrendingUp />, color: "text-success" },
  ];

  return (
    <div>
      <h1 className="text-5xl font-black gradient-text mb-4">
        Welcome back, {user?.name?.split(" ")[0] || "Boss"}
      </h1>
      <p className="text-xl text-base-content/70 mb-12">
        Here's what's happening in your empire today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card bg-base-100 shadow-2xl p-8 hover:shadow-primary/30 transition-all duration-500 border border-base-300">
            <div className="flex items-center justify-between mb-6">
              <div className={`text-5xl ${stat.color}`}>{stat.icon}</div>
              <span className="text-4xl font-black text-base-content">{stat.value}</span>
            </div>
            <p className="text-lg font-medium text-base-content/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}