import Link from 'next/link';
import { CreatePostForm } from '@/components/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/dashboard" className="mb-6 inline-block text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
        ← Dashboard
      </Link>
      <h1 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Create new post</h1>
      <p className="mb-4 text-neutral-600 dark:text-neutral-400">All fields are required and cannot be empty.</p>
      <CreatePostForm />
    </div>
  );
}
