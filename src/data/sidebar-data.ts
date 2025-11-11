import {
  AudioWaveform,
  Blocks,
  ChartLine,
  Command,
  CornerLeftUpIcon,
  DownloadCloud,
  Files,
  Filter,
  Frame,
  GalleryVerticalEnd,
  Map,
  Megaphone,
  MessageSquareDot,
  Network,
  Package,
  PackageOpen,
  PackageSearch,
  PhoneOff,
  PieChart,
  Popcorn,
  Rss,
  Settings,
  Share2,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Star,
  Tag,
  Tags,
  Target,
  Users,
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
          url: "/dashboard/",
        },
        {
          title: "Missed Order",
          icons: PackageSearch,
          url: "#",
        },
        {
          title: "Blocked Numbers",
          icons: ShoppingBasket,
          url: "/blocked-numbers",
        },
        {
          title: "Blocked OTP Numbers",
          icons: PhoneOff,
          url: "/blocked-otp-numbers",
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
          url: "/dashboard/",
        },
        {
          title: "Categories",
          icons: Blocks,
          url: "#",
        },
        {
          title: "Reviews",
          icons: Star,
          url: "/blocked-numbers",
        },
        {
          title: "Product Feed",
          icons: MessageSquareDot,
          url: "/blocked-otp-numbers",
        },
        {
          title: "Easy Catalog",
          icons: Files,
          url: "/blocked-otp-numbers",
        },
      ],
    },
    {
      type: "link",
      title: "Funnels",
      url: "/dashboard",
      icon: Filter,
    },
    {
      type: "link",
      title: "Shater Your Smart Shater",
      url: "/dashboard",
      icon: Blocks,
    },
    {
      title: "Marketing Tools",
      url: "#",
      icon: Megaphone,
      // collapsible: true,
      type: "collapsible",
      isActive: true,
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
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
} as const;

export const navItems = [...sidebarData.links];
