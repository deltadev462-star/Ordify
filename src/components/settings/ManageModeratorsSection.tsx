import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  UserCog, Shield, Users, CheckCircle2, Calendar, Clock, Edit, Trash2, 
  Plus, ShoppingBag, Package, Megaphone, BarChart3, Settings as SettingsIcon 
} from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

function ManageModeratorsSection() {
  const { t } = useTranslation();
  const [showAddModerator, setShowAddModerator] = useState(false);
  const [moderators, setModerators] = useState([
    {
      id: 1,
      name: "Sarah Ahmed",
      email: "sarah.ahmed@example.com",
      role: "Admin",
      permissions: ["all"],
      status: "active",
      lastActive: "2 minutes ago",
      joinedDate: "Dec 1, 2024",
      avatar: null
    },
    {
      id: 2,
      name: "Mohamed Ali",
      email: "mohamed.ali@example.com",
      role: "Moderator",
      permissions: ["orders", "products", "customers"],
      status: "active",
      lastActive: "1 hour ago",
      joinedDate: "Nov 15, 2024",
      avatar: null
    },
    {
      id: 3,
      name: "Fatima Hassan",
      email: "fatima.hassan@example.com",
      role: "Support",
      permissions: ["orders", "customers"],
      status: "inactive",
      lastActive: "3 days ago",
      joinedDate: "Oct 20, 2024",
      avatar: null
    }
  ]);

  const handleDeleteModerator = (id: number) => {
    setModerators(moderators.filter(m => m.id !== id));
  };

  const permissions = [
    { id: "all", name: t('manageModerators.permissions.fullAccess'), icon: Shield, color: "text-red-600" },
    { id: "orders", name: t('manageModerators.permissions.ordersManagement'), icon: ShoppingBag, color: "text-blue-600" },
    { id: "products", name: t('manageModerators.permissions.productsManagement'), icon: Package, color: "text-green-600" },
    { id: "customers", name: t('manageModerators.permissions.customersManagement'), icon: Users, color: "text-purple-600" },
    { id: "marketing", name: t('manageModerators.permissions.marketingTools'), icon: Megaphone, color: "text-orange-600" },
    { id: "analytics", name: t('manageModerators.permissions.analyticsReports'), icon: BarChart3, color: "text-indigo-600" },
    { id: "settings", name: t('manageModerators.permissions.storeSettings'), icon: SettingsIcon, color: "text-gray-600" }
  ];

  const roles = [
    { value: "admin", label: t('manageModerators.roles.admin'), description: t('manageModerators.roles.adminDesc') },
    { value: "moderator", label: t('manageModerators.roles.moderator'), description: t('manageModerators.roles.moderatorDesc') },
    { value: "support", label: t('manageModerators.roles.support'), description: t('manageModerators.roles.supportDesc') }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent dark:from-primary/20 dark:via-violet-500/10 p-1">
        <div className="absolute top-5 right-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="relative bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-[14px] p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 shadow-lg shadow-primary/10">
                <UserCog className="w-8 h-8 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t("manageModerators.title")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("manageModerators.description")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                {moderators.length} {t("manageModerators.members")}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 rounded-lg bg-violet-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("manageModerators.stats.totalTeam")}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">3 {t("manageModerators.members")}</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("manageModerators.stats.active")}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">2 {t("manageModerators.stats.online")}</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("manageModerators.stats.roles")}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">3 {t("manageModerators.stats.types")}</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("manageModerators.stats.addedThis")}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">1 {t("manageModerators.stats.month")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          {t("manageModerators.teamMembers")}
        </h4>
        
        <div className="space-y-4">
          {moderators.map((moderator) => (
            <div
              key={moderator.id}
              className="group relative p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 dark:from-primary/30 dark:to-violet-500/30 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary dark:text-primary">
                        {moderator.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                      moderator.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {moderator.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        moderator.role === "Admin"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          : moderator.role === "Moderator"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      }`}>
                        {t(`manageModerators.roleNames.${moderator.role.toLowerCase()}`)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {moderator.email}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {moderator.lastActive}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {t("manageModerators.joined")} {moderator.joinedDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => handleDeleteModerator(moderator.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Permissions */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">{t("manageModerators.permissionsLabel")}</p>
                <div className="flex flex-wrap gap-2">
                  {moderator.permissions.map((permId) => {
                    const perm = permissions.find(p => p.id === permId);
                    if (!perm) return null;
                    const Icon = perm.icon;
                    return (
                      <div
                        key={permId}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      >
                        <Icon className={`w-3.5 h-3.5 ${perm.color}`} />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {perm.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Member Button */}
        <Button
          onClick={() => setShowAddModerator(true)}
          className="w-full border-dashed border-gray-300 dark:border-gray-600 hover:border-primary/50 dark:hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("manageModerators.addTeamMember")}
        </Button>
      </div>

      {/* Add Moderator Dialog */}
      <Dialog open={showAddModerator} onOpenChange={setShowAddModerator}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl shadow-lg border-[1.5px] bg-white dark:bg-[#101010] border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle>{t("manageModerators.dialog.title")}</DialogTitle>
            <DialogDescription>
              {t("manageModerators.dialog.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-200">{t("manageModerators.dialog.firstName")}</Label>
                  <Input
                    id="firstName"
                    placeholder={t("manageModerators.dialog.johnPlaceholder")}
                    className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-primary/50 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-200">{t("manageModerators.dialog.lastName")}</Label>
                  <Input
                    id="lastName"
                    placeholder={t("manageModerators.dialog.doePlaceholder")}
                    className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">{t("manageModerators.dialog.emailAddress")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-primary/50 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">{t("manageModerators.dialog.role")}</Label>
                <Select defaultValue="moderator">
                  <SelectTrigger className="w-full bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-gray-500">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">{t("manageModerators.dialog.permissions")}</Label>
              <div className="grid grid-cols-1 gap-3">
                {permissions.map((permission) => {
                  const Icon = permission.icon;
                  return (
                    <label
                      key={permission.id}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 cursor-pointer transition-all"
                    >
                      <Checkbox id={permission.id} />
                      <Icon className={`w-5 h-5 ${permission.color}`} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {permission.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Send Invite Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Switch
                  id="sendEmail"
                  defaultChecked
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
                <Label htmlFor="sendEmail" className="cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                  {t("manageModerators.dialog.sendInviteEmail")}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddModerator(false)}
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            >
              {t("manageModerators.dialog.cancel")}
            </Button>
            <Button
              onClick={() => {
                // Add moderator logic here
                setShowAddModerator(false);
              }}
              className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {t("manageModerators.dialog.sendInvitation")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ManageModeratorsSection;