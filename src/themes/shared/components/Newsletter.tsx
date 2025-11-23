import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface NewsletterProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubscribe?: (email: string) => void;
  variant?: "default" | "minimal" | "luxe" | "modern";
  className?: string;
}

export const Newsletter = ({
  title,
  description,
  placeholder,
  buttonText,
  onSubscribe,
  variant = "default",
  className = "",
}: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { t } = useTranslation();
  
  // Use default values from translations if not provided
  const displayTitle = title || t("subscribeNewsletter");
  const displayDescription = description || t("newsletterDescription");
  const displayPlaceholder = placeholder || t("enterEmail");
  const displayButtonText = buttonText || t("subscribe");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await onSubscribe?.(email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "minimal") {
    return (
      <div className={`py-12 ${className}`}>
        <div className="mx-auto max-w-xl text-center">
          <Mail className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-2xl font-bold text-gray-900">{displayTitle}</h3>
          <p className="mb-6 text-gray-600">{displayDescription}</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={displayPlaceholder}
              required
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || isSubscribed}>
              {isSubscribed ? t("subscribed") : displayButtonText}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (variant === "luxe") {
    return (
      <Card className={`border-0 bg-linear-to-r from-gray-900 to-gray-800 text-white ${className}`}>
        <CardContent className="p-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="mb-3 font-serif text-3xl font-light tracking-wide">
              {displayTitle}
            </h3>
            <div className="mx-auto mb-6 h-px w-24 bg-white/30" />
            <p className="mb-8 text-white/80">{displayDescription}</p>
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={displayPlaceholder}
                required
                className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={isLoading || isSubscribed}
                className="bg-white text-gray-900 hover:bg-white/90"
              >
                {isSubscribed ? t("subscribed") : displayButtonText}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "modern") {
    return (
      <Card className={`border-0 bg-linear-to-br from-blue-600 to-purple-600 text-white ${className}`}>
        <CardContent className="p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-2xl font-bold md:text-3xl">{displayTitle}</h3>
              <p className="text-white/90">{displayDescription}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={displayPlaceholder}
                required
                className="flex-1 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={isLoading || isSubscribed}
                className="bg-white text-gray-900 hover:bg-white/90"
              >
                {isSubscribed ? t("subscribedCheck") : displayButtonText}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={className}>
      <CardContent className="p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <Mail className="mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-2 text-2xl font-bold text-gray-900">{displayTitle}</h3>
            <p className="text-gray-600">{displayDescription}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={displayPlaceholder}
              required
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || isSubscribed}>
              {isSubscribed ? "✓" : displayButtonText}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
