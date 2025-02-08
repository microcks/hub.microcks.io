import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../../api/microcks-hub-openapi-v1.0.yaml',
  output: 'src/client',
  plugins: ['@hey-api/client-fetch'],
});