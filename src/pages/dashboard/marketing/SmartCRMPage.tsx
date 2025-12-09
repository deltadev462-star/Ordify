import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  MessageSquare,
  Phone,
  Mail,
  Filter,
  Plus,
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  Activity,
  Target,
  DollarSign,
  ChevronRight,
  Search,
  Settings,
  Download,
  Eye,
  Edit,
  Trash2,
  Tag,
  UserPlus,
  Send,
  Zap,
  LinkIcon,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Inbox,
  PhoneCall,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Workflow
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  value: number;
  source: string;
  lastContact: string;
  assignedTo: string;
  tags: string[];
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
}

interface KPICard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'info';
}

const SmartCRMPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<'pipeline' | 'list' | 'analytics' | 'automation'>('pipeline');
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'email' | 'sms' | 'whatsapp' | 'call'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const kpiData: KPICard[] = [
    {
      title: t('smartCRM.kpi.totalLeads'),
      value: '2,847',
      change: 12.5,
      icon: <Users />,
      color: 'primary'
    },
    {
      title: t('smartCRM.kpi.conversionRate'),
      value: '24.8%',
      change: 3.2,
      icon: <TrendingUp />,
      color: 'success'
    },
    {
      title: t('smartCRM.kpi.revenue'),
      value: '$128,450',
      change: -2.4,
      icon: <DollarSign />,
      color: 'warning'
    },
    {
      title: t('smartCRM.kpi.activeCampaigns'),
      value: '15',
      change: 0,
      icon: <Target />,
      color: 'info'
    }
  ];

  const pipelineStages = [
    { id: 'new', title: t('smartCRM.pipeline.newLeads'), count: 45, value: '$45,000' },
    { id: 'contacted', title: t('smartCRM.pipeline.contacted'), count: 32, value: '$128,000' },
    { id: 'qualified', title: t('smartCRM.pipeline.qualified'), count: 28, value: '$196,000' },
    { id: 'proposal', title: t('smartCRM.pipeline.proposal'), count: 15, value: '$375,000' },
    { id: 'won', title: t('smartCRM.pipeline.won'), count: 8, value: '$240,000' }
  ];

  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@example.com',
      phone: '+20 123 456 7890',
      status: t('smartCRM.lead.hotLead'),
      value: 15000,
      source: 'Facebook Ad',
      lastContact: t('smartCRM.time.hoursAgo', { count: 2 }),
      assignedTo: 'Sarah Ahmed',
      tags: [t('smartCRM.tags.premium'), t('smartCRM.tags.urgent')],
      stage: 'qualified'
    },
    {
      id: '2',
      name: 'Fatima Ali',
      email: 'fatima.ali@example.com',
      phone: '+20 111 222 3333',
      status: t('common.new'),
      value: 8500,
      source: 'Website Form',
      lastContact: t('smartCRM.time.dayAgo', { count: 1 }),
      assignedTo: 'Mohamed Salah',
      tags: [t('smartCRM.tags.followUp')],
      stage: 'new'
    }
  ];

  const getKpiColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getKpiIconClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-blue-600 dark:text-blue-400';
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'info':
        return 'text-cyan-600 dark:text-cyan-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const renderKPICards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className={`${getKpiColorClasses(kpi.color)} border rounded-lg p-4 transition-all hover:shadow-md`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg ${getKpiIconClasses(kpi.color)} bg-white dark:bg-gray-800`}>
              {kpi.icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              kpi.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {kpi.change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(kpi.change)}%
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{kpi.title}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPipelineView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 md:p-6 my-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          {t('smartCRM.pipeline.salesPipeline')}
        </h3>
        <div className="flex gap-2">
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base">
            <Plus size={16} className="sm:hidden" />
            <Plus size={18} className="hidden sm:block" />
            <span className="hidden sm:inline">{t('smartCRM.pipeline.addLead')}</span>
            <span className="sm:hidden">{t('common.add')}</span>
          </button>
        </div>
      </div>
      
      {/* Pipeline stages - responsive grid/scroll */}
      <div className="overflow-x-auto pb-2 -mx-3 px-3 sm:-mx-4 sm:px-4 md:-mx-6 md:px-6">
        <div className="inline-flex gap-3 sm:gap-4 lg:grid lg:grid-cols-5 lg:gap-4 lg:w-full">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-64 sm:w-72 lg:w-auto">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 h-full">
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-1 sm:gap-2">
                  <h4 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{stage.title}</h4>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">{stage.count}</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="text-xs">{stage.value}</span>
                  </div>
                </div>
                
                {/* Lead Cards */}
                <div className="space-y-2 sm:space-y-3">
                  {mockLeads
                    .filter(lead => lead.stage === stage.id)
                    .map(lead => (
                      <div key={lead.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all cursor-pointer touch-manipulation">
                        {/* Lead Header */}
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <h5 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white line-clamp-1">
                            {lead.name}
                          </h5>
                          <button className="p-0.5 sm:p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 touch-manipulation">
                            <MoreVertical size={14} className="sm:hidden" />
                            <MoreVertical size={16} className="hidden sm:block" />
                          </button>
                        </div>
                        
                        {/* Lead Info */}
                        <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <Mail size={12} className="sm:hidden flex-shrink-0" />
                            <Mail size={14} className="hidden sm:block flex-shrink-0" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <Phone size={12} className="sm:hidden flex-shrink-0" />
                            <Phone size={14} className="hidden sm:block flex-shrink-0" />
                            <span className="truncate">{lead.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <DollarSign size={12} className="sm:hidden flex-shrink-0" />
                            <DollarSign size={14} className="hidden sm:block flex-shrink-0" />
                            <span className="font-medium">${lead.value.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        {/* Tags and Actions */}
                        <div className="flex items-end justify-between gap-2">
                          {/* Tags - Responsive */}
                          <div className="flex flex-wrap gap-1 flex-1">
                            {lead.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 line-clamp-1">
                                {tag}
                              </span>
                            ))}
                            {lead.tags.length > 2 && (
                              <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                +{lead.tags.length - 2}
                              </span>
                            )}
                          </div>
                          
                          {/* Action Buttons - Responsive */}
                          <div className="flex gap-0.5 sm:gap-1">
                            <button className="p-1 sm:p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 rounded transition-colors touch-manipulation" title="Call">
                              <Phone size={12} className="sm:hidden" />
                              <Phone size={14} className="hidden sm:block" />
                            </button>
                            <button className="p-1 sm:p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 rounded transition-colors touch-manipulation" title="Email">
                              <Mail size={12} className="sm:hidden" />
                              <Mail size={14} className="hidden sm:block" />
                            </button>
                            <button className="p-1 sm:p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 rounded transition-colors touch-manipulation hidden xs:block" title="WhatsApp">
                              <MessageCircle size={12} className="sm:hidden" />
                              <MessageCircle size={14} className="hidden sm:block" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {/* Add Lead Button */}
                  <button className="w-full p-3 sm:p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center gap-2 touch-manipulation">
                    <Plus size={16} className="sm:hidden" />
                    <Plus size={20} className="hidden sm:block" />
                    <span className="text-xs sm:text-sm">{t('smartCRM.pipeline.addLead')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCommunicationChannels = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('smartCRM.communication.hub')}
        </h3>
        <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2">
          {[
            { id: 'all', icon: <Inbox size={16} />, label: t('common.all') },
            { id: 'email', icon: <Mail size={16} />, label: t('common.email') },
            { id: 'sms', icon: <MessageSquare size={16} />, label: t('smartCRM.channels.sms') },
            { id: 'whatsapp', icon: <MessageCircle size={16} />, label: t('smartCRM.channels.whatsapp') },
            { id: 'call', icon: <PhoneCall size={16} />, label: t('smartCRM.channels.calls') }
          ].map((channel) => (
            <button
              key={channel.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                selectedChannel === channel.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedChannel(channel.id as any)}
            >
              {channel.icon}
              <span className="text-sm font-medium">{channel.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" size={20} />
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">847</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('smartCRM.communication.delivered')}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Eye className="text-blue-500" size={20} />
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">623</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('smartCRM.communication.opened')}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Send className="text-purple-500" size={20} />
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">234</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('smartCRM.communication.replied')}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <XCircle className="text-red-500" size={20} />
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('smartCRM.communication.failed')}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors">
          <Mail size={18} />
          <span className="text-sm font-medium">{t('smartCRM.communication.broadcastEmail')}</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm font-medium">{t('smartCRM.communication.whatsappCampaign')}</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors">
          <MessageSquare size={18} />
          <span className="text-sm font-medium">{t('smartCRM.communication.smsBlast')}</span>
        </button>
      </div>
    </div>
  );

  const renderAutomationPanel = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('smartCRM.automation.workflowsTitle')}
        </h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span className="hidden sm:inline">{t('smartCRM.automation.createWorkflow')}</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {[
          {
            icon: <Zap size={20} />,
            title: t('smartCRM.automation.welcomeSeries'),
            description: t('smartCRM.automation.welcomeSeriesDesc'),
            stats: [
              { icon: <Users size={14} />, text: t('smartCRM.automation.enrolled', { count: 234 }) },
              { icon: <Activity size={14} />, text: t('smartCRM.automation.completion', { percent: 87 }) }
            ]
          },
          {
            icon: <Calendar size={20} />,
            title: t('smartCRM.automation.appointmentReminders'),
            description: t('smartCRM.automation.appointmentRemindersDesc'),
            stats: [
              { icon: <Clock size={14} />, text: t('smartCRM.automation.scheduled', { count: 156 }) },
              { icon: <CheckCircle size={14} />, text: t('smartCRM.automation.delivery', { percent: 98 }) }
            ]
          }
        ].map((workflow, index) => (
          <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex-shrink-0 p-3 bg-white dark:bg-gray-800 rounded-lg text-blue-600 dark:text-blue-400">
              {workflow.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white">{workflow.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{workflow.description}</p>
              <div className="flex flex-wrap gap-4 mt-3">
                {workflow.stats.map((stat, statIndex) => (
                  <span key={statIndex} className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    {stat.icon}
                    {stat.text}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-md text-sm font-medium">
                {t('common.active')}
              </span>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 rounded transition-colors">
                <Settings size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('smartCRM.channels.connectedChannels')}
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: <Facebook size={24} />, name: t('smartCRM.channels.facebook'), connected: true },
          { icon: <Instagram size={24} />, name: t('smartCRM.channels.instagram'), connected: true },
          { icon: <Twitter size={24} />, name: t('smartCRM.channels.twitter'), connected: false },
          { icon: <MessageCircle size={24} />, name: t('smartCRM.channels.whatsapp'), connected: true },
          { icon: <Mail size={24} />, name: t('smartCRM.channels.gmail'), connected: true },
          { icon: <Plus size={24} />, name: t('smartCRM.channels.addChannel'), connected: null }
        ].map((integration, index) => (
          <button
            key={index}
            className={`relative p-4 rounded-lg border transition-all ${
              integration.connected === null
                ? 'border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                : integration.connected
                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={integration.connected ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>
                {integration.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{integration.name}</span>
            </div>
            {integration.connected !== null && (
              <div className="absolute top-2 right-2">
                {integration.connected ? (
                  <CheckCircle className="text-green-500" size={16} />
                ) : (
                  <LinkIcon className="text-gray-400" size={16} />
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t('smartCRM.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('smartCRM.subtitle')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t('smartCRM.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: 'pipeline', icon: <Workflow size={18} />, label: t('smartCRM.navigation.pipeline') },
            { id: 'list', icon: <Users size={18} />, label: t('smartCRM.navigation.contacts') },
            { id: 'analytics', icon: <BarChart3 size={18} />, label: t('smartCRM.navigation.analytics') },
            { id: 'automation', icon: <Zap size={18} />, label: t('smartCRM.navigation.automation') }
          ].map((view) => (
            <button
              key={view.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeView === view.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
              onClick={() => setActiveView(view.id as any)}
            >
              {view.icon}
              <span className="font-medium">{view.label}</span>
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        {renderKPICards()}

        {/* Main Content */}
        <div className=" xl:grid-cols-3 gap-6">
          <div className="">
            {activeView === 'pipeline' && renderPipelineView()}
            {activeView === 'automation' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('smartCRM.automation.workflowBuilder')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {t('smartCRM.automation.workflowBuilderDesc')}
                </p>
                <div className="flex flex-col items-center gap-4">
                  <Workflow className="text-gray-300 dark:text-gray-600" size={48} />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t('smartCRM.automation.dragComponentsHere')}
                  </p>
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <Plus size={18} />
                    {t('smartCRM.automation.startBuilding')}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-6">
            {renderCommunicationChannels()}
            {renderAutomationPanel()}
            {renderIntegrations()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCRMPage;