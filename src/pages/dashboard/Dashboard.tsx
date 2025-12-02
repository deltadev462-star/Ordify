import {
  Send,
  ShieldCheck,
  SquarePlay,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Clock,
  ArrowUp,
  ArrowDown,
  Eye,
  Target,
  Zap,
  Award,
  BarChart3,
  CreditCard,
  TrendingDown,
  Store,
  Sparkles,
  ChevronRight,
  Calendar
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";
import CardSetup from "@/components/CardSetup";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  subValue?: string;
  trend?: 'up' | 'down' | 'stable';
}

interface ActivityItem {
  id: string;
  type: 'order' | 'user' | 'payment';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'pending' | 'failed';
}

export default function Dashboard() {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState("week");
  const [setupProgress, setSetupProgress] = useState(30);
  
  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => setSetupProgress(53), 500);
    return () => clearTimeout(timer);
  }, []);

  // Sample statistics data - replace with real data
  const mainStats: StatCard[] = [
    {
      id: 'revenue',
      title: t("Total Revenue"),
      value: "125,430",
      change: 12.5,
      changeType: 'increase',
      icon: DollarSign,
      color: 'emerald',
      bgGradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30',
      subValue: t("EGP"),
      trend: 'up'
    },
    {
      id: 'orders',
      title: t("Total Orders"),
      value: "342",
      change: 8.2,
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'blue',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30',
      subValue: t("This month"),
      trend: 'up'
    },
    {
      id: 'customers',
      title: t("Active Customers"),
      value: "1,234",
      change: 3.1,
      changeType: 'increase',
      icon: Users,
      color: 'purple',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30',
      subValue: t("Total users"),
      trend: 'up'
    },
    {
      id: 'conversion',
      title: t("Conversion Rate"),
      value: "4.3%",
      change: 0.8,
      changeType: 'decrease',
      icon: Target,
      color: 'orange',
      bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30',
      subValue: t("Average"),
      trend: 'down'
    }
  ];

  const performanceStats = [
    {
      id: 'visits',
      title: t("Store Visits"),
      value: "18,423",
      icon: Eye,
      change: 15.3,
      trend: 'up' as const,
      color: 'indigo',
      period: t("Last 30 days")
    },
    {
      id: 'cart',
      title: t("Cart Additions"),
      value: "892",
      icon: ShoppingCart,
      change: 9.2,
      trend: 'up' as const,
      color: 'pink',
      period: t("Last 30 days")
    },
    {
      id: 'average',
      title: t("Average Order Value"),
      value: "367",
      icon: BarChart3,
      change: -2.4,
      trend: 'down' as const,
      color: 'cyan',
      period: t("EGP")
    },
    {
      id: 'pending',
      title: t("Pending Orders"),
      value: "23",
      icon: Clock,
      change: 0,
      trend: 'stable' as const,
      color: 'yellow',
      period: t("Needs action")
    }
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'order',
      title: 'New Order #2024001',
      description: 'Ahmed Mohamed placed an order',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      description: 'EGP 2,345 from Order #2024000',
      time: '12 minutes ago',
      status: 'success'
    },
    {
      id: '3',
      type: 'order',
      title: 'Order Cancelled',
      description: 'Order #2023999 was cancelled',
      time: '1 hour ago',
      status: 'failed'
    },
    {
      id: '4',
      type: 'user',
      title: 'New Customer',
      description: 'Sara Ahmed registered',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: '5',
      type: 'payment',
      title: 'Payment Pending',
      description: 'Awaiting payment for Order #2023998',
      time: '3 hours ago',
      status: 'pending'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'order': return Package;
      case 'user': return Users;
      case 'payment': return CreditCard;
      default: return Activity;
    }
  };

  const getActivityColor = (status: string) => {
    switch(status) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'pending': return 'text-yellow-600 dark:text-yellow-400';
      case 'failed': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div dir="rtl" className="min-h-screen  ">
      <div className="flex flex-1 flex-col gap-6 p-6">
        
        {/* Header Section with Welcome Message */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("Dashboard Overview")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("Monitor your store's performance and manage operations")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md">
                <Calendar className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                <SelectValue placeholder={t("Select range")} />
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                <SelectItem value="today" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20">{t("Today")}</SelectItem>
                <SelectItem value="week" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20">{t("This Week")}</SelectItem>
                <SelectItem value="month" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20">{t("This Month")}</SelectItem>
                <SelectItem value="quarter" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20">{t("This Quarter")}</SelectItem>
                <SelectItem value="year" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20">{t("This Year")}</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 border border-blue-500/20">
              <Eye className="h-4 w-4 mr-2" />
              {t("View Reports")}
            </Button>
          </div>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.id}
                className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${stat.bgGradient}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className={`text-sm font-medium text-${stat.color}-700 dark:text-${stat.color}-400`}>
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
                      <div className="flex items-center gap-2">
                        {stat.changeType === 'increase' ? (
                          <ArrowUp className={`h-4 w-4 text-${stat.color}-600`} />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          stat.changeType === 'increase' 
                            ? `text-${stat.color}-600 dark:text-${stat.color}-400` 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {stat.change}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t("vs last period")}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                      <Icon className={`h-8 w-8 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Store Setup Guide - Enhanced */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <Title
                  className="text-2xl font-bold"
                  title={t("Store Setup Guide")}
                  Subtitle={t("Follow these simple steps to set up your store and start selling")}
                  classNamee="text-sm text-muted-foreground"
                />
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">
                  {t("You have completed")} 
                  <span className="text-green-600 dark:text-green-400 font-bold ml-1">
                    {setupProgress}%
                  </span>
                </p>
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">
                  {t("In Progress")}
                </Badge>
              </div>
              <Progress 
                value={setupProgress} 
                className="h-3 bg-gray-200 dark:bg-gray-700" 
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {t("5 of 10 tasks completed")}
                </span>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {t("View all tasks")}
                </span>
              </div>
            </div>
            <CardSetup />
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div>
          <Title
            title={t("Performance Metrics")}
            Subtitle={t("Key indicators of your store's health")}
            className="text-2xl font-bold mb-4"
            classNamee="text-sm text-muted-foreground"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.id}
                  className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-950/30`}>
                        <Icon className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                      </div>
                      {stat.trend === 'up' && (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      )}
                      {stat.trend === 'down' && (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      {stat.trend === 'stable' && (
                        <Activity className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {stat.period}
                    </p>
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
                <Title
                  className="text-lg font-semibold"
                  title={t("Recent Activity")}
                  Subtitle=""
                  classNamee=""
                />
                <Button variant="ghost" size="sm">
                  {t("View All")}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.status === 'success' ? 'bg-green-50 dark:bg-green-950/30' :
                      activity.status === 'pending' ? 'bg-yellow-50 dark:bg-yellow-950/30' :
                      'bg-red-50 dark:bg-red-950/30'
                    }`}>
                      <Icon className={`h-4 w-4 ${getActivityColor(activity.status)}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#cacaca] to-[#ffb5b533] dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <Title
                  className="text-lg font-semibold text-gray-800 dark:text-white"
                  title={t("Quick Actions")}
                  Subtitle={t("Get started with these recommended actions")}
                  classNamee="text-gray-600 dark:text-gray-300"
                />
                <Sparkles className="h-5 w-5 text-orange-500 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-between bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white border-gray-300 dark:border-white/20">
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {t("Add New Product")}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white border-gray-300 dark:border-white/20">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {t("View Customers")}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white border-gray-300 dark:border-white/20">
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {t("Analytics Report")}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 dark:from-yellow-500 dark:to-orange-500 dark:hover:from-yellow-600 dark:hover:to-orange-600 text-white shadow-lg">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  {t("Boost Sales")}
                </span>
                <Badge className="bg-white/30 dark:bg-white/20 text-white border-0">
                  {t("PRO")}
                </Badge>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Learning Resources */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-8 w-8 text-yellow-300" />
                  <h3 className="text-2xl font-bold">
                    {t("Your guide to getting started")}
                  </h3>
                </div>
                <p className="text-white/90 mb-6 max-w-2xl">
                  {t("Learn how to use the platform and increase your earnings through a series of educational videos, and stay updated with the latest updates and developments via our Telegram channel.")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold shadow-lg">
                    <Send className="h-4 w-4 mr-2" />
                    {t("Join Our Telegram channel")}
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg">
                    <SquarePlay className="h-4 w-4 mr-2" />
                    {t("Watch the tutorials")}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-2xl animate-pulse" />
                <Store className="h-32 w-32 text-white/80 relative" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Banner if needed */}
        <NotActive />

      </div>
    </div>
  );
}
