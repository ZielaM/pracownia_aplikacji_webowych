export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string | null;
  published: boolean;
  kategoriaId: number;
}
