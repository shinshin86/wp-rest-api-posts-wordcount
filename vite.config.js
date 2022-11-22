import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index-umd.ts'),
      formats: ['umd'],
      name: 'GetWPWordcountList'
    },
    rollupOptions: {
        external: ['url'],
        output: {
            globals: {
                url: 'url'
            }
        }
    },
    outDir: "dist/umd"
  }
})