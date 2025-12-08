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
      name: "VIP Customers",
      description: "High-value customers with 10+ orders",
      icon: Crown,
      color: "text-purple-600",
      bgGradient: "from-purple-500/20 via-purple-400/10 to-pink-500/20",
      customerCount: 245,
      avgOrderValue: 2450,
      totalRevenue: 599250,
      growth: 12.5,
      conditions: [
        { type: "Total Orders", value: "10+" },
        { type: "Total Spent", value: "5000+ EGP" }
      ],
      lastUpdated: "2024-01-15T10:00:00Z",
      status: "active"
    },
    {
      id: "2", 
      name: "New Customers",
      description: "First-time buyers in the last 30 days",
      icon: Star,
      color: "text-blue-600",
      bgGradient: "from-blue-500/20 via-blue-400/10 to-cyan-500/20",
      customerCount: 482,
      avgOrderValue: 850,
      totalRevenue: 409700,
      growth: 25.3,
      conditions: [
        { type: "Registration Date", value: "Last 30 days" },
        { type: "Total Orders", value: "1" }
      ],
      lastUpdated: "2024-01-15T10:00:00Z",
      status: "active"
    },
    {
      id: "3",
      name: "Repeat Buyers",
      description: "Customers with multiple purchases",
      icon: Award,
      color: "text-green-600",
      bgGradient: "from-green-500/20 via-green-400/10 to-emerald-500/20",
      customerCount: 892,
      avgOrderValue: 1350,
      totalRevenue: 1204200,
      growth: 8.7,
      conditions: [
        { type: "Total Orders", value: "2-9" },
        { type: "Last Order", value: "Within 60 days" }
      ],
      lastUpdated: "2024-01-15T10:00:00Z",
      status: "active"
    },
    {
      id: "4",
      name: "At Risk",
      description: "Haven't ordered in 90+ days",
      icon: Clock,
      color: "text-orange-600",
      bgGradient: "from-orange-500/20 via-orange-400/10 to-yellow-500/20",
      customerCount: 156,
      avgOrderValue: 1100,
      totalRevenue: 171600,
      growth: -5.2,
      conditions: [
        { type: "Last Order", value: "90+ days ago" },
        { type: "Total Orders", value: "2+" }
      ],
      lastUpdated: "2024-01-15T10:00:00Z",
      status: "active"
    },
  ];

  // Statistics
  const stats = [
    {
      title: t("Total Segments"),
      value: segments.length.toString(),
      change: 2,
      changeType: "increase" as const,
      icon: Target,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "up" as const,
      period: t("vs last month"),
    },
    {
      title: t("Active Segments"),
      value: segments.filter(s => s.status === "active").length.toString(),
      change: 1,
      changeType: "increase" as const,
      icon: Zap,
      iconColor: "text-green-600 dark:text-green-400", 
      iconBgColor: "bg-green-50 dark:bg-green-950/30",
      trend: "up" as const,
      period: t("currently active"),
    },
    {
      title: t("Total Customers"),
      value: segments.reduce((sum, s) => sum + s.customerCount, 0).toLocaleString(),
      change: 15.3,
      changeType: "increase" as const,
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("segmented customers"),
    },
    {
      title: t("Revenue from Segments"),
      value: `${(segments.reduce((sum, s) => sum + s.totalRevenue, 0) / 1000).toFixed(0)}K`,
      change: 22.8,
      changeType: "increase" as const,
      icon: ShoppingBag,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      trend: "up" as const,
      period: t("total revenue"),
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
          <h1 className="text-2xl font-bold">{t("Customer Segments")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("Create and manage customer segments for targeted marketing")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            {t("Filter")}
          </Button>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                <Plus className="h-4 w-4" />
                {t("Create Segment")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{t("Create New Segment")}</DialogTitle>
                <DialogDescription>
                  {t("Define conditions to automatically group customers")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("Segment Name")}</Label>
                  <Input id="name" placeholder={t("e.g., High Value Customers")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t("Description")}</Label>
                  <Input id="description" placeholder={t("Describe this segment...")} />
                </div>
                <div className="space-y-2">
                  <Label>{t("Conditions")}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select condition type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orders">{t("Total Orders")}</SelectItem>
                      <SelectItem value="spent">{t("Total Spent")}</SelectItem>
                      <SelectItem value="lastorder">{t("Last Order Date")}</SelectItem>
                      <SelectItem value="registration">{t("Registration Date")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  {t("Cancel")}
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  {t("Create Segment")}
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
                  <TabsTrigger value="all">{t("All Segments")}</TabsTrigger>
                  <TabsTrigger value="active">{t("Active")}</TabsTrigger>
                  <TabsTrigger value="inactive">{t("Inactive")}</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative max-w-md">
                <Input
                  placeholder={t("Search segments...")}
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
                          <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewCustomers(segment.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            {t("View Customers")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendMessage(segment.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            {t("Send Message")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("Edit Segment")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(segment.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            {t("Duplicate")}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(segment.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("Delete")}
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
                        <p className="text-sm text-muted-foreground">{t("customers")}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <TrendingUp className={`h-4 w-4 ${segment.growth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                          <span className={`text-sm font-medium ${segment.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {segment.growth >= 0 ? '+' : ''}{segment.growth}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t("growth")}</p>
                      </div>
                    </div>

                    {/* Revenue info */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-white/60 dark:bg-gray-900/60">
                        <p className="text-xs text-muted-foreground">{t("Avg Order")}</p>
                        <p className="text-sm font-semibold">{t("EGP")} {segment.avgOrderValue.toLocaleString()}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/60 dark:bg-gray-900/60">
                        <p className="text-xs text-muted-foreground">{t("Total Revenue")}</p>
                        <p className="text-sm font-semibold">{t("EGP")} {(segment.totalRevenue / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    {/* Conditions */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("Conditions")}</p>
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
                        {t(segment.status)}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {t("Updated")} {new Date(segment.lastUpdated).toLocaleDateString()}
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