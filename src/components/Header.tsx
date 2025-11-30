import { BellRing, RotateCcw, User, LogOut, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import LangSwitcher from "./LangSwitcher";
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

function Header() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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
    if (!user) return t("User");
    return `${user.firstName || ""} ${user.lastName || ""}`.trim() || t("User");
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
              {t("Toggle theme")}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <LangSwitcher />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {t("Change language")}
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
                  <span>{t("Profile")}</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400 cursor-pointer focus:text-red-600 dark:focus:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("Logout")}</span>
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
              {t("Refresh")}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <BellRing />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {t("Notifications")}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

export default Header;

