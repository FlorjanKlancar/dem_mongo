import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosResponse } from "../types/axiosResponseModel";
import { buildingModel } from "../types/buildingModel";
import { unitModel } from "../types/unitModel";

type useGameSettingsType = {
  buildingsResponse: buildingModel[];
  unitsResponse: unitModel[];
};

export const useGameSettings = () => {
  return useQuery<useGameSettingsType>(["gameSettings"], async () => {
    const response: AxiosResponse = await axios.get("/api/initialize");

    return response.data;
  });
};
