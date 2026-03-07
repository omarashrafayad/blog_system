import { v4 as uuidv4 } from 'uuid';
import { PostModel } from './Post';
import type { Post, CreatePostInput, UpdatePostInput } from '../types/post';

export async function getAllPosts(): Promise<Post[]> {
  const docs = await PostModel.find().sort({ createdAt: -1 }).lean();
  return docs as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const doc = await PostModel.findOne({ id }).lean();
  return doc as Post | null;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const post: Post = {
    id: uuidv4(),
    ...input,
    createdAt: new Date().toISOString(),
  };
  await PostModel.create(post);
  return post;
}

export async function createManyPosts(inputs: CreatePostInput[]): Promise<Post[]> {
  if (inputs.length === 0) return [];
  const posts: Post[] = inputs.map((input) => ({
    id: uuidv4(),
    ...input,
    createdAt: new Date().toISOString(),
  }));
  await PostModel.insertMany(posts);
  return posts;
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<Post | null> {
  const doc = await PostModel.findOneAndUpdate(
    { id },
    { $set: input },
    { new: true }
  ).lean();
  return doc as Post | null;
}

export async function deletePost(id: string): Promise<boolean> {
  const result = await PostModel.deleteOne({ id });
  return result.deletedCount > 0;
}
