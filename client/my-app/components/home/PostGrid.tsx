'use client';

import { usePosts } from '@/hooks';
import { PostCard } from '@/components/PostCard';
import Link from 'next/link';

export function PostGrid() {
    const { data: posts, isLoading, error } = usePosts();

    if (isLoading) {
        return (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-3xl bg-muted/50 p-6 shadow-sm ring-1 ring-border">
                        <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted" />
                        <div className="mt-6 space-y-3">
                            <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
                            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-full animate-pulse rounded bg-muted" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center max-w-md">
                    <p className="mb-4 text-lg font-bold text-destructive">Connection error</p>
                    <p className="text-muted-foreground text-sm">We couldn't reach the server. Please check your internet connection or make sure the backend is running.</p>
                </div>
            </div>
        );
    }

    if (posts?.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30">
                <p className="text-lg font-medium text-muted-foreground">No stories yet. Be the first to publish!</p>
                <Link href="/dashboard/create" className="mt-4 font-extrabold text-primary hover:underline underline-offset-4">Create a post →</Link>
            </div>
        );
    }

    return (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-500">
            {posts?.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
    );
}
