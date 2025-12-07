import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Package,
  Download,
  Clock,
  Link,
  Mail,
  Shield,
  FileText,
  Upload,
  Trash2,
  Plus,
  AlertCircle,
  Zap,
  Cloud,
  Lock,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface DeliveryMethod {
  id: string;
  name: string;
  enabled: boolean;
  config: Record<string, string>;
}

interface FileLimit {
  maxSize: number;
  unit: 'MB' | 'GB';
  formats: string[];
}

type CloudStorageType = 'local' | 's3' | 'cloudinary' | 'google';

function DigitalProductsDeliverySection() {
  const { t } = useTranslation();
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([
    {
      id: 'email',
      name: t("digitalDelivery.emailDelivery"),
      enabled: true,
      config: { template: 'default' }
    },
    {
      id: 'direct',
      name: t("digitalDelivery.directDownload"),
      enabled: false,
      config: { expiry: '24' }
    }
  ]);
  
  const [settings, setSettings] = useState({
    autoDeliver: true,
    downloadLimit: 3,
    linkExpiry: 7,
    expiryUnit: 'days' as 'hours' | 'days',
    requireLogin: false,
    watermark: false,
    cloudStorage: 'local' as CloudStorageType
  });

  const [fileLimit, setFileLimit] = useState<FileLimit>({
    maxSize: 100,
    unit: 'MB',
    formats: ['.pdf', '.zip', '.epub', '.mp4', '.mp3']
  });

  const [customTemplates, setCustomTemplates] = useState<Array<{id: string; name: string; subject: string}>>([]);

  const handleMethodToggle = (methodId: string) => {
    setDeliveryMethods(prev => prev.map(method =>
      method.id === methodId ? { ...method, enabled: !method.enabled } : method
    ));
  };

  const addCustomTemplate = () => {
    const id = `template_${Date.now()}`;
    setCustomTemplates(prev => [...prev, { id, name: '', subject: '' }]);
  };

  const removeCustomTemplate = (id: string) => {
    setCustomTemplates(prev => prev.filter(template => template.id !== id));
  };

  const cloudStorageOptions = [
    { value: 'local', name: 'Local Storage', icon: Package, color: 'text-gray-600' },
    { value: 's3', name: 'Amazon S3', icon: Cloud, color: 'text-orange-600' },
    { value: 'cloudinary', name: 'Cloudinary', icon: Cloud, color: 'text-blue-600' },
    { value: 'google', name: 'Google Cloud', icon: Cloud, color: 'text-green-600' }
  ];

  return (
    <div className="space-y-6">
      <Alert variant="info">
        <AlertIcon variant="info" />
        <AlertTitle>{t("digitalDelivery.title")}</AlertTitle>
        <AlertDescription>
          {t("digitalDelivery.description")}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="delivery" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="delivery" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            {t("digitalDelivery.deliveryMethods")}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {t("security")}
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            {t("storage")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="delivery" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t("digitalDelivery.deliveryMethods")}</CardTitle>
                    <CardDescription className="text-white/80">
                      {t("digitalDelivery.description")}
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  {deliveryMethods.filter(m => m.enabled).length} {t("active")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Email Delivery */}
              <Card className={cn(
                "border transition-all",
                deliveryMethods[0].enabled 
                  ? "border-primary/20 bg-primary/5 dark:bg-primary/10" 
                  : "border-gray-200 dark:border-gray-800"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={cn(
                        "p-2 rounded-lg",
                        deliveryMethods[0].enabled
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      )}>
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                          {t("digitalDelivery.emailDelivery")}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {t("digitalDelivery.sendDownloadLinks")}
                        </p>
                        {deliveryMethods[0].enabled && (
                          <div className="space-y-3">
                            <div>
                              <Label className="text-sm">{t("digitalDelivery.emailTemplates")}</Label>
                              <Select defaultValue="default">
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder={t("select")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="default">{t("default")}</SelectItem>
                                  <SelectItem value="minimal">{t("digitalDelivery.minimal")}</SelectItem>
                                  <SelectItem value="branded">{t("digitalDelivery.branded")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Switch
                      checked={deliveryMethods[0].enabled}
                      onCheckedChange={() => handleMethodToggle('email')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Direct Download */}
              <Card className={cn(
                "border transition-all",
                deliveryMethods[1].enabled 
                  ? "border-primary/20 bg-primary/5 dark:bg-primary/10" 
                  : "border-gray-200 dark:border-gray-800"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={cn(
                        "p-2 rounded-lg",
                        deliveryMethods[1].enabled
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      )}>
                        <Download className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                          {t("digitalDelivery.downloadPage")}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {t("digitalDelivery.allowImmediateDownload")}
                        </p>
                        {deliveryMethods[1].enabled && (
                          <div className="space-y-3">
                            <div>
                              <Label className="text-sm">{t("digitalDelivery.expirationTime")}</Label>
                              <div className="flex gap-2 mt-1">
                                <Input 
                                  type="number"
                                  value={deliveryMethods[1].config.expiry}
                                  onChange={(e) => {
                                    setDeliveryMethods(prev => prev.map(m => 
                                      m.id === 'direct' 
                                        ? { ...m, config: { ...m.config, expiry: e.target.value }}
                                        : m
                                    ))
                                  }}
                                  className="w-24"
                                />
                                <Select defaultValue="hours">
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="hours">{t("digitalDelivery.hours")}</SelectItem>
                                    <SelectItem value="days">{t("days")}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Switch
                      checked={deliveryMethods[1].enabled}
                      onCheckedChange={() => handleMethodToggle('direct')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Auto-delivery Settings */}
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  {t("digitalDelivery.settings")}
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gray-500" />
                      <Label>{t("digitalDelivery.autoDeliverAfterPayment")}</Label>
                    </div>
                    <Switch
                      checked={settings.autoDeliver}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoDeliver: checked }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-gray-500" />
                      {t("digitalDelivery.downloadLimit")}
                    </Label>
                    <Input
                      type="number"
                      value={settings.downloadLimit}
                      onChange={(e) => setSettings(prev => ({ ...prev, downloadLimit: parseInt(e.target.value) }))}
                      className="w-32"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      {t("digitalDelivery.expirationTime")}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={settings.linkExpiry}
                        onChange={(e) => setSettings(prev => ({ ...prev, linkExpiry: parseInt(e.target.value) }))}
                        className="w-24"
                      />
                      <Select 
                        value={settings.expiryUnit}
                        onValueChange={(value: 'hours' | 'days') => setSettings(prev => ({ ...prev, expiryUnit: value }))}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hours">{t("digitalDelivery.hours")}</SelectItem>
                          <SelectItem value="days">{t("days")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Templates */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {t("digitalDelivery.emailTemplates")}
                  </CardTitle>
                  <CardDescription>
                    {t("digitalDelivery.customizeEmails")}
                  </CardDescription>
                </div>
                <Button
                  onClick={addCustomTemplate}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t("add")} {t("template")}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {customTemplates.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("digitalDelivery.noCustomTemplates")}
                  </p>
                </div>
              ) : (
                customTemplates.map((template, index) => (
                  <Card key={template.id} className="border border-gray-200 dark:border-gray-800">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>{t("template")} #{index + 1}</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCustomTemplate(template.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid gap-3">
                        <div>
                          <Label className="text-sm">{t("name")}</Label>
                          <Input
                            placeholder={t("digitalDelivery.templateNamePlaceholder")}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">{t("digitalDelivery.subject")}</Label>
                          <Input
                            placeholder={t("digitalDelivery.subjectPlaceholder")}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{t("security")} {t("settings")}</CardTitle>
                  <CardDescription className="text-white/80">
                    {t("digitalDelivery.protectDigitalProducts")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {t("digitalDelivery.requireLogin")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("digitalDelivery.requireLoginDescription")}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.requireLogin}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireLogin: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {t("digitalDelivery.pdfWatermarking")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("digitalDelivery.pdfWatermarkingDescription")}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.watermark}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, watermark: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Link className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {t("digitalDelivery.ipRestriction")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("digitalDelivery.ipRestrictionDescription")}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                    {t("comingSoon")}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {t("digitalDelivery.downloadProtection")}
                </h4>
                <Alert variant="info">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {t("digitalDelivery.downloadProtectionDescription")}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{t("storage")} {t("configuration")}</CardTitle>
                  <CardDescription className="text-white/80">
                    {t("digitalDelivery.chooseStorageLocation")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-3 block">
                  {t("digitalDelivery.storageProviders")}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {cloudStorageOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = settings.cloudStorage === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setSettings(prev => ({ ...prev, cloudStorage: option.value as CloudStorageType }))}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all text-left",
                          isSelected
                            ? "border-primary bg-primary/5 dark:bg-primary/10"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn("w-8 h-8", option.color)} />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                              {option.name}
                            </p>
                            {option.value !== 'local' && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                {t("digitalDelivery.external")}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {settings.cloudStorage !== 'local' && (
                <Card className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      {settings.cloudStorage === 's3' && t("digitalDelivery.amazonS3Configuration")}
                      {settings.cloudStorage === 'cloudinary' && t("digitalDelivery.cloudinaryConfiguration")}
                      {settings.cloudStorage === 'google' && t("digitalDelivery.googleCloudConfiguration")}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">{t("digitalDelivery.apiKey")}</Label>
                        <Input type="password" placeholder={t("digitalDelivery.enterApiKey")} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">{t("digitalDelivery.secretKey")}</Label>
                        <Input type="password" placeholder={t("digitalDelivery.enterSecretKey")} className="mt-1" />
                      </div>
                      {settings.cloudStorage === 's3' && (
                        <div>
                          <Label className="text-sm">{t("digitalDelivery.bucketName")}</Label>
                          <Input placeholder={t("digitalDelivery.bucketNamePlaceholder")} className="mt-1" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  {t("digitalDelivery.fileRestrictions")}
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Upload className="w-4 h-4 text-gray-500" />
                      {t("digitalDelivery.maximumFileSize")}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={fileLimit.maxSize}
                        onChange={(e) => setFileLimit(prev => ({ ...prev, maxSize: parseInt(e.target.value) }))}
                        className="w-24"
                      />
                      <Select 
                        value={fileLimit.unit}
                        onValueChange={(value: 'MB' | 'GB') => setFileLimit(prev => ({ ...prev, unit: value }))}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MB">MB</SelectItem>
                          <SelectItem value="GB">GB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2">{t("digitalDelivery.allowedFileFormats")}</Label>
                    <div className="flex flex-wrap gap-2">
                      {fileLimit.formats.map((format) => (
                        <Badge key={format} variant="secondary" className="font-mono">
                          {format}
                        </Badge>
                      ))}
                      <Button size="sm" variant="ghost" className="h-6 px-2">
                        <Plus className="w-3 h-3 mr-1" />
                        {t("add")}
                      </Button>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    {t("digitalDelivery.storageUsage", { used: "2.4 GB", total: "10 GB", percentage: "24" })}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DigitalProductsDeliverySection;