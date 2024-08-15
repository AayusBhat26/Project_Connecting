"use client";
import Image from "next/image";
import {
      useParams, useRouter
} from "next/navigation";

import { cn } from "@/lib/utils";

import { ActionTooltip } from "../actions-tooltip";
import {
      HoverCard,
      HoverCardContent,
      HoverCardTrigger,
} from "@/components/ui/hover-card"

interface NavigationItemProps {
      id?: string;
      imageUrl?: string;
      name?: string;
      createdAt?: Date;
};

export const NavigationItem = ({
      id, imageUrl, name, createdAt
}: NavigationItemProps) => {

      const params = useParams();
      const router = useRouter();
      const onClick = () => {

            router.push(`/hubs/${id}`)
      }

      return (
            <ActionTooltip
                  side="right"
                  align="center"
                  label={name || ""}
            >
                  <button
                        onClick={onClick}
                        className="relative flex items-center border-8 "
                  >
                        <div className={cn(
                              "absolute left-0 bg-red-400 rounded-r-full transition-all w-[4px]",
                              params?.serverId !== id && "group-hover:h-[50px]",
                              params?.serverId === id ? "h-[36px]" : "h-[22px]",
                              params?.serverId !== id && "group-focus:h-[50px]"
                        )} />

                        <div className={cn(
                              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                              params?.serverId === id && "bg-primary text-primary rounded-[16px]"
                        )}>
                              <HoverCard >
                                    <HoverCardTrigger>
                                          <Image
                                                fill
                                                src={imageUrl || ""}
                                                alt="Channel"
                                          />
                                    </HoverCardTrigger>

                                    <HoverCardContent className=" text-black flex  h-[260px] w-[30vw] mr-[150px] mt-[-100px] md:flex justify-center align-middle">
                                          <div className="w-[15vw] flex h-full flex-col  text-white " >
                                                <div className=" text-black dark:text-white font-bold mb-[20px]">
                                                      {name}
                                                </div>
                                                <div className="flex justify-center w-full h-full font-bold text-center text-black align-bottom line-clamp-2 dark:text-white">
                                                      {
                                                            createdAt?.toString().slice(0, 16)
                                                      }
                                                </div>
                                          </div>
                                          <div className="  w-[15vw] h-full  relative  justify-center align-center  hidden lg:block ">
                                                <Image
                                                      className="breathing-border"
                                                      fill
                                                      style={{ borderRadius: '20px' }}
                                                      src={imageUrl || ""}
                                                      alt="Channel"
                                                />
                                          </div>

                                    </HoverCardContent>
                              </HoverCard>

                        </div>
                  </button>
            </ActionTooltip>

      )
}