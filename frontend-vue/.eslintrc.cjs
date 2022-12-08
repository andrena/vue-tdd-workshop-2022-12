"use strict";

/* eslint-env node -- this a CommonJS file */

module.exports = {
  root: true,
  plugins: ["eslint-plugin-vue", "@typescript-eslint"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".vue"],
    project: ["./tsconfig.json"],
  },
  extends: [
    "eslint:recommended",
    "plugin:eslint-comments/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "plugin:jest-dom/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:vue/vue3-recommended",
    "eslint-config-prettier",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": [
      "error",
      { allowHigherOrderFunctions: true },
    ],
    "@typescript-eslint/explicit-member-accessibility": ["error", {accessibility: "no-public" }],
    "eslint-comments/require-description": "error",
    "import/no-unresolved": "off", // use TypeScript to find such errors
    "no-undef": "off", // use TypeScript to find such errors
  },
  overrides: [
    {
      files: "*.spec.ts",
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
    {
      files: "*.cjs",
      rules: {
        "@typescript-eslint/no-var-requires": "off", // .cjs files use CommonJS, so require is expected and correct
      },
    },
  ],
};
