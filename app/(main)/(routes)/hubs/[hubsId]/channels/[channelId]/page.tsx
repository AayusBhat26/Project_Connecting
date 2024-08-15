import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components/vc";
interface ChannelIdPageProps {
      params: {
            hubsId: string;
            channelId: string;
      }
}
const ChannelIdPage = async ({
      params
}: ChannelIdPageProps) => {
      const profile = await currentProfile();
      if (!profile) return redirectToSignIn();
      const channel = await db.channel.findUnique({
            where: {
                  id: params.channelId
            }
      })
      const member = await db.member.findFirst({
            where: {
                  serverId: params.hubsId, profileId: profile.id
            }
      });
      if (!channel || !member) {
            redirect('/');
      }

      return (
            <div className="  dark:bg-[#31338] flex flex-col h-full">
                  {/* {ml - [170px] mr-[73px] border border-red-10 p-[8px] md:ml-[0px] md:mr-[0px] md:p-[0px] md:border-none} */}
                  <ChatHeader
                        name={channel.name}
                        hubsId={channel.serverId}
                        type="channel"
                  />
                  {channel.type === ChannelType.TEXT && (
                        <>
                              <ChatMessages
                                    member={member}
                                    name={channel.name}
                                    chatId={channel.id}
                                    type="channel"
                                    apiUrl="/api/messages"
                                    fileUrl={""}
                                    socketUrl="/api/socket/messages"
                                    socketQuery={{
                                          channelId: channel.id,
                                          serverId: channel.serverId
                                    }}
                                    paramKey="channelId"
                                    paramValue={channel.id}
                              />
                              <ChatInput
                                    name={channel.name}
                                    type="channel"
                                    apiUrl="/api/socket/messages"
                                    query={{
                                          channelId: channel.id, hubsId: params.hubsId
                                    }}
                              />
                        </>
                  )}
                  {channel.type === ChannelType.AUDIO
                        && (
                              <MediaRoom
                                    chatId={channel.id}
                                    video={false}
                                    audio={true}
                              />
                        )
                  }
                  {channel.type === ChannelType.VIDEO
                        && (
                              <MediaRoom
                                    chatId={channel.id}
                                    video={true}
                                    audio={false}
                              />
                        )
                  }
                  {channel.type === ChannelType.CODE && (
                        <div>
                              <h1>test</h1>
                        </div>
                  )

                  }
            </div>
      );
}
export default ChannelIdPage;