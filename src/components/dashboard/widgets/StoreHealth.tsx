import { CheckCircle, AlertCircle, XCircle, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export interface HealthItem {
  id: string;
  title: string;
  status: 'good' | 'warning' | 'error';
  message: string;
  action?: {
    label: string;
    url: string;
  };
}

interface StoreHealthProps {
  setupProgress: number;
  healthScore: number;
  healthItems: HealthItem[];
  onViewDetails?: () => void;
}

export function StoreHealth({ 
  setupProgress, 
  healthScore, 
  healthItems,
  onViewDetails 
}: StoreHealthProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getHealthLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs  Attention";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-50 dark:bg-green-950/30';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-950/30';
      case 'error':
        return 'bg-red-50 dark:bg-red-950/30';
      default:
        return 'bg-gray-50 dark:bg-gray-950/30';
    }
  };

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{"Store  Health"}</h3>
              <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80">
                <Sparkles className="h-3 w-3 mr-1" />
                {"Pro  Tips"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {"Your store's performance and setup status"}
            </p>
          </div>
          <div className="text-right">
            <p className={cn("text-2xl font-bold", getHealthColor(healthScore))}>
              {healthScore}%
            </p>
            <p className="text-xs text-muted-foreground">
              {getHealthLabel(healthScore)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Setup Progress */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{"Store  Setup  Progress"}</p>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {setupProgress}%
            </span>
          </div>
          <Progress value={setupProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {"Complete your store setup to unlock all features"}
          </p>
        </div>

        {/* Health Items */}
        <div className="space-y-3">
          <p className="text-sm font-medium mb-2">{"Action  Items"}</p>
          {healthItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-3 rounded-lg",
                getStatusBg(item.status)
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.message}
                  </p>
                  {item.action && (
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 mt-2 text-xs"
                      asChild
                    >
                      <Link to={item.action.url}>
                        {item.action.label}
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Details Button */}
        {onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4"
            onClick={onViewDetails}
          >
            {"View  Detailed  Report"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}