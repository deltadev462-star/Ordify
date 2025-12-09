import { useState } from "react";
import {
  Plug,
  CheckCircle,
  XCircle,
  Settings,
  Plus,
  Search,
  Filter,
  ExternalLink,
  AlertCircle,
  Info,
  Shield,
  Zap,
  Cloud,
  CreditCard,
  Mail,
  BarChart3,
  Package,
  Truck,
  Users,
  Key,
  RefreshCw,
  ArrowRight,
  Clock,
  TrendingUp,
  HelpCircle,
  Book
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: "payments" | "shipping" | "marketing" | "analytics" | "crm" | "inventory";
  logo: string;
  status: "connected" | "disconnected" | "error" | "pending";
  isPopular: boolean;
  isPremium: boolean;
  features: string[];
  lastSync?: string;
  syncFrequency?: string;
  usage?: {
    requests: number;
    limit: number;
  };
  config?: {
    apiKey?: boolean;
    webhook?: boolean;
    oauth?: boolean;
  };
}

interface IntegrationCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

function Integrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTab, setSelectedTab] = useState("available");

  // Mock data
  const integrations: Integration[] = [
    {
      id: "1",
      name: "PayPal",
      description: "Accept payments globally with PayPal",
      category: "payments",
      logo: "/th (2).jpg",
      status: "connected",
      isPopular: true,
      isPremium: false,
      features: ["Instant payments", "Buyer protection", "Multiple currencies"],
      lastSync: "2024-12-08T10:30:00Z",
      syncFrequency: "Real-time",
      usage: { requests: 8450, limit: 10000 },
      config: { apiKey: true, webhook: true }
    },
    {
      id: "2",
      name: "Stripe",
      description: "Modern payment processing for internet businesses",
      category: "payments",
      logo: "/th (3).jpg",
      status: "connected",
      isPopular: true,
      isPremium: false,
      features: ["Card payments", "Subscriptions", "Invoicing"],
      lastSync: "2024-12-08T11:00:00Z",
      syncFrequency: "Real-time",
      usage: { requests: 12300, limit: 50000 },
      config: { apiKey: true, webhook: true, oauth: true }
    },
    {
      id: "3",
      name: "Google Analytics",
      description: "Track and analyze your website traffic",
      category: "analytics",
      logo: "/th (4).jpg",
      status: "connected",
      isPopular: true,
      isPremium: false,
      features: ["Real-time data", "Audience insights", "Conversion tracking"],
      lastSync: "2024-12-08T11:10:00Z",
      syncFrequency: "Every hour",
      usage: { requests: 3200, limit: 5000 },
      config: { oauth: true }
    },
    {
      id: "4",
      name: "Mailchimp",
      description: "Email marketing and automation platform",
      category: "marketing",
      logo: "/th (5).jpg",
      status: "disconnected",
      isPopular: true,
      isPremium: false,
      features: ["Email campaigns", "Automation", "Audience management"],
      config: { apiKey: true }
    },
    {
      id: "5",
      name: "Salesforce CRM",
      description: "Complete CRM solution for customer management",
      category: "crm",
      logo: "/th (6).jpg",
      status: "pending",
      isPopular: false,
      isPremium: true,
      features: ["Lead management", "Sales pipeline", "Customer support"],
      config: { oauth: true, apiKey: true }
    },
    {
      id: "6",
      name: "DHL Express",
      description: "International express shipping services",
      category: "shipping",
      logo: "/th (2).jpg",
      status: "connected",
      isPopular: false,
      isPremium: false,
      features: ["Express delivery", "Real-time tracking", "International shipping"],
      lastSync: "2024-12-08T09:45:00Z",
      syncFrequency: "Every 30 minutes",
      config: { apiKey: true, webhook: true }
    },
    {
      id: "7",
      name: "Facebook Pixel",
      description: "Track conversions and build audiences for ads",
      category: "marketing",
      logo: "/th (3).jpg",
      status: "error",
      isPopular: true,
      isPremium: false,
      features: ["Conversion tracking", "Custom audiences", "Dynamic ads"],
      lastSync: "2024-12-08T08:00:00Z",
      config: { apiKey: true }
    },
    {
      id: "8",
      name: "QuickBooks",
      description: "Accounting software for small businesses",
      category: "inventory",
      logo: "/th (4).jpg",
      status: "disconnected",
      isPopular: false,
      isPremium: true,
      features: ["Invoicing", "Expense tracking", "Financial reports"],
      config: { oauth: true }
    }
  ];

  const categories: IntegrationCategory[] = [
    { id: "payments", name: "Payments", icon: CreditCard, count: 12, color: "text-blue-600 dark:text-blue-400" },
    { id: "shipping", name: "Shipping", icon: Truck, count: 8, color: "text-green-600 dark:text-green-400" },
    { id: "marketing", name: "Marketing", icon: BarChart3, count: 15, color: "text-purple-600 dark:text-purple-400" },
    { id: "analytics", name: "Analytics", icon: BarChart3, count: 6, color: "text-orange-600 dark:text-orange-400" },
    { id: "crm", name: "C R M", icon: Users, count: 5, color: "text-pink-600 dark:text-pink-400" },
    { id: "inventory", name: "Inventory", icon: Package, count: 7, color: "text-indigo-600 dark:text-indigo-400" }
  ];

  // Statistics
  const connectedIntegrations = integrations.filter(i => i.status === "connected").length;
  const totalIntegrations = integrations.length;
  const errorIntegrations = integrations.filter(i => i.status === "error").length;
  const totalApiCalls = integrations
    .filter(i => i.usage)
    .reduce((sum, i) => sum + (i.usage?.requests || 0), 0);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    const matchesStatus = filterStatus === "all" || integration.status === filterStatus;
    const matchesTab = (selectedTab === "available" && integration.status === "disconnected") ||
                      (selectedTab === "connected" && integration.status !== "disconnected");
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            {"Connected"}
          </Badge>
        );
      case "disconnected":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400">
            <XCircle className="h-3 w-3 mr-1" />
            {"Disconnected"}
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            {"Error"}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">
            <Clock className="h-3 w-3 mr-1" />
            {"Pending"}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    if (!cat) return null;
    const Icon = cat.icon;
    return <Icon className={`h-5 w-5 ${cat.color}`} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title
            title={"Integrations"}
            Subtitle={"Connect your favorite tools and services to enhance your store"}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="glow-on-hover flex-1 sm:flex-none">
              <Book className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{"A P I  Docs"}</span>
              <span className="sm:hidden">{"Docs"}</span>
            </Button>
            <Button className="glow-on-hover flex-1 sm:flex-none" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{"Request  Integration"}</span>
              <span className="sm:hidden">{"Request"}</span>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Connected"}</p>
                  <p className="text-3xl font-bold mt-1">{connectedIntegrations}/{totalIntegrations}</p>
                  <Progress value={(connectedIntegrations / totalIntegrations) * 100} className="h-2 mt-2" />
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Plug className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"A P I  Calls  Today"}</p>
                  <p className="text-3xl font-bold mt-1">{(totalApiCalls / 1000).toFixed(1)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">+18.2% {"Vs yesterday"}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Active  Webhooks"}</p>
                  <p className="text-3xl font-bold mt-1">24</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Cloud className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-blue-600 dark:text-blue-400">{"Real-time sync"}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Issues"}</p>
                  <p className="text-3xl font-bold mt-1">{errorIntegrations}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <AlertCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                    <span className="text-xs text-red-600 dark:text-red-400">{"Need attention"}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-400/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg">{"Integration  Categories"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant="outline"
                    className={`h-auto p-4 hover:scale-105 transition-all duration-300 ${
                      selectedCategory === category.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm">{category.name}</p>
                        <p className="text-xs text-muted-foreground">{category.count} {"Apps"}</p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <div className="flex flex-col gap-4">
            <TabsList className="grid grid-cols-2 w-full max-w-[400px]">
              <TabsTrigger value="available">{"Available"}</TabsTrigger>
              <TabsTrigger value="connected">{"Connected"}</TabsTrigger>
            </TabsList>
            
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
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder={"Status"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{"All  Status"}</SelectItem>
                    <SelectItem value="connected">{"Connected"}</SelectItem>
                    <SelectItem value="disconnected">{"Disconnected"}</SelectItem>
                    <SelectItem value="error">{"Error"}</SelectItem>
                    <SelectItem value="pending">{"Pending"}</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setSelectedCategory("all")}
                  className="shrink-0"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredIntegrations.map((integration) => (
                <Card 
                  key={integration.id} 
                  className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={integration.logo} alt={integration.name} />
                          <AvatarFallback>{integration.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {integration.name}
                            {integration.isPremium && (
                              <Badge variant="secondary" className="text-xs">
                                {"Premium"}
                              </Badge>
                            )}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {getCategoryIcon(integration.category)}
                            {integration.isPopular && (
                              <Badge variant="outline" className="text-xs">
                                {"Popular"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(integration.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    
                    <div className="space-y-2">
                      {integration.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {integration.status === "connected" && integration.usage && (
                      <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{"A P I  Usage"}</span>
                          <span className="font-medium">
                            {integration.usage.requests.toLocaleString()}/{integration.usage.limit.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={(integration.usage.requests / integration.usage.limit) * 100} 
                          className="h-2"
                        />
                        {integration.lastSync && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {"Last sync"}: {new Date(integration.lastSync).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {integration.status === "connected" ? (
                        <>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="h-4 w-4 mr-2" />
                            {"Configure"}
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive">
                            {"Disconnect"}
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="w-full">
                          {"Connect"}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 justify-between">
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{"View documentation"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{"Get support"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {integration.config && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {integration.config.apiKey && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                    <Key className="h-3 w-3" />
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{"A P I  Key required"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {integration.config.webhook && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                    <RefreshCw className="h-3 w-3" />
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{"Webhook support"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {integration.config.oauth && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                    <Shield className="h-3 w-3" />
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{"O Auth authentication"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connected" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredIntegrations.map((integration) => (
                <Card 
                  key={integration.id} 
                  className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={integration.logo} alt={integration.name} />
                          <AvatarFallback>{integration.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {getCategoryIcon(integration.category)}
                            {integration.syncFrequency && (
                              <span className="text-xs text-muted-foreground">{integration.syncFrequency}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(integration.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {integration.status === "error" && (
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-red-800 dark:text-red-300">
                              {"Connection  Error"}
                            </p>
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                              {""}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {integration.usage && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{"A P I  Usage"}</span>
                          <span className="font-medium">
                            {integration.usage.requests.toLocaleString()}/{integration.usage.limit.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={(integration.usage.requests / integration.usage.limit) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}

                    {integration.lastSync && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{"Last sync"}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(integration.lastSync).toLocaleTimeString()}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        {"Settings"}
                      </Button>
                      {integration.status === "error" ? (
                        <Button size="sm" variant="default" className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {"Reconnect"}
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {"Sync  Now"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-medium">{"Need a custom integration?"}</h3>
                  <p className="text-sm text-muted-foreground">{"We can help you connect any service with our  A P I"}</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Book className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{"View  A P I  Docs"}</span>
                  <span className="sm:hidden">{"Docs"}</span>
                </Button>
                <Button className="flex-1 sm:flex-none">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{"Contact  Support"}</span>
                  <span className="sm:hidden">{"Support"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Integrations;