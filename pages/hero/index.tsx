import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import HeroPageComponent from "../../components/Hero/HeroPageComponent";
import NavbarDem from "../../components/Navbar/NavbarDem";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import {RootState} from "../../types/storeModel";

function HeroPage() {
  const [players, setPlayers] = useState([]);

  const fetchStatistics = async () => {
    const playersResponse: any = await axios.get("/api/statistics");

    setPlayers(playersResponse.data);
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const {loading} = useSelector((state: RootState) => state.loading);

  return loading ? (
    <>
      <NavbarDem />
    </>
  ) : (
    <>
      <NavbarDem />
      <VillageWrapper>
        <HeroPageComponent />
      </VillageWrapper>
    </>
  );
}

export default HeroPage;
