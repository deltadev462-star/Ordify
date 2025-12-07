import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Target,
  TrendingUp,
  Package,
  Eye,
  BarChart3,
  Clock,
  Send,
  SquarePlay,
  Store,
  Award
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { ActivityFeed, type ActivityItem } from "@/components/dashboard/widgets/ActivityFeed";
import { QuickActions } from "@/components/dashboard/widgets/QuickActions";
import { StoreHealth, type HealthItem } from "@/components/dashboard/widgets/StoreHealth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardSetup from "@/components/CardSetup";
import Title from "@/components/Title";
import NotActive from "@/components/NotActive";

export default function Dashboard() {
  const { t } = useTranslation();
  const [setupProgress, setSetupProgress] = useState(30);
  
  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => setSetupProgress(65), 500);
    return () => clearTimeout(timer);
  }, []);

  // Sample data - replace with real API calls
  const mainMetrics = [
    {
      title: t("Total Revenue"),
      value: "125,430",
      change: 12.5,
      changeType: 'increase' as const,
      icon: DollarSign,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      subValue: t("EGP"),
      trend: 'up' as const,
      period: t("vs last month")
    },
    {
      title: t("Total Orders"),
      value: "342",
      change: 8.2,
      changeType: 'increase' as const,
      icon: ShoppingCart,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBgColor: 'bg-blue-50 dark:bg-blue-950/30',
      subValue: t("This month"),
      trend: 'up' as const,
      period: t("vs last month")
    },
    {
      title: t("Active Customers"),
      value: "1,234",
      change: 3.1,
      changeType: 'increase' as const,
      icon: Users,
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBgColor: 'bg-purple-50 dark:bg-purple-950/30',
      subValue: t("Total users"),
      trend: 'up' as const,
      period: t("vs last month")
    },
    {
      title: t("Conversion Rate"),
      value: "4.3%",
      change: 0.8,
      changeType: 'decrease' as const,
      icon: Target,
      iconColor: 'text-orange-600 dark:text-orange-400',
      iconBgColor: 'bg-orange-50 dark:bg-orange-950/30',
      subValue: t("Average"),
      trend: 'down' as const,
      period: t("vs last month")
    }
  ];

  const performanceMetrics = [
    {
      title: t("Store Visits"),
      value: "18,423",
      icon: Eye,
      change: 15.3,
      trend: 'up' as const,
      changeType: 'increase' as const,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
      period: t("Last 30 days")
    },
    {
      title: t("Cart Additions"),
      value: "892",
      icon: ShoppingCart,
      change: 9.2,
      trend: 'up' as const,
      changeType: 'increase' as const,
      iconColor: 'text-pink-600 dark:text-pink-400',
      iconBgColor: 'bg-pink-50 dark:bg-pink-950/30',
      period: t("Last 30 days")
    },
    {
      title: t("Average Order Value"),
      value: "367",
      icon: BarChart3,
      change: -2.4,
      trend: 'down' as const,
      changeType: 'decrease' as const,
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      iconBgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
      period: t("EGP"),
      subValue: t("EGP")
    },
    {
      title: t("Pending Orders"),
      value: "23",
      icon: Clock,
      change: 0,
      trend: 'stable' as const,
      changeType: 'neutral' as const,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      iconBgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      period: t("Needs action")
    }
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'order',
      title: t("dashboard.newOrder", { orderNumber: "#2024001" }),
      description: t("dashboard.placedOrderDescription", { name: "Ahmed Mohamed" }),
      time: t("dashboard.minutesAgo", { count: 5 }),
      status: 'success'
    },
    {
      id: '2',
      type: 'payment',
      title: t("dashboard.paymentReceived"),
      description: t("dashboard.paymentDescription", { amount: "2,345", currency: "EGP", orderNumber: "#2024000" }),
      time: t("dashboard.minutesAgo", { count: 12 }),
      status: 'success'
    },
    {
      id: '3',
      type: 'order',
      title: t("dashboard.orderCancelled"),
      description: t("dashboard.orderCancelledDescription", { orderNumber: "#2023999" }),
      time: t("dashboard.hoursAgo", { count: 1 }),
      status: 'failed'
    },
    {
      id: '4',
      type: 'user',
      title: t("dashboard.newCustomer"),
      description: t("dashboard.customerRegisteredDescription", { name: "Sara Ahmed" }),
      time: t("dashboard.hoursAgo", { count: 2 }),
      status: 'success'
    },
    {
      id: '5',
      type: 'payment',
      title: t("dashboard.paymentPending"),
      description: t("dashboard.paymentPendingDescription", { orderNumber: "#2023998" }),
      time: t("dashboard.hoursAgo", { count: 3 }),
      status: 'pending'
    }
  ];

  const healthItems: HealthItem[] = [
    {
      id: '1',
      title: t('Complete store setup'),
      status: 'warning',
      message: t('Add your business information and tax settings'),
      action: {
        label: t('Complete Setup'),
        url: '/dashboard/settings'
      }
    },
    {
      id: '2',
      title: t('Add more products'),
      status: 'warning',
      message: t('You have less than 10 products. Add more to increase sales'),
      action: {
        label: t('Add Products'),
        url: '/dashboard/products/new'
      }
    },
    {
      id: '3',
      title: t('SEO optimization'),
      status: 'good',
      message: t('Your store SEO is properly configured'),
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {t("Dashboard Overview")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("Welcome back! Here's what's happening with your store today.")}
        </p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            iconColor={metric.iconColor}
            iconBgColor={metric.iconBgColor}
            subValue={metric.subValue}
            trend={metric.trend}
            period={metric.period}
          />
        ))}
      </div>

      {/* Second Row - Store Setup and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Setup Guide */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <Title
                  className="text-xl font-bold"
                  title={t("Complete Your Store Setup")}
                  Subtitle={t("Follow these steps to maximize your store's potential")}
                  classNamee="text-sm text-muted-foreground"
                />
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  {t("Setup Guide")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardSetup />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>

      {/* Performance Metrics */}
      <div>
        <Title
          title={t("Performance Metrics")}
          Subtitle={t("Key indicators of your store's health")}
          className="text-xl font-bold mb-4"
          classNamee="text-sm text-muted-foreground"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              iconColor={metric.iconColor}
              iconBgColor={metric.iconBgColor}
              subValue={metric.subValue}
              trend={metric.trend}
              period={metric.period}
            />
          ))}
        </div>
      </div>

      {/* Third Row - Activity Feed and Store Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <ActivityFeed 
            activities={recentActivities}
            onViewAll={() => console.log('View all activities')}
          />
        </div>

        {/* Store Health */}
        <StoreHealth
          setupProgress={setupProgress}
          healthScore={78}
          healthItems={healthItems}
          onViewDetails={() => console.log('View health details')}
        />
      </div>

      {/* Learning Resources */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Award className="h-8 w-8 text-yellow-300" />
                <h3 className="text-2xl font-bold">
                  {t("Your guide to growing your business")}
                </h3>
              </div>
              <p className="text-white/90 mb-6 max-w-2xl">
                {t("Learn how to use Ordify effectively and increase your sales through our comprehensive resources and community support.")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold shadow-lg">
                  <Send className="h-4 w-4 mr-2" />
                  {t("Join Telegram Community")}
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg">
                  <SquarePlay className="h-4 w-4 mr-2" />
                  {t("Watch Video Tutorials")}
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
  );
}
