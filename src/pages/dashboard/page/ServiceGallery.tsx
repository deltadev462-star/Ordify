import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Image,
  Upload,
  Grid3X3,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  Palette,
  Zap,
  FolderOpen,
  Star,
  TrendingUp,
  ImagePlus,
  Settings2
} from "lucide-react";

function ServiceGallery() {
  const { t } = useTranslation();

  const galleryFeatures = [
    {
      icon: Grid3X3,
      title: t("Smart Grid Layout"),
      description: t("Automatically arrange your images in stunning grid layouts"),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: t("Fast Loading"),
      description: t("Optimized images for lightning-fast page loads"),
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Palette,
      title: t("Custom Styling"),
      description: t("Match your brand with customizable gallery themes"),
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Eye,
      title: t("Lightbox Preview"),
      description: t("Beautiful fullscreen image viewing experience"),
      color: "from-violet-500 to-purple-500"
    }
  ];

  const sampleGalleryItems = [
    { id: 1, gradient: "from-primary/20 to-accent/20" },
    { id: 2, gradient: "from-emerald-500/20 to-teal-500/20" },
    { id: 3, gradient: "from-violet-500/20 to-purple-500/20" },
    { id: 4, gradient: "from-amber-500/20 to-orange-500/20" },
    { id: 5, gradient: "from-pink-500/20 to-rose-500/20" },
    { id: 6, gradient: "from-blue-500/20 to-cyan-500/20" }
  ];

  return (
    <div dir="rtl">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6 pt-0">
        <Title
          title={t("Service Gallery")}
          Subtitle={t("Design and optimize your sales Service Gallery")}
          className="text-3xl"
          classNamee=""
        />

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent dark:from-primary/20 dark:via-accent/10 p-1 animate-fade-up">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
          <div className="relative glass-card rounded-[22px] p-8 md:p-12">
            {/* Feature Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 dark:bg-primary/20 border border-gray-200 dark:border-gray-700">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-semibold gradient-text">
                  {t("Professional Gallery System")}
                </span>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t("Showcase Your")} <span className="gradient-text">{t("Products")}</span> {t("Beautifully")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("Create stunning visual galleries that captivate your customers and drive sales. Easy to manage, beautiful to view.")}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              {[
                { icon: Image, value: "1000+", label: t("Images Supported") },
                { icon: TrendingUp, value: "3x", label: t("Engagement Boost") },
                { icon: Star, value: "4.9", label: t("User Rating") }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-2xl bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {galleryFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-2xl bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Gallery */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/20 dark:to-teal-500/10 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 dark:bg-emerald-500/30">
                      <Upload className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                      {t("Quick Upload")}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {t("Upload Images")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t("Drag and drop or browse to add images to your gallery")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  {/* Upload Zone Preview */}
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-colors">
                    <ImagePlus className="w-8 h-8 mx-auto mb-2 text-emerald-500/60" />
                    <p className="text-sm text-muted-foreground">{t("Drop images here or click to browse")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("Supports JPG, PNG, WebP up to 10MB")}</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group/btn">
                    <Upload className="w-4 h-4 mr-2" />
                    {t("Upload Images")}
                    <ArrowRight className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Manage Gallery */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-violet-500/10 to-purple-500/5 dark:from-violet-500/20 dark:to-purple-500/10 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-violet-500/20 dark:bg-violet-500/30">
                      <Settings2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-medium">
                      {t("Management")}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {t("Manage Gallery")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t("Organize, edit and customize your gallery settings")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: FolderOpen, label: t("Categories") },
                      { icon: Layers, label: t("Arrange") },
                      { icon: Palette, label: t("Themes") },
                      { icon: Eye, label: t("Preview") }
                    ].map((action, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 transition-colors cursor-pointer"
                      >
                        <action.icon className="w-4 h-4 text-violet-500" />
                        <span className="text-sm text-foreground">{action.label}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 group/btn">
                    <Settings2 className="w-4 h-4 mr-2" />
                    {t("Open Manager")}
                    <ArrowRight className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Gallery Preview Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-muted/50 to-transparent p-1 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative glass-card rounded-[22px] p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{t("Gallery Preview")}</h3>
                <p className="text-sm text-muted-foreground">{t("Preview how your gallery will look to customers")}</p>
              </div>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                <Eye className="w-4 h-4 mr-2" />
                {t("View Full Gallery")}
              </Button>
            </div>

            {/* Sample Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sampleGalleryItems.map((item) => (
                <div
                  key={item.id}
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${item.gradient} border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex items-center justify-center group`}
                >
                  <div className="text-center">
                    <Image className="w-8 h-8 mx-auto text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
                    <span className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("Add Image")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State Message */}
            <div className="text-center mt-6 p-6 rounded-2xl bg-muted/30 border border-dashed border-gray-200 dark:border-gray-700">
              <Layers className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">{t("Your gallery is empty. Start by uploading some images!")}</p>
              <Button className="mt-4" variant="outline">
                <ImagePlus className="w-4 h-4 mr-2" />
                {t("Add Your First Image")}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            {t("Pro tip: High-quality images increase conversion by up to 40%")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceGallery;
