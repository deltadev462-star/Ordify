import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  BookOpen,
  Package,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  Wrench,
  MessageSquare,
  Mail,
  Phone,
  Ticket,
  FileText,
  Code,
  History,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Zap,
  Video,
  Users,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SupportPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: Zap,
      title: t("support.categories.gettingStarted"),
      description: t("support.categories.gettingStartedDesc"),
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    },
    {
      icon: ShoppingCart,
      title: t("support.categories.orders"),
      description: t("support.categories.ordersDesc"),
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Package,
      title: t("support.categories.products"),
      description: t("support.categories.productsDesc"),
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      icon: CreditCard,
      title: t("support.categories.payments"),
      description: t("support.categories.paymentsDesc"),
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: TrendingUp,
      title: t("support.categories.marketing"),
      description: t("support.categories.marketingDesc"),
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      icon: Wrench,
      title: t("support.categories.technical"),
      description: t("support.categories.technicalDesc"),
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-950/30",
    },
  ];

  const contactMethods = [
    {
      icon: MessageSquare,
      title: t("support.contactSupport.contactMethods.chat"),
      description: t("support.contactSupport.contactMethods.chatDesc"),
      action: t("support.actions.startChat"),
      variant: "default" as const,
    },
    {
      icon: Mail,
      title: t("support.contactSupport.contactMethods.email"),
      description: t("support.contactSupport.contactMethods.emailDesc"),
      action: t("support.actions.sendEmail"),
      variant: "outline" as const,
    },
    {
      icon: Phone,
      title: t("support.contactSupport.contactMethods.phone"),
      description: t("support.contactSupport.contactMethods.phoneDesc"),
      action: t("support.actions.callNow"),
      variant: "outline" as const,
    },
    {
      icon: Ticket,
      title: t("support.contactSupport.contactMethods.ticket"),
      description: t("support.contactSupport.contactMethods.ticketDesc"),
      action: t("support.actions.createTicket"),
      variant: "outline" as const,
    },
  ];

  const quickHelpItems = [
    { icon: HelpCircle, title: t("support.quickHelp.faq") },
    { icon: Video, title: t("support.quickHelp.videoTutorials") },
    { icon: BookOpen, title: t("support.quickHelp.documentation") },
    { icon: Users, title: t("support.quickHelp.community") },
  ];

  const popularArticles = [
    t("support.popularArticles.article1"),
    t("support.popularArticles.article2"),
    t("support.popularArticles.article3"),
    t("support.popularArticles.article4"),
    t("support.popularArticles.article5"),
    t("support.popularArticles.article6"),
  ];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-fade-up">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">{t("support.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("support.subtitle")}
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="search"
            placeholder={t("support.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 focus:border-primary transition-all duration-300 shadow-lg"
          />
        </div>
      </div>

      {/* System Status */}
      <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <Card className="glass-card border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {t("support.status.operational")}
                </span>
              </div>
              <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400">
                <Clock className="h-3 w-3 mr-1" />
                {t("support.contactSupport.availability")}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Help Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-2xl font-bold mb-6">{t("support.quickHelp.title")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickHelpItems.map((item, index) => (
            <Card
              key={index}
              className="glass-card border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-3 inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="glass-card border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${category.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <Card className="glass-card border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t("support.contactSupport.title")}</CardTitle>
            <CardDescription className="text-lg">
              {t("support.contactSupport.subtitle")}
            </CardDescription>
            <Badge variant="secondary" className="mt-2">
              <Clock className="h-3 w-3 mr-1" />
              {t("support.contactSupport.responseTime")}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all">
                    <CardContent className="p-6 text-center space-y-3">
                      <Icon className="h-8 w-8 mx-auto text-primary" />
                      <h3 className="font-semibold">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <Button variant={method.variant} className="w-full">
                        {method.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Articles & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: "0.5s" }}>
        {/* Popular Articles */}
        <Card className="glass-card border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t("support.popularArticles.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {popularArticles.map((article, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <span className="text-sm">{article}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </li>
              ))}
            </ul>
            <Button variant="ghost" className="w-full mt-4">
              {t("support.actions.viewAll")}
            </Button>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="glass-card border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t("support.resources.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>{t("support.resources.guides")}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <Code className="h-5 w-5 text-muted-foreground" />
                <span>{t("support.resources.apiDocs")}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <History className="h-5 w-5 text-muted-foreground" />
                <span>{t("support.resources.changelog")}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <span>{t("support.resources.systemStatus")}</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4">
              {t("support.actions.searchDocs")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}