import { createBrowserRouter } from "react-router-dom";

// Layout
import Layout from "../Layout/Layout.jsx";

// Pages
import Home from "../home/Home.jsx";

// Optional 404 page
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
    ],
  },
]);

export default router;
