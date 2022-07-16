export const createBuildings = [
  {
    type: "barracks",
    name: "Barracks",
    group: "Offense",
    description:
      "On the halls of this building, normal citizens become warriors, ready to serve their lords and lands.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/barracks.png?alt=media&token=fd3b5b3f-b899-495f-a25b-efaf622b8c11",
    levels: [
      {
        1: {
          costWood: 100,
          costClay: 100,
          costIron: 100,
          costWheat: 100,
          timeToBuild: 10,
          addPopulation: 4,
        },
        2: {
          costWood: 200,
          costClay: 200,
          costIron: 200,
          costWheat: 200,
          timeToBuild: 20,
          populationAdd: 2,
        },
        3: {
          costWood: 300,
          costClay: 300,
          costIron: 300,
          costWheat: 300,
          timeToBuild: 30,
          populationAdd: 2,
        },
        4: {
          costWood: 400,
          costClay: 400,
          costIron: 400,
          costWheat: 400,
          timeToBuild: 40,
          populationAdd: 2,
        },
      },
    ],
  },

  {
    type: "warehouse",
    name: "Warehouse",
    group: "Infrastructure",
    description:
      "In this building, the spoils of war, the harvest of the season, the riches mined from the earth and the hand made craft are safely stored",
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/warehouse.png?alt=media&token=770ea3b4-d6c4-493d-9431-44acea237829",
    levels: [
      {
        1: {
          costWood: 100,
          costClay: 100,
          costIron: 100,
          costWheat: 100,
          timeToBuild: 10,
          populationAdd: 4,
          warehouseResourceLimit: 1000,
        },
        2: {
          costWood: 200,
          costClay: 200,
          costIron: 200,
          costWheat: 200,
          timeToBuild: 20,
          populationAdd: 2,
          warehouseResourceLimit: 1400,
        },
        3: {
          costWood: 300,
          costClay: 300,
          costIron: 300,
          costWheat: 300,
          timeToBuild: 30,
          populationAdd: 2,
          warehouseResourceLimit: 1800,
        },
        4: {
          costWood: 400,
          costClay: 400,
          costIron: 400,
          costWheat: 400,
          timeToBuild: 40,
          populationAdd: 2,
          warehouseResourceLimit: 2200,
        },
      },
    ],
  },

  {
    type: "granary",
    name: "Granary",
    group: "Infrastructure",
    description:
      "The granary is where the seeds for the new season of growth are safely stored",
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/granary.png?alt=media&token=b298ae5e-75fa-4968-a5e0-9304a82731c0",
    levels: [
      {
        1: {
          costWood: 100,
          costClay: 100,
          costIron: 100,
          costWheat: 100,
          timeToBuild: 10,
          populationAdd: 4,
          granaryResourceLimit: 1000,
        },
        2: {
          costWood: 200,
          costClay: 200,
          costIron: 200,
          costWheat: 200,
          timeToBuild: 20,
          populationAdd: 2,
          granaryResourceLimit: 1400,
        },
        3: {
          costWood: 300,
          costClay: 300,
          costIron: 300,
          costWheat: 300,
          timeToBuild: 30,
          populationAdd: 2,
          granaryResourceLimit: 1800,
        },
        4: {
          costWood: 400,
          costClay: 400,
          costIron: 400,
          costWheat: 400,
          timeToBuild: 40,
          populationAdd: 2,
          granaryResourceLimit: 2200,
        },
      },
    ],
  },

  {
    type: "wood_field",
    name: "Wood field",
    group: "Resources",
    description:
      "The granary is where the seeds for the new season of growth are safely stored",
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wood_level_1.png?alt=media&token=9f0e9136-e913-43e1-934a-7642b0b4b5fa",
    levels: [
      {
        1: {
          costWood: 100,
          costClay: 100,
          costIron: 100,
          costWheat: 100,
          timeToBuild: 50,
          populationAdd: 2,
          productionAdd: 10,
        },
        2: {
          costWood: 200,
          costClay: 200,
          costIron: 200,
          costWheat: 200,
          timeToBuild: 100,
          populationAdd: 2,
          productionAdd: 20,
        },
        3: {
          costWood: 300,
          costClay: 300,
          costIron: 300,
          costWheat: 300,
          timeToBuild: 120,
          populationAdd: 2,
          productionAdd: 30,
        },
        4: {
          costWood: 400,
          costClay: 400,
          costIron: 400,
          costWheat: 400,
          timeToBuild: 120,
          populationAdd: 2,
          productionAdd: 40,
        },
        5: {
          costWood: 500,
          costClay: 500,
          costIron: 500,
          costWheat: 500,
          timeToBuild: 120,
          populationAdd: 3,
          productionAdd: 50,
          image:
            "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wood_level_5.png?alt=media&token=2c3ccc31-6ec1-4ce6-899b-f7a6c8364b50",
        },
      },
    ],
  },

  {
    type: "clay_field",
    name: "Clay field",
    group: "Resources",
    description:
      "It processes clay from nearby mud to later be used for construction.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/clay_level_1.png?alt=media&token=8454ebc4-9bb3-4f19-a080-87ff44980f4e",
    levels: [
      {
        1: {
          costWood: 100,
          costClay: 100,
          costIron: 100,
          costWheat: 100,
          timeToBuild: 30,
          populationAdd: 2,
          productionAdd: 10,
        },
        2: {
          costWood: 200,
          costClay: 200,
          costIron: 200,
          costWheat: 200,
          timeToBuild: 60,
          populationAdd: 2,
          productionAdd: 20,
        },
        3: {
          costWood: 300,
          costClay: 300,
          costIron: 300,
          costWheat: 300,
          timeToBuild: 90,
          populationAdd: 2,
          productionAdd: 30,
        },
        4: {
          costWood: 400,
          costClay: 400,
          costIron: 400,
          costWheat: 400,
          timeToBuild: 120,
          populationAdd: 2,
          productionAdd: 40,
        },
        5: {
          costWood: 500,
          costClay: 500,
          costIron: 500,
          costWheat: 500,
          timeToBuild: 120,
          populationAdd: 3,
          productionAdd: 50,
          image:
            "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/clay_level_5.png?alt=media&token=b5c8bc6b-38fc-4bae-8aed-4b7c75a80e86",
        },
      },
    ],
  },

  {
    type: "iron_field",
    name: "Iron field",
    group: "Resources",
    description:
      "From the depths of the earth, different metals are extracted to make armors, weapons and tools.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/iron_level_1.png?alt=media&token=d9858602-cc0d-412b-b3f2-2bb7e96352e3",
    levels: [
      {
        1: {
          costWood: 100,
          costClay: 100,
          costIron: 100,
          costWheat: 100,
          timeToBuild: 20,
          populationAdd: 2,
          productionAdd: 10,
        },
        2: {
          costWood: 200,
          costClay: 200,
          costIron: 200,
          costWheat: 200,
          timeToBuild: 40,
          populationAdd: 2,
          productionAdd: 20,
        },
        3: {
          costWood: 300,
          costClay: 300,
          costIron: 300,
          costWheat: 300,
          timeToBuild: 80,
          populationAdd: 2,
          productionAdd: 30,
        },
        4: {
          costWood: 400,
          costClay: 400,
          costIron: 400,
          costWheat: 400,
          timeToBuild: 120,
          populationAdd: 2,
          productionAdd: 40,
        },
        5: {
          costWood: 500,
          costClay: 500,
          costIron: 500,
          costWheat: 500,
          timeToBuild: 120,
          populationAdd: 3,
          productionAdd: 50,
          image:
            "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/iron_level_5.png?alt=media&token=fe1debe8-0c95-469a-a7fc-6acb0f4056b1",
        },
      },
    ],
  },

  {
    type: "wheat_field",
    name: "Wheat field",
    group: "Resources",
    description:
      "All armies move at the speed of their stomachs, and all powerful nations require high amounts of food, this farm ensures that.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wheat_level_1.png?alt=media&token=e5c2d4a5-e072-4967-9ee1-9fe6812c142e",
    levels: [
      {
        1: {
          costWood: 100,
          costClay: 100,
          costIron: 100,
          costWheat: 100,
          timeToBuild: 50,
          populationAdd: 2,
          productionAdd: 10,
        },
        2: {
          costWood: 200,
          costClay: 200,
          costIron: 200,
          costWheat: 200,
          timeToBuild: 60,
          populationAdd: 2,
          productionAdd: 20,
        },
        3: {
          costWood: 300,
          costClay: 300,
          costIron: 300,
          costWheat: 300,
          timeToBuild: 70,
          populationAdd: 2,
          productionAdd: 30,
        },
        4: {
          costWood: 400,
          costClay: 400,
          costIron: 400,
          costWheat: 400,
          timeToBuild: 80,
          populationAdd: 2,
          productionAdd: 40,
        },
        5: {
          costWood: 500,
          costClay: 500,
          costIron: 500,
          costWheat: 500,
          timeToBuild: 90,
          populationAdd: 3,
          productionAdd: 50,
          image:
            "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/wheat_level_5.png?alt=media&token=8abe4390-cff5-4366-8ddf-c33bddb927d2",
        },
      },
    ],
  },

  {
    type: "stables",
    name: "Stables",
    description: "Konjušnca",
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/stables.png?alt=media&token=fa149129-73fb-47e2-b7e9-46a65835039b",
    group: "Offense",
    levels: [
      {
        1: {
          costWood: 100,
          costClay: 100,
          costIron: 100,
          costWheat: 100,
          timeToBuild: 3,
          populationAdd: 2,
        },
        2: {
          costWood: 200,
          costClay: 200,
          costIron: 200,
          costWheat: 200,
          timeToBuild: 4,
          populationAdd: 2,
        },
        3: {
          costWood: 300,
          costClay: 300,
          costIron: 300,
          costWheat: 300,
          timeToBuild: 5,
          populationAdd: 2,
        },
        4: {
          costWood: 400,
          costClay: 400,
          costIron: 400,
          costWheat: 400,
          timeToBuild: 6,
          populationAdd: 2,
        },
        5: {
          costWood: 500,
          costClay: 500,
          costIron: 500,
          costWheat: 500,
          timeToBuild: 7,
          populationAdd: 3,
          image:
            "https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/stables.png?alt=media&token=fa149129-73fb-47e2-b7e9-46a65835039b",
        },
      },
    ],
  },
]; //END ARRAY
