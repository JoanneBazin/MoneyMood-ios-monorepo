import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/schemas/index.ts", "src/types/index.ts"],
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  clean: true,
  outDir: "dist",
});
