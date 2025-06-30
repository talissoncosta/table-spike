/**
 * Generates an array of column names.
 * @param count Number of columns to generate
 */
export function generateColumns(count: number = 10): string[] {
  return Array.from({ length: count }, (_, i) => `Column ${i + 1}`);
}

/**
 * Generates row data for a given number of rows and columns.
 * @param rowCount Number of rows
 * @param columns Array of column names
 */
export function generateRows(rowCount: number = 100, columns: string[] = generateColumns()) {
  return Array.from({ length: rowCount }, (_, rowIndex) =>
    Object.fromEntries(columns.map((col) => [col, `${col} Row ${rowIndex + 1}`]))
  );
}