import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout.jsx";
import Home from "../home/Home.jsx";
import About from "../AboutUs/About.jsx";
import ContactPage from "../ContactUs/Contact.jsx";
import ProjectsPage from "../Projects/projectPage.jsx";
import ServicesPage from "../Services/servicesMain.jsx";
import BlogPage from "../Blog/Blog.jsx";

// Admin
import AdminAccess from "../Admin/AdminAccess.jsx";
import ProtectedRoute from "../Admin/ProtectedRoute.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";
import DashboardMain from "../Admin/DashboardMain.jsx";
import DashUsers from "../Admin/DashUsers.jsx";
import DashProjects from "../Admin/DashProject.jsx";
import DashBlogs from "../Admin/DashBlog.jsx";

export const router = createBrowserRouter([
  // Public website
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/blog", element: <BlogPage /> },
    ],
  },

  // Admin login/register
  { path: "/adminxyz", element: <AdminAccess /> },

  // Protected dashboard with relative child paths
  {
    path: "/adminxyz/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <DashboardMain /> }, // matches /adminxyz/dashboard
      { path: "users", element: <DashUsers /> }, // /adminxyz/dashboard/users
      { path: "projects", element: <DashProjects /> }, // /adminxyz/dashboard/projects
      { path: "blogs", element: <DashBlogs /> }, // /adminxyz/dashboard/blogs
    ],
  },
]);

export default router;
