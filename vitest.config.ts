import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest-setup/mongo-memory-server.ts']
  }
})
