import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import Link from "next/link";
import { useNextAuth } from "../../hooks/useNextAuth";

type StatististicsTableProps = {
  players: any;
  ranks?: any;
};

function StatististicsTable({ players, ranks }: StatististicsTableProps) {
  const { session }: any = useNextAuth();

  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>User</th>
            <th>Population</th>
            <th>Rank</th>
            <th>Creation date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {players.map((player: any) => (
            <tr key={player._id}>
              <td>
                <div className="flex items-center space-x-3">
                  {player.userId == session.user.id && (
                    <div>
                      <ChevronDoubleRightIcon className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={`https://avatars.dicebear.com/api/bottts/${player._id}.svg`}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {player.userFields[0]?.displayName ?? player._id}
                    </div>
                    <span className="badge badge-sm badge-ghost">Romans</span>
                  </div>
                </div>
              </td>
              <td>{player.population}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://eloboost24.eu/images/divisions/6.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                  <div>Iron</div>
                </div>
              </td>
              <th className="font-normal">
                {dayjs(player.createdAt).format("DD-MM-YYYY")}
              </th>
              <th>
                <Link href={`/statistics/${player.userId}`}>
                  <button className="btn btn-ghost btn-xs">details</button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th>User</th>
            <th>Population</th>
            <th>Rank</th>
            <th>Creation date</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default StatististicsTable;
