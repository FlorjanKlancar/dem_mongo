import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { villageModel } from "../types/villageModel";

export const useUserVillage = (villageId: string) => {
  return useQuery<villageModel>(
    ["village", villageId],
    async () => {
      const response = await axios.get(`/api/village/${villageId}`);

      return response.data;
    },
    {
      // The query will not execute until the userId exists
      enabled: !!villageId,
    }
  );
};
