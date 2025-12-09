import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  Plus,
  Download,
  Edit,
  Trash2,
  ShoppingBag,
  Facebook,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  Link,
  TrendingUp,
  Package,
  Zap,
  Globe,
  Target,
  Filter,
  FileText,
  DollarSign,
  Hash,
  BarChart3,
  Activity,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProductFeed {
  id: string;
  name: string;
  channel: string;
  status: "active" | "pending" | "error" | "draft";
  products: number;
  lastSync: string;
  url?: string;
  created: string;
  performance?: {
    clicks: number;
    conversions: number;
    revenue: number;
  };
}

function ProductFeed() {
  const isMobile = useIsMobile();
  
  // Channel configuration with professional styling
  const channels = [
    {
      value: "meta",
      label: "Meta",
      fullName: "Meta (Facebook & Instagram)",
      description: "Reach billions on  Facebook and  Instagram",
      icon: Facebook,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20",
      borderColor: "border-blue-500/20 dark:border-blue-500/30",
      requirements: ["Product  I D", "Title", "Description", "Image", "Price", "Availability"],
      features: ["Dynamic ads", "Catalog sales", "Collection ads", "Instagram  Shopping"],
      productCount: "2.9B+ " + "Users",
    },
    {
      value: "google",
      label: "Google",
      fullName: "Google Shopping",
      description: "Showcase products across Google's network",
      icon: ShoppingBag,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-600/10 dark:from-green-500/20 dark:to-emerald-600/20",
      borderColor: "border-green-500/20 dark:border-green-500/30",
      requirements: ["GTIN", "Brand", "Condition", "Shipping", "Tax", "MPN"],
      features: ["Shopping ads", "Free listings", "Local inventory", "Buy on  Google"],
      productCount: "1B+ " + "Shopping searches/day",
    },
    {
      value: "tiktok",
      label: "TikTok",
      fullName: "TikTok Shop",
      description: "Connect with  Gen  Z and millennials",
      icon: Activity,
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-pink-500/10 to-purple-600/10 dark:from-pink-500/20 dark:to-purple-600/20",
      borderColor: "border-pink-500/20 dark:border-pink-500/30",
      requirements: ["SKU", "Category", "Material", "Size", "Color", "Brand"],
      features: ["Live shopping", "Influencer partnerships", "Video commerce", "Shoppable ads"],
      productCount: "1B+ " + "Monthly users",
    },
    {
      value: "pinterest",
      label: "Pinterest",
      fullName: "Pinterest Shopping",
      description: "Inspire shoppers with visual discovery",
      icon: Target,
      color: "from-red-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-red-500/10 to-orange-600/10 dark:from-red-500/20 dark:to-orange-600/20",
      borderColor: "border-red-500/20 dark:border-red-500/30",
      requirements: ["Product  I D", "Title", "Link", "Image", "Price", "Brand"],
      features: ["Shopping ads", "Try-on products", "Shop the look", "Product rich pins"],
      productCount: "450M+ " + "Monthly users",
    },
    {
      value: "snapchat",
      label: "Snapchat",
      fullName: "Snapchat Catalog",
      description: "Engage young audiences with  A R shopping",
      icon: Zap,
      color: "from-yellow-400 to-amber-500",
      bgColor: "bg-gradient-to-br from-yellow-400/10 to-amber-500/10 dark:from-yellow-400/20 dark:to-amber-500/20",
      borderColor: "border-yellow-400/20 dark:border-yellow-400/30",
      requirements: ["ID", "Title", "Description", "Link", "Image", "Price"],
      features: ["A R try-on", "Dynamic ads", "Collection ads", "Story ads"],
      productCount: "750M+ " + "Monthly users",
    },
  ];
  const [selectedChannel, setSelectedChannel] = useState("meta");
  const [feedName, setFeedName] = useState("");
  const [feedDescription, setFeedDescription] = useState("");
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  const [includeVariants, setIncludeVariants] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<ProductFeed | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  // Mock data with performance metrics
  const [feeds] = useState<ProductFeed[]>([
    {
      id: "1",
      name: "Facebook  Catalog",
      channel: "meta",
      status: "active",
      products: 156,
      lastSync: "2 hours ago",
      url: "https://store.com/feeds/facebook-catalog.xml",
      created: "2024-01-15",
      performance: {
        clicks: 12543,
        conversions: 432,
        revenue: 28950,
      },
    },
    {
      id: "2",
      name: "Google  Shopping  Feed",
      channel: "google",
      status: "active",
      products: 203,
      lastSync: "1 hour ago",
      url: "https://store.com/feeds/google-shopping.xml",
      created: "2024-01-10",
      performance: {
        clicks: 18764,
        conversions: 567,
        revenue: 45320,
      },
    },
    {
      id: "3",
      name: "Tik Tok  Shop  Products",
      channel: "tiktok",
      status: "pending",
      products: 0,
      lastSync: "",
      created: "2024-02-01",
      performance: {
        clicks: 0,
        conversions: 0,
        revenue: 0,
      },
    },
  ]);

  const categories = [
    { name: "Electronics", icon: "💻", count: 45 },
    { name: "Fashion", icon: "👕", count: 89 },
    { name: "Home &  Garden", icon: "🏡", count: 34 },
    { name: "Sports &  Outdoors", icon: "⚽", count: 28 },
    { name: "Beauty &  Health", icon: "💄", count: 56 },
    { name: "Books", icon: "📚", count: 23 },
    { name: "Toys &  Games", icon: "🎮", count: 41 },
    { name: "Food &  Beverages", icon: "🍔", count: 67 },
  ];

  const handleCreateFeed = async () => {
    if (!feedName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a feed name",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {"Product feed created successfully"}
          </div>
        ),
      });
      setIsCreating(false);
      setFeedName("");
      setFeedDescription("");
      setSelectedCategories([]);
      setPriceMin("");
      setPriceMax("");
      setActiveTab("manage");
    }, 2000);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "Feed  U R L copied to clipboard",
    });
  };

  const handleDeleteFeed = (feedId: string) => {
    console.log(`Deleting feed ${feedId}`);
    toast({
      title: "Deleted",
      description: "Product feed deleted successfully",
    });
  };

  const handleRefreshFeed = (feedId: string) => {
    console.log(`Refreshing feed ${feedId}`);
    toast({
      title: "Refreshing",
      description: "",
    });
  };

  const currentChannel = channels.find(c => c.value === selectedChannel);

  return (
    <TooltipProvider>
      <div className="min-h-screen ">
        <div className="flex flex-col gap-8 p-8">
          {/* Professional Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Globe className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {"Pro  Feature"}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">{"Product  Feed"}</h1>
              <p className="text-lg opacity-90 max-w-2xl">
                {"Export your products to social media marketing platforms easily"}
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          </div>

          {/* Statistics Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {"Active  Feeds"}
                </CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">+100%</span> {"From last month"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {"Total  Products"}
                </CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">359</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {"Across all feeds"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {"Total  Revenue"}
                </CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$74,270</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">+23%</span> {"This week"}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {"Conversion  Rate"}
                </CardTitle>
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.4%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {"Average across platforms"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md bg-gray-100 dark:bg-gray-700 p-1 rounded-xl border border-gray-200 dark:border-gray-600">
              <TabsTrigger 
                value="create" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                {"Create  Feed"}
              </TabsTrigger>
              <TabsTrigger 
                value="manage"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
              >
                <FileText className="h-4 w-4 mr-2" />
                {"Manage"}
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
              >
                <Settings className="h-4 w-4 mr-2" />
                {"Settings"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6 mt-6">
              {/* Channel Selection Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{"Select  Platform"}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {"Choose where you want to export your products"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    {"Platform  Guide"}
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    const isSelected = selectedChannel === channel.value;
                    return (
                      <div
                        key={channel.value}
                        onClick={() => setSelectedChannel(channel.value)}
                        onMouseEnter={() => setHoveredChannel(channel.value)}
                        onMouseLeave={() => setHoveredChannel(null)}
                        className={cn(
                          "relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300",
                          isSelected
                            ? `${channel.bgColor} ${channel.borderColor} border-opacity-100 shadow-lg scale-[1.02]`
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-950 hover:shadow-md",
                          ""
                        )}
                      >
                        {isSelected && (
                          <div className="absolute -top-3 -right-3">
                            <div className={`p-2 rounded-full bg-gradient-to-br ${channel.color} shadow-lg`}>
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                            <div className={cn(
                              "p-3 rounded-xl bg-gradient-to-br",
                              channel.bgColor
                            )}>
                              <Icon className={cn(
                                "h-6 w-6 bg-gradient-to-br bg-clip-text",
                                channel.color
                              )} />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {channel.productCount}
                            </Badge>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{channel.fullName}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{channel.description}</p>
                          </div>

                          {(hoveredChannel === channel.value || isSelected) && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {channel.features.slice(0, 2).map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feed Configuration */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-xl">
                <CardHeader className="rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {"Feed  Configuration"}
                  </CardTitle>
                  <CardDescription>
                    {"Set up your product feed details and filters"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="feedName" className="flex items-center gap-2">
                        {"Feed  Name"}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="feedName"
                        placeholder={""}
                        value={feedName}
                        onChange={(e) => setFeedName(e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">{"Description"}</Label>
                      <Input
                        id="description"
                        placeholder={"Brief description of this feed"}
                        value={feedDescription}
                        onChange={(e) => setFeedDescription(e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Product Filters Section */}
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full justify-between h-11"
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        {"Product  Filters &  Advanced  Options"}
                      </span>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        showAdvanced && "rotate-180"
                      )} />
                    </Button>

                    {showAdvanced && (
                      <div className="space-y-6 p-6 border border-gray-200 dark:border-gray-700 rounded-xl ">
                        {/* Categories */}
                        <div className="space-y-3">
                          <Label className="flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            {"Categories"}
                          </Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {categories.map((category) => (
                              <div
                                key={category.name}
                                onClick={() => {
                                  setSelectedCategories(
                                    selectedCategories.includes(category.name)
                                      ? selectedCategories.filter(c => c !== category.name)
                                      : [...selectedCategories, category.name]
                                  );
                                }}
                                className={cn(
                                  "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all",
                                  selectedCategories.includes(category.name)
                                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                                )}
                              >
                                <span className="text-xl">{category.icon}</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{category.name}</p>
                                  <p className="text-xs text-gray-500">{category.count} {"Items"}</p>
                                </div>
                                {selectedCategories.includes(category.name) && (
                                  <CheckCircle className="h-4 w-4 text-indigo-500" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-3">
                          <Label className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            {"Price  Range"}
                          </Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="priceMin" className="text-xs text-gray-500">{"Minimum"}</Label>
                              <Input
                                id="priceMin"
                                type="number"
                                placeholder="0"
                                value={priceMin}
                                onChange={(e) => setPriceMin(e.target.value)}
                                className="h-10"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="priceMax" className="text-xs text-gray-500">{"Maximum"}</Label>
                              <Input
                                id="priceMax"
                                type="number"
                                placeholder="1000"
                                value={priceMax}
                                onChange={(e) => setPriceMax(e.target.value)}
                                className="h-10"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Advanced Options */}
                        <div className="space-y-4">
                          <Label>{"Advanced  Options"}</Label>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-3">
                                <Package className="h-5 w-5 text-gray-500" />
                                <div>
                                  <p className="font-medium">{"Include  Out of  Stock"}</p>
                                  <p className="text-sm text-gray-500">{"Include products with zero inventory"}</p>
                                </div>
                              </div>
                              <Switch
                                checked={includeOutOfStock}
                                onCheckedChange={setIncludeOutOfStock}
                              />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-3">
                                <Copy className="h-5 w-5 text-gray-500" />
                                <div>
                                  <p className="font-medium">{"Include  Variants"}</p>
                                  <p className="text-sm text-gray-500">{"Export all product variants separately"}</p>
                                </div>
                              </div>
                              <Switch
                                checked={includeVariants}
                                onCheckedChange={setIncludeVariants}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Requirements Info */}
                  {currentChannel && (
                    <Alert className="border border-gray-200 dark:border-gray-700 ">
                      <AlertCircle className="h-4 w-4 text-indigo-600" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <p className="font-medium text-indigo-900 dark:text-indigo-200">
                            {"Required fields for"} {currentChannel.label}:
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {currentChannel.requirements.map((req) => (
                              <Badge key={req} variant="secondary" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                {typeof req === 'string' && req.match(/^[A-Z]+$/) ? req : req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Create Button */}
                  <Button
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    size="lg"
                    onClick={handleCreateFeed}
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        {""}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        {"Create  Product  Feed"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manage" className="space-y-6 mt-6">
              {/* Feeds Table */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
                <CardHeader className="">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {"Your  Product  Feeds"}
                      </CardTitle>
                      <CardDescription>
                        {"Manage and monitor your existing product feeds"}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700">
                      <Download className="h-4 w-4 mr-2" />
                      {"Export  All"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className={isMobile ? "p-3" : "p-0"}>
                  {isMobile ? (
                    // Mobile Card View
                    <div className="space-y-3">
                      {feeds.map((feed) => {
                        const channel = channels.find(c => c.value === feed.channel);
                        const Icon = channel?.icon || Share2;
                        return (
                          <Card key={feed.id} className="border border-gray-200 dark:border-gray-700 p-4">
                            <div className="space-y-3">
                              {/* Header with Platform and Status */}
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={cn("p-1.5 rounded-lg", channel?.bgColor)}>
                                    <Icon className={cn(
                                      "h-4 w-4",
                                      feed.channel === "meta" && "text-blue-600 dark:text-blue-400",
                                      feed.channel === "google" && "text-green-600 dark:text-green-400",
                                      feed.channel === "tiktok" && "text-pink-600 dark:text-pink-400",
                                      feed.channel === "pinterest" && "text-red-600 dark:text-red-400",
                                      feed.channel === "snapchat" && "text-yellow-500 dark:text-yellow-400"
                                    )} />
                                  </div>
                                  <span className="font-medium">{channel?.label}</span>
                                </div>
                                <Badge
                                  variant={feed.status === "active" ? "default" :
                                         feed.status === "error" ? "destructive" : "secondary"}
                                  className="capitalize"
                                >
                                  {feed.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                                  {feed.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                  {feed.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
                                  {feed.status}
                                </Badge>
                              </div>

                              {/* Feed Name and Date */}
                              <div>
                                <p className="font-medium text-lg">{feed.name}</p>
                                <p className="text-xs text-gray-500">{"Created"} {feed.created}</p>
                              </div>

                              {/* Products Count */}
                              <div className="flex items-center gap-2">
                                <Package className={cn(
                                  "h-4 w-4",
                                  feed.products > 0 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400"
                                )} />
                                <span className={cn(
                                  "font-medium",
                                  feed.products > 0 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500"
                                )}>
                                  {feed.products} {"Products"}
                                </span>
                              </div>

                              {/* Performance Metrics */}
                              {feed.performance && feed.performance.revenue > 0 && (
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500">{"Performance"}</span>
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="h-3 w-3 text-green-600 dark:text-green-400" />
                                      <span className="font-semibold text-green-600 dark:text-green-400">
                                        ${feed.performance.revenue.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                      <span>{feed.performance.clicks.toLocaleString()} {"Clicks"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <TrendingUp className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                      <span>{feed.performance.conversions} {"Sales"}</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Last Sync and Actions */}
                              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className={cn(
                                    "h-3 w-3",
                                    feed.status === "active" && "text-green-500",
                                    feed.status === "pending" && "text-yellow-500 animate-pulse"
                                  )} />
                                  {feed.lastSync}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRefreshFeed(feed.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </Button>
                                  {feed.url && (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleCopyUrl(feed.url!)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Link className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => window.open(feed.url, "_blank")}
                                        className="h-8 w-8 p-0"
                                      >
                                        <ExternalLink className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                      </Button>
                                    </>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      setSelectedFeed(feed);
                                      setIsEditDialogOpen(true);
                                    }}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Edit className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteFeed(feed.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    // Desktop Table View
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                          <TableHead>{"Feed"}</TableHead>
                          <TableHead>{"Platform"}</TableHead>
                          <TableHead>{"Status"}</TableHead>
                          <TableHead>{"Products"}</TableHead>
                          <TableHead>{"Performance"}</TableHead>
                          <TableHead>{"Last  Sync"}</TableHead>
                          <TableHead className="text-right">{"Actions"}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feeds.map((feed) => {
                          const channel = channels.find(c => c.value === feed.channel);
                          const Icon = channel?.icon || Share2;
                          return (
                            <TableRow key={feed.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                              <TableCell>
                                <div>
                                  <p className="font-medium">{feed.name}</p>
                                  <p className="text-xs text-gray-500">{"Created"} {feed.created}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className={cn("p-1.5 rounded-lg", channel?.bgColor)}>
                                    <Icon className={cn(
                                      "h-4 w-4",
                                      feed.channel === "meta" && "text-blue-600 dark:text-blue-400",
                                      feed.channel === "google" && "text-green-600 dark:text-green-400",
                                      feed.channel === "tiktok" && "text-pink-600 dark:text-pink-400",
                                      feed.channel === "pinterest" && "text-red-600 dark:text-red-400",
                                      feed.channel === "snapchat" && "text-yellow-500 dark:text-yellow-400"
                                    )} />
                                  </div>
                                  <span className="font-medium">{channel?.label}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={feed.status === "active" ? "default" :
                                         feed.status === "error" ? "destructive" : "secondary"}
                                  className="capitalize"
                                >
                                  {feed.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                                  {feed.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                  {feed.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
                                  {feed.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Package className={cn(
                                    "h-4 w-4",
                                    feed.products > 0 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400"
                                  )} />
                                  <span className={cn(
                                    "font-medium",
                                    feed.products > 0 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500"
                                  )}>{feed.products}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {feed.performance && (
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-xs">
                                      <DollarSign className="h-3 w-3 text-green-600 dark:text-green-400" />
                                      <span className="text-gray-500">{"Revenue"}:</span>
                                      <span className="font-semibold text-green-600 dark:text-green-400">${feed.performance.revenue.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                      <span>{feed.performance.clicks.toLocaleString()} {"Clicks"}</span>
                                      <span>•</span>
                                      <TrendingUp className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                      <span>{feed.performance.conversions} {"Sales"}</span>
                                    </div>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className={cn(
                                    "h-3 w-3",
                                    feed.status === "active" && "text-green-500",
                                    feed.status === "pending" && "text-yellow-500 animate-pulse"
                                  )} />
                                  {feed.lastSync}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-end gap-1">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleRefreshFeed(feed.id)}
                                        className="hover:text-blue-600"
                                      >
                                        <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>{"Refresh  Feed"}</TooltipContent>
                                  </Tooltip>
                                  
                                  {feed.url && (
                                    <>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleCopyUrl(feed.url!)}
                                            className="hover:text-indigo-600"
                                          >
                                            <Link className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>{"Copy  U R L"}</TooltipContent>
                                      </Tooltip>
                                      
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => window.open(feed.url, "_blank")}
                                            className="hover:text-purple-600"
                                          >
                                            <ExternalLink className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>{"View  Feed"}</TooltipContent>
                                      </Tooltip>
                                    </>
                                  )}
                                  
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          setSelectedFeed(feed);
                                          setIsEditDialogOpen(true);
                                        }}
                                        className="hover:text-amber-600"
                                      >
                                        <Edit className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>{"Edit  Feed"}</TooltipContent>
                                  </Tooltip>
                                  
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDeleteFeed(feed.id)}
                                        className="hover:text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>{"Delete  Feed"}</TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card className="border border-gray-200 dark:border-gray-700 shadow-xl">
                <CardHeader className=" rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    {"Feed  Settings"}
                  </CardTitle>
                  <CardDescription>
                    {"Configure global settings for all product feeds"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {"Sync  Settings"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <RefreshCw className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium">{"Auto-sync  Feeds"}</p>
                              <p className="text-sm text-gray-500">{"Update when products change"}</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>{"Update  Frequency"}</Label>
                          <Select defaultValue="hourly">
                            <SelectTrigger className="h-11">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="realtime">{"Real-time"}</SelectItem>
                              <SelectItem value="hourly">{"Every hour"}</SelectItem>
                              <SelectItem value="daily">{"Daily"}</SelectItem>
                              <SelectItem value="weekly">{"Weekly"}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {"Commerce  Settings"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium">{"Use  Sale  Prices"}</p>
                              <p className="text-sm text-gray-500">{"Export sale prices when available"}</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>{"Default  Currency"}</Label>
                          <Select defaultValue="USD">
                            <SelectTrigger className="h-11">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">{"U S D -  U S  Dollar"}</SelectItem>
                              <SelectItem value="EUR">{"E U R -  Euro"}</SelectItem>
                              <SelectItem value="GBP">{"G B P -  British  Pound"}</SelectItem>
                              <SelectItem value="EGP">{"E G P -  Egyptian  Pound"}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      <Settings className="mr-2 h-4 w-4" />
                      {"Save  Settings"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Feed Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{"Edit  Feed"}</DialogTitle>
            <DialogDescription>
              {"Update feed configuration and settings"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{"Feed  Name"}</Label>
              <Input
                id="edit-name"
                defaultValue={selectedFeed?.name}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-channel">{"Channel"}</Label>
              <Select defaultValue={selectedFeed?.channel}>
                <SelectTrigger id="edit-channel" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {channels.map((channel) => (
                    <SelectItem key={channel.value} value={channel.value}>
                      {channel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-gray-200 dark:border-gray-700">
              {"Cancel"}
            </Button>
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={() => {
                setIsEditDialogOpen(false);
                toast({
                  title: "Updated",
                  description: "Feed updated successfully",
                });
              }}
            >
              {"Save  Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

export default ProductFeed;

