import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavbarDem from "../../components/Navbar/NavbarDem";
import StatisticsTableSkeleton from "../../components/skeletons/StatisticsTableSkeleton";
import StatististicsTable from "../../components/Statistics/StatististicsTable";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { RootState } from "../../types/storeModel";

function StatisticsView() {
  const [players, setPlayers] = useState([]);
  /* const [ranks, setRanks] = useState([]); */

  const fetchStatistics = async () => {
    const playersResponse = await axios.get("/api/statistics");

    setPlayers(playersResponse.data);

    /* const ranksResponse = await axios.get("api/ranks");
    setRanks(ranksResponse.data); */
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const { loading } = useSelector((state: RootState) => state.loading);

  return players.length && loading ? (
    <>
      <NavbarDem />
      <StatisticsTableSkeleton />
    </>
  ) : (
    <>
      <NavbarDem />
      <VillageWrapper>
        <StatististicsTable players={players} />
      </VillageWrapper>
    </>
  );
}

export default StatisticsView;
