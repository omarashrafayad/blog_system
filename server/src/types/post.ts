export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  headerImage: string;
  author: string;
  createdAt: string;
}

export type CreatePostInput = Omit<Post, 'id' | 'createdAt'>;

export interface BulkCreateInput {
  posts: CreatePostInput[];
}

export type UpdatePostInput = Partial<Omit<Post, 'id' | 'createdAt'>>;
