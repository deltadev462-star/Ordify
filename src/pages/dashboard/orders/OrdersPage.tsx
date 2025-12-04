import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { subNavigationData } from "@/data/sidebar-data";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  XCircle,
  Ban,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Stats card component matching CardTotal style
function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
  progress,
  total,
}: {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  icon: React.ElementType;
  color: string;
  progress?: number;
  total?: string;
}) {
  const { t } = useTranslation();

  const colorConfig = {
    blue: "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30",
    green:
      "from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30",
    orange:
      "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30",
    red: "from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30",
    purple:
      "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30",
  };

  const iconConfig = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    red: "bg-red-500/10 text-red-600 dark:text-red-400",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  };

  return (
    <Card
      className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${
        colorConfig[color as keyof typeof colorConfig]
      }`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/20 dark:bg-white/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />

      <CardContent className="relative p-4 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`p-2.5 sm:p-3 rounded-xl ${
                iconConfig[color as keyof typeof iconConfig]
              } group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                {t(title)}
              </p>
              <p className="text-xl sm:text-2xl font-bold mt-0.5 sm:mt-1">{value}</p>
            </div>
          </div>

          {change !== undefined && (
            <Badge
              variant="outline"
              className={cn(
                "font-medium",
                trend === "up"
                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                  : "bg-red-500/10 text-red-600 border-red-500/20"
              )}
            >
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(change)}%
            </Badge>
          )}
        </div>

        {progress !== undefined && total && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{t("Progress")}</span>
              <span className="font-medium">
                {progress}% {t("of")} {total}
              </span>
            </div>
            <Progress
              value={progress}
              className="h-1.5 bg-white/50 dark:bg-black/20"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function OrdersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const ordersNav = subNavigationData.orders;

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-float-slow" />
        <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 dark:bg-yellow-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-float-medium" />
        <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-float-fast" />
      </div>

      <div className="w-full max-w-[1600px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 space-y-6 sm:space-y-8 relative">
        {/* Page Header with gradient text */}
        <div className="animate-fade-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {ordersNav.title}
          </h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
            {ordersNav.description}
          </p>
        </div>

        {/* Quick Stats Section */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <StatsCard
            title="Total Orders"
            value="1,234"
            change={12.5}
            trend="up"
            icon={Package}
            color="blue"
            progress={82}
            total="1,500"
          />
          <StatsCard
            title="Pending Orders"
            value="42"
            change={-8.3}
            trend="down"
            icon={Clock}
            color="orange"
            progress={28}
            total="150"
          />
          <StatsCard
            title="Missed Orders"
            value="8"
            change={-25}
            trend="down"
            icon={XCircle}
            color="red"
          />
          <StatsCard
            title="Blocked Numbers"
            value="156"
            change={5.2}
            trend="up"
            icon={Ban}
            color="purple"
          />
        </div>

        {/* Sub-navigation Grid with modern glassmorphic styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-3 lg:gap-5 mt-8 sm:mt-10 pb-6 sm:pb-8">
          {ordersNav.items.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;

            return (
             <div
               key={item.title}
               className="animate-fade-up relative h-full"
               style={{ animationDelay: `${(index + 2) * 0.1}s` }}
             >
               {/* Outer glow container */}
               <div className="relative h-full group">
                 {/* Dynamic glow backdrop */}
                 <div className={cn(
                   "absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700",
                   "bg-gradient-to-r from-primary/30 via-purple-500/20 to-pink-500/20 blur-2xl",
                   isActive && "opacity-60 from-primary/40 to-primary/30"
                 )} />
                 
                 {/* Card container with glass effect */}
                 <Card
                   className={cn(
                     "relative h-full cursor-pointer overflow-hidden flex flex-col min-h-[220px] sm:min-h-[240px]",
                     "transition-all duration-700 ease-out",
                     // Glass morphism base
                     "bg-white/60 dark:bg-gray-900/30",
                     "backdrop-blur-2xl backdrop-saturate-200",
                     "border border-white/20 dark:border-white/10",
                     // Shadow and depth
                     "shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
                     // Hover states
                     "hover:bg-white/80 dark:hover:bg-gray-900/50",
                     "hover:border-white/30 dark:hover:border-white/20",
                     "hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
                     "hover:scale-[1.03] hover:-translate-y-2",
                     // Active states
                     isActive && [
                       "bg-white/90 dark:bg-gray-900/60",
                       "border-primary/40 dark:border-primary/30",
                       "shadow-[0_20px_50px_rgba(var(--primary),0.2)]",
                       "scale-[1.01] -translate-y-1"
                     ]
                   )}
                   onClick={() => navigate(item.url)}
                 >
                   {/* Animated mesh gradient overlay */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none">
                     {/* Top gradient */}
                     <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                     
                     {/* Floating orbs */}
                     <div className="absolute top-1/4 -right-1/4 w-64 h-64 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl animate-float-slow" />
                     <div className="absolute -bottom-1/4 -left-1/4 w-48 h-48 bg-gradient-radial from-purple-500/15 to-transparent rounded-full blur-3xl animate-float-delayed" />
                     
                     {/* Shimmer effect */}
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                     </div>
                   </div>

                    <CardHeader className="relative z-10 p-4 sm:p-5 lg:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 sm:gap-4">
                          {Icon && (
                            <div className="relative">
                              {/* Magnetic hover effect container */}
                              <div className="relative group/icon">
                                {/* Pulsing glow ring */}
                                <div className={cn(
                                  "absolute inset-0 rounded-2xl transition-all duration-500",
                                  isActive && "animate-pulse"
                                )}>
                                  <div className={cn(
                                    "absolute inset-0 rounded-2xl blur-xl",
                                    "bg-gradient-to-br from-primary/40 via-purple-500/30 to-pink-500/20",
                                    "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-125",
                                    "transition-all duration-700",
                                    isActive && "opacity-60 scale-110"
                                  )} />
                                </div>
                                
                                {/* Icon glass container */}
                                <div className={cn(
                                  "relative overflow-hidden",
                                  "p-3 sm:p-3.5 lg:p-4 rounded-2xl",
                                  "transition-all duration-500",
                                  "transform-gpu group-hover:scale-110 group-hover:rotate-3",
                                  // Glass effect
                                  "bg-gradient-to-br backdrop-blur-md",
                                  isActive ? [
                                    "from-primary/90 to-primary/70",
                                    "shadow-[0_12px_32px_-8px_rgba(var(--primary),0.4)]",
                                    "text-white"
                                  ] : [
                                    "from-white/80 to-white/60 dark:from-gray-800/50 dark:to-gray-900/50",
                                    "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]",
                                    "text-gray-700 dark:text-gray-300",
                                    "group-hover:from-primary/80 group-hover:to-primary/60",
                                    "group-hover:text-white",
                                    "group-hover:shadow-[0_12px_32px_-8px_rgba(var(--primary),0.3)]"
                                  ]
                                )}>
                                  <Icon className="h-5 w-5 sm:h-5 sm:w-5 lg:h-6 lg:w-6 relative z-10" />
                                  
                                  {/* Inner glass shine */}
                                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        
                          <div className="flex-1 min-w-0">
                            <CardTitle className={cn(
                              "text-base sm:text-lg lg:text-xl font-bold",
                              "transition-all duration-500",
                              "line-clamp-1",
                              isActive ? [
                                "bg-gradient-to-r from-primary via-primary/80 to-primary/60",
                                "bg-clip-text text-transparent"
                              ] : [
                                "bg-gradient-to-r from-gray-900 to-gray-700",
                                "dark:from-gray-100 dark:to-gray-300",
                                "bg-clip-text text-transparent",
                                "group-hover:from-primary group-hover:via-primary/80 group-hover:to-primary/60"
                              ]
                            )}>
                              {item.title}
                            </CardTitle>
                            
                            {/* Modern status indicator */}
                            <div className="flex items-center gap-2 mt-2">
                              <div className="relative flex items-center">
                                <div className={cn(
                                  "w-2 h-2 rounded-full",
                                  "transition-all duration-500",
                                  isActive ? [
                                    "bg-green-500",
                                    "shadow-[0_0_0_4px_rgba(34,197,94,0.2)]"
                                  ] : [
                                    "bg-gray-400 dark:bg-gray-600",
                                    "group-hover:bg-primary",
                                    "group-hover:shadow-[0_0_0_4px_rgba(var(--primary),0.2)]"
                                  ]
                                )} />
                                {isActive && (
                                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                )}
                              </div>
                              <span className={cn(
                                "text-[11px] sm:text-xs font-medium",
                                "transition-colors duration-300",
                                isActive
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-gray-500 dark:text-gray-400 group-hover:text-primary"
                              )}>
                                {isActive ? "Currently Active" : "Ready to Use"}
                              </span>
                            </div>
                          </div>
                      </div>
                      
                        {/* Modern floating badge */}
                        <div className="relative">
                          <Badge
                            variant="outline"
                            className={cn(
                              "relative overflow-hidden",
                              "border-0 font-medium",
                              "text-[10px] sm:text-xs",
                              "px-2.5 sm:px-3 py-1 sm:py-1.5",
                              "transition-all duration-500",
                              "backdrop-blur-md",
                              isActive ? [
                                "bg-gradient-to-r from-primary/25 via-primary/20 to-primary/15",
                                "text-primary shadow-[0_4px_16px_rgba(var(--primary),0.2)]"
                              ] : [
                                "bg-gradient-to-r from-white/60 to-white/40",
                                "dark:from-gray-800/60 dark:to-gray-900/40",
                                "text-gray-600 dark:text-gray-300",
                                "shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
                                "group-hover:from-primary/20 group-hover:to-primary/10",
                                "group-hover:text-primary",
                                "group-hover:shadow-[0_4px_16px_rgba(var(--primary),0.15)]"
                              ]
                            )}
                          >
                            <span className="relative z-10">
                              {isActive ? "Active" : "New"}
                            </span>
                            {/* Badge shimmer */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                          </Badge>
                        </div>
                    </div>
                  </CardHeader>

                    <CardContent className="relative z-10 flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 pt-0 pb-4 sm:pb-6 grow">
                      <CardDescription className={cn(
                        "text-xs sm:text-sm leading-relaxed",
                        "transition-colors duration-500",
                        "text-gray-600 dark:text-gray-400",
                        "group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      )}>
                        {item.description}
                      </CardDescription>

                      {/* Modern interactive stats preview */}
                      <div className={cn(
                        "relative overflow-hidden",
                        "p-3 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl",
                        "transition-all duration-500",
                        // Glass effect
                        "bg-gradient-to-br backdrop-blur-sm",
                        "from-gray-50/40 to-gray-100/40",
                        "dark:from-gray-800/20 dark:to-gray-900/20",
                        "border border-gray-200/40 dark:border-gray-700/30",
                        // Hover effects
                        "group-hover:from-primary/5 group-hover:to-primary/10",
                        "group-hover:border-primary/30",
                        "group-hover:shadow-[inset_0_1px_2px_rgba(var(--primary),0.1)]"
                      )}>
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                        </div>
                        
                        <div className="relative flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className={cn(
                              "relative group/activity",
                              "w-9 h-9 sm:w-10 sm:h-10 rounded-xl",
                              "flex items-center justify-center",
                              "transition-all duration-500",
                              "bg-gradient-to-br backdrop-blur-sm",
                              isActive ? [
                                "from-primary/20 to-primary/10",
                                "shadow-[0_4px_12px_rgba(var(--primary),0.15)]"
                              ] : [
                                "from-gray-100/60 to-gray-200/60",
                                "dark:from-gray-700/40 dark:to-gray-800/40",
                                "group-hover:from-primary/20 group-hover:to-primary/10",
                                "group-hover:shadow-[0_4px_12px_rgba(var(--primary),0.1)]"
                              ]
                            )}>
                              <Activity className={cn(
                                "h-4 w-4 sm:h-5 sm:w-5",
                                "transition-all duration-500",
                                isActive ? "text-primary" : "text-gray-600 dark:text-gray-400",
                                "group-hover:text-primary group-hover:scale-110"
                              )} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
                                Last Activity
                              </p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                                2 minutes ago
                              </p>
                            </div>
                          </div>
                          
                          <div className={cn(
                            "p-2 rounded-lg",
                            "transition-all duration-500",
                            "group-hover:bg-primary/5"
                          )}>
                            <ArrowRight className={cn(
                              "h-4 w-4 sm:h-5 sm:w-5",
                              "transition-all duration-500",
                              "text-gray-400 dark:text-gray-500",
                              "group-hover:text-primary",
                              "group-hover:translate-x-1 group-hover:scale-110",
                              isActive && "text-primary translate-x-0.5"
                            )} />
                          </div>
                        </div>
                      </div>

                      {/* Modern action button */}
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full relative overflow-hidden",
                          "transition-all duration-500",
                          "border backdrop-blur-md",
                          "hover:scale-[1.02] active:scale-[0.98]",
                          "group/btn",
                          isActive ? [
                            "bg-gradient-to-r from-primary to-primary/90",
                            "text-white border-primary/50",
                            "shadow-[0_4px_20px_rgba(var(--primary),0.3)]",
                            "hover:from-primary/90 hover:to-primary/80",
                            "hover:shadow-[0_6px_24px_rgba(var(--primary),0.4)]"
                          ] : [
                            "bg-white/40 dark:bg-gray-800/40",
                            "border-gray-200/40 dark:border-gray-700/40",
                            "hover:bg-gradient-to-r hover:from-primary/90 hover:to-primary",
                            "hover:border-primary/50 hover:text-white",
                            "hover:shadow-[0_4px_20px_rgba(var(--primary),0.25)]"
                          ]
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(item.url);
                        }}
                      >
                        {/* Multi-layer shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm">
                          {isActive ? t("Currently Viewing") : t("Open Dashboard")}
                          <ArrowUpRight className={cn(
                            "h-3 w-3 sm:h-3.5 sm:w-3.5",
                            "transition-all duration-500",
                            "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
                            "group-hover/btn:scale-125"
                          )} />
                        </span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div
          className="text-center text-xs sm:text-sm text-muted-foreground mt-8 sm:mt-12 animate-fade-up px-4"
          style={{ animationDelay: "0.5s" }}
        >
          <p>
            Need help? Check out our{" "}
            <a href="#" className="text-primary hover:underline">
              Orders Guide
            </a>{" "}
            or contact support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
