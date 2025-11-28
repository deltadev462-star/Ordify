import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const SignupForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = t('signup.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('signup.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('signup.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('signup.passwordRequired');
    } else if (!validatePassword(formData.password)) {
      newErrors.password = t('signup.passwordMinLength');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('signup.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('signup.passwordsDoNotMatch');
    }

    if (!acceptTerms) {
      newErrors.terms = t('signup.termsRequired');
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    toast({
      title: t('signup.accountCreatedTitle'),
      description: t('signup.accountCreatedDescription'),
    });
  };

  const handleGoogleSignup = () => {
    toast({
      title: t('signup.googleSignUpTitle'),
      description: t('signup.googleSignUpDescription'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {t('signup.fullName')}
        </label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            id="name"
            type="text"
            placeholder={t('signup.fullNamePlaceholder')}
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`pl-11 input-glow ${errors.name ? "border-destructive" : ""} `}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive animate-fade-up">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t('signup.emailAddress')}
        </label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            id="email"
            type="email"
            placeholder={t('signup.emailPlaceholder')}
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`pl-11 input-glow ${errors.email ? "border-destructive" : ""}`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive animate-fade-up">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          {t('signup.password')}
        </label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t('signup.passwordPlaceholder')}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={`pl-11 pr-11 input-glow ${errors.password ? "border-destructive" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? t('signup.hidePassword') : t('signup.showPassword')}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive animate-fade-up">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
          {t('signup.confirmPassword')}
        </label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t('signup.confirmPasswordPlaceholder')}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className={`pl-11 pr-11 input-glow ${errors.confirmPassword ? "border-destructive" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirmPassword ? t('signup.hidePassword') : t('signup.showPassword')}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-destructive animate-fade-up">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => {
              setAcceptTerms(checked as boolean);
              setErrors((prev) => ({ ...prev, terms: "" }));
            }}
            className="mt-0.5"
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
          >
            {t('signup.agreeToTerms')}{" "}
            <a href="#" className="text-primary hover:underline">
              {t('signup.termsOfService')}
            </a>{" "}
            {t('signup.and')}{" "}
            <a href="#" className="text-primary hover:underline">
              {t('signup.privacyPolicy')}
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-xs text-destructive animate-fade-up">{errors.terms}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full font-semibold "
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {t('signup.creatingAccount')}
          </>
        ) : (
          t('signup.createAccountButton')
        )}
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">{t('signup.orContinueWith')}</span>
        </div>
      </div>

      {/* Google Button */}
      <Button
        type="button"
        variant="social"
        className="w-full"
        size="lg"
        onClick={handleGoogleSignup}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {t('signup.continueWithGoogle')}
      </Button>

      {/* Sign in link */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        {t('signup.alreadyHaveAccount')}{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          {t('signup.signIn')}
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
