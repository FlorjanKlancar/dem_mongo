import {MailOpenIcon} from "@heroicons/react/outline";
import {MailIcon} from "@heroicons/react/solid";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import {battleReportModel} from "../../types/battleReportModel";
import ReactTable from "../Widgets/ReactTable";
import BattleReport from "./BattleReport";

type ReportsProps = {
  battles?: battleReportModel[];
  singleBattle?: battleReportModel;
};

function ReportsPage({battles, singleBattle}: ReportsProps) {
  const tableHeaders = [
    {
      Header: "",
      accessor: "unread",
    },
    {
      Header: "Info",
      accessor: "info",
    },
    {
      Header: "Winner",
      accessor: "winner",
    },
    {
      Header: "Battle date",
      accessor: "createdAt",
    },
  ];

  const tableData =
    battles &&
    battles.map((battle: any) => {
      return {
        _id: battle._id,
        unread: battle.newReport ? (
          <MailIcon className="h-5 w-5 text-primary" />
        ) : (
          <MailOpenIcon className="h-5 w-5" />
        ),
        info: `Battle vs ${battle.playerOne || battle.playerTwo}`,
        winner: battle.winner,
        createdAt: dayjs(battle.createdAt).format("DD. MM. YYYY HH:mm:ss"),
      };
    });

  const noDataMsg = (
    <div className="text-center text-primary">No battle reports found yet!</div>
  );

  return (
    <div className="mb-12 flex flex-col rounded-lg border-2 border-primary/80 bg-slate-800 ">
      <div>
        <div className="relative flex h-56 w-full items-center justify-center">
          <Image
            src={
              "https://www.nationalgallery.org.uk/media/33827/n-2966-00-000013-hd.jpg?center=0.68072289156626509,0.48990825688073397&mode=crop&width=1920&height=1080&rnd=132385879365330000"
            }
            layout="fill"
            className="rounded-lg object-bottom opacity-70 "
            objectFit="cover"
            priority
          />
          <div className="absolute text-4xl font-semibold text-white">
            {battles
              ? "Reports"
              : `Report for battle vs ${
                  singleBattle!.playerOne || singleBattle!.playerTwo
                }`}
          </div>
        </div>

        <div className="px-4 py-8">
          {battles ? (
            <ReactTable
              tableHeaders={tableHeaders}
              tableData={tableData}
              tableNoDataOutput={noDataMsg}
            />
          ) : (
            <BattleReport singleBattle={singleBattle!} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
