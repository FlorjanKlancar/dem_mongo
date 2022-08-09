import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosResponse } from "../types/axiosResponseModel";
import { villageModel } from "../types/villageModel";

export const useStatistics = () => {
  return useQuery<villageModel>(["statistics"], async () => {
    const response: AxiosResponse = await await axios.get("/api/statistics");

    return response.data;
  });
};
