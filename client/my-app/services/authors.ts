import { api } from '@/lib/axios';



export interface Author {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
}

export async function getAllAuthors(): Promise<Author[]> {
    const { data } = await api.get('/authors');
    return data;
}

export async function createAuthor(author: { name: string; avatar?: string; bio?: string }): Promise<Author> {
    const { data } = await api.post('/authors', author);
    return data;
}
