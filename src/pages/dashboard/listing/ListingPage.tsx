import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { subNavigationData } from '@/data/sidebar-data';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import {
  Package,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Star,
  ShoppingCart,
  Sparkles,
  ChevronRight,
  Activity,
  DollarSign,
  BarChart3,
  Award,
  Zap,
  AlertCircle
} from 'lucide-react';

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  subValue?: string;
  progress?: number;
  target?: string | number;
}

interface ActivityItem {
  id: string;
  type: 'product' | 'category' | 'review' | 'stock';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ElementType;
}

function ListingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const listingNav = subNavigationData.listing;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Enhanced statistics with gradients
  const mainStats: StatCard[] = [
    {
      id: 'products',
      title: t("Total Products"),
      value: "856",
      change: 15.3,
      trend: 'up',
      icon: Package,
      color: 'blue',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30',
      subValue: t("Active"),
      progress: 85,
      target: "1,000"
    },
    {
      id: 'categories',
      title: t("Active Categories"),
      value: "24",
      change: 8.2,
      trend: 'up',
      icon: BarChart3,
      color: 'purple',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30',
      subValue: t("Categories"),
      progress: 92,
      target: "30"
    },
    {
      id: 'reviews',
      title: t("Total Reviews"),
      value: "3,421",
      change: -2.1,
      trend: 'down',
      icon: Star,
      color: 'orange',
      bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30',
      subValue: t("Reviews"),
      progress: 68,
      target: "5,000"
    },
    {
      id: 'rating',
      title: t("Average Rating"),
      value: "4.6",
      change: 0.3,
      trend: 'up',
      icon: Award,
      color: 'green',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30',
      subValue: t("out of 5"),
      progress: 92,
      target: "5.0"
    }
  ];

  // Recent activities
  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'product',
      title: t('New Product Added'),
      description: t('Summer Collection T-Shirt was added to catalog'),
      time: t('5 minutes ago'),
      status: 'success',
      icon: Package
    },
    {
      id: '2',
      type: 'stock',
      title: t('Low Stock Alert'),
      description: t('5 products are running low on stock'),
      time: t('1 hour ago'),
      status: 'warning',
      icon: AlertCircle
    },
    {
      id: '3',
      type: 'review',
      title: t('New Review'),
      description: t('5-star review on Winter Jacket'),
      time: t('2 hours ago'),
      status: 'success',
      icon: Star
    },
    {
      id: '4',
      type: 'category',
      title: t('Category Updated'),
      description: t('Electronics category was modified'),
      time: t('3 hours ago'),
      status: 'info',
      icon: BarChart3
    }
  ];

  const getActivityColor = (status: string) => {
    switch(status) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getActivityBg = (status: string) => {
    switch(status) {
      case 'success': return 'bg-green-50 dark:bg-green-950/30';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-950/30';
      case 'error': return 'bg-red-50 dark:bg-red-950/30';
      case 'info': return 'bg-blue-50 dark:bg-blue-950/30';
      default: return 'bg-gray-50 dark:bg-gray-950/30';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Modern Header with Search and Actions */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {listingNav.title}
            </h1>
            <p className="text-muted-foreground mt-1">{listingNav.description}</p>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="px-3 py-1">
              <Activity className="h-3 w-3 mr-1" />
              {t("Active Listings")}: 856
            </Badge>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25"
              onClick={() => navigate('/dashboard/listing/products')}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("Add New Product")}
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("Search products, categories, or reviews...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full md:w-[200px] bg-gray-50 dark:bg-gray-800">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t("Filter by")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Items")}</SelectItem>
                  <SelectItem value="products">{t("Products")}</SelectItem>
                  <SelectItem value="categories">{t("Categories")}</SelectItem>
                  <SelectItem value="reviews">{t("Reviews")}</SelectItem>
                  <SelectItem value="outofstock">{t("Out of Stock")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.id}
              className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${stat.bgGradient}`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 dark:bg-white/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
              
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-${stat.color}-500/10 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                    </div>
                  </div>
                  {stat.trend !== 'stable' && (
                    <Badge 
                      variant="outline" 
                      className={`${
                        stat.trend === 'up' 
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' 
                          : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                      } font-medium`}
                    >
                      {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {Math.abs(stat.change)}%
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <p className={`text-sm font-medium text-${stat.color}-700 dark:text-${stat.color}-400 opacity-80`}>
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-3xl font-bold text-${stat.color}-700 dark:text-${stat.color}-400`}>
                      {stat.value}
                    </p>
                    {stat.subValue && (
                      <span className={`text-sm text-${stat.color}-600/70 dark:text-${stat.color}-400/70`}>
                        {stat.subValue}
                      </span>
                    )}
                  </div>
                  
                  {stat.progress && stat.target && (
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className={`text-${stat.color}-600/70 dark:text-${stat.color}-400/70`}>
                          {t("Progress")}
                        </span>
                        <span className={`font-medium text-${stat.color}-700 dark:text-${stat.color}-400`}>
                          {stat.progress}% {t("of")} {stat.target}
                        </span>
                      </div>
                      <Progress 
                        value={stat.progress} 
                        className="h-2 bg-white/50 dark:bg-black/20"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Sub-navigation Cards */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">{t("Manage Listings")}</h2>
          <Button variant="ghost" size="sm">
            {t("View All")}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listingNav.items.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;
            
            // Different gradient colors for each card
            const gradients = [
              'from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-900/20',
              'from-purple-50 to-pink-100 dark:from-purple-950/20 dark:to-pink-900/20',
              'from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-900/20',
              'from-orange-50 to-amber-100 dark:from-orange-950/20 dark:to-amber-900/20',
              'from-cyan-50 to-teal-100 dark:from-cyan-950/20 dark:to-teal-900/20',
              'from-rose-50 to-red-100 dark:from-rose-950/20 dark:to-red-900/20'
            ];
            
            const gradient = gradients[index % gradients.length];
            
            return (
              <Card 
                key={item.title}
                className={cn(
                  "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-0",
                  `bg-gradient-to-br ${gradient}`,
                  isActive && "ring-2 ring-primary shadow-xl scale-[1.02]"
                )}
                onClick={() => navigate(item.url)}
              >
                <CardHeader className="space-y-1 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <div className={cn(
                          "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-white/80 dark:bg-gray-800/80 text-foreground"
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                      <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                    </div>
                    {isActive && (
                      <Badge className="bg-primary/10 text-primary border-0">
                        {t("Active")}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm min-h-[40px]">
                    {item.description}
                  </CardDescription>
                  
                  {/* Add some mock stats for each section */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("Items")}</span>
                    <span className="font-medium">
                      {index === 0 ? '856' : index === 1 ? '24' : index === 2 ? '3,421' : '12'}
                    </span>
                  </div>
                  
                  <Button 
                    variant={isActive ? "default" : "secondary"} 
                    className="w-full group-hover:shadow-md transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(item.url);
                    }}
                  >
                    {isActive ? t("Currently Viewing") : t("Go to Section")}
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("Recent Activity")}</h3>
              <Button variant="ghost" size="sm">
                {t("View All")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activity.icon || Package;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${getActivityBg(activity.status)}`}>
                    <Icon className={`h-4 w-4 ${getActivityColor(activity.status)}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950/30 dark:to-purple-900/30">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">
                  {t("Quick Actions")}
                </h3>
                <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70 mt-1">
                  {t("Manage your product listings efficiently")}
                </p>
              </div>
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-between bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700">
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                {t("Import Products")}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                {t("Bulk Edit")}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700">
              <span className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {t("Update Prices")}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                {t("Quick Inventory Check")}
              </span>
              <Badge className="bg-white/30 text-white border-0">
                {t("NEW")}
              </Badge>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="h-8 w-8 text-yellow-300" />
                <h3 className="text-2xl font-bold">{t("Product Performance Insights")}</h3>
              </div>
              <p className="text-white/90 mb-6 max-w-2xl">
                {t("Your top performing product Summer Collection T-Shirt has generated 45% more revenue this month. Keep your inventory stocked!")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-white/70">{t("Best Seller")}</p>
                  <p className="text-lg font-semibold">{t("Summer T-Shirt")}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">{t("Revenue")}</p>
                  <p className="text-lg font-semibold">{t("+45%")}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">{t("Units Sold")}</p>
                  <p className="text-lg font-semibold">{t("234")}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">{t("Stock Level")}</p>
                  <p className="text-lg font-semibold">{t("Low (12)")}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold shadow-lg">
                  <Eye className="h-4 w-4 mr-2" />
                  {t("View Product Analytics")}
                </Button>
                <Button className="bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-semibold shadow-lg">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("Restock Now")}
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-full blur-2xl animate-pulse" />
              <Package className="h-32 w-32 text-white/80 relative" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ListingPage;

// Add Trophy icon import if it's missing
const Trophy = Award;