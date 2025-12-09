import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Target,
  TrendingUp,
  Users,
  MousePointer,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  BarChart3,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Settings,
  PlayCircle,
  PauseCircle,
  Zap,
  Clock,
  DollarSign,
  ShoppingCart,
  UserPlus,
  RotateCw,
  Activity,
  Calendar,
  ChevronDown
} from "lucide-react";
import Title from "@/components/Title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RetargetingCampaign {
  id: string;
  name: string;
  type: "abandoned-cart" | "browse-abandonment" | "post-purchase" | "win-back";
  audience: string;
  audienceSize: number;
  channels: string[];
  status: "active" | "paused" | "scheduled" | "draft";
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
}

interface AudienceSegment {
  id: string;
  name: string;
  type: string;
  size: number;
  growth: number;
  engagement: number;
  value: number;
  icon: string;
  color: string;
}

function Retargeting() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTab, setSelectedTab] = useState("campaigns");

  // Mock data
  const campaigns: RetargetingCampaign[] = [
    {
      id: "1",
      name: "Abandoned Cart Recovery",
      type: "abandoned-cart",
      audience: "Cart Abandoners (24h)",
      audienceSize: 1245,
      channels: ["email", "sms", "push"],
      status: "active",
      startDate: "2024-11-01",
      budget: 5000,
      spent: 3420,
      impressions: 45600,
      clicks: 3890,
      conversions: 234,
      revenue: 89450,
      roi: 2514
    },
    {
      id: "2",
      name: "Browse Abandonment Campaign",
      type: "browse-abandonment",
      audience: "Product Viewers (7d)",
      audienceSize: 3450,
      channels: ["email", "facebook", "google"],
      status: "active",
      startDate: "2024-11-15",
      budget: 8000,
      spent: 4250,
      impressions: 78900,
      clicks: 5670,
      conversions: 189,
      revenue: 67890,
      roi: 1497
    },
    {
      id: "3",
      name: "Post-Purchase Upsell",
      type: "post-purchase",
      audience: "Recent Buyers (30d)",
      audienceSize: 890,
      channels: ["email", "whatsapp"],
      status: "paused",
      startDate: "2024-10-20",
      endDate: "2024-11-20",
      budget: 3000,
      spent: 2100,
      impressions: 23400,
      clicks: 1890,
      conversions: 78,
      revenue: 34560,
      roi: 1546
    },
    {
      id: "4",
      name: "Win-Back Campaign",
      type: "win-back",
      audience: "Inactive Customers (90d)",
      audienceSize: 2100,
      channels: ["email", "sms"],
      status: "scheduled",
      startDate: "2024-12-15",
      budget: 6000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      roi: 0
    },
    {
      id: "5",
      name: "Holiday Retargeting",
      type: "abandoned-cart",
      audience: "Holiday Shoppers",
      audienceSize: 4500,
      channels: ["email", "facebook", "instagram", "google"],
      status: "active",
      startDate: "2024-12-01",
      budget: 15000,
      spent: 5600,
      impressions: 125000,
      clicks: 8900,
      conversions: 456,
      revenue: 198700,
      roi: 3448
    }
  ];

  const audienceSegments: AudienceSegment[] = [
    {
      id: "1",
      name: "Cart Abandoners",
      type: "Behavioral",
      size: 2450,
      growth: 12.5,
      engagement: 68,
      value: 245.50,
      icon: "🛒",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      id: "2",
      name: "Window Shoppers",
      type: "Behavioral",
      size: 5600,
      growth: 8.3,
      engagement: 42,
      value: 125.00,
      icon: "👀",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      id: "3",
      name: "Loyal Customers",
      type: "Purchase History",
      size: 1200,
      growth: 5.2,
      engagement: 85,
      value: 560.00,
      icon: "⭐",
      color: "text-emerald-600 dark:text-emerald-400"
    },
    {
      id: "4",
      name: "High Value",
      type: "Purchase History",
      size: 450,
      growth: 15.8,
      engagement: 92,
      value: 1250.00,
      icon: "💎",
      color: "text-purple-600 dark:text-purple-400"
    }
  ];

  // Statistics
  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const avgROI = campaigns.filter(c => c.roi > 0).reduce((sum, c) => sum + c.roi, 0) / campaigns.filter(c => c.roi > 0).length;
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.audience.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || campaign.type === filterType;
    const matchesStatus = filterStatus === "all" || campaign.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "abandoned-cart": return <ShoppingCart className="h-4 w-4" />;
      case "browse-abandonment": return <Eye className="h-4 w-4" />;
      case "post-purchase": return <UserPlus className="h-4 w-4" />;
      case "win-back": return <RotateCw className="h-4 w-4" />;
      default: return null;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email": return <Mail className="h-3 w-3" />;
      case "sms": return <MessageSquare className="h-3 w-3" />;
      case "push": return <Smartphone className="h-3 w-3" />;
      case "facebook": return <Globe className="h-3 w-3" />;
      case "instagram": return <Globe className="h-3 w-3" />;
      case "google": return <Globe className="h-3 w-3" />;
      case "whatsapp": return <MessageSquare className="h-3 w-3" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <PlayCircle className="h-3 w-3 mr-1" />
            {t("retargeting.status.active")}
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">
            <PauseCircle className="h-3 w-3 mr-1" />
            {t("retargeting.status.paused")}
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
            <Clock className="h-3 w-3 mr-1" />
            {t("retargeting.status.scheduled")}
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400">
            <Edit className="h-3 w-3 mr-1" />
            {t("retargeting.status.draft")}
          </Badge>
        );
      default:
        return null;
    }
  };

  const CampaignCard = ({ campaign }: { campaign: RetargetingCampaign }) => (
    <Card className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getTypeIcon(campaign.type)}
              <h3 className="font-medium">{campaign.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 inline mr-1" />
              {new Date(campaign.startDate).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {getStatusBadge(campaign.status)}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("retargeting.actions.title")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                {t("retargeting.actions.viewDetails")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                {t("retargeting.actions.editCampaign")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                {t("retargeting.actions.duplicate")}
              </DropdownMenuItem>
              {campaign.status === "active" && (
                <DropdownMenuItem>
                  <PauseCircle className="h-4 w-4 mr-2" />
                  {t("retargeting.actions.pause")}
                </DropdownMenuItem>
              )}
              {campaign.status === "paused" && (
                <DropdownMenuItem>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {t("retargeting.actions.resume")}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                {t("retargeting.actions.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-medium">{campaign.audience}</p>
          <p className="text-xs text-muted-foreground">
            {campaign.audienceSize.toLocaleString()} {t("retargeting.users")}
          </p>
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {campaign.channels.slice(0, 3).map((channel, idx) => (
            <Badge key={idx} variant="outline" className="px-2 py-0.5">
              {getChannelIcon(channel)}
            </Badge>
          ))}
          {campaign.channels.length > 3 && (
            <Badge variant="outline" className="px-2 py-0.5">
              +{campaign.channels.length - 3}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm text-muted-foreground">{t("retargeting.performance")}</p>
            <div className="space-y-1 mt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t("retargeting.ctr")}</span>
                <span className="font-medium">
                  {campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <Progress value={campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {campaign.conversions} {t("retargeting.conversions")}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("retargeting.revenue")}</p>
            <p className="font-medium mt-1">EGP {campaign.revenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2 flex-1" />
              <span className="text-xs text-muted-foreground">
                {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {campaign.roi > 0 && (
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">{t("retargeting.roi")}</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">
              {campaign.roi.toLocaleString()}%
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title
            title={t("retargeting.title")}
            Subtitle={t("retargeting.subtitle")}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="glow-on-hover flex-1 sm:flex-none">
              <Settings className="h-4 w-4 mr-2" />
              {t("retargeting.buttons.settings")}
            </Button>
            <Button className="glow-on-hover flex-1 sm:flex-none" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              {t("retargeting.buttons.createCampaign")}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("retargeting.stats.activeCampaigns")}</p>
                  <p className="text-3xl font-bold mt-1">{activeCampaigns}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Activity className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary">{t("retargeting.stats.runningNow")}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("retargeting.stats.revenueGenerated")}</p>
                  <p className="text-3xl font-bold mt-1">EGP {(totalRevenue / 1000).toFixed(1)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">+32.4%</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("retargeting.stats.averageROI")}</p>
                  <p className="text-3xl font-bold mt-1">{avgROI.toFixed(0)}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <BarChart3 className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs text-purple-600 dark:text-purple-400">{t("retargeting.stats.return")}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("retargeting.stats.conversions")}</p>
                  <p className="text-3xl font-bold mt-1">{totalConversions}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Users className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-blue-600 dark:text-blue-400">{t("retargeting.stats.recovered")}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center">
                  <MousePointer className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("retargeting.stats.adSpend")}</p>
                  <p className="text-3xl font-bold mt-1">EGP {(totalSpent / 1000).toFixed(1)}K</p>
                  <Progress value={(totalSpent / campaigns.reduce((sum, c) => sum + c.budget, 0)) * 100} className="h-2 mt-2" />
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-400/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-[400px]">
            <TabsTrigger value="campaigns">{t("retargeting.tabs.campaigns")}</TabsTrigger>
            <TabsTrigger value="audiences">{t("retargeting.tabs.audiences")}</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-400/10 flex items-center justify-center shrink-0">
                    <ShoppingCart className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("retargeting.quickActions.cartRecovery")}</p>
                    <p className="text-xs text-muted-foreground">{t("retargeting.quickActions.cartRecoveryDesc")}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center shrink-0">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("retargeting.quickActions.browseAbandonment")}</p>
                    <p className="text-xs text-muted-foreground">{t("retargeting.quickActions.browseAbandonmentDesc")}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-400/10 flex items-center justify-center shrink-0">
                    <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("retargeting.quickActions.postPurchase")}</p>
                    <p className="text-xs text-muted-foreground">{t("retargeting.quickActions.postPurchaseDesc")}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center shrink-0">
                    <RotateCw className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("retargeting.quickActions.winBack")}</p>
                    <p className="text-xs text-muted-foreground">{t("retargeting.quickActions.winBackDesc")}</p>
                  </div>
                </div>
              </Button>
            </div>

            {/* Campaigns Table */}
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <CardTitle className="text-lg">{t("retargeting.retargetingCampaigns")}</CardTitle>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t("retargeting.searchPlaceholder")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                          <SelectValue placeholder={t("retargeting.filters.type")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("retargeting.filters.allTypes")}</SelectItem>
                          <SelectItem value="abandoned-cart">{t("retargeting.filters.cart")}</SelectItem>
                          <SelectItem value="browse-abandonment">{t("retargeting.filters.browse")}</SelectItem>
                          <SelectItem value="post-purchase">{t("retargeting.filters.post")}</SelectItem>
                          <SelectItem value="win-back">{t("retargeting.filters.winBack")}</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full sm:w-[120px]">
                          <SelectValue placeholder={t("retargeting.filters.status")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("retargeting.filters.all")}</SelectItem>
                          <SelectItem value="active">{t("retargeting.status.active")}</SelectItem>
                          <SelectItem value="paused">{t("retargeting.status.paused")}</SelectItem>
                          <SelectItem value="scheduled">{t("retargeting.status.scheduled")}</SelectItem>
                          <SelectItem value="draft">{t("retargeting.status.draft")}</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-4 lg:hidden">
                  {filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="rounded-lg overflow-hidden hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 dark:border-gray-700">
                        <TableHead>{t("retargeting.table.campaign")}</TableHead>
                        <TableHead>{t("retargeting.table.audience")}</TableHead>
                        <TableHead>{t("retargeting.table.channels")}</TableHead>
                        <TableHead>{t("retargeting.table.status")}</TableHead>
                        <TableHead>{t("retargeting.table.performance")}</TableHead>
                        <TableHead>{t("retargeting.table.revenue")}</TableHead>
                        <TableHead>{t("retargeting.table.roi")}</TableHead>
                        <TableHead className="text-right">{t("retargeting.table.actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(campaign.type)}
                              <div>
                                <p className="font-medium">{campaign.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 inline mr-1" />
                                  {new Date(campaign.startDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{campaign.audience}</p>
                              <p className="text-xs text-muted-foreground">
                                {campaign.audienceSize.toLocaleString()} {t("retargeting.users")}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {campaign.channels.slice(0, 3).map((channel, idx) => (
                                <Badge key={idx} variant="outline" className="px-2 py-0.5">
                                  {getChannelIcon(channel)}
                                </Badge>
                              ))}
                              {campaign.channels.length > 3 && (
                                <Badge variant="outline" className="px-2 py-0.5">
                                  +{campaign.channels.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{t("retargeting.ctr")}</span>
                                <span className="font-medium">
                                  {((campaign.clicks / campaign.impressions) * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress value={(campaign.clicks / campaign.impressions) * 100} className="h-2" />
                              <p className="text-xs text-muted-foreground">
                                {campaign.conversions} {t("retargeting.conversions")}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">EGP {campaign.revenue.toLocaleString()}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2 w-16" />
                                <span className="text-xs text-muted-foreground">
                                  {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              {campaign.roi > 0 ? (
                                <>
                                  <p className="font-bold text-emerald-600 dark:text-emerald-400">
                                    {campaign.roi.toLocaleString()}%
                                  </p>
                                  <p className="text-xs text-muted-foreground">{t("retargeting.return")}</p>
                                </>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t("retargeting.actions.title")}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t("retargeting.actions.viewDetails")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  {t("retargeting.actions.editCampaign")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  {t("retargeting.actions.duplicate")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {campaign.status === "active" ? (
                                    <>
                                      <PauseCircle className="h-4 w-4 mr-2" />
                                      {t("retargeting.actions.pause")}
                                    </>
                                  ) : campaign.status === "paused" ? (
                                    <>
                                      <PlayCircle className="h-4 w-4 mr-2" />
                                      {t("retargeting.actions.resume")}
                                    </>
                                  ) : null}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {t("retargeting.actions.delete")}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground text-center sm:text-left">
                    {t("retargeting.pagination.showing")} 1-{filteredCampaigns.length} {t("retargeting.pagination.of")} {campaigns.length} {t("retargeting.pagination.campaigns")}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      {t("retargeting.pagination.previous")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("retargeting.pagination.next")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audiences" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{t("retargeting.audienceSegments")}</CardTitle>
                  <Button size="sm" className="sm:hidden">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="hidden sm:flex">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("retargeting.buttons.createSegment")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {audienceSegments.map((segment) => (
                    <Card key={segment.id} className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="text-xl">{segment.icon}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{segment.name}</h3>
                              <Badge variant="outline" className="mt-1">{segment.type}</Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">{t("retargeting.audienceSize")}</p>
                            <p className="text-xl font-bold">{segment.size.toLocaleString()}</p>
                            <div className="flex items-center gap-1">
                              <TrendingUp className={`h-3 w-3 ${segment.color}`} />
                              <span className={`text-xs ${segment.color}`}>+{segment.growth}%</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">{t("retargeting.value")}</p>
                            <p className="text-xl font-bold">EGP {segment.value}</p>
                            <Progress value={segment.engagement} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1" variant="outline">
                            <Target className="h-4 w-4 mr-2" />
                            {t("retargeting.buttons.target")}
                          </Button>
                          <Button size="sm" className="flex-1" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            {t("retargeting.buttons.analyze")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Retargeting;