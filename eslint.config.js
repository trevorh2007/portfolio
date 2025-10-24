import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import jestDom from "eslint-plugin-jest-dom";
import prettierPlugin from "eslint-plugin-prettier";
import testingLibrary from "eslint-plugin-testing-library";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // Base configuration
  js.configs.recommended,

  // Next.js configuration (using compat for legacy configs)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Global configuration for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      prettier: prettierPlugin,
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    rules: {
      // Prettier integration
      "prettier/prettier": "error",

      // Code Quality Rules (2025 Best Practices)
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "warn",
      "no-unused-vars": "off", // Using TypeScript version instead
      "@typescript-eslint/no-unused-vars": "error",

      // React Best Practices
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "warn",
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/self-closing-comp": "error",

      // Modern JavaScript (ES2025)
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",

      // Performance & Security
      "no-await-in-loop": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",

      // Testing Best Practices
      "testing-library/await-async-queries": "error",
      "testing-library/no-await-sync-queries": "error",
      "testing-library/no-debugging-utils": "warn",
      "testing-library/prefer-screen-queries": "error",
    },
  },

  // Test files specific configuration
  {
    files: ["**/__tests__/**/*", "**/*.{test,spec}.*", "jest.setup.js"],
    languageOptions: {
      globals: {
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      // Allow console in tests for debugging
      "no-console": "off",
      // Allow require in jest config files
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Prettier configuration (must be last to override other configs)
  prettier,

  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "eslint.config.js", // Don't lint the config file itself
      "jest.config.cjs", // Don't lint jest config
      "jest.config.ci.cjs", // Don't lint CI jest config
      "jest.setup.cjs", // Don't lint jest setup
      "next.config.mjs", // Don't lint Next.js config
      "next-env.d.ts", // Don't lint Next.js generated types
    ],
  },
];
