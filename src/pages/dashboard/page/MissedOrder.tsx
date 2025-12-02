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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Phone,
  Mail,
  MessageSquare,
  ShoppingCart,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Eye,
} from "lucide-react";

interface MissedOrderData {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  products: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  abandonedAt: string;
  cartValue: number;
  lastActivity: string;
  source: string;
  status: "pending" | "contacted" | "recovered" | "lost";
  recoveryAttempts: number;
  notes?: string;
}

function MissedOrder() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("week");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data - in real app, this would come from API
  const [missedOrders] = useState<MissedOrderData[]>([
    {
      id: "MO001",
      customerName: "أحمد محمد",
      customerPhone: "+201234567890",
      customerEmail: "ahmed@example.com",
      products: [
        { name: "منتج 1", quantity: 2, price: 250 },
        { name: "منتج 2", quantity: 1, price: 150 },
      ],
      totalAmount: 650,
      abandonedAt: "2024-01-10 14:30",
      cartValue: 650,
      lastActivity: "منذ ساعتين",
      source: "Facebook",
      status: "pending",
      recoveryAttempts: 0,
    },
    {
      id: "MO002",
      customerName: "سارة أحمد",
      customerPhone: "+201098765432",
      customerEmail: "sara@example.com",
      products: [
        { name: "منتج 3", quantity: 3, price: 300 },
      ],
      totalAmount: 900,
      abandonedAt: "2024-01-10 12:15",
      cartValue: 900,
      lastActivity: "منذ 4 ساعات",
      source: "Instagram",
      status: "contacted",
      recoveryAttempts: 1,
      notes: "العميل مهتم، سيقوم بالشراء غداً",
    },
    {
      id: "MO003",
      customerName: "محمد علي",
      customerPhone: "+201122334455",
      customerEmail: "mohammed@example.com",
      products: [
        { name: "منتج 4", quantity: 1, price: 500 },
        { name: "منتج 5", quantity: 2, price: 200 },
      ],
      totalAmount: 900,
      abandonedAt: "2024-01-09 18:45",
      cartValue: 900,
      lastActivity: "منذ يوم",
      source: "Google",
      status: "recovered",
      recoveryAttempts: 2,
    },
  ]);

  // Statistics
  const stats = {
    total: missedOrders.length,
    pending: missedOrders.filter(o => o.status === "pending").length,
    contacted: missedOrders.filter(o => o.status === "contacted").length,
    recovered: missedOrders.filter(o => o.status === "recovered").length,
    lost: missedOrders.filter(o => o.status === "lost").length,
    totalValue: missedOrders.reduce((sum, order) => sum + order.cartValue, 0),
    recoveryRate: Math.round((missedOrders.filter(o => o.status === "recovered").length / missedOrders.length) * 100) || 0,
  };

  // Filter orders based on search and status
  const filteredOrders = missedOrders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm) ||
      order.id.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "في الانتظار", color: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20" },
      contacted: { label: "تم التواصل", color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" },
      recovered: { label: "تم الاسترداد", color: "bg-green-500/10 text-green-600 hover:bg-green-500/20" },
      lost: { label: "مفقود", color: "bg-red-500/10 text-red-600 hover:bg-red-500/20" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} font-medium border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getSourceIcon = (source: string) => {
    const sourceConfig = {
      Facebook: "text-blue-600",
      Instagram: "text-pink-600",
      Google: "text-green-600",
      Direct: "text-gray-600",
    };
    return sourceConfig[source as keyof typeof sourceConfig] || "text-gray-600";
  };

  return (
    <div dir="rtl">
      <div className="flex  rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Title
            title={t("Missed Orders")}
            Subtitle={t(
              "Track and recover abandoned carts from customers who didn't complete their purchase"
            )}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-gray-200 dark:border-gray-800"
            >
              <RefreshCw className="h-4 w-4" />
              {t("Refresh")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-gray-200 dark:border-gray-800"
            >
              <Download className="h-4 w-4" />
              {t("Export")}
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              <MessageSquare className="h-4 w-4" />
              {t("Bulk Message")}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("Total Orders")}
                  </p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    {t("Pending")}
                  </p>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                    {stats.pending}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("Contacted")}
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {stats.contacted}
                  </p>
                </div>
                <Phone className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("Recovered")}
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {stats.recovered}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("Total Value")}
                  </p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {stats.totalValue.toLocaleString()} {t("EGP")}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400">
                    {t("Recovery Rate")}
                  </p>
                  <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                    {stats.recoveryRate}%
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-lg">
          <CardHeader className=" rounded-t-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={t("Search by name, phone, or ID...")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-800">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t("Filter by status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Status")}</SelectItem>
                    <SelectItem value="pending">{t("Pending")}</SelectItem>
                    <SelectItem value="contacted">{t("Contacted")}</SelectItem>
                    <SelectItem value="recovered">{t("Recovered")}</SelectItem>
                    <SelectItem value="lost">{t("Lost")}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-800">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t("Date range")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">{t("Today")}</SelectItem>
                    <SelectItem value="week">{t("This Week")}</SelectItem>
                    <SelectItem value="month">{t("This Month")}</SelectItem>
                    <SelectItem value="year">{t("This Year")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="all" className="w-full lg:w-auto">
                <TabsList className="grid grid-cols-4 w-full lg:w-auto bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="all">{t("All")}</TabsTrigger>
                  <TabsTrigger value="urgent">{t("Urgent")}</TabsTrigger>
                  <TabsTrigger value="recent">{t("Recent")}</TabsTrigger>
                  <TabsTrigger value="high-value">
                    {t("High Value")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Desktop Table View */}
            <div className=" block overflow-x-auto  ">
              <div className=" hidden md:block">
                <Table  >
                  <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                    <TableRow>
                      <TableHead className="text-right font-semibold">
                        {t("Order ID")}
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        {t("Customer")}
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        {t("Products")}
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        {t("Cart Value")}
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        {t("Abandoned Time")}
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        {t("Source")}
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        {t("Status")}
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        {t("Recovery")}
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        {t("Actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.length > 0 ? (
                      paginatedOrders.map((order) => (
                        <TableRow
                          key={order.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">
                                {order.id}
                              </span>
                              {order.notes && (
                                <div className="group relative">
                                  <FileText className="h-4 w-4 text-gray-400 cursor-help" />
                                  <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 bottom-full mb-2 whitespace-nowrap">
                                    {order.notes}
                                  </div>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-sm">
                                {order.customerName}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {order.customerPhone}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {order.customerEmail}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {order.products
                                .slice(0, 2)
                                .map((product, idx) => (
                                  <p key={idx} className="text-xs">
                                    {product.name} x{product.quantity}
                                  </p>
                                ))}
                              {order.products.length > 2 && (
                                <p className="text-xs text-muted-foreground">
                                  +{order.products.length - 2} {t("more")}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              {order.cartValue.toLocaleString()} {t("EGP")}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-xs">{order.abandonedAt}</p>
                              <p className="text-xs text-muted-foreground">
                                {order.lastActivity}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium text-sm ${getSourceIcon(
                                order.source
                              )}`}
                            >
                              {order.source}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="text-sm">
                                {order.recoveryAttempts}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {t("attempts")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-[200px]"
                              >
                                <DropdownMenuLabel>
                                  {t("Quick Actions")}
                                </DropdownMenuLabel>
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                  <Eye className="h-4 w-4" />
                                  {t("View Details")}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer text-green-600">
                                  <Phone className="h-4 w-4" />
                                  {t("Call Customer")}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer text-blue-600">
                                  <MessageSquare className="h-4 w-4" />
                                  {t("Send WhatsApp")}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer text-purple-600">
                                  <Mail className="h-4 w-4" />
                                  {t("Send Email")}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer text-orange-600">
                                  <ShoppingCart className="h-4 w-4" />
                                  {t("Create Order")}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                                  <XCircle className="h-4 w-4" />
                                  {t("Mark as Lost")}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <ShoppingCart className="h-12 w-12 text-gray-300" />
                            <p className="text-muted-foreground">
                              {t("No missed orders found")}
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
                      className="overflow-hidden border-gray-200 dark:border-gray-800"
                    >
                      <div className="p-4 space-y-4">
                        {/* Header with Order ID and Status */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">
                              {order.id}
                            </span>
                            {order.notes && (
                              <FileText className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        {/* Customer Info */}
                        <div className="space-y-2">
                          <p className="font-medium">{order.customerName}</p>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {order.customerPhone}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {order.customerEmail}
                            </p>
                          </div>
                        </div>

                        {/* Products */}
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            {t("Products")}
                          </p>
                          {order.products.slice(0, 2).map((product, idx) => (
                            <p key={idx} className="text-sm">
                              {product.name} x{product.quantity}
                            </p>
                          ))}
                          {order.products.length > 2 && (
                            <p className="text-sm text-muted-foreground">
                              +{order.products.length - 2} {t("more")}
                            </p>
                          )}
                        </div>

                        {/* Value and Details */}
                        <div className="flex flex-wrap justify-between items-center gap-2 border-t border-gray-200 dark:border-gray-800 pt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("Cart Value")}
                            </p>
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              {order.cartValue.toLocaleString()} {t("EGP")}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("Source")}
                            </p>
                            <span
                              className={`font-medium text-sm ${getSourceIcon(
                                order.source
                              )}`}
                            >
                              {order.source}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("Recovery")}
                            </p>
                            <span className="text-sm">
                              {order.recoveryAttempts} {t("attempts")}
                            </span>
                          </div>
                        </div>

                        {/* Time Info */}
                        <div className="text-xs text-muted-foreground">
                          <p>{order.abandonedAt}</p>
                          <p>{order.lastActivity}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1 border-gray-200 dark:border-gray-800"
                          >
                            <Phone className="h-4 w-4" />
                            {t("Call")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1 border-gray-200 dark:border-gray-800"
                          >
                            <MessageSquare className="h-4 w-4" />
                            {t("WhatsApp")}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-200 dark:border-gray-800"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-[200px]"
                            >
                              <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Eye className="h-4 w-4" />
                                {t("View Details")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 cursor-pointer text-purple-600">
                                <Mail className="h-4 w-4" />
                                {t("Send Email")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 cursor-pointer text-orange-600">
                                <ShoppingCart className="h-4 w-4" />
                                {t("Create Order")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                                <XCircle className="h-4 w-4" />
                                {t("Mark as Lost")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-muted-foreground">
                      {t("No missed orders found")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-muted-foreground">
                  {t("Showing")} {(currentPage - 1) * itemsPerPage + 1}{" "}
                  {t("to")}{" "}
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)}{" "}
                  {t("of")} {filteredOrders.length} {t("results")}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MissedOrder;
