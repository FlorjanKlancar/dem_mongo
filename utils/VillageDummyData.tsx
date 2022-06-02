export const newVillage = {
  resourcesStorage: {
    wheatAmount: 1000,
    clayAmount: 700,
    woodAmount: 1000,
    ironAmount: 800,
  },
  woodProductionPerH: 60,
  clayProductionPerH: 50,
  ironProductionPerH: 40,
  wheatProductionPerH: 30,
  unitTrainQueue: [],
  resourceFields: [
    {
      gridPosition: 0,
      id: 1,
      level: 1,
      type: "wood_field",
      description:
        "Forests are made for man to transform the trees into buildings, furniture and machines for war.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wood_level_1.png?alt=media&token=9f0e9136-e913-43e1-934a-7642b0b4b5fa",
    },
    {
      gridPosition: 1,
      id: 2,
      level: 1,
      type: "clay_field",
      description:
        "It processes clay from nearby mud to later be used for construction.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/clay_level_1.png?alt=media&token=8454ebc4-9bb3-4f19-a080-87ff44980f4e",
    },
    {
      gridPosition: 2,
      id: 3,
      level: 1,
      type: "wood_field",
      description:
        "Forests are made for man to transform the trees into buildings, furniture and machines for war.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wood_level_1.png?alt=media&token=9f0e9136-e913-43e1-934a-7642b0b4b5fa",
    },
    {
      gridPosition: 3,
      id: 4,
      level: 1,
      type: "wheat_field",
      description:
        "All armies move at the speed of their stomachs, and all powerful nations require high amounts of food, this farm ensures that.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wheat_level_1.png?alt=media&token=e5c2d4a5-e072-4967-9ee1-9fe6812c142e",
    },
    {
      gridPosition: 4,
      id: 5,
      level: 1,
      type: "iron_field",
      description:
        "From the depths of the earth, different metals are extracted to make armors, weapons and tools.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/iron_level_1.png?alt=media&token=d9858602-cc0d-412b-b3f2-2bb7e96352e3",
    },
    {
      gridPosition: 5,
      id: 6,
      type: "village_center",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/1.png?alt=media&token=a5d97459-e63c-467f-81c0-5bad339feae5",
    },
    {
      gridPosition: 6,
      id: 7,
      type: "village_center",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/2.png?alt=media&token=da17d6ad-82a8-49ca-bd38-39d10ad5de66",
    },
    {
      gridPosition: 7,
      id: 8,
      level: 1,
      type: "clay_field",
      description:
        "It processes clay from nearby mud to later be used for construction.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/clay_level_1.png?alt=media&token=8454ebc4-9bb3-4f19-a080-87ff44980f4e",
    },
    {
      gridPosition: 8,
      id: 9,
      level: 1,
      type: "wheat_field",
      description:
        "All armies move at the speed of their stomachs, and all powerful nations require high amounts of food, this farm ensures that.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wheat_level_1.png?alt=media&token=e5c2d4a5-e072-4967-9ee1-9fe6812c142e",
    },
    {
      gridPosition: 9,
      id: 10,
      type: "village_center",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/3.png?alt=media&token=2417d269-06fd-4ecd-b84b-3486a5b6435d",
    },
    {
      gridPosition: 10,
      id: 11,
      type: "village_center",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/4.png?alt=media&token=d20a6b45-cb9f-4d43-a077-5c4e0da42a9a",
    },
    {
      gridPosition: 11,
      id: 12,
      level: 1,
      type: "wheat_field",
      description:
        "All armies move at the speed of their stomachs, and all powerful nations require high amounts of food, this farm ensures that.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wheat_level_1.png?alt=media&token=e5c2d4a5-e072-4967-9ee1-9fe6812c142e",
    },
    {
      gridPosition: 12,
      id: 13,
      level: 1,
      type: "clay_field",
      description:
        "It processes clay from nearby mud to later be used for construction.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/clay_level_1.png?alt=media&token=8454ebc4-9bb3-4f19-a080-87ff44980f4e",
    },
    {
      gridPosition: 13,
      id: 14,
      level: 1,
      type: "wheat_field",
      description:
        "All armies move at the speed of their stomachs, and all powerful nations require high amounts of food, this farm ensures that.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wheat_level_1.png?alt=media&token=e5c2d4a5-e072-4967-9ee1-9fe6812c142e",
    },
    {
      gridPosition: 14,
      id: 15,
      level: 1,
      type: "iron_field",
      description:
        "From the depths of the earth, different metals are extracted to make armors, weapons and tools.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/iron_level_1.png?alt=media&token=d9858602-cc0d-412b-b3f2-2bb7e96352e3",
    },
    {
      gridPosition: 15,
      id: 16,
      level: 1,
      type: "wood_field",
      description:
        "Forests are made for man to transform the trees into buildings, furniture and machines for war.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wood_level_1.png?alt=media&token=9f0e9136-e913-43e1-934a-7642b0b4b5fa",
    },
  ],
  villageBuildings: [
    {
      gridPosition: 0,
      id: 21,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 1,
      id: 22,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 2,
      id: 23,
      level: 1,
      type: "barracks",
      description:
        "On the halls of this building, normal citizens become warriors, ready to serve their lords and lands.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/barracks.png?alt=media&token=fd3b5b3f-b899-495f-a25b-efaf622b8c11",
    },
    {
      gridPosition: 3,
      id: 24,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 4,
      id: 25,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 5,
      id: 26,
      level: 1,
      type: "granary",
      description:
        "The granary is where the seeds for the new season of growth are safely stored.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/granary.png?alt=media&token=b298ae5e-75fa-4968-a5e0-9304a82731c0",
    },
    {
      gridPosition: 6,
      id: 27,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 7,
      id: 28,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 8,
      id: 29,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 9,
      id: 30,
      level: 0,
      type: "main_building",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/main-building.png?alt=media&token=5b6ac813-aba1-43be-a5c1-05e79b012f40",
    },
    {
      gridPosition: 10,
      id: 31,
      level: 1,
      type: "warehouse",
      description:
        "In this building, the spoils of war, the harvest of the season, the riches mined from the earth and the hand made craft are safely stored.",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/warehouse.png?alt=media&token=770ea3b4-d6c4-493d-9431-44acea237829",
    },
    {
      gridPosition: 11,
      id: 32,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 12,
      id: 33,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 13,
      id: 34,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 14,
      id: 35,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
    {
      gridPosition: 15,
      id: 36,
      level: 0,
      type: "empty_field",
      description: "This plot of land is ready to be used for construction",
      imageGrid:
        "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd",
    },
  ],

  currentlyBuilding: [],
  population: 28,
};
