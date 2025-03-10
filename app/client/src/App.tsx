import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

// Pages
import Home from "@/pages/Home";
import RPNPage from "@/pages/RPNPage";
import TreePage from "@/pages/TreePage";
import NotFound from "@/pages/not-found";

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
  const navigate = (to) => {
    window.location.hash = to;
  };

  return [location, navigate];
}

function App() {
  const [location, navigate] = useHashLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Switch
          location={location}
          matcher={(pattern, path) => {
            if (pattern === "/" && path === "/") return [true, {}];
            if (pattern === "/rpn" && path === "/rpn") return [true, {}];
            if (pattern === "/tree" && path === "/tree") return [true, {}];
            if (pattern !== "/" && pattern !== "/rpn" && pattern !== "/tree")
              return [path === pattern, {}];
            return [false, null];
          }}
        >
          <Route path="/" component={Home} />
          <Route path="/rpn" component={RPNPage} />
          <Route path="/tree" component={TreePage} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
