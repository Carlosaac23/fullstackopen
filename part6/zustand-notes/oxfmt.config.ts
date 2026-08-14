import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  printWidth: 80,
  arrowParens: 'avoid',
  sortImports: true,
  sortPackageJson: {
    sortScripts: true,
  },
});
