import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserProfile, updateProfile, updatePassword } from "@/store/slices/auth/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, User, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user profile on mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.firstName) return "U";
    const firstInitial = user.firstName[0] || "";
    const lastInitial = user.lastName?.[0] || "";
    return (firstInitial + lastInitial).toUpperCase() || "U";
  };

  // Profile form validation schema
  const profileValidationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required(t("First name is required"))
      .min(2, t("First name must be at least 2 characters")),
    lastName: Yup.string()
      .trim()
      .required(t("Last name is required"))
      .min(2, t("Last name must be at least 2 characters")),
    email: Yup.string()
      .trim()
      .required(t("Email is required"))
      .email(t("Invalid email format")),
    phone: Yup.string()
      .trim()
      .matches(/^[0-9+\-\s()]+$/, t("Invalid phone number format"))
      .optional(),
  });

  // Password form validation schema
  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string()
      .required(t("Current password is required"))
      .min(6, t("Password must be at least 6 characters")),
    newPassword: Yup.string()
      .required(t("New password is required"))
      .min(6, t("Password must be at least 6 characters"))
      .notOneOf([Yup.ref('currentPassword')], t("New password must be different from current password")),
    confirmPassword: Yup.string()
      .required(t("Please confirm your new password"))
      .oneOf([Yup.ref('newPassword')], t("Passwords must match")),
  });

  // Profile form
  const profileForm = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: "",
    },
    validationSchema: profileValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setSuccessMessage("");
      try {
        const resultAction = await dispatch(updateProfile(values));
        if (updateProfile.fulfilled.match(resultAction)) {
          setSuccessMessage(t("Profile updated successfully"));
          toast({
            title: t("Success"),
            description: t("Your profile has been updated successfully"),
            variant: "default",
          });
          // Refresh profile data
          dispatch(getUserProfile());
        } else if (updateProfile.rejected.match(resultAction)) {
          toast({
            title: t("Error"),
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
          setSuccessMessage(t("Password updated successfully"));
          toast({
            title: t("Success"),
            description: t("Your password has been updated successfully"),
            variant: "default",
          });
          resetForm();
          setActiveTab("profile");
        } else if (updatePassword.rejected.match(resultAction)) {
          toast({
            title: t("Error"),
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
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t("Profile Settings")}</h1>
        <p className="text-muted-foreground">{t("Manage your account settings and preferences")}</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {user?.firstName} {user?.lastName}
              </CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            {t("Profile Information")}
          </TabsTrigger>
          <TabsTrigger value="password">
            <Lock className="mr-2 h-4 w-4" />
            {t("Change Password")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Personal Information")}</CardTitle>
              <CardDescription>
                {t("Update your personal details and contact information")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={profileForm.handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("First Name")}</Label>
                    <Input
                      id="firstName"
                      type="text"
                      {...profileForm.getFieldProps("firstName")}
                      className={profileForm.touched.firstName && profileForm.errors.firstName ? "border-destructive" : ""}
                    />
                    {profileForm.touched.firstName && profileForm.errors.firstName && (
                      <p className="text-xs text-destructive">{profileForm.errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("Last Name")}</Label>
                    <Input
                      id="lastName"
                      type="text"
                      {...profileForm.getFieldProps("lastName")}
                      className={profileForm.touched.lastName && profileForm.errors.lastName ? "border-destructive" : ""}
                    />
                    {profileForm.touched.lastName && profileForm.errors.lastName && (
                      <p className="text-xs text-destructive">{profileForm.errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("Email Address")}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...profileForm.getFieldProps("email")}
                    className={profileForm.touched.email && profileForm.errors.email ? "border-destructive" : ""}
                  />
                  {profileForm.touched.email && profileForm.errors.email && (
                    <p className="text-xs text-destructive">{profileForm.errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("Phone Number")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("Optional")}
                    {...profileForm.getFieldProps("phone")}
                    className={profileForm.touched.phone && profileForm.errors.phone ? "border-destructive" : ""}
                  />
                  {profileForm.touched.phone && profileForm.errors.phone && (
                    <p className="text-xs text-destructive">{profileForm.errors.phone}</p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading || profileForm.isSubmitting}
                  >
                    {(loading || profileForm.isSubmitting) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("Saving...")}
                      </>
                    ) : (
                      t("Save Changes")
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Change Password")}</CardTitle>
              <CardDescription>
                {t("Update your password to keep your account secure")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t("Current Password")}</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...passwordForm.getFieldProps("currentPassword")}
                    className={passwordForm.touched.currentPassword && passwordForm.errors.currentPassword ? "border-destructive" : ""}
                  />
                  {passwordForm.touched.currentPassword && passwordForm.errors.currentPassword && (
                    <p className="text-xs text-destructive">{passwordForm.errors.currentPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t("New Password")}</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...passwordForm.getFieldProps("newPassword")}
                    className={passwordForm.touched.newPassword && passwordForm.errors.newPassword ? "border-destructive" : ""}
                  />
                  {passwordForm.touched.newPassword && passwordForm.errors.newPassword && (
                    <p className="text-xs text-destructive">{passwordForm.errors.newPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("Confirm New Password")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.getFieldProps("confirmPassword")}
                    className={passwordForm.touched.confirmPassword && passwordForm.errors.confirmPassword ? "border-destructive" : ""}
                  />
                  {passwordForm.touched.confirmPassword && passwordForm.errors.confirmPassword && (
                    <p className="text-xs text-destructive">{passwordForm.errors.confirmPassword}</p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading || passwordForm.isSubmitting}
                  >
                    {(loading || passwordForm.isSubmitting) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("Updating...")}
                      </>
                    ) : (
                      t("Update Password")
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