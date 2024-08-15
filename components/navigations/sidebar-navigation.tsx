import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { Servers } from "@/lib/servers";
import TaskbarNavigationClient from "./taskbar-navigation-client";

const TaskbarNavigation = async () => {
      const profile = await currentProfile();
      if (!profile) return redirect('/');

      const servers = await Servers();

      return (
            <TaskbarNavigationClient servers={servers ?? []} />
      );
}

export default TaskbarNavigation;
