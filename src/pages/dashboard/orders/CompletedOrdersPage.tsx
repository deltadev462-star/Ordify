import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle2,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Download,
  Heart,
  ThumbsUp,
  MessageSquare,
  BarChart3,
  Eye,
  MoreVertical,
  Phone,
  Mail
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { OrdersTable, type Order } from "@/components/orders/OrdersTable";
import { OrderFilters, type OrderFilters as OrderFiltersType } from "@/components/orders/OrderFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function CompletedOrdersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<OrderFiltersType>({});
  const [selectedTimeRange, setSelectedTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('week');

  // Sample completed orders - replace with API call
  const completedOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-003",
      customer: {
        name: "محمد سالم",
        email: "mohamed@example.com",
        phone: "+20 123 456 7892"
      },
      items: 5,
      total: 2100,
      status: "delivered",
      paymentMethod: "wallet",
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-15T16:45:00Z"
    },
    {
      id: "2",
      orderNumber: "ORD-2024-010",
      customer: {
        name: "سارة أحمد",
        email: "sara@example.com",
        phone: "+20 123 456 7893"
      },
      items: 3,
      total: 1450,
      status: "delivered",
      paymentMethod: "card",
      createdAt: "2024-01-13T11:30:00Z",
      updatedAt: "2024-01-14T15:00:00Z"
    },
    {
      id: "3",
      orderNumber: "ORD-2024-011",
      customer: {
        name: "خالد إبراهيم",
        email: "khaled@example.com",
        phone: "+20 123 456 7897"
      },
      items: 2,
      total: 850,
      status: "delivered",
      paymentMethod: "cash",
      createdAt: "2024-01-13T09:15:00Z",
      updatedAt: "2024-01-14T11:30:00Z"
    },
    {
      id: "4",
      orderNumber: "ORD-2024-012",
      customer: {
        name: "منى عبد الله",
        email: "mona@example.com",
        phone: "+20 123 456 7898"
      },
      items: 7,
      total: 3200,
      status: "delivered",
      paymentMethod: "bank",
      createdAt: "2024-01-12T14:20:00Z",
      updatedAt: "2024-01-13T16:45:00Z"
    },
    {
      id: "5",
      orderNumber: "ORD-2024-013",
      customer: {
        name: "أسماء حسين",
        email: "asmaa@example.com",
        phone: "+20 123 456 7899"
      },
      items: 1,
      total: 450,
      status: "delivered",
      paymentMethod: "wallet",
      createdAt: "2024-01-12T10:00:00Z",
      updatedAt: "2024-01-13T12:30:00Z"
    }
  ];

  // Completed orders statistics
  const completedStats = [
    {
      title: t("Total Completed"),
      value: "285",
      change: 12.3,
      changeType: 'increase' as const,
      icon: CheckCircle2,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBgColor: 'bg-green-50 dark:bg-green-950/30',
      trend: 'up' as const,
      period: t("vs last month")
    },
    {
      title: t("Revenue Generated"),
      value: "EGP 425,320",
      change: 18.7,
      changeType: 'increase' as const,
      icon: TrendingUp,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBgColor: 'bg-blue-50 dark:bg-blue-950/30',
      trend: 'up' as const,
      period: t("vs last month")
    },
    {
      title: t("Customer Rating"),
      value: "4.8",
      subValue: "/5",
      change: 0.3,
      changeType: 'increase' as const,
      icon: Star,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      iconBgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      trend: 'up' as const,
      period: t("improvement")
    },
    {
      title: t("Repeat Customers"),
      value: "62%",
      change: 8.5,
      changeType: 'increase' as const,
      icon: Heart,
      iconColor: 'text-pink-600 dark:text-pink-400',
      iconBgColor: 'bg-pink-50 dark:bg-pink-950/30',
      trend: 'up' as const,
      period: t("vs last quarter")
    }
  ];

  // Filter orders
  const filteredOrders = completedOrders.filter(order => {
    if (filters.paymentMethod && order.paymentMethod !== filters.paymentMethod) {
      return false;
    }
    
    if (filters.minAmount && order.total < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount && order.total > filters.maxAmount) {
      return false;
    }
    
    return true;
  });

  const handleViewOrder = (order: Order) => {
    navigate(`/dashboard/orders/${order.id}`);
  };

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    console.log('Update order status:', orderId, status);
  };

  const handleExport = () => {
    console.log('Export completed orders');
  };

  // Time range filters
  const timeRangeOptions = [
    { value: 'today', label: t('Today'), count: 12 },
    { value: 'week', label: t('This Week'), count: 85 },
    { value: 'month', label: t('This Month'), count: 285 },
    { value: 'all', label: t('All Time'), count: 1250 }
  ];

  // Customer satisfaction data
  const satisfactionData = [
    { rating: 5, count: 210, percentage: 73.7 },
    { rating: 4, count: 48, percentage: 16.8 },
    { rating: 3, count: 18, percentage: 6.3 },
    { rating: 2, count: 6, percentage: 2.1 },
    { rating: 1, count: 3, percentage: 1.1 }
  ];

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      refunded: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Mobile card view for orders
  const MobileOrderCard = ({ order }: { order: Order }) => (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with order number and status */}
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-lg">#{order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <Badge className={cn("capitalize", getStatusColor(order.status))}>
              {t(order.status)}
            </Badge>
          </div>

          {/* Customer info */}
          <div className="space-y-1">
            <p className="font-medium">{order.customer.name}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {order.customer.phone}
              </span>
              <span className="flex items-center gap-1 truncate">
                <Mail className="h-3 w-3" />
                {order.customer.email}
              </span>
            </div>
          </div>

          {/* Order details */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-muted-foreground">{t("Items")}</p>
              <p className="font-medium">{order.items}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("Total")}</p>
              <p className="font-medium">{t('EGP')} {order.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("Payment")}</p>
              <p className="font-medium capitalize">{t(order.paymentMethod)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="default"
              size="sm"
              className="gap-2"
              onClick={() => handleViewOrder(order)}
            >
              <Eye className="h-4 w-4" />
              {t("View Details")}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                  <Eye className="mr-2 h-4 w-4" />
                  {t("View Details")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  {t("Download Invoice")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {t("Request Review")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header with Gradient Background - Responsive padding */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 p-4 md:p-8 text-white animate-in slide-in-from-top duration-500">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Award className="h-6 w-6 md:h-8 md:w-8" />
              {t("Completed Orders")}
            </h1>
            <p className="mt-2 text-sm md:text-base text-green-100 max-w-2xl">
              {t("View and analyze all successfully delivered orders. Track customer satisfaction and revenue metrics.")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs md:text-sm text-green-100">{t("Total Revenue")}</p>
              <p className="text-xl md:text-2xl font-bold">EGP 425,320</p>
            </div>
            <div className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-lg">
              <BarChart3 className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Completed Orders Metrics - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {completedStats.map((stat, index) => (
          <div key={index} className="animate-in slide-in-from-bottom duration-500" style={{ animationDelay: `${index * 100}ms` }}>
            <MetricCard
              title={stat.title}
              value={stat.value}
              subValue={stat.subValue}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBgColor={stat.iconBgColor}
              trend={stat.trend}
              period={stat.period}
            />
          </div>
        ))}
      </div>

      {/* Customer Satisfaction Overview - Responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 animate-in slide-in-from-left duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              {t("Customer Satisfaction")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">4.8</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-4 w-4 md:h-5 md:w-5",
                      star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {satisfactionData.map((item) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <span className="text-sm w-8 text-right">{item.rating}★</span>
                  <div className="flex-1">
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 animate-in slide-in-from-right duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              {t("Customer Feedback")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <ThumbsUp className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("Positive Feedback")}</p>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground">{t("Fast Delivery")}</p>
                  <p className="text-lg font-semibold">89%</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground">{t("Product Quality")}</p>
                  <p className="text-lg font-semibold">95%</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground">{t("Customer Service")}</p>
                  <p className="text-lg font-semibold">87%</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground">{t("Value for Money")}</p>
                  <p className="text-lg font-semibold">91%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Filters - Grid layout for mobile */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 animate-in slide-in-from-bottom duration-500">
        {timeRangeOptions.map((range) => (
          <Button
            key={range.value}
            variant={selectedTimeRange === range.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeRange(range.value as typeof selectedTimeRange)}
            className="gap-2 transition-all duration-200 hover:scale-105 justify-center border-gray-200 dark:border-gray-700"
          >
            <Calendar className="h-4 w-4" />
            <span className="truncate">{range.label}</span>
            <Badge variant="secondary" className="ml-1 h-5 px-1">
              {range.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Orders Section - Table for desktop, Cards for mobile */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg animate-in slide-in-from-bottom duration-500">
        <CardContent className="p-0">
          {/* Desktop view */}
          <div className="hidden md:block">
            <div className="space-y-4 p-6">
              <OrderFilters
                filters={filters}
                onFiltersChange={setFilters}
                onExport={handleExport}
              />
              
              <OrdersTable
                orders={filteredOrders}
                onViewOrder={handleViewOrder}
                onUpdateStatus={handleUpdateStatus}
                
              />
            </div>
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <OrderFilters
                filters={filters}
                onFiltersChange={setFilters}
                onExport={handleExport}
              />
            </div>
            <div className="p-4 space-y-3">
              {filteredOrders.map((order) => (
                <MobileOrderCard key={order.id} order={order} />
              ))}
              {filteredOrders.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t("No orders found")}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue & Performance Insights - Responsive */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 animate-in fade-in duration-700">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base md:text-lg mb-2">{t("Revenue Performance")}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t("Your revenue has increased by 18.7% this month! Average order value is up by 12%.")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("Avg. Order Value:")}</span>
                  <span className="ml-2 font-semibold text-green-600 dark:text-green-400">EGP 1,492</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("Best Selling Day:")}</span>
                  <span className="ml-2 font-semibold text-green-600 dark:text-green-400">{t("Friday")}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("Peak Hour:")}</span>
                  <span className="ml-2 font-semibold text-green-600 dark:text-green-400">8-10 PM</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-700">
        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium">{t("Export Report")}</h4>
                <p className="text-sm text-muted-foreground">{t("Download detailed analytics")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium">{t("Request Feedback")}</h4>
                <p className="text-sm text-muted-foreground">{t("Send review invitations")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium">{t("Loyalty Program")}</h4>
                <p className="text-sm text-muted-foreground">{t("Reward repeat customers")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}