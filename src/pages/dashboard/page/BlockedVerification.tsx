import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  ShieldCheck,
  Phone,
  MessageSquareOff,
  Plus,
  Trash2,
  Edit,
  Search,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
 
  Calendar,
  User,
  MapPin,
  Key,
  TrendingUp,
  Info,
  XCircle,
  AlertCircle,
  RefreshCw,
  Copy,
  MoreVertical,
  Smartphone,
  Lock,
  Timer,
 
  Zap,
  MessageSquare,
  PhoneOff,
  Shield,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Empty from "@/components/Empty";

interface BlockedOTPData {
  id: string;
  phoneNumber: string;
  reason: string;
  blockedDate: string;
  attemptedVerifications: number;
  location?: string;
  customerName?: string;
  status: "active" | "temporary" | "permanent";
  lastAttempt?: string;
  ipAddress?: string;
  deviceInfo?: string;
  notes?: string;
}

function BlockedVerification() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isBulkAddDialogOpen, setIsBulkAddDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  
  // Form states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reason, setReason] = useState("");
  const [blockType, setBlockType] = useState("permanent");
  const [notes, setNotes] = useState("");
  const [bulkNumbers, setBulkNumbers] = useState("");
  
  // Settings states
  const [autoBlock, setAutoBlock] = useState(true);
  const [maxAttempts, setMaxAttempts] = useState("3");
  const [blockDuration, setBlockDuration] = useState("24");

  // Mock data
  const [blockedNumbers] = useState<BlockedOTPData[]>([
    {
      id: "1",
      phoneNumber: "+201234567890",
      reason: t("Too many OTP requests"),
      blockedDate: "2024-01-15",
      attemptedVerifications: 47,
      location: "Cairo, Egypt",
      customerName: "أحمد محمد",
      status: "permanent",
      lastAttempt: "10 minutes ago",
      ipAddress: "192.168.1.1",
      deviceInfo: "iPhone 14 Pro",
      notes: "Bot activity detected",
    },
    {
      id: "2",
      phoneNumber: "+201098765432",
      reason: t("Suspicious verification pattern"),
      blockedDate: "2024-01-20",
      attemptedVerifications: 23,
      location: "Alexandria, Egypt",
      customerName: "محمد علي",
      status: "active",
      lastAttempt: "2 hours ago",
      ipAddress: "192.168.1.2",
      deviceInfo: "Samsung Galaxy S23",
    },
    {
      id: "3",
      phoneNumber: "+201555666777",
      reason: t("OTP abuse"),
      blockedDate: "2024-02-01",
      attemptedVerifications: 89,
      location: "Giza, Egypt",
      status: "temporary",
      lastAttempt: "1 day ago",
      ipAddress: "192.168.1.3",
      notes: "Temporary block for 48 hours",
    },
  ]);

  const stats = {
    totalBlocked: blockedNumbers.length,
    permanentBlocks: blockedNumbers.filter(n => n.status === "permanent").length,
    temporaryBlocks: blockedNumbers.filter(n => n.status === "temporary").length,
    blockedToday: 5,
    attemptedVerifications: blockedNumbers.reduce((sum, n) => sum + n.attemptedVerifications, 0),
    savedCosts: 159, // Estimated SMS costs saved
  };

  const handleAddNumber = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: t("Error"),
        description: t("Please enter a phone number"),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("Success"),
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          {t("Phone number blocked from OTP verification")}
        </div>
      ),
    });
    
    setIsAddDialogOpen(false);
    setPhoneNumber("");
    setReason("");
    setNotes("");
  };

  const handleBulkAdd = () => {
    const numbers = bulkNumbers.split('\n').filter(n => n.trim());
    if (numbers.length === 0) {
      toast({
        title: t("Error"),
        description: t("Please enter at least one phone number"),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("Success"),
      description: `${numbers.length} ${t("numbers blocked from OTP verification")}`,
    });
    
    setIsBulkAddDialogOpen(false);
    setBulkNumbers("");
  };

  const handleUnblockNumber = () => {
    toast({
      title: t("Success"),
      description: t("Phone number unblocked for OTP verification"),
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: t("Success"),
      description: t("OTP verification settings updated"),
    });
    setIsSettingsDialogOpen(false);
  };

  const handleExport = () => {
    toast({
      title: t("Exporting"),
      description: t("Preparing blocked OTP numbers list for export..."),
    });
  };

  const filteredNumbers = blockedNumbers.filter(number => {
    const matchesSearch = number.phoneNumber.includes(searchTerm) ||
                         number.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         number.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || number.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <TooltipProvider>
      <div className="min-h-screen  ">
        <div className="flex flex-col gap-8 p-8">
          {/* Professional Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-700 dark:via-indigo-700 dark:to-blue-700 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  <Lock className="h-3 w-3 mr-1" />
                  {t("OTP Security")}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">
                {t("Blocked OTP Numbers")}
              </h1>
              <p className="text-lg opacity-90 max-w-2xl">
                {t(
                  "You can delete or add the blocked numbers from using the OTP verification code"
                )}
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-6">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("Total Blocked")}
                </CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <PhoneOff className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalBlocked}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("OTP blocked")}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("Permanent")}
                </CardTitle>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.permanentBlocks}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("No expiry")}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("Temporary")}
                </CardTitle>
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Timer className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.temporaryBlocks}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("Time-limited")}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("Today's Blocks")}
                </CardTitle>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.blockedToday}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">
                    +25%
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("OTP Attempts")}
                </CardTitle>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.attemptedVerifications}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("Blocked requests")}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("Cost Saved")}
                </CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.savedCosts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("SMS costs")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="grid col-span-1  md:flex md:items-center md:justify-between">
              <TabsList className="grid  w-fit grid-cols-3 mb-5 md:mb-0 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl border border-gray-200 dark:border-gray-600">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {t("All")}
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {t("Recent")}
                </TabsTrigger>
                <TabsTrigger
                  value="suspicious"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {t("Suspicious")}
                </TabsTrigger>
               
              </TabsList>

              <div className="grid col-span-1  md:flex md:items-center   gap-2">
                <Button
                  onClick={() => setIsSettingsDialogOpen(true)}
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {t("Security Settings")}
                </Button>
                <Button
                  onClick={() => setIsBulkAddDialogOpen(true)}
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {t("Bulk Add")}
                </Button>
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t("Export")}
                </Button>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t("Block OTP Number")}
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-6 mt-0">
              {/* Filters and Search */}
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="grid  md:flex md:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder={t("Search by phone, name, or reason...")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-11 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-[180px] h-11 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder={t("Status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("All Status")}</SelectItem>
                        <SelectItem value="active">{t("Active")}</SelectItem>
                        <SelectItem value="temporary">
                          {t("Temporary")}
                        </SelectItem>
                        <SelectItem value="permanent">
                          {t("Permanent")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-[180px] h-11 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder={t("Date Range")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("All Time")}</SelectItem>
                        <SelectItem value="today">{t("Today")}</SelectItem>
                        <SelectItem value="week">{t("This Week")}</SelectItem>
                        <SelectItem value="month">{t("This Month")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Blocked OTP Numbers Table */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
                <CardHeader className=" ">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquareOff className="h-5 w-5" />
                        {t("Blocked OTP Verification Numbers")}
                      </CardTitle>
                      <CardDescription>
                        {t("Prevent OTP abuse and reduce verification costs")}
                      </CardDescription>
                    </div>
                    {selectedNumbers.length > 0 && (
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t("Unblock")} ({selectedNumbers.length})
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className={isMobile ? "p-3" : "p-0"}>
                  {filteredNumbers.length > 0 ? (
                    isMobile ? (
                      // Mobile Card View with Responsive Grid
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                        {filteredNumbers.map((number) => (
                          <Card
                            key={number.id}
                            className="border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
                          >
                            <div className="space-y-3">
                              {/* Header with checkbox and status */}
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={selectedNumbers.includes(number.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedNumbers([
                                          ...selectedNumbers,
                                          number.id,
                                        ]);
                                      } else {
                                        setSelectedNumbers(
                                          selectedNumbers.filter(
                                            (id) => id !== number.id
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Badge
                                    variant={
                                      number.status === "permanent"
                                        ? "destructive"
                                        : number.status === "temporary"
                                        ? "secondary"
                                        : "default"
                                    }
                                    className="capitalize"
                                  >
                                    <div
                                      className={cn(
                                        "w-2 h-2 rounded-full mr-2",
                                        number.status === "permanent" &&
                                          "bg-red-500",
                                        number.status === "temporary" &&
                                          "bg-amber-500",
                                        number.status === "active" && "bg-green-500"
                                      )}
                                    />
                                    {t(number.status)}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Edit className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleUnblockNumber()}
                                    className="h-8 w-8 p-0"
                                  >
                                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreVertical className="h-4 w-4 text-gray-400" />
                                  </Button>
                                </div>
                              </div>

                              {/* Phone Number */}
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-indigo-400" />
                                <span className="font-medium">
                                  {number.phoneNumber}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      number.phoneNumber
                                    );
                                    toast({
                                      title: t("Copied"),
                                      description: t(
                                        "Phone number copied to clipboard"
                                      ),
                                    });
                                  }}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>

                              {/* Customer Info */}
                              {(number.customerName || number.location) && (
                                <div className="flex items-start gap-2">
                                  <User className="h-4 w-4 text-gray-400 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="font-medium">
                                      {number.customerName || t("Unknown")}
                                    </p>
                                    {number.location && (
                                      <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {number.location}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Reason */}
                              <div className="text-sm">
                                <div className="flex items-start gap-1">
                                  <AlertTriangle className="h-4 w-4 text-gray-400 mt-0.5" />
                                  <div className="flex-1">
                                    <p>{number.reason}</p>
                                    {number.notes && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        {number.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Device Info */}
                              {number.deviceInfo && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Smartphone className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="text-sm">{number.deviceInfo}</p>
                                    {number.ipAddress && (
                                      <p className="text-xs text-gray-500">
                                        IP: {number.ipAddress}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Footer Stats */}
                              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                  <Key className="h-4 w-4 text-purple-500" />
                                  <span
                                    className={cn(
                                      "font-medium",
                                      number.attemptedVerifications > 50
                                        ? "text-red-600 dark:text-red-400"
                                        : number.attemptedVerifications > 20
                                        ? "text-orange-600 dark:text-orange-400"
                                        : "text-purple-600 dark:text-purple-400"
                                    )}
                                  >
                                    {number.attemptedVerifications} {t("attempts")}
                                  </span>
                                </div>
                                {number.lastAttempt && (
                                  <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    {number.lastAttempt}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      // Desktop Table View
                      <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                          <TableHead className="w-[50px]">
                            <Checkbox
                              checked={
                                selectedNumbers.length ===
                                filteredNumbers.length
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedNumbers(
                                    filteredNumbers.map((n) => n.id)
                                  );
                                } else {
                                  setSelectedNumbers([]);
                                }
                              }}
                            />
                          </TableHead>
                          <TableHead>{t("Phone Number")}</TableHead>
                          <TableHead>{t("Customer")}</TableHead>
                          <TableHead>{t("Reason")}</TableHead>
                          <TableHead>{t("Status")}</TableHead>
                          <TableHead>{t("Device Info")}</TableHead>
                          <TableHead>{t("OTP Attempts")}</TableHead>
                          <TableHead>{t("Last Attempt")}</TableHead>
                          <TableHead className="text-right">
                            {t("Actions")}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredNumbers.map((number) => (
                          <TableRow
                            key={number.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedNumbers.includes(number.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedNumbers([
                                      ...selectedNumbers,
                                      number.id,
                                    ]);
                                  } else {
                                    setSelectedNumbers(
                                      selectedNumbers.filter(
                                        (id) => id !== number.id
                                      )
                                    );
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-indigo-400" />
                                <span className="font-medium">
                                  {number.phoneNumber}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      number.phoneNumber
                                    );
                                    toast({
                                      title: t("Copied"),
                                      description: t(
                                        "Phone number copied to clipboard"
                                      ),
                                    });
                                  }}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="font-medium">
                                    {number.customerName || t("Unknown")}
                                  </p>
                                  {number.location && (
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {number.location}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[200px]">
                                <p className="text-sm">{number.reason}</p>
                                {number.notes && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-3 w-3 text-gray-400 mt-1" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{number.notes}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  number.status === "permanent"
                                    ? "destructive"
                                    : number.status === "temporary"
                                    ? "secondary"
                                    : "default"
                                }
                                className="capitalize"
                              >
                                <div
                                  className={cn(
                                    "w-2 h-2 rounded-full mr-2",
                                    number.status === "permanent" &&
                                      "bg-red-500",
                                    number.status === "temporary" &&
                                      "bg-amber-500",
                                    number.status === "active" && "bg-green-500"
                                  )}
                                />
                                {t(number.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {number.deviceInfo ? (
                                <div className="flex items-center gap-2 text-sm">
                                  <Smartphone className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p>{number.deviceInfo}</p>
                                    {number.ipAddress && (
                                      <p className="text-xs text-gray-500">
                                        IP: {number.ipAddress}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">
                                  {t("No data")}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Key className="h-4 w-4 text-purple-500" />
                                <span
                                  className={cn(
                                    "font-medium",
                                    number.attemptedVerifications > 50
                                      ? "text-red-600 dark:text-red-400"
                                      : number.attemptedVerifications > 20
                                      ? "text-orange-600 dark:text-orange-400"
                                      : "text-purple-600 dark:text-purple-400"
                                  )}
                                >
                                  {number.attemptedVerifications}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {number.lastAttempt && (
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  {number.lastAttempt}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-1">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="hover:text-amber-600"
                                    >
                                      <Edit className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>{t("Edit")}</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleUnblockNumber()}
                                      className="hover:text-green-600"
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {t("Unblock OTP")}
                                  </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button size="sm" variant="ghost">
                                      <MoreVertical className="h-4 w-4 text-gray-400" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {t("More Options")}
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    )
                  ) : (
                    <Empty className="py-12" Name={t("Blocked OTP Numbers")} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6 mt-0">
              <Alert className="border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  {t("Showing OTP blocks from the last 24 hours")}
                </AlertDescription>
              </Alert>
              <Empty className="py-12" Name={t("Recent OTP Blocks")} />
            </TabsContent>

            <TabsContent value="suspicious" className="space-y-6 mt-0">
              <Alert className="border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription>
                  {t("Numbers with suspicious OTP request patterns")}
                </AlertDescription>
              </Alert>
              <Empty className="py-12" Name={t("Suspicious Activity")} />
            </TabsContent>

            <TabsContent value="auto-blocked" className="space-y-6 mt-0">
              <Alert className="border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <Shield className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  {t("Numbers automatically blocked by security system")}
                </AlertDescription>
              </Alert>
              <Empty className="py-12" Name={t("Auto-Blocked Numbers")} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Number Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Block OTP Verification")}</DialogTitle>
            <DialogDescription>
              {t("Block a phone number from receiving OTP codes")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t("Phone Number")} *</Label>
              <Input
                id="phone"
                placeholder="+20XXXXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">{t("Reason for Blocking")} *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={t("Select a reason")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="too-many">
                    {t("Too many OTP requests")}
                  </SelectItem>
                  <SelectItem value="abuse">{t("OTP abuse")}</SelectItem>
                  <SelectItem value="suspicious">
                    {t("Suspicious activity")}
                  </SelectItem>
                  <SelectItem value="bot">
                    {t("Bot activity detected")}
                  </SelectItem>
                  <SelectItem value="manual">{t("Manual block")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">{t("Block Type")}</Label>
              <Select value={blockType} onValueChange={setBlockType}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">{t("Permanent")}</SelectItem>
                  <SelectItem value="24hours">{t("24 Hours")}</SelectItem>
                  <SelectItem value="48hours">{t("48 Hours")}</SelectItem>
                  <SelectItem value="7days">{t("7 Days")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">
                {t("Notes")} ({t("Optional")})
              </Label>
              <Textarea
                id="notes"
                placeholder={t("Additional information...")}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {t(
                  "This number will not be able to receive OTP verification codes"
                )}
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-gray-200 dark:border-gray-700"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleAddNumber}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {t("Block OTP")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Add Dialog */}
      <Dialog open={isBulkAddDialogOpen} onOpenChange={setIsBulkAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Bulk Block OTP Numbers")}</DialogTitle>
            <DialogDescription>
              {t("Add multiple phone numbers at once (one per line)")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bulk">{t("Phone Numbers")}</Label>
              <Textarea
                id="bulk"
                placeholder={`+201234567890\n+201234567891\n+201234567892`}
                value={bulkNumbers}
                onChange={(e) => setBulkNumbers(e.target.value)}
                rows={10}
                className="font-mono"
              />
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {t(
                  "Enter phone numbers one per line. Invalid numbers will be skipped."
                )}
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBulkAddDialogOpen(false)}
              className="border-gray-200 dark:border-gray-700"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleBulkAdd}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              {t("Block All")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Security Settings Dialog */}
      <Dialog
        open={isSettingsDialogOpen}
        onOpenChange={setIsSettingsDialogOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("OTP Security Settings")}</DialogTitle>
            <DialogDescription>
              {t("Configure automatic blocking and security rules")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">
                    {t("Auto-Block Suspicious Numbers")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("Automatically block after threshold")}
                  </p>
                </div>
              </div>
              <Switch checked={autoBlock} onCheckedChange={setAutoBlock} />
            </div>

            <div className="space-y-2">
              <Label>{t("Maximum OTP Attempts")}</Label>
              <Select value={maxAttempts} onValueChange={setMaxAttempts}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">{t("3 attempts per hour")}</SelectItem>
                  <SelectItem value="5">{t("5 attempts per hour")}</SelectItem>
                  <SelectItem value="10">
                    {t("10 attempts per hour")}
                  </SelectItem>
                  <SelectItem value="20">
                    {t("20 attempts per hour")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("Auto-Block Duration")}</Label>
              <Select value={blockDuration} onValueChange={setBlockDuration}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t("1 hour")}</SelectItem>
                  <SelectItem value="6">{t("6 hours")}</SelectItem>
                  <SelectItem value="24">{t("24 hours")}</SelectItem>
                  <SelectItem value="48">{t("48 hours")}</SelectItem>
                  <SelectItem value="168">{t("7 days")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                {t(
                  "These settings help prevent OTP abuse and reduce SMS costs"
                )}
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSettingsDialogOpen(false)}
              className="border-gray-200 dark:border-gray-700"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {t("Save Settings")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

export default BlockedVerification;
