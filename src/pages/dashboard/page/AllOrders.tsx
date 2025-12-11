import { useState } from "react";
import { useTranslation } from "react-i18next";
import Title from "@/components/Title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Printer,
  Copy,
  Edit,
  MapPin,
  CreditCard,
  User,
  ShoppingBag,
  TrendingUp,
  Receipt,
  DollarSign,
  BarChart3,
  PackageX,
} from "lucide-react";

interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  products: { 
    id: string;
    name: string; 
    quantity: number; 
    price: number;
    image?: string;
  }[];
  totalAmount: number;
  shippingCost: number;
  tax: number;
  discount: number;
  paymentMethod: "cash" | "card" | "wallet" | "transfer";
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  orderDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  trackingNumber?: string;
  notes?: string;
  source: "website" | "app" | "phone" | "social";
  priority: "normal" | "high" | "urgent";
}

function AllOrders() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [dateRange, setDateRange] = useState("week");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [viewTab, setViewTab] = useState("all");
  const itemsPerPage = 10;

  // Sample data - in real app, this would come from API
  const [orders] = useState<OrderData[]>([
    {
      id: "ORD001",
      orderNumber: "#2024001",
      customerName: "Ahmed Mohamed Ali",
      customerPhone: "+201234567890",
      customerEmail: "ahmed@example.com",
      customerAddress: "15 El Nasr St, Nasr City, Cairo",
      products: [
        { id: "P1", name: "Smart Watch Pro Max", quantity: 1, price: 2500 },
        { id: "P2", name: "Bluetooth Headphone", quantity: 2, price: 450 },
      ],
      totalAmount: 3450,
      shippingCost: 50,
      tax: 345,
      discount: 100,
      paymentMethod: "card",
      paymentStatus: "paid",
      orderStatus: "delivered",
      orderDate: "2024-01-10 10:30",
      estimatedDelivery: "2024-01-12",
      actualDelivery: "2024-01-11",
      trackingNumber: "TRK123456789",
      source: "website",
      priority: "normal",
    },
    {
      id: "ORD002",
      orderNumber: "#2024002",
      customerName: "Fatma El Sayed",
      customerPhone: "+201098765432",
      customerEmail: "fatma@example.com",
      customerAddress: "22 University St, Dokki, Giza",
      products: [
        { id: "P3", name: "Gaming Elite Laptop", quantity: 1, price: 25000 },
        { id: "P4", name: "Wireless Mouse", quantity: 1, price: 350 },
      ],
      totalAmount: 25550,
      shippingCost: 100,
      tax: 2535,
      discount: 500,
      paymentMethod: "cash",
      paymentStatus: "pending",
      orderStatus: "shipped",
      orderDate: "2024-01-11 14:45",
      estimatedDelivery: "2024-01-14",
      trackingNumber: "TRK987654321",
      source: "app",
      priority: "high",
      notes: "VIP Customer - Handle with care",
    },
    {
      id: "ORD003",
      orderNumber: "#2024003",
      customerName: "Mohamed Ibrahim",
      customerPhone: "+201122334455",
      customerEmail: "mohammed@example.com",
      customerAddress: "8 King Faisal St, Haram",
      products: [
        { id: "P5", name: "Ultra Smart Phone", quantity: 1, price: 15000 },
      ],
      totalAmount: 15050,
      shippingCost: 50,
      tax: 1500,
      discount: 0,
      paymentMethod: "wallet",
      paymentStatus: "paid",
      orderStatus: "processing",
      orderDate: "2024-01-12 09:15",
      estimatedDelivery: "2024-01-15",
      source: "social",
      priority: "urgent",
      notes: "Urgent order - Customer needs it for travel",
    },
    {
      id: "ORD004",
      orderNumber: "#2024004",
      customerName: "Sara Ahmed",
      customerPhone: "+201555666777",
      customerEmail: "sara@example.com",
      customerAddress: "30 Tahrir St, Downtown",
      products: [
        { id: "P6", name: "Professional Camera", quantity: 1, price: 18000 },
        { id: "P7", name: "Camera Lens", quantity: 2, price: 5000 },
      ],
      totalAmount: 28200,
      shippingCost: 150,
      tax: 2800,
      discount: 300,
      paymentMethod: "transfer",
      paymentStatus: "paid",
      orderStatus: "pending",
      orderDate: "2024-01-12 16:00",
      estimatedDelivery: "2024-01-16",
      source: "website",
      priority: "normal",
    },
    {
      id: "ORD005",
      orderNumber: "#2024005",
      customerName: "Omar Hassan",
      customerPhone: "+201999888777",
      customerEmail: "omar@example.com",
      customerAddress: "45 Maadi St, Maadi",
      products: [
        { id: "P8", name: "4K Screen", quantity: 1, price: 8000 },
      ],
      totalAmount: 8050,
      shippingCost: 50,
      tax: 800,
      discount: 200,
      paymentMethod: "card",
      paymentStatus: "failed",
      orderStatus: "cancelled",
      orderDate: "2024-01-09 11:30",
      estimatedDelivery: "2024-01-13",
      source: "phone",
      priority: "normal",
      notes: "Payment card declined",
    },
    {
      id: "ORD006",
      orderNumber: "#2024006",
      customerName: "Nour El Din",
      customerPhone: "+201777666555",
      customerEmail: "nour@example.com",
      customerAddress: "12 Revolution St, Alexandria",
      products: [
        { id: "P9", name: "Pro Tablet", quantity: 2, price: 6000 },
      ],
      totalAmount: 12100,
      shippingCost: 100,
      tax: 1200,
      discount: 150,
      paymentMethod: "cash",
      paymentStatus: "pending",
      orderStatus: "returned",
      orderDate: "2024-01-08 13:20",
      estimatedDelivery: "2024-01-12",
      actualDelivery: "2024-01-11",
      source: "app",
      priority: "normal",
      notes: "Product does not match specifications",
    },
  ]);

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === "pending").length,
    processing: orders.filter(o => o.orderStatus === "processing").length,
    shipped: orders.filter(o => o.orderStatus === "shipped").length,
    delivered: orders.filter(o => o.orderStatus === "delivered").length,
    cancelled: orders.filter(o => o.orderStatus === "cancelled").length,
    returned: orders.filter(o => o.orderStatus === "returned").length,
    totalRevenue: orders
      .filter(o => o.paymentStatus === "paid")
      .reduce((sum, order) => sum + order.totalAmount, 0),
    pendingPayments: orders
      .filter(o => o.paymentStatus === "pending")
      .reduce((sum, order) => sum + order.totalAmount, 0),
    todayOrders: orders.filter(o => {
      const orderDate = new Date(o.orderDate);
      const today = new Date();
      return orderDate.toDateString() === today.toDateString();
    }).length,
    avgOrderValue: orders.length > 0 
      ? Math.round(orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length)
      : 0,
  };

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm) ||
      order.orderNumber.includes(searchTerm) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;
    const matchesSource = sourceFilter === "all" || order.source === sourceFilter;
    const matchesTab = viewTab === "all" || 
      (viewTab === "urgent" && order.priority === "urgent") ||
      (viewTab === "high-priority" && order.priority === "high") ||
      (viewTab === "today" && new Date(order.orderDate).toDateString() === new Date().toDateString());
    
    return matchesSearch && matchesStatus && matchesPayment && matchesSource && matchesTab;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: t("orders.status.pending"),
        color: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
        icon: <Clock className="h-3 w-3" />
      },
      processing: {
        label: t("orders.status.processing"),
        color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
        icon: <Package className="h-3 w-3" />
      },
      shipped: {
        label: t("orders.status.shipped"),
        color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
        icon: <Truck className="h-3 w-3" />
      },
      delivered: {
        label: t("orders.status.delivered"),
        color: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
        icon: <CheckCircle2 className="h-3 w-3" />
      },
      cancelled: {
        label: t("orders.status.cancelled"),
        color: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
        icon: <XCircle className="h-3 w-3" />
      },
      returned: {
        label: t("orders.status.returned"),
        color: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20",
        icon: <PackageX className="h-3 w-3" />
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} font-medium border-0 gap-1`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getPaymentBadge = (status: string, method: string) => {
    const statusConfig = {
      paid: { label: t("orders.payment.paid"), color: "bg-green-500/10 text-green-600" },
      pending: { label: t("orders.payment.pending"), color: "bg-yellow-500/10 text-yellow-600" },
      failed: { label: t("orders.payment.failed"), color: "bg-red-500/10 text-red-600" },
      refunded: { label: t("orders.payment.refunded"), color: "bg-gray-500/10 text-gray-600" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <div className="flex flex-col gap-1">
        <Badge className={`${config.color} font-medium border-0 text-xs`}>
          {config.label}
        </Badge>
        <span className="text-xs text-muted-foreground">{method}</span>
      </div>
    );
  };

  const getSourceBadge = (source: string) => {
    const sourceConfig = {
      website: { label: t("orders.source.website"), color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50" },
      app: { label: t("orders.source.app"), color: "text-purple-600 bg-purple-50 dark:bg-purple-950/50" },
      phone: { label: t("orders.source.phone"), color: "text-green-600 bg-green-50 dark:bg-green-950/50" },
      social: { label: t("orders.source.social"), color: "text-pink-600 bg-pink-50 dark:bg-pink-950/50" },
    };
    const config = sourceConfig[source as keyof typeof sourceConfig] || { 
      label: source, 
      color: "text-gray-600 bg-gray-50" 
    };
    return (
      <Badge variant="secondary" className={`${config.color} border-0 font-medium text-xs`}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityIndicator = (priority: string) => {
    if (priority === "urgent") {
      return <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />;
    }
    if (priority === "high") {
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
    return null;
  };

  return (
  
      <div className="flex rounded-2xl m-0 flex-1 flex-col gap-6 p-4 ">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <Title
            title={t("navigation.allOrders")}
            Subtitle={t("orders.allOrders.subtitle")}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-gray-200 dark:border-gray-800"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4" />
              {t("common.refresh")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-gray-200 dark:border-gray-800"
            >
              <Download className="h-4 w-4" />
              {t("common.export")}
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Package className="h-4 w-4" />
              {t("orders.newOrder")}
            </Button>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">
                    {"Total  Orders"}
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {stats.total}
                  </p>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
                    +12% {"From Last Month"}
                  </p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
                    {t("orders.status.pending")}
                  </p>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                    {stats.pending}
                  </p>
                  <p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">
                    {t("orders.stats.needsProcessing")}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 dark:text-purple-400 font-medium">
                    {t("orders.status.shipped")}
                  </p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {stats.shipped}
                  </p>
                  <p className="text-xs text-purple-600/70 dark:text-purple-400/70">
                    {t("orders.stats.onTheWay")}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                    {t("orders.status.delivered")}
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {stats.delivered}
                  </p>
                  <p className="text-xs text-green-600/70 dark:text-green-400/70">
                    {t("orders.stats.completedSuccessfully")}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                    {t("orders.stats.revenue")}
                  </p>
                  <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                    {stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +8.2%
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400 font-medium">
                    {t("orders.stats.avgOrder")}
                  </p>
                  <p className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                    {stats.avgOrderValue.toLocaleString()}
                  </p>
                  <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    {t("currency.egp")}
                  </p>
                </div>
                <Receipt className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search Bar */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4">
              {/* Tabs */}
              <Tabs value={viewTab} onValueChange={setViewTab} className="w-full">
                <TabsList className="grid grid-cols-4 w-full lg:w-fit bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="all" className="gap-2">
                    <Package className="h-4 w-4" />
                    {t("navigation.allOrders")}
                  </TabsTrigger>
                  <TabsTrigger value="urgent" className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {t("orders.tabs.urgent")}
                  </TabsTrigger>
                  <TabsTrigger value="high-priority" className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    {t("orders.tabs.highPriority")}
                  </TabsTrigger>
                  <TabsTrigger value="today" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    {t("orders.tabs.today")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={t("orders.searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                  />
                </div>

                <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full lg:w-[160px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      <SelectValue placeholder={t("orders.filters.orderStatus")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="all">{t("orders.filters.allStatus")}</SelectItem>
                      <SelectItem value="pending">{t("orders.status.pending")}</SelectItem>
                      <SelectItem value="processing">{t("orders.status.processing")}</SelectItem>
                      <SelectItem value="shipped">{t("orders.status.shipped")}</SelectItem>
                      <SelectItem value="delivered">{t("orders.status.delivered")}</SelectItem>
                      <SelectItem value="cancelled">{t("orders.status.cancelled")}</SelectItem>
                      <SelectItem value="returned">{t("orders.status.returned")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                    <SelectTrigger className="w-full lg:w-[160px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      <SelectValue placeholder={t("orders.filters.paymentStatus")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="all">{t("orders.filters.allPayments")}</SelectItem>
                      <SelectItem value="paid">{t("orders.payment.paid")}</SelectItem>
                      <SelectItem value="pending">{t("orders.payment.pending")}</SelectItem>
                      <SelectItem value="failed">{t("orders.payment.failed")}</SelectItem>
                      <SelectItem value="refunded">{t("orders.payment.refunded")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger className="w-full lg:w-[140px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      <SelectValue placeholder={t("orders.filters.source")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="all">{t("orders.filters.allSources")}</SelectItem>
                      <SelectItem value="website">{t("orders.source.website")}</SelectItem>
                      <SelectItem value="app">{t("orders.source.app")}</SelectItem>
                      <SelectItem value="phone">{t("orders.source.phone")}</SelectItem>
                      <SelectItem value="social">{t("orders.source.social")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-full lg:w-[140px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder={t("orders.filters.dateRange")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="today">{t("orders.dateRange.today")}</SelectItem>
                      <SelectItem value="week">{t("orders.dateRange.thisWeek")}</SelectItem>
                      <SelectItem value="month">{t("orders.dateRange.thisMonth")}</SelectItem>
                      <SelectItem value="quarter">{t("orders.dateRange.thisQuarter")}</SelectItem>
                      <SelectItem value="year">{t("orders.dateRange.thisYear")}</SelectItem>
                      <SelectItem value="all">{t("orders.dateRange.allTime")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="ghost" size="icon" className="shrink-0 hover:bg-transparent dark:hover:bg-transparent">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                  <TableRow>
                    <TableHead className="text-right font-semibold w-[100px]">
                      {t("orders.table.order")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("orders.table.customer")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("orders.table.products")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("orders.table.total")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("orders.table.payment")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("orders.table.status")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("orders.table.date")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("orders.table.source")}
                    </TableHead>
                    <TableHead className="text-right font-semibold w-[80px]">
                      {t("orders.table.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getPriorityIndicator(order.priority)}
                            <div>
                              <p className="font-semibold text-sm">{order.orderNumber}</p>
                              <p className="text-xs text-muted-foreground">{order.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-sm">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {order.customerPhone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.products.slice(0, 2).map((product) => (
                              <p key={product.id} className="text-xs">
                                {product.name} x{product.quantity}
                              </p>
                            ))}
                            {order.products.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{order.products.length - 2} {t("common.more")}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-right">
                            <p className="font-bold text-green-600 dark:text-green-400">
                              {order.totalAmount.toLocaleString()} 
                            </p>
                            <p className="text-xs text-muted-foreground">{t("currency.egp")}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getPaymentBadge(order.paymentStatus, order.paymentMethod)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(order.orderStatus)}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-xs font-medium">{order.orderDate}</p>
                            <p className="text-xs text-muted-foreground">
                              {t("orders.delivery")}: {order.estimatedDelivery}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getSourceBadge(order.source)}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                              <DropdownMenuLabel>{t("orders.actions.quickActions")}</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Eye className="h-4 w-4" />
                                {t("orders.actions.viewDetails")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Edit className="h-4 w-4" />
                                {t("orders.actions.editOrder")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Printer className="h-4 w-4" />
                                {t("orders.actions.printInvoice")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Copy className="h-4 w-4" />
                                {t("orders.actions.duplicate")}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {order.trackingNumber && (
                                <DropdownMenuItem className="gap-2 cursor-pointer text-blue-600">
                                  <MapPin className="h-4 w-4" />
                                  {t("orders.actions.trackShipment")}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                                <XCircle className="h-4 w-4" />
                                {t("orders.actions.cancelOrder")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <Package className="h-12 w-12 text-gray-300" />
                          <p className="text-muted-foreground font-medium">
                            {t("orders.noOrdersFound")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t("orders.tryAdjustingFilters")}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <Card
                    key={order.id}
                    className="overflow-hidden border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="p-4 space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {getPriorityIndicator(order.priority)}
                          <div>
                            <p className="font-bold text-sm">{order.orderNumber}</p>
                            <p className="text-xs text-muted-foreground">{order.id}</p>
                          </div>
                        </div>
                        {getStatusBadge(order.orderStatus)}
                      </div>

                      {/* Customer Info */}
                      <div className="space-y-2 border-t pt-3">
                        <p className="font-medium">{order.customerName}</p>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {order.customerPhone}
                          </p>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="space-y-1 border-t pt-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">
                          {t("orders.table.products")}
                        </p>
                        {order.products.slice(0, 2).map((product) => (
                          <p key={product.id} className="text-sm">
                            {product.name} x{product.quantity}
                          </p>
                        ))}
                        {order.products.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{order.products.length - 2} {t("common.more")}
                          </Badge>
                        )}
                      </div>

                      {/* Order Info */}
                      <div className="flex flex-wrap justify-between items-center gap-3 border-t pt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">{t("orders.table.total")}</p>
                          <p className="font-bold text-green-600 dark:text-green-400">
                            {order.totalAmount.toLocaleString()} {t("currency.egp")}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t("orders.table.payment")}</p>
                          {getPaymentBadge(order.paymentStatus, order.paymentMethod)}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t("orders.table.source")}</p>
                          {getSourceBadge(order.source)}
                        </div>
                      </div>

                      {/* Date Info */}
                      <div className="text-xs text-muted-foreground border-t pt-3">
                        <p>{t("orders.orderDate")}: {order.orderDate}</p>
                        <p>{t("orders.estimatedDelivery")}: {order.estimatedDelivery}</p>
                        {order.trackingNumber && (
                          <p className="mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {t("orders.tracking")}: {order.trackingNumber}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div
                        className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="sm" variant="outline" className="flex-1 gap-1 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                          <Eye className="h-4 w-4" />
                          {t("common.view")}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 gap-1 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                          <Edit className="h-4 w-4" />
                          {t("common.edit")}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Printer className="h-4 w-4" />
                              {t("orders.actions.printInvoice")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Copy className="h-4 w-4" />
                              {t("orders.actions.duplicate")}
                            </DropdownMenuItem>
                            {order.trackingNumber && (
                              <DropdownMenuItem className="gap-2 cursor-pointer text-blue-600">
                                <MapPin className="h-4 w-4" />
                                {t("orders.actions.trackShipment")}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                              <XCircle className="h-4 w-4" />
                              {t("orders.actions.cancelOrder")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-muted-foreground font-medium">
                    {t("orders.noOrdersFound")}
                  </p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    {t("orders.tryAdjustingFilters")}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50/50 dark:bg-gray-900/50">
                <p className="text-sm text-muted-foreground">
                  {t("pagination.showing")} {(currentPage - 1) * itemsPerPage + 1} {t("pagination.to")}{" "}
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)} {t("pagination.of")}{" "}
                  {filteredOrders.length} {t("pagination.results")}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{t("orders.orderDetails")} - {selectedOrder.orderNumber}</span>
                  {getStatusBadge(selectedOrder.orderStatus)}
                </DialogTitle>
                <DialogDescription>
                  {t("orders.completeOrderInfo")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Customer Information */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    {t("orders.customerInformation")}
                  </h3>
                  <Card className="p-4 border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t("orders.customer.name")}</p>
                          <p className="font-medium">{selectedOrder.customerName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t("orders.customer.phone")}</p>
                          <p className="font-medium">{selectedOrder.customerPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t("orders.customer.address")}</p>
                          <p className="font-medium">{selectedOrder.customerAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t("orders.customer.email")}</p>
                          <p className="font-medium">{selectedOrder.customerEmail}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Order Items */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    {t("orders.orderItems")}
                  </h3>
                  <Card className="p-4 border-gray-200 dark:border-gray-700">
                    <div className="space-y-3">
                      {selectedOrder.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex justify-between items-center py-2 border-b last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {product.quantity} x {product.price.toLocaleString()} {t("currency.egp")}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold">
                            {(product.quantity * product.price).toLocaleString()} {t("currency.egp")}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t("orders.summary.subtotal")}</span>
                        <span>
                          {(
                            selectedOrder.totalAmount -
                            selectedOrder.shippingCost -
                            selectedOrder.tax +
                            selectedOrder.discount
                          ).toLocaleString()}{" "}
                          {t("currency.egp")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{t("orders.summary.shipping")}</span>
                        <span>{selectedOrder.shippingCost.toLocaleString()} {t("currency.egp")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{t("orders.summary.tax")}</span>
                        <span>{selectedOrder.tax.toLocaleString()} {t("currency.egp")}</span>
                      </div>
                      {selectedOrder.discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>{t("orders.summary.discount")}</span>
                          <span>-{selectedOrder.discount.toLocaleString()} {t("currency.egp")}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>{t("orders.summary.total")}</span>
                        <span className="text-green-600">
                          {selectedOrder.totalAmount.toLocaleString()} {t("currency.egp")}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Order Timeline */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    {t("orders.orderTimeline")}
                  </h3>
                  <Card className="p-4 border-gray-200 dark:border-gray-700">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="font-medium text-sm">{t("orders.timeline.orderPlaced")}</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedOrder.orderDate}
                          </p>
                        </div>
                      </div>
                      {selectedOrder.orderStatus !== "pending" && (
                        <div className="flex items-center gap-3">
                          <Package className="h-4 w-4 text-purple-500" />
                          <div>
                            <p className="font-medium text-sm">{t("orders.timeline.processingStarted")}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedOrder.orderDate}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedOrder.trackingNumber && (
                        <div className="flex items-center gap-3">
                          <Truck className="h-4 w-4 text-indigo-500" />
                          <div>
                            <p className="font-medium text-sm">{t("orders.status.shipped")}</p>
                            <p className="text-xs text-muted-foreground">
                              {t("orders.tracking")}: {selectedOrder.trackingNumber}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedOrder.actualDelivery && (
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">{t("orders.status.delivered")}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedOrder.actualDelivery}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4">
                  <Button className="gap-2">
                    <Printer className="h-4 w-4" />
                    {t("orders.actions.printInvoice")}
                  </Button>
                  <Button variant="outline" className="gap-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                    <Edit className="h-4 w-4" />
                    {t("orders.actions.editOrder")}
                  </Button>
                  {selectedOrder.trackingNumber && (
                    <Button variant="outline" className="gap-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      <MapPin className="h-4 w-4" />
                      {t("orders.actions.trackShipment")}
                    </Button>
                  )}
                  <Button variant="outline" className="gap-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4" />
                    {t("orders.actions.cancelOrder")}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
   
  );
}

export default AllOrders;