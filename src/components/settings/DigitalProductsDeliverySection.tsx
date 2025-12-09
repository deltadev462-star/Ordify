import { useState } from 'react';
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
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([
    {
      id: 'email',
      name: "Email Delivery",
      enabled: true,
      config: { template: 'default' }
    },
    {
      id: 'direct',
      name: "Direct Download",
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
        <AlertTitle>{"Title"}</AlertTitle>
        <AlertDescription>
          {"Description"}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="delivery" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="delivery" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            {"Delivery Methods"}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {"Security"}
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            {"Storage"}
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
                    <CardTitle className="text-xl">{"Delivery Methods"}</CardTitle>
                    <CardDescription className="text-white/80">
                      {"Description"}
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  {deliveryMethods.filter(m => m.enabled).length} {"Active"}
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
                          {"Email Delivery"}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {"Send Download Links"}
                        </p>
                        {deliveryMethods[0].enabled && (
                          <div className="space-y-3">
                            <div>
                              <Label className="text-sm">{"Email Templates"}</Label>
                              <Select defaultValue="default">
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder={"Select"} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="default">{"Default"}</SelectItem>
                                  <SelectItem value="minimal">{"Minimal"}</SelectItem>
                                  <SelectItem value="branded">{"Branded"}</SelectItem>
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
                          {"Download Page"}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {"Allow Immediate Download"}
                        </p>
                        {deliveryMethods[1].enabled && (
                          <div className="space-y-3">
                            <div>
                              <Label className="text-sm">{"Expiration Time"}</Label>
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
                                    <SelectItem value="hours">{"Hours"}</SelectItem>
                                    <SelectItem value="days">{"Days"}</SelectItem>
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
                  {"Settings"}
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gray-500" />
                      <Label>{"Auto Deliver After Payment"}</Label>
                    </div>
                    <Switch
                      checked={settings.autoDeliver}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoDeliver: checked }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-gray-500" />
                      {"Download Limit"}
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
                      {"Expiration Time"}
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
                          <SelectItem value="hours">{"Hours"}</SelectItem>
                          <SelectItem value="days">{"Days"}</SelectItem>
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
                    {"Email Templates"}
                  </CardTitle>
                  <CardDescription>
                    {"Customize Emails"}
                  </CardDescription>
                </div>
                <Button
                  onClick={addCustomTemplate}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {"Add"} {"Template"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {customTemplates.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {"No Custom Templates"}
                  </p>
                </div>
              ) : (
                customTemplates.map((template, index) => (
                  <Card key={template.id} className="border border-gray-200 dark:border-gray-800">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>{"Template"} #{index + 1}</Label>
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
                          <Label className="text-sm">{"Name"}</Label>
                          <Input
                            placeholder={"Template Name Placeholder"}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">{"Subject"}</Label>
                          <Input
                            placeholder={"Subject Placeholder"}
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
                  <CardTitle className="text-xl">{"Security"} {"Settings"}</CardTitle>
                  <CardDescription className="text-white/80">
                    {"Protect Digital Products"}
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
                        {"Require Login"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Require Login Description"}
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
                        {"Pdf Watermarking"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Pdf Watermarking Description"}
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
                        {"Ip Restriction"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Ip Restriction Description"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                    {"Coming Soon"}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {"Download Protection"}
                </h4>
                <Alert variant="info">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {"Download Protection Description"}
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
                  <CardTitle className="text-xl">{"Storage"} {"Configuration"}</CardTitle>
                  <CardDescription className="text-white/80">
                    {"Choose Storage Location"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-3 block">
                  {"Storage Providers"}
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
                                {"External"}
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
                      {settings.cloudStorage === 's3' && "Amazon S3 Configuration"}
                      {settings.cloudStorage === 'cloudinary' && "Cloudinary Configuration"}
                      {settings.cloudStorage === 'google' && "Google Cloud Configuration"}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">{"Api Key"}</Label>
                        <Input type="password" placeholder={"Enter Api Key"} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">{"Secret Key"}</Label>
                        <Input type="password" placeholder={"Enter Secret Key"} className="mt-1" />
                      </div>
                      {settings.cloudStorage === 's3' && (
                        <div>
                          <Label className="text-sm">{"Bucket Name"}</Label>
                          <Input placeholder={"Bucket Name Placeholder"} className="mt-1" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  {"File Restrictions"}
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Upload className="w-4 h-4 text-gray-500" />
                      {"Maximum File Size"}
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
                    <Label className="mb-2">{"Allowed File Formats"}</Label>
                    <div className="flex flex-wrap gap-2">
                      {fileLimit.formats.map((format) => (
                        <Badge key={format} variant="secondary" className="font-mono">
                          {format}
                        </Badge>
                      ))}
                      <Button size="sm" variant="ghost" className="h-6 px-2">
                        <Plus className="w-3 h-3 mr-1" />
                        {"Add"}
                      </Button>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    {"Storage Usage"}
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