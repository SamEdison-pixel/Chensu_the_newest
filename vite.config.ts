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
  base: '/Chensu_the_newest/',
  plugins: [react(), tsconfigPaths()], 
  build: {
    outDir: 'dist' // 直接输出到 dist 根目录，让 index.html 放在 dist/ 下
  },
  server: {
    allowedHosts: true, // 允许所有外部域名访问（包括 ngrok）
    host: true,         // 监听所有网络地址
    port: 5173          // 保持你原来的端口
  }
});
