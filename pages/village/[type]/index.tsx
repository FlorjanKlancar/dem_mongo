import { GetServerSidePropsContext } from "next";
import { buildingModel } from "../../../types/buildingModel";
import UpgradeBuildingPage from "../../../components/Village/UpgradeBuildingPage";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/storeModel";
import NavbarDem from "../../../components/Navbar/NavbarDem";
import VillageSkeleton from "../../../components/skeletons/VillageSkeleton";
import VillageWrapper from "../../../components/Wrapper/VillageWrapper";

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
    const response = await axios.get(
      `${process.env.NODE_JS_URI}/gsBuildings/${type}`
    );

    if (response.status !== 200) {
      return { notFound: true };
    }
    return { props: { building: response.data } };
  }
}
