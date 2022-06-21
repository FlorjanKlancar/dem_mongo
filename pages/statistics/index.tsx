import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";
import StatisticsTableSkeleton from "../../components/skeletons/StatisticsTableSkeleton";
import StatististicsTable from "../../components/Statistics/StatististicsTable";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";

function StatisticsView() {
  const [players, setPlayers] = useState([]);
  const [ranks, setRanks] = useState([]);

  const fetchStatistics = async () => {
    const playersResponse = await axios.get("api/statistics");
    setPlayers(playersResponse.data);

    const ranksResponse = await axios.get("api/ranks");
    setRanks(ranksResponse.data);
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <>
      <NavbarDem />
      <VillageWrapper>
        {players.length && ranks.length ? (
          <StatististicsTable players={players} ranks={ranks} />
        ) : (
          <StatisticsTableSkeleton />
        )}
      </VillageWrapper>
    </>
  );
}

export default StatisticsView;
