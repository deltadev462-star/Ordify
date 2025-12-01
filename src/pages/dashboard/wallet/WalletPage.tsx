import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { subNavigationData } from '@/data/sidebar-data';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

function WalletPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const walletNav = subNavigationData.wallet;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">{walletNav.title}</h1>
        <p className="text-muted-foreground mt-2">{walletNav.description}</p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold">$12,456.78</span>
            <Badge variant="default" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Updated 5 minutes ago
          </p>
        </CardContent>
      </Card>

      {/* Sub-navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {walletNav.items.map((item) => {
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className={cn(
                        "p-2 rounded-lg",
                        isActive ? "bg-primary text-primary-foreground" : "bg-secondary"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                    )}
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </div>
                  {item.title === "Transactions" && (
                    <Badge variant="secondary">1,234 total</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{item.description}</CardDescription>
                
                {/* Quick Preview for each section */}
                {item.title === "Balance" ? (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available</span>
                      <span className="font-medium">$10,456.78</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium">$2,000.00</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Today</span>
                      <span className="font-medium">23 transactions</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">This week</span>
                      <span className="font-medium">156 transactions</span>
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
                  {isActive ? "Currently Viewing" : "View Details"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234.56</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +23.5% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,456.78</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.3% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$34,567.89</div>
            <p className="text-xs text-red-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Payouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,000.00</div>
            <p className="text-xs text-muted-foreground">
              Next payout in 3 days
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WalletPage;