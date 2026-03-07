'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/services/posts';
import { DashboardPostCard } from '@/components/DashboardPostCard';
import { Plus, Boxes, BarChart3, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 animate-in fade-in duration-700">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
            <BarChart3 size={16} />
            <span>Management Console</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Content Dashboard</h1>
          <p className="text-muted-foreground">Monitor, edit, and organize your published stories with ease.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/create"
            className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 shadow-primary/20"
          >
            <Plus size={20} />
            Create Post
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Total Stories</p>
          <p className="text-4xl font-black">{posts?.length || 0}</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Avg. Read Time</p>
          <p className="text-4xl font-black">4.2m</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Active Authors</p>
          <p className="text-4xl font-black">12</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm bg-primary/5 border-primary/20">
          <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Health Status</p>
          <p className="text-4xl font-black text-primary">Optimal</p>
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-[2rem] bg-muted/50" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-10 text-center text-destructive">
          <p className="font-bold mb-2">Failed to load content</p>
          <p className="text-sm opacity-80">The system encountered an error connecting to the backend services. Please refresh or check logs.</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {posts?.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-border bg-muted/20">
              <p className="text-xl font-medium text-muted-foreground">Your library is empty</p>
              <Link href="/dashboard/create" className="mt-4 font-bold text-primary hover:underline underline-offset-4">Create your first story →</Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts?.map((post) => <DashboardPostCard key={post.id} post={post} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
