// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import Empty from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { SquarePlay } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Reviews() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/dashboard/reviews/create");
  };

  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <div className="flex justify-between items-center">
          <Title
            title={"Reviews"}
            Subtitle={"View and manage customer reviews for your products"}
            className="text-3xl"
            classNamee=""
          />
          <div className="  ">
            <Button className="bg-[#252525]   border-0  md:mb-0  rounded-2xl text-white/80 hover:text-white">
              {"How to  Create a  Reviews"} <SquarePlay size={16} />
            </Button>
          </div>
        </div>

        <Empty className={" "} Name={"Reviews".toLowerCase()} onCreate={handleCreate} />
      </div>
    </div>
  );
}

export default Reviews;
