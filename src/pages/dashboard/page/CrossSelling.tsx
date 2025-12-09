import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ShoppingBag,
  Package,
  TrendingUp,
  Target,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Link,
  BarChart3,
  Sparkles,
  Settings,
  ArrowUpRight,
  Layers,
  Zap,
  ShoppingCart,
  DollarSign,
  Percent,
  RefreshCw
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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CrossSellBundle {
  id: string;
  name: string;
  type: "bundle" | "recommendation" | "upsell" | "frequently-bought";
  mainProduct: string;
  relatedProducts: string[];
  discount: number;
  status: "active" | "inactive" | "testing";
  conversionRate: number;
  revenue: number;
  views: number;
  clicks: number;
  purchases: number;
  priority: "high" | "medium" | "low";
}

interface ProductRecommendation {
  id: string;
  product: string;
  image: string;
  recommendedWith: string[];
  algorithm: "ai" | "manual" | "trending" | "complementary";
  score: number;
  conversionRate: number;
}

function CrossSelling() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [autoRecommendations, setAutoRecommendations] = useState(true);

  // Mock data
  const bundles: CrossSellBundle[] = [
    {
      id: "1",
      name: "Complete Office Setup",
      type: "bundle",
      mainProduct: "Ergonomic Office Chair",
      relatedProducts: ["Adjustable Desk", "Monitor Stand", "Desk Lamp"],
      discount: 15,
      status: "active",
      conversionRate: 8.2,
      revenue: 125600,
      views: 3450,
      clicks: 890,
      purchases: 73,
      priority: "high"
    },
    {
      id: "2",
      name: "Photography Essentials",
      type: "frequently-bought",
      mainProduct: "DSLR Camera",
      relatedProducts: ["Camera Bag", "Extra Battery", "Memory Card"],
      discount: 0,
      status: "active",
      conversionRate: 12.5,
      revenue: 89300,
      views: 2100,
      clicks: 560,
      purchases: 70,
      priority: "high"
    },
    {
      id: "3",
      name: "Gaming Ultimate Bundle",
      type: "bundle",
      mainProduct: "Gaming Console",
      relatedProducts: ["Extra Controller", "Gaming Headset", "Game Bundle"],
      discount: 20,
      status: "testing",
      conversionRate: 6.8,
      revenue: 45200,
      views: 1200,
      clicks: 340,
      purchases: 23,
      priority: "medium"
    },
    {
      id: "4",
      name: "Smart Home Starter",
      type: "recommendation",
      mainProduct: "Smart Speaker",
      relatedProducts: ["Smart Bulbs", "Smart Plug", "Hub"],
      discount: 10,
      status: "active",
      conversionRate: 9.4,
      revenue: 67800,
      views: 2800,
      clicks: 620,
      purchases: 58,
      priority: "medium"
    },
    {
      id: "5",
      name: "Fitness Pro Package",
      type: "upsell",
      mainProduct: "Treadmill",
      relatedProducts: ["Heart Rate Monitor", "Workout Mat", "Water Bottle"],
      discount: 5,
      status: "inactive",
      conversionRate: 4.2,
      revenue: 23400,
      views: 980,
      clicks: 210,
      purchases: 9,
      priority: "low"
    }
  ];

  const recommendations: ProductRecommendation[] = [
    {
      id: "1",
      product: "Wireless Keyboard",
      image: "/th (2).jpg",
      recommendedWith: ["Wireless Mouse", "USB Hub", "Wrist Rest"],
      algorithm: "ai",
      score: 94,
      conversionRate: 15.3
    },
    {
      id: "2",
      product: "Running Shoes",
      image: "/th (3).jpg",
      recommendedWith: ["Running Socks", "Sports Watch", "Water Bottle"],
      algorithm: "complementary",
      score: 88,
      conversionRate: 11.2
    },
    {
      id: "3",
      product: "Coffee Maker",
      image: "/th (4).jpg",
      recommendedWith: ["Coffee Beans", "Coffee Grinder", "Mugs Set"],
      algorithm: "trending",
      score: 92,
      conversionRate: 18.7
    }
  ];

  // Statistics
  const activeBundles = bundles.filter(b => b.status === "active").length;
  const totalRevenue = bundles.reduce((sum, b) => sum + b.revenue, 0);
  const avgConversionRate = bundles.reduce((sum, b) => sum + b.conversionRate, 0) / bundles.length;
  const totalPurchases = bundles.reduce((sum, b) => sum + b.purchases, 0);

  const filteredBundles = bundles.filter(bundle => {
    const matchesSearch = bundle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bundle.mainProduct.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || bundle.type === filterType;
    const matchesStatus = filterStatus === "all" || bundle.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bundle": return <Package className="h-4 w-4" />;
      case "recommendation": return <Sparkles className="h-4 w-4" />;
      case "upsell": return <ArrowUpRight className="h-4 w-4" />;
      case "frequently-bought": return <ShoppingCart className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "bundle": return t("crossSelling.types.bundle");
      case "recommendation": return t("crossSelling.types.recommendation");
      case "upsell": return t("crossSelling.types.upsell");
      case "frequently-bought": return t("crossSelling.types.frequentlyBought");
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">{t("crossSelling.status.active")}</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400">{t("crossSelling.status.inactive")}</Badge>;
      case "testing":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">{t("crossSelling.status.testing")}</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400">{t("crossSelling.priority.high")}</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600 dark:text-yellow-400">{t("crossSelling.priority.medium")}</Badge>;
      case "low":
        return <Badge variant="outline" className="border-gray-500 text-gray-600 dark:text-gray-400">{t("crossSelling.priority.low")}</Badge>;
      default:
        return null;
    }
  };

  const getAlgorithmBadge = (algorithm: string) => {
    const colors = {
      ai: "bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
      manual: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
      trending: "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400",
      complementary: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
    };
    return <Badge className={colors[algorithm as keyof typeof colors]}>{algorithm.toUpperCase()}</Badge>;
  };

  const BundleCard = ({ bundle }: { bundle: CrossSellBundle }) => (
    <Card className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{bundle.name}</h3>
            <p className="text-xs text-muted-foreground">{t("crossSelling.mainProduct")}: {bundle.mainProduct}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {getStatusBadge(bundle.status)}
              {getPriorityBadge(bundle.priority)}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("crossSelling.actions.title")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                {t("crossSelling.actions.viewAnalytics")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                {t("crossSelling.actions.editBundle")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t("crossSelling.actions.abTest")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                {t("crossSelling.actions.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          {getTypeIcon(bundle.type)}
          <span className="text-sm">{getTypeLabel(bundle.type)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {bundle.relatedProducts.length + 1} {t("crossSelling.items")}
          </Badge>
          {bundle.discount > 0 && (
            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400">
              -{bundle.discount}%
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm text-muted-foreground">{t("crossSelling.performance")}</p>
            <div className="space-y-1 mt-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("crossSelling.rate")}</span>
                <span className="font-medium">{bundle.conversionRate}%</span>
              </div>
              <Progress value={bundle.conversionRate * 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {bundle.clicks}/{bundle.views} {t("crossSelling.clicks")}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("crossSelling.revenue")}</p>
            <p className="font-medium mt-1">EGP {bundle.revenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {bundle.purchases} {t("crossSelling.sales")}
            </p>
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
            title={t("crossSelling.title")}
            Subtitle={t("crossSelling.subtitle")}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="glow-on-hover flex-1 sm:flex-none">
              <Settings className="h-4 w-4 mr-2" />
              {t("crossSelling.buttons.settings")}
            </Button>
            <Button className="glow-on-hover flex-1 sm:flex-none" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              {t("crossSelling.buttons.createBundle")}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("crossSelling.stats.activeBundles")}</p>
                  <p className="text-3xl font-bold mt-1">{activeBundles}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">
                      +3 {t("crossSelling.stats.thisMonth")}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("crossSelling.stats.revenueImpact")}</p>
                  <p className="text-3xl font-bold mt-1">EGP {(totalRevenue / 1000).toFixed(1)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">
                      +24.8% {t("crossSelling.stats.growth")}
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
                  <p className="text-sm text-muted-foreground">{t("crossSelling.stats.conversionRate")}</p>
                  <p className="text-3xl font-bold mt-1">{avgConversionRate.toFixed(1)}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Target className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      {t("crossSelling.stats.averageRate")}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center">
                  <Percent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("crossSelling.stats.bundleSales")}</p>
                  <p className="text-3xl font-bold mt-1">{totalPurchases}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ShoppingBag className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs text-purple-600 dark:text-purple-400">
                      {t("crossSelling.stats.totalPurchases")}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations Settings */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                {t("crossSelling.aiPoweredRecommendations")}
              </CardTitle>
              <Switch 
                checked={autoRecommendations}
                onCheckedChange={setAutoRecommendations}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 rounded-lg shrink-0">
                        <AvatarImage src={rec.image} alt={rec.product} />
                        <AvatarFallback>{rec.product[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <div className="min-w-0">
                            <h4 className="font-medium truncate">{rec.product}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {t("crossSelling.recommendedWith")} {rec.recommendedWith.length} {t("crossSelling.products")}
                            </p>
                          </div>
                          {getAlgorithmBadge(rec.algorithm)}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t("crossSelling.score")}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={rec.score} className="h-2 w-20" />
                              <span className="text-sm font-medium">{rec.score}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t("crossSelling.rate")}</span>
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                              {rec.conversionRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center shrink-0">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">{t("crossSelling.quickActions.productBundle")}</p>
                <p className="text-xs text-muted-foreground">{t("crossSelling.quickActions.productBundleDesc")}</p>
              </div>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">{t("crossSelling.quickActions.smartUpsell")}</p>
                <p className="text-xs text-muted-foreground">{t("crossSelling.quickActions.smartUpsellDesc")}</p>
              </div>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-400/10 flex items-center justify-center shrink-0">
                <Link className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">{t("crossSelling.quickActions.relatedProducts")}</p>
                <p className="text-xs text-muted-foreground">{t("crossSelling.quickActions.relatedProductsDesc")}</p>
              </div>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-400/10 flex items-center justify-center shrink-0">
                <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">{t("crossSelling.quickActions.analytics")}</p>
                <p className="text-xs text-muted-foreground">{t("crossSelling.quickActions.analyticsDesc")}</p>
              </div>
            </div>
          </Button>
        </div>

        {/* Bundles Table */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <CardTitle className="text-lg">{t("crossSelling.crossSellingCampaigns")}</CardTitle>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("crossSelling.searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder={t("crossSelling.filters.type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("crossSelling.filters.allTypes")}</SelectItem>
                      <SelectItem value="bundle">{t("crossSelling.filters.bundle")}</SelectItem>
                      <SelectItem value="recommendation">{t("crossSelling.filters.recommendation")}</SelectItem>
                      <SelectItem value="upsell">{t("crossSelling.filters.upsell")}</SelectItem>
                      <SelectItem value="frequently-bought">{t("crossSelling.filters.frequent")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[120px]">
                      <SelectValue placeholder={t("crossSelling.filters.status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("crossSelling.filters.all")}</SelectItem>
                      <SelectItem value="active">{t("crossSelling.status.active")}</SelectItem>
                      <SelectItem value="inactive">{t("crossSelling.status.inactive")}</SelectItem>
                      <SelectItem value="testing">{t("crossSelling.status.testing")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredBundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="rounded-lg overflow-hidden hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-700">
                    <TableHead>{t("crossSelling.table.bundleName")}</TableHead>
                    <TableHead>{t("crossSelling.table.type")}</TableHead>
                    <TableHead>{t("crossSelling.table.products")}</TableHead>
                    <TableHead>{t("crossSelling.table.status")}</TableHead>
                    <TableHead>{t("crossSelling.table.performance")}</TableHead>
                    <TableHead>{t("crossSelling.table.revenue")}</TableHead>
                    <TableHead>{t("crossSelling.table.priority")}</TableHead>
                    <TableHead className="text-right">{t("crossSelling.table.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBundles.map((bundle) => (
                    <TableRow key={bundle.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div>
                          <p className="font-medium">{bundle.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("crossSelling.mainProduct")}: {bundle.mainProduct}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(bundle.type)}
                          <span className="text-sm">{getTypeLabel(bundle.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {bundle.relatedProducts.length + 1} {t("crossSelling.items")}
                          </Badge>
                          {bundle.discount > 0 && (
                            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400">
                              -{bundle.discount}%
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(bundle.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{t("crossSelling.rate")}</span>
                            <span className="font-medium">{bundle.conversionRate}%</span>
                          </div>
                          <Progress value={bundle.conversionRate * 10} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {bundle.clicks}/{bundle.views} {t("crossSelling.clicks")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">EGP {bundle.revenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {bundle.purchases} {t("crossSelling.sales")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(bundle.priority)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("crossSelling.actions.title")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              {t("crossSelling.actions.viewAnalytics")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {t("crossSelling.actions.editBundle")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              {t("crossSelling.actions.abTest")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t("crossSelling.actions.delete")}
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
                {t("crossSelling.pagination.showing")} 1-{filteredBundles.length} {t("crossSelling.pagination.of")} {bundles.length} {t("crossSelling.pagination.bundles")}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  {t("crossSelling.pagination.previous")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("crossSelling.pagination.next")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CrossSelling;