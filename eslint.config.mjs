import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import path from "node:path";

const __dirname = path.resolve();

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/*.config.ts",
      "**/*.config.js",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["frontend/**/*.{ts,tsx,js,jsx}"],
    ...reactHooks.configs["recommended-latest"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      ...reactRefresh.configs.vite.rules,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ["./frontend/tsconfig.json"],
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
      },
    },
  },

  {
    files: ["backend/**/*.ts"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ["./backend/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },

  {
    files: ["shared/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./shared/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["e2e/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./e2e/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },

  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
