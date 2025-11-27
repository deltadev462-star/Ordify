import { BellRing, RotateCcw, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import LangSwitcher from "./LangSwitcher";
import { AnimatedThemeToggler } from "./ui/AnimatedThemeToggler";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function Header() {
  const { t } = useTranslation();
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
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <User />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {t("Profile")}
            </TooltipContent>
          </Tooltip>
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

