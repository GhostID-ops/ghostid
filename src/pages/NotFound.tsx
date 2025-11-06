import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-6 inline-flex p-6 rounded-2xl bg-primary/10">
          <Ghost className="h-16 w-16 text-primary animate-pulse-slow" />
        </div>
        <h1 className="mb-4 text-6xl font-bold text-gradient">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">This page has vanished into the void</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground ghost-glow">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
