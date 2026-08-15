import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  arrowParens: 'avoid',
  sortImports: true,
  sortPackageJson: {
    sortScripts: true,
  },
});
