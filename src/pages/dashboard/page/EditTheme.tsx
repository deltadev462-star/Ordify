import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function EditTheme() {
  const { id } = useParams<{ id: string }>();
  const [theme, setTheme] = useState({
    id: 0,
    title: "",
    description: "",
    image: "",
    tryLink: "",
  });

   const themes = [
    {
      id: 1,
      title: "Dark Mode",
      description: "A sleek dark theme for comfortable night usage.",
      image: "/th (1).jpg",
      tryLink: "/try/dark",
    },
    {
      id: 2,
      title: "Light Mode",
      description: "Bright and clean theme for daylight.",
      image: "/th (2).jpg",
      tryLink: "/try/light",
    },
    {
      id: 3, 
      title: "Dark Mode",
      description: "A sleek dark theme for comfortable night usage.",
      image: "/th (3).jpg",
      tryLink: "/try/dark",
    },
    {
      id: 4,
      title: "Light Mode",
      description: "Bright and clean theme for daylight.",
      image: "/th (4).jpg",
      tryLink: "/try/light",
    },
  ];

  useEffect(() => {
    const foundTheme = themes.find((t) => t.id === parseInt(id || "0"));
    if (foundTheme) {
      setTheme(foundTheme);
    }
  }, [id]);

  const handleSave = () => {
    // Mock save, in real app would call API
    console.log("Saving theme:", theme);
    alert("Theme saved!");
  };

  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
            <Title
              Subtitle="Edit the selected theme"
              className=""
              classNamee=""
              title={`Edit Theme ${id}`}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={theme.title}
                  onChange={(e) => setTheme({ ...theme, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  value={theme.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTheme({ ...theme, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input
                  value={theme.image}
                  onChange={(e) => setTheme({ ...theme, image: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Try Link</label>
                <Input
                  value={theme.tryLink}
                  onChange={(e) => setTheme({ ...theme, tryLink: e.target.value })}
                />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default EditTheme;