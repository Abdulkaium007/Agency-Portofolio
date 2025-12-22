// src/components/admin/DashboardMain.jsx
import DashUsers from "./DashUsers";
import DashProjects from "./DashProject";
import DashBlogs from "./DashBlog";
import DashTeamMembers from "./DashTeam";

export default function DashboardMain({ activeTab }) {
  const renderTab = () => {
    switch (activeTab) {
      case "team":
        return <DashUsers />;
      case "projects":
        return <DashProjects />;
      case "blogs":
        return <DashBlogs />;
      case "team_members":
        return <DashTeamMembers />;
      default:
        return <DashUsers />;
    }
  };

  return <div className="space-y-8">{renderTab()}</div>;
}
