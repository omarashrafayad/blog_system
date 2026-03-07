'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/services/posts';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';

export default function SinglePostPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="h-4 w-24 animate-pulse rounded bg-muted mb-8" />
        <div className="aspect-video w-full animate-pulse rounded-[2.5rem] bg-muted mb-10" />
        <div className="h-12 w-3/4 animate-pulse rounded bg-muted mb-4" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">The story you're looking for might have been moved or deleted.</p>
        <Link href="/" className="rounded-full bg-primary px-8 py-3 font-bold text-white transition-all hover:scale-105 active:scale-95">
          Return to Library
        </Link>
      </div>
    );
  }

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 animate-in fade-in duration-1000">
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-white">
            <ArrowLeft size={16} />
          </div>
          Back to Stories
        </Link>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] shadow-2xl mb-16 group">
        <img
          src={post.headerImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-6 mb-8 text-sm font-bold uppercase tracking-widest text-primary">
            <span>Tech & Design</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={14} />
              <span>{date}</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground mb-8 leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-border py-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                <User size={24} />
              </div>
              <div>
                <p className="font-bold text-foreground">{post.author}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Calendar size={12} />
                  <time dateTime={post.createdAt}>{date}</time>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-20 border-t border-border pt-10">
          <h2 className="text-2xl font-bold mb-6 italic text-center">"Every story matters."</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="h-10 w-10 rounded-full bg-muted" />
            </div>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>
      </div>
    </article>
  );
}
