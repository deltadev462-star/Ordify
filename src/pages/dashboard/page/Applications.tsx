import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Search,
  BarChart3,
  MessageSquare,
  Shield,
  Zap,
  Mail,
  CreditCard,
  Package,
  TrendingUp,
  Users,
  Settings,
  ChevronRight,
  Download,
  CheckCircle,
  Star,
  Grid3x3,
  List,
  Facebook,
  Megaphone,
  Bot,
  Sparkles,
  Plus
} from "lucide-react";

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  installed: boolean;
  premium: boolean;
  rating: number;
  reviews: number;
  installs: string;
  features: string[];
  color: string;
  bgGradient: string;
}

const apps: App[] = [
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Monitor your traffic sources and analyze visitor behavior in real time",
    category: "analytics",
    icon: <BarChart3 className="h-6 w-6" />,
    installed: true,
    premium: false,
    rating: 4.8,
    reviews: 1250,
    installs: "50K+",
    features: ["Real-time tracking", "Audience insights", "Conversion tracking", "Custom reports"],
    color: "text-orange-600",
    bgGradient: "from-orange-500 to-red-500"
  },
  {
    id: "meta-pixel",
    name: "Meta Pixel",
    description: "Integrate Meta Pixel to track conversions from your Facebook Ads",
    category: "marketing",
    icon: <Facebook className="h-6 w-6" />,
    installed: true,
    premium: true,
    rating: 4.7,
    reviews: 890,
    installs: "30K+",
    features: ["Conversion tracking", "Custom audiences", "Dynamic ads", "Event tracking"],
    color: "text-blue-600",
    bgGradient: "from-blue-500 to-indigo-500"
  },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business",
    description: "Connect with customers through WhatsApp messaging",
    category: "communication",
    icon: <MessageSquare className="h-6 w-6" />,
    installed: false,
    premium: false,
    rating: 4.9,
    reviews: 2100,
    installs: "100K+",
    features: ["Chat widget", "Quick replies", "Order notifications", "Customer support"],
    color: "text-green-600",
    bgGradient: "from-green-500 to-emerald-500"
  },
  {
    id: "email-marketing",
    name: "Email Marketing Pro",
    description: "Create and send professional email campaigns to boost sales",
    category: "marketing",
    icon: <Mail className="h-6 w-6" />,
    installed: false,
    premium: true,
    rating: 4.6,
    reviews: 750,
    installs: "20K+",
    features: ["Email templates", "Automation", "A/B testing", "Analytics"],
    color: "text-purple-600",
    bgGradient: "from-purple-500 to-pink-500"
  },
  {
    id: "payment-gateway",
    name: "Multi Payment Gateway",
    description: "Accept payments from multiple providers in one integration",
    category: "payment",
    icon: <CreditCard className="h-6 w-6" />,
    installed: true,
    premium: false,
    rating: 4.9,
    reviews: 3200,
    installs: "150K+",
    features: ["Multiple gateways", "Secure checkout", "Auto currency", "Fraud protection"],
    color: "text-cyan-600",
    bgGradient: "from-cyan-500 to-blue-500"
  },
  {
    id: "inventory-manager",
    name: "Smart Inventory",
    description: "Manage stock levels and get low stock alerts automatically",
    category: "operations",
    icon: <Package className="h-6 w-6" />,
    installed: false,
    premium: true,
    rating: 4.7,
    reviews: 560,
    installs: "15K+",
    features: ["Stock tracking", "Low stock alerts", "Bulk updates", "Reports"],
    color: "text-amber-600",
    bgGradient: "from-amber-500 to-orange-500"
  },
  {
    id: "seo-optimizer",
    name: "SEO Optimizer",
    description: "Improve your search engine rankings with AI-powered SEO tools",
    category: "marketing",
    icon: <TrendingUp className="h-6 w-6" />,
    installed: false,
    premium: true,
    rating: 4.8,
    reviews: 920,
    installs: "25K+",
    features: ["Keyword research", "Meta optimization", "Sitemap", "Schema markup"],
    color: "text-teal-600",
    bgGradient: "from-teal-500 to-green-500"
  },
  {
    id: "reviews-manager",
    name: "Customer Reviews",
    description: "Collect and display customer reviews to build trust",
    category: "engagement",
    icon: <Star className="h-6 w-6" />,
    installed: true,
    premium: false,
    rating: 4.9,
    reviews: 1800,
    installs: "80K+",
    features: ["Review widgets", "Email requests", "Moderation", "Rich snippets"],
    color: "text-yellow-600",
    bgGradient: "from-yellow-500 to-orange-500"
  },
  {
    id: "live-chat",
    name: "Live Chat Support",
    description: "Provide real-time customer support with live chat",
    category: "communication",
    icon: <Bot className="h-6 w-6" />,
    installed: false,
    premium: true,
    rating: 4.7,
    reviews: 1100,
    installs: "40K+",
    features: ["Live chat", "Chatbot", "Offline messages", "Team inbox"],
    color: "text-indigo-600",
    bgGradient: "from-indigo-500 to-purple-500"
  },
  {
    id: "social-proof",
    name: "Sales Popup",
    description: "Show recent purchases to create urgency and social proof",
    category: "conversion",
    icon: <Megaphone className="h-6 w-6" />,
    installed: false,
    premium: false,
    rating: 4.6,
    reviews: 680,
    installs: "35K+",
    features: ["Recent sales", "Visitor counter", "Custom messages", "Targeting"],
    color: "text-rose-600",
    bgGradient: "from-rose-500 to-pink-500"
  },
  {
    id: "security-shield",
    name: "Security Shield",
    description: "Protect your store from fraud and malicious attacks",
    category: "security",
    icon: <Shield className="h-6 w-6" />,
    installed: true,
    premium: true,
    rating: 4.9,
    reviews: 450,
    installs: "10K+",
    features: ["Firewall", "DDoS protection", "SSL certificate", "Backup"],
    color: "text-red-600",
    bgGradient: "from-red-500 to-orange-500"
  },
  {
    id: "speed-optimizer",
    name: "Speed Optimizer",
    description: "Make your store lightning fast with advanced optimization",
    category: "performance",
    icon: <Zap className="h-6 w-6" />,
    installed: false,
    premium: true,
    rating: 4.8,
    reviews: 340,
    installs: "12K+",
    features: ["Image optimization", "Lazy loading", "CDN", "Caching"],
    color: "text-violet-600",
    bgGradient: "from-violet-500 to-purple-500"
  }
];

const categories = [
  { id: "all", name: "All Apps", icon: Grid3x3 },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "marketing", name: "Marketing", icon: Megaphone },
  { id: "communication", name: "Communication", icon: MessageSquare },
  { id: "payment", name: "Payment", icon: CreditCard },
  { id: "operations", name: "Operations", icon: Package },
  { id: "engagement", name: "Engagement", icon: Users },
  { id: "conversion", name: "Conversion", icon: TrendingUp },
  { id: "security", name: "Security", icon: Shield },
  { id: "performance", name: "Performance", icon: Zap }
];

function Applications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);

  const stats = [
    {
      title: "Total  Apps",
      value: apps.length,
      icon: Package,
      color: "from-blue-600 to-cyan-600",
      bgColor: "from-blue-50/70 to-cyan-50/70 dark:from-blue-950/30 dark:to-cyan-950/30",
      shadowColor: "shadow-blue-200 dark:shadow-blue-900/30"
    },
    {
      title: "Installed  Apps",
      value: apps.filter(app => app.installed).length,
      icon: CheckCircle,
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-50/70 to-emerald-50/70 dark:from-green-950/30 dark:to-emerald-950/30",
      shadowColor: "shadow-green-200 dark:shadow-green-900/30"
    },
    {
      title: "Premium  Apps",
      value: apps.filter(app => app.premium).length,
      icon: Sparkles,
      color: "from-purple-600 to-pink-600",
      bgColor: "from-purple-50/70 to-pink-50/70 dark:from-purple-950/30 dark:to-pink-950/30",
      shadowColor: "shadow-purple-200 dark:shadow-purple-900/30"
    },
    {
      title: "App  Categories",
      value: categories.length - 1,
      icon: Grid3x3,
      color: "from-orange-600 to-red-600",
      bgColor: "from-orange-50/70 to-red-50/70 dark:from-orange-950/30 dark:to-red-950/30",
      shadowColor: "shadow-orange-200 dark:shadow-orange-900/30"
    }
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const installedApps = filteredApps.filter(app => app.installed);
  const availableApps = filteredApps.filter(app => !app.installed);

  return (
    <div className={cn("min-h-screen  ")}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Enhanced Modern Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 lg:p-10 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Animated background elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-primary/20 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-2xl transform transition-transform group-hover:scale-110">
                  <Package className="h-10 w-10" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1.5 shadow-lg">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  {"App  Store"}
                </Badge>
                <Badge variant="outline" className="backdrop-blur-sm bg-white/10 dark:bg-black/10">
                  {apps.length} {"Apps"}
                </Badge>
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              {"Apps"}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mt-4 max-w-3xl leading-relaxed">
              {"Here you will find apps that you may need to improve your store"}
            </p>
          </div>
        </div>

        {/* Enhanced Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                <div className={cn(
                  "absolute inset-0 rounded-xl sm:rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl",
                  `bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30`
                )} />
                <Card
                  className={cn(
                    "relative overflow-hidden border-0 transition-all duration-500",
                    "sm:hover:translate-y-[-4px] cursor-pointer",
                    `bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm`,
                    stat.shadowColor,
                    "shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl"
                  )}
                >
                  <div className={cn(
                    "absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 rounded-full blur-2xl sm:blur-3xl transition-opacity duration-500",
                    `bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20`
                  )} />
                  
                  <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3 relative">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground line-clamp-1">
                        {stat.title}
                      </CardTitle>
                      <div className={cn(
                        "p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 sm:group-hover:scale-110 shrink-0",
                        `bg-gradient-to-br ${stat.color} text-white shadow-md sm:shadow-lg`
                      )}>
                        <Icon className="h-3.5 sm:h-5 w-3.5 sm:w-5" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-1 sm:pt-2">
                    <div className="space-y-1">
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <div className="h-1 sm:h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-1000", `bg-gradient-to-r ${stat.color}`)}
                          style={{ width: `${(stat.value / apps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Enhanced Search and Filters */}
        <Card className=" border-0 bg-transparent ">
          <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold">{"Browse  Apps"}</CardTitle>
                <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm">
                  {"Discover and install apps to enhance your store"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 p-0.5 sm:p-1 rounded-lg sm:rounded-xl">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "transition-all duration-300 h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm",
                    viewMode === "grid" && "shadow-md sm:shadow-lg"
                  )}
                >
                  <Grid3x3 className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "transition-all duration-300 h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm",
                    viewMode === "list" && "shadow-md sm:shadow-lg"
                  )}
                >
                  <List className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Search Bar - Full width on mobile */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg sm:rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  placeholder={""}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base border-0 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                />
              </div>
              
              {/* Category Filters - Horizontal scroll on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-x-visible sm:flex-wrap scrollbar-hide">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <Button
                      key={category.id}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "gap-1.5 sm:gap-2 transition-all duration-300 border-gray-200 dark:border-gray-700 shrink-0 h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm",
                        isActive ? "shadow-md sm:shadow-lg sm:scale-105" : "sm:hover:scale-105"
                      )}
                    >
                      <Icon className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                      <span className="whitespace-nowrap">{category.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <Tabs defaultValue="installed" className="w-full">
              <TabsList className="w-full h-11 sm:h-14 p-0.5 sm:p-1 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="installed" className="flex-1 data-[state=active]:shadow-md sm:data-[state=active]:shadow-lg transition-all duration-300 text-xs sm:text-sm gap-1 sm:gap-2">
                  <CheckCircle className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  <span className="hidden sm:inline">{"Installed  Apps"}</span>
                  <span className="sm:hidden">{"Installed"}</span>
                  <Badge variant="secondary" className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0 sm:py-0.5 text-xs">
                    {installedApps.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="available" className="flex-1 data-[state=active]:shadow-md sm:data-[state=active]:shadow-lg transition-all duration-300 text-xs sm:text-sm gap-1 sm:gap-2">
                  <Plus className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  <span className="hidden sm:inline">{"Available  Apps"}</span>
                  <span className="sm:hidden">{"Available"}</span>
                  <Badge variant="secondary" className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0 sm:py-0.5 text-xs">
                    {availableApps.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="installed" className="mt-4 sm:mt-6 lg:mt-8">
                {installedApps.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl">
                    <div className="p-3 sm:p-4 rounded-full bg-gray-100 dark:bg-gray-800 w-fit mx-auto mb-3 sm:mb-4">
                      <Package className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">{"No installed apps in this category"}</p>
                  </div>
                ) : (
                  <div className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      : "space-y-3 sm:space-y-4"
                  )}>
                    {installedApps.map((app) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        viewMode={viewMode}
                        hoveredAppId={hoveredAppId}
                        setHoveredAppId={setHoveredAppId}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="available" className="mt-4 sm:mt-6 lg:mt-8">
                {availableApps.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl">
                    <div className="p-3 sm:p-4 rounded-full bg-gray-100 dark:bg-gray-800 w-fit mx-auto mb-3 sm:mb-4">
                      <Package className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">{"No available apps in this category"}</p>
                  </div>
                ) : (
                  <div className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      : "space-y-3 sm:space-y-4"
                  )}>
                    {availableApps.map((app) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        viewMode={viewMode}
                        hoveredAppId={hoveredAppId}
                        setHoveredAppId={setHoveredAppId}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface AppCardProps {
  app: App;
  viewMode: "grid" | "list";
  hoveredAppId: string | null;
  setHoveredAppId: (id: string | null) => void;
}

function AppCard({ app, viewMode, hoveredAppId, setHoveredAppId }: AppCardProps) {
  const isHovered = hoveredAppId === app.id;

  if (viewMode === "list") {
    return (
      <Card
        className="group hidden md:flex border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[0.99] backdrop-blur-sm "
        onMouseEnter={() => setHoveredAppId(app.id)}
        onMouseLeave={() => setHoveredAppId(null)}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-5 flex-1">
              <div className="relative group/icon">
                <div className={cn(
                  "absolute inset-0 rounded-2xl blur-xl transition-all duration-500",
                  `bg-gradient-to-br ${app.bgGradient} opacity-0 group-hover:opacity-50`
                )} />
                <div className={cn(
                  "relative p-4 rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-110",
                  `bg-gradient-to-br ${app.bgGradient} text-white`
                )}>
                  {app.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-xl">{app.name}</h3>
                  {app.premium && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg animate-pulse">
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      {"Premium"}
                    </Badge>
                  )}
                  {app.installed && (
                    <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 border-green-300 dark:border-green-800">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      {"Installed"}
                    </Badge>
                  )}
                </div>
                <p className="text-base text-muted-foreground mb-3 line-clamp-2">{app.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4 transition-all duration-300",
                          i < Math.floor(app.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        )}
                      />
                    ))}
                    <span className="font-semibold ml-1">{app.rating}</span>
                    <span className="text-muted-foreground">({app.reviews.toLocaleString()})</span>
                  </div>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" />
                    {app.installs} {"Installs"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant={app.installed ? "outline" : "default"}
                size="sm"
                className={cn(
                  "gap-2 shadow-md transition-all duration-300",
                  !app.installed && "hover:shadow-lg hover:scale-105"
                )}
              >
                {app.installed ? (
                  <>
                    <Settings className="h-4 w-4" />
                    {"Configure"}
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    {"Install"}
                  </>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="group/btn">
                {"Learn  More"}
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative group">
      <div className={cn(
        "absolute -inset-0.5 rounded-2xl blur-xl transition-all duration-500",
        `bg-gradient-to-r ${app.bgGradient}`,
        isHovered ? "opacity-30" : "opacity-0"
      )} />
      
      <Card
        className={cn(
          "relative cursor-pointer transition-all duration-500 border-0 shadow-xl overflow-hidden",
          "hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm ",
          isHovered && "scale-[1.02]"
        )}
        onMouseEnter={() => setHoveredAppId(app.id)}
        onMouseLeave={() => setHoveredAppId(null)}
      >
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500",
          `bg-gradient-to-br ${app.bgGradient}`,
          isHovered ? "opacity-[0.03]" : "opacity-0"
        )} />
        
        <CardHeader className="pb-4 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="relative group/icon">
              <div className={cn(
                "absolute inset-0 rounded-2xl blur-xl transition-all duration-500",
                `bg-gradient-to-br ${app.bgGradient}`,
                isHovered ? "opacity-70 scale-150" : "opacity-0"
              )} />
              <div className={cn(
                "relative p-3.5 rounded-2xl shadow-xl transition-all duration-300",
                `bg-gradient-to-br ${app.bgGradient} text-white`,
                isHovered && "scale-110 rotate-3"
              )}>
                {app.icon}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {app.premium && (
                <Badge className={cn(
                  "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg transition-all duration-300",
                  isHovered && "scale-110 animate-pulse"
                )}>
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  {"Premium"}
                </Badge>
              )}
              {app.installed && (
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 border-green-300 dark:border-green-800">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  {"Installed"}
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <CardTitle className="text-xl font-bold mb-2 line-clamp-1">
              {app.name}
            </CardTitle>
            <CardDescription className={cn(
              "line-clamp-2 transition-all duration-300",
              isHovered && "line-clamp-3"
            )}>
              {app.description}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    i < Math.floor(app.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300",
                    isHovered && i < Math.floor(app.rating) && "scale-110"
                  )}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
              <span className="font-semibold text-sm ml-1">{app.rating}</span>
              <span className="text-xs text-muted-foreground">({app.reviews.toLocaleString()})</span>
            </div>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Download className={cn("h-3.5 w-3.5", isHovered && "animate-bounce")} />
              {app.installs}
            </span>
          </div>
          
          <div className={cn(
            "space-y-2 overflow-hidden transition-all duration-500",
            isHovered ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          )}>
            <p className="text-xs font-semibold text-muted-foreground">{"Key  Features"}:</p>
            <div className="flex flex-wrap gap-1">
              {app.features.slice(0, 3).map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {feature}
                </Badge>
              ))}
              {app.features.length > 3 && (
                <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                  +{app.features.length - 3} {"More"}
                </Badge>
              )}
            </div>
          </div>
          
          <Button
            variant={app.installed ? "outline" : "default"}
            className={cn(
              "w-full shadow-lg transition-all duration-300 relative overflow-hidden group/btn",
              !app.installed && "hover:shadow-xl hover:scale-[1.02]"
            )}
          >
            {!app.installed && (
              <div className={cn(
                "absolute inset-0 transition-transform duration-700",
                `bg-gradient-to-r ${app.bgGradient}`,
                "translate-x-[-100%] group-hover/btn:translate-x-0"
              )} />
            )}
            <span className="relative flex items-center justify-center gap-2">
              {app.installed ? (
                <>
                  <Settings className="h-4 w-4" />
                  {"Configure"}
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  {"Install  Now"}
                </>
              )}
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Applications;
