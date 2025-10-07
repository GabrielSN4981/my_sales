const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");

// Globals do Node.js
const nodeGlobals = {
  require: "readonly",
  module: "readonly",
  exports: "readonly",
  process: "readonly",
  console: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  Buffer: "readonly",
  global: "readonly",
};

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      globals: nodeGlobals,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      /* "no-console": "warn", */
    },
  },
  {
    ignores: ["node_modules", "dist", "build", "*.js"],
  },
];
