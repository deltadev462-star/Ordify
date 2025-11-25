// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header
import { useTranslation } from "react-i18next";

export default function History() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <h1>{t("History Content")}</h1>
        {/* Add your history page content here */}
      </div>
    </div>
  );
}
