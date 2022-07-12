import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowSmUpIcon,
  ArrowSmDownIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

function GlobalFilter({setGlobalFilter}: any) {
  const [value, setValue] = React.useState("");
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const onChangeFunction = (e: any) => {
    setValue(e);
    onChange(e);
  };
  const onSubmitFunction = (e: any) => {
    e.preventDefault();
  };

  return <input type="text" placeholder="search" />;
}

function Table({columns, data}: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: {pageIndex},
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 0},
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="my-5">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full " {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any, i: number) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, i: number) => (
                  <th
                    key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="flex justify-start">
                      <div>{column.render("Header")}</div>
                      <div className="-mt-0.5">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowSmDownIcon className="h-5 w-5" />
                          ) : (
                            <ArrowSmUpIcon className="h-5 w-5" />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </th>
                ))}
                <th></th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()} className="hover">
                  {row.cells.map((cell: any, i: number) => {
                    return (
                      <td key={i} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                  <td className="w-16">
                    <div className="flex space-x-3">
                      <Link href={`/reports/${row.original._id}`} passHref>
                        <button className="secondary_button">
                          Open report
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between ">
        <div className="btn-group ">
          <button
            className="btn rounded-xl border-2 border-gray-400"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            className="btn rounded-xl border-2 border-gray-400"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        <div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} out of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
      </div>
    </>
  );
}

function ReactTable({tableData, tableHeaders, tableNoDataOutput}: any) {
  const columns = React.useMemo(() => tableHeaders, []);

  const data = React.useMemo(() => tableData, []);

  return data.length ? (
    <Table columns={columns} data={data} />
  ) : (
    <div>{tableNoDataOutput}</div>
  );
}

export default ReactTable;
