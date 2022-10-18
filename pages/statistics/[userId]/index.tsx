import { GetServerSidePropsContext } from "next";
import React from "react";
import NavbarDem from "../../../components/Navbar/NavbarDem";
import UserDetailsPage from "../../../components/Statistics/UserDetailsPage";
import VillageWrapper from "../../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../../hooks/useGameSettings";
import { useNextAuth } from "../../../hooks/useNextAuth";
import { useUserVillage } from "../../../hooks/useUserVillage";
import { userDetailsProps } from "../../../types/userDetailsModel";
import { getUserById } from "../../../utils/userInfoFunctions";

function UserDetails({
  user,
  villageResponse,
  positionOnLadder,
}: userDetailsProps) {
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
        skeleton
      </>
    );

  if (isError) return <div>Error: {isError}</div>;

  if (villageData && gameSettingsData)
    return (
      <>
        <NavbarDem />
        <VillageWrapper
          villageData={villageData}
          gameSettings={gameSettingsData}
        >
          <UserDetailsPage
            user={user}
            villageResponse={villageResponse}
            positionOnLadder={positionOnLadder}
          />
        </VillageWrapper>
      </>
    );
}

export default UserDetails;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const userId = params!.userId;

  if (userId) {
    const userResponse = await getUserById(userId.toString());

    if (userResponse.status !== 200) {
      return { notFound: true };
    }
    return {
      props: {
        user: JSON.parse(JSON.stringify(userResponse.user)),
        villageResponse: JSON.parse(
          JSON.stringify(userResponse.villageResponse)
        ),
        positionOnLadder: JSON.parse(
          JSON.stringify(userResponse.positionOnLadder)
        ),
      },
    };
  }
}
