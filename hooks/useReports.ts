import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { battleReportModel } from "../types/battleReportModel";
import { villageModel } from "../types/villageModel";

export const useReports = (userId: string) => {
  return useQuery(
    ["reports", userId],
    async () => {
      const response = await axios.get(`/api/battle/${userId}`);

      return response.data;
    },
    {
      // The query will not execute until the userId exists
      enabled: !!userId,
    }
  );
};
