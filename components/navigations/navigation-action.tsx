"use client";

import { PlusCircle } from "lucide-react";
import { ActionTooltip } from "../actions-tooltip";
import { useModal } from "../hooks/use-modal-store";


export const NavigationAction = () => {
      const { onOpen } = useModal();

      return (
            <div >

                  <ActionTooltip
                        side="right"
                        align="center"
                        label="Add a server"
                  >
                        <button
                              onClick={() => onOpen("createServer")}
                              className="flex items-center group"
                        >
                              <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-gray-700 group-hover:bg-blue-500">
                                    <PlusCircle
                                          className="transition group-hover:text-white text-emerald-500"
                                          size={25}
                                    />
                              </div>
                        </button>
                  </ActionTooltip>
            </div>

      )
}