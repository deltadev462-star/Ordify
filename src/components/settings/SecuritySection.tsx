import React, { useState } from 'react';
import { Shield, Key, Lock, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handlePasswordChange = () => {
    console.log('Changing password');
  };

  const handle2FAToggle = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    console.log('2FA toggled:', checked);
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{"Title"}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {"Description"}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {"High Priority"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="password" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="password" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {"Password"}
            </TabsTrigger>
            <TabsTrigger 
              value="2fa" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {"Two Factor Auth"}
            </TabsTrigger>
            <TabsTrigger 
              value="sessions" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {"Sessions"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="password" className="space-y-6">
            <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                {"Password Alert"}
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  {"Current Password"}
                </Label>
                <Input 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={"Enter Current Password"}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <Key className="h-4 w-4 text-gray-500" />
                  {"New Password"}
                </Label>
                <Input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={"Enter New Password"}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                  {"Confirm New Password"}
                </Label>
                <Input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={"Confirm New Password Placeholder"}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
              <Button 
                onClick={handlePasswordChange}
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white w-full"
              >
                {"Change Password Button"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="2fa" className="space-y-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {"Title"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Description"}
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handle2FAToggle}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>
              
              {twoFactorEnabled && (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-center">
                      {"Setup Authenticator"}
                    </Button>
                    <Button variant="outline" className="justify-center">
                      {"Setup S M S"}
                    </Button>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {"Backup Codes"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {"Title"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"Description"}
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {"Current Session"}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Chrome on Windows • {"Active Now"}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0">
                    {"Active"}
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {"Mobile App"}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      iOS • {"Last Active"}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    {"Revoke"}
                  </Button>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                {"Sign Out All"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default SecuritySection;