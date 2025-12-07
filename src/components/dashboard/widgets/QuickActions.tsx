import { Plus, Package, Megaphone, FileText, BarChart, Users, Tag, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  url: string;
  color: string;
  bgColor: string;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  className?: string;
}

const defaultActions: QuickAction[] = [
  {
    id: 'add-product',
    title: 'Add Product',
    description: 'Create a new product listing',
    icon: Plus,
    url: '/dashboard/products/new',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30'
  },
  {
    id: 'view-orders',
    title: 'View Orders',
    description: 'Process pending orders',
    icon: Package,
    url: '/dashboard/orders',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30'
  },
  {
    id: 'create-campaign',
    title: 'Marketing Campaign',
    description: 'Launch a new campaign',
    icon: Megaphone,
    url: '/dashboard/marketing',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30'
  },
  {
    id: 'view-analytics',
    title: 'Analytics Report',
    description: 'View store performance',
    icon: BarChart,
    url: '/dashboard/analytics',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30'
  }
];

export function QuickActions({ actions = defaultActions, className }: QuickActionsProps) {
  const { t } = useTranslation();

  return (
    <Card className={cn("border-0 shadow-sm", className)}>
      <CardHeader className="pb-4">
        <div>
          <h3 className="text-lg font-semibold">{t("Quick Actions")}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t("Frequently used actions for quick access")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => (
            <Link
              key={action.id}
              to={action.url}
              className="block"
            >
              <Button
                variant="ghost"
                className="w-full h-auto p-4 justify-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={cn(
                    "p-2 rounded-lg shrink-0 transition-transform group-hover:scale-110",
                    action.bgColor
                  )}>
                    <action.icon className={cn("h-5 w-5", action.color)} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{t(action.title)}</p>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t(action.description)}
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
        
        {/* Additional quick links */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-3"
              asChild
            >
              <Link to="/dashboard/products">
                <Tag className="h-4 w-4" />
                <span className="text-xs">{t("Products")}</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-3"
              asChild
            >
              <Link to="/dashboard/customers">
                <Users className="h-4 w-4" />
                <span className="text-xs">{t("Customers")}</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-3"
              asChild
            >
              <Link to="/dashboard/finance">
                <FileText className="h-4 w-4" />
                <span className="text-xs">{t("Finance")}</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-3"
              asChild
            >
              <Link to="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span className="text-xs">{t("Settings")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}