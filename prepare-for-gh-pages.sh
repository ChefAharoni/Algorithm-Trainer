#!/bin/bash

# Create a copy of App.tsx for GitHub Pages
cd app/client/src
cp App.tsx App.tsx.bak

# Modify App.tsx to use HashRouter instead of regular routing
cat > App.tsx << 'EOL'
import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Home from '@/pages/Home';
import RPNPage from '@/pages/RPNPage';
import TreePage from '@/pages/TreePage';
import NotFound from '@/pages/not-found';

// HashRouter wrapper to handle GitHub Pages
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
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Replace history functions to work with hash
  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [location, navigate];
}

function Router() {
  const [location] = useHashLocation();
  
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
EOL

# Create a modified vite.config.ts for GitHub Pages
cd ../../
cat > vite.config.ts << 'EOL'
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
  },
});
EOL

# Create a modified package.json script for the static build
cat > package.json.new << EOL
$(jq '.scripts.build = "vite build"' package.json)
EOL
mv package.json.new package.json

echo "Files prepared for GitHub Pages deployment!"