'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/services/posts';
import { EditPostForm } from '@/components/EditPostForm';

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-8 h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-red-600 dark:text-red-400">Post not found.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/dashboard" className="mb-6 inline-block text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
        ← Dashboard
      </Link>
      <h1 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Edit post</h1>
      <EditPostForm post={post} />
    </div>
  );
}
