import { useState } from "react";
import { 
  Tags, 
  Code2,
  Settings,
  TestTube,
  FileCode,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  ShoppingCart,
  DollarSign,
  Package,
  Search,
  User,
  BarChart3,
  Zap,
  Info,
  Plus,
  Trash2
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
// GTM dataLayer typings
type GTMData = Record<string, unknown>;
interface GTMDataLayer extends Array<GTMData> {
  push: (...items: GTMData[]) => number;
}
declare global {
  interface Window {
    dataLayer?: GTMDataLayer;
  }
}

interface EventConfig {
  id: string;
  name: string;
  gtmEvent: string;
  enabled: boolean;
  icon: React.ElementType;
  description: string;
  parameters: Array<{ key: string; value: string }>;
}

function GoogleTag() {
  const [containerId, setContainerId] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dataLayerEnabled, setDataLayerEnabled] = useState(true);
  const [enhancedEcommerce, setEnhancedEcommerce] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [customEvents, setCustomEvents] = useState<Array<{ id: string; name: string; trigger: string; dataLayer: string }>>([]);
  
  const [events, setEvents] = useState<EventConfig[]>([
    {
      id: "page_view",
      name: "Page View",
      gtmEvent: "page_view",
      enabled: true,
      icon: FileCode,
      description: "Track when users view pages",
      parameters: []
    },
    {
      id: "purchase",
      name: "Purchase",
      gtmEvent: "purchase",
      enabled: true,
      icon: DollarSign,
      description: "Track completed purchases",
      parameters: [
        { key: "value", value: "{{order.total}}" },
        { key: "currency", value: "USD" },
        { key: "transaction_id", value: "{{order.id}}" }
      ]
    },
    {
      id: "add_to_cart",
      name: "Add to Cart",
      gtmEvent: "add_to_cart",
      enabled: true,
      icon: ShoppingCart,
      description: "Track when items are added to cart",
      parameters: [
        { key: "value", value: "{{product.price}}" },
        { key: "items", value: "{{product}}" }
      ]
    },
    {
      id: "begin_checkout",
      name: "Begin Checkout",
      gtmEvent: "begin_checkout",
      enabled: true,
      icon: Package,
      description: "Track when checkout process starts",
      parameters: []
    },
    {
      id: "search",
      name: "Search",
      gtmEvent: "search",
      enabled: false,
      icon: Search,
      description: "Track search queries",
      parameters: [
        { key: "search_term", value: "{{query}}" }
      ]
    },
    {
      id: "sign_up",
      name: "Sign Up",
      gtmEvent: "sign_up",
      enabled: false,
      icon: User,
      description: "Track new user registrations",
      parameters: [
        { key: "method", value: "email" }
      ]
    }
  ]);

  const handleEventToggle = (eventId: string) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId ? { ...event, enabled: !event.enabled } : event
    ));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addCustomEvent = () => {
    const id = `custom_${Date.now()}`;
    setCustomEvents(prev => [...prev, { 
      id, 
      name: "", 
      trigger: "", 
      dataLayer: "dataLayer.push({'event': 'custom_event'});" 
    }]);
  };

  const removeCustomEvent = (id: string) => {
    setCustomEvents(prev => prev.filter(event => event.id !== id));
  };

  const updateCustomEvent = (id: string, field: string, value: string) => {
    setCustomEvents(prev => prev.map(event =>
      event.id === id ? { ...event, [field]: value } : event
    ));
  };

  const getInstallationCode = () => {
    return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');</script>
<!-- End Google Tag Manager -->`;
  };

  const getNoScriptCode = () => {
    return `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
  };

  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
        <Title
          title={"Title"}
          Subtitle={"Description"}
          className="text-3xl"
          classNamee=""
        />

        <Alert variant="info" className="mb-4">
          <AlertIcon variant="info" />
          <AlertTitle>{"Title"}</AlertTitle>
          <AlertDescription>
            {"Description"}
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full max-w-xl grid-cols-4 mb-6">
            <TabsTrigger value="setup" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {"Setup"}
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {"Events"}
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              {"Custom"}
            </TabsTrigger>
            <TabsTrigger value="debug" className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              {"Debug"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="setup">
            <div className="grid gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Tags className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{"Container Setup"}</CardTitle>
                        <CardDescription className="text-white/80">
                          {"Enter Container Id"}
                        </CardDescription>
                      </div>
                    </div>
                    <a
                      href="https://tagmanager.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      title={"Title"}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                      <Tags className="w-4 h-4" />
                      {"Container Id"}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={containerId}
                        onChange={(e) => setContainerId(e.target.value)}
                        placeholder="GTM-XXXXXXX"
                        className="font-mono text-sm border-gray-300 dark:border-gray-700"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(containerId, "container")}
                        className="px-3"
                        disabled={!containerId}
                      >
                        {copiedId === "container" ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {containerId && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {"Connected"} <span className="font-mono">{containerId}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300 font-medium">
                          Data Layer
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Enable data layer for advanced tracking
                        </p>
                      </div>
                      <Switch
                        checked={dataLayerEnabled}
                        onCheckedChange={setDataLayerEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                          {"Enhanced Ecommerce"}
                          <Badge variant="secondary" className="text-xs">
                            {"Recommended"}
                          </Badge>
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {"Measure Purchases"}
                        </p>
                      </div>
                      <Switch
                        checked={enhancedEcommerce}
                        onCheckedChange={setEnhancedEcommerce}
                      />
                    </div>
                  </div>

                  {containerId && (
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">
                          {"Step1 Title"}
                        </Label>
                        <div className="relative">
                          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-xs overflow-x-auto">
                            <code className="text-gray-800 dark:text-gray-200">
                              {getInstallationCode()}
                            </code>
                          </pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(getInstallationCode(), "head")}
                            className="absolute top-2 right-2"
                          >
                            {copiedId === "head" ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">
                          {"Step2 Title"}
                        </Label>
                        <div className="relative">
                          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-xs overflow-x-auto">
                            <code className="text-gray-800 dark:text-gray-200">
                              {getNoScriptCode()}
                            </code>
                          </pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(getNoScriptCode(), "body")}
                            className="absolute top-2 right-2"
                          >
                            {copiedId === "body" ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    {"Standard Events"}
                  </CardTitle>
                  <CardDescription>
                    {"Event Configuration"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.map((event) => {
                    const Icon = event.icon;
                    return (
                      <Card
                        key={event.id}
                        className={cn(
                          "border transition-all",
                          event.enabled 
                            ? "border-primary/20 bg-primary/5 dark:bg-primary/10" 
                            : "border-gray-200 dark:border-gray-800"
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={cn(
                                "p-2 rounded-lg",
                                event.enabled
                                  ? "bg-primary/10 text-primary"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                              )}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                    {event.name}
                                  </h4>
                                  <Badge variant="outline" className="text-xs font-mono">
                                    {event.gtmEvent}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {event.description}
                                </p>
                                {event.enabled && event.parameters.length > 0 && (
                                  <div className="mt-3 space-y-1">
                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Parameters:
                                    </p>
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded p-2 space-y-1">
                                      {event.parameters.map((param, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                                          <span className="text-gray-600 dark:text-gray-400">{param.key}:</span>
                                          <span className="text-primary">{param.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Switch
                              checked={event.enabled}
                              onCheckedChange={() => handleEventToggle(event.id)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-primary" />
                      {"Custom Events"}
                    </CardTitle>
                    <CardDescription>
                      {"Event Configuration"}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={addCustomEvent}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {"Add Event"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {customEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <Code2 className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No custom events configured yet
                    </p>
                  </div>
                ) : (
                  customEvents.map((event, index) => (
                    <Card key={event.id} className="border border-gray-200 dark:border-gray-800">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-700 dark:text-gray-300 font-medium">
                            Custom Event #{index + 1}
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCustomEvent(event.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {"Event Name"}
                            </Label>
                            <Input
                              value={event.name}
                              onChange={(e) => updateCustomEvent(event.id, "name", e.target.value)}
                              placeholder="e.g., form_submit"
                              className="border-gray-300 dark:border-gray-700"
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Trigger
                            </Label>
                            <Select 
                              value={event.trigger}
                              onValueChange={(value) => updateCustomEvent(event.id, "trigger", value)}
                            >
                              <SelectTrigger className="border-gray-300 dark:border-gray-700">
                                <SelectValue placeholder="Select trigger" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="click">Click</SelectItem>
                                <SelectItem value="form_submit">Form Submit</SelectItem>
                                <SelectItem value="scroll">Scroll</SelectItem>
                                <SelectItem value="timer">Timer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Data Layer Code
                          </Label>
                          <textarea
                            value={event.dataLayer}
                            onChange={(e) => updateCustomEvent(event.id, "dataLayer", e.target.value)}
                            className="w-full h-20 px-3 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="debug">
            <div className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <TestTube className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Debug & Testing</CardTitle>
                        <CardDescription className="text-white/80">
                          Test your GTM implementation
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={debugMode}
                      onCheckedChange={setDebugMode}
                      className="data-[state=checked]:bg-white dark:data-[state=checked]:bg-gray-200"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {debugMode && (
                    <Alert variant="warning">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Debug Mode Active</AlertTitle>
                      <AlertDescription>
                        GTM debug mode is enabled. Open your browser console to see tracking events.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">
                            {"Status"}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {containerId ? "Connected" : "Not Configured"}
                          </p>
                        </div>
                      </div>
                      {containerId && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          {"Active"}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => window.open("https://tagassistant.google.com/", "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Tag Assistant
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => window.open(`https://tagmanager.google.com/#/container/accounts/${containerId}`, "_blank")}
                        disabled={!containerId}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        GTM Dashboard
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                      Quick Test
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Click the button below to trigger a test event
                    </p>
                    <Button
                      onClick={() => {
                        if (window.dataLayer) {
                          window.dataLayer.push({
                            event: 'test_event',
                            test_timestamp: new Date().toISOString()
                          });
                          alert("");
                        } else {
                          alert("");
                        }
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Send Test Event
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    {"Implementation"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>1. Create a GTM account and container</p>
                    <p>2. Copy your container ID and paste it above</p>
                    <p>3. Add the installation codes to your website</p>
                    <p>4. Configure your desired events</p>
                    <p>5. Test using Tag Assistant or Preview mode</p>
                    <p>6. Publish your container when ready</p>
                  </div>
                  <div className="pt-3">
                    <a
                      href="https://support.google.com/tagmanager/answer/6103696"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center gap-1"
                    >
                      {"Learn More"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-700"
          >
            {"Cancel"}
          </Button>
          <Button 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
            disabled={!containerId}
          >
            {"Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GoogleTag;
