import axios from "axios";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import NavbarDem from "../../components/Navbar/NavbarDem";
import StatisticsTableSkeleton from "../../components/skeletons/StatisticsTableSkeleton";
import StatististicsTable from "../../components/Statistics/StatististicsTable";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import {RootState} from "../../types/storeModel";

function StatisticsView() {
  const [players, setPlayers] = useState([]);
  /* const [ranks, setRanks] = useState([]); */

  const fetchStatistics = async () => {
    const playersResponse: any = await axios.get("/api/statistics");

    setPlayers(playersResponse.data);

    /* const ranksResponse = await axios.get("api/ranks");
    setRanks(ranksResponse.data); */
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const {loading} = useSelector((state: RootState) => state.loading);

  return (
    <>
      <NavbarDem />
      {loading ? (
        <>
          <StatisticsTableSkeleton />
        </>
      ) : (
        <>
          <VillageWrapper>
            {players.length && <StatististicsTable players={players} />}
          </VillageWrapper>
        </>
      )}
    </>
  );
}

export default StatisticsView;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
