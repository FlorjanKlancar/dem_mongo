import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueue = (userId: string) => {
  return useQuery(
    ["queue", userId],
    async () => {
      const response = await axios.get(`/api/queue/${userId}`);
      console.log("response", response);

      return response.data;
    },
    {
      // The query will not execute until the userId exists
      enabled: !!userId,
    }
  );
};
