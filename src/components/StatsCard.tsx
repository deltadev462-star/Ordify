import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Percent,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
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
import { statsData } from "@/data/dashboard-data";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  bgColor?: string;
  iconColor?: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  period?: string;
  showActions?: boolean;
}

const StatCardItem = ({
  title,
  value,
  icon: Icon,
  bgColor = "bg-blue-500/20",
  iconColor = "text-blue-400",
  change,
  trend = 'stable',
  period,
  showActions = false
}: StatCardProps) => {
  const { t } = useTranslation();

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 dark:text-green-400';
    if (trend === 'down') return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-900">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500" />
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t("View Details")}</DropdownMenuItem>
                <DropdownMenuItem>{t("Export Data")}</DropdownMenuItem>
                <DropdownMenuItem>{t("Set Alert")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          
          {(change !== undefined || period) && (
            <div className="flex items-center justify-between">
              {change !== undefined && (
                <div className="flex items-center gap-1">
                  {getTrendIcon()}
                  <span className={`text-sm font-medium ${getTrendColor()}`}>
                    {Math.abs(change)}%
                  </span>
                </div>
              )}
              {period && (
                <span className="text-xs text-muted-foreground">{period}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function StatsCard() {
  const { t } = useTranslation();

  // Enhanced stats data with trends and changes
  const enhancedStats = statsData.map(stat => ({
    ...stat,
    change: Math.random() > 0.5 ? Math.floor(Math.random() * 20) : -Math.floor(Math.random() * 10),
    trend: Math.random() > 0.5 ? 'up' as const : Math.random() > 0.3 ? 'down' as const : 'stable' as const,
    period: t("vs last month")
  }));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t("Statistics")}</h2>
          <p className="text-muted-foreground mt-1">
            {t("Know more about your store's performance and more.")}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-3 py-1">
            <Activity className="h-3 w-3 mr-1" />
            {t("Live")}
          </Badge>
          <Button variant="outline" size="sm">
            {t("View All Stats")}
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {enhancedStats.slice(0, 8).map((stat) => (
          <StatCardItem
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            iconColor={stat.iconColor}
            change={stat.change}
            trend={stat.trend}
            period={stat.period}
            showActions={true}
          />
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Card className="col-span-1 lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  {t("Revenue Overview")}
                </p>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                      85,420
                    </p>
                    <span className="text-sm font-medium text-blue-600/70 dark:text-blue-400/70">
                      {t("EGP")}
                    </span>
                    <Badge className="bg-green-500/10 text-green-600 border-0">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +12.5%
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-600/70 dark:text-blue-400/70">
                    {t("Total revenue this month")}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-blue-600/60 dark:text-blue-400/60">{t("Orders")}</p>
                      <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">234</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600/60 dark:text-blue-400/60">{t("Customers")}</p>
                      <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">189</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600/60 dark:text-blue-400/60">{t("Avg Order")}</p>
                      <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">365</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="p-4 rounded-2xl bg-blue-500/10">
                  <DollarSign className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/30 dark:to-pink-900/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Percent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 border-0">
                {t("Goal")}
              </Badge>
            </div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-2">
              {t("Conversion Rate")}
            </p>
            <p className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-3">
              4.8%
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-purple-600/70 dark:text-purple-400/70">{t("Target")}: 5%</span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">96%</span>
              </div>
              <div className="w-full bg-purple-200 dark:bg-purple-900/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
