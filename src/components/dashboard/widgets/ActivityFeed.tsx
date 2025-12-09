import { Package, Users, CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export interface ActivityItem {
  id: string;
  type: 'order' | 'user' | 'payment' | 'alert';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'pending' | 'failed' | 'info';
  link?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  onViewAll?: () => void;
}

export function ActivityFeed({ activities, onViewAll }: ActivityFeedProps) {
  const getActivityIcon = (type: string, status: string) => {
    const iconClass = cn(
      "h-5 w-5",
      status === 'success' ? "text-green-600 dark:text-green-400" :
      status === 'pending' ? "text-yellow-600 dark:text-yellow-400" :
      status === 'failed' ? "text-red-600 dark:text-red-400" :
      "text-blue-600 dark:text-blue-400"
    );

    switch(type) {
      case 'order': return <Package className={iconClass} />;
      case 'user': return <Users className={iconClass} />;
      case 'payment': return <CreditCard className={iconClass} />;
      case 'alert': return <AlertCircle className={iconClass} />;
      default: return <CheckCircle className={iconClass} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = 
      status === 'success' ? 'default' :
      status === 'pending' ? 'secondary' :
      status === 'failed' ? 'destructive' :
      'outline';

    return (
      <Badge variant={variant} className="ml-auto">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getActivityBg = (status: string) => {
    return cn(
      "p-2 rounded-lg",
      status === 'success' ? "bg-green-50 dark:bg-green-950/30" :
      status === 'pending' ? "bg-yellow-50 dark:bg-yellow-950/30" :
      status === 'failed' ? "bg-red-50 dark:bg-red-950/30" :
      "bg-blue-50 dark:bg-blue-950/30"
    );
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{"Recent  Activity"}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {"Track your store's latest activities"}
            </p>
          </div>
          {onViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              {"View  All"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{"No recent activity"}</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className={getActivityBg(activity.status)}>
                {getActivityIcon(activity.type, activity.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                  </div>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {activity.time}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}