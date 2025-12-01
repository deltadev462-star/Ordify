import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User, Mail, Lock, Loader2, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerRequest } from "@/store/slices/auth/actions";

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, ready } = useTranslation();
  const { loading, isAuthenticated, token, error: serverError } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, token, navigate]);

  // Update server error message when error changes
  useEffect(() => {
    if (serverError) {
      console.log({serverError})
      setServerErrorMessage(serverError);
    }
  }, [serverError]);

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required(t('signup.firstNameRequired'))
      .min(2, t('signup.firstNameMinLength')),
    lastName: Yup.string()
      .trim()
      .required(t('signup.lastNameRequired'))
      .min(2, t('signup.lastNameMinLength')),
    email: Yup.string()
      .trim()
      .required(t('signup.emailRequired'))
      .email(t('signup.emailInvalid')),
    phone: Yup.string()
      .trim()
      .required(t('signup.phoneRequired'))
      .matches(/^\+?[1-9]\d{1,14}$/, t('signup.phoneInvalid')),
    password: Yup.string()
      .required(t('signup.passwordRequired'))
      .min(8, t('signup.passwordMinLength')),
    confirmPassword: Yup.string()
      .required(t('signup.confirmPasswordRequired'))
      .oneOf([Yup.ref('password')], t('signup.passwordsDoNotMatch')),
    storeName: Yup.string()
      .trim()
      .optional(),

  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      storeName: '',
      
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("sdsdsdsdsd")
      // Clear any previous server errors
      setServerErrorMessage('');
      
      try {
        const resultAction = await dispatch(registerRequest({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          storeName: values.storeName || undefined
        }));
        
        if (registerRequest.fulfilled.match(resultAction)) {
          // Clear server error on success
          setServerErrorMessage('');
          
          // Navigation will be handled by the useEffect watching isAuthenticated
        } else if (registerRequest.rejected.match(resultAction)) {
          // Error is already set in the state via serverError
        }
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleGoogleSignup = () => {
    // For now, just show inline message instead of implementing Google auth
    setServerErrorMessage("Google authentication would be integrated here.");
  };

  // Show loading while translations are loading
  if (!ready) {
    return <div className="flex justify-center items-center h-96">
      <Loader2 className="animate-spin w-8 h-8 text-primary" />
    </div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {/* Server Error Message */}
      {serverErrorMessage && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-fade-up">
          <p className="text-sm text-destructive">{serverErrorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* First Name Field */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-foreground">
            {t('signup.firstName')}
          </label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="firstName"
              type="text"
              placeholder={t('signup.firstNamePlaceholder')}
              {...formik.getFieldProps('firstName')}
              className={`pl-11 input-glow  ${
                formik.touched.firstName && formik.errors.firstName ? "border-destructive" : ""
              } `}
            />
          </div>
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-xs text-destructive animate-fade-up">{formik.errors.firstName}</p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-foreground">
            {t('signup.lastName')}
          </label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="lastName"
              type="text"
              placeholder={t('signup.lastNamePlaceholder')}
              {...formik.getFieldProps('lastName')}
              className={`pl-11 input-glow  ${
                formik.touched.lastName && formik.errors.lastName ? "border-destructive" : ""
              } `}
            />
          </div>
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-xs text-destructive animate-fade-up">{formik.errors.lastName}</p>
          )}
        </div>
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
            {...formik.getFieldProps('email')}
            className={`pl-11 input-glow ${
              formik.touched.email && formik.errors.email ? "border-destructive" : ""
            }`}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-xs text-destructive animate-fade-up">{formik.errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          {t('signup.phone')}
        </label>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            id="phone"
            type="tel"
            placeholder={t('signup.phonePlaceholder')}
            {...formik.getFieldProps('phone')}
            className={`pl-11 input-glow ${
              formik.touched.phone && formik.errors.phone ? "border-destructive" : ""
            }`}
          />
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-xs text-destructive animate-fade-up">{formik.errors.phone}</p>
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
            {...formik.getFieldProps('password')}
            className={`pl-11 pr-11 input-glow ${
              formik.touched.password && formik.errors.password ? "border-destructive" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? t('signup.hidePassword') : t('signup.showPassword')}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-destructive animate-fade-up">{formik.errors.password}</p>
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
            {...formik.getFieldProps('confirmPassword')}
            className={`pl-11 pr-11 input-glow ${
              formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-destructive" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirmPassword ? t('signup.hidePassword') : t('signup.showPassword')}
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-xs text-destructive animate-fade-up">{formik.errors.confirmPassword}</p>
        )}
      </div>

      {/* Store Name Field (Optional) */}
      <div className="space-y-2">
        <label htmlFor="storeName" className="text-sm font-medium text-foreground">
          {t('signup.storeName')} <span className="text-muted-foreground">{t('signup.optional')}</span>
        </label>
        <div className="relative group">
          <Input
            id="storeName"
            type="text"
            placeholder={t('signup.storeNamePlaceholder')}
            {...formik.getFieldProps('storeName')}
            className={`input-glow ${
              formik.touched.storeName && formik.errors.storeName ? "border-destructive" : ""
            }`}
          />
        </div>
        {formik.touched.storeName && formik.errors.storeName && (
          <p className="text-xs text-destructive animate-fade-up">{formik.errors.storeName}</p>
        )}
      </div>

    

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full font-semibold"
        size="lg"
        disabled={loading || formik.isSubmitting}
      >
        {(loading || formik.isSubmitting) ? (
          <>
            <Loader2 className="animate-spin mr-2" />
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
