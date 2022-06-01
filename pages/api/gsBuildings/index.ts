import { adminDb } from "../../../firebase/serverApp";

export const getAllBuildings = async () => {
  let allBuildings = {};
  const buildings = await adminDb.collection("gsBuildings").get();
  if (!buildings.docs.length) {
    throw new Error("Building not found!");
  }
  buildings.docs.forEach(
    (building) =>
      (allBuildings = { ...allBuildings, [building.id]: building.data() })
  );
  return allBuildings;
};
