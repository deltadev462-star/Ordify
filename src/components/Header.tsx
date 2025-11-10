import { BellRing, RotateCcw, User } from "lucide-react"
import LangSwitcher from "./LangSwitcher"
import { AnimatedThemeToggler } from "./ui/AnimatedThemeToggler"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import { t } from "i18next"

 

function Header() {
  return (
    <header className="flex bg-white rounded-2xl m-1  dark:bg-gray-400 dark:text-gray-100 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4 bg-amber-500"
              />
            </div>

            <div className="flex items-center gap-10">
              <h2>{t("Welcome to React")}</h2>
              <AnimatedThemeToggler />
              <LangSwitcher/>
               <User/>
               <RotateCcw/>
               <BellRing/>
            </div>
          </div>
        </header>
  )
}

export default Header