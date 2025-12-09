import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  FileCode2,
  Copy,
  CheckCircle,
  Search,
  AlertCircle,
  ExternalLink,
  Clock,
  BarChart3,
  Zap,
  ArrowRight,
  RefreshCw,
  Info,
  Shield,
  FileText
} from 'lucide-react';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const SitemapAgentPage: React.FC = () => {
  const { t } = useTranslation();
  const [merchantDomain, setMerchantDomain] = useState('yourstore');
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showXml, setShowXml] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'generate' | 'seo'>('overview');

  const sitemapUrl = useCustomDomain && customDomain 
    ? `https://${customDomain}/sitemap.xml`
    : `https://${merchantDomain}.myordify.com/sitemap.xml`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sitemapUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateSitemapXml = () => {
    const baseUrl = useCustomDomain && customDomain 
      ? `https://${customDomain}`
      : `https://${merchantDomain}.myordify.com`;

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Categories -->
  <url>
    <loc>${baseUrl}/category/electronics</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/clothing</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Products -->
  <url>
    <loc>${baseUrl}/product/smartphone-pro-max</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/product/leather-jacket-premium</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
  };

  const sitemapStats = {
    totalUrls: 145,
    products: 98,
    categories: 12,
    pages: 35,
    lastGenerated: new Date().toLocaleString(),
    indexedPages: 142,
    crawlErrors: 3
  };

  const seoTips = [
    {
      icon: <Search className="text-blue-500" size={20} />,
      title: t('sitemapAgent.seo.submitToGoogle.title'),
      description: t('sitemapAgent.seo.submitToGoogle.description'),
      action: t('sitemapAgent.seo.submitToGoogle.action'),
      link: 'https://search.google.com/search-console'
    },
    {
      icon: <Clock className="text-green-500" size={20} />,
      title: t('sitemapAgent.seo.updateFrequency.title'),
      description: t('sitemapAgent.seo.updateFrequency.description'),
      action: t('sitemapAgent.seo.updateFrequency.action'),
      status: 'optimal'
    },
    {
      icon: <Shield className="text-purple-500" size={20} />,
      title: t('sitemapAgent.seo.robotsConfig.title'),
      description: t('sitemapAgent.seo.robotsConfig.description'),
      action: t('sitemapAgent.seo.robotsConfig.action'),
      status: 'good'
    },
    {
      icon: <Zap className="text-yellow-500" size={20} />,
      title: t('sitemapAgent.seo.crawlBudget.title'),
      description: t('sitemapAgent.seo.crawlBudget.description'),
      action: t('sitemapAgent.seo.crawlBudget.action'),
      status: 'warning'
    }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Sitemap URL Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('sitemapAgent.yourSitemapUrl')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('sitemapAgent.yourSitemapUrlDesc')}
            </p>
          </div>
          <Globe className="text-blue-500" size={24} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-700 dark:text-gray-300 break-all">
            {sitemapUrl}
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {copiedUrl ? (
              <>
                <CheckCircle size={18} />
                <span>{t('sitemapAgent.copied')}</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>{t('sitemapAgent.copyUrl')}</span>
              </>
            )}
          </button>
        </div>

        {/* Domain Toggle */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="customDomain"
              checked={useCustomDomain}
              onChange={(e) => setUseCustomDomain(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="customDomain" className="text-sm text-gray-700 dark:text-gray-300">
              {t('sitemapAgent.customDomain')}
            </label>
          </div>
          {useCustomDomain && (
            <input
              type="text"
              placeholder={t('sitemapAgent.domainPlaceholder')}
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="mt-3 w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <FileText className="text-blue-500" size={20} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('sitemapAgent.stats.total')}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {sitemapStats.totalUrls}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('sitemapAgent.stats.urlsInSitemap')}</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="text-green-500" size={20} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('sitemapAgent.stats.indexed')}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {sitemapStats.indexedPages}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('sitemapAgent.stats.pagesIndexed')}</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="text-yellow-500" size={20} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('sitemapAgent.stats.issues')}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {sitemapStats.crawlErrors}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('sitemapAgent.stats.crawlErrors')}</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-purple-500" size={20} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('sitemapAgent.stats.updated')}</span>
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {new Date().toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('sitemapAgent.stats.lastGenerated')}</div>
        </div>
      </div>

      {/* Content Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('sitemapAgent.contentBreakdown.title')}
        </h3>
        <div className="space-y-3">
          {[
            { type: t('sitemapAgent.contentBreakdown.products'), count: sitemapStats.products, color: 'bg-blue-500' },
            { type: t('sitemapAgent.contentBreakdown.categories'), count: sitemapStats.categories, color: 'bg-green-500' },
            { type: t('sitemapAgent.contentBreakdown.staticPages'), count: sitemapStats.pages, color: 'bg-purple-500' }
          ].map((item) => (
            <div key={item.type}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.type}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.count} {t('sitemapAgent.contentBreakdown.pages')}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all`}
                  style={{ width: `${(item.count / sitemapStats.totalUrls) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGenerateTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('sitemapAgent.generate.xmlStructure')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('sitemapAgent.generate.xmlStructureDesc')}
            </p>
          </div>
          <button
            onClick={() => setShowXml(!showXml)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileCode2 size={18} />
            <span>{showXml ? t('sitemapAgent.generate.hideXml') : t('sitemapAgent.generate.viewXml')}</span>
          </button>
        </div>

        {showXml && (
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-xs sm:text-sm font-mono">
              <code>{generateSitemapXml()}</code>
            </pre>
          </div>
        )}

        {/* URL Structure Examples */}
        <div className="mt-6 space-y-4">
          <h4 className="text-base font-medium text-gray-900 dark:text-white">
            {t('sitemapAgent.generate.urlPattern')}
          </h4>
          {[
            { type: t('sitemapAgent.contentBreakdown.products'), pattern: '/product/{slug}', example: '/product/iphone-15-pro' },
            { type: t('sitemapAgent.contentBreakdown.categories'), pattern: '/category/{slug}', example: '/category/electronics' },
            { type: t('sitemapAgent.contentBreakdown.staticPages'), pattern: '/{slug}', example: '/about-us' }
          ].map((pattern) => (
            <div key={pattern.type} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">{pattern.type}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('sitemapAgent.generate.pattern')}: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                    {pattern.pattern}
                  </code>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {t('sitemapAgent.generate.example')}: <span className="text-blue-600 dark:text-blue-400">{pattern.example}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regenerate Button */}
        <div className="mt-6 flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Info className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {t('sitemapAgent.generate.autoRegenerate')}
            </span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <RefreshCw size={16} />
            <span>{t('sitemapAgent.generate.forceRegenerate')}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSeoTab = () => (
    <div className="space-y-6">
      {/* SEO Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t('sitemapAgent.seo.title')}
        </h3>
        <div className="space-y-4">
          {seoTips.map((tip, index) => (
            <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="flex-shrink-0">{tip.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tip.description}</p>
                <button className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  {tip.action}
                  {tip.link ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
                </button>
              </div>
              {tip.status && (
                <div className={`px-3 py-1 h-fit rounded-full text-xs font-medium ${
                  tip.status === 'optimal' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                  tip.status === 'good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {tip.status === 'optimal' ? t('sitemapAgent.seo.status.optimal') :
                   tip.status === 'good' ? t('sitemapAgent.seo.status.good') : t('sitemapAgent.seo.status.needsAttention')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('sitemapAgent.seo.quickActions.title')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            <div className="flex items-center gap-3">
              <Search className="text-gray-600 dark:text-gray-400" size={20} />
              <span className="font-medium text-gray-900 dark:text-white">
                {t('sitemapAgent.seo.quickActions.submitToGoogle')}
              </span>
            </div>
            <ExternalLink className="text-gray-400" size={16} />
          </button>
          
          <button className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            <div className="flex items-center gap-3">
              <FileText className="text-gray-600 dark:text-gray-400" size={20} />
              <span className="font-medium text-gray-900 dark:text-white">
                {t('sitemapAgent.seo.quickActions.testRobotsTxt')}
              </span>
            </div>
            <ArrowRight className="text-gray-400" size={16} />
          </button>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('sitemapAgent.seo.bestPractices.title')}
        </h3>
        <ul className="space-y-3">
          {[
            t('sitemapAgent.seo.bestPractices.items.sizeLimit'),
            t('sitemapAgent.seo.bestPractices.items.regularUpdates'),
            t('sitemapAgent.seo.bestPractices.items.canonicalOnly'),
            t('sitemapAgent.seo.bestPractices.items.statusCodes'),
            t('sitemapAgent.seo.bestPractices.items.multipleEngines'),
            t('sitemapAgent.seo.bestPractices.items.monitorPerformance')
          ].map((practice, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
              <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t('sitemapAgent.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('sitemapAgent.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: t('sitemapAgent.tabs.overview'), icon: <Globe size={18} /> },
            { id: 'generate', label: t('sitemapAgent.tabs.generate'), icon: <FileCode2 size={18} /> },
            { id: 'seo', label: t('sitemapAgent.tabs.seoTips'), icon: <Search size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'generate' && renderGenerateTab()}
        {activeTab === 'seo' && renderSeoTab()}
      </div>
    </div>
  );
};

export default SitemapAgentPage;