import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "concitus-consulting-ltd",
    project: "jsm-apple-jsap-app"
  }), sentryVitePlugin({
    org: "concitus-consulting-ltd",
    project: "jsm-apple-jsap-app"
  })],

  build: {
    sourcemap: true
  }
})