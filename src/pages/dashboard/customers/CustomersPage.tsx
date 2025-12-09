import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Users,
  UserPlus,
  Ban,
  TrendingUp,
  Search,
  Mail,
  ShoppingBag,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { CustomersTable, type Customer } from "@/components/customers/CustomersTable";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function CustomersPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive" | "blocked">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample customers - replace with API integration
  const customers: Customer[] = [
    {
      id: "c1",
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      phone: "+20 123 456 7890",
      avatar: "",
      orders: { total: 12, completed: 11, cancelled: 1 },
      totalSpent: 15430,
      status: "active",
      tags: ["VIP", "Repeat"],
      createdAt: "2024-01-05T10:10:00Z",
      lastOrderAt: "2024-01-15T15:20:00Z",
    },
    {
      id: "c2",
      name: "Sara Ahmed",
      email: "sara@example.com",
      phone: "+20 123 456 7891",
      orders: { total: 3, completed: 2, cancelled: 1 },
      totalSpent: 2430,
      status: "inactive",
      tags: ["New"],
      createdAt: "2024-01-07T09:00:00Z",
      lastOrderAt: "2024-01-10T12:30:00Z",
    },
    {
      id: "c3",
      name: "Omar Hassan",
      email: "omar@example.com",
      phone: "+20 123 456 7892",
      orders: { total: 7, completed: 7, cancelled: 0 },
      totalSpent: 9410,
      status: "active",
      createdAt: "2023-12-20T11:45:00Z",
      lastOrderAt: "2024-01-12T17:05:00Z",
    },
    {
      id: "c4",
      name: "Mona Ali",
      email: "mona@example.com",
      phone: "+20 123 456 7893",
      orders: { total: 1, completed: 0, cancelled: 1 },
      totalSpent: 0,
      status: "blocked",
      tags: ["Fraud"],
      createdAt: "2024-01-02T13:15:00Z",
    },
  ];

  // Derived counts
  const counts = useMemo(() => {
    const total = customers.length;
    const active = customers.filter(c => c.status === "active").length;
    const inactive = customers.filter(c => c.status === "inactive").length;
    const blocked = customers.filter(c => c.status === "blocked").length;
    return { total, active, inactive, blocked };
  }, [customers]);

  // Stats widgets (example)
  const stats = [
    {
      title: t('customers.totalCustomers'),
      value: counts.total.toString(),
      change: 6.3,
      changeType: "increase" as const,
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t('common.vsLastMonth'),
    },
    {
      title: t('customers.active'),
      value: counts.active.toString(),
      change: 3.1,
      changeType: "increase" as const,
      icon: TrendingUp,
      iconColor: "text-green-600 dark:text-green-400",
      iconBgColor: "bg-green-50 dark:bg-green-950/30",
      trend: "up" as const,
      period: t('customers.currentlyActive'),
    },
    {
      title: t('customers.inactive'),
      value: counts.inactive.toString(),
      change: -1.2,
      changeType: "decrease" as const,
      icon: Mail,
      iconColor: "text-yellow-600 dark:text-yellow-400",
      iconBgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      trend: "down" as const,
      period: t('customers.needReEngagement'),
    },
    {
      title: t('customers.blocked'),
      value: counts.blocked.toString(),
      change: 0,
      changeType: "neutral" as const,
      icon: Ban,
      iconColor: "text-red-600 dark:text-red-400",
      iconBgColor: "bg-red-50 dark:bg-red-950/30",
      trend: "stable" as const,
      period: t('customers.risk'),
    },
  ];

  // Filter and search
  const filteredCustomers = customers.filter((c) => {
    if (activeTab !== "all" && c.status !== activeTab) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (
        !c.name.toLowerCase().includes(term) &&
        !c.email.toLowerCase().includes(term) &&
        !(c.phone || "").toLowerCase().includes(term)
      ) {
        return false;
      }
    }
    return true;
  });

  // Handlers
  const handleViewCustomer = (customer: Customer) => {
    navigate(`/dashboard/customers/${customer.id}`);
  };
  const handleContactCustomer = (customer: Customer) => {
    // Implement contact flow (email/phone)
    console.log("Contact", customer.email || customer.phone);
  };
  const handleViewOrders = (customer: Customer) => {
    navigate(`/dashboard/orders?customer=${customer.id}`);
  };
  const handleBlockToggle = (customerId: string) => {
    console.log("Toggle block:", customerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('customers.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('customers.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/dashboard/orders")} className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            {t('customers.viewOrders')}
          </Button>
          <Button onClick={() => navigate("/dashboard/customers/new")} className="gap-2">
            <UserPlus className="h-4 w-4" />
            {t('customers.addCustomer')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <MetricCard
            key={i}
            title={s.title}
            value={s.value}
            change={s.change}
            changeType={s.changeType}
            icon={s.icon}
            iconColor={s.iconColor}
            iconBgColor={s.iconBgColor}
            trend={s.trend}
            period={s.period}
          />
        ))}
      </div>

      {/* Customers Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4">
            {/* Tabs + Search */}
            <div className="flex flex-col-reverse gap-3 lg:flex-row lg:items-center lg:justify-between">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "active" | "inactive" | "blocked")}>
                <TabsList className="grid grid-cols-4 w-full lg:w-auto">
                  <TabsTrigger value="all" className="gap-2">
                    {t('customers.all')}
                    <Badge variant="secondary" className="ml-1 h-5 px-1">{counts.total}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="active" className="gap-2">
                    {t('customers.active')}
                    <Badge variant="secondary" className="ml-1 h-5 px-1 bg-green-100 text-green-800">{counts.active}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="inactive" className="gap-2">
                    {t('customers.inactive')}
                    <Badge variant="secondary" className="ml-1 h-5 px-1 bg-yellow-100 text-yellow-800">{counts.inactive}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="blocked" className="gap-2">
                    {t('customers.blocked')}
                    <Badge variant="secondary" className="ml-1 h-5 px-1 bg-red-100 text-red-800">{counts.blocked}</Badge>
                  </TabsTrigger>
                </TabsList>
                {/* We only have one table below; TabsContent not switching actual content now */}
                <TabsContent value="all" />
                <TabsContent value="active" />
                <TabsContent value="inactive" />
                <TabsContent value="blocked" />
              </Tabs>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={t('customers.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CustomersTable
            customers={filteredCustomers}
            onViewCustomer={handleViewCustomer}
            onContactCustomer={handleContactCustomer}
            onViewOrders={handleViewOrders}
            onBlockCustomer={handleBlockToggle}
          />
        </CardContent>
      </Card>
    </div>
  );
}