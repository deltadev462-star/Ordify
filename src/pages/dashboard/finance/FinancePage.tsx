import { Link } from "react-router-dom";
import {
  Wallet as WalletIcon,
  ArrowLeftRight,
  DollarSign,
  Banknote,
  TrendingUp,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FinancePage() {
  const kpis = [
    {
      title: "Current  Balance",
      value: "12,430",
      change: 5.3,
      changeType: "increase" as const,
      icon: WalletIcon,
      iconColor: "text-green-600 dark:text-green-400",
      iconBgColor: "bg-green-50 dark:bg-green-950/30",
      trend: "up" as const,
      period: "Vs last week",
      subValue: "E G P",
    },
    {
      title: "Payouts this month",
      value: "32,900",
      change: -2.1,
      changeType: "decrease" as const,
      icon: Banknote,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "down" as const,
      period: "Vs last month",
      subValue: "E G P",
    },
    {
      title: "Total  Transactions",
      value: "563",
      change: 12.4,
      changeType: "increase" as const,
      icon: ArrowLeftRight,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "up" as const,
      period: "Vs last month",
    },
    {
      title: "Average  Order  Value",
      value: "367",
      change: 1.8,
      changeType: "increase" as const,
      icon: DollarSign,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBgColor: "bg-orange-50 dark:bg-orange-950/30",
      trend: "up" as const,
      period: "Rolling 30 days",
      subValue: "E G P",
    },
  ];

  const quickLinks = [
    {
      title: "Wallet  Overview",
      desc: "View balance and manage funds",
      to: "/dashboard/wallet",
      icon: WalletIcon,
    },
    {
      title: "Transactions",
      desc: "Browse and export history",
      to: "/dashboard/finance/transactions",
      icon: ArrowLeftRight,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{"Financial  Center"}</h1>
        <p className="text-muted-foreground mt-1">
          {"Monitor balances"}
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
            subValue={k.subValue}
          />
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {"Quick  Financial  Actions"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {"Jump directly to your most used finance tools"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((q) => (
              <Link key={q.to} to={q.to} className="block">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex items-start gap-4">
                    <q.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{q.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{q.desc}</p>
                      <Button variant="link" className="mt-2 px-0">
                        {"Open"}
                      </Button>
                    </div>
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