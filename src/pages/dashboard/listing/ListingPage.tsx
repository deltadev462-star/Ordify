import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { subNavigationData } from '@/data/sidebar-data';
import { cn } from '@/lib/utils';

function ListingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const listingNav = subNavigationData.listing;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">{listingNav.title}</h1>
        <p className="text-muted-foreground mt-2">{listingNav.description}</p>
      </div>

      {/* Sub-navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listingNav.items.map((item) => {
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
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className={cn(
                      "p-2 rounded-lg",
                      isActive ? "bg-primary text-primary-foreground" : "bg-secondary"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
                <Button 
                  variant={isActive ? "default" : "outline"} 
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.url);
                  }}
                >
                  {isActive ? "Currently Viewing" : "Go to Section"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Optional: Quick Stats or Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,421</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ListingPage;