/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginEslint } from '@rsbuild/plugin-eslint';
import { pluginReact } from '@rsbuild/plugin-react';
import StylelintPlugin from 'stylelint-webpack-plugin';
import packageJson from './package.json';

const resolveModule = (module: string) => {
  try {
    require.resolve(module);
    return true;
  } catch {
    return false;
  }
};

const { publicVars } = loadEnv({ prefixes: [process.env.ENV_PREFIX ?? 'FRONT_'] });

const publicUrl = process.env.PUBLIC_URL ?? (packageJson as { homepage?: string }).homepage ?? '/';
const publicPath = new URL(publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`, 'http://localhost').pathname;
const disableSourceMap = (process.env.DISABLE_SOURCE_MAP ?? 'false') === 'true' ? false : 'source-map';
const disableStyleLintPlugin =
  (process.env.DISABLE_STYLELINT_PLUGIN ?? 'false') === 'true' || !resolveModule('stylelint');

export default defineConfig(({ env }) => {
  const isProduction = env === 'production';

  return {
    plugins: [
      pluginReact(),
      !isProduction &&
        pluginEslint({
          enable: (process.env.DISABLE_ESLINT_PLUGIN ?? 'false') === 'true' || !resolveModule('eslint'),
        }),
    ].filter(Boolean),
    source: {
      entry: {
        index: 'src/main.ts',
      },
      define: publicVars,
    },
    output: {
      assetPrefix: publicPath,
      sourceMap: {
        js: isProduction ? disableSourceMap : 'cheap-module-source-map',
        css: (process.env.DISABLE_SOURCE_MAP ?? 'false') !== 'true',
      },
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
      port: parseInt(process.env.PORT ?? '3000', 10),
      open: (process.env.BROWSER ?? 'false') === 'true',
    },
    tools: {
      rspack: {
        plugins: [
          !disableStyleLintPlugin &&
            new StylelintPlugin({
              extensions: ['css', 'scss', 'sass'],
              stylelintPath: require.resolve('stylelint'),
              failOnError: isProduction,
              context: 'src',
            }),
        ].filter(Boolean),
      },
    },
    html: {
      template: './index.html',
    },
  };
});
