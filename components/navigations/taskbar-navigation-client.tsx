"use client";

import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./Navigation-item";
import { ModeToggle } from "../mode-toggle";
import { Indicator } from "../indicator";
// framer motion
import { motion } from "framer-motion";

interface Server {
      id: string;
      name: string | null;
      imageUrl: string | null;
      createdAt: Date;
}

// Define the props for the client component
interface TaskbarNavigationClientProps {
      servers: Server[];
}

const TaskbarNavigationClient: React.FC<TaskbarNavigationClientProps> = ({ servers }) => {
      const [isVisible, setIsVisible] = useState<boolean>(true);

      // Add event listener for the shortcut key
      useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {
                  if (event.key === "i" && event.ctrlKey) { // Ctrl + H as the shortcut key
                        setIsVisible((prev) => !prev);
                  }
            };

            window.addEventListener("keydown", handleKeyPress);

            return () => {
                  window.removeEventListener("keydown", handleKeyPress);
            };
      }, []);

      // If not visible, render null
      if (!isVisible) return null;

      return (
            <motion.div
                  initial={{ opacity: 0.5, scale: 0.85 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 flex flex-col items-center h-full text-black dark:text-white w-full dark:bg-[#19191b] bg-[#19191b ] py-2"
            >
                  <NavigationAction />
                  <Separator
                        className="h-[2px] bg-blue-400 dark:bg-blue-800 rounded-md w-10 mx-auto"
                  />
                  <ScrollArea className="flex-1 w-full">
                        {servers.map((server) => (
                              <div key={server.id} className="mb-4">
                                    <NavigationItem
                                          id={server.id}
                                          name={server.name || 'Unknown'}
                                          imageUrl={server.imageUrl || '/default-image.png'}
                                          createdAt={server.createdAt}
                                    />
                              </div>
                        ))}
                  </ScrollArea>
                  <div className="flex flex-col items-center pb-3 mt-auto gap-y-4 ">
                        <ModeToggle />
                        <UserButton
                              afterSignOutUrl="/"
                              appearance={{
                                    elements: {
                                          avatarBox: "h-[48px] w-[48px]"
                                    }
                              }}
                        />
                  </div>
                  <div className="flex items-center ml-auto ">
                        <Indicator />
                  </div>
            </motion.div>
      );
}

export default TaskbarNavigationClient;
