import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  
  DollarSign,
  ShoppingCart,
  Calendar,
  Download,
  Filter,
  BarChart3,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";

export default function SalesReportsPage() {
  const { t, i18n } = useTranslation();
  const [timeRange, setTimeRange] = useState("7days");
  const [reportType, setReportType] = useState("revenue");
  
  const isRTL = i18n.dir() === "rtl";

  const metrics = [
    {
      title: t("analytics.totalRevenue"),
      value: "EGP 1,245,900",
      change: 15.4,
      changeType: "increase" as const,
      icon: DollarSign,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.avgOrderValue"),
      value: "EGP 385",
      change: 8.2,
      changeType: "increase" as const,
      icon: ShoppingCart,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.conversionRate"),
      value: "4.8%",
      change: -0.6,
      changeType: "decrease" as const,
      icon: TrendingUp,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "down" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.repeatPurchaseRate"),
      value: "32.5%",
      change: 3.1,
      changeType: "increase" as const,
      icon: BarChart3,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBgColor: "bg-orange-50 dark:bg-orange-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    }
  ];

  // Mock data for revenue chart
  const revenueData = [
    { date: "01 Dec", revenue: 45000, orders: 120 },
    { date: "02 Dec", revenue: 52000, orders: 145 },
    { date: "03 Dec", revenue: 48000, orders: 130 },
    { date: "04 Dec", revenue: 61000, orders: 165 },
    { date: "05 Dec", revenue: 55000, orders: 150 },
    { date: "06 Dec", revenue: 67000, orders: 180 },
    { date: "07 Dec", revenue: 72000, orders: 195 }
  ];

  // Mock data for top performing categories
  const categoryData = [
    { name: t("categories.electronics"), revenue: 425000, percentage: 34.2, trend: "up" },
    { name: t("categories.fashion"), revenue: 312000, percentage: 25.1, trend: "up" },
    { name: t("categories.home"), revenue: 238000, percentage: 19.1, trend: "down" },
    { name: t("categories.beauty"), revenue: 169000, percentage: 13.6, trend: "up" },
    { name: t("categories.sports"), revenue: 100900, percentage: 8.0, trend: "down" }
  ];

  // Mock data for payment methods
  const paymentData = [
    { method: t("payment.cashOnDelivery"), amount: 623000, percentage: 50 },
    { method: t("payment.creditCard"), amount: 373800, percentage: 30 },
    { method: t("payment.bankTransfer"), amount: 186900, percentage: 15 },
    { method: t("payment.digitalWallet"), amount: 62300, percentage: 5 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("analytics.salesReports")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("analytics.salesReportsDesc")}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{t("time.today")}</SelectItem>
              <SelectItem value="7days">{t("time.last7Days")}</SelectItem>
              <SelectItem value="30days">{t("time.last30Days")}</SelectItem>
              <SelectItem value="3months">{t("time.last3Months")}</SelectItem>
              <SelectItem value="year">{t("time.thisYear")}</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            className="hover:bg-transparent dark:hover:bg-transparent"
          >
            <Filter className="h-4 w-4 mr-2" />
            {t("common.filter")}
          </Button>

          <Button className="border dark:border-gray-700 border-gray-200">
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

      {/* Revenue Chart */}
      <Card className="border  border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b dark:border-gray-700 border-gray-200  ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {t("analytics.revenueOverTime")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("analytics.dailyRevenueAndOrders")}
                </p>
              </div>
            </div>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">
                  {t("analytics.revenue")}
                </SelectItem>
                <SelectItem value="orders">{t("analytics.orders")}</SelectItem>
                <SelectItem value="both">{t("analytics.both")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-6 relative z-10">
          <div className="h-[300px] flex items-center justify-center relative">
            {/* Placeholder for chart - you would integrate a real charting library here */}
            <div
              className="w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-8 overflow-y-auto scrollbar-none"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style>{`
                .scrollbar-none::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground w-16">
                      {data.date}
                    </span>
                    <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${(data.revenue / 72000) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        EGP {data.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b dark:border-gray-700 border-gray-200 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <PieChart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {t("analytics.topCategories")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("analytics.revenueByCategory")}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        EGP {category.revenue.toLocaleString()}
                      </span>
                      {category.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {category.percentage}% {t("analytics.ofTotalRevenue")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b dark:border-gray-700 border-gray-200 bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {t("analytics.paymentMethods")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("analytics.revenueByPaymentMethod")}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {paymentData.map((payment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{payment.method}</span>
                    <span className="text-sm font-semibold">
                      EGP {payment.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative h-12 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg overflow-hidden">
                    <div
                      className={`absolute inset-y-0 ${
                        isRTL ? "right-0" : "left-0"
                      } bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center`}
                      style={{ width: `${payment.percentage}%` }}
                    >
                      <span className="text-white text-sm font-semibold px-2">
                        {payment.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}