import Link from 'next/link';
import { BulkCreateForm } from '@/components/BulkCreateForm';

export default function BulkCreatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/dashboard" className="mb-6 inline-block text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
        ← Dashboard
      </Link>
      <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Create multiple posts</h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        Paste a JSON array of posts. Each post must have: title, description, content, headerImage, author — none can be empty.
      </p>
      <BulkCreateForm />
    </div>
  );
}
