// Removed unused imports: AppSidebar, Header, SidebarInset/SidebarProvider
import Title from "@/components/Title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Text = () => {
  return (
    <div>
      <div className="p-6">
        <Title
          title={"Manage  Texts"}
          Subtitle={"Customize  Website  Texts"}
          className=""
          classNamee=""
        />

        <div className="mt-6">
          <Card className="border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] dark:text-white">
            <CardHeader>
              <CardTitle className="text-base">{"Website Texts"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {"Manage Website Content Texts"}
              </p>
              {/* Add text management components here */}
              <div className="mt-4">
                <Button variant="outline">{"Edit Texts"}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Text;
