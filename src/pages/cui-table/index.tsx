import React, { useState, useEffect } from 'react';
import { Table, Header, HeaderCell, Body, Row, Cell } from '@calendly/ui/components/table';
import { generateTableData } from '../../data/dataset';

console.time('Initial render');

const ROWS = 10;
const COLUMNS = 10;

type SortDirection = 'asc' | 'desc';

interface SortedColumn {
  name: string;
  direction: SortDirection;
}

interface CUITableProps {
  rowCount?: number;
  columnCount?: number;
}

// Helper function to transform rows into the format expected by CUI table
function mapRowsToLabeledKeys(rows: any[], columnCount: number) {
  return rows.map((row) => {
    const transformed: Record<string, string> = {};
    for (let i = 0; i < columnCount; i++) {
      const columnName = `Column ${i + 1}`;
      const value = row[columnName];
      if (typeof value === 'boolean') {
        transformed[`col${i + 1}`] = value ? '✓' : '✗';
      } else {
        transformed[`col${i + 1}`] = String(value || '');
      }
    }
    return transformed;
  });
}

export const CUITable = ({ rowCount = ROWS, columnCount = COLUMNS }: CUITableProps) => {
  const { columns, rows } = generateTableData(rowCount, columnCount);
  const [totalDomEl, setTotalDomEl] = useState(0);
  const [sortedColumn, setSortedColumn] = useState<SortedColumn>();
  const [values, setValues] = useState(() => mapRowsToLabeledKeys(rows, columnCount));

  const onSort = (column: string, direction?: SortDirection) => {
    const newDirection = sortedColumn?.name === column && sortedColumn?.direction === 'asc' ? 'desc' : 'asc';
    
    setSortedColumn({
      name: column,
      direction: newDirection
    });

    setValues((prev) =>
      [...prev].sort((a, b) => {
        const left = a[column] || '';
        const right = b[column] || '';
        const multiplier = newDirection === 'asc' ? 1 : -1;
        return left.localeCompare(right) * multiplier;
      })
    );
  };

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

  // Update values when rowCount or columnCount changes
  useEffect(() => {
    const newData = generateTableData(rowCount, columnCount);
    setValues(mapRowsToLabeledKeys(newData.rows, columnCount));
  }, [rowCount, columnCount]);

  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <div>COLUMNS: {columnCount}</div>
      <div>ROWS: {rowCount}</div>
      <div>TOTAL DOM ELEMENTS: {totalDomEl}</div>
      
      <div style={{ height: '600px', overflowY: 'auto', border: '1px solid #ccc' }}>
        <Table onSort={onSort} sortedColumn={sortedColumn}>
          <Header>
            <HeaderCell hugContent />
            {columns.map((col, i) => (
              <HeaderCell 
                key={i} 
                columnName={`col${i + 1}`}
              >
                {col}
              </HeaderCell>
            ))}
          </Header>
          <Body>
            {values.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <Cell key={colIndex}>
                    {row[`col${colIndex + 1}`]}
                  </Cell>
                ))}
              </Row>
            ))}
          </Body>
        </Table>
      </div>
    </div>
  );
};

export default CUITable;