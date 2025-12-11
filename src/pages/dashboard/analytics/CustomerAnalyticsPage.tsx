import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Activity,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Map,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";

export default function CustomerAnalyticsPage() {
  const { t, i18n } = useTranslation();
  const [timeRange, setTimeRange] = useState("30days");
  const [segment, setSegment] = useState("all");
  
  const isRTL = i18n.dir() === "rtl";

  const metrics = [
    {
      title: t("analytics.totalCustomers"),
      value: "12,845",
      change: 18.2,
      changeType: "increase" as const,
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.newCustomers"),
      value: "2,341",
      change: 24.5,
      changeType: "increase" as const,
      icon: UserPlus,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.returningCustomers"),
      value: "8,124",
      change: 12.3,
      changeType: "increase" as const,
      icon: UserCheck,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.churnRate"),
      value: "2.4%",
      change: -0.8,
      changeType: "decrease" as const,
      icon: UserX,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBgColor: "bg-orange-50 dark:bg-orange-950/30",
      trend: "down" as const,
      period: t("common.vsLastMonth")
    }
  ];

  // Mock data for customer segments
  const segmentData = [
    { name: t("segments.vipCustomers"), count: 1842, revenue: 892000, growth: 15.2 },
    { name: t("segments.regularCustomers"), count: 6234, revenue: 423000, growth: 8.7 },
    { name: t("segments.newCustomers"), count: 2341, revenue: 156000, growth: 24.5 },
    { name: t("segments.atRiskCustomers"), count: 1428, revenue: 89000, growth: -12.3 },
    { name: t("segments.dormantCustomers"), count: 1000, revenue: 12000, growth: -18.9 }
  ];

  // Mock data for customer lifetime value
  const ltv = {
    current: `${t("common.currency")} 1,842`,
    previous: `${t("common.currency")} 1,635`,
    change: 12.7
  };

  // Mock data for geographic distribution
  const geoData = [
    { city: t("cities.cairo"), customers: 4823, percentage: 37.5 },
    { city: t("cities.alexandria"), customers: 2156, percentage: 16.8 },
    { city: t("cities.giza"), customers: 1892, percentage: 14.7 },
    { city: t("cities.sharm"), customers: 1234, percentage: 9.6 },
    { city: t("cities.other"), customers: 2740, percentage: 21.4 }
  ];

  // Mock data for device usage
  const deviceData = [
    { device: t("devices.mobile"), percentage: 68, color: "from-blue-500 to-indigo-500" },
    { device: t("devices.desktop"), percentage: 28, color: "from-purple-500 to-pink-500" },
    { device: t("devices.tablet"), percentage: 4, color: "from-orange-500 to-amber-500" }
  ];

  // Mock data for customer behavior
  const behaviorData = {
    avgSessionDuration: "5:42",
    pagesPerSession: 8.3,
    bounceRate: "32.5%",
    cartAbandonment: "68.4%"
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("analytics.customerAnalytics")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("analytics.customerAnalyticsDesc")}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={segment} onValueChange={setSegment}>
            <SelectTrigger className="w-[160px]">
              <Users className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("segments.all")}</SelectItem>
              <SelectItem value="vip">{t("segments.vip")}</SelectItem>
              <SelectItem value="new">{t("segments.new")}</SelectItem>
              <SelectItem value="returning">{t("segments.returning")}</SelectItem>
              <SelectItem value="atrisk">{t("segments.atRisk")}</SelectItem>
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

      {/* Customer Segments & Lifetime Value */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Segments */}
        <Card className="lg:col-span-2 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("analytics.customerSegments")}</h3>
                <p className="text-sm text-muted-foreground">{t("analytics.segmentDistribution")}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {segmentData.map((segment, index) => (
                <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/10 dark:to-pink-950/10 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{segment.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {segment.count.toLocaleString()} {t("common.customers")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{t("common.currency")} {segment.revenue.toLocaleString()}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        {segment.growth > 0 ? (
                          <>
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">+{segment.growth}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-600">{segment.growth}%</span>
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

        {/* Lifetime Value */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold">{t("analytics.customerLTV")}</h3>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {ltv.current}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("analytics.avgLifetimeValue")}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("analytics.previousPeriod")}</span>
                  <span className="text-sm font-medium">{ltv.previous}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">{t("common.change")}</span>
                  <div className="flex items-center gap-1">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">+{ltv.change}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution & Device Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Map className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("analytics.geographicDistribution")}</h3>
                <p className="text-sm text-muted-foreground">{t("analytics.customersByLocation")}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {geoData.map((location, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{location.city}</span>
                    <span className="text-sm text-muted-foreground">
                      {location.customers.toLocaleString()} ({location.percentage}%)
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Smartphone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("analytics.deviceUsage")}</h3>
                <p className="text-sm text-muted-foreground">{t("analytics.customersByDevice")}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {deviceData.map((device, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {device.device === t("devices.mobile") && <Smartphone className="h-4 w-4" />}
                      {device.device === t("devices.desktop") && <Monitor className="h-4 w-4" />}
                      {device.device === t("devices.tablet") && <Globe className="h-4 w-4" />}
                      <span className="font-medium">{device.device}</span>
                    </div>
                    <span className="text-2xl font-bold">{device.percentage}%</span>
                  </div>
                  <div className="relative h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div
                      className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} bg-gradient-to-r ${device.color} rounded-lg flex items-center justify-center`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Behavior */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("analytics.customerBehavior")}</h3>
              <p className="text-sm text-muted-foreground">{t("analytics.behaviorMetrics")}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {behaviorData.avgSessionDuration}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{t("analytics.avgSessionDuration")}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-violet-50/50 dark:bg-violet-950/20">
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                {behaviorData.pagesPerSession}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{t("analytics.pagesPerSession")}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {behaviorData.bounceRate}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{t("analytics.bounceRate")}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-violet-50/50 dark:bg-violet-950/20">
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                {behaviorData.cartAbandonment}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{t("analytics.cartAbandonment")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}