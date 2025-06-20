export default {
  '*.{js,jsx,mjs,ts,tsx}': 'eslint --fix',
  '*.{ts,tsx}': 'tsc-files --noEmit',
  '*.{scss,css}': 'stylelint --fix',
  '*.!(js|jsx|mjs|ts|tsx|scss|css)': 'prettier --write --ignore-unknown',
};
