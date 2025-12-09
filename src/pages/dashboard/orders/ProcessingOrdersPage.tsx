import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  Package, 
  Clock, 
  Truck, 
  Activity,
  CheckCircle,
  Timer,
  TrendingUp,
  Eye,
  MoreVertical,
  Phone,
  Mail
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { OrdersTable, type Order } from "@/components/orders/OrdersTable";
import { OrderFilters, type OrderFilters as OrderFiltersType } from "@/components/orders/OrderFilters";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

type PriorityType = 'all' | 'high' | 'medium' | 'low';

export default function ProcessingOrdersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<OrderFiltersType>({});
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>('all');

  // Sample processing orders - replace with API call
  const processingOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customer: {
        name: "أحمد محمد",
        email: "ahmed@example.com",
        phone: "+20 123 456 7890"
      },
      items: 3,
      total: 1250,
      status: "processing",
      paymentMethod: "card",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T14:30:00Z"
    },
    {
      id: "2",
      orderNumber: "ORD-2024-005",
      customer: {
        name: "عمر حسن",
        email: "omar@example.com",
        phone: "+20 123 456 7894"
      },
      items: 4,
      total: 1800,
      status: "shipped",
      paymentMethod: "bank",
      createdAt: "2024-01-14T08:45:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "3",
      orderNumber: "ORD-2024-007",
      customer: {
        name: "ليلى إبراهيم",
        email: "layla@example.com",
        phone: "+20 123 456 7895"
      },
      items: 2,
      total: 950,
      status: "processing",
      paymentMethod: "wallet",
      createdAt: "2024-01-15T11:00:00Z",
      updatedAt: "2024-01-15T11:30:00Z"
    },
    {
      id: "4",
      orderNumber: "ORD-2024-009",
      customer: {
        name: "كريم أحمد",
        email: "karim@example.com",
        phone: "+20 123 456 7896"
      },
      items: 5,
      total: 2400,
      status: "shipped",
      paymentMethod: "cash",
      createdAt: "2024-01-14T15:20:00Z",
      updatedAt: "2024-01-15T09:00:00Z"
    }
  ];

  // Processing statistics
  const processingStats = [
    {
      title: t("processingOrders.processingNow"),
      value: "18",
      change: -12.5,
      changeType: 'decrease' as const,
      icon: Clock,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBgColor: 'bg-amber-50 dark:bg-amber-950/30',
      trend: 'down' as const,
      period: t("processingOrders.vsYesterday")
    },
    {
      title: t("processingOrders.shippedOrders"),
      value: "24",
      change: 15.3,
      changeType: 'increase' as const,
      icon: Truck,
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBgColor: 'bg-purple-50 dark:bg-purple-950/30',
      trend: 'up' as const,
      period: t("processingOrders.vsYesterday")
    },
    {
      title: t("processingOrders.readyForPickup"),
      value: "9",
      change: 8.1,
      changeType: 'increase' as const,
      icon: Package,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBgColor: 'bg-blue-50 dark:bg-blue-950/30',
      trend: 'up' as const,
      period: t("processingOrders.vsLastWeek")
    },
    {
      title: t("processingOrders.averageProcessingTime"),
      value: "2.4h",
      change: -18.2,
      changeType: 'decrease' as const,
      icon: Timer,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBgColor: 'bg-green-50 dark:bg-green-950/30',
      trend: 'down' as const,
      period: t("processingOrders.improvement")
    }
  ];

  // Filter orders
  const filteredOrders = processingOrders.filter(order => {
    if (filters.status && order.status !== filters.status) {
      return false;
    }
    
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
    // Implement API call to update order status
  };

  const handleExport = () => {
    console.log('Export processing orders');
  };

  // Priority badges
  const priorityBadges: Array<{
    value: PriorityType;
    label: string;
    count: number;
    color?: string;
  }> = [
    { value: 'all', label: t("processingOrders.allPriorities"), count: processingOrders.length },
    { value: 'high', label: t("processingOrders.highPriority"), count: 5, color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
    { value: 'medium', label: t("processingOrders.mediumPriority"), count: 8, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
    { value: 'low', label: t("processingOrders.lowPriority"), count: 5, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' }
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
              {order.status}
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
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {order.customer.email}
              </span>
            </div>
          </div>

          {/* Order details */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-muted-foreground">{t("processingOrders.items")}</p>
              <p className="font-medium">{order.items}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("processingOrders.total")}</p>
              <p className="font-medium">{t("common.egp")} {order.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("processingOrders.payment")}</p>
              <p className="font-medium capitalize">{order.paymentMethod}</p>
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
              {t("processingOrders.viewDetails")}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {order.status === 'processing' && (
                  <DropdownMenuItem 
                    onClick={() => handleUpdateStatus(order.id, 'shipped')}
                    className="text-purple-600"
                  >
                    {t("processingOrders.markAsShipped")}
                  </DropdownMenuItem>
                )}
                {order.status === 'shipped' && (
                  <DropdownMenuItem 
                    onClick={() => handleUpdateStatus(order.id, 'delivered')}
                    className="text-green-600"
                  >
                    {t("processingOrders.markAsDelivered")}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                  className="text-red-600"
                >
                  {t("processingOrders.cancelOrder")}
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
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 p-4 md:p-8 text-white animate-in slide-in-from-top duration-500">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Activity className="h-6 w-6 md:h-8 md:w-8" />
              {t("processingOrders.title")}
            </h1>
            <p className="mt-2 text-sm md:text-base text-purple-100 max-w-2xl">
              {t("processingOrders.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs md:text-sm text-purple-100">{t("processingOrders.activeOrders")}</p>
              <p className="text-xl md:text-2xl font-bold">42</p>
            </div>
            <div className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-lg">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Processing Metrics - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {processingStats.map((stat, index) => (
          <div key={index} className="animate-in slide-in-from-bottom duration-500" style={{ animationDelay: `${index * 100}ms` }}>
            <MetricCard
              title={stat.title}
              value={stat.value}
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

      {/* Processing Progress Overview - Responsive */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 animate-in slide-in-from-left duration-500">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold">{t("processingOrders.processingPipeline")}</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t("processingOrders.orderVerification")}</span>
                <span className="text-sm text-muted-foreground">6</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t("processingOrders.packing")}</span>
                <span className="text-sm text-muted-foreground">8</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t("processingOrders.qualityCheck")}</span>
                <span className="text-sm text-muted-foreground">4</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t("processingOrders.readyToShip")}</span>
                <span className="text-sm text-muted-foreground">24</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Filters - Grid layout for mobile */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 animate-in slide-in-from-right duration-500 ">
        {priorityBadges.map((priority) => (
          <Button
            key={priority.value}
            variant={selectedPriority === priority.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPriority(priority.value)}
            className={cn(
              "gap-2 transition-all duration-200 hover:scale-105 justify-center border-gray-200 dark:border-gray-700",
              selectedPriority === priority.value && priority.color
            )}
          >
            <span className="truncate">{priority.label}</span>
            <Badge variant="secondary" className="ml-1 h-5 px-1">
              {priority.count}
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
                  <p className="text-muted-foreground">{t("processingOrders.noOrdersFound")}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights - Responsive */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 animate-in fade-in duration-700">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base md:text-lg mb-2">{t("processingOrders.processingPerformance")}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t("processingOrders.keepUpTheExcellentWork")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("processingOrders.ordersPerHour")}</span>
                  <span className="ml-2 font-semibold text-green-600 dark:text-green-400">8.5</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("processingOrders.accuracyRate")}</span>
                  <span className="ml-2 font-semibold text-green-600 dark:text-green-400">99.2%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("processingOrders.customerSatisfaction")}</span>
                  <span className="ml-2 font-semibold text-green-600 dark:text-green-400">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}