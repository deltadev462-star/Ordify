import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Camera,
  Activity,
  Copy,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Code2,
  TestTube
} from "lucide-react";
import Title from "@/components/Title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

// Platform icons component
const PlatformIcons: Record<string, FC<{ className?: string }>> = {
  meta: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
    </svg>
  ),
  google: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  ),
  tiktok: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.37 6.37 0 00-1-.05A6.34 6.34 0 003 15.7a6.34 6.34 0 0011.14 4.12v-6.95a8.16 8.16 0 004.49 1.36v-3.45a4.79 4.79 0 01-3.04-1.09z"/>
    </svg>
  ),
  snapchat: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.206.793c.99 0 4.347.444 5.724 3.993.635 1.633.816 3.51.667 4.822-.032.286-.066.547-.093.77a.565.565 0 00.41.644c.175.036.314.04.472.04.803 0 1.299-.365 1.502-.505a.47.47 0 01.177-.05c.365 0 .677.267.742.566.065.317-.15.746-.752 1.074-.58.314-1.196.439-1.524.498a3.038 3.038 0 00-.138.386c-.071.337-.073.392-.073.399 0 .734 1.988 3.673 4.554 4.10.255.043.464.228.58.447.048.088.075.186.075.286 0 .261-.181.474-.443.534a12.16 12.16 0 01-3.823.99.674.674 0 00-.43.446c-.086.291-.187.658-.274.899-.088.243-.263.505-.58.505-.14 0-.306-.039-.505-.104-.43-.142-.907-.211-1.334-.211-.493 0-.94.093-1.37.281a4.78 4.78 0 01-1.945.477 5.01 5.01 0 01-1.96-.473c-.426-.187-.872-.277-1.362-.277-.423 0-.893.068-1.323.207-.21.067-.374.108-.513.108-.314 0-.49-.26-.58-.505-.085-.237-.19-.604-.276-.899a.672.672 0 00-.43-.447 11.975 11.975 0 01-3.818-.974.518.518 0 01-.317-.268.486.486 0 01-.054-.265c0-.103.027-.2.075-.286a.705.705 0 01.58-.447c2.566-.438 4.555-3.376 4.555-4.11 0-.008-.002-.063-.075-.402a3.224 3.224 0 00-.137-.38c-.327-.06-.94-.185-1.517-.498-.606-.33-.821-.762-.755-1.076.065-.3.378-.564.743-.564a.51.51 0 01.177.049c.203.14.7.505 1.503.505.157 0 .295-.004.471-.039a.565.565 0 00.41-.645 8.255 8.255 0 01-.093-.768c-.15-1.312.032-3.19.668-4.822C7.859 1.237 11.22.793 12.206.793z"/>
    </svg>
  ),
  twitter: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

interface PixelConfig {
  platform: string;
  name: string;
  pixelId: string;
  enabled: boolean;
  testEventCode?: string;
  events: string[];
  conversionApi?: boolean;
  icon: FC<{ className?: string }>;
  color: string;
  helpUrl: string;
}

function PixelSettings() {
  const { t } = useTranslation();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customPixels, setCustomPixels] = useState<Array<{ id: string; name: string; code: string }>>([]);
  
  const [pixels, setPixels] = useState<PixelConfig[]>([
    {
      platform: "meta",
      name: "Meta Pixel",
      pixelId: "",
      enabled: false,
      testEventCode: "",
      events: ["PageView", "Purchase", "AddToCart", "InitiateCheckout"],
      conversionApi: false,
      icon: PlatformIcons.meta,
      color: "from-blue-500 to-blue-600",
      helpUrl: "https://www.facebook.com/business/help/952192354843755"
    },
    {
      platform: "google",
      name: "Google Analytics",
      pixelId: "",
      enabled: false,
      events: ["page_view", "purchase", "add_to_cart", "begin_checkout"],
      conversionApi: false,
      icon: PlatformIcons.google,
      color: "from-green-500 to-green-600",
      helpUrl: "https://support.google.com/analytics/answer/9322688"
    },
    {
      platform: "tiktok",
      name: "TikTok Pixel",
      pixelId: "",
      enabled: false,
      testEventCode: "",
      events: ["PageView", "CompletePayment", "AddToCart", "InitiateCheckout"],
      conversionApi: false,
      icon: PlatformIcons.tiktok,
      color: "from-gray-900 to-black",
      helpUrl: "https://ads.tiktok.com/help/article?aid=10000357"
    },
    {
      platform: "snapchat",
      name: "Snapchat Pixel",
      pixelId: "",
      enabled: false,
      events: ["PAGE_VIEW", "PURCHASE", "ADD_CART", "START_CHECKOUT"],
      icon: PlatformIcons.snapchat,
      color: "from-yellow-400 to-yellow-500",
      helpUrl: "https://businesshelp.snapchat.com/s/article/pixel-website-install"
    },
    {
      platform: "twitter",
      name: "X (Twitter) Pixel",
      pixelId: "",
      enabled: false,
      events: ["PageView", "Purchase", "AddToCart", "Checkout"],
      icon: PlatformIcons.twitter,
      color: "from-gray-800 to-gray-900",
      helpUrl: "https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html"
    }
  ]);

  const handlePixelUpdate = <K extends keyof PixelConfig>(
    platform: string,
    field: K,
    value: PixelConfig[K]
  ) => {
    setPixels(prev => prev.map(pixel =>
      pixel.platform === platform ? { ...pixel, [field]: value } : pixel
    ));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addCustomPixel = () => {
    const id = `custom_${Date.now()}`;
    setCustomPixels(prev => [...prev, { id, name: "", code: "" }]);
  };

  const removeCustomPixel = (id: string) => {
    setCustomPixels(prev => prev.filter(p => p.id !== id));
  };

  const updateCustomPixel = (id: string, field: string, value: string) => {
    setCustomPixels(prev => prev.map(pixel =>
      pixel.id === id ? { ...pixel, [field]: value } : pixel
    ));
  };

  return (
    <div dir="rtl">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
        <Title
          title={t("pixelSettings.title")}
          Subtitle={t("pixelSettings.description")}
          className="text-3xl"
          classNamee=""
        />

        <Alert variant="info" className="mb-4">
          <AlertIcon variant="info" />
          <AlertTitle>{t("pixelSettings.trackYourConversions")}</AlertTitle>
          <AlertDescription>
            {t("pixelSettings.connectAdvertisingPixels")}
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="platforms" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="platforms" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {t("pixelSettings.platformPixels")}
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              {t("pixelSettings.customCode")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="platforms">
            <div className="grid gap-4">
              {pixels.map((pixel) => {
                const Icon = pixel.icon;
                return (
                  <Card
                    key={pixel.platform}
                    className={cn(
                      "border-0 shadow-lg overflow-hidden transition-all duration-200",
                      pixel.enabled 
                        ? "ring-2 ring-primary/20 dark:ring-primary/40" 
                        : "hover:shadow-xl"
                    )}
                  >
                    <CardHeader 
                      className={cn(
                        "relative overflow-hidden",
                        pixel.enabled 
                          ? `bg-gradient-to-r ${pixel.color} text-white` 
                          : "bg-gray-50 dark:bg-gray-900/50"
                      )}
                    >
                      <div className="absolute right-0 top-0 opacity-10">
                        <Icon className="w-24 h-24" />
                      </div>
                      <div className="relative flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            pixel.enabled 
                              ? "bg-white/20 backdrop-blur-sm" 
                              : "bg-white dark:bg-gray-800"
                          )}>
                            <Icon className={cn(
                              "w-6 h-6",
                              pixel.enabled ? "text-white" : "text-gray-700 dark:text-gray-300"
                            )} />
                          </div>
                          <div>
                            <CardTitle className={cn(
                              "text-xl",
                              !pixel.enabled && "text-gray-800 dark:text-gray-100"
                            )}>
                              {pixel.name}
                            </CardTitle>
                            <CardDescription className={cn(
                              pixel.enabled
                                ? "text-white/80"
                                : "text-gray-600 dark:text-gray-400"
                            )}>
                              {pixel.enabled
                                ? t("pixelSettings.activeAndTracking")
                                : t("pixelSettings.notConfigured")}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={pixel.helpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "p-2 rounded-lg transition-colors",
                              pixel.enabled 
                                ? "hover:bg-white/20 text-white" 
                                : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                            )}
                            title={t("pixelSettings.helpDocumentation")}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <Switch
                            checked={pixel.enabled}
                            onCheckedChange={(checked) => 
                              handlePixelUpdate(pixel.platform, "enabled", checked)
                            }
                            className="data-[state=checked]:bg-white dark:data-[state=checked]:bg-gray-200"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    
                    {pixel.enabled && (
                      <CardContent className="p-6 space-y-4 bg-white dark:bg-gray-900">
                        <div className="space-y-2">
                          <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            {t("pixelSettings.pixelId")}
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              value={pixel.pixelId}
                              onChange={(e) => handlePixelUpdate(pixel.platform, "pixelId", e.target.value)}
                              placeholder={t("pixelSettings.enterPixelId", { name: pixel.name })}
                              className="font-mono text-sm border-gray-300 dark:border-gray-700"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(pixel.pixelId, pixel.platform)}
                              className="px-3"
                            >
                              {copiedId === pixel.platform ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {(pixel.platform === "meta" || pixel.platform === "tiktok") && (
                          <div className="space-y-2">
                            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                              <TestTube className="w-4 h-4" />
                              {t("pixelSettings.testEventCode")}
                              <Badge variant="secondary" className="text-xs">
                                {t("optional")}
                              </Badge>
                            </Label>
                            <Input
                              value={pixel.testEventCode || ""}
                              onChange={(e) => handlePixelUpdate(pixel.platform, "testEventCode", e.target.value)}
                              placeholder={t("TEST12345")}
                              className="font-mono text-sm border-gray-300 dark:border-gray-700"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label className="text-gray-700 dark:text-gray-300 font-medium">
                            {t("pixelSettings.trackedEvents")}
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {pixel.events.map((event) => (
                              <Badge 
                                key={event} 
                                variant="secondary"
                                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                              >
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {pixel.platform === "meta" || pixel.platform === "google" ? (
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-2">
                              <Label className="text-gray-700 dark:text-gray-300 font-medium">
                                {t("pixelSettings.conversionApi")}
                              </Label>
                              <Badge 
                                variant="default" 
                                className="text-xs bg-gradient-to-r from-purple-500 to-pink-500"
                              >
                                {t("pro")}
                              </Badge>
                            </div>
                            <Switch
                              checked={pixel.conversionApi || false}
                              onCheckedChange={(checked) => 
                                handlePixelUpdate(pixel.platform, "conversionApi", checked)
                              }
                              disabled={true}
                            />
                          </div>
                        ) : null}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{t("pixelSettings.customTrackingCode")}</CardTitle>
                      <CardDescription className="text-white/80">
                        {t("pixelSettings.addCustomJavaScript")}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={addCustomPixel}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t("pixelSettings.addCustomCode")}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                {customPixels.length === 0 ? (
                  <div className="text-center py-8">
                    <Code2 className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("pixelSettings.noCustomCodesAdded")}
                    </p>
                  </div>
                ) : (
                  customPixels.map((pixel, index) => (
                    <Card key={pixel.id} className="border border-gray-200 dark:border-gray-800">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-700 dark:text-gray-300 font-medium">
                            {t("pixelSettings.customCode")} #{index + 1}
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCustomPixel(pixel.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <Input
                          value={pixel.name}
                          onChange={(e) => updateCustomPixel(pixel.id, "name", e.target.value)}
                          placeholder={t("pixelSettings.codeName")}
                          className="border-gray-300 dark:border-gray-700"
                        />
                        
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-600 dark:text-gray-400">
                            {t("pixelSettings.javaScriptCode")}
                          </Label>
                          <textarea
                            value={pixel.code}
                            onChange={(e) => updateCustomPixel(pixel.id, "code", e.target.value)}
                            placeholder={`<script>\n  // Your tracking code here\n</script>`}
                            className="w-full h-32 px-3 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-700"
          >
            {t("pixelSettings.cancel")}
          </Button>
          <Button 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
          >
            {t("pixelSettings.saveConfiguration")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PixelSettings;