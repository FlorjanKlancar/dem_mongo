import {GetServerSidePropsContext} from "next";
import {buildingModel} from "../../../types/buildingModel";
import {getBuildingById} from "../../api/gsBuildings/[id]";
import UpgradeBuildingPage from "../../../components/Village/UpgradeBuildingPage";
import NewBuildingPage from "../../../components/Village/NewBuildingPage";

type VillageTypeProps = {
  building: buildingModel;
};

function VillageType({building}: VillageTypeProps) {
  return building ? (
    <UpgradeBuildingPage building={building} />
  ) : (
    <NewBuildingPage />
  );
}

export default VillageType;

export async function getServerSideProps({params}: GetServerSidePropsContext) {
  const type = params!.type;

  if (type === "empty_field")
    return {
      props: {building: null},
    };

  if (type) {
    const building = await getBuildingById(type.toString());

    if (!building.length) {
      return {notFound: true};
    }
    return {props: {building: building[0]}};
  }
}
