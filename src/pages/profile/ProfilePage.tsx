import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserProfile, updateProfile, updatePassword } from "@/store/slices/auth/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2, 
  User, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  Phone,
  Shield,
  Camera,
  Sparkles,
  Save,
  Eye,
  EyeOff,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);

  // Fetch user profile on mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Calculate profile completion
  useEffect(() => {
    if (user) {
      let completion = 0;
      if (user.firstName) completion += 25;
      if (user.lastName) completion += 25;
      if (user.email) completion += 25;
      if (user.phone && user.phone.trim() !== '') completion += 25;
      setProfileCompletion(completion);
    }
  }, [user]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.firstName) return "U";
    const firstInitial = user.firstName[0] || "";
    const lastInitial = user.lastName?.[0] || "";
    return (firstInitial + lastInitial).toUpperCase() || "U";
  };

  // Get member since date
  const getMemberSince = () => {
    if (user?.createdAt) {
      const date = new Date(user.createdAt);
      return date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long'
      });
    }
    return "";
  };

  // Profile form validation schema
  const profileValidationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required("First Name Required")
      .min(2, "First Name Min Length"),
    lastName: Yup.string()
      .trim()
      .required("Last Name Required")
      .min(2, "Last Name Min Length"),
    email: Yup.string()
      .trim()
      .required("Email Required")
      .email("Email Invalid"),
    phone: Yup.string()
      .trim()
      .matches(/^[0-9+\-\s()]+$/, "Phone Invalid")
      .optional(),
  });

  // Password form validation schema
  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("Current Password Required")
      .min(6, "Password Min Length"),
    newPassword: Yup.string()
      .required("New Password Required")
      .min(8, "Password Min Length")
      .notOneOf([Yup.ref('currentPassword')], "New Password Must Be Different"),
    confirmPassword: Yup.string()
      .required("Confirm Password Required")
      .oneOf([Yup.ref('newPassword')], "Passwords Do Not Match"),
  });

  // Profile form
  const profileForm = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
    validationSchema: profileValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setSuccessMessage("");
      try {
        const resultAction = await dispatch(updateProfile(values));
        if (updateProfile.fulfilled.match(resultAction)) {
          setSuccessMessage("Profile Updated Success");
          toast({
            title: "Success",
            description: "Profile Updated Description",
            variant: "default",
          });
          // Refresh profile data
          dispatch(getUserProfile());
        } else if (updateProfile.rejected.match(resultAction)) {
          toast({
            title: "Error",
            description: resultAction.payload as string,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Profile update error:", error);
      }
    },
  });

  // Password form
  const passwordForm = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSuccessMessage("");
      try {
        const resultAction = await dispatch(updatePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }));
        if (updatePassword.fulfilled.match(resultAction)) {
          setSuccessMessage("Password Updated Success");
          toast({
            title: "Success",
            description: "Password Updated Description",
            variant: "default",
          });
          resetForm();
          setActiveTab("profile");
          setShowCurrentPassword(false);
          setShowNewPassword(false);
          setShowConfirmPassword(false);
        } else if (updatePassword.rejected.match(resultAction)) {
          toast({
            title: "Error",
            description: resultAction.payload as string,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Password update error:", error);
      }
    },
  });

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="theme-modern container mx-auto p-6 max-w-5xl">
      {/* Header Section */}
      <div className="mb-8 space-y-4" style={{ animation: 'fadeIn 0.8s ease-out' }}>
        <div className="flex items-center space-x-2">
          <User className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {"Profile Settings"}
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          {"Manage Account Settings"}
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive" className="mb-6 animate-in slide-in-from-top duration-300">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Profile Header Card */}
      <Card className="mb-8 overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-primary/5 via-transparent to-primary/5 backdrop-blur-sm"
            style={{ animation: 'scaleIn 0.8s ease-out' }}>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar Section */}
            <div className="relative group">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                <AvatarImage
                  src={user?.avatar || "/default-avatar.svg"}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
                <AvatarFallback className="text-xl md:text-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 transform"
                  title="Change Avatar"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
                  {user?.firstName} {user?.lastName}
                  {profileCompletion === 100 && (
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {"Verified"}
                    </Badge>
                  )}
                </h2>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{"Member Since"}</span>
                  <span className="font-medium">{getMemberSince()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{"Account Status"}</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {"Active"}
                  </Badge>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="space-y-2 max-w-sm mx-auto md:mx-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"Profile Completion"}</span>
                  <span className="font-medium">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
                {profileCompletion < 100 && (
                  <p className="text-xs text-muted-foreground">
                    {"Complete Profile Message"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-3 text-base font-medium transition-all"
          >
            <User className="mr-2 h-5 w-5" />
            {"Personal Info"}
          </TabsTrigger>
          <TabsTrigger 
            value="password" 
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-3 text-base font-medium transition-all"
          >
            <Lock className="mr-2 h-5 w-5" />
            {"Change Password"}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card className="border border-gray-200 dark:border-gray-700 shadow-md" style={{ animation: 'slideInFromLeft 0.6s ease-out' }}>
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                {"Personal Information"}
              </CardTitle>
              <CardDescription className="text-base">
                {"Update Personal Details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={profileForm.handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base font-medium">
                      {"First Name"}
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      className={cn(
                        "h-11 text-base transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/20",
                        profileForm.touched.firstName && profileForm.errors.firstName 
                          ? "border-destructive focus:ring-destructive/20" 
                          : ""
                      )}
                      placeholder={"First Name Placeholder"}
                      {...profileForm.getFieldProps("firstName")}
                    />
                    {profileForm.touched.firstName && profileForm.errors.firstName && (
                      <p className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                        {profileForm.errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base font-medium">
                      {"Last Name"}
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      className={cn(
                        "h-11 text-base transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/20",
                        profileForm.touched.lastName && profileForm.errors.lastName 
                          ? "border-destructive focus:ring-destructive/20" 
                          : ""
                      )}
                      placeholder={"Last Name Placeholder"}
                      {...profileForm.getFieldProps("lastName")}
                    />
                    {profileForm.touched.lastName && profileForm.errors.lastName && (
                      <p className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                        {profileForm.errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    {"Email Address"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className={cn(
                        "h-11 pl-10 text-base transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/20",
                        profileForm.touched.email && profileForm.errors.email 
                          ? "border-destructive focus:ring-destructive/20" 
                          : ""
                      )}
                      placeholder={"Email Placeholder"}
                      {...profileForm.getFieldProps("email")}
                    />
                  </div>
                  {profileForm.touched.email && profileForm.errors.email && (
                    <p className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                      {profileForm.errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium">
                    {"Phone"} 
                    <span className="text-sm text-muted-foreground ml-1">{"Optional"}</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      className={cn(
                        "h-11 pl-10 text-base transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/20",
                        profileForm.touched.phone && profileForm.errors.phone 
                          ? "border-destructive focus:ring-destructive/20" 
                          : ""
                      )}
                      placeholder={"Phone Placeholder"}
                      {...profileForm.getFieldProps("phone")}
                    />
                  </div>
                  {profileForm.touched.phone && profileForm.errors.phone && (
                    <p className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                      {profileForm.errors.phone}
                    </p>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading || profileForm.isSubmitting}
                    className="min-w-[160px] h-11 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {(loading || profileForm.isSubmitting) ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {"Saving"}
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        {"Save Changes"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password" className="mt-6">
          <Card className="border border-gray-200 dark:border-gray-700 shadow-md" style={{ animation: 'slideInFromRight 0.6s ease-out' }}>
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                {"Change Password"}
              </CardTitle>
              <CardDescription className="text-base">
                {"Update Password Description"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-base font-medium">
                    {"Current Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      className={cn(
                        "h-11 pl-10 pr-10 text-base transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/20",
                        passwordForm.touched.currentPassword && passwordForm.errors.currentPassword 
                          ? "border-destructive focus:ring-destructive/20" 
                          : ""
                      )}
                      placeholder="••••••••"
                      {...passwordForm.getFieldProps("currentPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {passwordForm.touched.currentPassword && passwordForm.errors.currentPassword && (
                    <p className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                      {passwordForm.errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-base font-medium">
                    {"New Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      className={cn(
                        "h-11 pl-10 pr-10 text-base transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/20",
                        passwordForm.touched.newPassword && passwordForm.errors.newPassword 
                          ? "border-destructive focus:ring-destructive/20" 
                          : ""
                      )}
                      placeholder="••••••••"
                      {...passwordForm.getFieldProps("newPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {passwordForm.touched.newPassword && passwordForm.errors.newPassword && (
                    <p className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                      {passwordForm.errors.newPassword}
                    </p>
                  )}
                  {/* Password strength indicator could be added here */}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base font-medium">
                    {"Confirm Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={cn(
                        "h-11 pl-10 pr-10 text-base transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/20",
                        passwordForm.touched.confirmPassword && passwordForm.errors.confirmPassword 
                          ? "border-destructive focus:ring-destructive/20" 
                          : ""
                      )}
                      placeholder="••••••••"
                      {...passwordForm.getFieldProps("confirmPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {passwordForm.touched.confirmPassword && passwordForm.errors.confirmPassword && (
                    <p className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                      {passwordForm.errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Security Tips */}
                <Alert className="bg-muted/50 border-muted">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium mb-2">{"Password Tips"}</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>{"Password Tip1"}</li>
                      <li>{"Password Tip2"}</li>
                      <li>{"Password Tip3"}</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Separator className="my-6" />

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading || passwordForm.isSubmitting}
                    className="min-w-[180px] h-11 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {(loading || passwordForm.isSubmitting) ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {"Updating"}
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-5 w-5" />
                        {"Update Password"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;