export type BoxType = "text" | "list" | "table";

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

export type BoxContent = TextContent | ListContent | TableContent;

export type Box = {
  id: string;
  type: BoxType;
  content: BoxContent;
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

export type NoteWithBoxes = {
  note: Note;
  boxes: Box[];
};