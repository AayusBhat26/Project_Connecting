import qs from "query-string";
import { useParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "../providers/socket-providers";
import { NextResponse } from "next/server";

interface ChatQueryProps {
      queryKey: string;
      apiUrl: string;
      paramKey: "channelId" | "conversationId";
      paramValue: string;
};

export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }: ChatQueryProps) => {
      const { isConnected } = useSocket();
      const fetchMessages = async ({ pageParam = '' }) => {
            // queryFn mai error "pageParm" mai undefined rkha tha isliye ho rha tha
            try {
                  const url = qs.stringifyUrl({
                        url: apiUrl,
                        query: {
                              cursor: pageParam,
                              [paramKey]: paramValue
                        }
                  }, { skipNull: true });
                  const res = await fetch(url);
                  return res.json();
            } catch (error) {
                  console.log('fetch messages_use_chat_query', error);
                  return new NextResponse("error")

            }
      };

      const {
            data,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            status
      } = useInfiniteQuery({
            initialPageParam: '',
            queryKey: [queryKey],
            queryFn: fetchMessages,
            getNextPageParam: (lastPage) => lastPage?.nextCursor,
            refetchInterval: 500,
      });
      return {
            data,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            status
      };
};