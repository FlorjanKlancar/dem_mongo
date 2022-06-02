import axios from "axios";
import React, { useEffect, useState } from "react";
import StatisticsTableSkeleton from "../../components/skeletons/StatisticsTableSkeleton";
import StatististicsTable from "../../components/Statistics/StatististicsTable";

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
    <div>
      {players.length && ranks.length ? (
        <StatististicsTable players={players} ranks={ranks} />
      ) : (
        <StatisticsTableSkeleton />
      )}
    </div>
  );
}

export default StatisticsView;
