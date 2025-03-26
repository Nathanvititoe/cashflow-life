/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["universe", "universe/native"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
        "newlines-between": "always",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@/*"],
            message: "Please use relative imports instead of @ alias",
          },
        ],
      },
    ],
    "prettier/prettier": "error", // apply prettier fixes
  },
};
