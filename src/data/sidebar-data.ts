import {
  ArrowLeftRight,
  AudioWaveform,
  Blocks,
  ChartLine,
  CircleDollarSign,
  Command,
  CornerLeftUpIcon,
  DownloadCloud,
  Files,
  Filter,
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
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartLine,
    },
    {
      type: "link",
      title: "Orders",
      url: "/dashboard/orders",
      icon: Package,
    },
    {
      type: "link",
      title: "Listing",
      url: "/dashboard/listing",
      icon: Tag,
    },
    {
      type: "link",
      title: "Funnels",
      url: "/dashboard/funnels",
      icon: Filter,
    },
    {
      type: "link",
      title: "Shater Your Smart Shater",
      url: "/dashboard/shater",
      icon: Blocks,
    },
    {
      type: "link",
      title: "Marketing Tools",
      url: "/dashboard/marketing",
      icon: Megaphone,
    },
    {
      type: "link",
      title: "Your Wallet",
      url: "/dashboard/wallet",
      icon: Wallet,
    },
    {
      type: "link",
      title: "Manage My Website",
      url: "/dashboard/website",
      icon: LaptopMinimal,
    },
    {
      type: "link",
      title: "App",
      url: "/dashboard/applications",
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
      url: "/dashboard/affiliate-marketing",
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
        url: "/dashboard/order",
        description: "View and manage all customer orders"
      },
      {
        title: "Missed Orders",
        icon: PackageSearch,
        url: "/dashboard/missed-order",
        description: "Track orders that were not completed"
      },
      {
        title: "Blocked Numbers",
        icon: ShoppingBasket,
        url: "/dashboard/blocked-number",
        description: "Manage blocked customer numbers"
      },
      {
        title: "Blocked OTP Numbers",
        icon: PhoneOff,
        url: "/dashboard/blocked-otp-numbers",
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
        url: "/dashboard/product",
        description: "Add and manage your products"
      },
      {
        title: "Categories",
        icon: Blocks,
        url: "/dashboard/categories",
        description: "Organize products into categories"
      },
      {
        title: "Reviews",
        icon: Star,
        url: "/dashboard/reviews",
        description: "Manage customer reviews and ratings"
      },
      {
        title: "Product Feed",
        icon: MessageSquareDot,
        url: "/dashboard/product-feed",
        description: "Manage product feed for marketing"
      },
      {
        title: "Easy Catalog",
        icon: Files,
        url: "/dashboard/easy-catalog",
        description: "Create and manage product catalogs"
      },
    ]
  },
  marketing: {
    title: "Marketing Tools",
    description: "Boost your sales with powerful marketing tools",
    items: [
      { title: "Pixel Settings", icon: Share2, url: "/marketing/pixel", description: "Configure tracking pixels" },
      { title: "Conversion API", icon: Network, url: "/marketing/conversion", description: "Set up conversion tracking" },
      { title: "CROSS SELLING", icon: ShoppingCart, url: "/marketing/cross", description: "Increase sales with cross-selling" },
      { title: "Coupons", icon: CornerLeftUpIcon, url: "/marketing/coupons", description: "Create discount coupons" },
      { title: "Retargeting", icon: Target, url: "/marketing/retargeting", description: "Re-engage your customers" },
      { title: "Connect with Google Tag", icon: Rss, url: "/marketing/google-tag", description: "Integrate Google Tag Manager" },
      { title: "Whatsapp Marketing", icon: Rss, url: "/marketing/whatsapp", description: "Reach customers on WhatsApp" },
      { title: "Verify your orders with Tc", icon: Settings, url: "/marketing/verify-orders", description: "Order verification system" },
      { title: "Track campaign results", icon: Target, url: "/marketing/track-campaign", description: "Monitor campaign performance" },
      { title: "Google Merchant", icon: Rss, url: "/marketing/google-merchant", description: "Google Merchant integration" },
      { title: "Sales Popup", icon: Popcorn, url: "/marketing/sales-popup", description: "Show sales notifications" },
      { title: "Create Referral Links", icon: Users, url: "/marketing/referral-links", description: "Build referral programs" },
      { title: "Minimum Order Value", icon: ShoppingBag, url: "/marketing/min-order", description: "Set order requirements" },
      { title: "Downsell", icon: DownloadCloud, url: "/marketing/downsell", description: "Convert with downsell offers" },
    ]
  },
  wallet: {
    title: "Your Wallet",
    description: "Manage your finances and transactions",
    items: [
      { title: "Balance", icon: Wallet, url: "/dashboard/wallet", description: "View your current balance" },
      { title: "Transactions", icon: ArrowLeftRight, url: "/dashboard/transactions", description: "View transaction history" },
    ]
  },
  website: {
    title: "Manage My Website",
    description: "Customize your website appearance and content",
    items: [
      { title: "Themes", icon: SunMoon, url: "/dashboard/themes", description: "Choose and customize themes" },
      { title: "Texts", icon: Highlighter, url: "/dashboard/text", description: "Edit website text content" },
    ]
  }
};

