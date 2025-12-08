import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Gift,
  Star,
  Crown,
  Shield,
  Gem,
  Users,
  TrendingUp,
  Coins,
  Zap,
  Plus,
  Settings,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Clock,
  Percent,
  ShoppingBag,
  Edit,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  Filter,
  Download,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface LoyaltyTier {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  minPoints: number;
  maxPoints?: number;
  memberCount: number;
  benefits: string[];
  perks: {
    name: string;
    value: string;
  }[];
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'product' | 'shipping' | 'exclusive';
  category: string;
  status: 'active' | 'inactive' | 'limited';
  stock?: number;
  redeemedCount: number;
  expiresAt?: string;
  image?: string;
}

interface MemberActivity {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar?: string;
  action: 'earned' | 'redeemed' | 'tier_upgrade' | 'expired';
  points: number;
  description: string;
  timestamp: string;
  relatedOrder?: string;
}

interface LoyaltyMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: string;
  points: number;
  totalPointsEarned: number;
  totalPointsRedeemed: number;
  joinDate: string;
  lastActivity: string;
  rewardsRedeemed: number;
}

export default function LoyaltyProgramPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateRewardOpen, setIsCreateRewardOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Loyalty Tiers
  const tiers: LoyaltyTier[] = [
    {
      id: "1",
      name: "Bronze",
      icon: Shield,
      color: "text-orange-600",
      bgGradient: "from-orange-500/20 via-orange-400/10 to-yellow-500/20",
      minPoints: 0,
      maxPoints: 999,
      memberCount: 1250,
      benefits: ["5% discount on all orders", "Early access to sales", "Birthday reward"],
      perks: [
        { name: "Discount", value: "5%" },
        { name: "Points Multiplier", value: "1x" },
        { name: "Free Shipping", value: "Orders over 500 EGP" }
      ]
    },
    {
      id: "2",
      name: "Silver",
      icon: Star,
      color: "text-gray-600",
      bgGradient: "from-gray-500/20 via-gray-400/10 to-slate-500/20",
      minPoints: 1000,
      maxPoints: 4999,
      memberCount: 645,
      benefits: ["10% discount on all orders", "Free shipping on orders over 300 EGP", "Exclusive products"],
      perks: [
        { name: "Discount", value: "10%" },
        { name: "Points Multiplier", value: "1.5x" },
        { name: "Free Shipping", value: "Orders over 300 EGP" }
      ]
    },
    {
      id: "3",
      name: "Gold",
      icon: Crown,
      color: "text-yellow-600",
      bgGradient: "from-yellow-500/20 via-yellow-400/10 to-amber-500/20",
      minPoints: 5000,
      maxPoints: 9999,
      memberCount: 320,
      benefits: ["15% discount on all orders", "Free shipping on all orders", "VIP customer service"],
      perks: [
        { name: "Discount", value: "15%" },
        { name: "Points Multiplier", value: "2x" },
        { name: "Free Shipping", value: "All orders" }
      ]
    },
    {
      id: "4",
      name: "Platinum",
      icon: Gem,
      color: "text-purple-600",
      bgGradient: "from-purple-500/20 via-purple-400/10 to-pink-500/20",
      minPoints: 10000,
      memberCount: 125,
      benefits: ["20% discount on all orders", "Free premium shipping", "Personal shopping assistant", "Exclusive events"],
      perks: [
        { name: "Discount", value: "20%" },
        { name: "Points Multiplier", value: "3x" },
        { name: "Free Shipping", value: "Premium shipping" }
      ]
    }
  ];

  // Sample rewards
  const rewards: Reward[] = [
    {
      id: "1",
      name: "10% Off Next Order",
      description: "Get 10% discount on your next purchase",
      pointsCost: 500,
      type: "discount",
      category: "Discounts",
      status: "active",
      redeemedCount: 245
    },
    {
      id: "2",
      name: "Free Shipping",
      description: "Free standard shipping on any order",
      pointsCost: 300,
      type: "shipping",
      category: "Shipping",
      status: "active",
      redeemedCount: 412
    },
    {
      id: "3",
      name: "Exclusive Product Access",
      description: "Get early access to new product launches",
      pointsCost: 1000,
      type: "exclusive",
      category: "Exclusive",
      status: "active",
      redeemedCount: 67
    },
    {
      id: "4",
      name: "25% Birthday Discount",
      description: "Special birthday month discount",
      pointsCost: 0,
      type: "discount",
      category: "Special",
      status: "limited",
      redeemedCount: 156
    }
  ];

  // Recent member activities
  const recentActivities: MemberActivity[] = [
    {
      id: "1",
      memberId: "m1",
      memberName: "Ahmed Mohamed",
      memberAvatar: "",
      action: "earned",
      points: 250,
      description: "Placed order #12345",
      timestamp: "2024-01-15T14:30:00Z",
      relatedOrder: "12345"
    },
    {
      id: "2",
      memberId: "m2",
      memberName: "Sara Ahmed",
      memberAvatar: "",
      action: "tier_upgrade",
      points: 0,
      description: "Upgraded to Gold tier",
      timestamp: "2024-01-15T12:00:00Z"
    },
    {
      id: "3",
      memberId: "m3",
      memberName: "Omar Hassan",
      memberAvatar: "",
      action: "redeemed",
      points: -500,
      description: "Redeemed 10% discount",
      timestamp: "2024-01-15T10:15:00Z"
    }
  ];

  // Top members
  const topMembers: LoyaltyMember[] = [
    {
      id: "m1",
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      tier: "Platinum",
      points: 15420,
      totalPointsEarned: 25420,
      totalPointsRedeemed: 10000,
      joinDate: "2023-01-15",
      lastActivity: "2024-01-15",
      rewardsRedeemed: 23
    },
    {
      id: "m2",
      name: "Sara Ahmed",
      email: "sara@example.com",
      tier: "Gold",
      points: 8750,
      totalPointsEarned: 12750,
      totalPointsRedeemed: 4000,
      joinDate: "2023-03-20",
      lastActivity: "2024-01-14",
      rewardsRedeemed: 15
    },
    {
      id: "m3",
      name: "Omar Hassan",
      email: "omar@example.com",
      tier: "Gold",
      points: 6320,
      totalPointsEarned: 9320,
      totalPointsRedeemed: 3000,
      joinDate: "2023-05-10",
      lastActivity: "2024-01-13",
      rewardsRedeemed: 12
    }
  ];

  // Statistics
  const stats = [
    {
      title: t("Active Members"),
      value: "2,340",
      change: 15.3,
      changeType: "increase" as const,
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("vs last month"),
    },
    {
      title: t("Points Issued"),
      value: "284K",
      change: 23.5,
      changeType: "increase" as const,
      icon: Coins,
      iconColor: "text-green-600 dark:text-green-400",
      iconBgColor: "bg-green-50 dark:bg-green-950/30",
      trend: "up" as const,
      period: t("this month"),
    },
    {
      title: t("Rewards Redeemed"),
      value: "892",
      change: 18.2,
      changeType: "increase" as const,
      icon: Gift,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "up" as const,
      period: t("this month"),
    },
    {
      title: t("Program Revenue"),
      value: "156K",
      change: 32.7,
      changeType: "increase" as const,
      icon: TrendingUp,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      trend: "up" as const,
      period: t("from members"),
    },
  ];

  const getActivityIcon = (action: MemberActivity['action']) => {
    switch(action) {
      case 'earned': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'redeemed': return <ArrowDown className="h-4 w-4 text-orange-600" />;
      case 'tier_upgrade': return <Zap className="h-4 w-4 text-purple-600" />;
      case 'expired': return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getRewardTypeIcon = (type: Reward['type']) => {
    switch(type) {
      case 'discount': return Percent;
      case 'product': return ShoppingBag;
      case 'shipping': return Send;
      case 'exclusive': return Star;
    }
  };

  const getTierIcon = (tierName: string) => {
    const tier = tiers.find(t => t.name === tierName);
    return tier?.icon || Shield;
  };

  const getTierColor = (tierName: string) => {
    const tier = tiers.find(t => t.name === tierName);
    return tier?.color || "text-gray-600";
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("Loyalty Program")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("Manage your customer loyalty program and rewards")}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 border-gray-200 dark:border-gray-700">
                <Settings className="h-4 w-4" />
                {t("Settings")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{t("Loyalty Program Settings")}</DialogTitle>
                <DialogDescription>
                  {t("Configure your loyalty program rules and settings")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>{t("Points per EGP spent")}</Label>
                  <Input type="number" defaultValue="1" />
                  <p className="text-xs text-muted-foreground">
                    {t("How many points customers earn per EGP spent")}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>{t("Points Expiry")}</Label>
                  <Select defaultValue="12">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 {t("months")}</SelectItem>
                      <SelectItem value="12">12 {t("months")}</SelectItem>
                      <SelectItem value="24">24 {t("months")}</SelectItem>
                      <SelectItem value="never">{t("Never expire")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{t("Birthday Rewards")}</Label>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("Automatically give birthday rewards to members")}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{t("Referral Program")}</Label>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("Enable referral rewards for members")}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                  {t("Cancel")}
                </Button>
                <Button onClick={() => setIsSettingsOpen(false)}>
                  {t("Save Settings")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCreateRewardOpen} onOpenChange={setIsCreateRewardOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                <Plus className="h-4 w-4" />
                {t("Create Reward")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("Create New Reward")}</DialogTitle>
                <DialogDescription>
                  {t("Add a new reward to your loyalty program")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>{t("Reward Name")}</Label>
                  <Input placeholder={t("e.g., 20% Off Next Order")} />
                </div>
                
                <div className="space-y-2">
                  <Label>{t("Description")}</Label>
                  <Textarea 
                    placeholder={t("Describe the reward...")}
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("Points Cost")}</Label>
                    <Input type="number" placeholder="500" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("Type")}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("Select type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discount">{t("Discount")}</SelectItem>
                        <SelectItem value="product">{t("Product")}</SelectItem>
                        <SelectItem value="shipping">{t("Shipping")}</SelectItem>
                        <SelectItem value="exclusive">{t("Exclusive")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>{t("Availability")}</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t("Active")}</SelectItem>
                      <SelectItem value="limited">{t("Limited Time")}</SelectItem>
                      <SelectItem value="inactive">{t("Inactive")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateRewardOpen(false)}>
                  {t("Cancel")}
                </Button>
                <Button onClick={() => setIsCreateRewardOpen(false)}>
                  {t("Create Reward")}
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

      {/* Main Content */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="overview" className="gap-2">
                <Trophy className="h-4 w-4" />
                {t("Overview")}
              </TabsTrigger>
              <TabsTrigger value="tiers" className="gap-2">
                <Crown className="h-4 w-4" />
                {t("Tiers")}
              </TabsTrigger>
              <TabsTrigger value="rewards" className="gap-2">
                <Gift className="h-4 w-4" />
                {t("Rewards")}
              </TabsTrigger>
              <TabsTrigger value="members" className="gap-2">
                <Users className="h-4 w-4" />
                {t("Members")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tier Distribution */}
                <Card className="lg:col-span-2  border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>{t("Tier Distribution")}</CardTitle>
                    <CardDescription>
                      {t("Member distribution across loyalty tiers")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tiers.map((tier) => {
                        const Icon = tier.icon;
                        const percentage = (tier.memberCount / tiers.reduce((sum, t) => sum + t.memberCount, 0)) * 100;
                        
                        return (
                          <div key={tier.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={cn("p-2 rounded-lg", tier.color, `bg-gradient-to-br ${tier.bgGradient}`)}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="font-medium">{tier.name}</span>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{tier.memberCount.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                              </div>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className=" border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>{t("Recent Activity")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            {activity.memberAvatar && <AvatarImage src={activity.memberAvatar} />}
                            <AvatarFallback className="text-xs">
                              {getInitials(activity.memberName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.memberName}</span>
                              <span className="text-muted-foreground"> {activity.description}</span>
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(activity.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {getActivityIcon(activity.action)}
                            {activity.points !== 0 && (
                              <span className={cn(
                                "text-sm font-medium",
                                activity.points > 0 ? "text-green-600" : "text-orange-600"
                              )}>
                                {activity.points > 0 ? '+' : ''}{activity.points}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tiers" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {tiers.map((tier) => {
                  const Icon = tier.icon;
                  
                  return (
                    <Card key={tier.id} className="relative overflow-hidden  border-gray-200 dark:border-gray-700">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tier.bgGradient} opacity-30`} />
                      
                      <CardHeader className="relative">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-3 rounded-lg bg-white/80 dark:bg-gray-900/80", tier.color)}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <CardTitle>{tier.name} {t("Tier")}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {tier.minPoints.toLocaleString()}{tier.maxPoints ? ` - ${tier.maxPoints.toLocaleString()}` : '+'} {t("points")}
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
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                {t("Edit Tier")}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                {t("View Members")}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                {t("Message Members")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="relative space-y-4">
                        <div>
                          <p className="text-2xl font-bold">{tier.memberCount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{t("members")}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-sm font-medium">{t("Perks")}:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {tier.perks.map((perk, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/60 dark:bg-gray-900/60">
                                <span className="text-sm text-muted-foreground">{perk.name}</span>
                                <span className="text-sm font-medium">{perk.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{t("Benefits")}:</p>
                          <ul className="space-y-1">
                            {tier.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="rewards" className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <Input
                  placeholder={t("Search rewards...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2  border-gray-200 dark:border-gray-700">
                    <Filter className="h-4 w-4" />
                    {t("Filter")}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2  border-gray-200 dark:border-gray-700">
                    <Download className="h-4 w-4" />
                    {t("Export")}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map((reward) => {
                  const RewardIcon = getRewardTypeIcon(reward.type);
                  
                  return (
                    <Card key={reward.id} className="hover:shadow-md transition-shadow  border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              reward.type === 'discount' && "bg-green-50 text-green-600 dark:bg-green-950/30",
                              reward.type === 'shipping' && "bg-blue-50 text-blue-600 dark:bg-blue-950/30",
                              reward.type === 'exclusive' && "bg-purple-50 text-purple-600 dark:bg-purple-950/30",
                              reward.type === 'product' && "bg-orange-50 text-orange-600 dark:bg-orange-950/30"
                            )}>
                              <RewardIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">{reward.name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {reward.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Coins className="h-4 w-4 text-yellow-600" />
                            <span className="font-semibold">{reward.pointsCost} {t("points")}</span>
                          </div>
                          <Badge 
                            variant={reward.status === 'active' ? 'default' : reward.status === 'limited' ? 'secondary' : 'outline'}
                            className={cn(
                              reward.status === 'active' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0",
                              reward.status === 'limited' && "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-0"
                            )}
                          >
                            {t(reward.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t("Redeemed")}</span>
                          <span className="font-medium">{reward.redeemedCount} {t("times")}</span>
                        </div>
                        
                        {reward.stock !== undefined && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{t("Stock")}</span>
                              <span className="font-medium">{reward.stock} {t("left")}</span>
                            </div>
                            <Progress value={(reward.stock / (reward.stock + reward.redeemedCount)) * 100} className="h-2" />
                          </div>
                        )}
                        
                        <div className="pt-3 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1  border-gray-200 dark:border-gray-700">
                            <Edit className="h-4 w-4" />
                            {t("Edit")}
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1  border-gray-200 dark:border-gray-700">
                            <Eye className="h-4 w-4" />
                            {t("Details")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="members" className="mt-6">
              <div className="space-y-4">
                {/* Top Members */}
                <Card className="border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>{t("Top Members")}</CardTitle>
                    <CardDescription>
                      {t("Most engaged loyalty program members")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topMembers.map((member, index) => {
                        const TierIcon = getTierIcon(member.tier);
                        const tierColor = getTierColor(member.tier);
                        
                        return (
                          <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors  border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Avatar className="h-12 w-12">
                                  {member.avatar && <AvatarImage src={member.avatar} />}
                                  <AvatarFallback>
                                    {getInitials(member.name)}
                                  </AvatarFallback>
                                </Avatar>
                                {index < 3 && (
                                  <div className={cn(
                                    "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                                    index === 0 && "bg-yellow-500 text-white",
                                    index === 1 && "bg-gray-400 text-white",
                                    index === 2 && "bg-orange-500 text-white"
                                  )}>
                                    {index + 1}
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <TierIcon className={cn("h-4 w-4", tierColor)} />
                                  <span className="text-sm font-medium">{member.tier}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{member.points.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">{t("points")}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs">
                                <span className="text-green-600">+{member.totalPointsEarned.toLocaleString()}</span>
                                <span className="text-orange-600">-{member.totalPointsRedeemed.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/customers')}
                        className="gap-2  border-gray-200 dark:border-gray-700"
                      >
                        <Users className="h-4 w-4" />
                        {t("View All Members")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}