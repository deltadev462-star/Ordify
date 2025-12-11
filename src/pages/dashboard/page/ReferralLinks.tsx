import { useState } from "react";
import {
  Link2,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Share2,
  QrCode,
  Download,
  Settings,
  Target,
  Gift,
  Wallet,
  Award,
  BarChart3,
  ExternalLink,
  UserPlus,
  Activity,
  ArrowUpRight,
  Percent,
  Mail
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ReferralLink {
  id: string;
  name: string;
  code: string;
  url: string;
  partner?: Partner;
  clicks: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  commission: number;
  commissionRate: number;
  status: "active" | "paused" | "expired";
  createdAt: string;
  expiresAt?: string;
  target?: string;
  tags: string[];
}

interface Partner {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  totalSales: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  joinedAt: string;
  status: "active" | "pending" | "suspended";
  performance: {
    clicks: number;
    conversions: number;
    conversionRate: number;
    avgOrderValue: number;
  };
}

interface Commission {
  id: string;
  partner: Partner;
  referralCode: string;
  orderId: string;
  orderAmount: number;
  commissionAmount: number;
  commissionRate: number;
  status: "pending" | "approved" | "paid" | "rejected";
  date: string;
}

function ReferralLinks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data
  const referralLinks: ReferralLink[] = [
    {
      id: "1",
      name: "Summer Sale Campaign",
      code: "SUMMER2024",
      url: "https://store.com/ref/SUMMER2024",
      partner: {
        id: "1",
        name: "Ahmed Hassan",
        email: "ahmed@influencer.com",
        avatar: "/th (2).jpg",
        tier: "gold",
        totalSales: 125000,
        totalCommission: 12500,
        pendingCommission: 2500,
        paidCommission: 10000,
        joinedAt: "2024-01-15",
        status: "active",
        performance: {
          clicks: 15420,
          conversions: 523,
          conversionRate: 3.39,
          avgOrderValue: 239.16
        }
      },
      clicks: 5420,
      conversions: 234,
      conversionRate: 4.32,
      revenue: 45670,
      commission: 4567,
      commissionRate: 10,
      status: "active",
      createdAt: "2024-11-01",
      target: "Instagram Bio",
      tags: ["influencer", "summer", "fashion"]
    },
    {
      id: "2",
      name: "Blog Post - Tech Review",
      code: "TECH10",
      url: "https://store.com/ref/TECH10",
      partner: {
        id: "2",
        name: "Sara Mohamed",
        email: "sara@techblog.com",
        avatar: "/th (3).jpg",
        tier: "silver",
        totalSales: 45000,
        totalCommission: 4500,
        pendingCommission: 800,
        paidCommission: 3700,
        joinedAt: "2024-03-20",
        status: "active",
        performance: {
          clicks: 8920,
          conversions: 178,
          conversionRate: 1.99,
          avgOrderValue: 252.81
        }
      },
      clicks: 3210,
      conversions: 89,
      conversionRate: 2.77,
      revenue: 18920,
      commission: 1512,
      commissionRate: 8,
      status: "active",
      createdAt: "2024-10-15",
      target: "Blog Article",
      tags: ["blog", "tech", "gadgets"]
    },
    {
      id: "3",
      name: "YouTube Review",
      code: "YT2024",
      url: "https://store.com/ref/YT2024",
      clicks: 12450,
      conversions: 456,
      conversionRate: 3.66,
      revenue: 78230,
      commission: 9387.6,
      commissionRate: 12,
      status: "paused",
      createdAt: "2024-09-01",
      target: "YouTube Description",
      tags: ["youtube", "video", "review"]
    },
    {
      id: "4",
      name: "Email Newsletter",
      code: "NEWS15",
      url: "https://store.com/ref/NEWS15",
      partner: {
        id: "3",
        name: "Marketing Agency",
        email: "contact@agency.com",
        tier: "platinum",
        totalSales: 250000,
        totalCommission: 37500,
        pendingCommission: 5000,
        paidCommission: 32500,
        joinedAt: "2024-01-01",
        status: "active",
        performance: {
          clicks: 32100,
          conversions: 890,
          conversionRate: 2.77,
          avgOrderValue: 280.90
        }
      },
      clicks: 8920,
      conversions: 312,
      conversionRate: 3.50,
      revenue: 56780,
      commission: 8517,
      commissionRate: 15,
      status: "active",
      createdAt: "2024-11-20",
      expiresAt: "2024-12-31",
      target: "Email Campaign",
      tags: ["email", "newsletter", "agency"]
    },
    {
      id: "5",
      name: "Facebook Ads",
      code: "FB20OFF",
      url: "https://store.com/ref/FB20OFF",
      clicks: 2340,
      conversions: 45,
      conversionRate: 1.92,
      revenue: 8920,
      commission: 713.6,
      commissionRate: 8,
      status: "expired",
      createdAt: "2024-08-01",
      expiresAt: "2024-10-31",
      target: "Facebook Ads",
      tags: ["social", "facebook", "ads"]
    }
  ];

  const partners: Partner[] = [
    {
      id: "1",
      name: "Ahmed Hassan",
      email: "ahmed@influencer.com",
      avatar: "/th (2).jpg",
      tier: "gold",
      totalSales: 125000,
      totalCommission: 12500,
      pendingCommission: 2500,
      paidCommission: 10000,
      joinedAt: "2024-01-15",
      status: "active",
      performance: {
        clicks: 15420,
        conversions: 523,
        conversionRate: 3.39,
        avgOrderValue: 239.16
      }
    },
    {
      id: "2",
      name: "Sara Mohamed",
      email: "sara@techblog.com",
      avatar: "/th (3).jpg",
      tier: "silver",
      totalSales: 45000,
      totalCommission: 4500,
      pendingCommission: 800,
      paidCommission: 3700,
      joinedAt: "2024-03-20",
      status: "active",
      performance: {
        clicks: 8920,
        conversions: 178,
        conversionRate: 1.99,
        avgOrderValue: 252.81
      }
    },
    {
      id: "3",
      name: "Marketing Agency",
      email: "contact@agency.com",
      tier: "platinum",
      totalSales: 250000,
      totalCommission: 37500,
      pendingCommission: 5000,
      paidCommission: 32500,
      joinedAt: "2024-01-01",
      status: "active",
      performance: {
        clicks: 32100,
        conversions: 890,
        conversionRate: 2.77,
        avgOrderValue: 280.90
      }
    },
    {
      id: "4",
      name: "Tech Reviewer",
      email: "reviewer@youtube.com",
      tier: "bronze",
      totalSales: 15000,
      totalCommission: 1200,
      pendingCommission: 200,
      paidCommission: 1000,
      joinedAt: "2024-06-10",
      status: "pending",
      performance: {
        clicks: 3200,
        conversions: 45,
        conversionRate: 1.41,
        avgOrderValue: 333.33
      }
    }
  ];

  const commissions: Commission[] = [
    {
      id: "1",
      partner: partners[0],
      referralCode: "SUMMER2024",
      orderId: "#12345",
      orderAmount: 450,
      commissionAmount: 45,
      commissionRate: 10,
      status: "pending",
      date: "2024-12-08"
    },
    {
      id: "2",
      partner: partners[1],
      referralCode: "TECH10",
      orderId: "#12346",
      orderAmount: 280,
      commissionAmount: 22.4,
      commissionRate: 8,
      status: "approved",
      date: "2024-12-07"
    },
    {
      id: "3",
      partner: partners[2],
      referralCode: "NEWS15",
      orderId: "#12347",
      orderAmount: 890,
      commissionAmount: 133.5,
      commissionRate: 15,
      status: "paid",
      date: "2024-12-06"
    }
  ];

  // Statistics
  const totalClicks = referralLinks.reduce((sum, link) => sum + link.clicks, 0);
  const totalConversions = referralLinks.reduce((sum, link) => sum + link.conversions, 0);
  const totalRevenue = referralLinks.reduce((sum, link) => sum + link.revenue, 0);
  const totalCommission = referralLinks.reduce((sum, link) => sum + link.commission, 0);
  const avgConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  const filteredLinks = referralLinks.filter(link => {
    const matchesSearch = link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (link.partner?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "all" || link.status === filterStatus;
    const matchesPartner = filterPartner === "all" || link.partner?.id === filterPartner;
    
    return matchesSearch && matchesStatus && matchesPartner;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            {"Active"}
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">
            <Clock className="h-3 w-3 mr-1" />
            {"Paused"}
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400">
            <XCircle className="h-3 w-3 mr-1" />
            {"Expired"}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "bronze":
        return <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400">{"Bronze"}</Badge>;
      case "silver":
        return <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400">{"Silver"}</Badge>;
      case "gold":
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">{"Gold"}</Badge>;
      case "platinum":
        return <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400">{"Platinum"}</Badge>;
      default:
        return null;
    }
  };

  const getCommissionStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">{"Pending"}</Badge>;
      case "approved":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">{"Approved"}</Badge>;
      case "paid":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">{"Paid"}</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400">{"Rejected"}</Badge>;
      default:
        return null;
    }
  };

  const ReferralLinkCard = ({ link }: { link: ReferralLink }) => (
    <Card className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{link.name}</h3>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-muted px-2 py-0.5 rounded">{link.code}</code>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => navigator.clipboard.writeText(link.url)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            {link.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-2">
                {link.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{"Actions"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                {"View  Details"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                {"Edit"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <QrCode className="h-4 w-4 mr-2" />
                {"Generate  Q R"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                {"Share"}
              </DropdownMenuItem>
              {link.status === "active" && (
                <DropdownMenuItem>
                  <Clock className="h-4 w-4 mr-2" />
                  {"Pause"}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                {"Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {link.partner && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {link.partner.avatar && <AvatarImage src={link.partner.avatar} />}
              <AvatarFallback>{link.partner.name.split(' ').filter(Boolean).map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{link.partner.name}</p>
              {getTierBadge(link.partner.tier)}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>{getStatusBadge(link.status)}</div>
          <div className="text-right">
            <p className="font-medium">{link.clicks.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{"Clicks"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
          <div>
            <p className="text-sm text-muted-foreground">{"Conversions"}</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{link.conversions}</span>
                <span className="text-xs text-muted-foreground">{link.conversionRate.toFixed(2)}%</span>
              </div>
              <Progress value={link.conversionRate * 10} className="h-2" />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{"Revenue"}</p>
            <p className="font-bold">${link.revenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-sm text-muted-foreground">{"Commission"}</span>
          <div className="text-right">
            <p className="font-medium">${link.commission.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{link.commissionRate}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CommissionCard = ({ commission }: { commission: Commission }) => (
    <Card className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {commission.partner.avatar && <AvatarImage src={commission.partner.avatar} />}
              <AvatarFallback>{commission.partner.name.split(' ').filter(Boolean).map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{commission.partner.name}</p>
              <code className="text-xs text-muted-foreground">{commission.referralCode}</code>
            </div>
          </div>
          <div>
            {getCommissionStatusBadge(commission.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{"Order"}</span>
          <Button variant="link" size="sm" className="p-0 h-auto">
            {commission.orderId}
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{"Amount"}</p>
            <p className="font-medium">${commission.orderAmount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{"Commission"}</p>
            <div>
              <p className="font-medium">${commission.commissionAmount}</p>
              <p className="text-xs text-muted-foreground">{commission.commissionRate}%</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <p className="text-sm text-muted-foreground">{new Date(commission.date).toLocaleDateString()}</p>
          {commission.status === "pending" && (
            <Button variant="outline" size="sm">
              {"Approve"}
            </Button>
          )}
          {commission.status === "approved" && (
            <Button variant="outline" size="sm">
              {"Pay"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title
            title={"Referral  Links"}
            Subtitle={"Manage affiliate and referral programs"}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="glow-on-hover flex-1 sm:flex-none">
              <UserPlus className="h-4 w-4 mr-2" />
              {"Invite  Partner"}
            </Button>
            <Button className="glow-on-hover flex-1 sm:flex-none" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              {"Create  Link"}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Total  Clicks"}</p>
                  <p className="text-3xl font-bold mt-1">{(totalClicks / 1000).toFixed(1)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">+12.5% {"Vs last month"}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Conversions"}</p>
                  <p className="text-3xl font-bold mt-1">{totalConversions.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={avgConversionRate} className="h-2 flex-1" />
                    <span className="text-xs">{avgConversionRate.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Revenue  Generated"}</p>
                  <p className="text-3xl font-bold mt-1">${(totalRevenue / 1000).toFixed(0)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">+23.4% {"Growth"}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Commission  Pending"}</p>
                  <p className="text-3xl font-bold mt-1">${(totalCommission / 1000).toFixed(1)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Wallet className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                    <span className="text-xs text-orange-600 dark:text-orange-400">{partners.length} {"Partners"}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-400/10 flex items-center justify-center">
                  <Percent className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full max-w-[600px] grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="overview">{"Overview"}</TabsTrigger>
            <TabsTrigger value="links">{"Links"}</TabsTrigger>
            <TabsTrigger value="partners">{"Partners"}</TabsTrigger>
            <TabsTrigger value="commissions">{"Commissions"}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center shrink-0">
                    <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{"Generate  Link"}</p>
                    <p className="text-xs text-muted-foreground">{"Quick create"}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center shrink-0">
                    <Gift className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{"Create  Offer"}</p>
                    <p className="text-xs text-muted-foreground">{"Special deals"}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-400/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{"Analytics"}</p>
                    <p className="text-xs text-muted-foreground">{"View reports"}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-400/10 flex items-center justify-center shrink-0">
                    <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{"Settings"}</p>
                    <p className="text-xs text-muted-foreground">{"Configure"}</p>
                  </div>
                </div>
              </Button>
            </div>

            {/* Top Performing Links */}
            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  {"Top  Performing  Links"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralLinks
                    .filter(link => link.status === "active")
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 3)
                    .map((link, idx) => (
                      <div key={link.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                            idx === 0 ? "bg-yellow-100 dark:bg-yellow-950/30" :
                            idx === 1 ? "bg-gray-100 dark:bg-gray-950/30" :
                            "bg-orange-100 dark:bg-orange-950/30"
                          }`}>
                            <Award className={`h-5 w-5 ${
                              idx === 0 ? "text-yellow-600 dark:text-yellow-400" :
                              idx === 1 ? "text-gray-600 dark:text-gray-400" :
                              "text-orange-600 dark:text-orange-400"
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium">{link.name}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Link2 className="h-3 w-3" />
                                {link.code}
                              </span>
                              {link.partner && (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {link.partner.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right sm:text-left">
                          <p className="font-bold text-lg">${(link.revenue / 1000).toFixed(1)}K</p>
                          <p className="text-xs text-muted-foreground">{link.conversions} {"Conversions"}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            {/* Links Table */}
            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <CardTitle className="text-lg">{"Referral  Link  Management"}</CardTitle>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={""}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full sm:w-[120px]">
                          <SelectValue placeholder={"Status"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{"All"}</SelectItem>
                          <SelectItem value="active">{"Active"}</SelectItem>
                          <SelectItem value="paused">{"Paused"}</SelectItem>
                          <SelectItem value="expired">{"Expired"}</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filterPartner} onValueChange={setFilterPartner}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                          <SelectValue placeholder={"Partner"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{"All  Partners"}</SelectItem>
                          {partners.map(partner => (
                            <SelectItem key={partner.id} value={partner.id}>
                              {partner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button variant="ghost" size="icon" className="shrink-0 hover:bg-transparent dark:hover:bg-transparent">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-4 lg:hidden">
                  {filteredLinks.map((link) => (
                    <ReferralLinkCard key={link.id} link={link} />
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="rounded-lg overflow-hidden hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 dark:border-gray-700">
                        <TableHead>{"Link  Details"}</TableHead>
                        <TableHead>{"Partner"}</TableHead>
                        <TableHead>{"Performance"}</TableHead>
                        <TableHead>{"Conversion"}</TableHead>
                        <TableHead>{"Revenue"}</TableHead>
                        <TableHead>{"Commission"}</TableHead>
                        <TableHead>{"Status"}</TableHead>
                        <TableHead className="text-right">{"Actions"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLinks.map((link) => (
                        <TableRow key={link.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium">{link.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <code className="text-xs bg-muted px-2 py-0.5 rounded">{link.code}</code>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => navigator.clipboard.writeText(link.url)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                              {link.tags.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {link.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {link.partner ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  {link.partner.avatar && <AvatarImage src={link.partner.avatar} />}
                                  <AvatarFallback>{link.partner.name.split(' ').filter(Boolean).map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{link.partner.name}</p>
                                  {getTierBadge(link.partner.tier)}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <p className="font-medium">{link.clicks.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{"Clicks"}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{link.conversions}</span>
                                <span className="text-xs text-muted-foreground">{link.conversionRate.toFixed(2)}%</span>
                              </div>
                              <Progress value={link.conversionRate * 10} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-bold">${link.revenue.toLocaleString()}</p>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">${link.commission.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{link.commissionRate}%</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(link.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{"Actions"}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {"View  Details"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  {"Edit"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <QrCode className="h-4 w-4 mr-2" />
                                  {"Generate  Q R"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  {"Share"}
                                </DropdownMenuItem>
                                {link.status === "active" && (
                                  <DropdownMenuItem>
                                    <Clock className="h-4 w-4 mr-2" />
                                    {"Pause"}
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {"Delete"}
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
                    {"Showing"} 1-{filteredLinks.length} {"Of"} {referralLinks.length} {"Links"}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      {"Previous"}
                    </Button>
                    <Button variant="outline" size="sm">
                      {"Next"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {partners.map((partner) => (
                <Card key={partner.id} className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          {partner.avatar && <AvatarImage src={partner.avatar} />}
                          <AvatarFallback>{partner.name.split(' ').filter(Boolean).map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{partner.name}</h3>
                          <p className="text-sm text-muted-foreground">{partner.email}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {getTierBadge(partner.tier)}
                            {partner.status === "active" ? (
                              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                                {"Active"}
                              </Badge>
                            ) : partner.status === "pending" ? (
                              <Badge variant="outline">{"Pending"}</Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400">
                                {"Suspended"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">{"Total  Sales"}</p>
                        <p className="font-bold text-lg">${(partner.totalSales / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{"Total  Commission"}</p>
                        <p className="font-bold text-lg">${(partner.totalCommission / 1000).toFixed(1)}K</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">{"Pending"}</p>
                        <p className="font-medium text-orange-600 dark:text-orange-400">
                          ${partner.pendingCommission.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{"Paid"}</p>
                        <p className="font-medium text-emerald-600 dark:text-emerald-400">
                          ${partner.paidCommission.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="text-sm font-medium">{"Performance"}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">{"Clicks"}</span>
                          <span className="font-medium">{partner.performance.clicks.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">{"Conversions"}</span>
                          <span className="font-medium">{partner.performance.conversions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">{"Rate"}</span>
                          <span className="font-medium">{partner.performance.conversionRate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">{"Order"}</span>
                          <span className="font-medium">${partner.performance.avgOrderValue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        {"Contact"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commissions" className="space-y-6">
            {/* Commission Settings */}
            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {"Commission  Structure"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{"Default  Commission  Rate"}</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="10" className="w-20" />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{"Cookie  Duration"}</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 {"Days"}</SelectItem>
                        <SelectItem value="30">30 {"Days"}</SelectItem>
                        <SelectItem value="60">60 {"Days"}</SelectItem>
                        <SelectItem value="90">90 {"Days"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{"Payout  Threshold"}</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">$</span>
                      <Input type="number" defaultValue="100" className="w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Commissions */}
            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg">{"Recent  Commissions"}</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {"Export"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-4 lg:hidden">
                  {commissions.map((commission) => (
                    <CommissionCard key={commission.id} commission={commission} />
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="rounded-lg overflow-hidden hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 dark:border-gray-700">
                        <TableHead>{"Partner"}</TableHead>
                        <TableHead>{"Order"}</TableHead>
                        <TableHead>{"Amount"}</TableHead>
                        <TableHead>{"Commission"}</TableHead>
                        <TableHead>{"Status"}</TableHead>
                        <TableHead>{"Date"}</TableHead>
                        <TableHead className="text-right">{"Actions"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {commissions.map((commission) => (
                        <TableRow key={commission.id} className="border-b border-gray-200 dark:border-gray-700">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                {commission.partner.avatar && <AvatarImage src={commission.partner.avatar} />}
                                <AvatarFallback>{commission.partner.name.split(' ').filter(Boolean).map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{commission.partner.name}</p>
                                <code className="text-xs text-muted-foreground">{commission.referralCode}</code>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="link" size="sm" className="p-0 h-auto">
                              {commission.orderId}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </TableCell>
                          <TableCell>${commission.orderAmount}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">${commission.commissionAmount}</p>
                              <p className="text-xs text-muted-foreground">{commission.commissionRate}%</p>
                            </div>
                          </TableCell>
                          <TableCell>{getCommissionStatusBadge(commission.status)}</TableCell>
                          <TableCell>
                            <p className="text-sm">{new Date(commission.date).toLocaleDateString()}</p>
                          </TableCell>
                          <TableCell className="text-right">
                            {commission.status === "pending" && (
                              <Button variant="outline" size="sm">
                                {"Approve"}
                              </Button>
                            )}
                            {commission.status === "approved" && (
                              <Button variant="outline" size="sm">
                                {"Pay"}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground text-center sm:text-left">
                    {"Showing"} 1-{commissions.length} {"Of"} {commissions.length} {"Commissions"}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      {"Previous"}
                    </Button>
                    <Button variant="outline" size="sm">
                      {"Next"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ReferralLinks;
