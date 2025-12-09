import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { subNavigationData } from '@/data/sidebar-data';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Target,
  Activity,
  DollarSign,
  Users,
  ShoppingBag,
  Percent,
  BarChart3,
  Settings
} from 'lucide-react';

function MarketingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const marketingNav = subNavigationData.marketing;

  // Group marketing tools by category for better organization
  const categories = {
    ["Tracking Analytics"]: {
      items: ['Pixel Settings', 'Conversion API', 'Track campaign results', 'Connect with Google Tag'],
      icon: Activity,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20'
    },
    ["Sales Optimization"]: {
      items: ['CROSS SELLING', 'Downsell', 'Sales Popup', 'Minimum Order Value and Conditions'],
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20'
    },
    ["Customer Engagement"]: {
      items: ['Coupons', 'Retargeting', 'Whatsapp Marketing', 'Create Referral Links'],
      icon: Users,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20'
    },
    ["Integrations"]: {
      items: ['Google Merchant', 'Verify your orders with Tc'],
      icon: Settings,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20'
    }
  };

  const performanceMetrics = [
    {
      title: "Active Campaigns",
      value: "12",
      subtitle: "Starting Soon",
      icon: Target,
      trend: 'up',
      change: '+15%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: "Conversion Rate",
      value: "3.4%",
      subtitle: "From Last Month",
      icon: Percent,
      trend: 'up',
      change: '+0.8%',
      color: 'from-green-500 to-green-600'
    },
    {
      title: "Active Coupons",
      value: "28",
      subtitle: "Redemptions Today",
      icon: ShoppingBag,
      trend: 'neutral',
      change: '156',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: "Roi",
      value: "245%",
      subtitle: "Above Target",
      icon: DollarSign,
      trend: 'up',
      change: 'Above target',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const getToolStatus = (toolTitle: string) => {
    // Simulate some tools being active
    const activeTools = ['Pixel Settings', 'Coupons', 'Google Merchant'];
    return activeTools.includes(toolTitle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Page Header with modern gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-700/25"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 backdrop-blur">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-0">
                PRO
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {"Marketing  Tools"}
            </h1>
            <p className="text-muted-foreground mt-3 text-lg max-w-2xl">
              {"Description"}
            </p>
          </div>
        </div>

        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.title}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
                  metric.color
                )} />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </CardTitle>
                    <div className={cn(
                      "p-2 rounded-lg bg-gradient-to-br",
                      metric.color,
                      "text-white shadow-lg"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    {metric.trend === 'up' && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {metric.change}
                      </Badge>
                    )}
                    {metric.trend === 'down' && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        {metric.change}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Marketing Tools by Category */}
        {Object.entries(categories).map(([category, categoryData]) => {
          const CategoryIcon = categoryData.icon;
          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-xl bg-gradient-to-br shadow-lg",
                  categoryData.gradient,
                  "text-white"
                )}>
                  <CategoryIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category}</h2>
                  <Badge variant="secondary" className="mt-1">
                    {categoryData.items.length} {"Tools"}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {marketingNav.items
                  .filter(item => categoryData.items.includes(item.title))
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = getToolStatus(item.title);
                    const isCurrentPage = location.pathname === item.url;
                    
                    return (
                      <Card 
                        key={item.title}
                        className={cn(
                          "group cursor-pointer transition-all duration-300 hover:shadow-2xl border-0",
                          "hover:-translate-y-1 relative overflow-hidden",
                          isCurrentPage && "ring-2 ring-primary shadow-xl",
                          categoryData.bgGradient
                        )}
                        onClick={() => navigate(item.url)}
                      >
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                          categoryData.gradient
                        )} style={{ opacity: 0.03 }} />
                        
                        <CardHeader className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className={cn(
                              "p-3 rounded-xl bg-gradient-to-br transition-all duration-300",
                              isActive ? categoryData.gradient : "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700",
                              "text-white shadow-lg group-hover:scale-110"
                            )}>
                              {Icon && <Icon className="h-5 w-5" />}
                            </div>
                            {isActive && (
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-0">
                                {"Active"}
                              </Badge>
                            )}
                          </div>
                          
                          <div>
                            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {item.title || item.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-sm line-clamp-2">
                              {item.description || item.description}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          {isActive && (
                            <div className="mb-3 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{"Performance"}</span>
                                <span className="font-medium">85%</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </div>
                          )}
                          
                          <Button 
                            variant={isActive ? "default" : "outline"} 
                            className={cn(
                              "w-full group-hover:shadow-md transition-all duration-300",
                              !isActive && "hover:bg-primary hover:text-primary-foreground"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(item.url);
                            }}
                          >
                            {isActive ? "Manage" : "Configure"}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          );
        })}

        {/* Quick Stats Bar */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="font-semibold">{"Overall Performance"}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>{"Tools Active"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span>{"Tools Inactive"}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/marketing/analytics')}>
                  {"View Analytics"}
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MarketingPage;