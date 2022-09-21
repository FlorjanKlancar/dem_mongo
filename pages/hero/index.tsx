import React from "react";
import HeroPageComponent from "../../components/Hero/HeroPageComponent";
import NavbarDem from "../../components/Navbar/NavbarDem";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../hooks/useGameSettings";
import { useNextAuth } from "../../hooks/useNextAuth";
import { useUserVillage } from "../../hooks/useUserVillage";

function HeroPage() {
  const { session }: any = useNextAuth();
  const { data: gameSettingsData } = useGameSettings();
  const {
    data: villageData,
    isLoading,
    isError,
  } = useUserVillage(session?.user?.id);

  if (isLoading)
    return (
      <>
        <NavbarDem />
        Skeleton
      </>
    );

  if (isError) return <div>Error: {isError}</div>;

  if (gameSettingsData && villageData)
    return (
      <>
        <NavbarDem />
        <VillageWrapper
          villageData={villageData}
          gameSettings={gameSettingsData}
        >
          <HeroPageComponent userId={session.user.id} />
        </VillageWrapper>
      </>
    );
}

export default HeroPage;
