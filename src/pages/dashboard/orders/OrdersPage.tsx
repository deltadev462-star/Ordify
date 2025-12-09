import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Package, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { OrdersTable, type Order } from "@/components/orders/OrdersTable";
import { OrderFilters, type OrderFilters as OrderFiltersType } from "@/components/orders/OrderFilters";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filters, setFilters] = useState<OrderFiltersType>({});
  const [activeTab, setActiveTab] = useState("all");

  // Sample order data - replace with API call
  const sampleOrders: Order[] = [
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
      status: "pending",
      paymentMethod: "cash",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customer: {
        name: "فاطمة علي",
        email: "fatima@example.com",
        phone: "+20 123 456 7891"
      },
      items: 2,
      total: 850,
      status: "processing",
      paymentMethod: "card",
      createdAt: "2024-01-15T09:15:00Z",
      updatedAt: "2024-01-15T11:00:00Z"
    },
    {
      id: "3",
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
      id: "4",
      orderNumber: "ORD-2024-004",
      customer: {
        name: "سارة أحمد",
        email: "sara@example.com",
        phone: "+20 123 456 7893"
      },
      items: 1,
      total: 450,
      status: "cancelled",
      paymentMethod: "cash",
      createdAt: "2024-01-14T11:30:00Z",
      updatedAt: "2024-01-14T12:00:00Z"
    },
    {
      id: "5",
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
    }
  ];

  // Order statistics
  const orderStats = [
    {
      title: t('orders.totalOrders'),
      value: "342",
      change: 8.2,
      changeType: 'increase' as const,
      icon: Package,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBgColor: 'bg-blue-50 dark:bg-blue-950/30',
      trend: 'up' as const,
      period: t('common.vsLastMonth')
    },
    {
      title: t('orders.pendingOrders'),
      value: "23",
      change: -5.1,
      changeType: 'decrease' as const,
      icon: Clock,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      iconBgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      trend: 'down' as const,
      period: t('common.vsLastWeek')
    },
    {
      title: t('orders.completedOrders'),
      value: "285",
      change: 12.3,
      changeType: 'increase' as const,
      icon: CheckCircle,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBgColor: 'bg-green-50 dark:bg-green-950/30',
      trend: 'up' as const,
      period: t('common.vsLastMonth')
    },
    {
      title: t('orders.cancelledOrders'),
      value: "12",
      change: 2.5,
      changeType: 'increase' as const,
      icon: XCircle,
      iconColor: 'text-red-600 dark:text-red-400',
      iconBgColor: 'bg-red-50 dark:bg-red-950/30',
      trend: 'up' as const,
      period: t('common.vsLastMonth')
    }
  ];

  // Filter orders based on active tab and filters
  const filteredOrders = sampleOrders.filter(order => {
    // Tab filter
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    
    // Status filter
    if (filters.status && order.status !== filters.status) {
      return false;
    }
    
    // Payment method filter
    if (filters.paymentMethod && order.paymentMethod !== filters.paymentMethod) {
      return false;
    }
    
    // Amount filter
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
    console.log('Export orders');
    // Implement export functionality
  };

  const handleCreateOrder = () => {
    navigate('/dashboard/orders/new');
  };

  const tabCounts = {
    all: sampleOrders.length,
    pending: sampleOrders.filter(o => o.status === 'pending').length,
    processing: sampleOrders.filter(o => o.status === 'processing').length,
    shipped: sampleOrders.filter(o => o.status === 'shipped').length,
    delivered: sampleOrders.filter(o => o.status === 'delivered').length,
    cancelled: sampleOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">{t('orders.title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('orders.subtitle')}
        </p>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStats.map((stat, index) => (
          <MetricCard
            key={index}
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
        ))}
      </div>

      {/* Orders Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
              <TabsTrigger value="all" className="gap-2">
                {t('orders.statusAll')}
                <Badge variant="secondary" className="ml-1 h-5 px-1">
                  {tabCounts.all}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending" className="gap-2">
                {t('orders.statusPending')}
                <Badge variant="secondary" className="ml-1 h-5 px-1 bg-yellow-100 text-yellow-800">
                  {tabCounts.pending}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="processing" className="gap-2">
                {t('orders.statusProcessing')}
                <Badge variant="secondary" className="ml-1 h-5 px-1 bg-blue-100 text-blue-800">
                  {tabCounts.processing}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="shipped" className="gap-2">
                {t('orders.statusShipped')}
                <Badge variant="secondary" className="ml-1 h-5 px-1 bg-purple-100 text-purple-800">
                  {tabCounts.shipped}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="delivered" className="gap-2">
                {t('orders.statusDelivered')}
                <Badge variant="secondary" className="ml-1 h-5 px-1 bg-green-100 text-green-800">
                  {tabCounts.delivered}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="gap-2">
                {t('orders.statusCancelled')}
                <Badge variant="secondary" className="ml-1 h-5 px-1 bg-gray-100 text-gray-800">
                  {tabCounts.cancelled}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <OrderFilters
              filters={filters}
              onFiltersChange={setFilters}
              onExport={handleExport}
              onCreateOrder={handleCreateOrder}
            />
            
            <OrdersTable
              orders={filteredOrders}
              onViewOrder={handleViewOrder}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{t('common.proTip')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('orders.tipKeyboardShortcuts')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
