import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),

    eslintPlugin({
      emitWarning: true, // 경고로만 처리
      emitError: false, // 에러를 발생시키지 않음
      failOnWarning: false, // 경고 상태에서 빌드 실패하지 않음
      failOnError: false, // 에러 상태에서 빌드 실패하지 않음
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
