import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters and cannot be empty'),
  description: z.string().trim().min(1, 'Description is required and cannot be empty'),
  content: z.string().trim().min(1, 'Content is required and cannot be empty'),
  headerImage: z.any().refine((val) => {
    if (typeof val === 'string') {
      const urlPattern = /^(http|https):\/\/[^ "]+$/;
      return urlPattern.test(val);
    }
    return val instanceof File || (val && typeof val === 'object' && 'name' in val);
  }, 'Please select a valid image file or enter a valid URL'),
  author: z.string().trim().min(1, 'Author is required and cannot be empty'),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
