import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Plus,
  Calendar,
  Download,
  Save,
  Trash2,
  BarChart3,
  LineChart,
  PieChart,
  Table,
  TrendingUp,
  Settings,
  Clock,
  Share2,
  Filter,
  Layers,
  
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CustomReportsPage() {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState("table");
  const [selectedMetrics, setSelectedMetrics] = useState(["revenue", "orders"]);
  const [selectedDimensions, setSelectedDimensions] = useState(["date", "category"]);
  const [timeRange, setTimeRange] = useState("30days");
  const [reportName, setReportName] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  // Mock saved reports
  const savedReports = [
    {
      id: 1,
      name: t("reports.monthlySalesSummary"),
      type: "line",
      created: "2023-12-01",
      lastRun: "2023-12-10",
      schedule: "monthly",
      metrics: ["revenue", "orders", "avgOrderValue"],
      icon: LineChart,
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 2,
      name: t("reports.productPerformanceMatrix"),
      type: "table",
      created: "2023-11-15",
      lastRun: "2023-12-09",
      schedule: "weekly",
      metrics: ["units", "revenue", "rating"],
      icon: Table,
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      name: t("reports.customerSegmentAnalysis"),
      type: "pie",
      created: "2023-11-20",
      lastRun: "2023-12-08",
      schedule: "none",
      metrics: ["customers", "ltv", "orders"],
      icon: PieChart,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: t("reports.marketingROIDashboard"),
      type: "bar",
      created: "2023-12-05",
      lastRun: "2023-12-10",
      schedule: "daily",
      metrics: ["spend", "revenue", "roi"],
      icon: BarChart3,
      color: "from-orange-500 to-amber-500"
    }
  ];

  // Available metrics
  const availableMetrics = [
    { value: "revenue", label: t("metrics.revenue"), category: "financial" },
    { value: "orders", label: t("metrics.orders"), category: "sales" },
    { value: "avgOrderValue", label: t("metrics.avgOrderValue"), category: "sales" },
    { value: "customers", label: t("metrics.customers"), category: "customers" },
    { value: "newCustomers", label: t("metrics.newCustomers"), category: "customers" },
    { value: "returningCustomers", label: t("metrics.returningCustomers"), category: "customers" },
    { value: "conversionRate", label: t("metrics.conversionRate"), category: "performance" },
    { value: "cartAbandonment", label: t("metrics.cartAbandonment"), category: "performance" },
    { value: "units", label: t("metrics.unitsSold"), category: "inventory" },
    { value: "ltv", label: t("metrics.customerLTV"), category: "customers" },
    { value: "spend", label: t("metrics.marketingSpend"), category: "marketing" },
    { value: "roi", label: t("metrics.roi"), category: "marketing" }
  ];

  // Available dimensions
  const availableDimensions = [
    { value: "date", label: t("dimensions.date") },
    { value: "category", label: t("dimensions.category") },
    { value: "product", label: t("dimensions.product") },
    { value: "customer", label: t("dimensions.customer") },
    { value: "location", label: t("dimensions.location") },
    { value: "channel", label: t("dimensions.channel") },
    { value: "device", label: t("dimensions.device") },
    { value: "paymentMethod", label: t("dimensions.paymentMethod") }
  ];

  // Report types
  const reportTypes = [
    { value: "table", label: t("reportTypes.table"), icon: Table },
    { value: "line", label: t("reportTypes.lineChart"), icon: LineChart },
    { value: "bar", label: t("reportTypes.barChart"), icon: BarChart3 },
    { value: "pie", label: t("reportTypes.pieChart"), icon: PieChart }
  ];

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const handleDimensionToggle = (dimension: string) => {
    setSelectedDimensions(prev => 
      prev.includes(dimension) 
        ? prev.filter(d => d !== dimension)
        : [...prev, dimension]
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {t("analytics.customReports")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("analytics.customReportsDesc")}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            {t("reports.templates")}
          </Button>
          
          <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700">
            <Plus className="h-4 w-4 mr-2" />
            {t("reports.createNew")}
          </Button>
        </div>
      </div>

      {/* Saved Reports */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("reports.savedReports")}</h3>
              <p className="text-sm text-muted-foreground">{t("reports.accessYourCustomReports")}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {savedReports.map((report) => {
              const Icon = report.icon;
              return (
                <div key={report.id} className="p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className={`p-2.5 sm:p-3 rounded-lg bg-gradient-to-r ${report.color} text-white shrink-0`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base truncate">{report.name}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {t("reports.created")}: {report.created}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{t("reports.lastRun")}: {report.lastRun}</span>
                        </div>
                        {report.schedule !== "none" && (
                          <span className="px-2 py-0.5 sm:py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs">
                            {t(`schedule.${report.schedule}`)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Report Builder */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("reports.reportBuilder")}</h3>
                <p className="text-sm text-muted-foreground">{t("reports.customizeYourReport")}</p>
              </div>
            </div>
            <Button>
              <TrendingUp className="h-4 w-4 mr-2" />
              {t("reports.generateReport")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-name" className="text-sm font-medium">{t("reports.reportName")}</Label>
                <Input
                  id="report-name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder={t("reports.enterReportName")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-range" className="text-sm font-medium">{t("reports.timeRange")}</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">{t("time.today")}</SelectItem>
                    <SelectItem value="7days">{t("time.last7Days")}</SelectItem>
                    <SelectItem value="30days">{t("time.last30Days")}</SelectItem>
                    <SelectItem value="90days">{t("time.last90Days")}</SelectItem>
                    <SelectItem value="custom">{t("time.custom")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Report Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("reports.visualizationType")}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setReportType(type.value)}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ${
                      reportType === type.value
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 ${
                      reportType === type.value
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                    <p className={`text-xs sm:text-sm font-medium ${
                      reportType === type.value
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {type.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metrics Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">{t("reports.selectMetrics")}</Label>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {selectedMetrics.length} {t("reports.selected")}
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto">
              {["financial", "sales", "customers", "performance", "marketing", "inventory"].map((category) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase">
                    {t(`categories.${category}`)}
                  </h4>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2">
                    {availableMetrics
                      .filter(m => m.category === category)
                      .map((metric) => (
                        <button
                          key={metric.value}
                          onClick={() => handleMetricToggle(metric.value)}
                          className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 text-left ${
                            selectedMetrics.includes(metric.value)
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {metric.label}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dimensions Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">{t("reports.groupBy")}</Label>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {selectedDimensions.length} {t("reports.selected")}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableDimensions.map((dimension) => (
                <button
                  key={dimension.value}
                  onClick={() => handleDimensionToggle(dimension.value)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedDimensions.includes(dimension.value)
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {dimension.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-4 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <h4 className="text-sm sm:text-base font-semibold flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {t("reports.advancedOptions")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="auto-refresh" className="text-xs sm:text-sm">
                  {t("reports.autoRefresh")}
                </Label>
                <Switch
                  id="auto-refresh"
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                  className="scale-90 sm:scale-100"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="schedule-report" className="text-xs sm:text-sm">
                  {t("reports.scheduleReport")}
                </Label>
                <Select defaultValue="none">
                  <SelectTrigger className="w-[120px] sm:w-[140px] h-8 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("schedule.none")}</SelectItem>
                    <SelectItem value="daily">{t("schedule.daily")}</SelectItem>
                    <SelectItem value="weekly">{t("schedule.weekly")}</SelectItem>
                    <SelectItem value="monthly">{t("schedule.monthly")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4">
            <Button className="w-full sm:w-auto">
              <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              {t("reports.saveReport")}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              {t("reports.exportData")}
            </Button>
            <Button variant="ghost" className="w-full sm:w-auto text-red-600 hover:text-red-700">
              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              {t("reports.clearAll")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("reports.preview")}</h3>
              <p className="text-sm text-muted-foreground">{t("reports.previewYourReport")}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[250px] sm:h-[350px] md:h-[400px] flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-4">
            <div className="text-center">
              <div className="p-3 sm:p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mx-auto mb-3 sm:mb-4">
                {reportType === "table" && <Table className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-emerald-600 dark:text-emerald-400" />}
                {reportType === "line" && <LineChart className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-emerald-600 dark:text-emerald-400" />}
                {reportType === "bar" && <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-emerald-600 dark:text-emerald-400" />}
                {reportType === "pie" && <PieChart className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-emerald-600 dark:text-emerald-400" />}
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">{t("reports.reportReadyToGenerate")}</h4>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm sm:max-w-md mx-auto px-4">
                {t("reports.configureSettingsAndClick")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}