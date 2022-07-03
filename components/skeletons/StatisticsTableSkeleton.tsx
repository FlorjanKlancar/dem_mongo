import React from "react";

function StatisticsTableSkeleton() {
  return (
    <div className="mt-15 w-full  lg:px-8 xl:px-52 2xl:px-96">
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
          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12 animate-pulse border-2 border-slate-800/10  bg-slate-800/50 "></div>
                </div>
                <div>
                  <div className="font-bold">
                    <div
                      className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
                    ></div>
                  </div>
                  <span className="badge badge-sm badge-ghost h-4 w-20 animate-pulse border-2 border-slate-800/10  bg-slate-800/50"></span>
                </div>
              </div>
            </td>
            <td>
              <div
                className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
              ></div>
            </td>
            <td>
              <div className="flex items-center space-x-2">
                <div className="mask mask-squircle h-12 w-12 animate-pulse border-2 border-slate-800/10  bg-slate-800/50"></div>
                <div>
                  <div
                    className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
                  ></div>
                </div>
              </div>
            </td>
            <th>
              <div
                className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
              ></div>
            </th>
          </tr>

          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12 animate-pulse border-2 border-slate-800/10  bg-slate-800/50 "></div>
                </div>
                <div>
                  <div className="font-bold">
                    <div
                      className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
                    ></div>
                  </div>
                  <span className="badge badge-sm badge-ghost h-4 w-20 animate-pulse border-2 border-slate-800/10  bg-slate-800/50"></span>
                </div>
              </div>
            </td>
            <td>
              <div
                className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
              ></div>
            </td>
            <td>
              <div className="flex items-center space-x-2">
                <div className="mask mask-squircle h-12 w-12 animate-pulse border-2 border-slate-800/10  bg-slate-800/50"></div>
                <div>
                  <div
                    className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
                  ></div>
                </div>
              </div>
            </td>
            <th>
              <div
                className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
              ></div>
            </th>
          </tr>

          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12 animate-pulse border-2 border-slate-800/10  bg-slate-800/50 "></div>
                </div>
                <div>
                  <div className="font-bold">
                    <div
                      className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
                    ></div>
                  </div>
                  <span className="badge badge-sm badge-ghost h-4 w-20 animate-pulse border-2 border-slate-800/10  bg-slate-800/50"></span>
                </div>
              </div>
            </td>
            <td>
              <div
                className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
              ></div>
            </td>
            <td>
              <div className="flex items-center space-x-2">
                <div className="mask mask-squircle h-12 w-12 animate-pulse border-2 border-slate-800/10  bg-slate-800/50"></div>
                <div>
                  <div
                    className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
                  ></div>
                </div>
              </div>
            </td>
            <th>
              <div
                className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
              ></div>
            </th>
          </tr>

          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12 animate-pulse border-2 border-slate-800/10  bg-slate-800/50 "></div>
                </div>
                <div>
                  <div className="font-bold">
                    <div
                      className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
                    ></div>
                  </div>
                  <span className="badge badge-sm badge-ghost h-4 w-20 animate-pulse border-2 border-slate-800/10  bg-slate-800/50"></span>
                </div>
              </div>
            </td>
            <td>
              <div
                className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
              ></div>
            </td>
            <td>
              <div className="flex items-center space-x-2">
                <div className="mask mask-squircle h-12 w-12 animate-pulse border-2 border-slate-800/10  bg-slate-800/50"></div>
                <div>
                  <div
                    className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
                  ></div>
                </div>
              </div>
            </td>
            <th>
              <div
                className={`h-4 w-20 animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
              ></div>
            </th>
          </tr>
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

export default StatisticsTableSkeleton;
