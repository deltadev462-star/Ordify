import { BellRing, RotateCcw, User, LogOut, ChevronRight, Check, Clock, ShoppingBag, AlertCircle, MessageSquare, Settings } from "lucide-react";
import { AnimatedThemeToggler } from "./ui/AnimatedThemeToggler";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Notification {
  id: string;
  avatar: string;
  name: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'system' | 'message' | 'alert';
}

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      avatar: 'https://i.pravatar.cc/150?img=1',
      name: 'Ahmed Hassan',
      message: 'New order #12345 has been placed',
      time: '5 minutes ago',
      read: false,
      type: 'order'
    },
    {
      id: '2',
      avatar: 'https://i.pravatar.cc/150?img=2',
      name: 'Sarah Ahmed',
      message: 'Customer requested a refund for order #12344',
      time: '12 minutes ago',
      read: false,
      type: 'alert'
    },
    {
      id: '3',
      avatar: 'https://i.pravatar.cc/150?img=3',
      name: 'System',
      message: 'Your monthly report is ready to download',
      time: '1 hour ago',
      read: true,
      type: 'system'
    },
    {
      id: '4',
      avatar: 'https://i.pravatar.cc/150?img=4',
      name: 'Mohamed Ali',
      message: 'Payment confirmed for order #12343',
      time: '2 hours ago',
      read: true,
      type: 'order'
    },
    {
      id: '5',
      avatar: 'https://i.pravatar.cc/150?img=5',
      name: 'Fatima Zahra',
      message: 'Left a 5-star review on your product',
      time: '3 hours ago',
      read: true,
      type: 'message'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    const icons = {
      order: { icon: ShoppingBag, color: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400' },
      system: { icon: Settings, color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400' },
      message: { icon: MessageSquare, color: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400' },
      alert: { icon: AlertCircle, color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400' }
    };
    return icons[type as keyof typeof icons] || { icon: BellRing, color: 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400' };
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.firstName) return "U";
    const firstInitial = user.firstName[0] || "";
    const lastInitial = user.lastName?.[0] || "";
    return (firstInitial + lastInitial).toUpperCase() || "U";
  };

  // Get full name
  const getUserFullName = () => {
    if (!user) return "User";
    return `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
  };
  return (
    <header className="flex h-16 bg-gray-50 border-b border-gray-300 dark:border-gray-900  dark:bg-[#101010] dark:text-gray-100   shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 bg-amber-500"
          />
        </div>

        <div className="flex items-center gap-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <AnimatedThemeToggler />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {"Toggle theme"}
            </TooltipContent>
          </Tooltip>
          
          {/* Profile Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer hover:scale-105">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2">
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{getUserFullName()}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile" className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User className="mr-2 h-4 w-4" />
                  <span>{"Profile"}</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400 cursor-pointer focus:text-red-600 dark:focus:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{"Logout"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <RotateCcw />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {"Refresh"}
            </TooltipContent>
          </Tooltip>
          
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative outline-none group">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:scale-105">
                  <BellRing className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-300" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1">
                      <span className="relative flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 text-white text-xs items-center justify-center font-medium shadow-lg">
                          {unreadCount}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[90vw] max-w-[420px] sm:w-[420px] mt-2 p-0 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-xl bg-white/5 dark:bg-[#0a0a0a]"
              sideOffset={5}
            >
              {unreadCount > 0 && (
                <div className="flex justify-end p-3 border-b border-gray-200 dark:border-gray-800">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs hover:bg-gray-100 dark:hover:bg-gray-700/50 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 mr-1.5" />
                    {"Mark all read"}
                  </Button>
                </div>
              )}
              
              <ScrollArea className="h-[60vh] max-h-[420px] overflow-y-auto p-3 sm:p-4">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#101010] flex items-center justify-center mb-4">
                      <BellRing className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{"No notifications yet"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{"We'll notify you when something arrives!"}</p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {notifications.map((notification) => {
                      const IconData = getNotificationIcon(notification.type);
                      const Icon = IconData.icon;
                      return (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`relative group flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            !notification.read
                              ? 'bg-amber-50/30 dark:bg-amber-500/5 border-amber-200/50 dark:border-amber-500/20 shadow-sm hover:shadow-md'
                              : 'bg-white dark:bg-[#101010] border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#181818] hover:shadow-sm'
                          }`}
                        >
                          {!notification.read && (
                            <div className="absolute left-0 top-3 sm:top-4 bottom-3 sm:bottom-4 w-1 sm:w-1.5 bg-amber-500 dark:bg-amber-400 rounded-r-full" />
                          )}
                          
                          <div className="relative flex-shrink-0">
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white dark:ring-[#0a0a0a] shadow-sm">
                              <AvatarImage src={notification.avatar} alt={notification.name} />
                              <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-600 text-white font-medium text-xs sm:text-sm">
                                {notification.name.split(" ").map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${IconData.color} shadow-sm ring-2 ring-white dark:ring-[#0a0a0a]`}>
                              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                    {notification.name}
                                  </p>
                                  {!notification.read && (
                                    <Badge className="h-4 sm:h-5 px-1.5 sm:px-2 text-[10px] sm:text-xs bg-amber-500 text-white hover:bg-amber-600 border-0">
                                      {"New"}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-0.5">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 dark:text-gray-500" />
                              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;

