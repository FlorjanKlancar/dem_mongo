interface userDetails {
  displayName?: string;
  email: string;
  emailVerified: boolean | null;
  heroIcon?: string;
  image: string;
  name: string;
  _id: string;
}

interface statisticsVillageResponse {
  createdAt: Date;
  population: number;
  userId: string;
  _id: string;
}

export interface userDetailsProps {
  user: userDetails;
  villageResponse: statisticsVillageResponse;
  positionOnLadder: number;
}
