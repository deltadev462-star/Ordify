import NotActive from "@/components/NotActive";
import { useState } from "react";
import {
  Wallet2,
  CreditCard,
  Sparkles,
  Shield,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Info,
  Zap,
  Crown,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function Wallet() {
  const features = [
    { text: "Lifetime  Balance", icon: Clock },
    { text: "Only 4 cents deducted per order", icon: DollarSign },
    { text: "Your store will remain activated for life", icon: Shield },
    { text: "No expiration date for the balance", icon: Sparkles },
  ];
  
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  
  const tabs = [
    {
      title: "Popular  Plans",
      icon: <Star className="h-5 w-5" />,
      description: "Most chosen by merchants"
    },
    {
      title: "All  Plans",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Browse all available options"
    },
  ];

  const paymentPlans = {
    popular: [
      { amount: 20, bonus: 25, badge: "Most  Popular", color: "from-blue-500 to-purple-600" },
      { amount: 50, bonus: 65, badge: "Best  Value", color: "from-purple-500 to-pink-600" },
      { amount: 100, bonus: 135, badge: "Pro  Choice", color: "from-orange-500 to-red-600" },
    ],
    all: [
      { amount: 10, bonus: 12, badge: "Starter", color: "from-green-500 to-emerald-600" },
      { amount: 25, bonus: 32, badge: "Basic", color: "from-cyan-500 to-blue-600" },
      { amount: 200, bonus: 280, badge: "Enterprise", color: "from-indigo-500 to-purple-600" },
      { amount: 500, bonus: 750, badge: "Ultimate", color: "from-yellow-500 to-orange-600" },
    ]
  };

  const stats = [
    { label: "Total  Orders", value: "1,234", trend: "+12%", isUp: true },
    { label: "Daily  Cost", value: "$4.94", trend: "-8%", isUp: false },
    { label: "Days  Remaining", value: "∞", trend: "Lifetime", isUp: true },
  ];

  return (
    <div className="min-h-screen  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active Status Alert */}
        <NotActive />
        
        {/* Modern Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-700/25"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
                <Wallet2 className="h-8 w-8" />
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-3 py-1">
                <Zap className="h-3 w-3 mr-1" />
                {"Active"}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {"Wallet"}
            </h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
              {"This page displays your balance"}
            </p>
          </div>
        </div>

        {/* Balance Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Balance Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white col-span-1 lg:col-span-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <CardHeader className="relative pb-3">
              <CardTitle className="text-lg font-medium text-white/90 flex items-center gap-2">
                <Wallet2 className="h-5 w-5" />
                {"Your  Current  Balance"}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <div>
                <p className="text-5xl font-bold">$0.000</p>
                <p className="text-sm text-white/70 mt-1">{"Available for use"}</p>
              </div>
              
              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs text-white/70">{stat.label}</p>
                    <p className="text-lg font-semibold mt-1">{stat.value}</p>
                    <div className={cn(
                      "text-xs flex items-center justify-center gap-1 mt-1",
                      stat.isUp ? "text-green-200" : "text-red-200"
                    )}>
                      {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Due Amount Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-24 -translate-y-24"></div>
            <CardHeader className="relative pb-3">
              <CardTitle className="text-lg font-medium text-white/90 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {"Due  Amount"}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div>
                <p className="text-4xl font-bold">$0.00</p>
                <p className="text-sm text-white/70 mt-1">{"No pending dues"}</p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Info className="h-4 w-4 text-white/70" />
                <p className="text-xs text-white/70">{"Updated real-time"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shrink-0">
                <Info className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{"How it works"}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {"Your current balance is the available amount in your account"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Plans Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {"Select  Payment  Method"}
          </h2>
          
          {/* Modern Tabs */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-1">
            <div className="flex flex-col sm:flex-row gap-1">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg transition-all duration-300",
                    activeTab === index
                      ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg",
                    activeTab === index ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
                  )}>
                    {tab.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{tab.title}</p>
                    <p className={cn(
                      "text-xs",
                      activeTab === index ? "text-white/80" : "text-muted-foreground"
                    )}>
                      {tab.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 0 && paymentPlans.popular.map((plan, index) => (
              <ModernPaymentCard
                key={index}
                amount={plan.amount}
                totalAmount={plan.bonus}
                badge={plan.badge}
                features={features}
                gradient={plan.color}
                isSelected={selectedAmount === plan.amount}
                onSelect={() => setSelectedAmount(plan.amount)}
                buttonText={"Charge  Your  Wallet"}
                popular={index === 1}
              />
            ))}
            
            {activeTab === 1 && paymentPlans.all.map((plan, index) => (
              <ModernPaymentCard
                key={index}
                amount={plan.amount}
                totalAmount={plan.bonus}
                badge={plan.badge}
                features={features}
                gradient={plan.color}
                isSelected={selectedAmount === plan.amount}
                onSelect={() => setSelectedAmount(plan.amount)}
                buttonText={"Charge  Your  Wallet"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Modern Payment Card Component
function ModernPaymentCard({
  amount,
  totalAmount,
  badge,
  features,
  gradient,
  isSelected,
  onSelect,
  buttonText,
  popular = false
}: {
  amount: number;
  totalAmount: number;
  badge: string;
  features: Array<{ text: string; icon: React.ComponentType<{ className?: string }> }>;
  gradient: string;
  isSelected: boolean;
  onSelect: () => void;
  buttonText: string;
  popular?: boolean;
}) {
  const savings = totalAmount - amount;
  const savingsPercentage = Math.round((savings / amount) * 100);
  
  return (
    <div className={cn(
      "relative group transition-all duration-300",
      popular && "lg:scale-105 z-10"
    )}>
      {popular && (
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
      )}
      
      <Card className={cn(
        "relative overflow-hidden border-0 shadow-xl transition-all duration-300 h-full",
        "hover:shadow-2xl hover:-translate-y-1",
        isSelected && "ring-4 ring-primary shadow-primary/25",
        popular && "border-2 border-yellow-400"
      )}>
        {/* Badge */}
        <div className={cn(
          "absolute top-4 right-4 z-10"
        )}>
          <Badge className={cn(
            "px-3 py-1 shadow-lg",
            popular 
              ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0"
              : "bg-white/90 dark:bg-gray-900/90 backdrop-blur"
          )}>
            {popular && <Crown className="h-3 w-3 mr-1" />}
            {badge}
          </Badge>
        </div>
        
        {/* Background Gradient */}
        <div className={cn(
          "absolute inset-0 opacity-10 dark:opacity-20 bg-gradient-to-br",
          gradient
        )}></div>
        
        <CardHeader className="relative pb-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{"Pay only"}</p>
              <p className="text-4xl font-bold">${amount}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{"Get"}</p>
              <p className="text-2xl font-semibold text-primary">${totalAmount}</p>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                {"Save"} {savingsPercentage}%
              </Badge>
            </div>
            
            <Progress value={savingsPercentage} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="relative space-y-6 pt-4">
          <div className="space-y-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature.text}</span>
                </div>
              );
            })}
          </div>
          
          <Button
            onClick={onSelect}
            className={cn(
              "w-full font-semibold shadow-lg transition-all duration-300",
              "hover:shadow-xl hover:scale-[1.02]",
              isSelected 
                ? "bg-gradient-to-r from-primary to-primary/90"
                : `bg-gradient-to-r ${gradient} hover:opacity-90`
            )}
          >
            {buttonText}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Wallet;
