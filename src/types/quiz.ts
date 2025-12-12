export interface Quiz {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}