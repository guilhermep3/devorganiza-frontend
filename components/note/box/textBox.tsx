"use client";
import { TextContent } from "@/src/types/notes";
import { useEffect, useRef } from "react";

type Props = {
  content: TextContent;
  isActive: boolean;
  onFocus: () => void;
  onChange: (content: TextContent) => void;
  onConvertToList: () => void;
  onConvertToTable: () => void;
  onBackspaceEmpty: () => void;
};

export function TextBox({
  content,
  isActive,
  onFocus,
  onChange,
  onConvertToList,
  onConvertToTable,
  onBackspaceEmpty,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.focus();
      const len = ref.current.value.length;
      ref.current.setSelectionRange(len, len);
    }
  }, [isActive]);

  // Auto-resize sempre que o texto mudar
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [content.text]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    const value = el.value;
    const caretPos = el.selectionStart ?? 0;

    // Ctrl+Espaço — reservado para cancelamento futuro
    if (e.ctrlKey && e.key === " ") {
      e.preventDefault();
      return;
    }

    // Espaço — verifica se o texto antes do cursor é exatamente "1."
    if (e.key === " ") {
      const textBeforeCaret = value.slice(0, caretPos);
      if (textBeforeCaret === "1.") {
        e.preventDefault();
        onChange({ text: "" });
        onConvertToList();
        return;
      }
    }

    // Enter — verifica se o texto (trimado) antes do cursor é "/table"
    // Se sim, converte para tabela. Caso contrário, Enter funciona normalmente (nova linha).
    if (e.key === "Enter") {
      const textBeforeCaret = value.slice(0, caretPos).trimEnd();
      if (textBeforeCaret === "/table") {
        e.preventDefault();
        onChange({ text: "" });
        onConvertToTable();
        return;
      }
      // Comportamento padrão do textarea: cria nova linha
      return;
    }

    // Backspace com campo vazio → sinaliza para deletar este box
    if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      onBackspaceEmpty();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange({ text: e.target.value });
  }

  return (
    <textarea
      ref={ref}
      value={content.text}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      placeholder='Digite algo... ("1. " para lista, "/table" + Enter para tabela)'
      rows={1}
      className="w-full resize-none bg-transparent outline-none ds-text-md text-gray-90
        dark:text-gray-90 placeholder:text-gray-40 leading-relaxed overflow-hidden
        transition-colors duration-150"
    />
  );
}