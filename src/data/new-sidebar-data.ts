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
  Store
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
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
      isActive: false
    },
    {
      id: 'orders',
      title: 'Orders',
      url: '/dashboard/orders',
      icon: Package,
      badge: { value: '12', variant: 'warning' as const },
      isActive: false,
      children: [
        {
          title: 'All Orders',
          url: '/dashboard/orders',
          icon: PackageOpen
        },
        {
          title: 'Pending Orders',
          url: '/dashboard/orders/pending',
          badge: { value: '8', variant: 'danger' as const }
        },
        {
          title: 'Processing',
          url: '/dashboard/orders/processing',
          badge: { value: '4', variant: 'info' as const }
        },
        {
          title: 'Completed',
          url: '/dashboard/orders/completed'
        },
        {
          title: 'Order Issues',
          url: '/dashboard/orders/issues'
        },
        {
          title: 'Blocked Numbers',
          url: '/dashboard/orders/blocked-numbers',
          icon: ShoppingBasket
        },
        {
          title: 'Blocked OTP',
          url: '/dashboard/orders/blocked-otp',
          icon: PhoneOff
        }
      ]
    },
    {
      id: 'products',
      title: 'Products & Catalog',
      url: '/dashboard/products',
      icon: Tag,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'All Products',
          url: '/dashboard/products'
        },
        {
          title: 'Add Product',
          url: '/dashboard/products/new',
          icon: Plus
        },
        {
          title: 'Categories',
          url: '/dashboard/products/categories'
        },
        {
          title: 'Collections',
          url: '/dashboard/products/collections'
        },
        {
          title: 'Reviews',
          url: '/dashboard/products/reviews'
        },
        {
          title: 'Product Feed',
          url: '/dashboard/products/feed'
        },
        {
          title: 'Easy Catalog',
          url: '/dashboard/products/catalog'
        }
      ]
    },
    {
      id: 'customers',
      title: 'Customers',
      url: '/dashboard/customers',
      icon: Users,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'All Customers',
          url: '/dashboard/customers'
        },
        {
          title: 'Segments',
          url: '/dashboard/customers/segments'
        },
        {
          title: 'Communication',
          url: '/dashboard/customers/messages'
        },
        {
          title: 'Loyalty Program',
          url: '/dashboard/customers/loyalty'
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing Hub',
      url: '/dashboard/marketing',
      icon: Megaphone,
      badge: { value: 'PRO', variant: 'success' as const },
      isActive: false,
      children: [
        {
          title: 'Campaigns',
          url: '/dashboard/marketing'
        },
        {
          title: 'Promotions',
          url: '/dashboard/marketing/promotions'
        },
        {
          title: 'Coupons',
          url: '/dashboard/marketing/coupons'
        },
        {
          title: 'Cross Selling',
          url: '/dashboard/marketing/cross-selling'
        },
        {
          title: 'Retargeting',
          url: '/dashboard/marketing/retargeting'
        },
        {
          title: 'Integrations',
          url: '/dashboard/marketing/integrations'
        },
        {
          title: 'WhatsApp Marketing',
          url: '/dashboard/marketing/whatsapp'
        },
        {
          title: 'Affiliate Program',
          url: '/dashboard/marketing/affiliate'
        },
        {
          title: 'Referral Links',
          url: '/dashboard/marketing/referrals'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      url: '/dashboard/analytics',
      icon: BarChart3,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'Overview',
          url: '/dashboard/analytics'
        },
        {
          title: 'Sales Reports',
          url: '/dashboard/analytics/sales'
        },
        {
          title: 'Customer Analytics',
          url: '/dashboard/analytics/customers'
        },
        {
          title: 'Product Performance',
          url: '/dashboard/analytics/products'
        },
        {
          title: 'Marketing Analytics',
          url: '/dashboard/analytics/marketing'
        },
        {
          title: 'Custom Reports',
          url: '/dashboard/analytics/custom'
        }
      ]
    },
    {
      id: 'settings',
      title: 'Store Settings',
      url: '/dashboard/settings',
      icon: Settings,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'Store Information',
          url: '/dashboard/settings'
        },
        {
          title: 'Shipping & Delivery',
          url: '/dashboard/settings/shipping'
        },
        {
          title: 'Payment Methods',
          url: '/dashboard/settings/payments'
        },
        {
          title: 'Store Policies',
          url: '/dashboard/settings/policies'
        },
        {
          title: 'Staff & Permissions',
          url: '/dashboard/settings/staff'
        },
        {
          title: 'Tax Settings',
          url: '/dashboard/settings/tax'
        }
      ]
    },
    {
      id: 'design',
      title: 'Design & Content',
      url: '/dashboard/design',
      icon: Palette,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'Themes',
          url: '/dashboard/design'
        },
        {
          title: 'Customize Theme',
          url: '/dashboard/design/customize'
        },
        {
          title: 'Pages',
          url: '/dashboard/design/pages'
        },
        {
          title: 'Media Library',
          url: '/dashboard/design/media'
        },
        {
          title: 'SEO & Metadata',
          url: '/dashboard/design/seo'
        }
      ]
    },
    {
      id: 'apps',
      title: 'Apps & Integrations',
      url: '/dashboard/apps',
      icon: Grid3x3,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'Installed Apps',
          url: '/dashboard/apps'
        },
        {
          title: 'App Marketplace',
          url: '/dashboard/apps/marketplace'
        },
        {
          title: 'API Access',
          url: '/dashboard/apps/api'
        },
        {
          title: 'Webhooks',
          url: '/dashboard/apps/webhooks'
        }
      ]
    },
    {
      id: 'finance',
      title: 'Financial Center',
      url: '/dashboard/finance',
      icon: Wallet,
      badge: null,
      isActive: false,
      children: [
        {
          title: 'Wallet',
          url: '/dashboard/finance'
        },
        {
          title: 'Transactions',
          url: '/dashboard/finance/transactions'
        },
        {
          title: 'Billing',
          url: '/dashboard/finance/billing'
        },
        {
          title: 'Payouts',
          url: '/dashboard/finance/payouts'
        },
        {
          title: 'Financial Reports',
          url: '/dashboard/finance/reports'
        }
      ]
    }
  ] as NavigationItem[],
  
  // Quick actions for easy access
  quickActions: [
    {
      title: 'Add Product',
      url: '/dashboard/products/new',
      icon: Plus
    },
    {
      title: 'New Campaign',
      url: '/dashboard/marketing/campaigns/new',
      icon: Megaphone
    },
    {
      title: 'View Reports',
      url: '/dashboard/analytics',
      icon: FileText
    }
  ] as QuickAction[],
  
  // Help links
  helpLinks: [
    {
      title: 'Documentation',
      url: '/help/docs',
      icon: Book
    },
    {
      title: 'Video Tutorials',
      url: '/help/tutorials',
      icon: Play
    },
    {
      title: 'Support',
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