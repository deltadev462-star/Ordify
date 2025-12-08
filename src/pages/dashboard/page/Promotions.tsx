import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Gift,
  Target,
  TrendingUp,
  Users,
  Percent,
  Clock,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  PauseCircle,
  PlayCircle,
  BarChart3,
  Tag,
  Sparkles,
  Zap
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

interface Promotion {
  id: string;
  name: string;
  type: "percentage" | "fixed" | "bogo" | "freeShipping";
  value: number;
  code: string;
  status: "active" | "scheduled" | "paused" | "expired";
  startDate: string;
  endDate: string;
  usageCount: number;
  usageLimit: number;
  revenue: number;
  conversionRate: number;
}

function Promotions() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for demonstrations
  const promotions: Promotion[] = [
    {
      id: "1",
      name: "Summer Sale 2024",
      type: "percentage",
      value: 25,
      code: "SUMMER25",
      status: "active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      usageCount: 342,
      usageLimit: 1000,
      revenue: 45780.50,
      conversionRate: 4.2
    },
    {
      id: "2",
      name: "First Order Discount",
      type: "fixed",
      value: 50,
      code: "WELCOME50",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      usageCount: 892,
      usageLimit: -1, // Unlimited
      revenue: 127650.00,
      conversionRate: 6.8
    },
    {
      id: "3",
      name: "Buy One Get One",
      type: "bogo",
      value: 0,
      code: "BOGO2024",
      status: "scheduled",
      startDate: "2024-12-15",
      endDate: "2024-12-25",
      usageCount: 0,
      usageLimit: 500,
      revenue: 0,
      conversionRate: 0
    },
    {
      id: "4",
      name: "Free Shipping Weekend",
      type: "freeShipping",
      value: 0,
      code: "SHIPFREE",
      status: "paused",
      startDate: "2024-11-24",
      endDate: "2024-11-26",
      usageCount: 156,
      usageLimit: 300,
      revenue: 18920.00,
      conversionRate: 3.5
    },
    {
      id: "5",
      name: "Flash Sale 48H",
      type: "percentage",
      value: 40,
      code: "FLASH40",
      status: "expired",
      startDate: "2024-11-01",
      endDate: "2024-11-03",
      usageCount: 723,
      usageLimit: 1000,
      revenue: 89340.75,
      conversionRate: 8.2
    }
  ];

  // Statistics
  const activePromotions = promotions.filter(p => p.status === "active").length;
  const totalRevenue = promotions.reduce((sum, p) => sum + p.revenue, 0);
  const totalUsage = promotions.reduce((sum, p) => sum + p.usageCount, 0);
  const avgConversionRate = promotions.filter(p => p.conversionRate > 0).reduce((sum, p) => sum + p.conversionRate, 0) / promotions.filter(p => p.conversionRate > 0).length;

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || promotion.type === filterType;
    const matchesStatus = filterStatus === "all" || promotion.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "percentage": return t("Percentage Off");
      case "fixed": return t("Fixed Amount");
      case "bogo": return t("Buy One Get One");
      case "freeShipping": return t("Free Shipping");
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage": return <Percent className="h-4 w-4" />;
      case "fixed": return <Tag className="h-4 w-4" />;
      case "bogo": return <Gift className="h-4 w-4" />;
      case "freeShipping": return <Zap className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">{t("Active")}</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">{t("Scheduled")}</Badge>;
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">{t("Paused")}</Badge>;
      case "expired":
        return <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400">{t("Expired")}</Badge>;
      default:
        return null;
    }
  };

  const PromotionCard = ({ promotion }: { promotion: Promotion }) => (
    <Card className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{promotion.name}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {getStatusBadge(promotion.status)}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {getTypeIcon(promotion.type)}
                <span>{getTypeLabel(promotion.type)}</span>
              </div>
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
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                {t("Edit")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                {t("Duplicate")}
              </DropdownMenuItem>
              {promotion.status === "active" && (
                <DropdownMenuItem>
                  <PauseCircle className="h-4 w-4 mr-2" />
                  {t("Pause")}
                </DropdownMenuItem>
              )}
              {promotion.status === "paused" && (
                <DropdownMenuItem>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {t("Resume")}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                {t("Delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{promotion.code}</code>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => navigator.clipboard.writeText(promotion.code)}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm text-muted-foreground">{t("Usage")}</p>
            <div className="space-y-1 mt-1">
              <p className="font-medium">
                {promotion.usageCount} / {promotion.usageLimit === -1 ? "∞" : promotion.usageLimit}
              </p>
              {promotion.usageLimit !== -1 && (
                <Progress 
                  value={(promotion.usageCount / promotion.usageLimit) * 100} 
                  className="h-2"
                />
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("Revenue")}</p>
            <p className="font-medium mt-1">EGP {promotion.revenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">{t("Conversion Rate")}</span>
          <div className="flex items-center gap-1">
            <span className={`font-medium ${promotion.conversionRate > 5 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
              {promotion.conversionRate}%
            </span>
            {promotion.conversionRate > avgConversionRate && (
              <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title
            title={t("Promotions")}
            Subtitle={t("Create and manage promotional campaigns to boost your sales")}
            className="text-3xl"
            classNamee=""
          />
          <Button className="glow-on-hover w-full sm:w-auto" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            {t("Create Promotion")}
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("Active Promotions")}</p>
                  <p className="text-3xl font-bold mt-1">{activePromotions}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                    +2 {t("this week")}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("Total Revenue")}</p>
                  <p className="text-3xl font-bold mt-1">EGP {(totalRevenue / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18.4%
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("Total Usage")}</p>
                  <p className="text-3xl font-bold mt-1">{totalUsage.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    {t("Times redeemed")}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("Avg. Conversion")}</p>
                  <p className="text-3xl font-bold mt-1">{avgConversionRate.toFixed(1)}%</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                    <Target className="h-3 w-3 inline mr-1" />
                    {t("Success rate")}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg">{t("Quick Actions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button variant="outline" className="justify-start h-auto p-4 hover:scale-105 transition-transform">
                <div className="flex flex-col items-start gap-2 w-full">
                  <Percent className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{t("Percentage Discount")}</p>
                    <p className="text-xs text-muted-foreground">{t("Create % off promotion")}</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 hover:scale-105 transition-transform">
                <div className="flex flex-col items-start gap-2 w-full">
                  <Tag className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{t("Fixed Amount")}</p>
                    <p className="text-xs text-muted-foreground">{t("Create fixed discount")}</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 hover:scale-105 transition-transform">
                <div className="flex flex-col items-start gap-2 w-full">
                  <Gift className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{t("BOGO Offer")}</p>
                    <p className="text-xs text-muted-foreground">{t("Buy one get one deals")}</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 hover:scale-105 transition-transform">
                <div className="flex flex-col items-start gap-2 w-full">
                  <Zap className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{t("Free Shipping")}</p>
                    <p className="text-xs text-muted-foreground">{t("Shipping promotions")}</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Promotions Table/Cards */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <CardTitle className="text-lg">{t("All Promotions")}</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("Search promotions...")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder={t("Filter by Type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("All Types")}</SelectItem>
                      <SelectItem value="percentage">{t("Percentage")}</SelectItem>
                      <SelectItem value="fixed">{t("Fixed Amount")}</SelectItem>
                      <SelectItem value="bogo">{t("BOGO")}</SelectItem>
                      <SelectItem value="freeShipping">{t("Free Shipping")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder={t("Status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("All Status")}</SelectItem>
                      <SelectItem value="active">{t("Active")}</SelectItem>
                      <SelectItem value="scheduled">{t("Scheduled")}</SelectItem>
                      <SelectItem value="paused">{t("Paused")}</SelectItem>
                      <SelectItem value="expired">{t("Expired")}</SelectItem>
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
              {filteredPromotions.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="rounded-lg overflow-hidden hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-700">
                    <TableHead>{t("Promotion")}</TableHead>
                    <TableHead>{t("Code")}</TableHead>
                    <TableHead>{t("Type")}</TableHead>
                    <TableHead>{t("Status")}</TableHead>
                    <TableHead>{t("Usage")}</TableHead>
                    <TableHead>{t("Revenue")}</TableHead>
                    <TableHead>{t("Conversion")}</TableHead>
                    <TableHead className="text-right">{t("Actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPromotions.map((promotion) => (
                    <TableRow key={promotion.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div>
                          <p className="font-medium">{promotion.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              {new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{promotion.code}</code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => navigator.clipboard.writeText(promotion.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(promotion.type)}
                          <span className="text-sm">{getTypeLabel(promotion.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(promotion.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {promotion.usageCount} / {promotion.usageLimit === -1 ? "∞" : promotion.usageLimit}
                          </p>
                          {promotion.usageLimit !== -1 && (
                            <Progress 
                              value={(promotion.usageCount / promotion.usageLimit) * 100} 
                              className="h-2 w-20"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        EGP {promotion.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className={`font-medium ${promotion.conversionRate > 5 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                            {promotion.conversionRate}%
                          </span>
                          {promotion.conversionRate > avgConversionRate && (
                            <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
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
                            <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {t("Edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              {t("Duplicate")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {promotion.status === "active" ? (
                                <>
                                  <PauseCircle className="h-4 w-4 mr-2" />
                                  {t("Pause")}
                                </>
                              ) : promotion.status === "paused" ? (
                                <>
                                  <PlayCircle className="h-4 w-4 mr-2" />
                                  {t("Resume")}
                                </>
                              ) : null}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t("Delete")}
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
                {t("Showing")} 1-{filteredPromotions.length} {t("of")} {promotions.length} {t("promotions")}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  {t("Previous")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("Next")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Promotions;