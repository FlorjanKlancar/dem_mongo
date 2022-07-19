import { GetServerSidePropsContext } from "next";
import { buildingModel } from "../../../types/buildingModel";
import UpgradeBuildingPage from "../../../components/Village/UpgradeBuildingPage";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/storeModel";
import NavbarDem from "../../../components/Navbar/NavbarDem";
import VillageSkeleton from "../../../components/skeletons/VillageSkeleton";
import VillageWrapper from "../../../components/Wrapper/VillageWrapper";
import { getBuildingById } from "../../../utils/gsBuildingsFunctions";

type VillageTypeProps = {
  building: buildingModel;
};

function VillageType({ building }: VillageTypeProps) {
  const { loading } = useSelector((state: RootState) => state.loading);

  return loading ? (
    <>
      <NavbarDem />
      <VillageSkeleton />
    </>
  ) : (
    <>
      <NavbarDem />
      <VillageWrapper>
        <UpgradeBuildingPage building={building} />
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
