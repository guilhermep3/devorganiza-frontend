export type BlockType = "text" | "list" | "table";

export type TextContent = {
  text: string;
};

export type ListContent = {
  ordered: boolean;
  items: { text: string }[];
};

export type TableContent = {
  columns: string[];
  rows: string[][];
};

export type BlockContent = TextContent | ListContent | TableContent;

export type Block = {
  id: string;
  type: BlockType;
  content: BlockContent;
  position: number;
  notesId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type Note = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteWithBlocks = {
  note: Note;
  blocks: Block[];
};