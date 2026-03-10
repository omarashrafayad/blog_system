'use client';

import Link from 'next/link';
import { useDeletePost } from '@/hooks';
import type { Post } from '@/types/post';
import { Edit3, Trash2, Eye, Calendar, User } from 'lucide-react';

interface DashboardPostCardProps {
  post: Post;
}

export function DashboardPostCard({ post }: DashboardPostCardProps) {
  const deleteMutation = useDeletePost();

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDelete = () => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete this story forever?')) {
      deleteMutation.mutate(post.id);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-card transition-all hover:shadow-xl dark:hover:shadow-2xl/40">
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={post.headerImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <Link
          href={`/posts/${post.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-xl">
            <Eye size={20} />
          </div>
        </Link>
      </div>

      <div className="p-6">
        <h3 className="mb-2 line-clamp-1 text-xl font-bold tracking-tight">{post.title}</h3>

        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-1.5 font-bold text-primary italic">
            <User size={12} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5 uppercase tracking-wider">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/edit/${post.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground transition-all hover:bg-primary hover:text-white"
          >
            <Edit3 size={16} />
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-destructive/20 text-destructive transition-colors hover:bg-destructive cursor-pointer hover:bg-primary disabled:opacity-50"
            title="Delete Story"
          >
            {deleteMutation.isPending ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-destructive/30 border-t-destructive" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
