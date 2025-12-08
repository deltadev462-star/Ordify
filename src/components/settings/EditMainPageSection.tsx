import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Layout,
  ShoppingBag,
  Star,
  Sparkles,
  Settings,
  Eye,
  Save,
  ChevronUp,
  ChevronDown,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Megaphone,
  Gift,
  Percent
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

type SectionType = 'hero' | 'products' | 'testimonials' | 'features' | 'cta' | 'promo';

interface SectionSettings {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  overlay?: boolean;
  alignment?: 'left' | 'center' | 'right';
  productCount?: number;
  columns?: number;
  showPrice?: boolean;
  showAddToCart?: boolean;
  description?: string;
  code?: string;
  backgroundColor?: string;
  textColor?: string;
  autoplay?: boolean;
  speed?: number;
  showDots?: boolean;
}

interface Section {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  order: number;
  settings: SectionSettings;
}

function EditMainPageSection() {
  const { t } = useTranslation();
  const [previewMode, setPreviewMode] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'hero',
      type: 'hero',
      title: t('editMainPage.sections.heroBanner'),
      enabled: true,
      order: 1,
      settings: {
        title: t('editMainPage.defaults.welcomeTitle'),
        subtitle: t('editMainPage.defaults.welcomeSubtitle'),
        buttonText: t('editMainPage.defaults.shopNow'),
        buttonLink: '/products',
        backgroundImage: '',
        overlay: true,
        alignment: 'center'
      }
    },
    {
      id: 'featured',
      type: 'products',
      title: t('editMainPage.sections.featuredProducts'),
      enabled: true,
      order: 2,
      settings: {
        title: t('editMainPage.sections.featuredProducts'),
        productCount: 8,
        columns: 4,
        showPrice: true,
        showAddToCart: true
      }
    },
    {
      id: 'promo',
      type: 'promo',
      title: t('editMainPage.sections.promotionBanner'),
      enabled: false,
      order: 3,
      settings: {
        title: t('editMainPage.defaults.limitedOffer'),
        description: t('editMainPage.defaults.promoDescription'),
        code: 'SAVE20',
        backgroundColor: '#ff6b6b',
        textColor: '#ffffff'
      }
    },
    {
      id: 'testimonials',
      type: 'testimonials',
      title: t('editMainPage.sections.customerReviews'),
      enabled: true,
      order: 4,
      settings: {
        title: t('editMainPage.defaults.testimonialsTitle'),
        autoplay: true,
        speed: 5000,
        showDots: true
      }
    }
  ]);

  const sectionIcons: Record<string, React.ElementType> = {
    hero: Home,
    products: ShoppingBag,
    testimonials: Star,
    features: Sparkles,
    cta: Megaphone,
    promo: Percent
  };

  const handleSectionToggle = (sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId 
        ? { ...section, enabled: !section.enabled }
        : section
    ));
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    setSections(newSections);
  };

  const moveSectionDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    setSections(newSections);
  };

  const updateSectionSettings = (sectionId: string, settings: Partial<SectionSettings>) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId 
        ? { ...section, settings: { ...section.settings, ...settings } }
        : section
    ));
  };

  const addNewSection = (type: SectionType) => {
    const newSection: Section = {
      id: `${type}_${Date.now()}`,
      type: type,
      title: t(`editMainPage.sections.${type}`),
      enabled: true,
      order: sections.length + 1,
      settings: {}
    };
    setSections(prev => [...prev, newSection]);
  };

  return (
    <div className="space-y-6">
      <Alert variant="info">
        <AlertIcon variant="info" />
        <AlertTitle>{t("editMainPage.title")}</AlertTitle>
        <AlertDescription>
          {t("editMainPage.description")}
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Layout className="w-5 h-5 text-primary" />
          {t("editMainPage.pageSections")}
        </h3>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? t("editMainPage.editMode") : t("editMainPage.preview")}
          </Button>
          
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            <Save className="w-4 h-4 mr-2" />
            {t("editMainPage.saveChanges")}
          </Button>
        </div>
      </div>

      {previewMode ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="bg-gray-100 dark:bg-gray-900 min-h-[600px] p-4">
              <div className="max-w-6xl mx-auto space-y-6">
                {sections
                  .filter(s => s.enabled)
                  .map((section) => {
                    const Icon = sectionIcons[section.type];
                    return (
                      <div 
                        key={section.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                          <h3 className="text-xl font-semibold">
                            {section.settings.title || section.title}
                          </h3>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t('editMainPage.previewSection', { type: section.type })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="sections" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-1 sm:grid-cols-2 mb-6">
            <TabsTrigger value="sections">{t("editMainPage.tabs.sections")}</TabsTrigger>
            <TabsTrigger value="settings">{t("editMainPage.tabs.settings")}</TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="space-y-4">
            {sections.map((section, index) => {
              const Icon = sectionIcons[section.type];
              
              return (
                <Card 
                  key={section.id}
                  className={cn(
                    "border-0 shadow-lg transition-all",
                    !section.enabled && "opacity-60"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={cn(
                          "p-3 rounded-lg",
                          section.enabled 
                            ? "bg-primary/10 text-primary" 
                            : "bg-gray-100 dark:bg-gray-900 text-gray-500"
                        )}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                            {section.title}
                            {!section.enabled && (
                              <Badge variant="secondary">{t("editMainPage.disabled")}</Badge>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {t(`editMainPage.sectionDescriptions.${section.type}`)}
                          </p>

                          {section.type === 'hero' && section.enabled && (
                            <div className="mt-4 space-y-3">
                              <div>
                                <Label className="text-sm">{t("editMainPage.fields.title")}</Label>
                                <Input
                                  value={section.settings.title}
                                  onChange={(e) => updateSectionSettings(section.id, { title: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-sm">{t("editMainPage.fields.subtitle")}</Label>
                                <Textarea
                                  value={section.settings.subtitle}
                                  onChange={(e) => updateSectionSettings(section.id, { subtitle: e.target.value })}
                                  className="mt-1 resize-none"
                                  rows={2}
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-sm">{t("editMainPage.fields.buttonText")}</Label>
                                  <Input
                                    value={section.settings.buttonText}
                                    onChange={(e) => updateSectionSettings(section.id, { buttonText: e.target.value })}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">{t("editMainPage.fields.buttonLink")}</Label>
                                  <Input
                                    value={section.settings.buttonLink}
                                    onChange={(e) => updateSectionSettings(section.id, { buttonLink: e.target.value })}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm mb-2 block">{t("editMainPage.fields.textAlignment")}</Label>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant={section.settings.alignment === 'left' ? 'default' : 'outline'}
                                    onClick={() => updateSectionSettings(section.id, { alignment: 'left' })}
                                  >
                                    <AlignLeft className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={section.settings.alignment === 'center' ? 'default' : 'outline'}
                                    onClick={() => updateSectionSettings(section.id, { alignment: 'center' })}
                                  >
                                    <AlignCenter className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={section.settings.alignment === 'right' ? 'default' : 'outline'}
                                    onClick={() => updateSectionSettings(section.id, { alignment: 'right' })}
                                  >
                                    <AlignRight className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {section.type === 'products' && section.enabled && (
                            <div className="mt-4 space-y-3">
                              <div>
                                <Label className="text-sm">{t("editMainPage.fields.sectionTitle")}</Label>
                                <Input
                                  value={section.settings.title}
                                  onChange={(e) => updateSectionSettings(section.id, { title: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-sm">{t("editMainPage.fields.productsToShow")}</Label>
                                  <Select
                                    value={section.settings.productCount?.toString()}
                                    onValueChange={(value) => updateSectionSettings(section.id, { productCount: parseInt(value) })}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="4">4</SelectItem>
                                      <SelectItem value="8">8</SelectItem>
                                      <SelectItem value="12">12</SelectItem>
                                      <SelectItem value="16">16</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-sm">{t("editMainPage.fields.columns")}</Label>
                                  <Select
                                    value={section.settings.columns?.toString()}
                                    onValueChange={(value) => updateSectionSettings(section.id, { columns: parseInt(value) })}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="2">2</SelectItem>
                                      <SelectItem value="3">3</SelectItem>
                                      <SelectItem value="4">4</SelectItem>
                                      <SelectItem value="6">6</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-sm">{t("editMainPage.fields.showPrice")}</Label>
                                <Switch
                                  checked={section.settings.showPrice}
                                  onCheckedChange={(checked) => updateSectionSettings(section.id, { showPrice: checked })}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-sm">{t("editMainPage.fields.showAddToCart")}</Label>
                                <Switch
                                  checked={section.settings.showAddToCart}
                                  onCheckedChange={(checked) => updateSectionSettings(section.id, { showAddToCart: checked })}
                                />
                              </div>
                            </div>
                          )}

                          {section.type === 'promo' && section.enabled && (
                            <div className="mt-4 space-y-3">
                              <div>
                                <Label className="text-sm">{t("editMainPage.fields.promoTitle")}</Label>
                                <Input
                                  value={section.settings.title}
                                  onChange={(e) => updateSectionSettings(section.id, { title: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-sm">{t("editMainPage.fields.description")}</Label>
                                <Input
                                  value={section.settings.description}
                                  onChange={(e) => updateSectionSettings(section.id, { description: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-sm">{t("editMainPage.fields.promoCode")}</Label>
                                <Input
                                  value={section.settings.code}
                                  onChange={(e) => updateSectionSettings(section.id, { code: e.target.value })}
                                  className="mt-1 font-mono"
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-sm">{t("editMainPage.fields.backgroundColor")}</Label>
                                  <div className="flex gap-2 mt-1">
                                    <Input
                                      type="color"
                                      value={section.settings.backgroundColor}
                                      onChange={(e) => updateSectionSettings(section.id, { backgroundColor: e.target.value })}
                                      className="w-16 h-9 p-1 cursor-pointer"
                                    />
                                    <Input
                                      value={section.settings.backgroundColor}
                                      onChange={(e) => updateSectionSettings(section.id, { backgroundColor: e.target.value })}
                                      className="font-mono text-sm"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm">{t("editMainPage.fields.textColor")}</Label>
                                  <div className="flex gap-2 mt-1">
                                    <Input
                                      type="color"
                                      value={section.settings.textColor}
                                      onChange={(e) => updateSectionSettings(section.id, { textColor: e.target.value })}
                                      className="w-16 h-9 p-1 cursor-pointer"
                                    />
                                    <Input
                                      value={section.settings.textColor}
                                      onChange={(e) => updateSectionSettings(section.id, { textColor: e.target.value })}
                                      className="font-mono text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveSectionUp(index)}
                            disabled={index === 0}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveSectionDown(index)}
                            disabled={index === sections.length - 1}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <Switch
                          checked={section.enabled}
                          onCheckedChange={() => handleSectionToggle(section.id)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t("editMainPage.addNewSection")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addNewSection('features')}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t("editMainPage.sections.features")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addNewSection('cta')}
                  >
                    <Megaphone className="w-4 h-4 mr-2" />
                    {t("editMainPage.sections.cta")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addNewSection('promo')}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    {t("editMainPage.sections.promo")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  {t("editMainPage.pageSettings.title")}
                </CardTitle>
                <CardDescription>
                  {t("editMainPage.pageSettings.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t("editMainPage.pageSettings.pageTitle")}</Label>
                  <Input
                    placeholder={t("editMainPage.pageSettings.pageTitlePlaceholder")}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>{t("editMainPage.pageSettings.metaDescription")}</Label>
                  <Textarea
                    placeholder={t("editMainPage.pageSettings.metaDescriptionPlaceholder")}
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="font-medium">{t("editMainPage.pageSettings.enableAnimations")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("editMainPage.pageSettings.animationsDescription")}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("editMainPage.pageSettings.stickyNavigation")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("editMainPage.pageSettings.stickyNavigationDescription")}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  {t("editMainPage.themeOverride.title")}
                </CardTitle>
                <CardDescription>
                  {t("editMainPage.themeOverride.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    {t("editMainPage.themeOverride.warning")}
                  </AlertDescription>
                </Alert>

                <div>
                  <Label>{t("editMainPage.themeOverride.customCSS")}</Label>
                  <Textarea
                    placeholder={t("editMainPage.themeOverride.cssPlaceholder")}
                    className="mt-1 font-mono text-sm resize-none"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default EditMainPageSection;