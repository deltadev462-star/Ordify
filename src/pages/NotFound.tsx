import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
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
        <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-4xl font-bold text-foreground">
            {t('404.title', 'Page Not Found')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {t('404.description', 'Oops! The page you are looking for does not exist. It might have been moved or deleted.')}
          </p>
          
          {/* Actions */}
          <div className={`flex gap-4 justify-center pt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/">
              <Button size="lg">
                {t('404.goHome', 'Go to Home')}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                {t('404.goDashboard', 'Go to Dashboard')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional helpful links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            {t('404.helpfulLinks', 'Here are some helpful links:')}
          </p>
          <div className={`flex flex-wrap gap-4 justify-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/dashboard/product" className="text-primary hover:underline">
              {t('404.products', 'Products')}
            </Link>
            <Link to="/dashboard/order" className="text-primary hover:underline">
              {t('404.orders', 'Orders')}
            </Link>
            <Link to="/dashboard/settings" className="text-primary hover:underline">
              {t('404.settings', 'Settings')}
            </Link>
            <Link to="/login" className="text-primary hover:underline">
              {t('404.login', 'Login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;