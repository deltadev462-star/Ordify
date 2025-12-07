import {
  ArrowLeftRight,
  AudioWaveform,
  Blocks,
  ChartLine,
  CircleDollarSign,
  Command,
  CornerLeftUpIcon,
  Crown,
  DownloadCloud,
  Files,
   GalleryVerticalEnd,
  HandCoins,
   Highlighter,
   LaptopMinimal,
   Megaphone,
  MessageSquareDot,
  Network,
  Package,
  PackageOpen,
  PackageSearch,
  PhoneOff,
   Popcorn,
  Rss,
  Settings,
  Share2,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Star,
  SunMoon,
  Tag,
  Tags,
  Target,
  Users,
  Wallet,
  Webhook,
} from "lucide-react";

export const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  links: [
    {
      type: "link",
      title: "Home",
      url: "/dashboard",
      icon: ChartLine,
    },
    {
      type: "link",
      title: "Orders",
      url: "/dashboard/orders",
      icon: Package,
      isActive: true,
      items: [
        {
          title: "All Orders",
          icons: PackageOpen,
          url: "/dashboard/orders",
        },
        {
          title: "Missed Orders",
          icons: PackageSearch,
          url: "/dashboard/orders/issues",
        },
        {
          title: "Blocked Numbers",
          icons: ShoppingBasket,
          url: "/dashboard/orders/blocked-numbers",
        },
        {
          title: "Blocked OTP Numbers",
          icons: PhoneOff,
          url: "/dashboard/orders/blocked-otp",
        },
      ],
    },
    {
      type: "link",
      title: "Products",
      url: "/dashboard/products",
      icon: Tag,
    },
    {
      type: "link",
      title: "Shater Your Smart Shater",
      url: "/dashboard/shater",
      icon: Blocks,
    },
    {
      type: "link",
      title: "Agent Store",
      url: "/dashboard/agent-store",
      icon: Crown,
    },
    {
      type: "link",
      title: "Marketing Tools",
      url: "/dashboard/marketing",
      icon: Megaphone,
    },
    {
      type: "link",
      title: "Finance",
      url: "/dashboard/finance",
      icon: Wallet,
    },
    {
      type: "link",
      title: "Design & Content",
      url: "/dashboard/design",
      icon: LaptopMinimal,
    },
    {
      type: "link",
      title: "Apps",
      url: "/dashboard/apps",
      icon: Webhook,
    },

    {
      type: "link",
      title: "Service gallery",
      url: "/dashboard/service-gallery",
      icon: CircleDollarSign,
    },
    {
      type: "link",
      title: "Affiliate Marketing",
      url: "/dashboard/marketing/affiliate",
      icon: HandCoins,
    },
    {
      type: "link",
      title: "Marketing Services",
      url: "/dashboard/marketing-services",
      icon: Tags,
    },
    {
      type: "link",
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
} as const;

export const navItems = [...sidebarData.links];

// Sub-navigation data for each main section
export const subNavigationData = {
  orders: {
    title: "Orders Management",
    description: "Manage all your orders and customer interactions",
    items: [
      {
        title: "All Orders",
        icon: PackageOpen,
        url: "/dashboard/orders",
        description: "View and manage all customer orders"
      },
      {
        title: "Missed Orders",
        icon: PackageSearch,
        url: "/dashboard/orders/issues",
        description: "Track orders that were not completed"
      },
      {
        title: "Blocked Numbers",
        icon: ShoppingBasket,
        url: "/dashboard/orders/blocked-numbers",
        description: "Manage blocked customer numbers"
      },
      {
        title: "Blocked OTP Numbers",
        icon: PhoneOff,
        url: "/dashboard/orders/blocked-otp",
        description: "Manage OTP blocked numbers"
      },
    ]
  },
  listing: {
    title: "Product Listing",
    description: "Manage your products, categories and reviews",
    items: [
      {
        title: "Products",
        icon: Tags,
        url: "/dashboard/products",
        description: "Add and manage your products"
      },
      {
        title: "Categories",
        icon: Blocks,
        url: "/dashboard/products/categories",
        description: "Organize products into categories"
      },
      {
        title: "Reviews",
        icon: Star,
        url: "/dashboard/products/reviews",
        description: "Manage customer reviews and ratings"
      },
      {
        title: "Product Feed",
        icon: MessageSquareDot,
        url: "/dashboard/products/feed",
        description: "Manage product feed for marketing"
      },
      {
        title: "Easy Catalog",
        icon: Files,
        url: "/dashboard/products/catalog",
        description: "Create and manage product catalogs"
      },
    ]
  },
  marketing: {
    title: "Marketing Tools",
    description: "Boost your sales with powerful marketing tools",
    items: [
      { title: "Pixel Settings", icon: Share2, url: "/dashboard/marketing/integrations/pixel", description: "Configure tracking pixels" },
      { title: "Conversion API", icon: Network, url: "/dashboard/marketing/integrations/conversion-api", description: "Set up conversion tracking" },
      { title: "CROSS SELLING", icon: ShoppingCart, url: "/dashboard/marketing/cross-selling", description: "Increase sales with cross-selling" },
      { title: "Coupons", icon: CornerLeftUpIcon, url: "/dashboard/marketing/coupons", description: "Create discount coupons" },
      { title: "Retargeting", icon: Target, url: "/dashboard/marketing/retargeting", description: "Re-engage your customers" },
      { title: "Connect with Google Tag", icon: Rss, url: "/dashboard/marketing/integrations/google-tag", description: "Integrate Google Tag Manager" },
      { title: "Whatsapp Marketing", icon: Rss, url: "/dashboard/marketing/whatsapp", description: "Reach customers on WhatsApp" },
      { title: "Verify your orders with Tc", icon: Settings, url: "/dashboard/marketing/verify-orders", description: "Order verification system" },
      { title: "Track campaign results", icon: Target, url: "/dashboard/marketing/track-campaign", description: "Monitor campaign performance" },
      { title: "Google Merchant", icon: Rss, url: "/dashboard/marketing/integrations/google-merchant", description: "Google Merchant integration" },
      { title: "Sales Popup", icon: Popcorn, url: "/dashboard/marketing/sales-popup", description: "Show sales notifications" },
      { title: "Create Referral Links", icon: Users, url: "/dashboard/marketing/referrals", description: "Build referral programs" },
      { title: "Minimum Order Value", icon: ShoppingBag, url: "/dashboard/marketing/min-order", description: "Set order requirements" },
      { title: "Downsell", icon: DownloadCloud, url: "/dashboard/marketing/downsell", description: "Convert with downsell offers" },
    ]
  },
  wallet: {
    title: "Your Wallet",
    description: "Manage your finances and transactions",
    items: [
      { title: "Balance", icon: Wallet, url: "/dashboard/finance", description: "View your current balance" },
      { title: "Transactions", icon: ArrowLeftRight, url: "/dashboard/finance/transactions", description: "View transaction history" },
    ]
  },
  website: {
    title: "Manage My Website",
    description: "Customize your website appearance and content",
    items: [
      { title: "Themes", icon: SunMoon, url: "/dashboard/design", description: "Choose and customize themes" },
      { title: "Texts", icon: Highlighter, url: "/dashboard/design/pages", description: "Edit website text content" },
    ]
  }
};

