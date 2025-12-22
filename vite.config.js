import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Allows access from network IPs
    proxy: {
      "/api": {
        target: "http://100.84.176.7:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // Optional but recommended: handle WebSocket if needed later
        // ws: true,
        configure: (proxy) => {
          // eslint-disable-next-line no-unused-vars
          proxy.on("error", (err, _req, res) => {
            console.log("Proxy error:", err);
          });
          // eslint-disable-next-line no-unused-vars
          proxy.on("proxyReq", (proxyReq, req, res) => {
            // Helpful for debugging
            // console.log("Proxying request:", req.method, req.url);
          });
        },
      },
    },
  },
});