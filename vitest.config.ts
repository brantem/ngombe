import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: ['default', 'html'],
    outputFile: {
      html: './.vitest/html/index.html',
    },
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      provider: 'c8',
      cleanOnRerun: true,
      include: ['src'],
      exclude: [
        '**/__mocks__',
        '**/types',
        '**/__tests__',
        'src/pages',
        'src/components/Background.tsx',
        'src/components/Waves.tsx',
      ],
      skipFull: true,
      all: true,
    },
    logHeapUsage: true,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      data: path.resolve(__dirname, './src/data'),
      lib: path.resolve(__dirname, './src/lib'),
      pages: path.resolve(__dirname, './src/pages'),
    },
  },
});
