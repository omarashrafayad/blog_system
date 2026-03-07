export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  headerImage: string;
  author: string;
  createdAt: string;
}

export interface CreatePostInput {
  title: string;
  description: string;
  content: string;
  headerImage: string;
  author: string;
}

export type UpdatePostInput = Partial<CreatePostInput>;
