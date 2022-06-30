import React from "react";
import { useSelector } from "react-redux";
import NavbarDem from "../../components/Navbar/NavbarDem";
import QueueTable from "../../components/Queue/QueueTable";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { RootState } from "../../types/storeModel";

function QueueView() {
  const { loading } = useSelector((state: RootState) => state.loading);

  return (
    <>
      <NavbarDem />
      {loading ? (
        <>Loading</>
      ) : (
        <>
          <VillageWrapper>
            <QueueTable />
          </VillageWrapper>
        </>
      )}
    </>
  );
}

export default QueueView;
