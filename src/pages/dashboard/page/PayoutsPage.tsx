import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Wallet,
  Download,
  Plus,
  Calendar,
  Search,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Building2,
  TrendingUp,
  History,
  Shield,
  ArrowUpRight,
  Info
} from "lucide-react";
import Title from "@/components/Title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Payout {
  id: string;
  date: string;
  amount: number;
  fee: number;
  netAmount: number;
  method: "bank_transfer" | "vodafone_cash" | "instapay";
  methodDetails: string;
  status: "completed" | "processing" | "failed" | "cancelled";
  reference: string;
  estimatedArrival?: string;
}

interface PaymentMethod {
  id: string;
  type: "bank_transfer" | "vodafone_cash" | "instapay";
  name: string;
  details: string;
  isDefault: boolean;
  verified: boolean;
}

function PayoutsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const payouts: Payout[] = [
    {
      id: "1",
      date: "2024-12-08",
      amount: 15000.00,
      fee: 50.00,
      netAmount: 14950.00,
      method: "bank_transfer",
      methodDetails: "National Bank - ****4521",
      status: "completed",
      reference: "PAY-2024-001"
    },
    {
      id: "2",
      date: "2024-12-07",
      amount: 8500.00,
      fee: 25.00,
      netAmount: 8475.00,
      method: "vodafone_cash",
      methodDetails: "0100****123",
      status: "processing",
      reference: "PAY-2024-002",
      estimatedArrival: "2024-12-09"
    },
    {
      id: "3",
      date: "2024-12-05",
      amount: 3200.00,
      fee: 15.00,
      netAmount: 3185.00,
      method: "instapay",
      methodDetails: "ahmed@instapay",
      status: "completed",
      reference: "PAY-2024-003"
    },
    {
      id: "4",
      date: "2024-12-04",
      amount: 12000.00,
      fee: 40.00,
      netAmount: 11960.00,
      method: "bank_transfer",
      methodDetails: "CIB Bank - ****7890",
      status: "failed",
      reference: "PAY-2024-004"
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "bank_transfer",
      name: "National Bank of Egypt",
      details: "****4521",
      isDefault: true,
      verified: true
    },
    {
      id: "2",
      type: "vodafone_cash",
      name: "Vodafone Cash",
      details: "0100****123",
      isDefault: false,
      verified: true
    },
    {
      id: "3",
      type: "instapay",
      name: "InstaPay",
      details: "ahmed@instapay",
      isDefault: false,
      verified: false
    },
  ];

  // Calculate stats
  const availableBalance = 25750.00;
  const pendingPayouts = payouts.filter(p => p.status === "processing").reduce((sum, p) => sum + p.netAmount, 0);
  const completedPayouts = payouts.filter(p => p.status === "completed").reduce((sum, p) => sum + p.netAmount, 0);
  const totalFees = payouts.filter(p => p.status === "completed").reduce((sum, p) => sum + p.fee, 0);
  
  const minimumPayout = 100.00;
  const canRequestPayout = availableBalance >= minimumPayout;

  // Filter payouts
  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = payout.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.methodDetails.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || payout.status === filterStatus;
    const matchesMethod = filterMethod === "all" || payout.method === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return <Building2 className="h-4 w-4" />;
      case "vodafone_cash":
        return <Wallet className="h-4 w-4" />;
      case "instapay":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            {t("Completed")}
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {t("Processing")}
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            {t("Failed")}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            {t("Cancelled")}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <Title
          title={t("Payouts")}
          Subtitle={t("Manage your withdrawals and track payout history")}
          className="text-3xl"
          classNamee=""
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2">
            <TabsTrigger value="overview">{t("Overview")}</TabsTrigger>
            <TabsTrigger value="history">{t("Payout History")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Available Balance")}</p>
                      <p className="text-2xl font-bold mt-1">EGP {availableBalance.toFixed(2)}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm text-emerald-600 dark:text-emerald-400">
                          {t("Ready to withdraw")}
                        </span>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full gradient-border bg-primary/10 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Pending Payouts")}</p>
                      <p className="text-2xl font-bold mt-1">EGP {pendingPayouts.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {payouts.filter(p => p.status === "processing").length} {t("in progress")}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Total Paid Out")}</p>
                      <p className="text-2xl font-bold mt-1">EGP {completedPayouts.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t("This month")}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Total Fees")}</p>
                      <p className="text-2xl font-bold mt-1">EGP {totalFees.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t("Processing fees")}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Request Payout Section */}
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t("Request Payout")}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("Minimum payout amount is EGP")} {minimumPayout}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Payout Progress")}</p>
                      <p className="text-lg font-semibold mt-1">
                        EGP {availableBalance.toFixed(2)} / EGP {minimumPayout.toFixed(2)}
                      </p>
                    </div>
                    <Shield className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <Progress value={(availableBalance / minimumPayout) * 100} className="h-3" />
                  
                  <Button 
                    size="lg" 
                    className="w-full glow-on-hover gradient-border"
                    disabled={!canRequestPayout}
                  >
                    <ArrowUpRight className="h-5 w-5 mr-2" />
                    {t("Request Payout")}
                  </Button>
                  
                  {!canRequestPayout && (
                    <p className="text-xs text-center text-muted-foreground">
                      {t("You need EGP")} {(minimumPayout - availableBalance).toFixed(2)} {t("more to request a payout")}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t("Payment Methods")}</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("Add Method")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {getMethodIcon(method.type)}
                        </div>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.details}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="secondary">{t("Default")}</Badge>
                        )}
                        {method.verified ? (
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                            {t("Verified")}
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">
                            {t("Pending")}
                          </Badge>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              {t("Manage")}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {!method.isDefault && (
                              <DropdownMenuItem className="cursor-pointer">
                                {t("Set as Default")}
                              </DropdownMenuItem>
                            )}
                            {!method.verified && (
                              <DropdownMenuItem className="cursor-pointer">
                                {t("Verify")}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="cursor-pointer text-destructive">
                              {t("Remove")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Filters */}
            <Card className="glass-card border-0">
              <CardHeader className="pb-4">
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t("Search payouts...")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full md:w-[300px]"
                      />
                    </div>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder={t("Status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("All Status")}</SelectItem>
                        <SelectItem value="completed">{t("Completed")}</SelectItem>
                        <SelectItem value="processing">{t("Processing")}</SelectItem>
                        <SelectItem value="failed">{t("Failed")}</SelectItem>
                        <SelectItem value="cancelled">{t("Cancelled")}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterMethod} onValueChange={setFilterMethod}>
                      <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder={t("Method")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("All Methods")}</SelectItem>
                        <SelectItem value="bank_transfer">{t("Bank Transfer")}</SelectItem>
                        <SelectItem value="vodafone_cash">{t("Vodafone Cash")}</SelectItem>
                        <SelectItem value="instapay">{t("InstaPay")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {t("Date Range")}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      {t("Export")}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Desktop Table View */}
                <div className="hidden md:block rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 dark:border-gray-700">
                        <TableHead>{t("Date")}</TableHead>
                        <TableHead>{t("Reference")}</TableHead>
                        <TableHead>{t("Method")}</TableHead>
                        <TableHead>{t("Amount")}</TableHead>
                        <TableHead>{t("Fee")}</TableHead>
                        <TableHead>{t("Net Amount")}</TableHead>
                        <TableHead>{t("Status")}</TableHead>
                        <TableHead className="text-right">{t("Actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayouts.map((payout) => (
                        <TableRow
                          key={payout.id}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors"
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {new Date(payout.date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(payout.date).toLocaleTimeString()}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="text-sm">{payout.reference}</code>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getMethodIcon(payout.method)}
                              <div>
                                <p className="font-medium capitalize">
                                  {payout.method.replace(/_/g, ' ')}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {payout.methodDetails}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            EGP {payout.amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            EGP {payout.fee.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              EGP {payout.netAmount.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div>
                              {getStatusBadge(payout.status)}
                              {payout.status === "processing" && payout.estimatedArrival && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {t("Est")}: {new Date(payout.estimatedArrival).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  {t("View")}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t("Payout Actions")}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                  <History className="h-4 w-4 mr-2" />
                                  {t("View Details")}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Download className="h-4 w-4 mr-2" />
                                  {t("Download Receipt")}
                                </DropdownMenuItem>
                                {payout.status === "failed" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                      <ArrowUpRight className="h-4 w-4 mr-2" />
                                      {t("Retry Payout")}
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {filteredPayouts.map((payout) => (
                    <Card key={payout.id} className="glass-card border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <code className="text-sm font-medium">{payout.reference}</code>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(payout.date).toLocaleDateString()} - {new Date(payout.date).toLocaleTimeString()}
                            </p>
                          </div>
                          {getStatusBadge(payout.status)}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getMethodIcon(payout.method)}
                          <div>
                            <p className="font-medium capitalize">
                              {payout.method.replace(/_/g, ' ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {payout.methodDetails}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t("Amount")}</span>
                            <span className="font-medium">EGP {payout.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t("Fee")}</span>
                            <span>EGP {payout.fee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{t("Net Amount")}</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              EGP {payout.netAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        {payout.status === "processing" && payout.estimatedArrival && (
                          <p className="text-xs text-muted-foreground">
                            {t("Est")}: {new Date(payout.estimatedArrival).toLocaleDateString()}
                          </p>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              {t("Actions")}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>{t("Payout Actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              <History className="h-4 w-4 mr-2" />
                              {t("View Details")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Download className="h-4 w-4 mr-2" />
                              {t("Download Receipt")}
                            </DropdownMenuItem>
                            {payout.status === "failed" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                  <ArrowUpRight className="h-4 w-4 mr-2" />
                                  {t("Retry Payout")}
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground text-center md:text-left">
                    {t("Showing")} 1-{filteredPayouts.length} {t("of")} {payouts.length} {t("payouts")}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default PayoutsPage;