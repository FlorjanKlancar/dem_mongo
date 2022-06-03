import { adminDb } from "../../../../firebase/serverApp";

async function getBuildingById(buildingId: string) {
  let buildingArray = [];
  const building = adminDb.collection("gsBuildings").doc(buildingId);
  const doc = await building.get();

  if (!doc.exists) {
    return [];
  } else {
    buildingArray.push(doc.data());
    return buildingArray;
  }
}

export { getBuildingById };
