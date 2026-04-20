"use client";
import { Box, BoxContent, ListContent, TableContent, TextContent } from "@/src/types/notes";
import { TextBlock } from "./box/textBlock";
import { ListBlock } from "./box/listBlock";
import { TableBlock } from "./box/tableBlock";
import { motion } from "motion/react";
import { SmalllTrashButton } from "../smallTrashButton";

type Props = {
  box: Box;
  isActive: boolean;
  onFocus: () => void;
  onChange: (content: BoxContent, newType?: Box["type"]) => void;
  onAddBoxBelow: () => void;
  onBackspaceEmpty: () => void;
  onDelete: () => void;
};

export function EditorBlock({
  box, isActive, onFocus, onChange, onAddBoxBelow, onBackspaceEmpty, onDelete,
}: Props) {

  function handleConvertToList() {
    const initial: ListContent = { ordered: true, items: [{ text: "" }] };
    onChange(initial, "list");
  }

  function handleConvertToTable() {
    const initial: TableContent = {
      columns: ["Coluna 1", "Coluna 2", "Coluna 3"],
      rows: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
    onChange(initial, "table");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className={`group relative rounded-lg px-3 py-2.5 transition-all duration-150 ${isActive
        ? "bg-white dark:bg-gray-10 shadow-sm shadow-gray-20 ring-1 ring-gray-20 dark:ring-gray-30"
        : "hover:bg-gray-10/60 dark:hover:bg-gray-20/30"
        }`}
    >
      <SmalllTrashButton className="absolute -right-2 -top-2 z-10"
        handleClick={(e) => { e!.stopPropagation(); onDelete(); }}
      />
      {isActive && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 h-4/5 rounded-full bg-main-30" />
      )}
      {box.type === "text" && (
        <TextBlock
          content={box.content as TextContent}
          isActive={isActive}
          onFocus={onFocus}
          onChange={(c) => onChange(c)}
          onConvertToList={handleConvertToList}
          onConvertToTable={handleConvertToTable}
          onBackspaceEmpty={onBackspaceEmpty}
        />
      )}
      {box.type === "list" && (
        <ListBlock
          content={box.content as ListContent}
          isActive={isActive}
          onFocus={onFocus}
          onChange={(c) => onChange(c)}
          onExitBottom={onAddBoxBelow}
        />
      )}
      {box.type === "table" && (
        <TableBlock
          content={box.content as TableContent}
          isActive={isActive}
          onFocus={onFocus}
          onChange={(c) => onChange(c)}
          onExitBottom={onAddBoxBelow}
        />
      )}
    </motion.div>
  );
}