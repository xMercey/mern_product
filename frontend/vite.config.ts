import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // Lädt .env aus dem übergeordneten Ordner
  const env = loadEnv(mode, resolve(__dirname, '..'), '')
  
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: Number(env.VITE_PORT),
    },
  }
})
