import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plug, Package, Mail, MessageSquare, BarChart3, Link, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { LucideIcon } from 'lucide-react';

function IntegrationsSection() {
  const { t } = useTranslation();

  type Category = 'Analytics' | 'Email Marketing' | 'Advertising' | 'Communication' | 'Operations';
  type Status = 'connected' | 'disconnected';

  interface Integration {
    id: number;
    name: string;
    category: Category;
    icon: LucideIcon;
    status: Status;
    description: string;
    lastSync: string | null;
    config: Record<string, string>;
  }

  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 1,
      name: 'Google Analytics',
      category: 'Analytics',
      icon: BarChart3,
      status: 'connected',
      description: t('integrations.googleAnalytics.description'),
      lastSync: t('integrations.lastSync.twoHours'),
      config: { trackingId: 'UA-123456789-1' }
    },
    {
      id: 2,
      name: 'Mailchimp',
      category: 'Email Marketing',
      icon: Mail,
      status: 'connected',
      description: t('integrations.mailchimp.description'),
      lastSync: t('integrations.lastSync.thirtyMinutes'),
      config: { apiKey: '****-us14' }
    },
    {
      id: 3,
      name: 'Facebook Pixel',
      category: 'Advertising',
      icon: BarChart3,
      status: 'disconnected',
      description: t('integrations.facebookPixel.description'),
      lastSync: null,
      config: {}
    },
    {
      id: 4,
      name: 'WhatsApp Business',
      category: 'Communication',
      icon: MessageSquare,
      status: 'disconnected',
      description: t('integrations.whatsapp.description'),
      lastSync: null,
      config: {}
    },
    {
      id: 5,
      name: 'Inventory Management',
      category: 'Operations',
      icon: Package,
      status: 'connected',
      description: t('integrations.inventory.description'),
      lastSync: t('integrations.lastSync.oneHour'),
      config: { webhookUrl: 'https://api.inventory.com/webhook' }
    }
  ]);

  const [configData, setConfigData] = useState({
    apiKey: '',
    secretKey: '',
    webhookUrl: '',
    trackingId: ''
  });

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConfigData({
      apiKey: '',
      secretKey: '',
      webhookUrl: '',
      trackingId: ''
    });
    setShowConfigDialog(true);
  };

  const handleDisconnect = (integrationId: number) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === integrationId
          ? { ...integration, status: 'disconnected', lastSync: null, config: {} as Record<string, string> }
          : integration
      )
    );
  };

  const handleSaveConfig = () => {
    if (!selectedIntegration) return;

    setIntegrations(integrations.map(integration =>
      integration.id === selectedIntegration.id
        ? { 
            ...integration, 
            status: 'connected', 
            lastSync: 'Just now',
            config: { ...configData }
          }
        : integration
    ));

    setShowConfigDialog(false);
    setSelectedIntegration(null);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'connected') {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0">
          <CheckCircle className="h-3 w-3 mr-1" />
          {t('integrations.status.connected')}
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-0">
        <XCircle className="h-3 w-3 mr-1" />
        {t('integrations.status.disconnected')}
      </Badge>
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Analytics': 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400',
      'Email Marketing': 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
      'Advertising': 'text-pink-600 bg-pink-100 dark:bg-pink-900/20 dark:text-pink-400',
      'Communication': 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
      'Operations': 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Plug className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('integrations.title')}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {t('integrations.description')}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {t('integrations.optional')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Alert className="border-violet-200 bg-violet-50 dark:bg-violet-900/20 dark:border-violet-800">
          <Plug className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          <AlertDescription className="text-violet-800 dark:text-violet-200">
            {t('integrations.alert')}
          </AlertDescription>
        </Alert>

        {/* Integrations List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {t('integrations.availableIntegrations')}
          </h3>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">{t('integrations.table.service')}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{t('integrations.table.category')}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{t('integrations.table.status')}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{t('integrations.table.lastSync')}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 text-right">{t('integrations.table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {integrations.map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <TableRow key={integration.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {integration.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {integration.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-0 ${getCategoryColor(integration.category)}`}>
                          {t(`integrations.categories.${integration.category.toLowerCase().replace(' ', '')}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(integration.status)}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">
                        {integration.lastSync || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {integration.status === 'connected' ? (
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleConnect(integration)}
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                              {t('integrations.actions.configure')}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDisconnect(integration.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              {t('integrations.actions.disconnect')}
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleConnect(integration)}
                            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                          >
                            <Link className="h-4 w-4 mr-1" />
                            {t('integrations.actions.connect')}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Integration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('integrations.stats.active')}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {integrations.filter(i => i.status === 'connected' && i.category === 'Analytics').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('integrations.stats.analytics')}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {integrations.length - integrations.filter(i => i.status === 'connected').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('integrations.stats.available')}
            </div>
          </div>
        </div>

        {/* Configuration Dialog */}
        <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
          <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">
                {t('integrations.dialog.title', { name: selectedIntegration?.name })}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                {t('integrations.dialog.description')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedIntegration?.name === 'Google Analytics' && (
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">
                    {t('integrations.fields.trackingId')}
                  </Label>
                  <Input
                    value={configData.trackingId}
                    onChange={(e) => setConfigData({...configData, trackingId: e.target.value})}
                    placeholder="UA-XXXXXXXXX-X"
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
              )}
              {(selectedIntegration?.name === 'Mailchimp' || selectedIntegration?.name === 'Facebook Pixel') && (
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">
                    {t('integrations.fields.apiKey')}
                  </Label>
                  <Input
                    value={configData.apiKey}
                    onChange={(e) => setConfigData({...configData, apiKey: e.target.value})}
                    placeholder={t('integrations.fields.apiKeyPlaceholder')}
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
              )}
              {selectedIntegration?.name === 'WhatsApp Business' && (
                <>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      {t('integrations.fields.phoneNumber')}
                    </Label>
                    <Input
                      value={configData.apiKey}
                      onChange={(e) => setConfigData({...configData, apiKey: e.target.value})}
                      placeholder="+1234567890"
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      {t('integrations.fields.apiToken')}
                    </Label>
                    <Input
                      type="password"
                      value={configData.secretKey}
                      onChange={(e) => setConfigData({...configData, secretKey: e.target.value})}
                      placeholder={t('integrations.fields.apiTokenPlaceholder')}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </>
              )}
              {selectedIntegration?.name === 'Inventory Management' && (
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">
                    {t('integrations.fields.webhookUrl')}
                  </Label>
                  <Input
                    value={configData.webhookUrl}
                    onChange={(e) => setConfigData({...configData, webhookUrl: e.target.value})}
                    placeholder="https://api.example.com/webhook"
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
              )}
              <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                <AlertDescription className="text-blue-800 dark:text-blue-200 text-sm">
                  {t('integrations.dialog.securityNote')}
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowConfigDialog(false)}
                className="border-gray-300 dark:border-gray-700"
              >
                {t('integrations.actions.cancel')}
              </Button>
              <Button 
                onClick={handleSaveConfig}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
              >
                {t('integrations.actions.saveConfiguration')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default IntegrationsSection;