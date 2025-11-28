

import { ShoppingBag } from "lucide-react";
import BackgroundElements from "./BackgroundElements";
import SignupForm from "./SignupForm";

const RegisterPage = () => {
  return (
     <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <BackgroundElements />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 gradient-border">
            <ShoppingBag className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create your <span className="gradient-text">Ordify</span> account
          </h1>
          <p className="text-muted-foreground">
            Start building your online store in minutes
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
          Trusted by 50,000+ merchants worldwide
        </p>
      </div>
    </div>
  )
}

export default RegisterPage