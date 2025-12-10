import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'tcapital-website' with your EXACT GitHub repository name
// If your repo is named 'my-site', this should be '/my-site/'
export default defineConfig({
  plugins: [react()],
  base: "/tcapital/", 
})