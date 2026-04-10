# AGENTS.md

## Language
- Always reply in 繁體中文回答。

## Project Setup
- This is a Vue 3 project using Vite as the build tool.
- Node.js version: ^20.19.0 || >=22.12.0

## Commands
- Install dependencies: `npm install`
- Development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Project Structure
- `src/` contains the main application code
- `src/assets/` contains static assets like CSS and images
- `src/components/` contains Vue components
- `src/App.vue` is the main application component
- `src/main.js` is the entry point for the Vue application

## Vite Configuration
- Uses `@vitejs/plugin-vue` for Vue 3 support
- Uses `vite-plugin-vue-devtools` for Vue DevTools integration
- Alias `@` points to `/src` directory

## Development Tools
- Vue DevTools for debugging and inspection
- Vite for fast development and build

## Code Style
- Uses ES modules (ESM)
- Follows Vue 3 Composition API conventions
