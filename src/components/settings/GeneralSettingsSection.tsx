import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Building, Calendar, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LangSwitcher from '@/components/LangSwitcher';

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
              <CardTitle className="text-xl">{t('General Settings')}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {t('Configure your store basic information')}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {t('Required')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-gray-500" />
              {t('Store Name')}
            </Label>
            <Input 
              value={settings.storeName}
              onChange={(e) => handleInputChange('storeName', e.target.value)}
              placeholder={t('Enter store name')}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-gray-500" />
              {t('Store URL')}
            </Label>
            <Input 
              value={settings.storeUrl}
              onChange={(e) => handleInputChange('storeUrl', e.target.value)}
              placeholder={t('mystore.com')}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-gray-500" />
              {t('Contact Email')}
            </Label>
            <Input 
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder={t('contact@example.com')}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-gray-500" />
              {t('Contact Phone')}
            </Label>
            <Input 
              type="tel"
              value={settings.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder={t('+1234567890')}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              {t('Timezone')}
            </Label>
            <Select value={settings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
              <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <SelectValue placeholder={t('Select timezone')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">{t('UTC')}</SelectItem>
                <SelectItem value="EST">{t('EST')}</SelectItem>
                <SelectItem value="PST">{t('PST')}</SelectItem>
                <SelectItem value="CET">{t('CET')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-gray-500" />
              {t('Business Type')}
            </Label>
            <Select value={settings.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
              <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <SelectValue placeholder={t('Select business type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">{t('Retail')}</SelectItem>
                <SelectItem value="wholesale">{t('Wholesale')}</SelectItem>
                <SelectItem value="service">{t('Service')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Label className="text-gray-700 dark:text-gray-300 font-medium">
            {t('Language')}:
          </Label>
          <LangSwitcher />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {t('Cancel')}
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {t('Save Changes')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default GeneralSettingsSection;