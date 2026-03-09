export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    wpisId: number;
    content: string | null;
}

export type Comments = Comment[];
