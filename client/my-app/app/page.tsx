'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/services/posts';
import { PostCard } from '@/components/PostCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl bg-muted/50 p-6">
              <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted" />
              <div className="mt-6 space-y-3">
                <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
        <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center max-w-md">
          <p className="mb-4 text-lg font-bold text-destructive">Connection error</p>
          <p className="text-muted-foreground">We couldn't reach the server. Please check your internet connection or make sure the backend is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Hero Section */}
      <div className="mb-20 text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          <Sparkles size={16} />
          <span>New in Tech & Design</span>
        </div>
        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-7xl">
          Insights for the <span className="text-primary italic">next</span> generation.
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Discover stories, thinking, and expertise from writers on any topic. A minimal space for maximum creativity.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard/create"
            className="rounded-full bg-foreground px-8 py-3.5 font-bold text-background transition-transform hover:scale-105 active:scale-95"
          >
            Start Writing
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Manage Blog <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mb-10 border-b border-border pb-6">
        <h2 className="text-2xl font-bold tracking-tight">Recent Publications</h2>
      </div>

      {posts?.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30">
          <p className="text-lg font-medium text-muted-foreground">No stories yet. Be the first to publish!</p>
          <Link href="/dashboard/create" className="mt-4 font-bold text-primary hover:underline">Create a post →</Link>
        </div>
      ) : (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}

      {/* Footer-like Newsletter */}
      <div className="mt-32 rounded-[2.5rem] bg-foreground px-8 py-16 text-center text-background">
        <h3 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h3>
        <p className="text-background/60 mb-8 max-w-md mx-auto">Get the best of our stories delivered weekly to your inbox. No spam, ever.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto bg-white/10 p-2 rounded-2xl">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-transparent px-4 py-2 outline-none text-background placeholder:text-background/40"
          />
          <button className="bg-background text-foreground px-6 py-2.5 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
