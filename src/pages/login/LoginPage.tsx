import { useState, useEffect, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import DotGrid from '../../components/DotGrid';
import { AnimatedThemeToggler } from '../../components/ui/AnimatedThemeToggler';
import LangSwitcher from '../../components/LangSwitcher';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  
  // State for Lottie animations
  const [lottieAnimations, setLottieAnimations] = useState<{
    growSales: any;
    manageProducts: any;
    launchFast: any;
  }>({
    growSales: null,
    manageProducts: null,
    launchFast: null,
  });

  // Load Lottie animations
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const [growSales, manageProducts, launchFast] = await Promise.all([
          fetch('/lottie/growSales.json').then(res => res.json()),
          fetch('/lottie/manageProducts.json').then(res => res.json()),
          fetch('/lottie/launchFast.json').then(res => res.json()),
        ]);
        
        setLottieAnimations({
          growSales,
          manageProducts,
          launchFast,
        });
      } catch (error) {
        console.error('Failed to load Lottie animations:', error);
      }
    };

    loadAnimations();
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = t('login.emailRequired');
    } else if (!validateEmail(email)) {
      newErrors.email = t('login.emailInvalid');
    }
    if (!password) {
      newErrors.password = t('login.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('login.passwordMinLength');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    console.log('Login attempt:', { email, rememberMe });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  const features = [
    { 
      animation: lottieAnimations.launchFast, 
      title: t('login.feature1Title'), 
      desc: t('login.feature1Desc'), 
      color: 'from-primary to-primary-glow' 
    },
    { 
      animation: lottieAnimations.manageProducts, 
      title: t('login.feature2Title'), 
      desc: t('login.feature2Desc'), 
      color: 'from-primary-glow to-accent' 
    },
    { 
      animation: lottieAnimations.growSales, 
      title: t('login.feature3Title'), 
      desc: t('login.feature3Desc'), 
      color: 'from-accent to-primary' 
    },
  ];

  return (
    <div className="h-screen w-full overflow-hidden relative flex items-center justify-center">
      {/* Animated DotGrid background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#5227FF"
          activeColor="#8b5cf6"
          proximity={75}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Background linear overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black/90  via-black/90 to-black/90" style={{ zIndex: 1 }} />

      {/* Header Controls */}
      <div className="absolute top-0 left-0 w-fit rounded-full right-0 h-12 flex justify-end items-center px-4 z-10 bg-black/20 dark:bg-black/40 backdrop-blur-sm">
        <div className="flex gap-1">
          <LangSwitcher />
          <AnimatedThemeToggler className="p-1 w-8 h-8 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-300 text-foreground dark:text-white" />
        </div>
      </div>

      {/* Desktop: Brand panel (left side) */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-16 lg:py-24 relative" style={{ zIndex: 2 }}>
        <div className="max-w-md">
          {/* Enhanced Ordify wordmark */}
          <div className="mb-12 relative">
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary-glow opacity-20 blur-2xl" />
            <h1 className="relative text-6xl font-display font-bold text-white mb-3 tracking-tight
              bg-linear-to-br from-white to-white/80 bg-clip-text">
              Ordify
              <Sparkles className="inline-block w-8 h-8 ml-2 text-primary-glow animate-pulse" />
            </h1>
            <p className="text-white/80 text-lg font-light relative">
              {t('login.buildAndGrowStore')}
            </p>
          </div>

          {/* Enhanced value props with Lottie animations */}
          <div className="space-y-7">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 group cursor-pointer transform transition-all duration-300 hover:translate-x-2">
                <div className="relative">
                  <div className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
                  <div className="relative w-18 h-18 transition-transform group-hover:scale-110">
                    {item.animation ? (
                      <Lottie
                        animationData={item.animation}
                        loop={true}
                        autoplay={true}
                        className="w-full h-full"
                      />
                    ) : (
                      // Fallback while loading
                      <div className="w-full h-full rounded-lg bg-white/10 animate-pulse" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-primary-glow transition-colors">{item.title}</h3>
                  <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">{item.desc}</p>
                  <div className="h-0.5 w-0 bg-linear-to-r from-primary to-primary-glow group-hover:w-full transition-all duration-500 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Auth card with premium glassmorphism */}
      <div className="w-full max-w-lg aspect-square mx-4  lg:mx-16 lg:mr-24 relative" style={{ zIndex: 2 }}>
        <div className="relative group">
         
          
          {/* Premium glass card */}
          <div className="relative
            bg-white/80 dark:bg-black/5
            backdrop-blur-3xl backdrop-saturate-[2]
            rounded-3xl p-8 sm:p-10 w-full
            bg-linear-to-br from-white/10 to-white/5
            shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
            border border-white/18 dark:border-white/6
            animate-fade-slide-up
           ">
            
            {/* Mobile: Ordify wordmark */}
            <div className="lg:hidden mb-8 text-center">
              <h1 className="text-3xl font-display font-bold mb-2 bg-linear-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Ordify
              </h1>
              <p className="text-muted-foreground text-sm">{t('login.buildAndGrowStore')}</p>
            </div>

            {/* Enhanced Heading with better glass effect */}
            <div className="text-center mb-8">
              <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/40 to-primary-glow/40 blur-xl animate-pulse" />
                <div className="relative flex items-center justify-center w-full h-full rounded-full
                  bg-linear-to-br from-white/10 to-white/5
                  backdrop-blur-xl border border-white/20 dark:border-white/10
                  shadow-lg shadow-primary/10">
                  <Lock className="w-8 h-8 text-primary drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                </div>
              </div>
              <h2 className="text-2xl font-display font-bold mb-2
                text-slate-800 dark:text-white
                drop-shadow-sm">
                {t('login.welcomeBack')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                {t('login.signInToManageStore')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 " noValidate>
              {/* Enhanced Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold mb-2 flex items-center gap-2
                  text-slate-700 dark:text-slate-200">
                  <Mail className={`w-4 h-4 transition-all ${isFocused.email ? 'text-primary scale-110' : 'text-slate-500 dark:text-slate-400'}`} />
                  {t('login.emailAddress')}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused({ ...isFocused, email: true })}
                    onBlur={() => setIsFocused({ ...isFocused, email: false })}
                    className={`w-full px-4 py-3 pl-11
                      bg-white/10 dark:bg-black/20
                      backdrop-blur-sm
                      border rounded-xl
                      text-foreground dark:text-white
                      placeholder:text-muted-foreground/50 dark:placeholder:text-white/30
                      focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                      transition-all duration-300
                      ${errors.email ? 'border-destructive shake-animation bg-destructive/5' : 'border-white/20 dark:border-white/10'}
                      ${isFocused.email ? 'shadow-lg shadow-primary/20 bg-white/15 dark:bg-black/30' : ''}
                      hover:bg-white/15 dark:hover:bg-black/25`}
                    placeholder={t('login.emailPlaceholder')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors
                    ${isFocused.email ? 'text-primary drop-shadow-sm' : 'text-muted-foreground/60 dark:text-white/40'}`} />
                  {email && !errors.email && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success animate-fade-in">
                      ✓
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p id="email-error" className="text-destructive text-xs mt-1.5 flex items-center gap-1" role="alert">
                    <span className="w-1 h-1 bg-destructive rounded-full animate-pulse" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Enhanced Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className=" text-sm font-semibold mb-2 flex items-center gap-2
                  text-slate-700 dark:text-slate-200">
                  <Lock className={`w-4 h-4 transition-all ${isFocused.password ? 'text-primary scale-110' : 'text-slate-500 dark:text-slate-400'}`} />
                  {t('login.password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused({ ...isFocused, password: true })}
                    onBlur={() => setIsFocused({ ...isFocused, password: false })}
                    className={`w-full px-4 py-3 pl-11 pr-12
                      bg-white/10 dark:bg-black/20
                      backdrop-blur-sm
                      border rounded-xl
                      text-foreground dark:text-white
                      placeholder:text-muted-foreground/50 dark:placeholder:text-white/30
                      focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                      transition-all duration-300
                      ${errors.password ? 'border-destructive shake-animation bg-destructive/5' : 'border-white/20 dark:border-white/10'}
                      ${isFocused.password ? 'shadow-lg shadow-primary/20 bg-white/15 dark:bg-black/30' : ''}
                      hover:bg-white/15 dark:hover:bg-black/25`}
                    placeholder={t('login.passwordPlaceholder')}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors
                    ${isFocused.password ? 'text-primary drop-shadow-sm' : 'text-muted-foreground/60 dark:text-white/40'}`} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                      text-muted-foreground/60 dark:text-white/40
                      hover:text-foreground dark:hover:text-white
                      transition-all duration-200 p-1 hover:bg-white/10 rounded-lg"
                    aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-destructive text-xs mt-1.5 flex items-center gap-1" role="alert">
                    <span className="w-1 h-1 bg-destructive rounded-full animate-pulse" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Enhanced Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50
                        cursor-pointer transition-all duration-200 group-hover:scale-110
                        peer"
                    />
                    <div className="absolute inset-0 rounded bg-primary/20 scale-0 peer-checked:scale-150
                      transition-transform duration-300 -z-10 blur-sm" />
                  </div>
                  <span className="text-foreground/90 dark:text-white/80 select-none group-hover:text-primary transition-colors">
                    {t('login.rememberMe')}
                  </span>
                </label>
                <a
                  href="#forgot"
                  className="text-primary/90 hover:text-primary font-medium
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-primary rounded px-1 transition-all duration-200
                    hover:underline hover:underline-offset-4 drop-shadow-sm"
                >
                  {t('login.forgotPassword')}
                </a>
              </div>

              {/* Enhanced Sign in button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full
                
                   font-bold py-4 rounded-xl
                
               
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5
                  active:scale-[0.98]
                  group overflow-hidden bg-white/50 border-white/50 text-black/80
                 
                  hover:before:opacity-100 before:transition-opacity before:duration-300"
              >
            
                
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('login.signingIn')}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {t('login.signIn')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>

              {/* Enhanced Divider */}
              <div className="relative my-8">
                <div className="absolute  flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white/10 dark:bg-black/20 backdrop-blur-xl px-4 py-1.5 rounded-full
                    text-muted-foreground/80 dark:text-white/60
                    border border-white/20 dark:border-white/10">
                    {t('login.orContinueWith')}
                  </span>
                </div>
              </div>

              {/* Enhanced Social login buttons */}
              <div className="">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="relative flex items-center justify-center gap-2 px-4 py-3 w-full
                    bg-white/10 dark:bg-black/20
                    backdrop-blur-sm
                    border border-white/50 dark:border-white/10 rounded-xl
                    hover:bg-white/50 dark:hover:bg-black/30
                    hover:border-white/50 dark:hover:border-white/20
                    hover:shadow-lg hover:shadow-black/10
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-[#4285F4]/10 to-[#34A853]/10
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium relative z-10 text-foreground/90 dark:text-white/90">{t('login.google')}</span>
                </button>

               
              </div>
            </form>

            {/* Enhanced Sign up link with better colors */}
            <p className="text-center text-sm text-muted-foreground/80 dark:text-white/60 mt-8">
              {t('login.newToOrdify')}{' '}
              <Link
                to="/signup"
                className="relative text-primary/90 hover:text-primary font-semibold
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1
                  transition-colors duration-200 group drop-shadow-sm"
              >
                {t('login.createYourStore')}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-primary-glow
                  group-hover:w-full transition-all duration-300" />
              </Link>
            </p>
          </div>
        </div>

      {/* Mobile: Enhanced Value props with Lottie animations */}
        <div className="lg:hidden mt-8 space-y-4 px-4 relative" style={{ zIndex: 2 }}>
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-white/90
              transform transition-all duration-300 hover:translate-x-2">
              <div className="relative">
                <div className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-20 blur-lg`} />
                <div className="relative w-10 h-10">
                  {item.animation ? (
                    <Lottie
                      animationData={item.animation}
                      loop={true}
                      autoplay={true}
                      className="w-full h-full"
                    />
                  ) : (
                    // Fallback while loading
                    <div className="w-full h-full rounded-lg bg-white/10 animate-pulse" />
                  )}
                </div>
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shake-animation {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }

          .shake-animation {
            animation: shake-animation 0.5s ease-in-out;
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `
      }} />
    </div>
  );
};

export default LoginPage;
