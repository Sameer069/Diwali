import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'animations': ['gsap', 'framer-motion'],
          'particles': ['canvas-confetti', 'tsparticles', '@tsparticles/react']
        }
      }
    }
  }
})
