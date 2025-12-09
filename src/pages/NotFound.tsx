import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const NotFound = () => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    document.title = "404 - Page Not Found | Ordify";
    
    // Load the Lottie animation from public directory
    fetch('/lottie/Error 404.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load Lottie animation:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Lottie Animation */}
        <div className="w-full max-w-md mx-auto mb-8">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              className="w-full h-auto"
            />
          )}
        </div>

        {/* Content */}
        <div className="space-y-4 text-left">
          <h1 className="text-4xl font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
          
          {/* Actions */}
          <div className="flex gap-4 justify-center pt-6">
            <Link to="/">
              <Button size="lg">
                Go to Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional helpful links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Here are some helpful links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/dashboard/product" className="text-primary hover:underline">
              Products
            </Link>
            <Link to="/dashboard/order" className="text-primary hover:underline">
              Orders
            </Link>
            <Link to="/dashboard/settings" className="text-primary hover:underline">
              Settings
            </Link>
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;