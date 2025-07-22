import React, { useState, useEffect } from 'react';
import {
  Table as AriaTable,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
  Virtualizer,
  TableLayout,
} from 'react-aria-components';
import { generateTableData } from '../../data/dataset';

console.time('Initial render');

interface ReactAriaTableProps {
  rowCount: number;
  columnCount?: number;
}

export const ReactAriaTable = ({ rowCount, columnCount = 10 }: ReactAriaTableProps) => {
  const [tableData, setTableData] = useState(() => generateTableData(rowCount, columnCount));
  const { rows, columns } = tableData;

  const [totalDomEl, setTotalDomEl] = useState(0);

  useEffect(() => {
    const newData = generateTableData(rowCount, columnCount);
    setTableData(newData);
  }, [rowCount, columnCount]);

  useEffect(() => {
    console.timeEnd('Initial render');
    const timeout = setTimeout(() => {
      const tdCount = document.querySelectorAll('td').length;
      const thCount = document.querySelectorAll('th').length;
      const trCount = document.querySelectorAll('tr').length;
      const total = tdCount + thCount + trCount;

      console.log(`DOM Report → <td>: ${tdCount}, <th>: ${thCount}, <tr>: ${trCount}, TOTAL: ${total}`);
      setTotalDomEl(total);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const formatCellValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? '✓' : '✗';
    }
    return String(value);
  };

  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <div>COLUMNS: {columnCount}</div>
      <div>ROWS: {rowCount}</div>
      <div>TOTAL DOM ELEMENTS: {totalDomEl}</div>
      
      <div style={{ height: '600px', border: '1px solid #ccc' }}>
        <Virtualizer
          layout={TableLayout}
          layoutOptions={{
            rowHeight: 40,
            headingHeight: 48,
            padding: 0,
            gap: 0
          }}
        >
          <AriaTable
            aria-label="Virtualized React Aria Table"
            selectionMode="none"
            style={{ 
              borderCollapse: 'separate',
              width: '100%',
              fontSize: '14px'
            }}
          >
            <TableHeader>
              {columns.map((col, index) => (
                <Column
                  key={col}
                  isRowHeader={index === 0}
                  style={{
                    padding: '8px 12px',
                    borderBottom: '2px solid #ccc',
                    borderRight: '1px solid #ddd',
                    fontWeight: 600,
                    background: '#f5f5f5',
                    textAlign: 'left',
                    minWidth: '120px'
                  }}
                >
                  {col}
                </Column>
              ))}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <Row 
                  id={item.id}
                  style={{
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {columns.map((col) => (
                    <Cell
                      key={col}
                      style={{
                        padding: '8px 12px',
                        borderRight: '1px solid #f0f0f0',
                        verticalAlign: 'top'
                      }}
                    >
                      {formatCellValue(item[col])}
                    </Cell>
                  ))}
                </Row>
              )}
            </TableBody>
          </AriaTable>
        </Virtualizer>
      </div>
    </div>
  );
};

export default ReactAriaTable;
