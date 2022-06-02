import React from "react";

type StatististicsTableProps = {
  players: any;
  ranks: any;
};

function StatististicsTable({ players, ranks }: StatististicsTableProps) {
  console.log("ranks", ranks);

  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>User</th>
            <th>Population</th>
            <th>Rank</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {players.map((player: any) => (
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP2136-CUSA02727_00-AV00000000000014/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{player.username}</div>
                    <span className="badge badge-sm badge-ghost">Romans</span>
                  </div>
                </div>
              </td>
              <td>{player.population}</td>
              <td>
                {ranks.map((rank: any) => {
                  console.log(
                    "rank.upToElo",
                    rank.upToElo,
                    "player.elo",
                    player.elo
                  );
                  if (rank.upToElo == player.elo) {
                    return (
                      <div className="flex items-center space-x-2">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={rank.icon}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                        <div>{rank.rank}</div>
                      </div>
                    );
                  }
                })}
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th>User</th>
            <th>Population</th>
            <th>Rank</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default StatististicsTable;
