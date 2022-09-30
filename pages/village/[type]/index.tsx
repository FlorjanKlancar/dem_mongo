import { GetServerSidePropsContext } from "next";
import { buildingModel } from "../../../types/buildingModel";
import UpgradeBuildingPage from "../../../components/Village/UpgradeBuildingPage";
import NavbarDem from "../../../components/Navbar/NavbarDem";
import VillageSkeleton from "../../../components/skeletons/VillageSkeleton";
import VillageWrapper from "../../../components/Wrapper/VillageWrapper";
import { getBuildingById } from "../../../utils/gsBuildingsFunctions";
import { useNextAuth } from "../../../hooks/useNextAuth";
import { useGameSettings } from "../../../hooks/useGameSettings";
import { useUserVillage } from "../../../hooks/useUserVillage";

type VillageTypeProps = {
  building: buildingModel;
};

function VillageType({ building }: VillageTypeProps) {
  const { session }: any = useNextAuth();

  const { data: gameSettingsData } = useGameSettings();
  const {
    data: villageData,
    isLoading,
    isError,
  } = useUserVillage(session?.user.id);

  if (isLoading)
    return (
      <>
        <NavbarDem />
        <VillageSkeleton />
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
          <UpgradeBuildingPage
            building={building}
            villageData={villageData}
            gsUnits={gameSettingsData.unitsResponse}
          />
        </VillageWrapper>
      </>
    );
}

export default VillageType;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const type = params!.type;

  if (type === "empty_field")
    return {
      props: { building: null },
    };

  if (type) {
    const building: any = await getBuildingById(type.toString());

    if (!building) {
      return { notFound: true };
    }
    return { props: { building: JSON.parse(JSON.stringify(building)) } };
  }
}
