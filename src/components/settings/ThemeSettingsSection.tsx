import { useState } from 'react';
import { 
  Palette, 
  Layout, 
  Type,
  Sun,
  Moon,
  Monitor,
  Brush,
  Eye,
  Save,
  RotateCcw,
  Download,
  Upload,
  Code2,
  Smartphone,
  Laptop,
  Check,
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
import { Slider } from "@/components/ui/slider";

interface ThemePreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  type: 'light' | 'dark';
}

function ThemeSettingsSection() {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(true);
  const [customCSS, setCustomCSS] = useState('');
  
  const [themeSettings, setThemeSettings] = useState({
    preset: 'modern',
    colorScheme: 'system' as 'light' | 'dark' | 'system',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#10b981',
    backgroundColor: '#ffffff',
    foregroundColor: '#000000',
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Inter',
    headerStyle: 'fixed',
    sidebarStyle: 'collapsible',
    animationsEnabled: true,
    customLogo: '',
    favicon: ''
  });

  const themePresets: ThemePreset[] = [
    {
      id: 'modern',
      name: "Modern",
      primary: '#6366f1',
      secondary: '#8b5cf6',
      background: '#ffffff',
      foreground: '#000000',
      accent: '#10b981',
      muted: '#f3f4f6',
      type: 'light'
    },
    {
      id: 'classic',
      name: "Classic",
      primary: '#3b82f6',
      secondary: '#1e40af',
      background: '#ffffff',
      foreground: '#1f2937',
      accent: '#0ea5e9',
      muted: '#e5e7eb',
      type: 'light'
    },
    {
      id: 'dark',
      name: "Dark Mode",
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      background: '#0f172a',
      foreground: '#f8fafc',
      accent: '#a78bfa',
      muted: '#1e293b',
      type: 'dark'
    },
    {
      id: 'minimal',
      name: "Minimal",
      primary: '#000000',
      secondary: '#374151',
      background: '#ffffff',
      foreground: '#000000',
      accent: '#6b7280',
      muted: '#f9fafb',
      type: 'light'
    },
    {
      id: 'nature',
      name: "Nature",
      primary: '#059669',
      secondary: '#047857',
      background: '#ecfdf5',
      foreground: '#064e3b',
      accent: '#34d399',
      muted: '#d1fae5',
      type: 'light'
    }
  ];

  const fontFamilies = [
    { value: 'Inter', name: "Inter" },
    { value: 'Arial', name: "Arial" },
    { value: 'Georgia', name: "Georgia" },
    { value: 'Roboto', name: "Roboto" },
    { value: 'Poppins', name: "Poppins" },
    { value: 'Montserrat', name: "Montserrat" }
  ];

  const handlePresetChange = (presetId: string) => {
    const preset = themePresets.find(p => p.id === presetId);
    if (preset) {
      setThemeSettings(prev => ({
        ...prev,
        preset: presetId,
        primaryColor: preset.primary,
        secondaryColor: preset.secondary,
        backgroundColor: preset.background,
        foregroundColor: preset.foreground,
        accentColor: preset.accent
      }));
    }
  };

  const resetToDefaults = () => {
    handlePresetChange('modern');
    setThemeSettings(prev => ({
      ...prev,
      borderRadius: 8,
      fontSize: 16,
      fontFamily: 'Inter',
      headerStyle: 'fixed',
      sidebarStyle: 'collapsible',
      animationsEnabled: true
    }));
  };

  const exportTheme = () => {
    const themeData = JSON.stringify(themeSettings, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = 'theme-settings.json';
    a.click();
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

      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={activeDevice === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveDevice('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={activeDevice === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveDevice('tablet')}
          >
            <Laptop className="w-4 h-4" />
          </Button>
          <Button
            variant={activeDevice === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveDevice('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={showPreview}
            onCheckedChange={setShowPreview}
          />
          <Label className="text-sm">{"Live Preview"}</Label>
        </div>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full max-w-lg grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            {"Colors"}
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            {"Typography"}
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            {"Layout"}
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            {"Advanced"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          {/* Theme Presets */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Brush className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{"Presets Title"}</CardTitle>
                  <CardDescription className="text-white/80">
                    {"Presets Description"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {themePresets.map((preset) => {
                  const isSelected = themeSettings.preset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetChange(preset.id)}
                      className={cn(
                        "relative p-4 rounded-lg border-2 transition-all text-left overflow-hidden group",
                        isSelected
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      )}
                    >
                      <div className="absolute top-0 right-0 left-0 h-20 -z-10">
                        <div className="flex h-full">
                          <div 
                            className="flex-1"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div 
                            className="flex-1"
                            style={{ backgroundColor: preset.secondary }}
                          />
                          <div 
                            className="flex-1"
                            style={{ backgroundColor: preset.accent }}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-16">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                          {preset.name}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {preset.type === 'dark' ? (
                            <Moon className="w-4 h-4 text-gray-500" />
                          ) : (
                            <Sun className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-xs text-gray-500">
                            {preset.type === 'dark' ? 'themeSettings.colors.dark' : 'themeSettings.colors.light'}
                          </span>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2 p-1 bg-primary text-white rounded-full">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Color Customization */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                {"Customization Title"}
              </CardTitle>
              <CardDescription>
                {"Customization Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">{"Primary"}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="font-mono"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2">{"Secondary"}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="font-mono"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2">{"Accent"}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={themeSettings.accentColor}
                      onChange={(e) => setThemeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={themeSettings.accentColor}
                      onChange={(e) => setThemeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="font-mono"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2">{"Background"}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={themeSettings.backgroundColor}
                      onChange={(e) => setThemeSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={themeSettings.backgroundColor}
                      onChange={(e) => setThemeSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label className="mb-2 flex items-center gap-2">
                  {"Scheme"}
                </Label>
                <Select 
                  value={themeSettings.colorScheme}
                  onValueChange={(value: 'light' | 'dark' | 'system') => 
                    setThemeSettings(prev => ({ ...prev, colorScheme: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <span className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        {"Light Mode"}
                      </span>
                    </SelectItem>
                    <SelectItem value="dark">
                      <span className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        {"Dark Mode"}
                      </span>
                    </SelectItem>
                    <SelectItem value="system">
                      <span className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        {"System Default"}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2">{"Font Family"}</Label>
                <Select 
                  value={themeSettings.fontFamily}
                  onValueChange={(value) => setThemeSettings(prev => ({ ...prev, fontFamily: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilies.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>
                          {font.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2">{"Font Size"}</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{themeSettings.fontSize}px</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setThemeSettings(prev => ({ ...prev, fontSize: 14 }))}
                      >
                        {"Small"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setThemeSettings(prev => ({ ...prev, fontSize: 16 }))}
                      >
                        {"Medium"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setThemeSettings(prev => ({ ...prev, fontSize: 18 }))}
                      >
                        {"Large"}
                      </Button>
                    </div>
                  </div>
                  <Slider
                    value={[themeSettings.fontSize]}
                    onValueChange={(value) => setThemeSettings(prev => ({ ...prev, fontSize: value[0] }))}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">{"Preview"}</h4>
                <div 
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2"
                  style={{ fontFamily: themeSettings.fontFamily, fontSize: `${themeSettings.fontSize}px` }}
                >
                  <h1 className="text-3xl font-bold" style={{ color: themeSettings.primaryColor }}>
                    {"Heading Example"}
                  </h1>
                  <h2 className="text-xl font-semibold" style={{ color: themeSettings.secondaryColor }}>
                    {"Subheading Example"}
                  </h2>
                  <p>
                    {"Body Example"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Small Example"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary" />
                {"Title"}
              </CardTitle>
              <CardDescription>
                {"Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2">{"Border Radius"}</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{themeSettings.borderRadius}px</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setThemeSettings(prev => ({ ...prev, borderRadius: 0 }))}
                      >
                        {"Square"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setThemeSettings(prev => ({ ...prev, borderRadius: 8 }))}
                      >
                        {"Rounded"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setThemeSettings(prev => ({ ...prev, borderRadius: 16 }))}
                      >
                        {"Pill"}
                      </Button>
                    </div>
                  </div>
                  <Slider
                    value={[themeSettings.borderRadius]}
                    onValueChange={(value) => setThemeSettings(prev => ({ ...prev, borderRadius: value[0] }))}
                    min={0}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2">{"Header Style"}</Label>
                <Select 
                  value={themeSettings.headerStyle}
                  onValueChange={(value) => setThemeSettings(prev => ({ ...prev, headerStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">{"Fixed Header"}</SelectItem>
                    <SelectItem value="sticky">{"Sticky Header"}</SelectItem>
                    <SelectItem value="static">{"Static Header"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2">{"Sidebar Style"}</Label>
                <Select 
                  value={themeSettings.sidebarStyle}
                  onValueChange={(value) => setThemeSettings(prev => ({ ...prev, sidebarStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">{"Fixed Sidebar"}</SelectItem>
                    <SelectItem value="collapsible">{"Collapsible Sidebar"}</SelectItem>
                    <SelectItem value="hidden">{"Hidden Sidebar"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium">{"Enable Animations"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Animations Description"}
                  </p>
                </div>
                <Switch
                  checked={themeSettings.animationsEnabled}
                  onCheckedChange={(checked) => setThemeSettings(prev => ({ ...prev, animationsEnabled: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview Example */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">{"Preview"}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                style={{ borderRadius: `${themeSettings.borderRadius}px` }}
              >
                <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900">
                  <div className="space-y-3">
                    <div 
                      className="h-10 rounded"
                      style={{ 
                        backgroundColor: themeSettings.primaryColor,
                        borderRadius: `${themeSettings.borderRadius / 2}px`
                      }}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {[1, 2, 3].map(i => (
                        <div 
                          key={i}
                          className="h-20 bg-gray-200 dark:bg-gray-800 rounded"
                          style={{ borderRadius: `${themeSettings.borderRadius / 2}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                {"Custom C S S"}
              </CardTitle>
              <CardDescription>
                {"Custom C S S Description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2">{"Custom C S S Code"}</Label>
                <textarea
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  placeholder={"Css Placeholder"}
                  className="w-full h-48 px-3 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription>
                  {"Css Warning"}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                {"Theme Actions"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={resetToDefaults}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  {"Reset Defaults"}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={exportTheme}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  {"Export Theme"}
                </Button>
                
                <Button
                  variant="outline"
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {"Import Theme"}
                </Button>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Badge variant="secondary">{"Version"} 2.0</Badge>
                  <span>{"Last Saved"}: {new Date().toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="ghost" className="gap-2">
          <Eye className="w-4 h-4" />
          {"Preview"}
        </Button>
        
        <div className="flex gap-3">
          <Button variant="outline">
            {"Cancel"}
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
            <Save className="w-4 h-4" />
            {"Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ThemeSettingsSection;
