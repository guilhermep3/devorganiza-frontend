export interface Quiz {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}