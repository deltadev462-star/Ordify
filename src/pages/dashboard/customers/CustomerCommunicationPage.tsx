import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  MessageSquare,
  Send,
  Plus,
  Filter,
  MoreVertical,
  Phone,
  Clock,
  Target,
  BarChart3,
  FileText,
  Calendar,
  Edit,
  Copy,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap,
  Smartphone,
  PenTool,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp' | 'push';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'failed';
  recipients: {
    total: number;
    delivered: number;
    opened: number;
    clicked: number;
    failed: number;
  };
  segment: string;
  scheduledAt?: string;
  sentAt?: string;
  subject?: string;
  message: string;
  performance: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
    revenue: number;
  };
}

interface MessageTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp';
  category: string;
  subject?: string;
  content: string;
  usageCount: number;
  lastUsed?: string;
  performance: {
    avgOpenRate: number;
    avgClickRate: number;
  };
}

export default function CustomerCommunicationPage() {
  const { t } = useTranslation();
  
  const [selectedTab, setSelectedTab] = useState("campaigns");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<'email' | 'sms' | 'whatsapp'>('email');

  // Sample campaigns data
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "New Year Sale Announcement",
      type: "email",
      status: "completed",
      recipients: {
        total: 2450,
        delivered: 2380,
        opened: 1428,
        clicked: 357,
        failed: 70
      },
      segment: "All Active Customers",
      sentAt: "2024-01-01T09:00:00Z",
      subject: "🎉 New Year Sale - Up to 50% Off!",
      message: "Start the year with amazing deals...",
      performance: {
        openRate: 60,
        clickRate: 25,
        conversionRate: 12,
        revenue: 45600
      }
    },
    {
      id: "2",
      name: "Abandoned Cart Reminder",
      type: "whatsapp",
      status: "active",
      recipients: {
        total: 145,
        delivered: 142,
        opened: 98,
        clicked: 45,
        failed: 3
      },
      segment: "Abandoned Carts",
      scheduledAt: "2024-01-15T14:00:00Z",
      message: "Hi! You left some items in your cart...",
      performance: {
        openRate: 69,
        clickRate: 46,
        conversionRate: 28,
        revenue: 12300
      }
    },
    {
      id: "3",
      name: "VIP Customer Exclusive",
      type: "email",
      status: "scheduled",
      recipients: {
        total: 245,
        delivered: 0,
        opened: 0,
        clicked: 0,
        failed: 0
      },
      segment: "VIP Customers",
      scheduledAt: "2024-01-20T10:00:00Z",
      subject: "Exclusive Offer for Our VIP Customers",
      message: "As a valued VIP customer...",
      performance: {
        openRate: 0,
        clickRate: 0,
        conversionRate: 0,
        revenue: 0
      }
    },
    {
      id: "4",
      name: "Order Confirmation SMS",
      type: "sms",
      status: "active",
      recipients: {
        total: 892,
        delivered: 885,
        opened: 885,
        clicked: 0,
        failed: 7
      },
      segment: "Recent Orders",
      message: "Your order #ORDER_ID has been confirmed...",
      performance: {
        openRate: 100,
        clickRate: 0,
        conversionRate: 0,
        revenue: 0
      }
    }
  ];

  // Sample message templates
  const templates: MessageTemplate[] = [
    {
      id: "1",
      name: "Welcome Email",
      type: "email",
      category: "Onboarding",
      subject: "Welcome to {{store_name}}!",
      content: "Hi {{customer_name}}, welcome to our store...",
      usageCount: 482,
      lastUsed: "2024-01-15T10:00:00Z",
      performance: {
        avgOpenRate: 72,
        avgClickRate: 34
      }
    },
    {
      id: "2",
      name: "Order Shipped",
      type: "sms",
      category: "Transactional",
      content: "Hi {{customer_name}}, your order #{{order_id}} has been shipped...",
      usageCount: 1250,
      lastUsed: "2024-01-15T14:30:00Z",
      performance: {
        avgOpenRate: 95,
        avgClickRate: 12
      }
    },
    {
      id: "3",
      name: "Abandoned Cart",
      type: "whatsapp",
      category: "Recovery",
      content: "Hi {{customer_name}}! You left these items in your cart...",
      usageCount: 156,
      lastUsed: "2024-01-14T18:00:00Z",
      performance: {
        avgOpenRate: 68,
        avgClickRate: 42
      }
    }
  ];

  // Statistics
  const stats = [
    {
      title: t("Messages Sent"),
      value: "12.4K",
      change: 23.5,
      changeType: "increase" as const,
      icon: Send,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "up" as const,
      period: t("this month"),
    },
    {
      title: t("Open Rate"),
      value: "68%",
      change: 5.2,
      changeType: "increase" as const,
      icon: Eye,
      iconColor: "text-green-600 dark:text-green-400",
      iconBgColor: "bg-green-50 dark:bg-green-950/30",
      trend: "up" as const,
      period: t("avg open rate"),
    },
    {
      title: t("Click Rate"),
      value: "24%",
      change: 2.8,
      changeType: "increase" as const,
      icon: Target,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "up" as const,
      period: t("avg click rate"),
    },
    {
      title: t("Revenue"),
      value: "89.5K",
      change: 34.2,
      changeType: "increase" as const,
      icon: TrendingUp,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      trend: "up" as const,
      period: t("from campaigns"),
    },
  ];

  const getStatusBadge = (status: Campaign['status']) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, icon: PenTool, className: "" },
      scheduled: { variant: "outline" as const, icon: Clock, className: "" },
      active: { variant: "default" as const, icon: Zap, className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0" },
      completed: { variant: "default" as const, icon: CheckCircle, className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0" },
      failed: { variant: "destructive" as const, icon: AlertCircle, className: "" }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={cn("gap-1", config.className)}>
        <Icon className="h-3 w-3" />
        {t(status)}
      </Badge>
    );
  };

  const getChannelIcon = (type: Campaign['type']) => {
    const icons = {
      email: Mail,
      sms: MessageSquare,
      whatsapp: Phone,
      push: Smartphone
    };
    return icons[type] || Mail;
  };

  const getChannelColor = (type: Campaign['type']) => {
    const colors = {
      email: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
      sms: "text-green-600 bg-green-50 dark:bg-green-950/30",
      whatsapp: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
      push: "text-purple-600 bg-purple-50 dark:bg-purple-950/30"
    };
    return colors[type] || "text-gray-600 bg-gray-50";
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return campaign.name.toLowerCase().includes(term) || 
             campaign.segment.toLowerCase().includes(term);
    }
    return true;
  });

  const filteredTemplates = templates.filter(template => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return template.name.toLowerCase().includes(term) || 
             template.category.toLowerCase().includes(term);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("Communication")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("Engage with your customers through multiple channels")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            {t("Filter")}
          </Button>
          
          <Dialog open={isCreateCampaignOpen} onOpenChange={setIsCreateCampaignOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                <Plus className="h-4 w-4" />
                {t("Create Campaign")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{t("Create New Campaign")}</DialogTitle>
                <DialogDescription>
                  {t("Send targeted messages to your customer segments")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>{t("Campaign Name")}</Label>
                  <Input placeholder={t("e.g., Weekend Sale Announcement")} />
                </div>
                
                <div className="space-y-2">
                  <Label>{t("Channel")}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['email', 'sms', 'whatsapp'] as const).map((channel) => {
                      const Icon = getChannelIcon(channel);
                      return (
                        <Button
                          key={channel}
                          variant={selectedChannel === channel ? "default" : "outline"}
                          onClick={() => setSelectedChannel(channel)}
                          className="gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          {t(channel.toUpperCase())}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>{t("Target Segment")}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select customer segment")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("All Customers")}</SelectItem>
                      <SelectItem value="vip">{t("VIP Customers")}</SelectItem>
                      <SelectItem value="new">{t("New Customers")}</SelectItem>
                      <SelectItem value="inactive">{t("Inactive Customers")}</SelectItem>
                      <SelectItem value="abandoned">{t("Abandoned Carts")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedChannel === 'email' && (
                  <div className="space-y-2">
                    <Label>{t("Subject Line")}</Label>
                    <Input placeholder={t("Enter email subject...")} />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>{t("Message")}</Label>
                  <Textarea 
                    placeholder={t("Write your message here...")}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("Use {{customer_name}}, {{order_id}} for personalization")}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>{t("Schedule")}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("When to send?")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">{t("Send Now")}</SelectItem>
                      <SelectItem value="schedule">{t("Schedule for Later")}</SelectItem>
                      <SelectItem value="draft">{t("Save as Draft")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateCampaignOpen(false)}>
                  {t("Cancel")}
                </Button>
                <Button onClick={() => setIsCreateCampaignOpen(false)}>
                  {t("Create Campaign")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <MetricCard
            key={i}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBgColor={stat.iconBgColor}
            trend={stat.trend}
            period={stat.period}
          />
        ))}
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="campaigns" className="gap-2">
                  <Send className="h-4 w-4" />
                  {t("Campaigns")}
                </TabsTrigger>
                <TabsTrigger value="templates" className="gap-2">
                  <FileText className="h-4 w-4" />
                  {t("Templates")}
                </TabsTrigger>
                <TabsTrigger value="automation" className="gap-2">
                  <Zap className="h-4 w-4" />
                  {t("Automation")}
                </TabsTrigger>
              </TabsList>
              <div className="relative max-w-md">
                <Input
                  placeholder={t("Search...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <TabsContent value="campaigns" className="mt-6">
              <div className="space-y-4">
                {filteredCampaigns.map((campaign) => {
                  const ChannelIcon = getChannelIcon(campaign.type);
                  const deliveryRate = (campaign.recipients.delivered / campaign.recipients.total) * 100;
                  
                  return (
                    <Card key={campaign.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className={cn("p-3 rounded-lg", getChannelColor(campaign.type))}>
                              <ChannelIcon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{campaign.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {campaign.segment} • {campaign.recipients.total.toLocaleString()} {t("recipients")}
                              </p>
                              {campaign.subject && (
                                <p className="text-sm mt-2 font-medium">{campaign.subject}</p>
                              )}
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {campaign.message}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(campaign.status)}
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
                                  <Eye className="mr-2 h-4 w-4" />
                                  {t("View Details")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  {t("Edit Campaign")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" />
                                  {t("Duplicate")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart3 className="mr-2 h-4 w-4" />
                                  {t("View Analytics")}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  {t("Delete")}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Campaign Metrics */}
                        {campaign.status !== 'draft' && campaign.status !== 'scheduled' && (
                          <>
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-muted-foreground">{t("Delivery Rate")}</span>
                                <span className="font-medium">{deliveryRate.toFixed(1)}%</span>
                              </div>
                              <Progress value={deliveryRate} className="h-2" />
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">{t("Delivered")}</p>
                                <p className="text-lg font-semibold">{campaign.recipients.delivered.toLocaleString()}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">{t("Open Rate")}</p>
                                <p className="text-lg font-semibold">{campaign.performance.openRate}%</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">{t("Click Rate")}</p>
                                <p className="text-lg font-semibold">{campaign.performance.clickRate}%</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">{t("Revenue")}</p>
                                <p className="text-lg font-semibold">{t("EGP")} {campaign.performance.revenue.toLocaleString()}</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {/* Schedule/Sent Time */}
                        <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {campaign.status === 'scheduled' ? (
                            <span>{t("Scheduled for")} {new Date(campaign.scheduledAt!).toLocaleString()}</span>
                          ) : campaign.sentAt ? (
                            <span>{t("Sent on")} {new Date(campaign.sentAt).toLocaleString()}</span>
                          ) : (
                            <span>{t("Draft")}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="mt-6">
              <div className="mb-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 border-gray-200 dark:border-gray-700"
                >
                  <Plus className="h-4 w-4" />
                  {t("Create Template")}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => {
                  const ChannelIcon = getChannelIcon(template.type);
                  
                  return (
                    <Card key={template.id} className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg", getChannelColor(template.type))}>
                              <ChannelIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{template.name}</CardTitle>
                              <Badge variant="secondary" className="mt-1">
                                {template.category}
                              </Badge>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                {t("Preview")}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                {t("Edit")}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                {t("Duplicate")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                {t("Delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {template.subject && (
                          <p className="font-medium text-sm mb-2">{template.subject}</p>
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {template.content}
                        </p>
                        
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <p className="text-xs text-muted-foreground">{t("Open Rate")}</p>
                            <p className="text-sm font-semibold">{template.performance.avgOpenRate}%</p>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <p className="text-xs text-muted-foreground">{t("Click Rate")}</p>
                            <p className="text-sm font-semibold">{template.performance.avgClickRate}%</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{t("Used")} {template.usageCount} {t("times")}</span>
                          {template.lastUsed && (
                            <span>{new Date(template.lastUsed).toLocaleDateString()}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="automation" className="mt-6">
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                  <Zap className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("Marketing Automation")}</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  {t("Set up automated campaigns triggered by customer actions")}
                </p>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  {t("Create Automation")}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}