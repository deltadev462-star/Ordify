import { useState } from 'react';
import { 
  Heart, 
  FileText, 
  Eye,
  Save,
  Trash2,
  ChevronUp,
  ChevronDown,
  Download,
  Share2,
  Mail,
  Package,
  ShoppingBag,
  MessageSquare,
  Image,
  Code,
  Palette,
  CheckCircle,
  ExternalLink,
  Gift,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'social' | 'products' | 'custom';
  content: {
    text?: string;
    alignment?: string;
    fontSize?: string;
    url?: string;
    alt?: string;
    style?: string;
    color?: string;
    platforms?: string[];
    message?: string;
    title?: string;
    count?: number;
    category?: string;
    template?: string;
  };
  order: number;
  visible: boolean;
}

function EditThankYouPageSection() {
  const [activeTab, setActiveTab] = useState('general');
  const [previewMode, setPreviewMode] = useState(false);
  
  const [pageSettings, setPageSettings] = useState({
    title: "Title",
    subtitle: "Subtitle",
    showOrderNumber: true,
    showOrderDetails: true,
    showCustomerInfo: true,
    showShippingInfo: true,
    showPaymentInfo: false,
    showEstimatedDelivery: true,
    enableSocialShare: true,
    showRelatedProducts: true,
    redirectEnabled: false,
    redirectDelay: 10,
    redirectUrl: '',
    customCSS: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    accentColor: '#10b981',
    confettiAnimation: true,
    successSound: true
  });

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: 'order_confirmation',
      type: 'text',
      content: {
        text: "Confirmation Text",
        alignment: 'center',
        fontSize: 'medium'
      },
      order: 1,
      visible: true
    },
    {
      id: 'order_details',
      type: 'custom',
      content: {
        template: 'order_summary'
      },
      order: 2,
      visible: true
    },
    {
      id: 'social_share',
      type: 'social',
      content: {
        platforms: ['facebook', 'twitter', 'whatsapp'],
        message: "Share Message"
      },
      order: 3,
      visible: false
    },
    {
      id: 'related_products',
      type: 'products',
      content: {
        title: "Related Products Title",
        count: 4,
        category: 'related'
      },
      order: 4,
      visible: true
    }
  ]);

  const [emailSettings, setEmailSettings] = useState({
    sendConfirmationEmail: true,
    emailTemplate: 'default',
    customSubject: "Default Subject",
    includeInvoice: true,
    includeTrackingInfo: true,
    ccAdmin: true
  });

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...contentBlocks];
    [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    setContentBlocks(newBlocks);
  };

  const moveBlockDown = (index: number) => {
    if (index === contentBlocks.length - 1) return;
    const newBlocks = [...contentBlocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setContentBlocks(newBlocks);
  };

  const addContentBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type,
      content: getDefaultContent(type),
      order: contentBlocks.length + 1,
      visible: true
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const getDefaultContent = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text':
        return { text: '', alignment: 'left', fontSize: 'medium' };
      case 'image':
        return { url: '', alt: '', alignment: 'center' };
      case 'button':
        return { text: "Button Text", url: '', style: 'primary' };
      case 'divider':
        return { style: 'solid', color: '#e5e7eb' };
      case 'social':
        return { platforms: ['facebook', 'twitter'], message: '' };
      case 'products':
        return { title: "Recommended Products", count: 3 };
      default:
        return {};
    }
  };

  const removeBlock = (blockId: string) => {
    setContentBlocks(contentBlocks.filter(block => block.id !== blockId));
  };

  const getBlockIcon = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text': return FileText;
      case 'image': return Image;
      case 'button': return ExternalLink;
      case 'social': return Share2;
      case 'products': return ShoppingBag;
      default: return Code;
    }
  };

  const getBlockTitle = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text': return "Text";
      case 'image': return "Image";
      case 'button': return "Button";
      case 'divider': return "Divider";
      case 'social': return "Social";
      case 'products': return "Products";
      case 'custom': return "Custom";
      default: return "Default";
    }
  };

  return (
    <div className="space-y-6">
      <Alert variant="info">
        <AlertIcon variant="info" />
        <AlertTitle>{"Title"}</AlertTitle>
        <AlertDescription>
          {"Description"}
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Switch
            checked={previewMode}
            onCheckedChange={setPreviewMode}
          />
          <Label className="text-sm">{"Preview Mode"}</Label>
        </div>
        
        <Button
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {"Reset To Default"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-5 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {"General"}
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            {"Content"}
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {"Email"}
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            {"Style"}
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            {"Advanced"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                {"Page Settings"}
              </CardTitle>
              <CardDescription>
                {"Page Settings Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2">{"Page Title"}</Label>
                  <Input
                    value={pageSettings.title}
                    onChange={(e) => setPageSettings(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={"Page Title"}
                  />
                </div>
                
                <div>
                  <Label className="mb-2">{"Subtitle"}</Label>
                  <Input
                    value={pageSettings.subtitle}
                    onChange={(e) => setPageSettings(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder={"Subtitle"}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">{"Display Options"}</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{"Order Number"}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Order Number Description"}
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.showOrderNumber}
                      onCheckedChange={(checked) => 
                        setPageSettings(prev => ({ ...prev, showOrderNumber: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{"Order Details"}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Order Details Description"}
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.showOrderDetails}
                      onCheckedChange={(checked) => 
                        setPageSettings(prev => ({ ...prev, showOrderDetails: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{"Customer Info"}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Customer Info Description"}
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.showCustomerInfo}
                      onCheckedChange={(checked) => 
                        setPageSettings(prev => ({ ...prev, showCustomerInfo: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{"Shipping Info"}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Shipping Info Description"}
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.showShippingInfo}
                      onCheckedChange={(checked) => 
                        setPageSettings(prev => ({ ...prev, showShippingInfo: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{"Estimated Delivery"}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Estimated Delivery Description"}
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.showEstimatedDelivery}
                      onCheckedChange={(checked) => 
                        setPageSettings(prev => ({ ...prev, showEstimatedDelivery: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">{"Page Features"}</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{"Confetti Animation"}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Confetti Animation Description"}
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.confettiAnimation}
                      onCheckedChange={(checked) => 
                        setPageSettings(prev => ({ ...prev, confettiAnimation: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{"Success Sound"}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Success Sound Description"}
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.successSound}
                      onCheckedChange={(checked) => 
                        setPageSettings(prev => ({ ...prev, successSound: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{"Social Sharing"}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {"Social Sharing Description"}
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.enableSocialShare}
                      onCheckedChange={(checked) => 
                        setPageSettings(prev => ({ ...prev, enableSocialShare: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">{"Redirect Settings"}</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Auto Redirect"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Auto Redirect Description"}
                    </p>
                  </div>
                  <Switch
                    checked={pageSettings.redirectEnabled}
                    onCheckedChange={(checked) => 
                      setPageSettings(prev => ({ ...prev, redirectEnabled: checked }))
                    }
                  />
                </div>

                {pageSettings.redirectEnabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                    <div>
                      <Label className="mb-2">{"Redirect Url"}</Label>
                      <Input
                        value={pageSettings.redirectUrl}
                        onChange={(e) => setPageSettings(prev => ({ ...prev, redirectUrl: e.target.value }))}
                        placeholder="https://example.com/shop"
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2">{"Redirect Delay"}</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[pageSettings.redirectDelay]}
                          onValueChange={(value) => 
                            setPageSettings(prev => ({ ...prev, redirectDelay: value[0] }))
                          }
                          min={5}
                          max={30}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">{pageSettings.redirectDelay}s</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{"Title"}</CardTitle>
                  <CardDescription className="text-white/80">
                    {"Description"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {contentBlocks.map((block, index) => {
                const Icon = getBlockIcon(block.type);
                return (
                  <Card
                    key={block.id}
                    className={cn(
                      "border transition-all",
                      block.visible 
                        ? "border-gray-200 dark:border-gray-700" 
                        : "border-gray-200/50 dark:border-gray-700/50 opacity-60"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveBlockUp(index)}
                              disabled={index === 0}
                              className="h-6 px-2"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveBlockDown(index)}
                              disabled={index === contentBlocks.length - 1}
                              className="h-6 px-2"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className={cn(
                            "p-2 rounded-lg",
                            block.visible
                              ? "bg-primary/10 text-primary"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">
                              {getBlockTitle(block.type)}
                            </h4>
                            
                            {/* Block-specific content editor */}
                            {block.type === 'text' && (
                              <div className="mt-3 space-y-3">
                                <Textarea
                                  value={block.content.text}
                                  onChange={(e) => {
                                    const updatedBlocks = [...contentBlocks];
                                    updatedBlocks[index].content.text = e.target.value;
                                    setContentBlocks(updatedBlocks);
                                  }}
                                  placeholder={"Enter Text"}
                                  className="min-h-[80px]"
                                />
                                <Select
                                  value={block.content.alignment}
                                  onValueChange={(value) => {
                                    const updatedBlocks = [...contentBlocks];
                                    updatedBlocks[index].content.alignment = value;
                                    setContentBlocks(updatedBlocks);
                                  }}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="left">{"Left"}</SelectItem>
                                    <SelectItem value="center">{"Center"}</SelectItem>
                                    <SelectItem value="right">{"Right"}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {block.type === 'products' && (
                              <div className="mt-3 space-y-3">
                                <Input
                                  value={block.content.title}
                                  onChange={(e) => {
                                    const updatedBlocks = [...contentBlocks];
                                    updatedBlocks[index].content.title = e.target.value;
                                    setContentBlocks(updatedBlocks);
                                  }}
                                  placeholder={"Section Title"}
                                />
                                <div className="flex items-center gap-2">
                                  <Label>{"Number Of Products"}</Label>
                                  <Select
                                    value={String(block.content.count ?? 3)}
                                    onValueChange={(value) => {
                                      const updatedBlocks = [...contentBlocks];
                                      updatedBlocks[index].content.count = parseInt(value);
                                      setContentBlocks(updatedBlocks);
                                    }}
                                  >
                                    <SelectTrigger className="w-20">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {[2, 3, 4, 6, 8].map(num => (
                                        <SelectItem key={num} value={num.toString()}>
                                          {num}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={block.visible}
                            onCheckedChange={(checked) => {
                              const updatedBlocks = [...contentBlocks];
                              updatedBlocks[index].visible = checked;
                              setContentBlocks(updatedBlocks);
                            }}
                          />
                          {block.id !== 'order_confirmation' && block.id !== 'order_details' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBlock(block.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <div className="flex flex-wrap gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('text')}
                  className="gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {"Add Text"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('image')}
                  className="gap-2"
                >
                  <Image className="w-4 h-4" />
                  {"Add Image"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('button')}
                  className="gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {"Add Button"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('products')}
                  className="gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {"Add Products"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('social')}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  {"Add Social"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{"Send Email"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Send Email Description"}
                  </p>
                </div>
                <Switch
                  checked={emailSettings.sendConfirmationEmail}
                  onCheckedChange={(checked) => 
                    setEmailSettings(prev => ({ ...prev, sendConfirmationEmail: checked }))
                  }
                />
              </div>

              {emailSettings.sendConfirmationEmail && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <Label className="mb-2">{"Email Subject"}</Label>
                    <Input
                      value={emailSettings.customSubject}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, customSubject: e.target.value }))}
                      placeholder={"Subject Placeholder"}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {"Available Variables"}
                    </p>
                  </div>

                  <div>
                    <Label className="mb-2">{"Email Template"}</Label>
                    <Select
                      value={emailSettings.emailTemplate}
                      onValueChange={(value) => 
                        setEmailSettings(prev => ({ ...prev, emailTemplate: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">{"Default"}</SelectItem>
                        <SelectItem value="minimal">{"Minimal"}</SelectItem>
                        <SelectItem value="detailed">{"Detailed"}</SelectItem>
                        <SelectItem value="custom">{"Custom"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>{"Includes"}</Label>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="include-invoice"
                          checked={emailSettings.includeInvoice}
                          onCheckedChange={(checked) => 
                            setEmailSettings(prev => ({ ...prev, includeInvoice: checked }))
                          }
                        />
                        <Label htmlFor="include-invoice" className="font-normal cursor-pointer">
                          {"Attach Invoice"}
                        </Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch
                          id="include-tracking"
                          checked={emailSettings.includeTrackingInfo}
                          onCheckedChange={(checked) => 
                            setEmailSettings(prev => ({ ...prev, includeTrackingInfo: checked }))
                          }
                        />
                        <Label htmlFor="include-tracking" className="font-normal cursor-pointer">
                          {"Include Tracking"}
                        </Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch
                          id="cc-admin"
                          checked={emailSettings.ccAdmin}
                          onCheckedChange={(checked) => 
                            setEmailSettings(prev => ({ ...prev, ccAdmin: checked }))
                          }
                        />
                        <Label htmlFor="cc-admin" className="font-normal cursor-pointer">
                          {"Send To Admin"}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <MessageSquare className="h-4 w-4" />
                    <AlertDescription>
                      {"Test Email Info"}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">{"Background Color"}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={pageSettings.backgroundColor}
                      onChange={(e) => setPageSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={pageSettings.backgroundColor}
                      onChange={(e) => setPageSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2">{"Text Color"}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={pageSettings.textColor}
                      onChange={(e) => setPageSettings(prev => ({ ...prev, textColor: e.target.value }))}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={pageSettings.textColor}
                      onChange={(e) => setPageSettings(prev => ({ ...prev, textColor: e.target.value }))}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2">{"Accent Color"}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={pageSettings.accentColor}
                      onChange={(e) => setPageSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={pageSettings.accentColor}
                      onChange={(e) => setPageSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">{"Quick Themes"}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setPageSettings(prev => ({
                      ...prev,
                      backgroundColor: '#ffffff',
                      textColor: '#000000',
                      accentColor: '#10b981'
                    }))}
                  >
                    <div className="flex gap-1">
                      <div className="w-4 h-4 bg-white border rounded" />
                      <div className="w-4 h-4 bg-black rounded" />
                      <div className="w-4 h-4 bg-emerald-500 rounded" />
                    </div>
                    <span className="text-xs">{"Light"}</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setPageSettings(prev => ({
                      ...prev,
                      backgroundColor: '#1f2937',
                      textColor: '#f3f4f6',
                      accentColor: '#8b5cf6'
                    }))}
                  >
                    <div className="flex gap-1">
                      <div className="w-4 h-4 bg-gray-800 rounded" />
                      <div className="w-4 h-4 bg-gray-100 rounded" />
                      <div className="w-4 h-4 bg-purple-500 rounded" />
                    </div>
                    <span className="text-xs">{"Dark"}</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setPageSettings(prev => ({
                      ...prev,
                      backgroundColor: '#fef3c7',
                      textColor: '#78350f',
                      accentColor: '#f59e0b'
                    }))}
                  >
                    <div className="flex gap-1">
                      <div className="w-4 h-4 bg-amber-100 rounded" />
                      <div className="w-4 h-4 bg-amber-900 rounded" />
                      <div className="w-4 h-4 bg-amber-500 rounded" />
                    </div>
                    <span className="text-xs">{"Warm"}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                {"Preview"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8"
                style={{ 
                  backgroundColor: pageSettings.backgroundColor,
                  color: pageSettings.textColor
                }}
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full" style={{ backgroundColor: pageSettings.accentColor + '20' }}>
                    <CheckCircle className="w-12 h-12" style={{ color: pageSettings.accentColor }} />
                  </div>
                  <h1 className="text-3xl font-bold">{pageSettings.title}</h1>
                  <p className="text-lg opacity-80">{pageSettings.subtitle}</p>
                  
                  {pageSettings.showOrderNumber && (
                    <div className="py-4">
                      <p className="text-sm opacity-60">{"Order Number"}</p>
                      <p className="text-xl font-semibold">#ORD-123456</p>
                    </div>
                  )}

                  <Button 
                    className="mt-6"
                    style={{ 
                      backgroundColor: pageSettings.accentColor,
                      color: '#ffffff'
                    }}
                  >
                    {"Continue Shopping Button"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                {"Custom C S S"}
              </CardTitle>
              <CardDescription>
                {"Custom C S S Description"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label className="mb-2">{"Custom C S S Code"}</Label>
                <Textarea
                  value={pageSettings.customCSS}
                  onChange={(e) => setPageSettings(prev => ({ ...prev, customCSS: e.target.value }))}
                  placeholder={"Css Placeholder"}
                  className="font-mono min-h-[200px]"
                />
              </div>

              <Alert className="mt-4">
                <Code className="h-4 w-4" />
                <AlertDescription>
                  {"Css Warning"}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                {"Digital Products"}
              </CardTitle>
              <CardDescription>
                {"Digital Products Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{"Show Download Links"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Show Download Links Description"}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{"Time Limited Downloads"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Time Limited Downloads Description"}
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{"Download Limit"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Download Limit Description"}
                  </p>
                </div>
                <Input type="number" defaultValue="3" className="w-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {"Special Effects"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Gift className="h-4 w-4" />
                <AlertDescription>
                  {"Special Effects Info"}
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>{"Animation Type"}</Label>
                  <Select defaultValue="confetti">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confetti">{"Confetti"}</SelectItem>
                      <SelectItem value="fireworks">{"Fireworks"}</SelectItem>
                      <SelectItem value="balloons">{"Balloons"}</SelectItem>
                      <SelectItem value="none">{"None"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>{"Success Sound Effect"}</Label>
                  <Select defaultValue="chime">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chime">{"Chime"}</SelectItem>
                      <SelectItem value="bell">{"Bell"}</SelectItem>
                      <SelectItem value="coin">{"Coin"}</SelectItem>
                      <SelectItem value="none">{"None"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button variant="outline">
          {"Cancel"}
        </Button>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Save className="w-4 h-4 mr-2" />
          {"Save"}
        </Button>
      </div>
    </div>
  );
}

export default EditThankYouPageSection;