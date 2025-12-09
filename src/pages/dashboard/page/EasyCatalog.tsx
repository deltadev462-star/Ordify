// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header
import { Button } from "@/components/ui/button";
import { SquarePlay } from "lucide-react";
import Title from "@/components/Title";
import NotActive from "@/components/NotActive";

function EasyCatalog() {
  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />

        <div className="flex justify-between items-center">
          <Title
            title={"Easy  Catalog"}
            Subtitle={"The Catalog Is A Collection Of Products That You Can Share With Your Customers"}
            className="text-3xl"
            classNamee=""
          />
          <div className="  ">
            <Button className="bg-[#252525]   border-0  md:mb-0  rounded-2xl text-white/80 hover:text-white">
              {"How to  Create a  Catalog"} <SquarePlay size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EasyCatalog;
