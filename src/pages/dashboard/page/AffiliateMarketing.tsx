import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import NotActive from "@/components/NotActive";
import {
  SquarePlay,
  Wallet,
  DollarSign,
  Users,
  TrendingUp,
  Copy,
  Share2,
  Gift,
  Target,
  Award,
  ChevronRight,
  Info,
  CheckCircle,
  Link2,
  UserPlus,
  BarChart3,
  Calendar,
  Sparkles,
  Trophy,
  Zap
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  trend?: number;
  color: string;
  bgGradient: string;
}

function StatCard({ title, value, subValue, icon, trend, color, bgGradient }: StatCardProps) {
  return (
    <div className="group relative">
      <div className={cn(
        "absolute inset-0 rounded-xl sm:rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl",
        `bg-gradient-to-br ${bgGradient} opacity-20 group-hover:opacity-30`
      )} />
      <Card className="relative overflow-hidden border-0 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-lg hover:shadow-2xl transition-all duration-500 hover:translate-y-[-4px]">
        <div className={cn(
          "absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full blur-3xl transition-opacity duration-500",
          `bg-gradient-to-br ${bgGradient} opacity-10 group-hover:opacity-20`
        )} />
        
        <CardContent className="p-4 sm:p-6 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">{title}</p>
              <p className={cn("text-2xl sm:text-3xl font-bold mb-1", color)}>{value}</p>
              {subValue && (
                <p className="text-xs sm:text-sm text-muted-foreground">{subValue}</p>
              )}
              {trend !== undefined && (
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className={cn(
                    "h-3 w-3",
                    trend >= 0 ? "text-green-600" : "text-red-600 rotate-180"
                  )} />
                  <span className={cn(
                    "text-xs font-medium",
                    trend >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {Math.abs(trend)}% {"This month"}
                  </span>
                </div>
              )}
            </div>
            <div className={cn(
              "p-2.5 sm:p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
              `bg-gradient-to-br ${bgGradient} text-white shadow-lg`
            )}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AffiliateMarketing() {
  const [copied, setCopied] = useState(false);
  
  // Mock data - replace with actual data
  const affiliateStats = {
    totalCommission: 35433.31,
    pendingCommission: 5240.50,
    withdrawnCommission: 30192.81,
    totalReferrals: 234,
    activeReferrals: 187,
    conversionRate: 79.9,
    thisMonthEarnings: 4320.75,
    lastMonthEarnings: 3890.25,
    commissionRate: 20
  };

  const referralLink = "https://www.easy-orders.net?ref=019da17f-b736-4e4c-8b34-463114a99045";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      title: "Total Commission",
      value: `$${affiliateStats.totalCommission.toLocaleString()}`,
      subValue: "Lifetime earnings",
      icon: <DollarSign className="h-5 sm:h-6 w-5 sm:w-6" />,
      trend: 11.2,
      color: "text-green-600",
      bgGradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Total Referrals",
      value: affiliateStats.totalReferrals.toString(),
      subValue: `${affiliateStats.activeReferrals} ${"Active"}`,
      icon: <Users className="h-5 sm:h-6 w-5 sm:w-6" />,
      trend: 8.5,
      color: "text-blue-600",
      bgGradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "This Month",
      value: `$${affiliateStats.thisMonthEarnings.toLocaleString()}`,
      subValue: `+${((affiliateStats.thisMonthEarnings - affiliateStats.lastMonthEarnings) / affiliateStats.lastMonthEarnings * 100).toFixed(1)}% ${"Vs last month"}`,
      icon: <TrendingUp className="h-5 sm:h-6 w-5 sm:w-6" />,
      trend: 15.3,
      color: "text-purple-600",
      bgGradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Conversion Rate",
      value: `${affiliateStats.conversionRate}%`,
      subValue: "Sign-up to active",
      icon: <Target className="h-5 sm:h-6 w-5 sm:w-6" />,
      color: "text-orange-600",
      bgGradient: "from-orange-500 to-red-500"
    }
  ];

  const commissionTiers = [
    { level: 1, referrals: "1-10", rate: "20%", bonus: "$0", achieved: true },
    { level: 2, referrals: "11-50", rate: "22%", bonus: "$100", achieved: true },
    { level: 3, referrals: "51-100", rate: "25%", bonus: "$500", achieved: true },
    { level: 4, referrals: "101-250", rate: "28%", bonus: "$1,000", achieved: false },
    { level: 5, referrals: "250+", rate: "30%", bonus: "$2,500", achieved: false }
  ];

  return (
    <div className={cn("min-h-screen ")}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
        {/* NotActive Component */}
        <NotActive />

        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-6 sm:p-8 lg:p-12 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Animated background elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl transform transition-transform group-hover:scale-110">
                      <Gift className="h-8 sm:h-10 w-8 sm:w-10" />
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-3 sm:px-4 py-1 sm:py-1.5 shadow-lg mb-2">
                      <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-1.5" />
                      {affiliateStats.commissionRate}% {"Commission"}
                    </Badge>
                    <Badge variant="outline" className="backdrop-blur-sm bg-white/10 dark:bg-black/10 ml-2">
                      {"Lifetime  Earnings"}
                    </Badge>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-4">
                  {"Affiliate  Program"}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-6">
                  When you share our platform's link with others, you will earn a 20% commission on any amount they top up. You will receive your commission in cash, not wallet balance.
                </p>
                <Button 
                  size="lg"
                  className="gap-2 shadow-xl bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 dark:from-white dark:to-gray-200 dark:hover:from-gray-100 dark:hover:to-gray-300 dark:text-black transition-all duration-300 hover:scale-105 text-sm sm:text-base px-4 sm:px-6"
                >
                  <SquarePlay className="h-4 sm:h-5 w-4 sm:w-5" />
                  {"Watch  How  It  Works"}
                </Button>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">{"Available  Balance"}</p>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ${affiliateStats.pendingCommission.toLocaleString()}
                    </p>
                    <Button 
                      className="mt-4 gap-2 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 w-full text-sm sm:text-base"
                    >
                      <Wallet className="h-4 sm:h-5 w-4 sm:w-5" />
                      {"Withdraw  Funds"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Referral Link Card */}
            <Card className="border-0 shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
                  <Link2 className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                  {"Your  Referral  Link"}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {"Share this link to earn commission on referrals"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    readOnly
                    value={referralLink}
                    className="flex-1 h-11 sm:h-12 bg-gray-50 dark:bg-gray-800 border-0 font-mono text-xs sm:text-sm"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant={copied ? "default" : "outline"}
                    size="default"
                    className={cn(
                      "gap-2 transition-all duration-300 h-11 sm:h-12 px-4 sm:px-6",
                      copied && "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                        {"Copied!"}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 sm:h-5 w-4 sm:w-5" />
                        {"Copy  Link"}
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" className="gap-1.5 text-xs sm:text-sm">
                    <Share2 className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                    {"Share on  Facebook"}
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-1.5 text-xs sm:text-sm">
                    <Share2 className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                    {"Share on  Twitter"}
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-1.5 text-xs sm:text-sm">
                    <Share2 className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                    {"Share on  Whats App"}
                  </Button>
                </div>
                
                <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs sm:text-sm">
                    Earn commission when your referrals make purchases. Track your earnings and withdraw anytime.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="border-0 shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
                  <BarChart3 className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                  {"Earnings  Overview"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Monthly Earnings */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{"This  Month"}</span>
                      <span className="text-sm font-bold">${affiliateStats.thisMonthEarnings.toLocaleString()}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  {/* Last Month */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{"Last  Month"}</span>
                      <span className="text-sm font-bold">${affiliateStats.lastMonthEarnings.toLocaleString()}</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  {/* Average */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{"6  Month  Average"}</span>
                      <span className="text-sm font-bold">$3,850.00</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">${affiliateStats.pendingCommission.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{"Available to  Withdraw"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">${affiliateStats.withdrawnCommission.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{"Total  Withdrawn"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Commission Tiers */}
            <Card className="border-0 shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl flex items-center gap-3">
                  <Trophy className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                  {"Commission  Tiers"}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {"Earn more as you grow"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {commissionTiers.map((tier) => (
                  <div
                    key={tier.level}
                    className={cn(
                      "relative p-3 sm:p-4 rounded-xl border transition-all duration-300",
                      tier.achieved
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-300 dark:border-green-800"
                        : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                    )}
                  >
                    {tier.achieved && (
                      <CheckCircle className="absolute top-3 right-3 h-4 w-4 text-green-600" />
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={tier.achieved ? "default" : "secondary"} className="text-xs">
                          {"Level"} {tier.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{tier.referrals} {"Referrals"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{tier.rate}</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">+{tier.bonus} {"Bonus"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl flex items-center gap-3">
                  <Zap className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                  {"Quick  Actions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3 h-11 sm:h-12 text-sm">
                  <UserPlus className="h-4 sm:h-5 w-4 sm:w-5" />
                  {"Invite  Friends"}
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-11 sm:h-12 text-sm">
                  <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5" />
                  {"View  Analytics"}
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-11 sm:h-12 text-sm">
                  <Calendar className="h-4 sm:h-5 w-4 sm:w-5" />
                  {"Payment  History"}
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-11 sm:h-12 text-sm">
                  <Award className="h-4 sm:h-5 w-4 sm:w-5" />
                  {"Leaderboard"}
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AffiliateMarketing;

