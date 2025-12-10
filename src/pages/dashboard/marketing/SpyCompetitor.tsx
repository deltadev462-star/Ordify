import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Loader2, TrendingUp, AlertCircle, ShieldCheck, Globe, Clock, Zap, Target, BarChart3, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSEO } from "@/hooks/useSEO";

interface CompetitorAnalysis {
  overview: {
    url: string;
    domainAuthority: number;
    siteSpeed: number;
    mobileScore: number;
    monthlyTraffic: string;
    priceRange: { min: number; max: number };
    avgDiscount: number;
    productCount: number;
  };
  strengths: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  weaknesses: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
    timeline: string;
    category: string;
  }>;
  seo: {
    titleScore: number;
    metaScore: number;
    headingsScore: number;
    keywordDensity: number;
    backlinks: number;
  };
  marketing: {
    emailCapture: boolean;
    liveChatEnabled: boolean;
    socialMediaIntegration: string[];
    exitIntentPopup: boolean;
    affiliateProgram: boolean;
  };
}

export default function SpyCompetitor() {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<CompetitorAnalysis | null>(null);

  useSEO({
    title: t("spyCompetitor.seo.title"),
    description: t("spyCompetitor.seo.description")
  });

  const analyzeCompetitor = async () => {
    if (!url) return;
    
    setLoading(true);
    // Simulated analysis - in real app, this would call an API
    setTimeout(() => {
      setAnalysis({
        overview: {
          url: url,
          domainAuthority: 65,
          siteSpeed: 82,
          mobileScore: 78,
          monthlyTraffic: "250K",
          priceRange: { min: 19.99, max: 299.99 },
          avgDiscount: 15,
          productCount: 342
        },
        strengths: [
          {
            title: t("spyCompetitor.analysis.strengths.seo.title"),
            description: t("spyCompetitor.analysis.strengths.seo.description"),
            icon: "search"
          },
          {
            title: t("spyCompetitor.analysis.strengths.mobile.title"),
            description: t("spyCompetitor.analysis.strengths.mobile.description"),
            icon: "mobile"
          },
          {
            title: t("spyCompetitor.analysis.strengths.social.title"),
            description: t("spyCompetitor.analysis.strengths.social.description"),
            icon: "star"
          }
        ],
        weaknesses: [
          {
            title: t("spyCompetitor.analysis.weaknesses.promo.title"),
            description: t("spyCompetitor.analysis.weaknesses.promo.description"),
            icon: "alert"
          },
          {
            title: t("spyCompetitor.analysis.weaknesses.email.title"),
            description: t("spyCompetitor.analysis.weaknesses.email.description"),
            icon: "mail"
          },
          {
            title: t("spyCompetitor.analysis.weaknesses.checkout.title"),
            description: t("spyCompetitor.analysis.weaknesses.checkout.description"),
            icon: "clock"
          }
        ],
        recommendations: [
          {
            title: t("spyCompetitor.analysis.recommendations.exitIntent.title"),
            description: t("spyCompetitor.analysis.recommendations.exitIntent.description"),
            impact: "high",
            timeline: t("spyCompetitor.analysis.recommendations.exitIntent.timeline"),
            category: t("spyCompetitor.analysis.categories.conversion")
          },
          {
            title: t("spyCompetitor.analysis.recommendations.seo.title"),
            description: t("spyCompetitor.analysis.recommendations.seo.description"),
            impact: "high",
            timeline: t("spyCompetitor.analysis.recommendations.seo.timeline"),
            category: t("spyCompetitor.analysis.categories.seo")
          },
          {
            title: t("spyCompetitor.analysis.recommendations.referral.title"),
            description: t("spyCompetitor.analysis.recommendations.referral.description"),
            impact: "medium",
            timeline: t("spyCompetitor.analysis.recommendations.referral.timeline"),
            category: t("spyCompetitor.analysis.categories.marketing")
          },
          {
            title: t("spyCompetitor.analysis.recommendations.chat.title"),
            description: t("spyCompetitor.analysis.recommendations.chat.description"),
            impact: "medium",
            timeline: t("spyCompetitor.analysis.recommendations.chat.timeline"),
            category: t("spyCompetitor.analysis.categories.support")
          },
          {
            title: t("spyCompetitor.analysis.recommendations.bundles.title"),
            description: t("spyCompetitor.analysis.recommendations.bundles.description"),
            impact: "high",
            timeline: t("spyCompetitor.analysis.recommendations.bundles.timeline"),
            category: t("spyCompetitor.analysis.categories.pricing")
          }
        ],
        seo: {
          titleScore: 85,
          metaScore: 78,
          headingsScore: 90,
          keywordDensity: 72,
          backlinks: 1250
        },
        marketing: {
          emailCapture: true,
          liveChatEnabled: false,
          socialMediaIntegration: ["Facebook", "Instagram", "Pinterest"],
          exitIntentPopup: false,
          affiliateProgram: false
        }
      });
      setLoading(false);
    }, 2000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "medium": return "bg-warning/10 text-warning hover:bg-warning/20";
      case "low": return "bg-muted hover:bg-muted-hover";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          {t("spyCompetitor.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("spyCompetitor.subtitle")}
        </p>
      </div>

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle>{t("spyCompetitor.urlInput.title")}</CardTitle>
          <CardDescription>
            {t("spyCompetitor.urlInput.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="competitor-url">{t("spyCompetitor.urlInput.label")}</Label>
              <Input
                id="competitor-url"
                type="url"
                placeholder={t("spyCompetitor.urlInput.placeholder")}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              onClick={analyzeCompetitor}
              disabled={loading || !url}
              className="self-end"
            >
              {loading ? (
                <>
                  <Loader2 className="me-2 h-4 w-4 animate-spin" />
                  {t("spyCompetitor.urlInput.analyzing")}
                </>
              ) : (
                <>
                  <Search className="me-2 h-4 w-4" />
                  {t("spyCompetitor.urlInput.analyze")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <>
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("spyCompetitor.metrics.domainAuthority")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{analysis.overview.domainAuthority}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
                <Progress value={analysis.overview.domainAuthority} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("spyCompetitor.metrics.siteSpeed")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{analysis.overview.siteSpeed}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
                <Progress value={analysis.overview.siteSpeed} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("spyCompetitor.metrics.monthlyTraffic")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{analysis.overview.monthlyTraffic}</span>
                  <span className="text-sm text-muted-foreground">{t("spyCompetitor.metrics.visitors")}</span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span>{t("spyCompetitor.metrics.growth")}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("spyCompetitor.metrics.productCatalog")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{analysis.overview.productCount}</span>
                  <span className="text-sm text-muted-foreground">{t("spyCompetitor.metrics.products")}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  ${analysis.overview.priceRange.min} - ${analysis.overview.priceRange.max}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analysis Tabs */}
          <Tabs defaultValue="strengths" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="strengths">{t("spyCompetitor.tabs.strengths")}</TabsTrigger>
              <TabsTrigger value="weaknesses">{t("spyCompetitor.tabs.weaknesses")}</TabsTrigger>
              <TabsTrigger value="recommendations">{t("spyCompetitor.tabs.recommendations")}</TabsTrigger>
              <TabsTrigger value="detailed">{t("spyCompetitor.tabs.detailed")}</TabsTrigger>
            </TabsList>

            <TabsContent value="strengths" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-success" />
                    {t("spyCompetitor.strengths.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("spyCompetitor.strengths.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.strengths.map((strength, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-lg border bg-success/5 border-success/20">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-success" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{strength.title}</h4>
                        <p className="text-sm text-muted-foreground">{strength.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weaknesses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    {t("spyCompetitor.weaknesses.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("spyCompetitor.weaknesses.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.weaknesses.map((weakness, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-lg border bg-warning/5 border-warning/20">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-warning" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{weakness.title}</h4>
                        <p className="text-sm text-muted-foreground">{weakness.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t("spyCompetitor.recommendations.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("spyCompetitor.recommendations.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pe-4">
                    <div className="space-y-4">
                      {analysis.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="font-semibold flex-1">{rec.title}</h4>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className={getImpactColor(rec.impact)}>
                                {t(`spyCompetitor.impact.${rec.impact}`)} {t("spyCompetitor.impact.label")}
                              </Badge>
                              <Badge variant="outline">
                                <Clock className="me-1 h-3 w-3" />
                                {rec.timeline}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {rec.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* SEO Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      {t("spyCompetitor.seoAnalysis.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{t("spyCompetitor.seoAnalysis.titleTags")}</span>
                        <span className="text-sm font-medium">{analysis.seo.titleScore}%</span>
                      </div>
                      <Progress value={analysis.seo.titleScore} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{t("spyCompetitor.seoAnalysis.metaDescriptions")}</span>
                        <span className="text-sm font-medium">{analysis.seo.metaScore}%</span>
                      </div>
                      <Progress value={analysis.seo.metaScore} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{t("spyCompetitor.seoAnalysis.headingStructure")}</span>
                        <span className="text-sm font-medium">{analysis.seo.headingsScore}%</span>
                      </div>
                      <Progress value={analysis.seo.headingsScore} />
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{t("spyCompetitor.seoAnalysis.backlinks")}</span>
                      <span className="font-medium">{analysis.seo.backlinks.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Marketing Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      {t("spyCompetitor.marketingFeatures.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t("spyCompetitor.marketingFeatures.emailCapture")}</span>
                      <Badge variant={analysis.marketing.emailCapture ? "default" : "secondary"}>
                        {analysis.marketing.emailCapture ? t("spyCompetitor.status.active") : t("spyCompetitor.status.missing")}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t("spyCompetitor.marketingFeatures.liveChat")}</span>
                      <Badge variant={analysis.marketing.liveChatEnabled ? "default" : "secondary"}>
                        {analysis.marketing.liveChatEnabled ? t("spyCompetitor.status.active") : t("spyCompetitor.status.missing")}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t("spyCompetitor.marketingFeatures.exitIntent")}</span>
                      <Badge variant={analysis.marketing.exitIntentPopup ? "default" : "secondary"}>
                        {analysis.marketing.exitIntentPopup ? t("spyCompetitor.status.active") : t("spyCompetitor.status.missing")}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t("spyCompetitor.marketingFeatures.affiliateProgram")}</span>
                      <Badge variant={analysis.marketing.affiliateProgram ? "default" : "secondary"}>
                        {analysis.marketing.affiliateProgram ? t("spyCompetitor.status.active") : t("spyCompetitor.status.missing")}
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("spyCompetitor.marketingFeatures.socialMedia")}</span>
                      <div className="flex gap-1 mt-2">
                        {analysis.marketing.socialMediaIntegration.map((social, idx) => (
                          <Badge key={idx} variant="outline">{social}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Export Options */}
          <Alert className="bg-primary/5 border-primary/20">
            <Zap className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{t("spyCompetitor.export.prompt")}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  {t("spyCompetitor.export.report")}
                </Button>
                <Button size="sm">
                  {t("spyCompetitor.export.implement")}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}