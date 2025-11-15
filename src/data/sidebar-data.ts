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
      type: "collapsible",
      title: "Orders",
      url: "#",
      icon: Package,
      isActive: true,
      items: [
        {
          title: "All Orders",
          icons: PackageOpen,
          url: "/dashboard/order",
        },
        {
          title: "Missed Orders",
          icons: PackageSearch,
          url: "/dashboard/missed-order",
        },
        {
          title: "Blocked Numbers",
          icons: ShoppingBasket,
          url: "/dashboard/blocked-number",
        },
        {
          title: "Blocked OTP Numbers",
          icons: PhoneOff,
          url: "/dashboard/blocked-otp-numbers",
        },
      ],
    },
    {
      type: "collapsible",
      title: "Products",
      url: "#",
      icon: Tag,
      isActive: true,
      items: [
        {
          title: "All Products",
          icons: Tags,
          url: "/dashboard/product",
        },
        {
          title: "Categories",
          icons: Blocks,
          url: "/dashboard/categories",
        },
        {
          title: "Reviews",
          icons: Star,
          url: "/dashboard/reviews",
        },
        {
          title: "Product Feed",
          icons: MessageSquareDot,
          url: "/dashboard/product-feed",
        },
        {
          title: "Easy Catalog",
          icons: Files,
          url: "/dashboard/easy-catalog",
        },
      ],
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
      title: "Marketing Tools",
      url: "#",
      icon: Megaphone,
      type: "collapsible",
      isActive: false,
      items: [
        { title: "Pixel Settings", icons: Share2, url: "/marketing/pixel" },
        {
          title: "Conversion API",
          icons: Network,
          url: "/marketing/conversion",
        },
        {
          title: "CROSS SELLING",
          icons: ShoppingCart,
          url: "/marketing/cross",
        },
        {
          title: "Coupons",
          icons: CornerLeftUpIcon,
          url: "/marketing/coupons",
        },
        { title: "Retargeting", icons: Target, url: "/marketing/retargeting" },
        {
          title: "Connect with Google Tag",
          icons: Rss,
          url: "/marketing/google-tag",
        },
        {
          title: "Whatsapp Marketing",
          icons: Rss,
          url: "/marketing/whatsapp",
        },
        {
          title: "Verify your orders with Tc",
          icons: Settings,
          url: "/marketing/verify-orders",
        },
        {
          title: "Track campaign results",
          icons: Target,
          url: "/marketing/track-campaign",
        },
        {
          title: "Google Merchant",
          icons: Rss,
          url: "/marketing/google-merchant",
        },
        { title: "Sales Popup", icons: Popcorn, url: "/marketing/sales-popup" },
        {
          title: "Create Referral Links",
          icons: Users,
          url: "/marketing/referral-links",
        },
        {
          title: "Minimum Order Value and Conditions",
          icons: ShoppingBag,
          url: "/marketing/min-order",
        },
        { title: "Downsell", icons: DownloadCloud, url: "/marketing/downsell" },
      ],
    },
    {
      title: "Your Wallet",
      url: "#",
      icon: Wallet,
      type: "collapsible",
      isActive: false,
      items: [
        { title: "Balance", icons: Wallet, url: "/dashboard/wallet" },
        {
          title: "Transactions",
          icons: ArrowLeftRight,
          url: "/dashboard/transactions",
        },
      ],
    },
    {
      title: "Manage My Website",
      url: "#",
      icon: LaptopMinimal,
      type: "collapsible",
      isActive: false,
      items: [
        { title: "Template", icons: SunMoon, url: "/dashboard/template" },
        {
          title: "Texts",
          icons: Highlighter,
          url: "/marketing/conversion",
        },
      ],
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
