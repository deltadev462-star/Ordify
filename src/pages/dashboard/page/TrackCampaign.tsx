import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
function TrackCampaign() {
  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <Title
          title={"Track campaign results"}
          Subtitle={"Monitor and analyze campaign performance"}
          className="text-3xl"
          classNamee=""
        />
      </div>
    </div>
  );
}

export default TrackCampaign;