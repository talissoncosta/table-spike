import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table';
import { generateColumns, generateRows } from '../../data/dataset.ts';

type RowData = Record<string, string>;

interface TanStackTableProps {
  rowCount: number;
  columnCount?: number;
}

export const TanStackTable = ({ rowCount, columnCount = 10 }: TanStackTableProps) => {
  const columnsList = React.useMemo(() => generateColumns(columnCount), [columnCount]);
  const data = React.useMemo(() => generateRows(rowCount, columnsList), [rowCount, columnsList]);

  const columnHelper = React.useMemo(() => createColumnHelper<RowData>(), []);
  const columns = React.useMemo(
    () =>
      columnsList.map((key) =>
        columnHelper.accessor(key, {
          header: key,
          cell: (info) => info.getValue(),
        })
      ),
    [columnsList, columnHelper]
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>TanStack Table</h2>
      <p>
        Rows: <strong>{rowCount}</strong> | Columns: <strong>{columnCount}</strong>
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    padding: '8px',
                    backgroundColor: '#f8f8f8',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    border: '1px solid #ddd',
                    padding: '6px',
                    fontFamily: 'monospace',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

