import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Package,
  TrendingUp,
  Star,
  ShoppingBag,
  AlertTriangle,
  BarChart3,
  ShoppingCart,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Package2
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";

export default function ProductPerformancePage() {
  const { t, i18n } = useTranslation();
  const [timeRange, setTimeRange] = useState("30days");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("revenue");
  
  const isRTL = i18n.dir() === "rtl";

  const metrics = [
    {
      title: t("analytics.totalProducts"),
      value: "2,456",
      change: 8.3,
      changeType: "increase" as const,
      icon: Package,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.avgProductRevenue"),
      value: "EGP 12,450",
      change: 15.7,
      changeType: "increase" as const,
      icon: TrendingUp,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.avgRating"),
      value: "4.7",
      change: 2.1,
      changeType: "increase" as const,
      icon: Star,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBgColor: "bg-amber-50 dark:bg-amber-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.stockAlerts"),
      value: "23",
      change: -18.2,
      changeType: "decrease" as const,
      icon: AlertTriangle,
      iconColor: "text-red-600 dark:text-red-400",
      iconBgColor: "bg-red-50 dark:bg-red-950/30",
      trend: "down" as const,
      period: t("common.vsLastMonth")
    }
  ];

  // Mock data for top products
  const topProducts = [
    {
      name: t("products.wirelessEarbuds"),
      sku: "WE-2023-BK",
      category: t("categories.electronics"),
      revenue: 189500,
      units: 492,
      rating: 4.8,
      trend: "up",
      change: 23.5,
      image: "/th (1).jpg"
    },
    {
      name: t("products.smartWatch"),
      sku: "SW-2023-SL",
      category: t("categories.electronics"),
      revenue: 156200,
      units: 312,
      rating: 4.6,
      trend: "up",
      change: 18.2,
      image: "/th (2).jpg"
    },
    {
      name: t("products.yogaMat"),
      sku: "YM-2023-PP",
      category: t("categories.sports"),
      revenue: 98700,
      units: 658,
      rating: 4.9,
      trend: "up",
      change: 15.8,
      image: "/th (3).jpg"
    },
    {
      name: t("products.coffeeGrinder"),
      sku: "CG-2023-SS",
      category: t("categories.home"),
      revenue: 87300,
      units: 194,
      rating: 4.5,
      trend: "down",
      change: -8.3,
      image: "/th (4).jpg"
    },
    {
      name: t("products.runningShoes"),
      sku: "RS-2023-BL",
      category: t("categories.sports"),
      revenue: 76500,
      units: 170,
      rating: 4.7,
      trend: "up",
      change: 12.1,
      image: "/th (5).jpg"
    }
  ];

  // Mock data for category performance
  const categoryPerformance = [
    {
      name: t("categories.electronics"),
      products: 456,
      revenue: 892000,
      growth: 18.5,
      bestSeller: t("products.wirelessEarbuds"),
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: t("categories.fashion"),
      products: 823,
      revenue: 623000,
      growth: 12.3,
      bestSeller: t("products.summerDress"),
      color: "from-purple-500 to-pink-500"
    },
    {
      name: t("categories.home"),
      products: 345,
      revenue: 456000,
      growth: -3.2,
      bestSeller: t("products.coffeeGrinder"),
      color: "from-emerald-500 to-teal-500"
    },
    {
      name: t("categories.sports"),
      products: 289,
      revenue: 378000,
      growth: 22.1,
      bestSeller: t("products.yogaMat"),
      color: "from-orange-500 to-amber-500"
    }
  ];

  // Mock data for inventory status
  const inventoryStatus = {
    inStock: 1834,
    lowStock: 412,
    outOfStock: 210,
    overstocked: 87
  };

  // Mock data for product metrics
  const productMetrics = [
    { metric: t("analytics.viewToCart"), value: "18.5%", change: 2.3 },
    { metric: t("analytics.cartToOrder"), value: "42.3%", change: -1.2 },
    { metric: t("analytics.returnRate"), value: "3.2%", change: -0.5 },
    { metric: t("analytics.crossSellRate"), value: "24.7%", change: 3.8 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {t("analytics.productPerformance")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("analytics.productPerformanceDesc")}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[160px]">
              <Package2 className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("categories.all")}</SelectItem>
              <SelectItem value="electronics">{t("categories.electronics")}</SelectItem>
              <SelectItem value="fashion">{t("categories.fashion")}</SelectItem>
              <SelectItem value="home">{t("categories.home")}</SelectItem>
              <SelectItem value="sports">{t("categories.sports")}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">{t("time.last7Days")}</SelectItem>
              <SelectItem value="30days">{t("time.last30Days")}</SelectItem>
              <SelectItem value="90days">{t("time.last90Days")}</SelectItem>
              <SelectItem value="year">{t("time.thisYear")}</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" className="hover:bg-transparent dark:hover:bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            {t("common.filter")}
          </Button>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            {t("common.export")}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            iconColor={metric.iconColor}
            iconBgColor={metric.iconBgColor}
            trend={metric.trend}
            period={metric.period}
          />
        ))}
      </div>

      {/* Top Performing Products */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("analytics.topPerformingProducts")}</h3>
                <p className="text-sm text-muted-foreground">{t("analytics.bestSellingItems")}</p>
              </div>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">{t("sort.byRevenue")}</SelectItem>
                <SelectItem value="units">{t("sort.byUnits")}</SelectItem>
                <SelectItem value="rating">{t("sort.byRating")}</SelectItem>
                <SelectItem value="growth">{t("sort.byGrowth")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-emerald-50/30 to-teal-50/30 dark:from-emerald-950/10 dark:to-teal-950/10 hover:shadow-md transition-all duration-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.sku} • {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">EGP {product.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{product.units} {t("common.units")}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {product.trend === "up" ? (
                        <>
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">+{product.change}%</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-600">{product.change}%</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("analytics.categoryPerformance")}</h3>
                <p className="text-sm text-muted-foreground">{t("analytics.performanceByCategory")}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="space-y-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.products} {t("common.products")} • {t("analytics.bestSeller")}: {category.bestSeller}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">EGP {category.revenue.toLocaleString()}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        {category.growth > 0 ? (
                          <>
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">+{category.growth}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-600">{category.growth}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} bg-gradient-to-r ${category.color} rounded-full`}
                      style={{ width: `${(category.revenue / 892000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status & Product Metrics */}
        <div className="space-y-6">
          {/* Inventory Status */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold">{t("analytics.inventoryStatus")}</h3>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {inventoryStatus.inStock}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{t("inventory.inStock")}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {inventoryStatus.lowStock}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{t("inventory.lowStock")}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-950/20">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {inventoryStatus.outOfStock}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{t("inventory.outOfStock")}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {inventoryStatus.overstocked}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{t("inventory.overstocked")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Conversion Metrics */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <ShoppingCart className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold">{t("analytics.conversionMetrics")}</h3>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {productMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{metric.value}</span>
                      <div className="flex items-center gap-1">
                        {metric.change > 0 ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600">+{metric.change}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-red-600">{metric.change}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}