'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/services/posts';
import { createPostSchema, type CreatePostFormData } from '@/lib/validations/post';
import { RichTextEditor } from './editor/RichTextEditor';
import { AuthorSelector } from './editor/AuthorSelector';
import { ArrowLeft, Rocket, Image as ImageIcon, Layout, Type } from 'lucide-react';
import Link from 'next/link';

export function CreatePostForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.push('/dashboard');
    },
  });

  const { control, register, handleSubmit, formState: { errors } } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', description: '', content: '', headerImage: '', author: '' },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Write a New Story</h1>
          <p className="mt-2 text-muted-foreground">Share your ideas with the world through words and images.</p>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Main Content Area */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Type size={18} />
                <label htmlFor="title" className="text-sm font-semibold tracking-tight">Article Title</label>
              </div>
              <input
                id="title"
                {...register('title')}
                className="w-full rounded-2xl border-none bg-muted/50 px-5 py-4 text-xl font-bold outline-none ring-1 ring-border focus:bg-card focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/30 shadow-inner"
                placeholder="The amazing title of your post..."
              />
              {errors.title && <p className="text-xs font-medium text-destructive px-2">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Layout size={18} />
                <label htmlFor="description" className="text-sm font-semibold tracking-tight">Short Summary</label>
              </div>
              <textarea
                id="description"
                {...register('description')}
                rows={3}
                className="w-full rounded-2xl border-none bg-muted/50 px-5 py-4 outline-none ring-1 ring-border focus:bg-card focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/30 shadow-inner resize-none"
                placeholder="What is this article about? Keep it brief and catchy."
              />
              {errors.description && <p className="text-xs font-medium text-destructive px-2">{errors.description.message}</p>}
            </div>
          </div>

          {/* Metadata Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <ImageIcon size={18} />
                <label htmlFor="headerImage" className="text-sm font-semibold tracking-tight">Header Image</label>
              </div>
              <div className="relative">
                <input
                  id="headerImage"
                  {...register('headerImage')}
                  type="url"
                  className="w-full rounded-2xl border-none bg-muted/50 px-5 py-4 pl-12 outline-none ring-1 ring-border focus:bg-card focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/30 shadow-inner"
                  placeholder="https://images.unsplash.com/..."
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                  <ImageIcon size={20} />
                </div>
              </div>
              {errors.headerImage && <p className="text-xs font-medium text-destructive px-2">{errors.headerImage.message}</p>}
              <p className="text-[10px] text-muted-foreground px-2 italic">Tip: Use high-quality Unsplash URLs for better visuals.</p>
            </div>

            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <AuthorSelector value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.author && <p className="text-xs font-medium text-destructive px-2">{errors.author.message}</p>}
          </div>
        </div>

        {/* Editor Section */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-tight block ml-1">Write your content</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor content={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && <p className="text-xs font-medium text-destructive px-2">{errors.content.message}</p>}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-4 border-t border-border pt-10">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="rounded-full px-8 py-3 font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
          >
            Cancel and Discard
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex items-center gap-2 rounded-full bg-primary px-10 py-3 font-bold text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all hover:bg-primary/90 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            {mutation.isPending ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                <Rocket size={20} />
                Publish Article
              </>
            )}
          </button>
        </div>

        {mutation.isError && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-center text-sm font-semibold text-destructive">
            Something went wrong. Please check your connection and try again.
          </div>
        )}
      </form>
    </div>
  );
}
