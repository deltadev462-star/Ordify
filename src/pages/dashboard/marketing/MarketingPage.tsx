import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { subNavigationData } from '@/data/sidebar-data';
import { cn } from '@/lib/utils';

function MarketingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const marketingNav = subNavigationData.marketing;

  // Group marketing tools by category for better organization
  const categories = {
    'Tracking & Analytics': ['Pixel Settings', 'Conversion API', 'Track campaign results', 'Connect with Google Tag'],
    'Sales Optimization': ['CROSS SELLING', 'Downsell', 'Sales Popup', 'Minimum Order Value'],
    'Customer Engagement': ['Coupons', 'Retargeting', 'Whatsapp Marketing', 'Create Referral Links'],
    'Integrations': ['Google Merchant', 'Verify your orders with Tc']
  };

  const getCategoryForItem = (itemTitle: string) => {
    for (const [category, items] of Object.entries(categories)) {
      if (items.includes(itemTitle)) return category;
    }
    return 'Other';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">{marketingNav.title}</h1>
        <p className="text-muted-foreground mt-2">{marketingNav.description}</p>
      </div>

      {/* Sub-navigation Grid - Organized by Categories */}
      {Object.entries(categories).map(([category, categoryItems]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {category}
            <Badge variant="secondary" className="ml-2">
              {categoryItems.length} tools
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {marketingNav.items
              .filter(item => categoryItems.includes(item.title))
              .map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <Card 
                    key={item.title}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-lg",
                      isActive && "ring-2 ring-primary shadow-lg"
                    )}
                    onClick={() => navigate(item.url)}
                  >
                    <CardHeader className="space-y-1 pb-3">
                      <div className="flex items-center gap-2">
                        {Icon && (
                          <div className={cn(
                            "p-1.5 rounded-lg",
                            isActive ? "bg-primary text-primary-foreground" : "bg-secondary"
                          )}>
                            <Icon className="h-4 w-4" />
                          </div>
                        )}
                        <CardTitle className="text-base">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                      <Button 
                        variant={isActive ? "default" : "outline"} 
                        size="sm"
                        className="w-full mt-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(item.url);
                        }}
                      >
                        {isActive ? "Active" : "Configure"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      {/* Marketing Performance Overview */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Marketing Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 starting soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.4%</div>
              <p className="text-xs text-green-600">+0.8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Coupons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">156 redemptions today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245%</div>
              <p className="text-xs text-green-600">Above target</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MarketingPage;