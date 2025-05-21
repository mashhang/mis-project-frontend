import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Admission/", // Required if you deploy under a folder
  server: {
    port: 5173,
    historyApiFallback: true, // Needed for React Router
  },
  // server: {
  //   proxy: {
  //     "/save_user.php": {
  //       target: "http://localhost",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     "/login.php": {
  //       target: "http://localhost",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  //   historyApiFallback: true,
  // },
});
