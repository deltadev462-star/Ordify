import React, { useState, useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  PlayCircle,
  Clock,
  X,
  BookOpen,
  TrendingUp,
  Sparkles,
  Zap,
  Lightbulb,
  Link2,
  Eye,
  Download,
  Share2,
  CheckCircle,
  Award,
  Bookmark,
  PlaySquare,
  Maximize2,
  Volume2,
  Settings
} from 'lucide-react';

interface VideoTutorial {
  id: string;
  titleKey: string;
  descriptionKey: string;
  durationKey: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  views: number;
  completed?: boolean;
  progress?: number;
  thumbnail?: string;
}

const TutorialsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);

  const categories = [
    { id: 'gettingStarted', icon: BookOpen, color: 'blue' },
    { id: 'products', icon: TrendingUp, color: 'green' },
    { id: 'marketing', icon: Sparkles, color: 'purple' },
    { id: 'advanced', icon: Zap, color: 'orange' },
    { id: 'tips', icon: Lightbulb, color: 'yellow' },
    { id: 'integrations', icon: Link2, color: 'indigo' }
  ];

  const videos: VideoTutorial[] = [
    { 
      id: 'quickStart', 
      titleKey: 'tutorials.videos.quickStart.title',
      descriptionKey: 'tutorials.videos.quickStart.description',
      durationKey: 'tutorials.videos.quickStart.duration',
      category: 'gettingStarted', 
      difficulty: 'beginner',
      duration: 8.75,
      views: 15420,
      completed: true
    },
    { 
      id: 'addProducts', 
      titleKey: 'tutorials.videos.addProducts.title',
      descriptionKey: 'tutorials.videos.addProducts.description',
      durationKey: 'tutorials.videos.addProducts.duration',
      category: 'products', 
      difficulty: 'beginner',
      duration: 12.5,
      views: 12350,
      progress: 65
    },
    { 
      id: 'orderManagement', 
      titleKey: 'tutorials.videos.orderManagement.title',
      descriptionKey: 'tutorials.videos.orderManagement.description',
      durationKey: 'tutorials.videos.orderManagement.duration',
      category: 'products', 
      difficulty: 'intermediate',
      duration: 15.33,
      views: 9876
    },
    { 
      id: 'seoBasics', 
      titleKey: 'tutorials.videos.seoBasics.title',
      descriptionKey: 'tutorials.videos.seoBasics.description',
      durationKey: 'tutorials.videos.seoBasics.duration',
      category: 'marketing', 
      difficulty: 'beginner',
      duration: 10.25,
      views: 18923
    },
    { 
      id: 'emailMarketing', 
      titleKey: 'tutorials.videos.emailMarketing.title',
      descriptionKey: 'tutorials.videos.emailMarketing.description',
      durationKey: 'tutorials.videos.emailMarketing.duration',
      category: 'marketing', 
      difficulty: 'intermediate',
      duration: 18,
      views: 7654
    },
    { 
      id: 'analytics', 
      titleKey: 'tutorials.videos.analytics.title',
      descriptionKey: 'tutorials.videos.analytics.description',
      durationKey: 'tutorials.videos.analytics.duration',
      category: 'advanced', 
      difficulty: 'advanced',
      duration: 14.5,
      views: 5432
    }
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = searchTerm === '' || 
        t(video.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(video.descriptionKey).toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || video.difficulty === selectedDifficulty;
      
      const matchesDuration = selectedDuration === 'all' || 
        (selectedDuration === 'under5' && video.duration < 5) ||
        (selectedDuration === '5to10' && video.duration >= 5 && video.duration <= 10) ||
        (selectedDuration === 'over10' && video.duration > 10);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedDuration, videos, t]);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'intermediate': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'advanced': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getCategoryIcon = (categoryId: string): ReactNode => {
    const category = categories.find(c => c.id === categoryId);
    const IconComponent = category?.icon || BookOpen;
    return <IconComponent className="w-4 h-4" />;
  };

  const formatDuration = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const totalProgress = useMemo(() => {
    const completed = videos.filter(v => v.completed).length;
    const inProgress = videos.filter(v => v.progress && !v.completed).length;
    return {
      completed,
      inProgress,
      total: videos.length,
      percentage: Math.round((completed / videos.length) * 100)
    };
  }, [videos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <PlayCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('tutorials.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              {t('tutorials.subtitle')}
            </p>
          </div>

          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('tutorials.progress.yourProgress')}
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">
                      {t('tutorials.progress.completed', { count: totalProgress.completed })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlaySquare className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">
                      {totalProgress.inProgress} {t('common.inProgress')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - totalProgress.percentage / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#9333EA" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalProgress.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${
                isRTL ? 'right-3' : 'left-3'
              }`} />
              <input
                type="text"
                placeholder={t('tutorials.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('tutorials.filters.all')}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {t(`tutorials.categories.${cat.id}`)}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('common.all')}</option>
                <option value="beginner">{t('tutorials.filters.beginner')}</option>
                <option value="intermediate">{t('tutorials.filters.intermediate')}</option>
                <option value="advanced">{t('tutorials.filters.advanced')}</option>
              </select>

              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('tutorials.filters.duration')}</option>
                <option value="under5">{t('tutorials.filters.under5min')}</option>
                <option value="5to10">{t('tutorials.filters.5to10min')}</option>
                <option value="over10">{t('tutorials.filters.over10min')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Video */}
        {filteredVideos.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('tutorials.featured.badge')}</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">{t('tutorials.featured.title')}</h2>
                <p className="text-white/80 mb-6 max-w-2xl">
                  {t('tutorials.videos.quickStart.description')}
                </p>
                <button
                  onClick={() => setSelectedVideo(videos[0])}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                >
                  <PlayCircle className="w-5 h-5" />
                  {t('tutorials.featured.enrollNow')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  {video.completed && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                  {video.progress && !video.completed && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${video.progress}%` }}
                      />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                    {formatDuration(video.duration)}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-1.5 rounded-lg bg-${categories.find(c => c.id === video.category)?.color || 'gray'}-100 dark:bg-${categories.find(c => c.id === video.category)?.color || 'gray'}-900/30`}>
                      {getCategoryIcon(video.category)}
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(video.difficulty)}`}>
                      {t(`tutorials.filters.${video.difficulty}`)}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t(video.titleKey)}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {t(video.descriptionKey)}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatViews(video.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{t('tutorials.metadata.duration', { minutes: Math.round(video.duration) })}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <PlayCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('tutorials.emptyState.noResults')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('tutorials.emptyState.tryDifferent')}
            </p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
              {/* Video Player Area */}
              <div className="relative aspect-video bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <PlayCircle className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">{t('common.comingSoon')}</p>
                  </div>
                </div>
                
                {/* Player Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white mb-2">
                    <div className="flex items-center gap-4">
                      <button className="hover:opacity-80 transition-opacity">
                        <PlayCircle className="w-8 h-8" />
                      </button>
                      <button className="hover:opacity-80 transition-opacity">
                        <Volume2 className="w-6 h-6" />
                      </button>
                      <span className="text-sm">{formatDuration(selectedVideo.duration)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="hover:opacity-80 transition-opacity">
                        <Settings className="w-6 h-6" />
                      </button>
                      <button className="hover:opacity-80 transition-opacity">
                        <Maximize2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-0" />
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-lg hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {t(selectedVideo.titleKey)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t(selectedVideo.descriptionKey)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatViews(selectedVideo.views)} {t('tutorials.metadata.views', { count: selectedVideo.views })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{t('tutorials.metadata.duration', { minutes: Math.round(selectedVideo.duration) })}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedVideo.difficulty)}`}>
                    {t(`tutorials.filters.${selectedVideo.difficulty}`)}
                  </div>
                </div>
                
                {!selectedVideo.completed && (
                  <button
                    onClick={() => {
                      // Mark as complete logic would go here
                      setSelectedVideo(null);
                    }}
                    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {t('tutorials.actions.markComplete')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default TutorialsPage;