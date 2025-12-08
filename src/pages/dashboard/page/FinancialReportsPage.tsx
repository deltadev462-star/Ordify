import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Receipt,
  FileText,
  Filter,
  Printer,
  Mail,
  Info,
  ChevronRight,
  Activity,
  Target,
  Users,
  ShoppingCart,
  type LucideIcon
} from "lucide-react";
import Title from "@/components/Title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FinancialMetric {
  label: string;
  value: number;
  previousValue: number;
  format: "currency" | "percentage" | "number";
  trend: "up" | "down" | "neutral";
}

interface ReportSection {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  available: boolean;
}

function FinancialReportsPage() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");
  const [comparisonPeriod, setComparisonPeriod] = useState("previous");

  // Mock financial data
  const financialMetrics: FinancialMetric[] = [
    {
      label: t("Total Revenue"),
      value: 245900,
      previousValue: 218750,
      format: "currency",
      trend: "up"
    },
    {
      label: t("Total Expenses"),
      value: 45670,
      previousValue: 52100,
      format: "currency",
      trend: "down"
    },
    {
      label: t("Net Profit"),
      value: 200230,
      previousValue: 166650,
      format: "currency",
      trend: "up"
    },
    {
      label: t("Profit Margin"),
      value: 81.4,
      previousValue: 76.2,
      format: "percentage",
      trend: "up"
    }
  ];

  const reportSections: ReportSection[] = [
    {
      id: "sales",
      title: t("Sales Report"),
      description: t("Detailed breakdown of sales, orders, and revenue"),
      icon: ShoppingCart,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      available: true
    },
    {
      id: "expenses",
      title: t("Expense Report"),
      description: t("Track all business expenses and cost analysis"),
      icon: Receipt,
      iconColor: "text-red-600 dark:text-red-400",
      iconBgColor: "bg-red-50 dark:bg-red-950/30",
      available: true
    },
    {
      id: "profit-loss",
      title: t("Profit & Loss Statement"),
      description: t("Comprehensive P&L statement with margins"),
      icon: BarChart3,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      available: true
    },
    {
      id: "cashflow",
      title: t("Cash Flow Report"),
      description: t("Monitor cash inflows and outflows"),
      icon: Activity,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      available: true
    },
    {
      id: "tax",
      title: t("Tax Report"),
      description: t("Tax calculations and compliance reports"),
      icon: FileText,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBgColor: "bg-orange-50 dark:bg-orange-950/30",
      available: true
    },
    {
      id: "custom",
      title: t("Custom Reports"),
      description: t("Build your own custom financial reports"),
      icon: PieChart,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      available: false
    }
  ];

  // Mock monthly data for charts
  const monthlyData = [
    { month: "Jan", revenue: 180000, expenses: 42000, profit: 138000 },
    { month: "Feb", revenue: 195000, expenses: 45000, profit: 150000 },
    { month: "Mar", revenue: 210000, expenses: 48000, profit: 162000 },
    { month: "Apr", revenue: 205000, expenses: 44000, profit: 161000 },
    { month: "May", revenue: 225000, expenses: 46000, profit: 179000 },
    { month: "Jun", revenue: 245900, expenses: 45670, profit: 200230 },
  ];

  const expenseCategories = [
    { category: t("Platform Fees"), amount: 12500, percentage: 27.4 },
    { category: t("Marketing"), amount: 8900, percentage: 19.5 },
    { category: t("Operations"), amount: 15200, percentage: 33.3 },
    { category: t("Payroll"), amount: 6800, percentage: 14.9 },
    { category: t("Other"), amount: 2270, percentage: 4.9 },
  ];

  const calculateChange = (current: number, previous: number): number => {
    return ((current - previous) / previous) * 100;
  };

  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case "currency":
        return `EGP ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case "percentage":
        return `${value.toFixed(1)}%`;
      case "number":
        return value.toLocaleString("en-US");
      default:
        return value.toString();
    }
  };

  const getChangeIcon = (trend: string) => {
    return trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;
  };

  const getChangeColor = (trend: string, isPositiveGood: boolean = true) => {
    if (trend === "neutral") return "text-gray-600 dark:text-gray-400";
    const isGood = (trend === "up" && isPositiveGood) || (trend === "down" && !isPositiveGood);
    return isGood ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <Title
          title={t("Financial Reports")}
          Subtitle={t("Comprehensive financial analytics and reporting dashboard")}
          className="text-3xl"
          classNamee=""
        />

        {/* Period Selection and Actions */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="flex gap-3">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder={t("Select Period")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">{t("Today")}</SelectItem>
                    <SelectItem value="week">{t("This Week")}</SelectItem>
                    <SelectItem value="month">{t("This Month")}</SelectItem>
                    <SelectItem value="quarter">{t("This Quarter")}</SelectItem>
                    <SelectItem value="year">{t("This Year")}</SelectItem>
                    <SelectItem value="custom">{t("Custom Range")}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("Compare with")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="previous">{t("Previous Period")}</SelectItem>
                    <SelectItem value="year">{t("Same Period Last Year")}</SelectItem>
                    <SelectItem value="none">{t("No Comparison")}</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="default">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t("Date Range")}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {t("Filters")}
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  {t("Print")}
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  {t("Email")}
                </Button>
                <Button size="sm" className="glow-on-hover">
                  <Download className="h-4 w-4 mr-2" />
                  {t("Export All")}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 h-auto">
            <TabsTrigger value="overview">{t("Overview")}</TabsTrigger>
            <TabsTrigger value="revenue">{t("Revenue")}</TabsTrigger>
            <TabsTrigger value="expenses">{t("Expenses")}</TabsTrigger>
            <TabsTrigger value="profit-loss">{t("P&L")}</TabsTrigger>
            <TabsTrigger value="cashflow">{t("Cash Flow")}</TabsTrigger>
            <TabsTrigger value="reports">{t("All Reports")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {financialMetrics.map((metric, index) => {
                const change = calculateChange(metric.value, metric.previousValue);
                const isExpense = metric.label === t("Total Expenses");
                
                return (
                  <Card key={index} className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t("Compared to")} {comparisonPeriod === "previous" ? t("last month") : t("last year")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">
                          {formatValue(metric.value, metric.format)}
                        </p>
                        
                        <div className={`flex items-center gap-1 ${getChangeColor(metric.trend, !isExpense)}`}>
                          {getChangeIcon(metric.trend)}
                          <span className="text-sm font-medium">
                            {change > 0 ? "+" : ""}{change.toFixed(1)}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {t("vs")} {formatValue(metric.previousValue, metric.format)}
                          </span>
                        </div>
                        
                        {metric.format === "percentage" && (
                          <Progress value={metric.value} className="h-2 mt-3" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Revenue Trend Chart */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  {t("Revenue Trend")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">{t("Chart visualization would go here")}</p>
                </div>
                
                {/* Monthly Summary */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm text-muted-foreground">{data.month}</p>
                      <p className="font-semibold">EGP {(data.revenue / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">
                        +{((data.profit / data.revenue) * 100).toFixed(0)}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Selling Products */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    {t("Top Performance Indicators")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium">{t("Average Order Value")}</p>
                        <p className="text-xs text-muted-foreground">{t("Per transaction")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">EGP 191.40</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">+8.3%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">{t("Customer Lifetime Value")}</p>
                        <p className="text-xs text-muted-foreground">{t("Average CLV")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">EGP 2,450</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">+12.1%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">{t("Conversion Rate")}</p>
                        <p className="text-xs text-muted-foreground">{t("Visitor to customer")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">3.8%</p>
                      <p className="text-xs text-red-600 dark:text-red-400">-0.4%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expense Breakdown */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    {t("Expense Breakdown")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {expenseCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{category.category}</p>
                        <p className="text-sm text-muted-foreground">
                          EGP {category.amount.toLocaleString()} ({category.percentage}%)
                        </p>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                  
                  <div className="pt-3 mt-3 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{t("Total Expenses")}</p>
                      <p className="font-semibold">EGP 45,670</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportSections.map((report) => (
                <Card 
                  key={report.id}
                  className={`glass-card border-0 hover:shadow-lg transition-all duration-300 ${
                    report.available ? "cursor-pointer hover:scale-105" : "opacity-60"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`h-12 w-12 rounded-lg ${report.iconBgColor} flex items-center justify-center`}>
                        <report.icon className={`h-6 w-6 ${report.iconColor}`} />
                      </div>
                      {!report.available && (
                        <Badge variant="secondary" className="text-xs">
                          {t("Coming Soon")}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold mb-2">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                    
                    <Button 
                      variant={report.available ? "default" : "secondary"} 
                      size="sm" 
                      className="w-full"
                      disabled={!report.available}
                    >
                      {report.available ? t("Generate Report") : t("Not Available")}
                      {report.available && <ChevronRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Export Options */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-base">{t("Quick Export Options")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    {t("Export to PDF")}
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    {t("Export to Excel")}
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    {t("Export to CSV")}
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {t("Schedule Reports")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder for other tabs */}
          <TabsContent value="revenue" className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-12 text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("Revenue Analysis")}</h3>
                <p className="text-muted-foreground">
                  {t("Detailed revenue reports and analytics will be displayed here")}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-12 text-center">
                <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("Expense Analysis")}</h3>
                <p className="text-muted-foreground">
                  {t("Detailed expense reports and cost analysis will be displayed here")}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profit-loss" className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-12 text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("Profit & Loss Statement")}</h3>
                <p className="text-muted-foreground">
                  {t("Comprehensive P&L statement will be displayed here")}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("Cash Flow Analysis")}</h3>
                <p className="text-muted-foreground">
                  {t("Cash flow reports and forecasts will be displayed here")}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default FinancialReportsPage;