import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  Search,
  Users,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Award
} from "lucide-react";

function MarketingServices() {
  const { t } = useTranslation();

  return (
    <div dir="rtl">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6 pt-0">
        <NotActive />
        <Title
          title={t("Marketing Services")}
          Subtitle={t("Connect with top-tier marketing professionals")}
          className="text-3xl"
          classNamee=""
        />

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent dark:from-primary/20 dark:via-accent/10 p-1 animate-fade-up">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
          <div className="relative glass-card rounded-[22px] p-8 md:p-12">
            {/* Partnership Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-semibold gradient-text">
                  {t("Official Partnership")}
                </span>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t("Ordify")} <span className="gradient-text">{t("×")}</span> {t("Top Media Buyers")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("Connect your store with verified marketing professionals. Track real results and grow your business with confidence.")}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              {[
                { icon: Users, value: "500+", label: t("Verified Marketers") },
                { icon: TrendingUp, value: "10K+", label: t("Successful Campaigns") },
                { icon: Award, value: "98%", label: t("Satisfaction Rate") }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-2xl bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* For Business Owners */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/20 dark:to-teal-500/10 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 dark:bg-emerald-500/30">
                      <BriefcaseBusiness className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                      {t("For Business")}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {t("Find Expert Marketers")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t("Connect with verified professionals who deliver results")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <ul className="space-y-3">
                    {[
                      t("Access verified marketing experts"),
                      t("View documented order achievements"),
                      t("Direct communication with marketers"),
                      t("Performance-based selection")
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group/btn">
                    <BriefcaseBusiness className="w-4 h-4 mr-2" />
                    {t("Post a Job")}
                    <ArrowRight className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* For Marketers */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-violet-500/10 to-purple-500/5 dark:from-violet-500/20 dark:to-purple-500/10 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-violet-500/20 dark:bg-violet-500/30">
                      <Search className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-medium">
                      {t("For Marketers")}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {t("Discover New Projects")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t("Browse opportunities and grow your portfolio")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <ul className="space-y-3">
                    {[
                      t("Free account creation"),
                      t("Link your EasyOrders stores"),
                      t("Showcase documented results"),
                      t("No commissions or fees")
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-violet-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 group/btn">
                    <Search className="w-4 h-4 mr-2" />
                    {t("Browse Jobs")}
                    <ArrowRight className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Trust Badge */}
            <div className="flex justify-center mt-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground text-sm">
                <Shield className="w-4 h-4 text-primary" />
                {t("All marketers are verified and documented")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketingServices;
