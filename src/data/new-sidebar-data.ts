import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  Megaphone,
  BarChart3,
  Settings,
  Palette,
  Grid3x3,
  Wallet,
  PackageOpen,
  PackageSearch,
  ShoppingBasket,
  PhoneOff,
  Plus,
  FileText,
  Book,
  Play,
  HelpCircle,
  Store,
  Crown
} from "lucide-react";

// Navigation item interface
export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  icon?: any;
  badge?: {
    value: string;
    variant: 'default' | 'success' | 'warning' | 'danger' | 'info';
  };
  isActive?: boolean;
  children?: NavigationSubItem[];
}

export interface NavigationSubItem {
  title: string;
  url: string;
  badge?: {
    value: string;
    variant: 'default' | 'success' | 'warning' | 'danger' | 'info';
  };
  icon?: any;
}

export interface QuickAction {
  title: string;
  url: string;
  icon: any;
}

export const newSidebarData = {
  // Store information for future multi-store support
  currentStore: {
    name: "My Store",
    logo: Store,
    plan: "Professional",
  },

  // Main navigation items
  navigation: [
    {
      id: 'overview',
      title: 'navigation.dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
      isActive: false
    },
    {
      id: 'orders',
      title: 'navigation.orders',
      url: '/dashboard/orders',
      icon: Package,
      badge: { value: '12', variant: 'warning' as const },
      isActive: false,
      children: [
        {
          title: 'navigation.allOrders',
          url: '/dashboard/orders',
          icon: PackageOpen
        },
        {
          title: 'navigation.pendingOrders',
          url: '/dashboard/orders/pending',
          badge: { value: '8', variant: 'danger' as const }
        },
        {
          title: 'navigation.processing',
          url: '/dashboard/orders/processing',
          badge: { value: '4', variant: 'info' as const }
        },
        {
          title: 'navigation.completed',
          url: '/dashboard/orders/completed'
        },
        {
          title: 'navigation.orderIssues',
          url: '/dashboard/orders/issues'
        },
        {
          title: 'navigation.blockedNumbers',
          url: '/dashboard/orders/blocked-numbers',
          icon: ShoppingBasket
        },
        {
          title: 'navigation.blockedOTP',
          url: '/dashboard/orders/blocked-otp',
          icon: PhoneOff
        }
      ]
    },
    {
      id: 'products',
      title: 'navigation.products',
      url: '/dashboard/products',
      icon: Tag,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'navigation.allProducts',
          url: '/dashboard/products'
        },
        {
          title: 'navigation.addProduct',
          url: '/dashboard/products/new',
          icon: Plus
        },
        {
          title: 'navigation.categories',
          url: '/dashboard/products/categories'
        },
        {
          title: 'navigation.collections',
          url: '/dashboard/products/collections'
        },
        {
          title: 'navigation.reviews',
          url: '/dashboard/products/reviews'
        },
        {
          title: 'navigation.productFeed',
          url: '/dashboard/products/feed'
        },
        {
          title: 'navigation.easyCatalog',
          url: '/dashboard/products/catalog'
        }
      ]
    },
    {
      id: 'customers',
      title: 'navigation.customers',
      url: '/dashboard/customers',
      icon: Users,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'navigation.allCustomers',
          url: '/dashboard/customers'
        },
        {
          title: 'navigation.segments',
          url: '/dashboard/customers/segments'
        },
        {
          title: 'navigation.communication',
          url: '/dashboard/customers/messages'
        },
        {
          title: 'navigation.loyaltyProgram',
          url: '/dashboard/customers/loyalty'
        }
      ]
    },
    {
      id: 'agent-store',
      title: 'navigation.agentStore',
      url: '/dashboard/agent-store',
      icon: Crown,
      badge: { value: 'VIP', variant: 'warning' as const },
      isActive: false
    },
    {
      id: 'marketing',
      title: 'navigation.marketingHub',
      url: '/dashboard/marketing',
      icon: Megaphone,
      badge: { value: 'PRO', variant: 'success' as const },
      isActive: false,
      children: [
        {
          title: 'navigation.campaigns',
          url: '/dashboard/marketing'
        },
        {
          title: 'navigation.promotions',
          url: '/dashboard/marketing/promotions'
        },
        {
          title: 'navigation.coupons',
          url: '/dashboard/marketing/coupons'
        },
        {
          title: 'navigation.crossSelling',
          url: '/dashboard/marketing/cross-selling'
        },
        {
          title: 'navigation.retargeting',
          url: '/dashboard/marketing/retargeting'
        },
        {
          title: 'navigation.integrations',
          url: '/dashboard/marketing/integrations'
        },
        {
          title: 'navigation.whatsappMarketing',
          url: '/dashboard/marketing/whatsapp'
        },
        {
          title: 'navigation.affiliateProgram',
          url: '/dashboard/marketing/affiliate'
        },
        {
          title: 'navigation.referralLinks',
          url: '/dashboard/marketing/referrals'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'navigation.analyticsReports',
      url: '/dashboard/analytics',
      icon: BarChart3,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'navigation.overview',
          url: '/dashboard/analytics'
        },
        {
          title: 'navigation.salesReports',
          url: '/dashboard/analytics/sales'
        },
        {
          title: 'navigation.customerAnalytics',
          url: '/dashboard/analytics/customers'
        },
        {
          title: 'navigation.productPerformance',
          url: '/dashboard/analytics/products'
        },
        {
          title: 'navigation.marketingAnalytics',
          url: '/dashboard/analytics/marketing'
        },
        {
          title: 'navigation.customReports',
          url: '/dashboard/analytics/custom'
        }
      ]
    },
    {
      id: 'settings',
      title: 'navigation.storeSettings',
      url: '/dashboard/settings',
      icon: Settings,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'navigation.storeInformation',
          url: '/dashboard/settings'
        },
        {
          title: 'navigation.shippingDelivery',
          url: '/dashboard/settings/shipping'
        },
        {
          title: 'navigation.paymentMethods',
          url: '/dashboard/settings/payments'
        },
        {
          title: 'navigation.storePolicies',
          url: '/dashboard/settings/policies'
        },
        {
          title: 'navigation.staffPermissions',
          url: '/dashboard/settings/staff'
        },
        {
          title: 'navigation.taxSettings',
          url: '/dashboard/settings/tax'
        }
      ]
    },
    {
      id: 'design',
      title: 'navigation.designContent',
      url: '/dashboard/design',
      icon: Palette,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'navigation.themes',
          url: '/dashboard/design'
        },
        {
          title: 'navigation.customizeTheme',
          url: '/dashboard/design/customize'
        },
        {
          title: 'navigation.pages',
          url: '/dashboard/design/pages'
        },
        {
          title: 'navigation.mediaLibrary',
          url: '/dashboard/design/media'
        },
        {
          title: 'navigation.seoMetadata',
          url: '/dashboard/design/seo'
        }
      ]
    },
    {
      id: 'apps',
      title: 'navigation.appsIntegrations',
      url: '/dashboard/apps',
      icon: Grid3x3,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'navigation.installedApps',
          url: '/dashboard/apps'
        },
        {
          title: 'navigation.appMarketplace',
          url: '/dashboard/apps/marketplace'
        },
        {
          title: 'navigation.apiAccess',
          url: '/dashboard/apps/api'
        },
        {
          title: 'navigation.webhooks',
          url: '/dashboard/apps/webhooks'
        }
      ]
    },
    {
      id: 'finance',
      title: 'navigation.financialCenter',
      url: '/dashboard/finance',
      icon: Wallet,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'navigation.wallet',
          url: '/dashboard/finance'
        },
        {
          title: 'navigation.transactions',
          url: '/dashboard/finance/transactions'
        },
        {
          title: 'navigation.billing',
          url: '/dashboard/finance/billing'
        },
        {
          title: 'navigation.payouts',
          url: '/dashboard/finance/payouts'
        },
        {
          title: 'navigation.financialReports',
          url: '/dashboard/finance/reports'
        }
      ]
    }
  ] as NavigationItem[],
  
  // Quick actions for easy access
  quickActions: [
    {
      title: 'navigation.addProduct',
      url: '/dashboard/products/new',
      icon: Plus
    },
    {
      title: 'dashboard.newCampaign',
      url: '/dashboard/marketing/campaigns/new',
      icon: Megaphone
    },
    {
      title: 'dashboard.viewReports',
      url: '/dashboard/analytics',
      icon: FileText
    }
  ] as QuickAction[],
  
  // Help links
  helpLinks: [
    {
      title: 'navigation.documentation',
      url: '/help/docs',
      icon: Book
    },
    {
      title: 'navigation.videoTutorials',
      url: '/help/tutorials',
      icon: Play
    },
    {
      title: 'navigation.support',
      url: '/help/support',
      icon: HelpCircle
    }
  ] as QuickAction[]
};

// Utility function to find active navigation item based on current path
export const findActiveNavItem = (path: string, navItems: NavigationItem[]): string | null => {
  for (const item of navItems) {
    if (path === item.url) {
      return item.id;
    }
    if (item.children) {
      for (const child of item.children) {
        if (path === child.url || path.startsWith(child.url + '/')) {
          return item.id;
        }
      }
    }
  }
  return null;
};

// Get breadcrumbs based on current path
export const getBreadcrumbs = (path: string): { title: string; url: string }[] => {
  const breadcrumbs = [{ title: 'Dashboard', url: '/dashboard' }];
  
  // Find matching navigation item
  for (const item of newSidebarData.navigation) {
    if (path.startsWith(item.url) && item.url !== '/dashboard') {
      breadcrumbs.push({ title: item.title, url: item.url });
      
      // Check children for deeper match
      if (item.children) {
        for (const child of item.children) {
          if (path === child.url) {
            breadcrumbs.push({ title: child.title, url: child.url });
            break;
          }
        }
      }
      break;
    }
  }
  
  return breadcrumbs;
};