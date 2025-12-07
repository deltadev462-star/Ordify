import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Monitor, Smartphone, Laptop, Tablet, Globe, MapPin, Calendar, LogOut, Shield, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface LoginSession {
  id: string;
  device: string;
  deviceIcon: LucideIcon;
  location: string;
  ip: string;
  lastActive: string;
  browser: string;
  isCurrent: boolean;
}

function LoginSessionsSection() {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<LoginSession[]>([
    {
      id: "1",
      device: "Windows Desktop",
      deviceIcon: Monitor,
      location: "Cairo, Egypt",
      ip: "192.168.1.1",
      lastActive: "Active now",
      browser: "Chrome 119",
      isCurrent: true,
    },
    {
      id: "2",
      device: "iPhone 14 Pro",
      deviceIcon: Smartphone,
      location: "Alexandria, Egypt",
      ip: "192.168.1.2",
      lastActive: "2 hours ago",
      browser: "Safari 17",
      isCurrent: false,
    },
    {
      id: "3",
      device: "MacBook Pro",
      deviceIcon: Laptop,
      location: "Cairo, Egypt",
      ip: "192.168.1.3",
      lastActive: "Yesterday",
      browser: "Chrome 119",
      isCurrent: false,
    },
    {
      id: "4",
      device: "iPad Air",
      deviceIcon: Tablet,
      location: "Giza, Egypt",
      ip: "192.168.1.4",
      lastActive: "3 days ago",
      browser: "Safari 17",
      isCurrent: false,
    }
  ]);
  const [sessionToRevoke, setSessionToRevoke] = useState<LoginSession | null>(null);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);

  const handleRevokeSession = (session: LoginSession) => {
    setSessionToRevoke(session);
    setShowRevokeDialog(true);
  };

  const confirmRevokeSession = () => {
    if (sessionToRevoke) {
      setSessions(sessions.filter(s => s.id !== sessionToRevoke.id));
      setShowRevokeDialog(false);
      setSessionToRevoke(null);
    }
  };

  const revokeAllSessions = () => {
    setSessions(sessions.filter(s => s.isCurrent));
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Login Sessions Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-indigo-500/5 to-transparent dark:from-primary/20 dark:via-indigo-500/10 p-1">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="relative bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-[14px] p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-lg">
                <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('loginSessions.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('loginSessions.description')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                {sessions.length} {t('loginSessions.active')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Session */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Monitor className="w-4 h-4 text-primary" />
          {t('loginSessions.currentSession')}
        </h4>
        
        {sessions.filter(s => s.isCurrent).map((session) => {
          const Icon = session.deviceIcon;
          return (
            <div
              key={session.id}
              className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                    <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-800 dark:text-gray-100">
                        {session.device}
                      </h5>
                      <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700">
                        {t('loginSessions.thisDevice')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {session.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        {session.ip}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <span>{session.browser}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {session.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Other Sessions */}
      {sessions.filter(s => !s.isCurrent).length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-primary" />
              {t('loginSessions.otherSessions')}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={revokeAllSessions}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('loginSessions.signOutAll')}
            </Button>
          </div>

          <div className="space-y-3">
            {sessions.filter(s => !s.isCurrent).map((session) => {
              const Icon = session.deviceIcon;
              return (
                <div
                  key={session.id}
                  className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-800 dark:text-gray-100">
                          {session.device}
                        </h5>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {session.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5" />
                            {session.ip}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                          <span>{session.browser}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {session.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevokeSession(session)}
                      className="text-gray-600 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-sm font-medium text-amber-800 dark:text-amber-300">{t('loginSessions.securityNotice.title')}</h5>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              {t('loginSessions.securityNotice.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Revoke Session Dialog */}
      <Dialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('loginSessions.dialog.title')}</DialogTitle>
            <DialogDescription>
              {t('loginSessions.dialog.description')}
            </DialogDescription>
          </DialogHeader>
          {sessionToRevoke && (
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                {React.createElement(sessionToRevoke.deviceIcon, {
                  className: "w-5 h-5 text-gray-600 dark:text-gray-400"
                })}
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {sessionToRevoke.device}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {sessionToRevoke.location} • {sessionToRevoke.lastActive}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRevokeDialog(false)}
            >
              {t('loginSessions.dialog.cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmRevokeSession}
            >
              {t('loginSessions.dialog.revokeAccess')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginSessionsSection;