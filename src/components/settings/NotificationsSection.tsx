import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Mail, MessageSquare, ShoppingCart, Package, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function NotificationsSection() {
  const { t } = useTranslation();

  type Channel = 'email' | 'push' | 'sms';
  type NotificationType = 'orders' | 'marketing' | 'security' | 'updates';
  type Frequency = 'immediate' | 'hourly' | 'daily' | 'weekly';

  interface ChannelPrefs {
    orders: boolean;
    marketing: boolean;
    security: boolean;
    updates: boolean;
  }

  interface NotificationsState {
    email: ChannelPrefs;
    push: ChannelPrefs;
    sms: ChannelPrefs;
    frequency: Frequency;
  }

  const [notifications, setNotifications] = useState<NotificationsState>({
    email: {
      orders: true,
      marketing: false,
      security: true,
      updates: true
    },
    push: {
      orders: true,
      marketing: false,
      security: true,
      updates: false
    },
    sms: {
      orders: true,
      marketing: false,
      security: true,
      updates: false
    },
    frequency: 'immediate'
  });

  const handleNotificationToggle = (channel: Channel, type: NotificationType) => {
    setNotifications(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
  };

  const handleFrequencyChange = (value: string) => {
    setNotifications(prev => ({ ...prev, frequency: value as Frequency }));
  };

  const handleSave = () => {
    console.log('Saving notification settings:', notifications);
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('notifications.title')}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {t('notifications.description')}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {t('notifications.customizable')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="channels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="channels" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('notifications.tabs.channels')}
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('notifications.tabs.preferences')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="space-y-6">
            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {t('notifications.channels.email')}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('Order Updates')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.email.orders}
                      onCheckedChange={() => handleNotificationToggle('email', 'orders')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('notifications.types.marketingPromotions')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.email.marketing}
                      onCheckedChange={() => handleNotificationToggle('email', 'marketing')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('notifications.types.securityAlerts')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.email.security}
                      onCheckedChange={() => handleNotificationToggle('email', 'security')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('notifications.types.productUpdates')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.email.updates}
                      onCheckedChange={() => handleNotificationToggle('email', 'updates')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Push Notifications */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {t('notifications.channels.push')}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('notifications.types.orderUpdates')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.push.orders}
                      onCheckedChange={() => handleNotificationToggle('push', 'orders')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('Marketing & Promotions')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.push.marketing}
                      onCheckedChange={() => handleNotificationToggle('push', 'marketing')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('Security Alerts')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.push.security}
                      onCheckedChange={() => handleNotificationToggle('push', 'security')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('Product Updates')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.push.updates}
                      onCheckedChange={() => handleNotificationToggle('push', 'updates')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* SMS Notifications */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {t('notifications.channels.sms')}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('Order Updates')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.sms.orders}
                      onCheckedChange={() => handleNotificationToggle('sms', 'orders')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-gray-500" />
                      <Label className="text-gray-700 dark:text-gray-300 font-normal">
                        {t('Security Alerts')}
                      </Label>
                    </div>
                    <Switch
                      checked={notifications.sms.security}
                      onCheckedChange={() => handleNotificationToggle('sms', 'security')}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="space-y-6">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-4 block">
                  {t('notifications.frequency.label')}
                </Label>
                <Select value={notifications.frequency} onValueChange={handleFrequencyChange}>
                  <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <SelectValue placeholder={t('notifications.frequency.selectPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">{t('notifications.frequency.immediate')}</SelectItem>
                    <SelectItem value="hourly">{t('notifications.frequency.hourly')}</SelectItem>
                    <SelectItem value="daily">{t('notifications.frequency.daily')}</SelectItem>
                    <SelectItem value="weekly">{t('notifications.frequency.weekly')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <h4 className="font-medium text-amber-900 dark:text-amber-100">
                      {t('notifications.doNotDisturb.title')}
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      {t('notifications.doNotDisturb.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {t('notifications.actions.cancel')}
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
          >
            {t('notifications.actions.savePreferences')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default NotificationsSection;