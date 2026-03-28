/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  base: './',
  plugins: getPlugins(),
  server: {
    allowedHosts: true, // 允许所有外部域名访问（包括 ngrok）
    host: true,         // 监听所有网络地址
    port: 5173          // 保持你原来的端口
  }
});
