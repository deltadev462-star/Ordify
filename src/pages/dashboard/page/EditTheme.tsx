import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
// Removed unused imports: AppSidebar, Header, SidebarInset/SidebarProvider

function EditTheme() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [theme, setTheme] = useState({
    id: 0,
    title: "",
    description: "",
    image: "",
    tryLink: "",
  });

  const themes = useMemo(
    () => [
      {
        id: 1,
        title: "Dark Mode",
        description: "Dark Theme Description",
        image: "/th (1).jpg",
        tryLink: "/try/dark",
      },
      {
        id: 2,
        title: "Light Mode",
        description: "Light Theme Description",
        image: "/th (2).jpg",
        tryLink: "/try/light",
      },
      {
        id: 3,
        title: "Dark Mode",
        description: "Dark Theme Description",
        image: "/th (3).jpg",
        tryLink: "/try/dark",
      },
      {
        id: 4,
        title: "Light Mode",
        description: "Light Theme Description",
        image: "/th (4).jpg",
        tryLink: "/try/light",
      },
    ],
    []
  );

  useEffect(() => {
    const foundTheme = themes.find((t) => t.id === parseInt(id || "0"));
    if (foundTheme) {
      setTheme(foundTheme);
    }
  }, [id, themes]);

  const handleSave = () => {
    // Mock save, in real app would call API
    alert(t("themes.themeSaved"));
  };

  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
        <Title
          Subtitle={t("themes.editSelectedTheme")}
          className=""
          classNamee=""
          title={`${t("themes.editTheme")} ${id}`}
        />
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("common.title")}
            </label>
            <Input
              value={theme.title}
              onChange={(e) => setTheme({ ...theme, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("common.description")}
            </label>
            <Input
              value={theme.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTheme({ ...theme, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("themes.imageUrl")}
            </label>
            <Input
              value={theme.image}
              onChange={(e) => setTheme({ ...theme, image: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("themes.tryLink")}
            </label>
            <Input
              value={theme.tryLink}
              onChange={(e) => setTheme({ ...theme, tryLink: e.target.value })}
            />
          </div>
          <Button onClick={handleSave}>{t("common.saveChanges")}</Button>
        </div>
      </div>
    </div>
  );
}

export default EditTheme;
