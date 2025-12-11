import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MessageSquare,
  Users,
  Send,
  TrendingUp,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  Clock,
  CheckCircle,
  Zap,
  QrCode,
  Download,
  Upload,
  Settings,
  Bot,
  FileText,
  Image,
  Paperclip,
  Globe,
  PlayCircle,
  PauseCircle,
  Activity,
  UserCheck,
  MessageCircle,
  ShoppingCart,
  Package
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

interface Campaign {
  id: string;
  name: string;
  type: "broadcast" | "automated" | "template" | "interactive";
  status: "active" | "paused" | "scheduled" | "completed";
  audience: string;
  audienceSize: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  responseCount: number;
  conversionCount: number;
  scheduledTime?: string;
  createdAt: string;
  template: string;
}

interface Template {
  id: string;
  name: string;
  category: "marketing" | "utility" | "authentication";
  content: string;
  status: "approved" | "pending" | "rejected";
  language: string;
  variables: string[];
  usage: number;
  approvalRate: number;
  hasMedia: boolean;
  mediaType?: "image" | "video" | "document";
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastSeen: string;
  tags: string[];
  conversationCount: number;
  status: "active" | "blocked" | "unsubscribed";
  optInDate: string;
}

function WhatsappMarketing() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTab, setSelectedTab] = useState("campaigns");
  const [automationEnabled, setAutomationEnabled] = useState(true);

  // Mock data
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Holiday Sale Announcement",
      type: "broadcast",
      status: "active",
      audience: "All Customers",
      audienceSize: 5420,
      sentCount: 5420,
      deliveredCount: 5156,
      readCount: 4234,
      responseCount: 892,
      conversionCount: 234,
      createdAt: "2024-12-08T09:00:00Z",
      template: "holiday_sale_2024"
    },
    {
      id: "2",
      name: "Cart Recovery Campaign",
      type: "automated",
      status: "active",
      audience: "Cart Abandoners",
      audienceSize: 1230,
      sentCount: 890,
      deliveredCount: 856,
      readCount: 723,
      responseCount: 234,
      conversionCount: 156,
      createdAt: "2024-12-01T10:00:00Z",
      template: "cart_recovery"
    },
    {
      id: "3",
      name: "Product Launch",
      type: "template",
      status: "scheduled",
      audience: "VIP Customers",
      audienceSize: 890,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      responseCount: 0,
      conversionCount: 0,
      scheduledTime: "2024-12-15T14:00:00Z",
      createdAt: "2024-12-05T11:00:00Z",
      template: "product_launch"
    },
    {
      id: "4",
      name: "Customer Survey",
      type: "interactive",
      status: "completed",
      audience: "Recent Buyers",
      audienceSize: 2340,
      sentCount: 2340,
      deliveredCount: 2245,
      readCount: 1890,
      responseCount: 678,
      conversionCount: 0,
      createdAt: "2024-11-25T09:00:00Z",
      template: "customer_survey"
    },
    {
      id: "5",
      name: "Order Updates",
      type: "automated",
      status: "paused",
      audience: "Active Orders",
      audienceSize: 456,
      sentCount: 234,
      deliveredCount: 230,
      readCount: 210,
      responseCount: 45,
      conversionCount: 0,
      createdAt: "2024-11-20T12:00:00Z",
      template: "order_update"
    }
  ];

  const templates: Template[] = [
    {
      id: "1",
      name: "Welcome Message",
      category: "marketing",
      content: "Hello {{1}}! 🎉 Welcome to our store. Enjoy {{2}}% off on your first order with code: {{3}}",
      status: "approved",
      language: "en",
      variables: ["name", "discount", "code"],
      usage: 3456,
      approvalRate: 98.5,
      hasMedia: true,
      mediaType: "image"
    },
    {
      id: "2",
      name: "Order Confirmation",
      category: "utility",
      content: "Hi {{1}}, your order #{{2}} has been confirmed! Track your order: {{3}}",
      status: "approved",
      language: "en",
      variables: ["name", "order_id", "tracking_link"],
      usage: 8923,
      approvalRate: 99.8,
      hasMedia: false
    },
    {
      id: "3",
      name: "Flash Sale Alert",
      category: "marketing",
      content: "🔥 FLASH SALE! {{1}} is now {{2}}% OFF! Limited time only. Shop now: {{3}}",
      status: "pending",
      language: "en",
      variables: ["product", "discount", "link"],
      usage: 0,
      approvalRate: 0,
      hasMedia: true,
      mediaType: "video"
    },
    {
      id: "4",
      name: "OTP Verification",
      category: "authentication",
      content: "Your verification code is {{1}}. Valid for {{2}} minutes.",
      status: "approved",
      language: "en",
      variables: ["otp", "validity"],
      usage: 12456,
      approvalRate: 100,
      hasMedia: false
    }
  ];

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Ahmed Hassan",
      phone: "+201234567890",
      avatar: "/th (2).jpg",
      lastSeen: "2024-12-08T10:30:00Z",
      tags: ["VIP", "Frequent Buyer"],
      conversationCount: 45,
      status: "active",
      optInDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Fatima Ali",
      phone: "+201234567891",
      avatar: "/th (3).jpg",
      lastSeen: "2024-12-08T11:00:00Z",
      tags: ["New Customer"],
      conversationCount: 12,
      status: "active",
      optInDate: "2024-11-20"
    },
    {
      id: "3",
      name: "Mohamed Ibrahim",
      phone: "+201234567892",
      lastSeen: "2024-12-07T15:00:00Z",
      tags: ["Support Issue"],
      conversationCount: 23,
      status: "blocked",
      optInDate: "2024-06-10"
    }
  ];

  // Statistics
  const totalContacts = 12456;
  const activeContacts = 10234;
  const totalMessagesSent = 234567;
  const avgDeliveryRate = 95.2;
  const avgReadRate = 82.3;
  const avgResponseRate = 18.7;

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.audience.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || campaign.type === filterType;
    const matchesStatus = filterStatus === "all" || campaign.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "broadcast": return <Send className="h-4 w-4" />;
      case "automated": return <Zap className="h-4 w-4" />;
      case "template": return <FileText className="h-4 w-4" />;
      case "interactive": return <MessageCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <PlayCircle className="h-3 w-3 mr-1" />
            {t("whatsappMarketing.campaignList.status.active")}
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">
            <PauseCircle className="h-3 w-3 mr-1" />
            {t("whatsappMarketing.campaignList.status.paused")}
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
            <Clock className="h-3 w-3 mr-1" />
            {t("campaigns.scheduled")}
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t("whatsappMarketing.campaignList.status.completed")}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTemplateStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">{t("whatsappMarketing.templateStatus.approved")}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">{t("whatsappMarketing.templateStatus.pending")}</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400">{t("whatsappMarketing.templateStatus.rejected")}</Badge>;
      default:
        return null;
    }
  };

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <Card className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getTypeIcon(campaign.type)}
              <h3 className="font-medium">{campaign.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              <Clock className="h-3 w-3 inline mr-1" />
              {new Date(campaign.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2">
              {getStatusBadge(campaign.status)}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                {t("campaigns.viewReport")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                {t("whatsappMarketing.campaignList.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                {t("campaigns.duplicate")}
              </DropdownMenuItem>
              {campaign.status === "active" && (
                <DropdownMenuItem>
                  <PauseCircle className="h-4 w-4 mr-2" />
                  {t("whatsappMarketing.campaignList.pause")}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                {t("common.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-medium">{campaign.audience}</p>
          <p className="text-xs text-muted-foreground">
            {campaign.audienceSize.toLocaleString()} {t("whatsappMarketing.contacts")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{t("customerCommunication.delivered")}</p>
            <div className="space-y-1 mt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">
                  {campaign.deliveredCount > 0
                    ? ((campaign.deliveredCount / campaign.sentCount) * 100).toFixed(1)
                    : 0}%
                </span>
              </div>
              <Progress
                value={campaign.deliveredCount > 0 ? (campaign.deliveredCount / campaign.sentCount) * 100 : 0}
                className="h-2"
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">{t("whatsappMarketing.quickStats.engagement")}</p>
            <div className="flex items-center gap-4 text-xs mt-1">
              <div>
                <span className="font-medium">
                  {campaign.deliveredCount > 0 ? ((campaign.readCount / campaign.deliveredCount) * 100).toFixed(0) : 0}%
                </span>
                <span className="text-muted-foreground ml-1">{t("campaigns.conversions")}</span>
              </div>
              <div>
                <span className="font-medium">
                  {campaign.readCount > 0 ? ((campaign.responseCount / campaign.readCount) * 100).toFixed(0) : 0}%
                </span>
                <span className="text-muted-foreground ml-1">{t("customers.email")}</span>
              </div>
            </div>
          </div>
        </div>

        {campaign.conversionCount > 0 && (
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">{t("campaigns.conversions")}</span>
            <div className="text-right">
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                {campaign.conversionCount}
              </p>
              <p className="text-xs text-muted-foreground">
                {((campaign.conversionCount / campaign.sentCount) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const ContactCard = ({ contact }: { contact: Contact }) => (
    <Card className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              {contact.avatar && <AvatarImage src={contact.avatar} />}
              <AvatarFallback>{contact.name.split(' ').filter(Boolean).map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
            </div>
          </div>
          <Badge className={
            contact.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" :
            contact.status === "blocked" ? "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400" :
            "bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400"
          }>
            {contact.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          {contact.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
          <div>
            <p className="text-muted-foreground">{t("whatsappMarketing.contactsOverview.groups")}</p>
            <p className="font-medium">{contact.conversationCount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{t("customers.lastSeen")}</p>
            <p className="font-medium">{new Date(contact.lastSeen).toLocaleDateString()}</p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          <MessageSquare className="h-4 w-4 mr-2" />
          {t("navigation.agentStore")}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title
            title={t("whatsappMarketing.title")}
            Subtitle={t("whatsappMarketing.subtitle")}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="glow-on-hover flex-1 sm:flex-none">
              <QrCode className="h-4 w-4 mr-2" />
              {t("products.barcode")}
            </Button>
            <Button className="glow-on-hover flex-1 sm:flex-none" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              {t("whatsappMarketing.createCampaign")}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Active  Contacts"}</p>
                  <p className="text-3xl font-bold mt-1">{activeContacts.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">
                      +{((activeContacts / totalContacts) * 100).toFixed(1)}% {"Opt-in"}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Messages  Sent"}</p>
                  <p className="text-3xl font-bold mt-1">{(totalMessagesSent / 1000).toFixed(0)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      {avgDeliveryRate}% {"Delivered"}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center">
                  <Send className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("campaigns.conversions")}</p>
                  <p className="text-3xl font-bold mt-1">{avgReadRate}%</p>
                  <Progress value={avgReadRate} className="h-2 mt-2" />
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("retargeting.conversionRate")}</p>
                  <p className="text-3xl font-bold mt-1">{avgResponseRate}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                    <span className="text-xs text-orange-600 dark:text-orange-400">
                      +2.3% {t("whatsappMarketing.quickStats.vsLastMonth")}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-400/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp Business Account */}
        <Card className="glass-card border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              {t("whatsappMarketing.title")} Business Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/th (6).jpg" alt="Business" />
                  <AvatarFallback>WA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">Your Store Name</h3>
                  <p className="text-sm text-muted-foreground">+20 123 456 7890</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 flex-wrap">
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {t("common.status")} Business
                    </Badge>
                    <Badge variant="outline">
                      <Globe className="h-3 w-3 mr-1" />
                      API v17.0
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">1K</p>
                    <p className="text-xs text-muted-foreground">{t("common.date")} Limit</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">100K</p>
                    <p className="text-xs text-muted-foreground">{t("dashboard.thisMonth")} Limit</p>
                  </div>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  {t("whatsappMarketing.automationRules.createAutomation")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full max-w-[600px] grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="campaigns">{t("whatsappMarketing.campaigns")}</TabsTrigger>
            <TabsTrigger value="templates">{t("whatsappMarketing.templates")}</TabsTrigger>
            <TabsTrigger value="contacts">{t("whatsappMarketing.contacts")}</TabsTrigger>
            <TabsTrigger value="automation">{t("whatsappMarketing.automation")}</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center shrink-0">
                    <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("campaigns.type")}</p>
                    <p className="text-xs text-muted-foreground">{t("common.sendEmail")}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center shrink-0">
                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("whatsappMarketing.automation")}</p>
                    <p className="text-xs text-muted-foreground">{t("retargeting.audience")}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-400/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("whatsappMarketing.templates")}</p>
                    <p className="text-xs text-muted-foreground">{t("whatsappMarketing.templateStatus.approved")}</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 hover:scale-105 transition-all duration-300 hover:border-primary"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-400/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t("common.actions")}</p>
                    <p className="text-xs text-muted-foreground">{t("navigation.appMarketplace")}</p>
                  </div>
                </div>
              </Button>
            </div>

            {/* Campaigns Table */}
            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <CardTitle className="text-lg">{t("campaigns.title")}</CardTitle>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t("common.search")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full sm:w-[130px]">
                          <SelectValue placeholder={t("campaigns.type")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("common.all")}</SelectItem>
                          <SelectItem value="broadcast">{t("campaigns.type")}</SelectItem>
                          <SelectItem value="automated">{t("whatsappMarketing.automation")}</SelectItem>
                          <SelectItem value="template">{t("whatsappMarketing.templates")}</SelectItem>
                          <SelectItem value="interactive">{t("common.actions")}</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full sm:w-[120px]">
                          <SelectValue placeholder={t("campaigns.status")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("common.all")}</SelectItem>
                          <SelectItem value="active">{t("whatsappMarketing.campaignList.status.active")}</SelectItem>
                          <SelectItem value="paused">{t("whatsappMarketing.campaignList.status.paused")}</SelectItem>
                          <SelectItem value="scheduled">{t("campaigns.scheduled")}</SelectItem>
                          <SelectItem value="completed">{t("whatsappMarketing.campaignList.status.completed")}</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="ghost" size="icon" className="shrink-0 hover:bg-transparent dark:hover:bg-transparent">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-4 lg:hidden">
                  {filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="rounded-lg overflow-hidden hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 dark:border-gray-700">
                        <TableHead>{t("campaigns.campaignName")}</TableHead>
                        <TableHead>{t("retargeting.audience")}</TableHead>
                        <TableHead>{t("campaigns.status")}</TableHead>
                        <TableHead>{t("crossSelling.performance")}</TableHead>
                        <TableHead>{t("whatsappMarketing.quickStats.engagement")}</TableHead>
                        <TableHead>{t("campaigns.conversions")}</TableHead>
                        <TableHead className="text-right">{t("common.actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(campaign.type)}
                              <div>
                                <p className="font-medium">{campaign.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 inline mr-1" />
                                  {new Date(campaign.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{campaign.audience}</p>
                              <p className="text-xs text-muted-foreground">
                                {campaign.audienceSize.toLocaleString()} {t("whatsappMarketing.contacts")}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{t("customerCommunication.delivered")}</span>
                                <span className="font-medium">
                                  {campaign.deliveredCount > 0 
                                    ? ((campaign.deliveredCount / campaign.sentCount) * 100).toFixed(1)
                                    : 0}%
                                </span>
                              </div>
                              <Progress 
                                value={campaign.deliveredCount > 0 ? (campaign.deliveredCount / campaign.sentCount) * 100 : 0} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="text-center">
                                <p className="font-medium">{((campaign.readCount / campaign.deliveredCount) * 100).toFixed(0)}%</p>
                                <p className="text-xs text-muted-foreground">{t("campaigns.conversions")}</p>
                              </div>
                              <div className="text-center">
                                <p className="font-medium">{((campaign.responseCount / campaign.readCount) * 100).toFixed(0)}%</p>
                                <p className="text-xs text-muted-foreground">{t("customers.email")}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {campaign.conversionCount > 0 ? (
                              <div className="text-center">
                                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                                  {campaign.conversionCount}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {((campaign.conversionCount / campaign.sentCount) * 100).toFixed(1)}%
                                </p>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-center block">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t("campaigns.viewReport")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  {t("whatsappMarketing.campaignList.edit")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  {t("campaigns.duplicate")}
                                </DropdownMenuItem>
                                {campaign.status === "active" && (
                                  <DropdownMenuItem>
                                    <PauseCircle className="h-4 w-4 mr-2" />
                                    {t("whatsappMarketing.campaignList.pause")}
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {t("common.delete")}
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
                    {t("products.showingCount", { count: filteredCampaigns.length })} {campaigns.length} {t("whatsappMarketing.campaigns")}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      {t("common.previous")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("common.next")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="glass-card border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          template.category === "marketing" ? "bg-blue-100 dark:bg-blue-950/30" :
                          template.category === "utility" ? "bg-green-100 dark:bg-green-950/30" :
                          "bg-purple-100 dark:bg-purple-950/30"
                        }`}>
                          {template.hasMedia && template.mediaType === "image" && <Image className="h-5 w-5" />}
                          {template.hasMedia && template.mediaType === "video" && <PlayCircle className="h-5 w-5" />}
                          {template.hasMedia && template.mediaType === "document" && <Paperclip className="h-5 w-5" />}
                          {!template.hasMedia && <FileText className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">{template.category}</Badge>
                            {getTemplateStatusBadge(template.status)}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm font-mono break-words">{template.content}</p>
                    </div>
                    
                    {template.variables.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {`{{${idx + 1}}} ${variable}`}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">{t("coupons.usageLimit")}</p>
                        <p className="font-medium">{template.usage.toLocaleString()} {t("whatsappMarketing.broadcastSettings.times")}</p>
                      </div>
                      {template.approvalRate > 0 && (
                        <div>
                          <p className="text-muted-foreground">{t("coupons.timesUsed")} Rate</p>
                          <p className="font-medium">{template.approvalRate}%</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Send className="h-4 w-4 mr-2" />
                        {t("whatsappMarketing.createTemplate")}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg">{t("whatsappMarketing.contacts")}</CardTitle>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Upload className="h-4 w-4 mr-2" />
                      {t("whatsappMarketing.importContacts")}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Download className="h-4 w-4 mr-2" />
                      {t("common.export")}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-4 lg:hidden">
                  {contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                  ))}
                </div>

                {/* Desktop List View */}
                <div className="space-y-4 hidden lg:block">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          {contact.avatar && <AvatarImage src={contact.avatar} />}
                          <AvatarFallback>{contact.name.split(' ').filter(Boolean).map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {contact.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">{contact.conversationCount}</p>
                          <p className="text-xs text-muted-foreground">{t("whatsappMarketing.contactsOverview.groups")}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">{t("customers.lastSeen")}</p>
                          <p className="text-xs">{new Date(contact.lastSeen).toLocaleDateString()}</p>
                        </div>
                        <Badge className={
                          contact.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" :
                          contact.status === "blocked" ? "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400" :
                          "bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400"
                        }>
                          {contact.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {t("navigation.agentStore")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    {t("whatsappMarketing.automationRules.triggers")} {t("common.settings")}
                  </CardTitle>
                  <Switch 
                    checked={automationEnabled}
                    onCheckedChange={setAutomationEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          <h4 className="font-medium">{t("retargeting.abandonedCart")}</h4>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t("coupons.discountValue")} reminder after 2 {t("whatsappMarketing.broadcastSettings.hours")} of {t("retargeting.abandonedCart")}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        {t("whatsappMarketing.automationRules.createAutomation")}
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-medium">{t("orders.orderDetails")} {t("common.update")}</h4>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t("whatsappMarketing.automation")} {t("orders.status")} {t("navigation.notifications")}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        {"Configure"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <h4 className="font-medium">{t("whatsappMarketing.campaignList.welcomeSeries")}</h4>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t("common.new")} {t("whatsappMarketing.contacts")} {t("whatsappMarketing.automation")}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        {"Configure"}
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <h4 className="font-medium">{t("whatsappMarketing.automationRules.messages")}</h4>
                        </div>
                        <Switch />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t("customers.email")} {t("whatsappMarketing.broadcastSettings.sendingWindow")}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        {"Configure"}
                      </Button>
                    </div>
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

export default WhatsappMarketing;
