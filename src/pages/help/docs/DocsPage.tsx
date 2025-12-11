import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Book,
  Package,
  ShoppingCart,
  TrendingUp,
  CreditCard,
  Code,
  Clock,
  ArrowRight,
  BookOpen,
  FileText,
  HelpCircle,
  Link2,
  Printer,
  Share2,
  ChevronRight,
  Rocket,
  ShoppingBag,
  BarChart,
  DollarSign,
  Cpu
} from 'lucide-react';

interface DocCategory {
  id: string;
  icon: ReactNode;
  articles: string[];
}

const DocsPage = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isRTL = i18n.language === 'ar';

  const categories: DocCategory[] = [
    {
      id: 'gettingStarted',
      icon: <Rocket className="h-6 w-6" />,
      articles: ['quickStart', 'storeSetup', 'firstProduct', 'dashboard']
    },
    {
      id: 'products',
      icon: <Package className="h-6 w-6" />,
      articles: ['productCreation', 'inventoryManagement', 'bulkImport', 'categories']
    },
    {
      id: 'orders',
      icon: <ShoppingCart className="h-6 w-6" />,
      articles: ['orderProcessing', 'shippingSetup', 'returnRefunds', 'orderTracking']
    },
    {
      id: 'marketing',
      icon: <TrendingUp className="h-6 w-6" />,
      articles: ['seoOptimization', 'emailMarketing', 'socialMedia', 'discountCoupons']
    },
    {
      id: 'payments',
      icon: <CreditCard className="h-6 w-6" />,
      articles: ['paymentGateways', 'taxConfiguration', 'payoutSettings', 'invoicing']
    },
    {
      id: 'advanced',
      icon: <Code className="h-6 w-6" />,
      articles: ['apiIntegration', 'customization', 'analytics', 'automation']
    }
  ];

  const popularArticles = [
    { category: 'gettingStarted', article: 'quickStart', readTime: 5 },
    { category: 'products', article: 'productCreation', readTime: 8 },
    { category: 'orders', article: 'shippingSetup', readTime: 10 },
    { category: 'marketing', article: 'seoOptimization', readTime: 12 },
    { category: 'payments', article: 'paymentGateways', readTime: 7 },
    { category: 'advanced', article: 'apiIntegration', readTime: 15 }
  ];

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'gettingStarted': return <Rocket className="h-5 w-5" />;
      case 'products': return <ShoppingBag className="h-5 w-5" />;
      case 'orders': return <ShoppingCart className="h-5 w-5" />;
      case 'marketing': return <BarChart className="h-5 w-5" />;
      case 'payments': return <DollarSign className="h-5 w-5" />;
      case 'advanced': return <Cpu className="h-5 w-5" />;
      default: return <Book className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('docs.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('docs.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400`}
              placeholder={t('docs.searchPlaceholder')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="group bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors ${isRTL ? 'ml-3' : 'mr-3'}`}>
                  {category.icon}
                </div>
                <ArrowRight className={`h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors ${isRTL && 'rotate-180'}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t(`docs.categories.${category.id}`)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t(`docs.categories.${category.id}Desc`)}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <FileText className="h-4 w-4 mr-1" />
                <span>{category.articles.length} {t('docs.articles', { count: category.articles.length })}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('docs.popularArticles.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t(`docs.sections.${item.category}.${item.article}.title`)}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('docs.popularArticles.readTime', { minutes: item.readTime })}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors ${isRTL && 'rotate-180'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Need Help Section */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">
              {t('docs.needHelp.title')}
            </h3>
            <p className="text-lg opacity-90 mb-6">
              {t('docs.needHelp.description')}
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
              {t('docs.needHelp.contactSupport')}
            </button>
          </div>
        </div>

        {/* Article Modal/Sidebar (placeholder for when category is selected) */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t(`docs.categories.${selectedCategory}`)}
                  </h3>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 gap-4">
                  {categories.find(c => c.id === selectedCategory)?.articles.map((article) => (
                    <div
                      key={article}
                      className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {t(`docs.sections.${selectedCategory}.${article}.title`)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t(`docs.sections.${selectedCategory}.${article}.description`)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {t('docs.popularArticles.readTime', { minutes: 10 })}
                          </span>
                          <span>{t('docs.lastUpdated', { date: new Date().toLocaleDateString() })}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Link2 className="h-4 w-4 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Printer className="h-4 w-4 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Share2 className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsPage;