/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "happy-dom",
    setupFiles: "./src/lib/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
      all: false,
    },
  },
});
