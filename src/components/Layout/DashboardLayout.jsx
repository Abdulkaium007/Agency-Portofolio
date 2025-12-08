// src/layout/DashboardLayout.jsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import DashboardSideBar from "./DashboardComponents/DashSide";
import DashboardTopBar from "./DashboardComponents/DashTop";
import DashboardMain from "../Admin/DashboardMain";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("team"); // default tab

  return (
    <div className="flex min-h-screen">
      <DashboardSideBar logout={logout} setActiveTab={setActiveTab} />
      <main className="flex-1 p-10 bg-base-200 overflow-auto">
        <DashboardTopBar />
        <DashboardMain activeTab={activeTab} />
      </main>
    </div>
  );
}
