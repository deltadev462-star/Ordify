import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Megaphone,
  Mail,
  MessageSquare,
  MousePointer,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Share2,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";

export default function MarketingAnalyticsPage() {
  const { t, i18n } = useTranslation();
  const [timeRange, setTimeRange] = useState("30days");
  const [channel, setChannel] = useState("all");
  const [campaignType, setCampaignType] = useState("all");
  
  const isRTL = i18n.dir() === "rtl";

  const metrics = [
    {
      title: t("analytics.totalReach"),
      value: "245.8K",
      change: 28.4,
      changeType: "increase" as const,
      icon: Users,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.engagementRate"),
      value: "8.7%",
      change: 15.2,
      changeType: "increase" as const,
      icon: MousePointer,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.conversionRate"),
      value: "3.2%",
      change: -0.8,
      changeType: "decrease" as const,
      icon: Target,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      trend: "down" as const,
      period: t("common.vsLastMonth")
    },
    {
      title: t("analytics.roi"),
      value: "328%",
      change: 42.1,
      changeType: "increase" as const,
      icon: DollarSign,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBgColor: "bg-orange-50 dark:bg-orange-950/30",
      trend: "up" as const,
      period: t("common.vsLastMonth")
    }
  ];

  // Mock data for campaign performance
  const campaigns = [
    {
      name: t("campaigns.blackFriday2023"),
      channel: t("channels.email"),
      status: "active",
      budget: 50000,
      spent: 32450,
      reach: 89234,
      conversions: 2341,
      revenue: 189500,
      roi: 483.7,
      icon: Mail,
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: t("campaigns.socialMediaBlitz"),
      channel: t("channels.social"),
      status: "active",
      budget: 35000,
      spent: 28900,
      reach: 156789,
      conversions: 1892,
      revenue: 145600,
      roi: 403.8,
      icon: Share2,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: t("campaigns.whatsappFlash"),
      channel: t("channels.whatsapp"),
      status: "completed",
      budget: 20000,
      spent: 18500,
      reach: 45678,
      conversions: 987,
      revenue: 78900,
      roi: 326.5,
      icon: MessageSquare,
      color: "from-emerald-500 to-teal-500"
    },
    {
      name: t("campaigns.googleAds"),
      channel: t("channels.ppc"),
      status: "active",
      budget: 75000,
      spent: 45200,
      reach: 234567,
      conversions: 3456,
      revenue: 267800,
      roi: 492.5,
      icon: MousePointer,
      color: "from-orange-500 to-amber-500"
    }
  ];

  // Mock data for channel performance
  const channelData = [
    {
      channel: t("channels.email"),
      campaigns: 12,
      reach: 89234,
      engagement: "12.4%",
      conversions: 2341,
      revenue: 189500,
      trend: "up"
    },
    {
      channel: t("channels.social"),
      campaigns: 8,
      reach: 156789,
      engagement: "8.7%",
      conversions: 1892,
      revenue: 145600,
      trend: "up"
    },
    {
      channel: t("channels.whatsapp"),
      campaigns: 15,
      reach: 45678,
      engagement: "18.9%",
      conversions: 987,
      revenue: 78900,
      trend: "down"
    },
    {
      channel: t("channels.ppc"),
      campaigns: 6,
      reach: 234567,
      engagement: "3.2%",
      conversions: 3456,
      revenue: 267800,
      trend: "up"
    }
  ];

  // Mock data for content performance
  const contentPerformance = [
    {
      type: t("content.productShowcase"),
      posts: 45,
      engagement: "15.3%",
      clicks: 12340,
      shares: 2341,
      performance: 94
    },
    {
      type: t("content.customerStories"),
      posts: 28,
      engagement: "22.7%",
      clicks: 8920,
      shares: 3456,
      performance: 88
    },
    {
      type: t("content.promotionalOffers"),
      posts: 62,
      engagement: "8.9%",
      clicks: 23456,
      shares: 1234,
      performance: 76
    },
    {
      type: t("content.educational"),
      posts: 34,
      engagement: "19.4%",
      clicks: 6789,
      shares: 2890,
      performance: 82
    }
  ];

  // Mock data for audience insights
  const audienceInsights = {
    demographics: {
      age1824: 22,
      age2534: 38,
      age3544: 25,
      age4554: 10,
      age55plus: 5
    },
    interests: [
      { name: t("interests.technology"), percentage: 68 },
      { name: t("interests.fashion"), percentage: 54 },
      { name: t("interests.fitness"), percentage: 42 },
      { name: t("interests.travel"), percentage: 38 }
    ],
    topLocations: [
      { city: t("cities.cairo"), percentage: 42 },
      { city: t("cities.alexandria"), percentage: 18 },
      { city: t("cities.giza"), percentage: 15 }
    ]
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            {t("analytics.marketingAnalytics")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("analytics.marketingAnalyticsDesc")}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="w-[160px]">
              <Megaphone className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("channels.all")}</SelectItem>
              <SelectItem value="email">{t("channels.email")}</SelectItem>
              <SelectItem value="social">{t("channels.social")}</SelectItem>
              <SelectItem value="whatsapp">{t("channels.whatsapp")}</SelectItem>
              <SelectItem value="ppc">{t("channels.ppc")}</SelectItem>
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

      {/* Campaign Performance */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50/50 to-pink-50/50 dark:from-orange-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("analytics.activeCampaigns")}</h3>
                <p className="text-sm text-muted-foreground">{t("analytics.campaignPerformance")}</p>
              </div>
            </div>
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("campaigns.all")}</SelectItem>
                <SelectItem value="active">{t("campaigns.active")}</SelectItem>
                <SelectItem value="completed">{t("campaigns.completed")}</SelectItem>
                <SelectItem value="scheduled">{t("campaigns.scheduled")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {campaigns.map((campaign, index) => {
              const Icon = campaign.icon;
              const spentPercentage = (campaign.spent / campaign.budget) * 100;
              
              return (
                <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${campaign.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {campaign.name}
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              campaign.status === 'active' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {campaign.status}
                            </span>
                          </h4>
                          <p className="text-sm text-muted-foreground">{campaign.channel}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {campaign.roi}% ROI
                          </p>
                          <p className="text-sm text-muted-foreground">
                            EGP {campaign.revenue.toLocaleString()} revenue
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">{t("analytics.reach")}</p>
                          <p className="font-semibold">{campaign.reach.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t("analytics.conversions")}</p>
                          <p className="font-semibold">{campaign.conversions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t("analytics.spent")}</p>
                          <p className="font-semibold">EGP {campaign.spent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t("analytics.budget")}</p>
                          <p className="font-semibold">EGP {campaign.budget.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{t("analytics.budgetUsed")}</span>
                          <span className="font-medium">{spentPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} bg-gradient-to-r ${campaign.color} rounded-full`}
                            style={{ width: `${spentPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("analytics.channelPerformance")}</h3>
                <p className="text-sm text-muted-foreground">{t("analytics.performanceByChannel")}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {channelData.map((channel, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{channel.channel}</h4>
                      <p className="text-sm text-muted-foreground">
                        {channel.campaigns} {t("analytics.campaigns")} • {channel.reach.toLocaleString()} {t("analytics.reach")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">EGP {channel.revenue.toLocaleString()}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-sm text-muted-foreground">{channel.engagement}</span>
                        {channel.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${(channel.revenue / 267800) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Performance */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("analytics.contentPerformance")}</h3>
                <p className="text-sm text-muted-foreground">{t("analytics.topPerformingContent")}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {contentPerformance.map((content, index) => (
                <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-emerald-50/30 to-teal-50/30 dark:from-emerald-950/10 dark:to-teal-950/10 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{content.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {content.posts} {t("analytics.posts")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">{t("analytics.engagement")}</p>
                        <p className="font-semibold">{content.engagement}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{t("analytics.clicks")}</p>
                        <p className="font-semibold">{content.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{t("analytics.shares")}</p>
                        <p className="font-semibold">{content.shares.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{t("analytics.performanceScore")}</span>
                      <span className="font-medium">{content.performance}%</span>
                    </div>
                    <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        style={{ width: `${content.performance}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Insights */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("analytics.audienceInsights")}</h3>
              <p className="text-sm text-muted-foreground">{t("analytics.knowYourAudience")}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Age Demographics */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">{t("analytics.ageDistribution")}</h4>
              {Object.entries(audienceInsights.demographics).map(([age, percentage]) => (
                <div key={age} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t(`age.${age}`)}</span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                  <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Top Interests */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">{t("analytics.topInterests")}</h4>
              {audienceInsights.interests.map((interest, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                  <span className="text-sm font-medium">{interest.name}</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{interest.percentage}%</span>
                </div>
              ))}
            </div>

            {/* Top Locations */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">{t("analytics.topLocations")}</h4>
              {audienceInsights.topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg bg-cyan-50/50 dark:bg-cyan-950/20">
                  <span className="text-sm font-medium">{location.city}</span>
                  <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{location.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}