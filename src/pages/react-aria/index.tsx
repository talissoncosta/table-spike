import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
} from 'react-aria-components';
import { generateColumns, generateRows } from '../../data/dataset';

interface ReactAriaTableProps {
  rowCount: number;
  columnCount?: number;
}

export const ReactAriaTable = ({ rowCount, columnCount = 10 }: ReactAriaTableProps)=>  {
  const columns = React.useMemo(() => generateColumns(columnCount), [columnCount]);
  const rows = React.useMemo(() => generateRows(rowCount, columns), [rowCount, columns]);

  return (
    <div style={{ padding: 20 }}>
      <h2>React Aria Table</h2>
      <p>
        Rows: <strong>{rowCount}</strong> | Columns: <strong>{columnCount}</strong>
      </p>
      <Table
        aria-label="Benchmark Table"
        selectionMode="multiple"
        className="w-full border border-gray-300 text-sm [&_thead]:bg-gray-100 [&_th]:text-left [&_th]:px-4 [&_td]:px-4 [&_td]:py-2"
      >
        <TableHeader>
          {columns.map((col, i) => (
            <Column key={col} isRowHeader={i === 0}>
              {col}
            </Column>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {columns.map((col) => (
                <Cell key={col}>{row[col]}</Cell>
              ))}
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}