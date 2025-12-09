import Title from "@/components/Title";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Settings as SettingsIcon,
  Globe,
  FileText,
  Code,
  Search,
  CreditCard,
  Camera,
  Tags,
  Package,
  Bell,
  Paintbrush,
  Home,
  ClipboardList,
  Truck,
  NotebookPen,
  Instagram,
  Link,
  Users,
  Code2,
  LogIn,
  Save,
  CheckCircle2,
  ChevronRight,
  Shield,
  Layout,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import all settings section components
import GeneralSettingsSection from "@/components/settings/GeneralSettingsSection";
import SecuritySection from "@/components/settings/SecuritySection";
import NotificationsSection from "@/components/settings/NotificationsSection";
import DomainConfigurationSection from "@/components/settings/DomainConfigurationSection";
import SEOSettingsSection from "@/components/settings/SEOSettingsSection";
import PaymentMethodsSection from "@/components/settings/PaymentMethodsSection";
import ShippingSettingsSection from "@/components/settings/ShippingSettingsSection";
import TaxSettingsSection from "@/components/settings/TaxSettingsSection";
import IntegrationsSection from "@/components/settings/IntegrationsSection";
import AdvancedSettingsSection from "@/components/settings/AdvancedSettingsSection";
import ManageModeratorsSection from "@/components/settings/ManageModeratorsSection";
import SidebarSettingsSection from "@/components/settings/SidebarSettingsSection";
import StoreLinkSection from "@/components/settings/StoreLinkSection";
import SocialLinksSection from "@/components/settings/SocialLinksSection";
import LoginSessionsSection from "@/components/settings/LoginSessionsSection";
import DigitalProductsDeliverySection from "@/components/settings/DigitalProductsDeliverySection";
import PagesManagementSection from "@/components/settings/PagesManagementSection";
import ThemeSettingsSection from "@/components/settings/ThemeSettingsSection";
import EditMainPageSection from "@/components/settings/EditMainPageSection";
import PurchaseFormSection from "@/components/settings/PurchaseFormSection";
import EditThankYouPageSection from "@/components/settings/EditThankYouPageSection";
import PublicAPISection from "@/components/settings/PublicAPISection";

function Settings() {
  const [active, setActive] = useState("storeSettings");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { t } = useTranslation();

  const menu = [
    { titleKey: "settings.store", key: "storeSettings", icon: SettingsIcon, category: "general" },
    { titleKey: "settings.security", key: "securitySettings", icon: Shield, category: "security" },
    { titleKey: "settings.notifications", key: "notifications", icon: Bell, category: "notifications" },
    { titleKey: "settings.sidebar", key: "sidebarSettings", icon: Layout, category: "general", badge: "New" },
    { titleKey: "settings.domainSettings", key: "domainSettings", icon: Globe, category: "general" },
    { titleKey: "settings.storeInfoPolicies", key: "storeInfoPolicies", icon: FileText, category: "general" },
    { titleKey: "settings.addHeaderCode", key: "addHeaderCode", icon: Code, category: "advanced" },
    { titleKey: "settings.seo", key: "seoSettings", icon: Search, category: "marketing" },
    { titleKey: "settings.payment", key: "paymentGateways", icon: CreditCard, category: "payments" },
    { titleKey: "settings.shipping", key: "shippingSettings", icon: Truck, category: "shipping" },
    { titleKey: "settings.taxes", key: "taxSettings", icon: Tags, category: "shipping" },
    { titleKey: "settings.integrations", key: "integrations", icon: Package, category: "advanced" },
    { titleKey: "settings.advancedSettings", key: "advancedSettings", icon: Code2, category: "advanced" },
    { titleKey: "settings.pixelSettings", key: "pixelSettings", icon: Camera, category: "marketing" },
    { titleKey: "settings.googleTagSettings", key: "googleTagSettings", icon: Tags, category: "marketing" },
    { titleKey: "settings.digitalProductsDelivery", key: "digitalProductsDelivery", icon: Package, badge: "New", category: "products" },
    { titleKey: "settings.pages", key: "pages", icon: FileText, category: "content" },
    { titleKey: "settings.theme", key: "themeSettings", icon: Paintbrush, category: "appearance" },
    { titleKey: "settings.editMainPage", key: "editMainPage", icon: Home, category: "content" },
    { titleKey: "settings.purchaseForm", key: "purchaseForm", icon: ClipboardList, category: "checkout" },
    { titleKey: "settings.editThankYouPage", key: "editThankYouPage", icon: NotebookPen, category: "content" },
    { titleKey: "settings.socialLinks", key: "socialLinks", icon: Instagram, category: "social" },
    { titleKey: "settings.storeLink", key: "storeLink", icon: Link, category: "general" },
    { titleKey: "settings.moderators", key: "manageModerators", icon: Users, category: "team" },
    { titleKey: "settings.publicAPI", key: "publicAPI", icon: Code2, category: "advanced" },
    { titleKey: "settings.loginSessions", key: "loginSessions", icon: LogIn, category: "security" },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const renderContent = () => {
    const activeItem = menu.find(item => item.key === active);
    const activeKey = activeItem?.key;
    
    switch (activeKey) {
      case "storeSettings":
        return <GeneralSettingsSection />;
      case "securitySettings":
        return <SecuritySection />;
      case "notifications":
        return <NotificationsSection />;
      case "sidebarSettings":
        return <SidebarSettingsSection />;
      case "domainSettings":
        return <DomainConfigurationSection />;
      case "seoSettings":
        return <SEOSettingsSection />;
      case "paymentGateways":
        return <PaymentMethodsSection />;
      case "shippingSettings":
        return <ShippingSettingsSection />;
      case "taxSettings":
        return <TaxSettingsSection />;
      case "integrations":
        return <IntegrationsSection />;
      case "advancedSettings":
        return <AdvancedSettingsSection />;
      case "loginSessions":
        return <LoginSessionsSection />;
      case "storeLink":
        return <StoreLinkSection />;
      case "socialLinks":
        return <SocialLinksSection />;
      case "manageModerators":
        return <ManageModeratorsSection />;
      case "digitalProductsDelivery":
        return <DigitalProductsDeliverySection />;
      case "pages":
        return <PagesManagementSection />;
      case "themeSettings":
        return <ThemeSettingsSection />;
      case "editMainPage":
        return <EditMainPageSection />;
      case "purchaseForm":
        return <PurchaseFormSection />;
      case "editThankYouPage":
        return <EditThankYouPageSection />;
      case "publicAPI":
        return <PublicAPISection />;
      case "orderNotifications":
        return (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-2xl bg-primary/10 mb-4">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('settings.notifications')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              {t('settings.descriptions.notifications')}
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-2xl bg-muted/50 mb-4">
              <SettingsIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{t(activeItem?.titleKey || active)}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              {t('common.comingSoon', 'Coming Soon')}
            </p>
          </div>
        );
    }
  };

  const shouldShowSaveButton = () => {
    const activeItem = menu.find(item => item.key === active);
    const keysWithSave = [
      "storeSettings",
      "securitySettings",
      "notifications",
      "sidebarSettings",
      "domainSettings",
      "seoSettings",
      "paymentGateways",
      "shippingSettings",
      "taxSettings",
      "integrations",
      "advancedSettings",
      "loginSessions",
      "storeLink",
      "socialLinks",
      "manageModerators",
      "digitalProductsDelivery",
      "pages",
      "themeSettings",
      "editMainPage",
      "purchaseForm",
      "editThankYouPage",
      "publicAPI"
    ];
    return keysWithSave.includes(activeItem?.key || '');
  };

  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-4 md:gap-6 p-4 md:p-6 pt-0">
        <Title
          title={t('settings.title')}
          Subtitle={t('settings.general')}
          className="text-2xl md:text-3xl"
          classNamee=""
        />

        {/* Mobile Menu Dropdown */}
        <div className="block md:hidden">
          <Select value={active} onValueChange={setActive}>
            <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-2">
                {(() => {
                  const activeItem = menu.find(m => m.key === active);
                  const Icon = activeItem?.icon || SettingsIcon;
                  return (
                    <>
                      <Icon className="w-5 h-5 text-primary" />
                      <SelectValue placeholder={t('settings.selectSetting', 'Select Setting')} />
                    </>
                  );
                })()}
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-[70vh] overflow-y-auto">
              {menu.map((item) => {
                const Icon = item.icon;
                return (
                  <SelectItem key={item.key} value={item.key} className="py-3">
                    <div className="flex items-center gap-3 w-full">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span className="flex-1">{t(item.titleKey)}</span>
                      {item.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          {/* Sidebar Navigation - Hidden on mobile */}
          <div className="hidden md:block w-full md:w-80 shrink-0">
            <Card className="border-0 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm shadow-lg">
              <CardContent className="p-2">
                <div className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 scrollbar-thin">
                  {menu.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = active === item.key;

                    return (
                      <button
                        key={i}
                        onClick={() => setActive(item.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
                          ${
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/20 shadow-sm dark:bg-gradient-to-r dark:from-primary/90 dark:to-primary/70 dark:text-white dark:border-0 dark:shadow-lg dark:shadow-primary/25"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                          }
                        `}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-primary dark:text-white" : "text-gray-500 dark:text-gray-400"}`} />
                        <span className="text-sm font-medium flex-1 text-right">{t(item.titleKey)}</span>
                        {item.badge && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                            ${isActive
                              ? "bg-primary/20 text-primary dark:bg-white/20 dark:text-white"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-primary rotate-90 dark:text-white" : "text-gray-400 dark:text-gray-500"}`} />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <Card className="border-0 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm shadow-lg">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                      {(() => {
                        const activeItem = menu.find(m => m.key === active);
                        const Icon = activeItem?.icon || SettingsIcon;
                        return <Icon className="w-6 h-6 text-primary dark:text-primary" />;
                      })()}
                      {t(menu.find(m => m.key === active)?.titleKey || active)}
                    </CardTitle>
                    <CardDescription className="mt-1 text-gray-600 dark:text-gray-400">
                      {(() => {
                        const activeItem = menu.find(item => item.key === active);
                        const descriptionKey = `settings.descriptions.${activeItem?.key}`;
                        return t(descriptionKey, '');
                      })()}
                    </CardDescription>
                  </div>
                  
                  {shouldShowSaveButton() && (
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className={`w-full sm:w-auto min-w-[128px] transition-all duration-300 ${
                        saveSuccess
                          ? "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                          : "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80"
                      } text-white shadow-md hover:shadow-lg transform hover:scale-105`}
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          {t('common.saving', 'Saving')}
                        </>
                      ) : saveSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          {t('common.saved', 'Saved')}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {t('settings.saveChanges', 'Save Changes')}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
