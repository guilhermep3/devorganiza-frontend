"use client";
import { ListContent } from "@/src/types/notes";
import { useEffect, useRef } from "react";

type Props = {
  content: ListContent;
  isActive: boolean;
  onFocus: () => void;
  onChange: (content: ListContent) => void;
  onExitBottom: () => void;
};

export function ListBlock({ content, isActive, onFocus, onChange, onExitBottom }: Props) {
  const itemRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isActive) {
      const last = itemRefs.current[itemRefs.current.length - 1];
      last?.focus();
    }
  }, [isActive]);

  function focusItem(index: number) {
    setTimeout(() => itemRefs.current[index]?.focus(), 0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    // Ctrl+Espaço cancela
    if (e.ctrlKey && e.key === " ") {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const currentItem = content.items[index];

      // Item vazio → sair da lista
      if (currentItem.text === "") {
        // Remove o item vazio e sinaliza saída
        const newItems = content.items.filter((_, i) => i !== index);
        onChange({ ...content, items: newItems.length > 0 ? newItems : [{ text: "" }] });
        onExitBottom();
        return;
      }

      // Insere novo item abaixo
      const newItems = [...content.items];
      newItems.splice(index + 1, 0, { text: "" });
      onChange({ ...content, items: newItems });
      focusItem(index + 1);
      return;
    }

    if (e.key === "Backspace" && e.currentTarget.value === "" && content.items.length > 1) {
      e.preventDefault();
      const newItems = content.items.filter((_, i) => i !== index);
      onChange({ ...content, items: newItems });
      focusItem(Math.max(0, index - 1));
    }
  }

  function updateItem(index: number, text: string) {
    const newItems = [...content.items];
    newItems[index] = { text };
    onChange({ ...content, items: newItems });
  }

  return (
    <ol className="flex flex-col gap-1 list-none">
      {content.items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="ds-text-sm text-main-30 font-semibold min-w-5 select-none">
            {index + 1}.
          </span>
          <input
            ref={(el) => { itemRefs.current[index] = el; }}
            type="text"
            value={item.text}
            onFocus={onFocus}
            onChange={(e) => updateItem(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder={`Item ${index + 1}`}
            className="flex-1 bg-transparent outline-none ds-text-md text-gray-90
              dark:text-gray-90 placeholder:text-gray-40 leading-relaxed"
          />
        </li>
      ))}
    </ol>
  );
}