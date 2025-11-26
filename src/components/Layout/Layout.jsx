import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Shared components
import Navbar from "../shared/Navbar.jsx";
import Footer from "../shared/Footer.jsx";
import Loader from "../shared/Loader.jsx";

const Layout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100">
          <Loader />
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
