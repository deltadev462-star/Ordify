

import { ShoppingBag } from "lucide-react";
import BackgroundElements from "./BackgroundElements";
import SignupForm from "./SignupForm";
import { AnimatedThemeToggler } from '../../components/ui/AnimatedThemeToggler';
import LangSwitcher from '../../components/LangSwitcher';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();
  
  return (
     <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <BackgroundElements />
      
      {/* Header Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <LangSwitcher />
        <AnimatedThemeToggler className="p-1 w-8 h-8 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-300 text-foreground dark:text-white" />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 gradient-border">
            <ShoppingBag className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('signup.createAccountSimple')} <span className="gradient-text">Ordify</span>
          </h1>
          <p className="text-muted-foreground">
            {t('signup.startBuilding')}
          </p>
        </div>

        {/* Glass Card Form */}
        <div 
          className="glass-card rounded-2xl p-8 animate-scale-in"
          style={{ animationDelay: '0.2s' }}
        >
          <SignupForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {t('signup.trustedBy')}
        </p>
      </div>
    </div>
  )
}

export default RegisterPage