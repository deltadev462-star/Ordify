import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { subNavigationData } from '@/data/sidebar-data';
import { cn } from '@/lib/utils';
import { Palette, Globe, Eye, Code } from 'lucide-react';

function WebsitePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const websiteNav = subNavigationData.website;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">{websiteNav.title}</h1>
        <p className="text-muted-foreground mt-2">{websiteNav.description}</p>
      </div>

      {/* Website Preview Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Your Website</CardTitle>
                <CardDescription>www.yourstore.com</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                Code
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-muted/20 h-48 flex items-center justify-center">
            <p className="text-muted-foreground">Website preview area</p>
          </div>
        </CardContent>
      </Card>

      {/* Sub-navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {websiteNav.items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.url;
          
          return (
            <Card 
              key={item.title}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg relative overflow-hidden",
                isActive && "ring-2 ring-primary shadow-lg"
              )}
              onClick={() => navigate(item.url)}
            >
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
              
              <CardHeader className="space-y-1 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className={cn(
                        "p-3 rounded-lg",
                        isActive ? "bg-primary text-primary-foreground" : "bg-secondary"
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      {item.title === "Themes" && (
                        <Badge variant="secondary" className="mt-1">12 themes available</Badge>
                      )}
                      {item.title === "Texts" && (
                        <Badge variant="secondary" className="mt-1">5 languages</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-base">{item.description}</CardDescription>
                
                {/* Preview section for each option */}
                {item.title === "Themes" ? (
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {['Modern', 'Classic', 'Minimal', 'Luxe'].map((theme) => (
                      <div 
                        key={theme}
                        className="aspect-square rounded bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-xs font-medium"
                      >
                        {theme}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Home Page</span>
                      <Badge variant="outline">Edited</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Product Page</span>
                      <Badge variant="outline">Edited</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Checkout Page</span>
                      <Badge variant="secondary">Default</Badge>
                    </div>
                  </div>
                )}
                
                <Button 
                  variant={isActive ? "default" : "outline"} 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.url);
                  }}
                >
                  {isActive ? "Currently Managing" : item.title === "Themes" ? "Browse Themes" : "Edit Texts"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Website Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Active Theme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Modern Dark</div>
            <p className="text-xs text-muted-foreground">Last changed 5 days ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">3 custom pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">English default</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">2 hours ago</div>
            <p className="text-xs text-muted-foreground">Auto-save enabled</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WebsitePage;