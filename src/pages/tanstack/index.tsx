import { useState, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { generateTableData } from '../../data/dataset';

type RowData = Record<string, string | number | boolean>;

interface TanStackTableProps {
  rowCount: number;
  columnCount?: number;
}
console.time('Initial render')


export const TanStackTable = ({ rowCount, columnCount = 10 }: TanStackTableProps) => {
  const { rows, columns } = generateTableData(rowCount, columnCount);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [totalDomEl, setTotalDomEl] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create column definitions dynamically
  const columnDefs: ColumnDef<RowData>[] = columns.map((columnName) => ({
    accessorKey: columnName,
    header: () => (
      <div style={{ cursor: 'pointer', userSelect: 'none' }}>
        {columnName}
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      if (typeof value === 'boolean') {
        return value ? '✓' : '✗';
      }
      return String(value);
    },
  }));

  const table = useReactTable({
    data: rows,
    columns: columnDefs,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 36,
    overscan: 10,
  });

  useEffect(() => {
    console.timeEnd('Initial render');
    const tdCount = document.querySelectorAll('td').length;
    const thCount = document.querySelectorAll('th').length;
    const trCount = document.querySelectorAll('tr').length;
    const total = tdCount + thCount + trCount;
    console.log(`DOM Report → <td>: ${tdCount}, <th>: ${thCount}, <tr>: ${trCount}, TOTAL: ${total}`);
    setTotalDomEl(total);
  }, [rows.length]);

  const virtualRows = virtualizer.getVirtualItems();
  const paddingTop = virtualRows[0]?.start || 0;
  const paddingBottom =
    virtualizer.getTotalSize() -
    (virtualRows[virtualRows.length - 1]?.end || 0);

  return (
    <div>
      <div>COLUMNS: {columnCount}</div>
      <div>ROWS: {rowCount}</div>
      <div>TOTAL DOM ELEMENTS: {totalDomEl}</div>

      <div
        ref={containerRef}
        style={{
          height: '600px',
          overflowY: 'auto',
          border: '1px solid #ccc',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    style={{ 
                      border: '1px solid #ccc', 
                      padding: '4px',
                      backgroundColor: '#f5f5f5',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td colSpan={columnCount} style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow: any) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ border: '1px solid #eee', padding: '4px' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td colSpan={columnCount} style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TanStackTable;

