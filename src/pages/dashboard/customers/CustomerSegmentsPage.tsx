import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Target,
  Plus,
  Filter,
  MoreVertical,
  TrendingUp,
  Clock,
  ShoppingBag,
  Award,
  Crown,
  Star,
  Zap,
  Edit,
  Copy,
  Trash2,
  Eye,
  Send,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
 
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs,   TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Segment {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  customerCount: number;
  avgOrderValue: number;
  totalRevenue: number;
  growth: number;
  conditions: {
    type: string;
    value: string | number;
  }[];
  lastUpdated: string;
  status: 'active' | 'inactive';
}

export default function CustomerSegmentsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Sample segments data
  const segments: Segment[] = [
    {
      id: "1",
      name: t("customerSegments.vipCustomers"),
      description: t("customerSegments.highValueCustomers"),
      icon: Crown,
      color: "text-purple-600",
      bgGradient: "from-purple-500/20 via-purple-400/10 to-pink-500/20",
      customerCount: 245,
      avgOrderValue: 2450,
      totalRevenue: 599250,
      growth: 12.5,
      conditions: [
        { type: t("customerSegments.totalOrders"), value: t("customerSegments.tenPlusOrders") },
        { type: t("customerSegments.totalSpent"), value: t("customerSegments.fiveThousandPlusEGP") }
      ],
      lastUpdated: "2024-01-15T10:00:00Z",
      status: "active"
    },
    {
      id: "2",
      name: t("customerSegments.newCustomers"),
      description: t("customerSegments.firstTimeBuyers"),
      icon: Star,
      color: "text-blue-600",
      bgGradient: "from-blue-500/20 via-blue-400/10 to-cyan-500/20",
      customerCount: 482,
      avgOrderValue: 850,
      totalRevenue: 409700,
      growth: 25.3,
      conditions: [
        { type: t("customerSegments.registrationDate"), value: t("customerSegments.last30Days") },
        { type: t("customerSegments.totalOrders"), value: t("customerSegments.one") }
      ],
      lastUpdated: "2024-01-15T10:00:00Z",
      status: "active"
    },
    {
      id: "3",
      name: t("customerSegments.repeatBuyers"),
      description: t("customerSegments.customersWithMultiplePurchases"),
      icon: Award,
      color: "text-green-600",
      bgGradient: "from-green-500/20 via-green-400/10 to-emerald-500/20",
      customerCount: 892,
      avgOrderValue: 1350,
      totalRevenue: 1204200,
      growth: 8.7,
      conditions: [
        { type: t("customerSegments.totalOrders"), value: t("customerSegments.twoToNine") },
        { type: t("customerSegments.lastOrderDate"), value: t("customerSegments.within60Days") }
      ],
      lastUpdated: "2024-01-15T10:00:00Z",
      status: "active"
    },
    {
      id: "4",
      name: t("customerSegments.atRisk"),
      description: t("customerSegments.haventOrderedIn90Days"),
      icon: Clock,
      color: "text-orange-600",
      bgGradient: "from-orange-500/20 via-orange-400/10 to-yellow-500/20",
      customerCount: 156,
      avgOrderValue: 1100,
      totalRevenue: 171600,
      growth: -5.2,
      conditions: [
        { type: t("customerSegments.lastOrderDate"), value: t("customerSegments.ninetyPlusDaysAgo") },
        { type: t("customerSegments.totalOrders"), value: t("customerSegments.twoPlusOrders") }
      ],
      lastUpdated: "2024-01-15T10:00:00Z",
      status: "active"
    },
  ];

  // Statistics
  const stats = [
    {
      title: t("customerSegments.totalSegments"),
      value: segments.length.toString(),
      change: 2,
      changeType: "increase" as const,
      icon: Target,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "up" as const,
      period: t("customerSegments.vsLastMonth"),
    },
    {
      title: t("customerSegments.activeSegments"),
      value: segments.filter(s => s.status === "active").length.toString(),
      change: 1,
      changeType: "increase" as const,
      icon: Zap,
      iconColor: "text-green-600 dark:text-green-400",
      iconBgColor: "bg-green-50 dark:bg-green-950/30",
      trend: "up" as const,
      period: t("customerSegments.currentlyActive"),
    },
    {
      title: t("customerSegments.totalCustomers"),
      value: segments.reduce((sum, s) => sum + s.customerCount, 0).toLocaleString(),
      change: 15.3,
      changeType: "increase" as const,
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("customerSegments.segmentedCustomers"),
    },
    {
      title: t("customerSegments.revenueFromSegments"),
      value: `${(segments.reduce((sum, s) => sum + s.totalRevenue, 0) / 1000).toFixed(0)}K`,
      change: 22.8,
      changeType: "increase" as const,
      icon: ShoppingBag,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      trend: "up" as const,
      period: t("customerSegments.totalRevenue"),
    },
  ];

  const filteredSegments = segments.filter(segment => {
    if (selectedTab !== "all" && segment.status !== selectedTab) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return segment.name.toLowerCase().includes(term) || 
             segment.description.toLowerCase().includes(term);
    }
    return true;
  });

  const handleDuplicate = (segmentId: string) => {
    console.log("Duplicate segment:", segmentId);
  };

  const handleDelete = (segmentId: string) => {
    console.log("Delete segment:", segmentId);
  };

  const handleViewCustomers = (segmentId: string) => {
    navigate(`/dashboard/customers?segment=${segmentId}`);
  };

  const handleSendMessage = (segmentId: string) => {
    navigate(`/dashboard/customers/messages?segment=${segmentId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("customerSegments.title")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("customerSegments.subtitle")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            {t("customerSegments.filter")}
          </Button>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                <Plus className="h-4 w-4" />
                {t("customerSegments.createSegment")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{t("customerSegments.createNewSegment")}</DialogTitle>
                <DialogDescription>
                  {t("customerSegments.defineConditions")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("customerSegments.segmentName")}</Label>
                  <Input id="name" placeholder="" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t("customerSegments.description")}</Label>
                  <Input id="description" placeholder="" />
                </div>
                <div className="space-y-2">
                  <Label>{t("customerSegments.conditions")}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("customerSegments.selectConditionType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orders">{t("customerSegments.totalOrders")}</SelectItem>
                      <SelectItem value="spent">{t("customerSegments.totalSpent")}</SelectItem>
                      <SelectItem value="lastorder">{t("customerSegments.lastOrderDate")}</SelectItem>
                      <SelectItem value="registration">{t("customerSegments.registrationDate")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  {t("customerSegments.cancel")}
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  {t("customerSegments.createSegment")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <MetricCard
            key={i}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBgColor={stat.iconBgColor}
            trend={stat.trend}
            period={stat.period}
          />
        ))}
      </div>

      {/* Segments Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col-reverse gap-3 lg:flex-row lg:items-center lg:justify-between">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="all">{t("customerSegments.allSegments")}</TabsTrigger>
                  <TabsTrigger value="active">{t("customerSegments.active")}</TabsTrigger>
                  <TabsTrigger value="inactive">{t("customerSegments.inactive")}</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative max-w-md">
                <Input
                  placeholder={t("customerSegments.searchSegments")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredSegments.map((segment) => {
              const Icon = segment.icon;
              return (
                <Card 
                  key={segment.id} 
                  className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${segment.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-white/80 dark:bg-gray-900/80 ${segment.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{segment.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {segment.description}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t("customerSegments.actions")}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewCustomers(segment.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            {t("customerSegments.viewCustomers")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendMessage(segment.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            {t("customerSegments.sendMessage")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("customerSegments.editSegment")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(segment.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            {t("customerSegments.duplicate")}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(segment.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("customerSegments.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    {/* Customer count and growth */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">{segment.customerCount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{t("customerSegments.customers")}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <TrendingUp className={`h-4 w-4 ${segment.growth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                          <span className={`text-sm font-medium ${segment.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {segment.growth >= 0 ? '+' : ''}{segment.growth}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t("customerSegments.growth")}</p>
                      </div>
                    </div>

                    {/* Revenue info */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-white/60 dark:bg-gray-900/60">
                        <p className="text-xs text-muted-foreground">{t("customerSegments.avgOrder")}</p>
                        <p className="text-sm font-semibold">{t("common.egp")} {segment.avgOrderValue.toLocaleString()}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/60 dark:bg-gray-900/60">
                        <p className="text-xs text-muted-foreground">{t("customerSegments.totalRevenue")}</p>
                        <p className="text-sm font-semibold">{t("common.egp")} {(segment.totalRevenue / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    {/* Conditions */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("customerSegments.conditions")}</p>
                      <div className="flex flex-wrap gap-1">
                        {segment.conditions.map((condition, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {condition.type}: {condition.value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center justify-between pt-2">
                      <Badge 
                        variant={segment.status === 'active' ? 'default' : 'secondary'}
                        className={segment.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                      >
                        {segment.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {t("customerSegments.updated")} {new Date(segment.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}