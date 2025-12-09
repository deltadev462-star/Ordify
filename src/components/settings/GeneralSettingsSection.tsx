import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Building, Calendar, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function GeneralSettingsSection() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    storeName: 'My Store',
    storeUrl: 'mystore.com',
    contactEmail: 'contact@mystore.com',
    contactPhone: '+1234567890',
    timezone: 'UTC',
    businessType: 'retail'
  });

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving general settings:', settings);
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{t("generalSettings.title")}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {t("generalSettings.description")}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {t("generalSettings.required")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-gray-500" />
              {t("generalSettings.storeName")}
            </Label>
            <Input 
              value={settings.storeName}
              onChange={(e) => handleInputChange('storeName', e.target.value)}
              placeholder={t("generalSettings.storeNamePlaceholder")}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-gray-500" />
              {t("generalSettings.storeUrl")}
            </Label>
            <Input
              value={settings.storeUrl}
              onChange={(e) => handleInputChange('storeUrl', e.target.value)}
              placeholder={t("generalSettings.storeUrlPlaceholder")}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-gray-500" />
              {t("generalSettings.contactEmail")}
            </Label>
            <Input 
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder={t("generalSettings.contactEmailPlaceholder")}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-gray-500" />
              {t("generalSettings.contactPhone")}
            </Label>
            <Input 
              type="tel"
              value={settings.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder={t("generalSettings.contactPhonePlaceholder")}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              {t("generalSettings.timezone")}
            </Label>
            <Select value={settings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
              <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <SelectValue placeholder={t("generalSettings.selectTimezone")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">EST</SelectItem>
                <SelectItem value="PST">PST</SelectItem>
                <SelectItem value="CET">CET</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-gray-500" />
              {t("generalSettings.businessType")}
            </Label>
            <Select value={settings.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
              <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <SelectValue placeholder={t("generalSettings.selectBusinessType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">{t("generalSettings.retail")}</SelectItem>
                <SelectItem value="wholesale">{t("generalSettings.wholesale")}</SelectItem>
                <SelectItem value="service">{t("generalSettings.service")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Label className="text-gray-700 dark:text-gray-300 font-medium">
            {t("generalSettings.language")}:
          </Label>
          <Select defaultValue="en">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("generalSettings.selectLanguage")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t("generalSettings.english")}</SelectItem>
              <SelectItem value="ar">{t("generalSettings.arabic")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {t("generalSettings.cancel")}
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {t("generalSettings.saveChanges")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default GeneralSettingsSection;