import { adminDb } from "../../../firebase/serverApp";

export const getAllUnits = async () => {
  let allUnits = {};
  const units = await adminDb.collection("gsUnits").get();

  if (!units.docs.length) {
    throw new Error("Building not found!");
  }

  units.docs.forEach(
    (unit) => (allUnits = { ...allUnits, [unit.id]: unit.data() })
  );
  return allUnits;
};
