import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { TestConfig } from "./test/TestConfig.cjs";

// see https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build/dist",
  },
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      "/api/": {
        target: "http://localhost:8081/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\//, "/"),
      },
    },
  },
  test: {
    testTimeout: TestConfig.isDebug ? -1 : 5_000,
    clearMocks: true,
    restoreMocks: true,
    include: ["**/src/**/*.spec.ts"],
    environment: "jsdom",
    setupFiles: "./src/vitest-setup.ts",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules"],
    },
  },
});
