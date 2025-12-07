import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Globe, Image, FileText, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SEOSettingsSection() {
  const { t } = useTranslation();
  const [seoSettings, setSeoSettings] = useState({
    meta: {
      title: 'My Store - Best Products Online',
      description: 'Find the best products at amazing prices. Shop now for electronics, fashion, home goods and more.',
      keywords: 'online shop, best products, electronics, fashion',
      author: 'My Store'
    },
    openGraph: {
      enabled: true,
      title: 'My Store - Best Products Online',
      description: 'Find the best products at amazing prices.',
      image: '/og-image.jpg',
      type: 'website'
    },
    twitter: {
      enabled: true,
      card: 'summary_large_image',
      site: '@mystore',
      creator: '@mystore'
    },
    sitemap: {
      enabled: true,
      changeFreq: 'weekly',
      priority: '0.8'
    },
    robots: {
      index: true,
      follow: true,
      snippet: true,
      archive: true
    }
  });

  const handleMetaChange = (field: string, value: string) => {
    setSeoSettings(prev => ({
      ...prev,
      meta: {
        ...prev.meta,
        [field]: value
      }
    }));
  };

  const handleOpenGraphChange = (field: string, value: string | boolean) => {
    setSeoSettings(prev => ({
      ...prev,
      openGraph: {
        ...prev.openGraph,
        [field]: value
      }
    }));
  };

  const handleTwitterChange = (field: string, value: string | boolean) => {
    setSeoSettings(prev => ({
      ...prev,
      twitter: {
        ...prev.twitter,
        [field]: value
      }
    }));
  };

  const handleRobotsChange = (field: string, value: boolean) => {
    setSeoSettings(prev => ({
      ...prev,
      robots: {
        ...prev.robots,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving SEO settings:', seoSettings);
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Search className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('seo.title')}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {t('seo.description')}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {t('seo.important')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="meta" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="meta" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('seo.tabs.metaTags')}
            </TabsTrigger>
            <TabsTrigger 
              value="opengraph" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('seo.tabs.openGraph')}
            </TabsTrigger>
            <TabsTrigger 
              value="twitter" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('seo.tabs.twitterCard')}
            </TabsTrigger>
            <TabsTrigger 
              value="sitemap" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('seo.tabs.sitemap')}
            </TabsTrigger>
            <TabsTrigger 
              value="robots" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('seo.tabs.robots')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meta" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  {t('seo.meta.pageTitle')}
                </Label>
                <Input
                  value={seoSettings.meta.title}
                  onChange={(e) => handleMetaChange('title', e.target.value)}
                  placeholder={t('seo.meta.pageTitlePlaceholder')}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('seo.meta.titleRecommendation', { count: seoSettings.meta.title.length })}
                </p>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  {t('seo.meta.metaDescription')}
                </Label>
                <Textarea
                  value={seoSettings.meta.description}
                  onChange={(e) => handleMetaChange('description', e.target.value)}
                  placeholder={t('seo.meta.metaDescriptionPlaceholder')}
                  rows={3}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('seo.meta.descriptionRecommendation', { count: seoSettings.meta.description.length })}
                </p>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  {t('seo.meta.keywords')}
                </Label>
                <Input
                  value={seoSettings.meta.keywords}
                  onChange={(e) => handleMetaChange('keywords', e.target.value)}
                  placeholder={t('seo.meta.keywordsPlaceholder')}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  {t('seo.meta.author')}
                </Label>
                <Input
                  value={seoSettings.meta.author}
                  onChange={(e) => handleMetaChange('author', e.target.value)}
                  placeholder={t('seo.meta.authorPlaceholder')}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="opengraph" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('seo.openGraph.enable')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('seo.openGraph.enableDescription')}
                  </p>
                </div>
                <Switch
                  checked={seoSettings.openGraph.enabled}
                  onCheckedChange={(checked) => handleOpenGraphChange('enabled', checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              {seoSettings.openGraph.enabled && (
                <>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                      <Share2 className="h-4 w-4 text-gray-500" />
                      {t('seo.openGraph.ogTitle')}
                    </Label>
                    <Input
                      value={seoSettings.openGraph.title}
                      onChange={(e) => handleOpenGraphChange('title', e.target.value)}
                      placeholder={t('seo.openGraph.ogTitlePlaceholder')}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      {t('seo.openGraph.ogDescription')}
                    </Label>
                    <Textarea
                      value={seoSettings.openGraph.description}
                      onChange={(e) => handleOpenGraphChange('description', e.target.value)}
                      placeholder={t('seo.openGraph.ogDescriptionPlaceholder')}
                      rows={2}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                      <Image className="h-4 w-4 text-gray-500" />
                      {t('seo.openGraph.ogImageUrl')}
                    </Label>
                    <Input
                      value={seoSettings.openGraph.image}
                      onChange={(e) => handleOpenGraphChange('image', e.target.value)}
                      placeholder={t('seo.openGraph.ogImageUrlPlaceholder')}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t('seo.openGraph.imageRecommendation')}
                    </p>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="twitter" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('seo.twitter.enableCards')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('seo.twitter.enableDescription')}
                  </p>
                </div>
                <Switch
                  checked={seoSettings.twitter.enabled}
                  onCheckedChange={(checked) => handleTwitterChange('enabled', checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              {seoSettings.twitter.enabled && (
                <>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                      <Share2 className="h-4 w-4 text-gray-500" />
                      {t('seo.twitter.twitterSite')}
                    </Label>
                    <Input
                      value={seoSettings.twitter.site}
                      onChange={(e) => handleTwitterChange('site', e.target.value)}
                      placeholder={t('seo.twitter.usernamePlaceholder')}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                      <Share2 className="h-4 w-4 text-gray-500" />
                      {t('seo.twitter.twitterCreator')}
                    </Label>
                    <Input
                      value={seoSettings.twitter.creator}
                      onChange={(e) => handleTwitterChange('creator', e.target.value)}
                      placeholder={t('seo.twitter.creatorPlaceholder')}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sitemap" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('seo.sitemap.generate')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('seo.sitemap.generateDescription')}
                  </p>
                </div>
                <Switch
                  checked={seoSettings.sitemap.enabled}
                  onCheckedChange={(checked) => setSeoSettings(prev => ({
                    ...prev,
                    sitemap: { ...prev.sitemap, enabled: checked }
                  }))}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {t('seo.sitemap.availableAt')}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="robots" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('seo.robots.allowIndexing')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('seo.robots.allowIndexingDescription')}
                  </p>
                </div>
                <Switch
                  checked={seoSettings.robots.index}
                  onCheckedChange={(checked) => handleRobotsChange('index', checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('seo.robots.followLinks')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('seo.robots.followLinksDescription')}
                  </p>
                </div>
                <Switch
                  checked={seoSettings.robots.follow}
                  onCheckedChange={(checked) => handleRobotsChange('follow', checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {t('seo.robots.showSnippets')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('seo.robots.showSnippetsDescription')}
                  </p>
                </div>
                <Switch
                  checked={seoSettings.robots.snippet}
                  onCheckedChange={(checked) => handleRobotsChange('snippet', checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {t('seo.actions.cancel')}
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            {t('seo.actions.saveSettings')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SEOSettingsSection;