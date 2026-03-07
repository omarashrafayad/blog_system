import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters and cannot be empty'),
  description: z.string().trim().min(1, 'Description is required and cannot be empty'),
  content: z.string().trim().min(1, 'Content is required and cannot be empty'),
  headerImage: z.string().trim().url('Please enter a valid image URL'),
  author: z.string().trim().min(1, 'Author is required and cannot be empty'),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
