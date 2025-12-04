import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { subNavigationData } from '@/data/sidebar-data';
import { cn } from '@/lib/utils';
import {
  Palette,
  Globe,
  Eye,
  Code,
  Laptop,
  Smartphone,
  Tablet,
  RefreshCw,
  Settings,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Activity,
  Clock,
  Languages,
  FileText,
  Brush,
  Type,
  Layout,
  Monitor,
  ChevronRight,
  Zap,
  Shield,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';

function WebsitePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const websiteNav = subNavigationData.website;
  
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const stats = [
    {
      title: t('Active Theme'),
      value: t('Modern Pro'),
      subValue: t('Last changed 5 days ago'),
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
      change: t('Updated'),
      badge: t('Premium')
    },
    {
      title: t('Total Pages'),
      value: '24',
      subValue: t('3 custom pages'),
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      progress: 80
    },
    {
      title: t('Languages'),
      value: '5',
      subValue: t('English default'),
      icon: Languages,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
      active: true
    },
    {
      title: t('Last Updated'),
      value: t('2 hours ago'),
      subValue: t('Auto-save enabled'),
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
      status: 'live'
    }
  ];

  const features = [
    { text: t('Responsive Design'), icon: Monitor },
    { text: t('SEO Optimized'), icon: Activity },
    { text: t('Fast Loading'), icon: Zap },
    { text: t('Secure SSL'), icon: Shield }
  ];

  const deviceSizes = {
    desktop: 'w-full',
    tablet: 'max-w-3xl mx-auto',
    mobile: 'max-w-sm mx-auto'
  };

  return (
    <div className="min-h-screen  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Modern Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-700/25"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
                <Globe className="h-8 w-8" />
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-3 py-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                {t('Live')}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {websiteNav.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
              {websiteNav.description}
            </p>
            
            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Website Preview Card */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="  pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{t('Your Website')}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <CardDescription>{t('www.yourstore.com')}</CardDescription>
                    <Badge variant="outline" className="text-xs">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-1" />
                      {t('Online')}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Device Preview Toggles */}
                <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Button
                    variant={devicePreview === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setDevicePreview('desktop')}
                  >
                    <Laptop className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={devicePreview === 'tablet' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setDevicePreview('tablet')}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={devicePreview === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setDevicePreview('mobile')}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="hidden sm:flex"
                >
                  <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                  {t('Refresh')}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('View Live')}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Code className="h-4 w-4 mr-2" />
                  {t('Code')}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="w-full rounded-none h-12 bg-gray-50 dark:bg-gray-900">
                <TabsTrigger value="preview" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  <Eye className="h-4 w-4 mr-2" />
                  {t('Preview')}
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  <Activity className="h-4 w-4 mr-2" />
                  {t('Analytics')}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('Settings')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="mt-0">
                <div className="bg-gray-50 dark:bg-gray-950 p-4 sm:p-8">
                  <div className={cn(
                    "bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden transition-all duration-500",
                    deviceSizes[devicePreview]
                  )}>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded h-6 px-3 flex items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400">{t('www.yourstore.com')}</span>
                      </div>
                    </div>
                    
                    <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                          <Layout className="h-12 w-12 text-primary" />
                        </div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          {t('Website Preview')}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t('Your website content will appear here')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">{t('Page Views')}</p>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-2xl font-bold">12,345</p>
                      <p className="text-xs text-green-600 mt-1">{t('+12.5% from last week')}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">{t('Bounce Rate')}</p>
                        <Activity className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold">42.3%</p>
                      <p className="text-xs text-blue-600 mt-1">{t('-2.1% improvement')}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">{t('Load Time')}</p>
                        <Zap className="h-4 w-4 text-orange-500" />
                      </div>
                      <p className="text-2xl font-bold">{t('1.2s')}</p>
                      <p className="text-xs text-orange-600 mt-1">{t('Excellent performance')}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">{t('SSL Certificate')}</p>
                        <p className="text-sm text-muted-foreground">{t('Your site is secure')}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      {t('Active')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{t('Custom Domain')}</p>
                        <p className="text-sm text-muted-foreground">{t('www.yourstore.com')}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('Manage')}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Enhanced Sub-navigation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {websiteNav.items.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;
            
            const cardGradients = [
              {
                bg: 'from-purple-500 to-pink-500',
                lightBg: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
                hoverBg: 'hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30'
              },
              {
                bg: 'from-blue-500 to-cyan-500',
                lightBg: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
                hoverBg: 'hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30'
              }
            ];
            
            const gradient = cardGradients[index % cardGradients.length];
            
            return (
              <Card
                key={item.title}
                className={cn(
                  "group cursor-pointer transition-all duration-300 border-0 shadow-xl hover:shadow-2xl hover:-translate-y-1",
                  `bg-gradient-to-br ${gradient.lightBg} ${gradient.hoverBg}`,
                  isActive && "ring-2 ring-primary shadow-primary/25"
                )}
                onClick={() => navigate(item.url)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {Icon && (
                        <div className={cn(
                          "p-4 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110",
                          `bg-gradient-to-br ${gradient.bg} text-white`
                        )}>
                          <Icon className="h-6 w-6" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-xl mb-1">{t(item.title)}</CardTitle>
                        <div className="flex items-center gap-2">
                          {item.title === "Themes" && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                              <Sparkles className="h-3 w-3 mr-1" />
                              {t('12 themes available')}
                            </Badge>
                          )}
                          {item.title === "Texts" && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                              <Languages className="h-3 w-3 mr-1" />
                              {t('5 languages')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-0">
                        {t('Active')}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {item.description}
                  </CardDescription>
                  
                  {/* Enhanced Preview Sections */}
                  {item.title === "Themes" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { name: t('Modern'), icon: Sparkles },
                          { name: t('Classic'), icon: Layout },
                          { name: t('Minimal'), icon: Type },
                          { name: t('Luxe'), icon: Brush }
                        ].map((theme) => (
                          <div
                            key={theme.name}
                            className="group/theme relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                          >
                            <div className={cn(
                              "absolute inset-0 bg-gradient-to-br",
                              theme.name === t('Modern') && "from-purple-400 to-pink-400",
                              theme.name === t('Classic') && "from-blue-400 to-indigo-400",
                              theme.name === t('Minimal') && "from-gray-300 to-gray-400",
                              theme.name === t('Luxe') && "from-amber-400 to-orange-400"
                            )} />
                            <div className="absolute inset-0 bg-black/10 group-hover/theme:bg-black/20 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <theme.icon className="h-6 w-6 mb-1 opacity-80" />
                              <span className="text-xs font-medium">{theme.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{t('Currently using')}: {t('Modern Pro')}</span>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          {t('View all')}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        {[
                          { page: t('Home Page'), status: 'edited', icon: Layout, progress: 100 },
                          { page: t('Product Page'), status: 'edited', icon: FileText, progress: 85 },
                          { page: t('Checkout Page'), status: 'default', icon: Type, progress: 60 }
                        ].map((page) => (
                          <div key={page.page} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <page.icon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{page.page}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  page.status === 'edited'
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-300"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                                )}
                              >
                                {page.status === 'edited' ? t('Edited') : t('Default')}
                              </Badge>
                            </div>
                            <Progress value={page.progress} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant={isActive ? "default" : "secondary"}
                    className={cn(
                      "w-full shadow-lg transition-all duration-300",
                      "hover:shadow-xl hover:scale-[1.02]",
                      !isActive && `hover:bg-gradient-to-r ${gradient.bg} hover:text-white`
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(item.url);
                    }}
                  >
                    {isActive
                      ? t('Currently Managing')
                      : item.title === "Themes"
                      ? t('Browse Themes')
                      : t('Edit Texts')}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden border-0 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]",
                  `bg-gradient-to-br ${stat.bgColor}`
                )}
              >
                <div className={cn(
                  "absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl",
                  `bg-gradient-to-br ${stat.color} opacity-20`
                )} />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <div className={cn(
                        "p-2 rounded-lg shadow-sm",
                        `bg-gradient-to-br ${stat.color} text-white`
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {stat.title}
                    </CardTitle>
                    {stat.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {stat.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subValue}</p>
                    {stat.progress && (
                      <Progress value={stat.progress} className="h-1.5" />
                    )}
                    {stat.status === 'live' && (
                      <Badge variant="outline" className="text-xs mt-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-1" />
                        {t('Live')}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions Bar */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{t('Quick Actions')}</p>
                  <p className="text-sm text-muted-foreground">{t('Manage your website settings')}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  {t('Domain')}
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  {t('SSL')}
                </Button>
                <Button variant="outline" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  {t('Analytics')}
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-primary/90">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('All Settings')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WebsitePage;