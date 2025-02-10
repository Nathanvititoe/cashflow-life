/** @type {import('prettier').Config} */
module.exports = {
  // Maximum line length before wrapping
  printWidth: 80,

  // Use 2 spaces for indentation
  tabWidth: 2,

  // Never use tabs instead of spaces
  useTabs: false,

  // Add semicolons at the end of statements
  semi: true,

  // Use double quotes instead of single quotes
  singleQuote: false,

  // Use single quotes in JSX
  jsxSingleQuote: false,

  // Add trailing commas in objects, arrays, etc.
  trailingComma: "es5",

  // Add spaces between brackets in object literals
  bracketSpacing: true,

  // Put the closing angle bracket of JSX elements on a new line
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter
  arrowParens: "always",

  // Ensure consistent line endings
  endOfLine: "auto",

  // Ensure consistent whitespace in HTML
  htmlWhitespaceSensitivity: "css",

  // Format embedded code in template literals
  embeddedLanguageFormatting: "auto",

  // Use proper quotes in properties
  quoteProps: "as-needed",
};