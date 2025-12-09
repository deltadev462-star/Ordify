import { useState } from 'react';
import { 
  CreditCard, 
  User,
  FileText,
  Settings,
  Eye,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Shield,
  AlertCircle,
  CheckCircle,
  Info,
  Package,
  DollarSign
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: string;
  order: number;
  visible: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  enabled: boolean;
  description: string;
  fee?: number;
  feeType?: 'fixed' | 'percentage';
}

function PurchaseFormSection() {
  const [activeTab, setActiveTab] = useState('fields');
  
  const [formSettings, setFormSettings] = useState({
    layout: 'single' as 'single' | 'multi',
    theme: 'modern',
    showProgressBar: true,
    autoSaveForm: true,
    saveInterval: 30,
    showOrderSummary: true,
    summaryPosition: 'right' as 'right' | 'top',
    requireAccountCreation: false,
    enableGuestCheckout: true,
    showEstimatedDelivery: true,
    showSecurityBadges: true,
    enableCouponCode: true,
    enableGiftMessage: false,
    termsRequired: true,
    newsletterOptIn: true
  });

  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: 'full_name',
      name: 'full_name',
      label: "Full Name",
      type: 'text',
      required: true,
      placeholder: "Full Name",
      order: 1,
      visible: true
    },
    {
      id: 'email',
      name: 'email',
      label: "Email",
      type: 'email',
      required: true,
      placeholder: "Email",
      validation: 'email',
      order: 2,
      visible: true
    },
    {
      id: 'phone',
      name: 'phone',
      label: "Phone",
      type: 'phone',
      required: true,
      placeholder: "Phone",
      validation: 'phone',
      order: 3,
      visible: true
    },
    {
      id: 'shipping_address',
      name: 'shipping_address',
      label: "Shipping Address",
      type: 'text',
      required: true,
      placeholder: "Shipping Address",
      order: 4,
      visible: true
    },
    {
      id: 'city',
      name: 'city',
      label: "City",
      type: 'text',
      required: true,
      placeholder: "City",
      order: 5,
      visible: true
    },
    {
      id: 'country',
      name: 'country',
      label: "Country",
      type: 'select',
      required: true,
      options: ["Us", "Ca", "Uk", "Au"],
      order: 6,
      visible: true
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'cod',
      name: "Cod",
      icon: DollarSign,
      enabled: true,
      description: "Cod Description",
      fee: 5,
      feeType: 'fixed'
    },
    {
      id: 'card',
      name: "Card",
      icon: CreditCard,
      enabled: true,
      description: "Card Description",
    },
    {
      id: 'paypal',
      name: "Paypal",
      icon: CreditCard,
      enabled: false,
      description: "Paypal Description",
    },
    {
      id: 'bank',
      name: "Bank",
      icon: FileText,
      enabled: false,
      description: "Bank Description",
      fee: 2,
      feeType: 'percentage'
    }
  ]);

  const [customFields, setCustomFields] = useState<FormField[]>([]);

  const handleFieldToggle = (fieldId: string) => {
    setFormFields(prev => prev.map(field =>
      field.id === fieldId ? { ...field, visible: !field.visible } : field
    ));
  };

  const handleFieldRequiredToggle = (fieldId: string) => {
    setFormFields(prev => prev.map(field =>
      field.id === fieldId ? { ...field, required: !field.required } : field
    ));
  };

  const moveFieldUp = (index: number) => {
    if (index === 0) return;
    const newFields = [...formFields];
    [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
    setFormFields(newFields);
  };

  const moveFieldDown = (index: number) => {
    if (index === formFields.length - 1) return;
    const newFields = [...formFields];
    [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
    setFormFields(newFields);
  };

  const handlePaymentToggle = (paymentId: string) => {
    setPaymentMethods(prev => prev.map(method =>
      method.id === paymentId ? { ...method, enabled: !method.enabled } : method
    ));
  };

  const addCustomField = () => {
    const newField: FormField = {
      id: `custom_${Date.now()}`,
      name: '',
      label: '',
      type: 'text',
      required: false,
      order: formFields.length + customFields.length + 1,
      visible: true
    };
    setCustomFields(prev => [...prev, newField]);
  };

  const removeCustomField = (fieldId: string) => {
    setCustomFields(prev => prev.filter(field => field.id !== fieldId));
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
        <TabsList className="grid w-full max-w-2xl grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="fields" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {"Form Fields"}
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            {"Payment"}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {"Appearance"}
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {"Advanced"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formFields.map((field, index) => (
                <Card key={field.id} className="border border-gray-200 dark:border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveFieldUp(index)}
                            disabled={index === 0}
                            className="h-6 px-2"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveFieldDown(index)}
                            disabled={index === formFields.length - 1}
                            className="h-6 px-2"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">
                              {field.label}
                            </h4>
                            {field.required && (
                              <Badge variant="destructive" className="text-xs">
                                {"Required"}
                              </Badge>
                            )}
                            {!field.visible && (
                              <Badge variant="secondary" className="text-xs">
                                {"Hidden"}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span className="font-mono">{field.name}</span>
                            <span>•</span>
                            <span>{"Type"}: {field.type}</span>
                            {field.validation && (
                              <>
                                <span>•</span>
                                <span>{"Validation"}: {field.validation}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">{"Required"}</Label>
                          <Switch
                            checked={field.required}
                            onCheckedChange={() => handleFieldRequiredToggle(field.id)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">{"Visible"}</Label>
                          <Switch
                            checked={field.visible}
                            onCheckedChange={() => handleFieldToggle(field.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="pt-4">
                <h4 className="font-medium mb-3">{"Title"}</h4>
                
                {customFields.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {customFields.map((field, index) => (
                      <Card key={field.id} className="border border-gray-200 dark:border-gray-800">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>{"Custom Field"}</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCustomField(field.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-sm">{"Field Label"}</Label>
                              <Input
                                placeholder={"Field Label Placeholder"}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm">{"Field Type"}</Label>
                              <Select defaultValue="text">
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">{"Text"}</SelectItem>
                                  <SelectItem value="textarea">{"Textarea"}</SelectItem>
                                  <SelectItem value="select">{"Dropdown"}</SelectItem>
                                  <SelectItem value="checkbox">{"Checkbox"}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={addCustomField}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {"Add Field"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <CreditCard className="w-6 h-6 text-white" />
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
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={method.id}
                    className={cn(
                      "border transition-all",
                      method.enabled 
                        ? "border-primary/20 bg-primary/5 dark:bg-primary/10" 
                        : "border-gray-200 dark:border-gray-800"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={cn(
                            "p-2 rounded-lg",
                            method.enabled
                              ? "bg-primary/10 text-primary"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">
                              {method.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {method.description}
                            </p>
                            {method.enabled && method.fee && (
                              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm">{"Transaction Fee"}</Label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      value={method.fee}
                                      className="w-20 h-8 text-sm"
                                      placeholder="0"
                                    />
                                    <Select defaultValue={method.feeType}>
                                      <SelectTrigger className="w-24 h-8">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="fixed">{"Fixed"}</SelectItem>
                                        <SelectItem value="percentage">%</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <Switch
                          checked={method.enabled}
                          onCheckedChange={() => handlePaymentToggle(method.id)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {"Warning"}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{"Show Calculator"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Show Calculator Description"}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{"Express Option"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Express Option Description"}
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2">{"Form Layout"}</Label>
                <Select 
                  value={formSettings.layout}
                  onValueChange={(value: 'single' | 'multi') => 
                    setFormSettings(prev => ({ ...prev, layout: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">{"Single Page"}</SelectItem>
                    <SelectItem value="multi">{"Multi Step"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formSettings.layout === 'multi' && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {"Multi Step Description"}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{"Progress Indicator"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Progress Indicator Description"}
                  </p>
                </div>
                <Switch
                  checked={formSettings.showProgressBar}
                  onCheckedChange={(checked) => 
                    setFormSettings(prev => ({ ...prev, showProgressBar: checked }))
                  }
                />
              </div>

              <div>
                <Label className="mb-2">{"Order Summary Position"}</Label>
                <Select 
                  value={formSettings.summaryPosition}
                  onValueChange={(value: 'right' | 'top') => 
                    setFormSettings(prev => ({ ...prev, summaryPosition: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="right">{"Sidebar Right"}</SelectItem>
                    <SelectItem value="top">{"Top Of Form"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">{"Security Badges"}</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Show Security Badges"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Show Security Badges Description"}
                    </p>
                  </div>
                  <Switch
                    checked={formSettings.showSecurityBadges}
                    onCheckedChange={(checked) => 
                      setFormSettings(prev => ({ ...prev, showSecurityBadges: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                {"Form Preview"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-lg mx-auto">
                  {formSettings.showProgressBar && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary">{"Step Progress"}</span>
                        <span className="text-sm text-gray-600">{"Customer Info"}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '33%' }} />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {formFields
                      .filter(f => f.visible)
                      .slice(0, 3)
                      .map(field => (
                        <div key={field.id}>
                          <Label className="text-sm mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          <Input 
                            placeholder={field.placeholder}
                            className="h-10"
                            disabled
                          />
                        </div>
                      ))}
                  </div>

                  {formSettings.showSecurityBadges && (
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t">
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="w-3 h-3" />
                        {"Ssl Secured"}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {"Verified Merchant"}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Guest Checkout"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Guest Checkout Description"}
                    </p>
                  </div>
                  <Switch
                    checked={formSettings.enableGuestCheckout}
                    onCheckedChange={(checked) => 
                      setFormSettings(prev => ({ ...prev, enableGuestCheckout: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Auto Save"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Auto Save Description"}
                    </p>
                  </div>
                  <Switch
                    checked={formSettings.autoSaveForm}
                    onCheckedChange={(checked) => 
                      setFormSettings(prev => ({ ...prev, autoSaveForm: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Coupon Code"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Coupon Code Description"}
                    </p>
                  </div>
                  <Switch
                    checked={formSettings.enableCouponCode}
                    onCheckedChange={(checked) => 
                      setFormSettings(prev => ({ ...prev, enableCouponCode: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Gift Message"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Gift Message Description"}
                    </p>
                  </div>
                  <Switch
                    checked={formSettings.enableGiftMessage}
                    onCheckedChange={(checked) => 
                      setFormSettings(prev => ({ ...prev, enableGiftMessage: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Terms Conditions"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Terms Conditions Description"}
                    </p>
                  </div>
                  <Switch
                    checked={formSettings.termsRequired}
                    onCheckedChange={(checked) => 
                      setFormSettings(prev => ({ ...prev, termsRequired: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{"Newsletter Opt In"}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {"Newsletter Opt In Description"}
                    </p>
                  </div>
                  <Switch
                    checked={formSettings.newsletterOptIn}
                    onCheckedChange={(checked) => 
                      setFormSettings(prev => ({ ...prev, newsletterOptIn: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{"Error Message Style"}</Label>
                <Select defaultValue="inline">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inline">{"Inline"}</SelectItem>
                    <SelectItem value="toast">{"Toast"}</SelectItem>
                    <SelectItem value="summary">{"Summary"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{"Phone Format"}</Label>
                <Select defaultValue="international">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="international">{"International"}</SelectItem>
                    <SelectItem value="national">{"National"}</SelectItem>
                    <SelectItem value="none">{"No Formatting"}</SelectItem>
                  </SelectContent>
                </Select>
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

export default PurchaseFormSection;