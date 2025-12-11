import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MetricData {
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period?: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
  subValue?: string;
  trend?: 'up' | 'down' | 'stable';
  period?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
  iconBgColor,
  subValue,
  trend,
  period = "vs last period"
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getChangeIcon = () => {
    if (changeType === 'increase') return <ArrowUp className="h-4 w-4" />;
    if (changeType === 'decrease') return <ArrowDown className="h-4 w-4" />;
    return null;
  };

  return (
    <Card className="relative overflow-hidden border dark:border-gray-700 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-gray-900">
      {/* Background decoration */}
      <div className={cn("absolute inset-0 opacity-5", iconBgColor)} />

      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {subValue && (
                <span className="text-sm text-muted-foreground font-medium">
                  {subValue}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {getChangeIcon()}
              <span
                className={cn(
                  "text-sm font-medium",
                  changeType === "increase"
                    ? "text-green-600 dark:text-green-400"
                    : changeType === "decrease"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              <span className="text-xs text-muted-foreground">{period}</span>
              {trend && getTrendIcon()}
            </div>
          </div>
          <div className={cn("p-3 rounded-xl", iconBgColor)}>
            <Icon className={cn("h-7 w-7", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}