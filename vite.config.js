import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const llmBaseUrl = env.VITE_LLM_BASE_URL || 'https://api.openai.com/v1'
  const url = new URL(llmBaseUrl)
  const proxyTarget = url.origin
  const proxyPath = url.pathname.replace(/\/$/, '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/api/llm': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/llm/, `${proxyPath}/chat/completions`),
        },
      },
    },
  }
})
