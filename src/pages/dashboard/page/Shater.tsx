import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Brain,
  Target,
  Zap,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Shield,
  CheckCircle2,
  BarChart3,
  Cpu,
  Network,
  Lightbulb,
  Rocket,
  Settings2,
  LineChart,
  PieChart,
  Activity,
  Award,
  Clock,
  Search,
  Filter
} from "lucide-react";

function Shater() {
  const smartFeatures = [
    {
      icon: Brain,
      title: "A I- Powered  Matching",
      description: "Advanced algorithms analyze customer behavior for perfect product matches",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Target,
      title: "Precision  Targeting",
      description: "Reach the right audience with laser-focused recommendations",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Real-time  Processing",
      description: "Instant analysis and matching for immediate results",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "Performance  Analytics",
      description: "Track and optimize your matching success rates",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const matchingCapabilities = [
    {
      icon: Users,
      title: "Customer  Segmentation",
      description: "Automatically group customers based on behavior patterns",
      stats: "98%"
    },
    {
      icon: Network,
      title: "Product  Affinity",
      description: "Discover hidden connections between products",
      stats: "2.5x"
    },
    {
      icon: LineChart,
      title: "Trend  Prediction",
      description: "Anticipate market demands before they peak",
      stats: "85%"
    },
    {
      icon: Lightbulb,
      title: "Smart  Suggestions",
      description: "A I-driven recommendations that convert",
      stats: "40%"
    }
  ];

  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-6 p-6 pt-0">
        <Title
          title={"Shater  Your  Smart  Shater"}
          Subtitle={"Intelligent matching system powered by advanced  A I algorithms"}
          className="text-3xl"
          classNamee=""
        />

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent dark:from-primary/20 dark:via-accent/10 p-1 animate-fade-up">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          <div className="relative glass-card rounded-[22px] p-8 md:p-12">
            {/* Feature Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 dark:from-primary/20 dark:to-violet-500/20 border border-primary/20 backdrop-blur-sm">
                <Brain className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-semibold gradient-text">
                  {"A I- Powered  Smart  Matching"}
                </span>
                <Cpu className="w-5 h-5 text-violet-500 animate-pulse" />
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                {"Transform  Your  Business with"}
                <br />
                <span className="gradient-text">{"Intelligent  Matching"}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                {"Boost conversions"}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {[
                { icon: TrendingUp, value: "3x", label: "Conversion  Rate", color: "text-emerald-500" },
                { icon: Users, value: "50K+", label: "Matches  Daily", color: "text-blue-500" },
                { icon: Clock, value: "<1s", label: "Response  Time", color: "text-amber-500" },
                { icon: Award, value: "99.9%", label: "Accuracy  Rate", color: "text-violet-500" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-5 rounded-2xl bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <stat.icon className={`w-7 h-7 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {smartFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-2xl bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Start Matching */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/20 dark:to-teal-500/10 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/30 dark:to-teal-500/30 shadow-lg shadow-emerald-500/10">
                      <Rocket className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                      {"Get  Started"}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-foreground">
                    {"Start  Smart  Matching"}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {"Activate intelligent matching for your store and watch conversions soar"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-5">
                  <ul className="space-y-3">
                    {[
                      "One-click activation",
                      "Automatic product analysis",
                      "Real-time customer insights",
                      "No technical setup required"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 group/btn text-base font-semibold">
                    <Rocket className="w-5 h-5 mr-2" />
                    {"Activate  Matching"}
                    <ArrowRight className="w-5 h-5 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Configure Settings */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-violet-500/10 to-purple-500/5 dark:from-violet-500/20 dark:to-purple-500/10 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 dark:from-violet-500/30 dark:to-purple-500/30 shadow-lg shadow-violet-500/10">
                      <Settings2 className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold uppercase tracking-wider">
                      {"Configuration"}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-foreground">
                    {"Customize  Matching"}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {"Fine-tune algorithms and set preferences for optimal results"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-5">
                  {/* Quick Settings Preview */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Filter, label: "Filters" },
                      { icon: Target, label: "Rules" },
                      { icon: PieChart, label: "Analytics" },
                      { icon: Activity, label: "Monitor" }
                    ].map((action, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 transition-all duration-300 cursor-pointer group/item"
                      >
                        <action.icon className="w-5 h-5 text-violet-500 group-hover/item:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-foreground">{action.label}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 group/btn text-base font-semibold">
                    <Settings2 className="w-5 h-5 mr-2" />
                    {"Open  Settings"}
                    <ArrowRight className="w-5 h-5 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-muted/50 to-transparent p-1 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative glass-card rounded-[22px] p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{"Matching  Capabilities"}</h3>
                <p className="text-sm text-muted-foreground">{"Discover what intelligent matching can do for your business"}</p>
              </div>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all">
                <Search className="w-4 h-4 mr-2" />
                {"Explore  All  Features"}
              </Button>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {matchingCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-background/50 dark:bg-background/30 border border-gray-200 dark:border-gray-700 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                      <capability.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold gradient-text">{capability.stats}</div>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{capability.title}</h4>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20 text-sm">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">
              {"Trusted by 10"}
            </span>
            <Sparkles className="w-5 h-5 text-violet-500" />
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-md">
            {""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shater;

