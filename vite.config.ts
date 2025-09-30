import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "localhost",
    port: 3002,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@repo/ui",
        replacement: path.resolve(__dirname, "./src/components/ui"),
      },
      {
        find: "@repo/types",
        replacement: path.resolve(__dirname, "./src/types"),
      },
      {
        find: "@repo/lib",
        replacement: path.resolve(__dirname, "./src/lib"),
      },
      {
        find: "@repo/store",
        replacement: path.resolve(__dirname, "./src/store"),
      },
      {
        find: "@repo/hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@repo/store",
        replacement: path.resolve(__dirname, "./src/store"),
      },
      {
        find: "@repo/components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@repo/design-system",
        replacement: path.resolve(__dirname, "./src/design-system"),
      },
    ],
  },
});
