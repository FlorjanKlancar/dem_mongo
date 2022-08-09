import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosResponse } from "../types/axiosResponseModel";

export const useReports = (userId: string) => {
  return useQuery<any>(
    ["reports", userId],
    async () => {
      const response: AxiosResponse = await axios.get(`/api/battle/${userId}`);

      return response.data;
    },
    {
      // The query will not execute until the userId exists
      enabled: !!userId,
    }
  );
};
