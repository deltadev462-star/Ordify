import { useTranslation } from "react-i18next";
import { BarChart3, Users, ShoppingCart, Target, PieChart } from "lucide-react";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AnalyticsPage() {
  const { t } = useTranslation();

  const kpis = [
    {
      title: t("Total Revenue"),
      value: "EGP 245,900",
      change: 12.4,
      changeType: "increase" as const,
      icon: BarChart3,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("vs last month"),
    },
    {
      title: t("Orders"),
      value: "1,284",
      change: 6.2,
      changeType: "increase" as const,
      icon: ShoppingCart,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      trend: "up" as const,
      period: t("vs last month"),
    },
    {
      title: t("Customers"),
      value: "6,421",
      change: 3.1,
      changeType: "increase" as const,
      icon: Users,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "up" as const,
      period: t("vs last month"),
    },
    {
      title: t("Conversion Rate"),
      value: "3.8%",
      change: -0.4,
      changeType: "decrease" as const,
      icon: Target,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBgColor: "bg-orange-50 dark:bg-orange-950/30",
      trend: "down" as const,
      period: t("vs last month"),
    },
  ];

  const sections = [
    { title: t("Sales Analytics"), desc: t("Revenue, orders, AOV and trends"), to: "/dashboard/analytics/sales" },
    { title: t("Customer Analytics"), desc: t("Segments, retention, LTV and cohorts"), to: "/dashboard/analytics/customers" },
    { title: t("Product Performance"), desc: t("Top products, categories and inventory"), to: "/dashboard/analytics/products" },
    { title: t("Marketing Analytics"), desc: t("Campaign performance and attribution"), to: "/dashboard/analytics/marketing" },
    { title: t("Custom Reports"), desc: t("Build and export tailored reports"), to: "/dashboard/analytics/custom" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("Analytics & Reports")}</h1>
        <p className="text-muted-foreground mt-1">
          {t("Track key metrics, visualize performance and export insights")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <MetricCard
            key={i}
            title={k.title}
            value={k.value}
            change={k.change}
            changeType={k.changeType}
            icon={k.icon}
            iconColor={k.iconColor}
            iconBgColor={k.iconBgColor}
            trend={k.trend}
            period={k.period}
          />
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            {t("Explore Analytics Sections")}
          </h3>
          <p className="text-sm text-muted-foreground">{t("Deep-dive into specific areas of your store")}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sections.map((s) => (
              <Link key={s.to} to={s.to} className="block">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <h4 className="font-semibold">{s.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                    <Button variant="link" className="mt-2 px-0">
                      {t("Open")}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}