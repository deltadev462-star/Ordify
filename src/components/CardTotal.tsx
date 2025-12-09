import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CardTotalProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ElementType;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo' | 'pink' | 'yellow';
  progress?: number;
  target?: string | number;
  showProgress?: boolean;
  className?: string;
}

export default function CardTotal({
  title = "Total Revenue",
  value = "45,231.89",
  subtitle = "EGP",
  change = 12.5,
  trend = 'up',
  icon: Icon = DollarSign,
  color = 'blue',
  progress = 75,
  target = "60,000",
  showProgress = true,
  className = ""
}: CardTotalProps) {
  const colorConfig = {
    blue: {
      bg: 'from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30',
      icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      text: 'text-blue-700 dark:text-blue-400',
      progress: 'bg-blue-500'
    },
    green: {
      bg: 'from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30',
      icon: 'bg-green-500/10 text-green-600 dark:text-green-400',
      text: 'text-green-700 dark:text-green-400',
      progress: 'bg-green-500'
    },
    purple: {
      bg: 'from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30',
      icon: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      text: 'text-purple-700 dark:text-purple-400',
      progress: 'bg-purple-500'
    },
    orange: {
      bg: 'from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30',
      icon: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      text: 'text-orange-700 dark:text-orange-400',
      progress: 'bg-orange-500'
    },
    red: {
      bg: 'from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30',
      icon: 'bg-red-500/10 text-red-600 dark:text-red-400',
      text: 'text-red-700 dark:text-red-400',
      progress: 'bg-red-500'
    },
    indigo: {
      bg: 'from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/30',
      icon: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      text: 'text-indigo-700 dark:text-indigo-400',
      progress: 'bg-indigo-500'
    },
    pink: {
      bg: 'from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/30',
      icon: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
      text: 'text-pink-700 dark:text-pink-400',
      progress: 'bg-pink-500'
    },
    yellow: {
      bg: 'from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30',
      icon: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
      text: 'text-yellow-700 dark:text-yellow-400',
      progress: 'bg-yellow-500'
    }
  };

  const config = colorConfig[color];

  const getTrendIcon = () => {
    if (trend === 'up') {
      return <ArrowUpRight className="h-4 w-4" />;
    }
    if (trend === 'down') {
      return <ArrowDownRight className="h-4 w-4" />;
    }
    return <Activity className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
    if (trend === 'down') return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
    return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
  };

  return (
    <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${config.bg} ${className}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 dark:bg-white/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-full blur-2xl transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700" />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${config.icon} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className={`text-sm font-medium ${config.text} opacity-80`}>
                {title}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className={`text-3xl font-bold ${config.text}`}>
                  {value}
                </p>
                {subtitle && (
                  <span className={`text-sm font-medium ${config.text} opacity-70`}>
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {change !== undefined && (
            <Badge variant="outline" className={`${getTrendColor()} border font-medium`}>
              {getTrendIcon()}
              <span className="ml-1">{Math.abs(change)}%</span>
            </Badge>
          )}
        </div>

        {showProgress && target && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className={`${config.text} opacity-70`}>
                {"Progress"}
              </span>
              <span className={`font-medium ${config.text}`}>
                {progress}% {"Of"} {target}
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-white/50 dark:bg-black/20"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
