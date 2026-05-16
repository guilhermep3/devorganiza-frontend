"use client";
import { TableContent } from "@/src/types/notes";
import { Plus, X } from "lucide-react";

const MAX_COLS = 4;
const MAX_ROWS = 10;
const MIN_COL_WIDTH = 160;

type Props = {
  content: TableContent;
  isActive: boolean;
  onFocus: () => void;
  onChange: (content: TableContent) => void;
  onExitBottom: () => void;
};

export function TableBlock({ content, isActive, onFocus, onChange, onExitBottom }: Props) {
  function updateCell(rowIndex: number, colIndex: number, value: string) {
    const newRows = content.rows.map((row, ri) =>
      ri === rowIndex ? row.map((cell, ci) => (ci === colIndex ? value : cell)) : row
    );
    onChange({ ...content, rows: newRows });
  }

  function updateHeader(colIndex: number, value: string) {
    const newColumns = content.columns.map((col, ci) => (ci === colIndex ? value : col));
    onChange({ ...content, columns: newColumns });
  }

  function addRow() {
    if (content.rows.length >= MAX_ROWS) return;
    const newRow = Array(content.columns.length).fill("");
    onChange({ ...content, rows: [...content.rows, newRow] });
  }

  function addColumn() {
    if (content.columns.length >= MAX_COLS) return;
    const newColumns = [...content.columns, `Col ${content.columns.length + 1}`];
    const newRows = content.rows.map((row) => [...row, ""]);
    onChange({ ...content, columns: newColumns, rows: newRows });
  }

  function handleCellKeyDown(e: React.KeyboardEvent, isLastCell: boolean) {
    if (e.key === "Enter" && isLastCell) {
      e.preventDefault();
      onExitBottom();
    }
  }

  const colWidth = `${100 / content.columns.length}%`;

  function deleteColumn(colIndex: number) {
    if (content.columns.length <= 2) return;

    const newColumns = content.columns.filter((_, ci) => ci !== colIndex);
    const newRows = content.rows.map((row) =>
      row.filter((_, ci) => ci !== colIndex)
    );

    onChange({ columns: newColumns, rows: newRows });
  }

  function deleteRow(rowIndex: number) {
    if (content.rows.length <= 1) return;

    const newRows = content.rows.filter((_, ri) => ri !== rowIndex);
    onChange({ ...content, rows: newRows });
  }

  return (
    <div className="flex flex-col gap-2" onClick={onFocus}>
      <div className="w-full overflow-x-auto scroll-x rounded-lg border border-gray-20 dark:border-gray-30">
        <table className="text-sm border-collapse w-full"
          style={{ minWidth: content.columns.length * MIN_COL_WIDTH }}
        >
          <thead>
            <tr className="bg-main-10 dark:bg-main-20/30">
              {content.columns.map((col, ci) => (
                <th key={ci}
                  className="border-b border-gray-20 dark:border-gray-30 px-3 py-2 text-left font-semibold"
                >
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={col}
                      onFocus={onFocus}
                      onChange={(e) => updateHeader(ci, e.target.value)}
                      className="w-full bg-transparent outline-none font-semibold text-main-50
                               dark:text-main-40 placeholder:text-gray-40 ds-text-sm"
                      placeholder={`Coluna ${ci + 1}`}
                    />

                    {content.columns.length > 2 && (
                      <button
                        onClick={() => deleteColumn(ci)}
                        className="text-gray-40 hover:text-red-500 text-xs"
                        title="Deletar coluna"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {/* Botão adicionar coluna */}
              {content.columns.length < MAX_COLS && (
                <th className="border-b border-gray-20 dark:border-gray-30 px-2 py-2 w-8">
                  <button
                    onClick={addColumn}
                    className="flex items-center justify-center w-6 h-6 rounded-md
                      text-gray-40 hover:text-main-30 hover:bg-main-10
                      dark:hover:bg-main-20/30 transition-colors"
                    title="Adicionar coluna"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, ri) => (
              <tr key={ri} className="group relative hover:bg-gray-10 dark:hover:bg-gray-20/50 transition-colors">
                {row.map((cell, ci) => {
                  const isLastCell = ri === content.rows.length - 1 && ci === row.length - 1;
                  return (
                    <td key={ci}
                      className="border-b border-gray-20 dark:border-gray-30 last:border-b-0 px-3 py-1.5"
                    >
                      <input
                        type="text"
                        value={cell}
                        onFocus={onFocus}
                        onChange={(e) => updateCell(ri, ci, e.target.value)}
                        onKeyDown={(e) => handleCellKeyDown(e, isLastCell)}
                        className="w-full bg-transparent outline-none text-gray-90 dark:text-gray-90
                          placeholder:text-gray-30 ds-text-sm"
                        placeholder="—"
                      />
                    </td>
                  );
                })}
                {content.columns.length < MAX_COLS && <td />}
                {content.rows.length > 1 && (
                  <td className="px-1 w-6 absolute top-2 right-0">
                    <button
                      onClick={() => deleteRow(ri)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity
                        text-gray-40 hover:text-red-500 cursor-pointer"
                      title="Deletar linha"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {content.rows.length < MAX_ROWS && (
        <button
          onClick={addRow}
          className="flex items-center gap-1.5 ds-text-xs text-gray-50 hover:text-main-30
            transition-colors self-start px-1 py-0.5 rounded"
        >
          <Plus className="w-3 h-3" />
          Adicionar linha
        </button>
      )}
    </div>
  );
}