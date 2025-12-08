import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Twitter, MessageCircle, Share2, Plus, ExternalLink, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface SocialLink {
  id: string;
  platform: string;
  icon: LucideIcon;
  url: string;
  color: string;
  enabled: boolean;
}

function SocialLinksSection() {
  const { t } = useTranslation();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: "1",
      platform: "Facebook",
      icon: Facebook,
      url: "",
      color: "#1877F2",
      enabled: false,
    },
    {
      id: "2",
      platform: "Instagram",
      icon: Instagram,
      url: "",
      color: "#E4405F",
      enabled: false,
    },
    {
      id: "3",
      platform: "Twitter",
      icon: Twitter,
      url: "",
      color: "#1DA1F2",
      enabled: false,
    },
    {
      id: "4",
      platform: "WhatsApp",
      icon: MessageCircle,
      url: "",
      color: "#25D366",
      enabled: false,
    }
  ]);

  const handleSocialLinkChange = (id: string, field: 'url' | 'enabled', value: string | boolean) => {
    setSocialLinks(socialLinks.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleSave = () => {
    localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Social Links Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent dark:from-primary/20 dark:via-violet-500/10 p-1">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="relative bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-[14px] p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 shadow-lg">
                <Instagram className="w-8 h-8 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('socialLinks.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('socialLinks.description')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                {socialLinks.filter(l => l.enabled).length} {t('socialLinks.active')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links List */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-primary" />
          {t('socialLinks.linksTitle')}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  link.enabled
                    ? "bg-white dark:bg-gray-900/50 border-primary/50 dark:border-primary/40 shadow-sm"
                    : "bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-700"
                } hover:border-primary/60 dark:hover:border-primary/50`}
              >
                <div className="space-y-3">
                  {/* Platform Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-lg"
                        style={{ backgroundColor: `${link.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: link.color }} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-gray-100">
                          {link.platform}
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {link.enabled ? t('socialLinks.status.connected') : t('socialLinks.status.notConnected')}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={link.enabled}
                      onCheckedChange={(checked) => handleSocialLinkChange(link.id, 'enabled', checked)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                    />
                  </div>

                  {/* URL Input */}
                  {link.enabled && (
                    <div className="animate-in slide-in-from-top-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                        {t('socialLinks.urlLabel', { platform: link.platform })}
                      </Label>
                      <div className="relative">
                        <Input
                          value={link.url}
                          onChange={(e) => handleSocialLinkChange(link.id, 'url', e.target.value)}
                          className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-primary/50 focus:border-primary transition-all pr-10"
                          placeholder={`https://${link.platform.toLowerCase()}.com/yourprofile`}
                        />
                        {link.url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(link.url, '_blank')}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Custom Link */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <Button
          variant="outline"
          className="w-full border-dashed border-gray-300 dark:border-gray-600 hover:border-primary/50 dark:hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('socialLinks.addCustomLink')}
        </Button>
      </div>

      {/* Social Links Tips */}
      <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-sm font-medium text-blue-800 dark:text-blue-300">{t('socialLinks.tips.title')}</h5>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <li>• {t('socialLinks.tips.useOfficial')}</li>
              <li>• {t('socialLinks.tips.keepActive')}</li>
              <li>• {t('socialLinks.tips.appearsInFooter')}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
        >
          {t('socialLinks.saveButton')}
        </Button>
      </div>
    </div>
  );
}

export default SocialLinksSection;