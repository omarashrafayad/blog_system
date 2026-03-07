import { v4 as uuidv4 } from 'uuid';
import { AuthorModel } from '../models/Author';
import type { CreateAuthorInput, Author } from '../types/author';

export async function getAllAuthors(): Promise<Author[]> {
    const docs = await AuthorModel.find().lean();
    return docs as unknown as Author[];
}

export async function getAuthorById(id: string): Promise<Author | null> {
    const doc = await AuthorModel.findOne({ id }).lean();
    return doc as unknown as Author | null;
}

export async function createAuthor(input: CreateAuthorInput): Promise<Author> {
    const author = {
        id: uuidv4(),
        ...input,
    };
    const doc = await AuthorModel.create(author);
    return doc.toObject() as unknown as Author;
}
