// src/components/admin/DashboardMain.jsx
import DashUsers from "./DashUsers";
import DashProjects from "./DashProject";
import DashBlogs from "./DashBlog";

export default function DashboardMain({ activeTab }) {
  const renderTab = () => {
    switch (activeTab) {
      case "team":
        return <DashUsers />;
      case "projects":
        return <DashProjects />;
      case "blogs":
        return <DashBlogs />;
      default:
        return <DashUsers />;
    }
  };

  return <div className="space-y-8">{renderTab()}</div>;
}
