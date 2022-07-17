import axios from "axios";
import {GetServerSidePropsContext} from "next";
import React from "react";
import {useSelector} from "react-redux";
import NavbarDem from "../../../components/Navbar/NavbarDem";
import UserDetailsPage from "../../../components/Statistics/UserDetailsPage";
import VillageWrapper from "../../../components/Wrapper/VillageWrapper";
import {RootState} from "../../../types/storeModel";
import {userDetailsProps} from "../../../types/userDetailsModel";

function UserDetails({
  user,
  villageResponse,
  positionOnLadder,
}: userDetailsProps) {
  const {loading} = useSelector((state: RootState) => state.loading);

  return (
    <>
      <NavbarDem />
      {loading ? (
        <div>skeleton</div>
      ) : (
        <VillageWrapper>
          <UserDetailsPage
            user={user}
            villageResponse={villageResponse}
            positionOnLadder={positionOnLadder}
          />
        </VillageWrapper>
      )}
    </>
  );
}

export default UserDetails;

export async function getServerSideProps({params}: GetServerSidePropsContext) {
  const userId = params!.userId;

  if (userId) {
    const response: any = await axios.get(
      `${process.env.NODE_JS_URI}/user/${userId}`
    );

    if (response.status !== 200) {
      return {notFound: true};
    }
    return {
      props: {
        user: response.data.user,
        villageResponse: response.data.villageResponse,
        positionOnLadder: response.data.positionOnLadder,
      },
    };
  }
}
