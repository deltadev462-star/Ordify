import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import ThemeCard from "@/components/ThemeCard";
import Title from "@/components/Title";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Template() {
  const { t } = useTranslation();
  
  const template = [
    {
      id: 1,
      title: t("darkMode"),
      description: t("darkThemeDescription"),
      image: "/th (1).jpg",
      tryLink: "/try/dark",
    },
    {
      id: 2,
      title: t("lightMode"),
      description: t("lightThemeDescription"),
      image: "/th (2).jpg",
      tryLink: "/try/light",
    },
    {
      id: 3,
      title: t("darkMode"),
      description: t("darkThemeDescription"),
      image: "/th (3).jpg",
      tryLink: "/try/dark",
    },
    {
      id: 4,
      title: t("lightMode"),
      description: t("lightThemeDescription"),
      image: "/th (4).jpg",
      tryLink: "/try/light",
    },
    {
      id: 5,
      title: t("lightMode"),
      description: t("lightThemeDescription"),
      image: "/th (5).jpg",
      tryLink: "/try/light",
    },
    {
      id: 6,
      title: t("lightMode"),
      description: t("lightThemeDescription"),
      image: "/th (6).jpg",
      tryLink: "/try/light",
    },
  ];
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
         <div className="mt-5">
             <Title
              Subtitle={t("lightThemeDescription")}
              className=""
              classNamee=""
              title={t("template")}
            />
         </div>
            <div className="grid grid-cols-1  gap-5 lg:grid-cols-3">
              {template.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  title={theme.title}
                  description={theme.description}
                  image={theme.image}
                  tryLink={theme.tryLink}
                  editLink={theme.id.toString()}
                  selected={selectedId === theme.id}
                  onSelectChange={(checked) =>
                    checked ? setSelectedId(theme.id) : setSelectedId(null)
                  }
                />
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Template;
