import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Activity, Globe2, ShieldCheck, Zap, CheckCircle2, Copy, ExternalLink, Share2, Shield } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

function StoreLinkSection() {
  const { t } = useTranslation();
  const [storeDomain, setStoreDomain] = useState("myshoping.ordify.com");
  const [customDomain, setCustomDomain] = useState("");
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [storeUrlCopied, setStoreUrlCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setStoreUrlCopied(true);
    setTimeout(() => setStoreUrlCopied(false), 2000);
  };

  const handleSave = () => {
    localStorage.setItem("storeLink", JSON.stringify({ storeDomain, customDomain, useCustomDomain }));
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Store URL Preview Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent dark:from-primary/20 dark:via-accent/10 p-1">
        <div className="absolute top-5 right-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="relative bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-[14px] p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 shadow-lg shadow-primary/10">
              <Link className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('storeLink.title')}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('storeLink.description')}</p>
            </div>
          </div>
          
          {/* Current Store URL */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Input
                value={useCustomDomain && customDomain ? `https://${customDomain}` : `https://${storeDomain}`}
                readOnly
                className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 pr-24 text-sm font-mono"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(useCustomDomain && customDomain ? `https://${customDomain}` : `https://${storeDomain}`)}
                  className="h-8 px-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {storeUrlCopied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(useCustomDomain && customDomain ? `https://${customDomain}` : `https://${storeDomain}`, '_blank')}
                  className="h-8 px-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Store Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-center">
              <Activity className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('storeLink.status.active')}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 text-center">
              <Globe2 className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('storeLink.status.public')}</p>
            </div>
            <div className="p-3 rounded-lg bg-violet-500/10 text-center">
              <ShieldCheck className="w-5 h-5 text-violet-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('storeLink.status.sslSecured')}</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 text-center">
              <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('storeLink.status.fast')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Settings */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-primary" />
          {t('storeLink.domainSettings.title')}
        </h4>

        <div className="space-y-4">
          {/* Default Domain */}
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Link className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('storeLink.domainSettings.defaultDomain.label')}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t('storeLink.domainSettings.defaultDomain.description')}</p>
                </div>
              </div>
            </div>
            <Input
              value={storeDomain}
              onChange={(e) => setStoreDomain(e.target.value)}
              className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-primary/50 focus:border-primary transition-all"
              placeholder="yourstore.ordify.com"
            />
          </div>

          {/* Custom Domain Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 rounded-lg bg-violet-500/10 shrink-0">
                <Globe2 className="w-4 h-4 text-violet-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('storeLink.domainSettings.useCustomDomain.label')}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t('storeLink.domainSettings.useCustomDomain.description')}</p>
              </div>
            </div>
            <Switch
              checked={useCustomDomain}
              onCheckedChange={setUseCustomDomain}
              className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
            />
          </div>

          {/* Custom Domain Input */}
          {useCustomDomain && (
            <div className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all animate-in slide-in-from-top-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-3">
                <Globe2 className="w-4 h-4 text-primary" />
                {t('storeLink.domainSettings.customDomain.label')}
              </Label>
              <Input
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-primary/50 focus:border-primary transition-all"
                placeholder="www.yourstore.com"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {t('storeLink.domainSettings.customDomain.dnsNote')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50"
          >
            <Share2 className="w-4 h-4" />
            {t('storeLink.actions.shareStore')}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50"
          >
            <Activity className="w-4 h-4" />
            {t('storeLink.actions.viewAnalytics')}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50"
          >
            <Shield className="w-4 h-4" />
            {t('storeLink.actions.sslCertificate')}
          </Button>
        </div>
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          {t('storeLink.actions.saveChanges')}
        </Button>
      </div>
    </div>
  );
}

export default StoreLinkSection;