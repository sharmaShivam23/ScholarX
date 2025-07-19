// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { visualizer } from 'rollup-plugin-visualizer' 

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     visualizer({
//       filename: './dist/bundle-report.html',
//       open: true,
//       gzipSize: true,
//       brotliSize: true,
//     }),
//   ],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer' 

// Detect if we are running on Vercel
const isVercel = process.env.VERCEL === '1';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: './dist/bundle-report.html',
      open: !isVercel, 
      
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
