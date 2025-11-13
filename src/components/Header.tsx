import { BellRing, RotateCcw, User } from "lucide-react";
import LangSwitcher from "./LangSwitcher";
import { AnimatedThemeToggler } from "./ui/AnimatedThemeToggler";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

function Header() {
  return (
    <header className="flex h-25 bg-gray-50 border-b border-gray-300 dark:bg-[#101010] dark:text-gray-100   shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 bg-amber-500"
          />
        </div>

        <div className="flex items-center gap-10">
          <AnimatedThemeToggler />
          <LangSwitcher />
          <User />
          <RotateCcw />
          <BellRing />
        </div>
      </div>
    </header>
  );
}

export default Header;
