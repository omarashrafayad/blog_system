import type { Request, Response } from 'express';
import * as postsModel from '../models/posts';
import type { CreatePostInput, UpdatePostInput } from '../types/post';

function isValidUrl(s: string): boolean {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

/** يتحقق أن المقال غير فارغ: كل الحقول مطلوبة وغير فارغة بعد trim */
/** يتحقق أن المقال غير فارغ: كل الحقول مطلوبة وغير فارغة بعد trim */
function validateCreateInput(input: unknown, filePath?: string): { ok: true; data: CreatePostInput } | { ok: false; error: string } {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'المقال يجب أن يحتوي على: title, description, content, author (غير فارغة)' };
  }
  const o = input as Record<string, unknown>;
  const title = typeof o.title === 'string' ? o.title.trim() : '';
  const description = typeof o.description === 'string' ? o.description.trim() : '';
  const content = typeof o.content === 'string' ? o.content.trim() : '';
  const author = typeof o.author === 'string' ? o.author.trim() : '';

  // If filePath is provided, use it, otherwise check body
  let headerImage = filePath || (typeof o.headerImage === 'string' ? o.headerImage.trim() : '');

  if (!title) return { ok: false, error: 'العنوان مطلوب ولا يمكن أن يكون فارغاً' };
  if (title.length < 5) return { ok: false, error: 'العنوان يجب أن يكون 5 أحرف على الأقل' };
  if (!description) return { ok: false, error: 'الوصف مطلوب ولا يمكن أن يكون فارغاً' };
  if (!content) return { ok: false, error: 'المحتوى مطلوب ولا يمكن أن يكون فارغاً' };
  if (!headerImage) return { ok: false, error: 'رابط صورة الغلاف أو ملف الصورة مطلوب' };

  // If it's not a local file path (doesn't start with uploads/), validate as URL
  if (!filePath && !isValidUrl(headerImage)) {
    return { ok: false, error: 'رابط صورة الغلاف يجب أن يكون رابطاً صحيحاً' };
  }

  if (!author) return { ok: false, error: 'اسم الكاتب مطلوب ولا يمكن أن يكون فارغاً' };

  return {
    ok: true,
    data: { title, description, content, headerImage, author },
  };
}

export async function getAllPosts(_req: Request, res: Response): Promise<void> {
  try {
    const posts = await postsModel.getAllPosts();
    // Convert relative paths to absolute URLs if needed
    const host = _req.get('host');
    const protocol = _req.protocol;
    const formattedPosts = posts.map(post => ({
      ...post,
      headerImage: post.headerImage.startsWith('uploads')
        ? `${protocol}://${host}/${post.headerImage.replace(/\\/g, '/')}`
        : post.headerImage
    }));
    res.json(formattedPosts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

export async function getPostById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const post = await postsModel.getPostById(id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    const host = req.get('host');
    const protocol = req.protocol;
    const formattedPost = {
      ...post,
      headerImage: post.headerImage.startsWith('uploads')
        ? `${protocol}://${host}/${post.headerImage.replace(/\\/g, '/')}`
        : post.headerImage
    };
    res.json(formattedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}

export async function createPost(req: Request, res: Response): Promise<void> {
  const filePath = req.file ? req.file.path : undefined;
  const result = validateCreateInput(req.body, filePath);

  if (!result.ok) {
    res.status(400).json({ error: result.error });
    return;
  }
  try {
    const post = await postsModel.createPost(result.data);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
}

export async function bulkCreatePost(req: Request, res: Response): Promise<void> {
  const body = req.body as { posts?: unknown[] };
  if (!Array.isArray(body?.posts) || body.posts.length === 0) {
    res.status(400).json({ error: 'يجب إرسال مصفوفة غير فارغة: { "posts": [...] }' });
    return;
  }
  const valid: CreatePostInput[] = [];
  for (let i = 0; i < body.posts.length; i++) {
    const result = validateCreateInput(body.posts[i]);
    if (!result.ok) {
      res.status(400).json({ error: `مقالة رقم ${i + 1}: ${result.error}` });
      return;
    }
    valid.push(result.data);
  }
  try {
    const posts = await postsModel.createManyPosts(valid);
    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create posts' });
  }
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const input = req.body as UpdatePostInput;
  const updates: UpdatePostInput = {};

  if (req.file) {
    updates.headerImage = req.file.path;
  }

  if (input.title !== undefined) {
    const t = String(input.title).trim();
    if (!t) {
      res.status(400).json({ error: 'العنوان لا يمكن أن يكون فارغاً' });
      return;
    }
    if (t.length < 5) {
      res.status(400).json({ error: 'العنوان يجب أن يكون 5 أحرف على الأقل' });
      return;
    }
    updates.title = t;
  }
  if (input.description !== undefined) {
    const d = String(input.description).trim();
    if (!d) {
      res.status(400).json({ error: 'الوصف لا يمكن أن يكون فارغاً' });
      return;
    }
    updates.description = d;
  }
  if (input.content !== undefined) {
    const c = String(input.content).trim();
    if (!c) {
      res.status(400).json({ error: 'المحتوى لا يمكن أن يكون فارغاً' });
      return;
    }
    updates.content = c;
  }
  if (input.headerImage !== undefined && !req.file) {
    const h = String(input.headerImage).trim();
    if (!h) {
      res.status(400).json({ error: 'رابط الصورة لا يمكن أن يكون فارغاً' });
      return;
    }
    if (!h.startsWith('uploads') && !isValidUrl(h)) {
      res.status(400).json({ error: 'رابط الصورة غير صحيح' });
      return;
    }
    updates.headerImage = h;
  }
  if (input.author !== undefined) {
    const a = String(input.author).trim();
    if (!a) {
      res.status(400).json({ error: 'اسم الكاتب لا يمكن أن يكون فارغاً' });
      return;
    }
    updates.author = a;
  }
  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: 'No fields to update' });
    return;
  }
  try {
    const post = await postsModel.updatePost(id, updates);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const deleted = await postsModel.deletePost(id);
    if (!deleted) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
}
