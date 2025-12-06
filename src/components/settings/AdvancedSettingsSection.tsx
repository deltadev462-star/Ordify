import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Terminal, Webhook, Key, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AdvancedSettingsSection() {
  const { t } = useTranslation();
  const [advancedSettings, setAdvancedSettings] = useState({
    headerCode: '',
    footerCode: '',
    apiEnabled: false,
    apiKey: '',
    webhookUrl: '',
    debugMode: false,
    maintenanceMode: false,
    customCSS: '',
    customJS: ''
  });

  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegenerateApiKey = async () => {
    setIsRegenerating(true);
    // Simulate API key regeneration
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newKey = 'sk_live_' + Math.random().toString(36).substr(2, 32);
    handleInputChange('apiKey', newKey);
    setIsRegenerating(false);
  };

  const handleSave = () => {
    console.log('Saving advanced settings:', advancedSettings);
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('advancedSettings.title')}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {t('advancedSettings.description')}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {t('advancedSettings.badge.developer')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="code" className="space-y-6 overflow-x-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="code" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('advancedSettings.tabs.customCode')}
            </TabsTrigger>
            <TabsTrigger
              value="api"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('advancedSettings.tabs.apiSettings')}
            </TabsTrigger>
            <TabsTrigger
              value="developer"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('advancedSettings.tabs.developer')}
            </TabsTrigger>
            <TabsTrigger
              value="maintenance"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('advancedSettings.tabs.maintenance')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="space-y-6">
            <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                {t('advancedSettings.customCode.warning')}
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <Code2 className="h-4 w-4 text-gray-500" />
                  {t('advancedSettings.customCode.headerCode')}
                </Label>
                <Textarea
                  value={advancedSettings.headerCode}
                  onChange={(e) => handleInputChange('headerCode', e.target.value)}
                  placeholder={t('advancedSettings.customCode.headerPlaceholder')}
                  rows={6}
                  className="font-mono text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('advancedSettings.customCode.headerDescription')}
                </p>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <Code2 className="h-4 w-4 text-gray-500" />
                  {t('advancedSettings.customCode.footerCode')}
                </Label>
                <Textarea
                  value={advancedSettings.footerCode}
                  onChange={(e) => handleInputChange('footerCode', e.target.value)}
                  placeholder={t('advancedSettings.customCode.footerPlaceholder')}
                  rows={6}
                  className="font-mono text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('advancedSettings.customCode.footerDescription')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4 text-gray-500" />
                    {t('advancedSettings.customCode.customCSS')}
                  </Label>
                  <Textarea
                    value={advancedSettings.customCSS}
                    onChange={(e) => handleInputChange('customCSS', e.target.value)}
                    placeholder={t('advancedSettings.customCode.cssPlaceholder')}
                    rows={4}
                    className="font-mono text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4 text-gray-500" />
                    {t('advancedSettings.customCode.customJS')}
                  </Label>
                  <Textarea
                    value={advancedSettings.customJS}
                    onChange={(e) => handleInputChange('customJS', e.target.value)}
                    placeholder={t('advancedSettings.customCode.jsPlaceholder')}
                    rows={4}
                    className="font-mono text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('advancedSettings.api.publicAccess')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('advancedSettings.api.publicAccessDescription')}
                  </p>
                </div>
                <Switch
                  checked={advancedSettings.apiEnabled}
                  onCheckedChange={(checked) => handleInputChange('apiEnabled', checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              {advancedSettings.apiEnabled && (
                <>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                      <Key className="h-4 w-4 text-gray-500" />
                      {t('advancedSettings.api.apiKey')}
                    </Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Input
                          type={apiKeyVisible ? 'text' : 'password'}
                          value={advancedSettings.apiKey || 'sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx'}
                          readOnly
                          className="font-mono text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 pr-20"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setApiKeyVisible(!apiKeyVisible)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2"
                        >
                          {apiKeyVisible ? t('advancedSettings.buttons.hide') : t('advancedSettings.buttons.show')}
                        </Button>
                      </div>
                      <Button
                        onClick={handleRegenerateApiKey}
                        disabled={isRegenerating}
                        variant="outline"
                        className="border-gray-300 dark:border-gray-700 w-full sm:w-auto"
                      >
                        {isRegenerating ? t('advancedSettings.buttons.generating') : t('advancedSettings.buttons.regenerate')}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t('advancedSettings.api.apiKeyWarning')}
                    </p>
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                      <Webhook className="h-4 w-4 text-gray-500" />
                      {t('advancedSettings.api.webhookUrl')}
                    </Label>
                    <Input
                      value={advancedSettings.webhookUrl}
                      onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                      placeholder={t('advancedSettings.placeholders.webhookUrl')}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t('advancedSettings.api.webhookDescription')}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                      {t('advancedSettings.api.documentation')}
                    </h5>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                      {t('advancedSettings.api.documentationDescription')}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    >
                      {t('advancedSettings.api.viewDocs')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="developer" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('advancedSettings.developer.debugMode')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('advancedSettings.developer.debugModeDescription')}
                  </p>
                </div>
                <Switch
                  checked={advancedSettings.debugMode}
                  onCheckedChange={(checked) => handleInputChange('debugMode', checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {t('advancedSettings.developer.environment')}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('advancedSettings.developer.production')}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {t('advancedSettings.developer.version')}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    v2.4.1
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-3">
                <h5 className="font-medium text-gray-900 dark:text-gray-100">
                  {t('advancedSettings.developer.tools')}
                </h5>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Terminal className="h-4 w-4 mr-2" />
                    {t('advancedSettings.developer.clearCache')}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Terminal className="h-4 w-4 mr-2" />
                    {t('advancedSettings.developer.exportConfig')}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Terminal className="h-4 w-4 mr-2" />
                    {t('advancedSettings.developer.viewLogs')}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {t('advancedSettings.maintenance.warning')}
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('advancedSettings.maintenance.title')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('advancedSettings.maintenance.description')}
                  </p>
                </div>
                <Switch
                  checked={advancedSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              {advancedSettings.maintenanceMode && (
                <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <h5 className="font-medium text-red-800 dark:text-red-300">
                      {t('advancedSettings.maintenance.modeActive')}
                    </h5>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                    {t('advancedSettings.maintenance.offlineMessage')}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    {t('advancedSettings.maintenance.previewPage')}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {t('advancedSettings.buttons.cancel')}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white"
          >
            {t('advancedSettings.buttons.save')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdvancedSettingsSection;