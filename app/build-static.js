/**
 * Custom build script for GitHub Pages
 * This script builds only the frontend part of the application
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure dist directory exists
const distDir = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a temporary GitHub Pages specific Vite config
console.log('Creating GitHub Pages specific Vite config...');

// First, check if we have a TypeScript config
const viteConfigTsPath = path.resolve(__dirname, 'vite.config.ts');
const viteConfigJsPath = path.resolve(__dirname, 'vite.config.js');

// Determine which config file exists
const useTypeScript = fs.existsSync(viteConfigTsPath);
const configPath = useTypeScript ? viteConfigTsPath : viteConfigJsPath;

// Backup the existing config if it exists
if (fs.existsSync(configPath)) {
  const backupPath = `${configPath}.backup`;
  console.log(`Backing up existing config to ${backupPath}...`);
  fs.copyFileSync(configPath, backupPath);
}

// Write the new GitHub Pages specific config
const viteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Algorithm-Trainer/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@server': path.resolve(__dirname, './server'),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  root: './client',
});
`;

// Write the config to the appropriate file
fs.writeFileSync(configPath, viteConfig);
console.log(`Wrote GitHub Pages config to ${configPath}`);

try {
  console.log('Building frontend for GitHub Pages...');
  
  // Build the frontend
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Copy 404.html if it exists
  const notFoundPath = path.resolve(__dirname, '404.html');
  if (fs.existsSync(notFoundPath)) {
    fs.copyFileSync(notFoundPath, path.join(distDir, '404.html'));
    console.log('Copied 404.html to dist directory');
  }
  
  console.log('Frontend build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} finally {
  // Restore the original vite config
  const backupPath = `${configPath}.backup`;
  if (fs.existsSync(backupPath)) {
    console.log(`Restoring original config from ${backupPath}...`);
    fs.copyFileSync(backupPath, configPath);
    fs.unlinkSync(backupPath);
  }
}
