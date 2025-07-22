/**
 * Generates an array of column names.
 * @param count Number of columns to generate
 */
function generateColumns(count: number = 100): string[] {
  return Array.from({ length: count }, (_, i) => `Column ${i + 1}`);
}

/**
 * Generates a random value based on column index for variety
 */
function generateCellValue(columnIndex: number, rowIndex: number): string | number | boolean {
  const type = columnIndex % 4;
  switch (type) {
    case 0:
      return `Text ${rowIndex + 1}-${columnIndex + 1}`;
    case 1:
      return Math.floor(Math.random() * 1000);
    case 2:
      return Math.random() > 0.5;
    case 3:
      return `Data ${String.fromCharCode(65 + (rowIndex % 26))}${columnIndex}`;
    default:
      return `Value ${rowIndex}-${columnIndex}`;
  }
}

/**
 * Generates row data for a given number of rows and columns.
 * @param rowCount Number of rows
 * @param columns Array of column names
 */
function generateRows(rowCount: number = 10000, columns: string[] = generateColumns()) {
  return Array.from({ length: rowCount }, (_, rowIndex) => {
    const row: Record<string, any> = {
      id: `row-${rowIndex}`, // Add proper id for React Aria
    };
    
    columns.forEach((col, colIndex) => {
      row[col] = generateCellValue(colIndex, rowIndex);
    });
    
    return row;
  });
}

export function generateTableData(rowCount = 10000, colCount = 100) {
  const columns = generateColumns(colCount);
  const rows = generateRows(rowCount, columns);
  return { columns, rows };
}