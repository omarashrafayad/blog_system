'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBulkCreatePosts } from '@/hooks';
import type { CreatePostInput } from '@/types/post';

const example: CreatePostInput[] = [
  {
    title: 'First Post Title At Least Five Chars',
    description: 'Short description',
    content: '<p>Content here.</p>',
    headerImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    author: 'Author One',
  },
  {
    title: 'Second Post Title At Least Five Chars',
    description: 'Short description',
    content: '<p>Content here.</p>',
    headerImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    author: 'Author Two',
  },
];

export function BulkCreateForm() {
  const [json, setJson] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);

  const mutation = useBulkCreatePosts();

  // Handling onSuccess/onError manually to keep existing specific logic
  const originalOnSuccess = mutation.mutate;
  const handleBulkSubmit = (arr: CreatePostInput[]) => {
    mutation.mutate(arr, {
      onSuccess: (data) => {
        setJson('');
        setParseError(null);
        alert(`${data.length} post(s) created.`);
      },
      onError: (err: any) => {
        const msg = err.response?.data?.error ?? 'Request failed. Check the data format (each post must be non-empty).';
        setParseError(msg);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParseError(null);
    let arr: unknown[];
    try {
      arr = JSON.parse(json || '[]');
    } catch {
      setParseError('Invalid JSON format.');
      return;
    }
    if (!Array.isArray(arr) || arr.length === 0) {
      setParseError('Value must be a non-empty array of posts (each: title, description, content, headerImage, author).');
      return;
    }
    handleBulkSubmit(arr as CreatePostInput[]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="json" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Posts array (JSON) — each post must be non-empty
        </label>
        <textarea
          id="json"
          value={json}
          onChange={(e) => { setJson(e.target.value); setParseError(null); }}
          rows={16}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 font-mono text-sm text-neutral-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
          placeholder='[{"title":"...", "description":"...", "content":"...", "headerImage":"https://...", "author":"..."}]'
        />
        {parseError && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{parseError}</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={mutation.isPending} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50">
          {mutation.isPending ? 'Creating…' : 'Create posts'}
        </button>
        <button type="button" onClick={() => { setJson(JSON.stringify(example, null, 2)); setParseError(null); }} className="rounded-lg border border-neutral-300 bg-white px-4 py-2 font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
          Fill example
        </button>
        <Link href="/dashboard" className="rounded-lg border border-neutral-300 bg-white px-4 py-2 font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
          Cancel
        </Link>
      </div>
    </form>
  );
}
