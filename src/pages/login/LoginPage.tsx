import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, Loader2, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import BackgroundElements from "../signup/BackgroundElements";
import { AnimatedThemeToggler } from "../../components/ui/AnimatedThemeToggler";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginRequest } from "@/store/slices/auth/actions";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    loading,
    isAuthenticated,
    token,
    error: serverError,
  } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [lottieAnimation, setLottieAnimation] = useState<any>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  // Load Lottie animation
  useEffect(() => {
    fetch("/lottie/Live chatbot.json")
      .then((res) => res.json())
      .then((data) => setLottieAnimation(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      navigate("/");
    }
  }, [isAuthenticated, token, navigate]);

  // Update server error message when error changes
  useEffect(() => {
    if (serverError) {
      setServerErrorMessage(serverError);
    }
  }, [serverError]);

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .required(t('validation.emailRequired'))
      .email(t('validation.invalidEmail')),
    password: Yup.string()
      .required(t('validation.passwordRequired'))
      .min(6, t('validation.passwordLength')),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // Clear any previous server errors
      setServerErrorMessage("");
      try {
        const resultAction = await dispatch(
          loginRequest({
            email: values.email,
            password: values.password,
          })
        );

        if (loginRequest.fulfilled.match(resultAction)) {
          // Save to localStorage if remember me is checked
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", values.email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          // Clear server error on success
          setServerErrorMessage("");

          // Navigation will be handled by the useEffect watching isAuthenticated
        } else if (loginRequest.rejected.match(resultAction)) {
          // Error is already set in the state via serverError
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      formik.setFieldValue("email", rememberedEmail);
      setRememberMe(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGoogleLogin = () => {
    // For now, just show inline message instead of implementing Google auth
    setServerErrorMessage("Google authentication would be integrated here.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <BackgroundElements />

      {/* Header Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <AnimatedThemeToggler className="p-1 w-8 h-8 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-300 text-foreground dark:text-white" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div
          className="text-center mb-8 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 gradient-border">
            {lottieAnimation ? (
              <Lottie
                animationData={lottieAnimation}
                loop={true}
                autoplay={true}
                className="w-20 h-20"
              />
            ) : (
              <LogIn className="w-7 h-7 text-primary" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('auth.welcomeBack')}{" "}
            <span className="gradient-text">Ordify</span>
          </h1>
          <p className="text-muted-foreground">
            {t('auth.signInToManageStore')}
          </p>
        </div>

        {/* Glass Card Form */}
        <div
          className="glass-card rounded-2xl p-8 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Server Error Message */}
            {serverErrorMessage && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-fade-up">
                <p className="text-sm text-destructive">{serverErrorMessage}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                {t('auth.email')}
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  {...formik.getFieldProps("email")}
                  className={`pl-11 input-glow ${
                    formik.touched.email && formik.errors.email
                      ? "border-destructive"
                      : ""
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-destructive animate-fade-up">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                {t('auth.password')}
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t('auth.passwordPlaceholder')}
                  {...formik.getFieldProps("password")}
                  className={`pl-11 pr-11 input-glow ${
                    formik.touched.password && formik.errors.password
                      ? "border-destructive"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showPassword
                      ? t('auth.hidePassword')
                      : t('auth.showPassword')
                  }
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-destructive animate-fade-up">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {t('auth.rememberMe')}
                </label>
              </div>
              <a
                href="#forgot"
                className="text-sm text-primary hover:underline"
              >
                {t('auth.forgotPassword')}
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full font-semibold"
              size="lg"
              disabled={loading || formik.isSubmitting}
            >
              {loading || formik.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  {t('auth.signingIn')}
                </>
              ) : (
                t('auth.signIn')
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">
                  {t('auth.orContinueWith')}
                </span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              type="button"
              variant="social"
              className="w-full"
              size="lg"
              onClick={handleGoogleLogin}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
              {t('auth.google')}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {t('auth.newToOrdify')}{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              {t('auth.createYourStore')}
            </Link>
          </p>
        </div>

        {/* Footer with features */}
        <div
          className="mt-8 grid grid-cols-3 gap-4 text-center animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">50k+</p>
            <p className="text-xs text-muted-foreground">{t('auth.activeMerchants')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">99.9%</p>
            <p className="text-xs text-muted-foreground">{t('auth.uptimeSLA')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">24/7</p>
            <p className="text-xs text-muted-foreground">{t('auth.support')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
