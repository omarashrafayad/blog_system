export interface Author {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type CreateAuthorInput = Omit<Author, 'id' | 'createdAt' | 'updatedAt'>;
