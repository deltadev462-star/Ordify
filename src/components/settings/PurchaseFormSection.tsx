import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      label: t('purchaseForm.fields.fullName'),
      type: 'text',
      required: true,
      placeholder: t('purchaseForm.placeholders.fullName'),
      order: 1,
      visible: true
    },
    {
      id: 'email',
      name: 'email',
      label: t('purchaseForm.fields.email'),
      type: 'email',
      required: true,
      placeholder: t('purchaseForm.placeholders.email'),
      validation: 'email',
      order: 2,
      visible: true
    },
    {
      id: 'phone',
      name: 'phone',
      label: t('purchaseForm.fields.phone'),
      type: 'phone',
      required: true,
      placeholder: t('purchaseForm.placeholders.phone'),
      validation: 'phone',
      order: 3,
      visible: true
    },
    {
      id: 'shipping_address',
      name: 'shipping_address',
      label: t('purchaseForm.fields.shippingAddress'),
      type: 'text',
      required: true,
      placeholder: t('purchaseForm.placeholders.shippingAddress'),
      order: 4,
      visible: true
    },
    {
      id: 'city',
      name: 'city',
      label: t('purchaseForm.fields.city'),
      type: 'text',
      required: true,
      placeholder: t('purchaseForm.placeholders.city'),
      order: 5,
      visible: true
    },
    {
      id: 'country',
      name: 'country',
      label: t('purchaseForm.fields.country'),
      type: 'select',
      required: true,
      options: [t('purchaseForm.countries.us'), t('purchaseForm.countries.ca'), t('purchaseForm.countries.uk'), t('purchaseForm.countries.au')],
      order: 6,
      visible: true
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'cod',
      name: t('purchaseForm.paymentMethods.cod'),
      icon: DollarSign,
      enabled: true,
      description: t('purchaseForm.paymentMethods.codDescription'),
      fee: 5,
      feeType: 'fixed'
    },
    {
      id: 'card',
      name: t('purchaseForm.paymentMethods.card'),
      icon: CreditCard,
      enabled: true,
      description: t('purchaseForm.paymentMethods.cardDescription'),
    },
    {
      id: 'paypal',
      name: t('purchaseForm.paymentMethods.paypal'),
      icon: CreditCard,
      enabled: false,
      description: t('purchaseForm.paymentMethods.paypalDescription'),
    },
    {
      id: 'bank',
      name: t('purchaseForm.paymentMethods.bank'),
      icon: FileText,
      enabled: false,
      description: t('purchaseForm.paymentMethods.bankDescription'),
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
        <AlertTitle>{t("purchaseForm.title")}</AlertTitle>
        <AlertDescription>
          {t("purchaseForm.description")}
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="fields" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {t("purchaseForm.tabs.formFields")}
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            {t("purchaseForm.tabs.payment")}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {t("purchaseForm.tabs.appearance")}
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {t("purchaseForm.tabs.advanced")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {t("purchaseForm.customerInfo.title")}
              </CardTitle>
              <CardDescription>
                {t("purchaseForm.customerInfo.description")}
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
                                {t("purchaseForm.required")}
                              </Badge>
                            )}
                            {!field.visible && (
                              <Badge variant="secondary" className="text-xs">
                                {t("purchaseForm.hidden")}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span className="font-mono">{field.name}</span>
                            <span>•</span>
                            <span>{t("purchaseForm.type")}: {field.type}</span>
                            {field.validation && (
                              <>
                                <span>•</span>
                                <span>{t("purchaseForm.validation")}: {field.validation}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">{t("purchaseForm.required")}</Label>
                          <Switch
                            checked={field.required}
                            onCheckedChange={() => handleFieldRequiredToggle(field.id)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">{t("purchaseForm.visible")}</Label>
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
                <h4 className="font-medium mb-3">{t("purchaseForm.customFields.title")}</h4>
                
                {customFields.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {customFields.map((field, index) => (
                      <Card key={field.id} className="border border-gray-200 dark:border-gray-800">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>{t("purchaseForm.customFields.customField", {number: index + 1})}</Label>
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
                              <Label className="text-sm">{t("purchaseForm.customFields.fieldLabel")}</Label>
                              <Input
                                placeholder={t("purchaseForm.customFields.fieldLabelPlaceholder")}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm">{t("purchaseForm.customFields.fieldType")}</Label>
                              <Select defaultValue="text">
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">{t("purchaseForm.fieldTypes.text")}</SelectItem>
                                  <SelectItem value="textarea">{t("purchaseForm.fieldTypes.textarea")}</SelectItem>
                                  <SelectItem value="select">{t("purchaseForm.fieldTypes.dropdown")}</SelectItem>
                                  <SelectItem value="checkbox">{t("purchaseForm.fieldTypes.checkbox")}</SelectItem>
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
                  {t("purchaseForm.customFields.addField")}
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
                  <CardTitle className="text-xl">{t("purchaseForm.payment.title")}</CardTitle>
                  <CardDescription className="text-white/80">
                    {t("purchaseForm.payment.description")}
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
                                  <Label className="text-sm">{t("purchaseForm.payment.transactionFee")}</Label>
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
                                        <SelectItem value="fixed">{t("purchaseForm.payment.fixed")}</SelectItem>
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
                  {t("purchaseForm.payment.warning")}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                {t("purchaseForm.shipping.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("purchaseForm.shipping.showCalculator")}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("purchaseForm.shipping.showCalculatorDescription")}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("purchaseForm.shipping.expressOption")}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("purchaseForm.shipping.expressOptionDescription")}
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
                {t("purchaseForm.appearance.title")}
              </CardTitle>
              <CardDescription>
                {t("purchaseForm.appearance.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2">{t("purchaseForm.appearance.formLayout")}</Label>
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
                    <SelectItem value="single">{t("purchaseForm.appearance.singlePage")}</SelectItem>
                    <SelectItem value="multi">{t("purchaseForm.appearance.multiStep")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formSettings.layout === 'multi' && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {t("purchaseForm.appearance.multiStepDescription")}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("purchaseForm.appearance.progressIndicator")}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("purchaseForm.appearance.progressIndicatorDescription")}
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
                <Label className="mb-2">{t("purchaseForm.appearance.orderSummaryPosition")}</Label>
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
                    <SelectItem value="right">{t("purchaseForm.appearance.sidebarRight")}</SelectItem>
                    <SelectItem value="top">{t("purchaseForm.appearance.topOfForm")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">{t("purchaseForm.appearance.securityBadges")}</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("purchaseForm.appearance.showSecurityBadges")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("purchaseForm.appearance.showSecurityBadgesDescription")}
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
                {t("purchaseForm.appearance.formPreview")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-lg mx-auto">
                  {formSettings.showProgressBar && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary">{t("purchaseForm.appearance.stepProgress", { current: 1, total: 3 })}</span>
                        <span className="text-sm text-gray-600">{t("purchaseForm.appearance.customerInfo")}</span>
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
                        {t("purchaseForm.appearance.sslSecured")}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {t("purchaseForm.appearance.verifiedMerchant")}
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
                {t("purchaseForm.advanced.title")}
              </CardTitle>
              <CardDescription>
                {t("purchaseForm.advanced.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("purchaseForm.advanced.guestCheckout")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("purchaseForm.advanced.guestCheckoutDescription")}
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
                    <p className="font-medium">{t("purchaseForm.advanced.autoSave")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("purchaseForm.advanced.autoSaveDescription")}
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
                    <p className="font-medium">{t("purchaseForm.advanced.couponCode")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("purchaseForm.advanced.couponCodeDescription")}
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
                    <p className="font-medium">{t("purchaseForm.advanced.giftMessage")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("purchaseForm.advanced.giftMessageDescription")}
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
                    <p className="font-medium">{t("purchaseForm.advanced.termsConditions")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("purchaseForm.advanced.termsConditionsDescription")}
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
                    <p className="font-medium">{t("purchaseForm.advanced.newsletterOptIn")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("purchaseForm.advanced.newsletterOptInDescription")}
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
                {t("purchaseForm.validation.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t("purchaseForm.validation.errorMessageStyle")}</Label>
                <Select defaultValue="inline">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inline">{t("purchaseForm.validation.inline")}</SelectItem>
                    <SelectItem value="toast">{t("purchaseForm.validation.toast")}</SelectItem>
                    <SelectItem value="summary">{t("purchaseForm.validation.summary")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t("purchaseForm.validation.phoneFormat")}</Label>
                <Select defaultValue="international">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="international">{t("purchaseForm.validation.international")}</SelectItem>
                    <SelectItem value="national">{t("purchaseForm.validation.national")}</SelectItem>
                    <SelectItem value="none">{t("purchaseForm.validation.noFormatting")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button variant="outline">
          {t("purchaseForm.actions.cancel")}
        </Button>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Save className="w-4 h-4 mr-2" />
          {t("purchaseForm.actions.save")}
        </Button>
      </div>
    </div>
  );
}

export default PurchaseFormSection;