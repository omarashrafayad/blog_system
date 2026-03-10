import { api } from '@/lib/axios';
import type { Post, CreatePostInput, UpdatePostInput } from '@/types/post';

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>('/posts');
  return data;
}

export async function fetchPostById(id: string): Promise<Post> {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
}

export async function createPost(input: CreatePostInput | FormData): Promise<Post> {
  const isFormData = input instanceof FormData;
  const { data } = await api.post<Post>('/posts', input, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return data;
}

export async function createPosts(posts: CreatePostInput[]): Promise<Post[]> {
  const { data } = await api.post<Post[]>('/posts/bulk', { posts });
  return data;
}

export async function updatePost(id: string, input: UpdatePostInput | FormData): Promise<Post> {
  const isFormData = input instanceof FormData;
  const { data } = await api.put<Post>(`/posts/${id}`, input, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return data;
}

export async function deletePost(id: string): Promise<void> {
  await api.delete(`/posts/${id}`);
}
