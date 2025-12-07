import { createBrowserRouter } from "react-router-dom";

// Layout
import Layout from "../Layout/Layout.jsx";

// Pages
import Home from "../home/Home.jsx";
import About from "../AboutUs/About.jsx";
import ContactPage from "../ContactUs/Contact.jsx";
import ProjectsPage from "../Projects/projectPage.jsx";
import ServicesPage from "../Services/servicesMain.jsx";
import BlogPage from "../Blog/Blog.jsx";

// Admin secret route
import ProtectedRoute from "../Admin/ProtectedRoute.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";
import DashboardMain from "../Admin/DashboardMain.jsx";
import DashUsers from "../Admin/DashUsers.jsx";
import DashProjects from "../Admin/DashProject.jsx";
import DashBlogs from "../Admin/DashBlogs.jsx";
import AdminAccess from "../Admin/AdminAccess.jsx";

// Optional 404 page
// eslint-disable-next-line react-refresh/only-export-components
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-base-200">
    <div className="text-center">
      <h1 className="text-9xl font-black text-primary">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <a href="/" className="btn btn-primary mt-8">Back to Home</a>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // Add more routes here if needed
      // NEW PAGES
      { path: "/about", element: <About /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/blog", element: <BlogPage /> },

    ],
  },

  // Secret Admin Routes
  {
    path: "/adminxyz",
    element: <AdminAccess />,
  },
  {
    path: "/adminxyz",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {  path: "dashboard", element: <DashboardMain /> },
      { path: "users", element: <DashUsers /> },
      { path: "projects", element: <DashProjects /> },
      { path: "blogs", element: <DashBlogs /> },
      
    ],
  },
]);

export default router;
