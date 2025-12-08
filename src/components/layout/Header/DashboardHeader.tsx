import { Bell, Menu, Search, User, LogOut, Settings, Globe, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
 
import { Badge } from "@/components/ui/badge";
 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 
import { useDarkMode } from "@/hooks/useDarkMode";

interface DashboardHeaderProps {
  breadcrumbs?: { title: string; url: string }[];
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function DashboardHeader({   onMenuClick, showMenuButton = true }: DashboardHeaderProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleLanguageSwitch = () => {
    console.log("Language switch clicked!");
    console.log("Current language:", i18n.language);
    
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    console.log("Switching to:", newLang);
    
    i18n.changeLanguage(newLang).then(() => {
      console.log("Language changed to:", newLang);
      
      // Update document direction
      const newDir = newLang === "ar" ? "rtl" : "ltr";
      document.documentElement.dir = newDir;
      document.documentElement.lang = newLang;
      
      // Save to localStorage
      localStorage.setItem("i18nextLng", newLang);
      localStorage.setItem("documentDir", newDir);
    }).catch((error) => {
      console.error("Error changing language:", error);
    });
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  return (
    <header dir="ltr"  className="sticky top-0 z-10 flex h-16 items-center justify-between   gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900 sm:px-6 lg:px-8">
     

      {/* Right side actions */}
      <div className="flex   gap-2">
        {/* Search Button - Mobile */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Dark Mode Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </Button>

        {/* Language Switcher */}
        <Button variant="ghost" size="icon" onClick={handleLanguageSwitch}>
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
              >
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t("Notifications")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-1 py-2">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <p className="text-sm font-medium">{t("New Order #12345")}</p>
                <p className="text-xs text-muted-foreground">{t("2 minutes ago")}</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <p className="text-sm font-medium">{t("Low Stock Alert")}</p>
                <p className="text-xs text-muted-foreground">{t("Product ABC is running low")}</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <p className="text-sm font-medium">{t("Payment Received")}</p>
                <p className="text-xs text-muted-foreground">{t("$250 from Order #12344")}</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full text-center">
              <Link to="/dashboard/notifications" className="text-sm text-blue-600 dark:text-blue-400">
                {t("View all notifications")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john.doe@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                {t("My Profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                {t("Settings")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              {t("Logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      
      </div>
           {/* Menu Button */}
        {showMenuButton && (
          <Button
        
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            data-menu-button
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("Toggle Sidebar")}</span>
          </Button>
        )}
    </header>
  );
}