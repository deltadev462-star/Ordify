import { useState } from 'react';
import {
  Key,
  Eye,
  EyeOff,
  Save,
  Copy,
  Plus,
  Trash2,
  Shield,
  AlertCircle,
  Info,
  ExternalLink,
  Terminal,
  Book,
  Activity,
  Clock,
  Zap,
  Globe,
  Lock,
  Webhook,
  Database,
  FileJson,
  ChevronRight,
  Download,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
  rateLimit: number;
  active: boolean;
}

interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
  lastTriggered?: string;
  failureCount: number;
}

function PublicAPISection() {
  const [activeTab, setActiveTab] = useState('keys');
  const [showKey, setShowKey] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState<string | null>(null);
  
  const [apiSettings, setApiSettings] = useState({
    apiEnabled: true,
    version: 'v1',
    baseUrl: 'https://api.yourstore.com',
    rateLimitPeriod: 'hour',
    globalRateLimit: 1000,
    authMethod: 'api_key',
    responseFormat: 'json',
    enableCORS: true,
    allowedOrigins: '*',
    enableWebhooks: true,
    maxWebhookRetries: 3,
    enablePlayground: true,
    enableDocumentation: true,
    enableAnalytics: true,
    enableIPWhitelist: false,
    ipWhitelist: []
  });

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: "Production Key",
      key: 'sk_live_4242424242424242424242',
      created: '2024-01-15',
      lastUsed: '2024-12-06',
      permissions: ['read:orders', 'read:products', 'read:customers'],
      rateLimit: 1000,
      active: true
    },
    {
      id: '2',
      name: "Test Key",
      key: 'sk_test_8484848484848484848484',
      created: '2024-02-20',
      lastUsed: '2024-12-05',
      permissions: ['read:orders', 'write:orders', 'read:products'],
      rateLimit: 100,
      active: false
    }
  ]);

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      url: 'https://example.com/webhook',
      events: ['order.created', 'order.updated'],
      secret: 'whsec_1234567890abcdef',
      active: true,
      lastTriggered: '2024-12-06 10:30',
      failureCount: 0
    }
  ]);

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/orders',
      description: "List Orders",
      auth: true
    },
    {
      method: 'GET',
      path: '/orders/:id',
      description: "Get Order",
      auth: true
    },
    {
      method: 'POST',
      path: '/orders',
      description: "Create Order",
      auth: true
    },
    {
      method: 'GET',
      path: '/products',
      description: "List Products",
      auth: false
    },
    {
      method: 'GET',
      path: '/products/:id',
      description: "Get Product",
      auth: false
    },
    {
      method: 'GET',
      path: '/customers',
      description: "List Customers",
      auth: true
    }
  ];

  const webhookEvents = [
    { value: 'order.created', label: "Order Created" },
    { value: 'order.updated', label: "Order Updated" },
    { value: 'order.cancelled', label: "Order Cancelled" },
    { value: 'order.fulfilled', label: "Order Fulfilled" },
    { value: 'customer.created', label: "Customer Created" },
    { value: 'customer.updated', label: "Customer Updated" },
    { value: 'product.created', label: "Product Created" },
    { value: 'product.updated', label: "Product Updated" },
    { value: 'product.deleted', label: "Product Deleted" }
  ];

  const generateApiKey = () => {
    const prefix = 'sk_live_';
    const randomString = Array.from({ length: 32 }, () => 
      Math.random().toString(36).charAt(2)
    ).join('');
    return prefix + randomString;
  };

  const addApiKey = () => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: "New Key",
      key: generateApiKey(),
      created: new Date().toISOString().split("T")[0],
      lastUsed: '-',
      permissions: ['read:orders', 'read:products'],
      rateLimit: 100,
      active: true
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const toggleApiKey = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, active: !key.active } : key
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const addWebhook = () => {
    const newWebhook: Webhook = {
      id: Date.now().toString(),
      url: '',
      events: [],
      secret: 'whsec_' + Array.from({ length: 32 }, () => 
        Math.random().toString(36).charAt(2)
      ).join(''),
      active: true,
      failureCount: 0
    };
    setWebhooks([...webhooks, newWebhook]);
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
  };

  const getMethodBadgeVariant = (method: string) => {
    switch (method) {
      case 'GET': return 'default';
      case 'POST': return 'secondary';
      case 'PUT': return 'outline';
      case 'DELETE': return 'destructive';
      default: return 'default';
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-3xl grid-cols-6 mb-6">
          <TabsTrigger value="keys" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            {"Api Keys"}
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            {"Endpoints"}
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            {"Webhooks"}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {"Settings"}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            {"Analytics"}
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <Book className="w-4 h-4" />
            {"Docs"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{"Title"}</CardTitle>
                    <CardDescription className="text-white/80">
                      {"Description"}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                  onClick={addApiKey}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {"New Key Button"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {apiKeys.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 inline-block mb-4">
                    <Key className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{"No Keys"}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={addApiKey}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {"Create First Key"}
                  </Button>
                </div>
              ) : (
                apiKeys.map((apiKey) => (
                  <Card
                    key={apiKey.id}
                    className={cn(
                      "border transition-all",
                      apiKey.active 
                        ? "border-gray-200 dark:border-gray-700" 
                        : "border-gray-200/50 dark:border-gray-700/50 opacity-75"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                              {apiKey.name}
                            </h4>
                            {apiKey.active ? (
                              <Badge variant="default" className="text-xs">
                                {"Active"}
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                {"Inactive"}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-2 flex-1">
                              <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                                {showKey === apiKey.id ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                              >
                                {showKey === apiKey.id ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(apiKey.key)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={apiKey.active}
                            onCheckedChange={() => toggleApiKey(apiKey.id)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteApiKey(apiKey.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">{"Created"}</p>
                          <p className="font-medium">{apiKey.created}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">{"Last Used"}</p>
                          <p className="font-medium">{apiKey.lastUsed}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">{"Rate Limit"}</p>
                          <p className="font-medium">{apiKey.rateLimit}/hour</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{"Permissions"}</p>
                        <div className="flex flex-wrap gap-2">
                          {apiKey.permissions.map((perm) => (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {"Security Warning"}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {apiSettings.baseUrl}/{apiSettings.version}
                  </code>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  {"Open Playground"}
                </Button>
              </div>

              <div className="space-y-2">
                {apiEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={getMethodBadgeVariant(endpoint.method)} className="font-mono w-16 justify-center">
                        {endpoint.method}
                      </Badge>
                      <code className="font-mono text-sm">{endpoint.path}</code>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {endpoint.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {endpoint.auth && (
                        <Badge variant="outline" className="text-xs gap-1">
                          <Lock className="w-3 h-3" />
                          {"Auth Required"}
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">{"Example Request"}</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`curl -X GET \\
  ${apiSettings.baseUrl}/${apiSettings.version}/products \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`}
                  </pre>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-3">{"Example Response"}</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`{
  "data": [
    {
      "id": "prod_123",
      "name": "Example Product",
      "price": 2999,
      "currency": "usd",
      "stock": 100
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 20
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{"Title"}</CardTitle>
                    <CardDescription className="text-white/80">
                      {"Description"}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                  onClick={addWebhook}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {"Add Webhook"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {webhooks.map((webhook) => (
                <Card key={webhook.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <Input
                          value={webhook.url}
                          onChange={(e) => {
                            setWebhooks(webhooks.map(w => 
                              w.id === webhook.id ? { ...w, url: e.target.value } : w
                            ));
                          }}
                          placeholder="https://your-domain.com/webhook"
                          className="mb-3"
                        />
                        
                        <div className="flex items-center gap-2 mb-3">
                          <Label className="text-sm">{"Secret"}</Label>
                          <div className="flex items-center gap-2 flex-1">
                            <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                              {showSecret === webhook.id ? webhook.secret : '••••••••••••••••••••••••'}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowSecret(showSecret === webhook.id ? null : webhook.id)}
                            >
                              {showSecret === webhook.id ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(webhook.secret)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm mb-2">{"Events Label"}</Label>
                          <Select
                            value=""
                            onValueChange={(value) => {
                              if (value && !webhook.events.includes(value)) {
                                setWebhooks(webhooks.map(w => 
                                  w.id === webhook.id 
                                    ? { ...w, events: [...w.events, value] } 
                                    : w
                                ));
                              }
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={"Select Events"} />
                            </SelectTrigger>
                            <SelectContent>
                              {webhookEvents.map((event) => (
                                <SelectItem 
                                  key={event.value} 
                                  value={event.value}
                                  disabled={webhook.events.includes(event.value)}
                                >
                                  {event.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {webhook.events.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {webhook.events.map((event) => (
                                <Badge 
                                  key={event} 
                                  variant="secondary"
                                  className="gap-1 cursor-pointer"
                                  onClick={() => {
                                    setWebhooks(webhooks.map(w => 
                                      w.id === webhook.id 
                                        ? { ...w, events: w.events.filter(e => e !== event) } 
                                        : w
                                    ));
                                  }}
                                >
                                  {event}
                                  <span className="ml-1">×</span>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Switch
                          checked={webhook.active}
                          onCheckedChange={(checked) => {
                            setWebhooks(webhooks.map(w => 
                              w.id === webhook.id ? { ...w, active: checked } : w
                            ));
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteWebhook(webhook.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {webhook.lastTriggered && (
                      <div className="flex items-center justify-between pt-3 border-t text-sm">
                        <span className="text-gray-500">
                          {"Last Triggered"} {webhook.lastTriggered}
                        </span>
                        {webhook.failureCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {webhook.failureCount} {"Failures"}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {webhooks.length === 0 && (
                <div className="text-center py-12">
                  <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 inline-block mb-4">
                    <Zap className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{"No Webhooks"}</p>
                </div>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {"Info"}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {"Security Title"}
              </CardTitle>
              <CardDescription>
                {"Security Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{"Api Access"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Api Access Description"}
                  </p>
                </div>
                <Switch
                  checked={apiSettings.apiEnabled}
                  onCheckedChange={(checked) => 
                    setApiSettings(prev => ({ ...prev, apiEnabled: checked }))
                  }
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">{"Rate Limiting"}</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2">{"Global Rate Limit"}</Label>
                    <Input
                      type="number"
                      value={apiSettings.globalRateLimit}
                      onChange={(e) => setApiSettings(prev => ({ 
                        ...prev, 
                        globalRateLimit: parseInt(e.target.value) 
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">{"Time Period"}</Label>
                    <Select
                      value={apiSettings.rateLimitPeriod}
                      onValueChange={(value) => 
                        setApiSettings(prev => ({ ...prev, rateLimitPeriod: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minute">{"Per Minute"}</SelectItem>
                        <SelectItem value="hour">{"Per Hour"}</SelectItem>
                        <SelectItem value="day">{"Per Day"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">{"Cors Settings"}</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Enable C O R S"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Enable C O R S Description"}
                    </p>
                  </div>
                  <Switch
                    checked={apiSettings.enableCORS}
                    onCheckedChange={(checked) => 
                      setApiSettings(prev => ({ ...prev, enableCORS: checked }))
                    }
                  />
                </div>

                {apiSettings.enableCORS && (
                  <div>
                    <Label className="mb-2">{"Allowed Origins"}</Label>
                    <Input
                      value={apiSettings.allowedOrigins}
                      onChange={(e) => setApiSettings(prev => ({ 
                        ...prev, 
                        allowedOrigins: e.target.value 
                      }))}
                      placeholder="* or https://example.com"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {"Origins Hint"}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">{"Ip Whitelist"}</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Enable I P Whitelist"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Enable I P Whitelist Description"}
                    </p>
                  </div>
                  <Switch
                    checked={apiSettings.enableIPWhitelist}
                    onCheckedChange={(checked) => 
                      setApiSettings(prev => ({ ...prev, enableIPWhitelist: checked }))
                    }
                  />
                </div>

                {apiSettings.enableIPWhitelist && (
                  <div>
                    <Label className="mb-2">{"Whitelisted I Ps"}</Label>
                    <Textarea
                      placeholder="192.168.1.1&#10;10.0.0.0/24"
                      className="font-mono"
                      rows={4}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {"Ip Hint"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                {"Response Settings"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2">{"Response Format"}</Label>
                <Select
                  value={apiSettings.responseFormat}
                  onValueChange={(value) => 
                    setApiSettings(prev => ({ ...prev, responseFormat: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">{"Json"}</SelectItem>
                    <SelectItem value="xml">{"Xml"}</SelectItem>
                    <SelectItem value="csv">{"Csv"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2">{"Api Version"}</Label>
                <Input
                  value={apiSettings.version}
                  onChange={(e) => setApiSettings(prev => ({ 
                    ...prev, 
                    version: e.target.value 
                  }))}
                  placeholder="v1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{"Total Requests"}</p>
                      <Activity className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold mt-2">42,853</p>
                    <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{"Active Keys"}</p>
                      <Key className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold mt-2">12</p>
                    <p className="text-xs text-gray-600 mt-1">2 created this week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{"Error Rate"}</p>
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold mt-2">0.3%</p>
                    <p className="text-xs text-green-600 mt-1">-0.1% from yesterday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{"Avg Response"}</p>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold mt-2">142ms</p>
                    <p className="text-xs text-gray-600 mt-1">Well within limits</p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-3">{"Top Endpoints"}</h4>
                <div className="space-y-3">
                  {[
                    { endpoint: 'GET /products', calls: 15420, percentage: 36 },
                    { endpoint: 'GET /orders', calls: 12350, percentage: 29 },
                    { endpoint: 'POST /orders', calls: 8940, percentage: 21 },
                    { endpoint: 'GET /customers', calls: 6143, percentage: 14 }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <code className="text-sm font-mono">{item.endpoint}</code>
                        <span className="text-sm text-gray-600">{item.calls.toLocaleString()} calls</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-3">{"Recent Activity"}</h4>
                <div className="space-y-2">
                  {[
                    { time: '2 min ago', key: 'sk_live_424...', endpoint: 'GET /products', status: 200 },
                    { time: '5 min ago', key: 'sk_test_848...', endpoint: 'POST /orders', status: 201 },
                    { time: '8 min ago', key: 'sk_live_424...', endpoint: 'GET /customers/123', status: 404 },
                    { time: '12 min ago', key: 'sk_live_424...', endpoint: 'GET /orders', status: 200 }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900/50 rounded">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{log.time}</span>
                        <code className="text-xs font-mono">{log.key}</code>
                        <span className="text-sm">{log.endpoint}</span>
                      </div>
                      <Badge
                        variant={log.status < 300 ? 'default' : log.status < 500 ? 'outline' : 'destructive'}
                        className="text-xs"
                      >
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{"Title"}</CardTitle>
                  <CardDescription className="text-white/80">
                    {"Description"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{"Getting Started"}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {"Getting Started Description"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Terminal className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{"Api Reference"}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {"Api Reference Description"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileJson className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{"Code Examples"}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {"Code Examples Description"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{"Sdks"}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {"Sdks Description"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">{"Quick Links"}</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-between">
                    <span>{"Download Open A P I"}</span>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{"Import Postman"}</span>
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{"View Changelog"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {"Help Text"}
                </AlertDescription>
              </Alert>
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

export default PublicAPISection;