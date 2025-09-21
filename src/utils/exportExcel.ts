import * as XLSX from "xlsx";

export async function exportTableToExcel<T extends Record<string, unknown>>(
  data: T[],
  filename: string
): Promise<void> {
  // Dynamically import file-saver only on the client side
  const { saveAs } = await import("file-saver");

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${filename}.xlsx`);
}
