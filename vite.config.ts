import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// Vite project lives under /client (index.html is in client/index.html)
export default defineConfig({
  root: 'client',
  publicDir: 'public',
  plugins: [react(), tailwindcss()],
  // Ensure env-controlled flags are embedded reliably at build time.
  // Netlify/Vite can occasionally fail to reflect UI env vars in import.meta.env,
  // so we define a dedicated compile-time boolean.
  define: {
    __ETLAQ_ANTI_INSPECT__: JSON.stringify(
      ['true', '1', 'yes', 'on'].includes(
        String(process.env.VITE_ANTI_INSPECT ?? '').trim().toLowerCase(),
      ),
    ),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Reduce the number of tiny shared chunks (e.g., lucide icon modules)
        // which show up as long dependency chains in PSI/Lighthouse.
        // We intentionally group frequently-shared deps into a few stable chunks.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('@radix-ui')) return 'radix';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('wouter')) return 'router';
          if (id.includes('@tanstack') || id.includes('@trpc')) return 'data';

          return 'vendor';
        },
        // NOTE: We intentionally avoid experimental Rollup options here
        // to keep Netlify builds stable.
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
