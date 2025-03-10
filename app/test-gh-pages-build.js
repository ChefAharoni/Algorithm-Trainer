/*
 * This script helps test the GitHub Pages build locally
 * It simulates the GitHub Actions workflow for building the static site
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const tempDir = path.join(os.tmpdir(), 'algorithm-trainer-test-build');
const distDir = path.resolve(__dirname, 'dist');

// Ensure temp directory exists and is empty
console.log(`Setting up temporary directory at ${tempDir}...`);
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Copy current project to temp directory
console.log('Copying project files...');
execSync(`cp -r ./app/* ${tempDir}`);

// Navigate to temp directory
process.chdir(tempDir);

// Create build-static.js
console.log('Creating build script...');
fs.writeFileSync('build-static.js', `
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Run Vite build for the frontend
console.log('Building frontend with Vite...');
execSync('npx vite build --outDir ../dist', { stdio: 'inherit' });

console.log('Build completed successfully!');
`);

// Create App.tsx for GitHub Pages with HashRouter
console.log('Creating App.tsx for GitHub Pages...');
fs.writeFileSync('client/src/App.tsx', `
import { useState, useEffect } from 'react';
import { Switch, Route } from 'wouter';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Home from '@/pages/Home';
import RPNPage from '@/pages/RPNPage';
import TreePage from '@/pages/TreePage';
import NotFound from '@/pages/not-found';

// HashRouter wrapper for GitHub Pages
function useHashLocation() {
  const [location, setLocation] = useState(
    window.location.hash ? window.location.hash.replace("#", "") : "/"
  );

  useEffect(() => {
    // Handle hash change and remove the # from the location
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      setLocation(hash.replace("#", ""));
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Handle initial hash
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Replace history functions to work with hash
  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [location, navigate];
}

function Router() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, navigate] = useHashLocation();
  
  return (
    <Switch location={location}>
      <Route path="/" component={Home} />
      <Route path="/rpn" component={RPNPage} />
      <Route path="/tree" component={TreePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Router />
      <Toaster />
    </div>
  );
}

export default App;
`);

// Create vite.config.ts for GitHub Pages
console.log('Creating Vite config for GitHub Pages...');
fs.writeFileSync('vite.config.ts', `
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
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  root: './client',
});
`);

try {
  // Build the application
  console.log('Building application...');
  execSync('node build-static.js', { stdio: 'inherit' });
  
  // Copy 404.html
  console.log('Copying 404.html...');
  const sourcePath = path.resolve(__dirname, '404.html');
  const destPath = path.resolve(__dirname, 'dist', '404.html');
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('404.html copied successfully.');
  } else {
    console.warn('Warning: 404.html not found. Skipping copy.');
  }

  // Clean up the temp directory
  console.log('Cleaning up...');
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('\n✅ Build completed successfully!');
  console.log(`\nThe build output is in the 'dist' directory.`);
  console.log(`\nTo preview the GitHub Pages build, run:`);
  console.log(`\n  cd dist && npx serve -s`);
  console.log(`\nThen open http://localhost:3000 in your browser.\n`);
} catch (error) {
  console.error('\n❌ Build failed', error);
  process.exit(1);
}