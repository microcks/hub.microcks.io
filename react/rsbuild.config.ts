import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
  ],
  source: {
    entry: {
      index: 'src/main.ts',
    },
  },
  output: {
    distPath: {
      root: 'dist',
    },
    copy: [
      {
        from: 'public',
        to: '.',
      },
    ],
  },
  server: {
    port: 3000,
    open: false,
  },
  html: {
    template: './index.html',
  },
});
