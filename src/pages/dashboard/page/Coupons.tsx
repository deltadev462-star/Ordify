import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Ticket,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Download,
  QrCode,
  Calendar,
  Clock,
  Percent,
  Tag,
  AlertCircle,
  CheckCircle2,
  XCircle,
  BarChart3,
  Eye
} from "lucide-react";
import Title from "@/components/Title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Coupon {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed" | "shipping";
  value: number;
  minOrderValue?: number;
  status: "active" | "inactive" | "expired" | "scheduled";
  usageCount: number;
  usageLimit: number | null;
  startDate: string;
  endDate: string;
  customerLimit: number;
  totalRevenue: number;
  avgOrderValue: number;
  categories?: string[];
}

function Coupons() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");

  // Mock data
  const coupons: Coupon[] = [
    {
      id: "1",
      code: "SAVE20",
      description: "20% off on all products",
      type: "percentage",
      value: 20,
      minOrderValue: 500,
      status: "active",
      usageCount: 156,
      usageLimit: 500,
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      customerLimit: 1,
      totalRevenue: 45600,
      avgOrderValue: 292.31,
      categories: ["Electronics", "Fashion"]
    },
    {
      id: "2",
      code: "WELCOME100",
      description: "EGP 100 off for new customers",
      type: "fixed",
      value: 100,
      minOrderValue: 1000,
      status: "active",
      usageCount: 89,
      usageLimit: null,
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      customerLimit: 1,
      totalRevenue: 128500,
      avgOrderValue: 1443.82
    },
    {
      id: "3",
      code: "FREESHIP",
      description: "Free shipping on orders above EGP 300",
      type: "shipping",
      value: 0,
      minOrderValue: 300,
      status: "active",
      usageCount: 234,
      usageLimit: 1000,
      startDate: "2024-11-15",
      endDate: "2024-12-15",
      customerLimit: 3,
      totalRevenue: 67890,
      avgOrderValue: 290.13
    },
    {
      id: "4",
      code: "BLACKFRIDAY50",
      description: "50% off Black Friday special",
      type: "percentage",
      value: 50,
      minOrderValue: 1500,
      status: "expired",
      usageCount: 789,
      usageLimit: 1000,
      startDate: "2024-11-24",
      endDate: "2024-11-26",
      customerLimit: 2,
      totalRevenue: 234560,
      avgOrderValue: 297.09
    },
    {
      id: "5",
      code: "VIP30",
      description: "30% off for VIP members",
      type: "percentage",
      value: 30,
      status: "scheduled",
      usageCount: 0,
      usageLimit: 200,
      startDate: "2024-12-20",
      endDate: "2025-01-20",
      customerLimit: 5,
      totalRevenue: 0,
      avgOrderValue: 0
    }
  ];

  // Statistics
  const activeCoupons = coupons.filter(c => c.status === "active").length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.usageCount, 0);
  const totalRevenue = coupons.reduce((sum, c) => sum + c.totalRevenue, 0);
  const avgConversionRate = 4.7; // Mock conversion rate

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || coupon.type === filterType;
    const matchesStatus = filterStatus === "all" || coupon.status === filterStatus;
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "active" && coupon.status === "active") ||
                      (selectedTab === "expired" && coupon.status === "expired");
    
    return matchesSearch && matchesType && matchesStatus && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage": return <Percent className="h-4 w-4" />;
      case "fixed": return <Tag className="h-4 w-4" />;
      case "shipping": return <Ticket className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {t("coupons.status.active")}
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400">
            <XCircle className="h-3 w-3 mr-1" />
            {t("coupons.status.inactive")}
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            {t("coupons.status.expired")}
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
            <Clock className="h-3 w-3 mr-1" />
            {t("coupons.status.scheduled")}
          </Badge>
        );
      default:
        return null;
    }
  };

  const CouponCard = ({ coupon }: { coupon: Coupon }) => (
    <Card className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <code className="bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1.5 rounded-lg font-mono font-medium">
                {coupon.code}
              </code>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 hover:bg-primary/10"
                  onClick={() => navigator.clipboard.writeText(coupon.code)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 hover:bg-primary/10"
                >
                  <QrCode className="h-3 w-3" />
                </Button>
              </div>
            </div>
            {getStatusBadge(coupon.status)}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("coupons.actions.title")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                {t("coupons.actions.viewDetails")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                {t("coupons.actions.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                {t("coupons.actions.duplicate")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                {t("coupons.actions.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-medium">{coupon.description}</p>
          {coupon.minOrderValue && (
            <p className="text-xs text-muted-foreground mt-1">
              {t("coupons.minOrder")}: EGP {coupon.minOrderValue}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          {getTypeIcon(coupon.type)}
          <span className="font-medium">
            {coupon.type === "percentage" ? `${coupon.value}%` : 
             coupon.type === "fixed" ? `EGP ${coupon.value}` : 
             "Free"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm text-muted-foreground">{t("coupons.usage")}</p>
            <div className="space-y-1 mt-1">
              <p className="font-medium">
                {coupon.usageCount} / {coupon.usageLimit || "∞"}
              </p>
              {coupon.usageLimit && (
                <Progress
                  value={(coupon.usageCount / coupon.usageLimit) * 100}
                  className="h-2"
                />
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("coupons.revenue")}</p>
            <p className="font-medium mt-1">EGP {coupon.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {t("coupons.avg")}: EGP {coupon.avgOrderValue.toFixed(0)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(coupon.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{new Date(coupon.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title
            title={t("coupons.title")}
            Subtitle={t("coupons.subtitle")}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="glow-on-hover flex-1 sm:flex-none">
              <Download className="h-4 w-4 mr-2" />
              {t("coupons.buttons.export")}
            </Button>
            <Button className="glow-on-hover flex-1 sm:flex-none" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              {t("coupons.buttons.createCoupon")}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("coupons.stats.activeCoupons")}</p>
                  <p className="text-3xl font-bold mt-1">{activeCoupons}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">
                      +12% {t("coupons.stats.vsLastMonth")}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("coupons.stats.totalUsage")}</p>
                  <p className="text-3xl font-bold mt-1">{totalUsage.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Users className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      {t("coupons.stats.redeemedCoupons")}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("coupons.stats.revenueGenerated")}</p>
                  <p className="text-3xl font-bold mt-1">EGP {(totalRevenue / 1000).toFixed(1)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">
                      +23.5% {t("coupons.stats.increase")}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("coupons.stats.conversionRate")}</p>
                  <p className="text-3xl font-bold mt-1">{avgConversionRate}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <BarChart3 className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs text-purple-600 dark:text-purple-400">
                      {t("coupons.stats.averageRate")}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Create Buttons */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg">{t("coupons.quickCreate.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center shrink-0">
                    <Percent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("coupons.quickCreate.percentageDiscount")}</p>
                    <p className="text-xs text-muted-foreground">{t("coupons.quickCreate.percentageDescription")}</p>
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-400/10 flex items-center justify-center shrink-0">
                    <Tag className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("coupons.quickCreate.fixedAmount")}</p>
                    <p className="text-xs text-muted-foreground">{t("coupons.quickCreate.fixedDescription")}</p>
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary sm:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center shrink-0">
                    <Ticket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("coupons.quickCreate.freeShipping")}</p>
                    <p className="text-xs text-muted-foreground">{t("coupons.quickCreate.shippingDescription")}</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Coupons Table */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="space-y-4">
              <CardTitle className="text-lg">{t("coupons.manageCoupons")}</CardTitle>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("coupons.searchPlaceholder")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder={t("coupons.filters.type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("coupons.filters.allTypes")}</SelectItem>
                        <SelectItem value="percentage">{t("coupons.types.percentage")}</SelectItem>
                        <SelectItem value="fixed">{t("coupons.types.fixed")}</SelectItem>
                        <SelectItem value="shipping">{t("coupons.types.shipping")}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder={t("coupons.filters.status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("coupons.filters.all")}</SelectItem>
                        <SelectItem value="active">{t("coupons.status.active")}</SelectItem>
                        <SelectItem value="inactive">{t("coupons.status.inactive")}</SelectItem>
                        <SelectItem value="expired">{t("coupons.status.expired")}</SelectItem>
                        <SelectItem value="scheduled">{t("coupons.status.scheduled")}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon" className="shrink-0">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
                    <TabsTrigger value="all">{t("coupons.tabs.allCoupons")}</TabsTrigger>
                    <TabsTrigger value="active">{t("coupons.tabs.active")}</TabsTrigger>
                    <TabsTrigger value="expired">{t("coupons.tabs.expired")}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="rounded-lg overflow-hidden hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-700">
                    <TableHead>{t("coupons.table.couponCode")}</TableHead>
                    <TableHead>{t("coupons.table.description")}</TableHead>
                    <TableHead>{t("coupons.table.typeAndValue")}</TableHead>
                    <TableHead>{t("coupons.table.status")}</TableHead>
                    <TableHead>{t("coupons.table.usage")}</TableHead>
                    <TableHead>{t("coupons.table.revenue")}</TableHead>
                    <TableHead>{t("coupons.table.validPeriod")}</TableHead>
                    <TableHead className="text-right">{t("coupons.table.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoupons.map((coupon) => (
                    <TableRow key={coupon.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1.5 rounded-lg font-mono font-medium">
                            {coupon.code}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10"
                            onClick={() => navigator.clipboard.writeText(coupon.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10"
                          >
                            <QrCode className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{coupon.description}</p>
                          {coupon.minOrderValue && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {t("coupons.minOrder")}: EGP {coupon.minOrderValue}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(coupon.type)}
                          <span className="font-medium">
                            {coupon.type === "percentage" ? `${coupon.value}%` : 
                             coupon.type === "fixed" ? `EGP ${coupon.value}` : 
                             "Free"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {coupon.usageCount} / {coupon.usageLimit || "∞"}
                          </p>
                          {coupon.usageLimit && (
                            <Progress 
                              value={(coupon.usageCount / coupon.usageLimit) * 100} 
                              className="h-2 w-24"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">EGP {coupon.totalRevenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {t("coupons.avg")}: EGP {coupon.avgOrderValue.toFixed(0)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{new Date(coupon.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{new Date(coupon.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("coupons.actions.title")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              {t("coupons.actions.viewDetails")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {t("coupons.actions.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              {t("coupons.actions.duplicate")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t("coupons.actions.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                {t("coupons.pagination.showing")} 1-{filteredCoupons.length} {t("coupons.pagination.of")} {coupons.length} {t("coupons.pagination.coupons")}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  {t("coupons.pagination.previous")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("coupons.pagination.next")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Coupons;