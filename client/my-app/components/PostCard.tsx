import Link from 'next/link';
import type { Post } from '@/types/post';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`/posts/${post.id}`}
      className="group relative flex flex-col bg-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border"
    >
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img
          src={post.headerImage}
          alt={post.title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-sm">
            Story
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-center gap-4 mb-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-primary" />
            <span>{post.author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-primary" />
            <time dateTime={post.createdAt}>{date}</time>
          </div>
        </div>

        <h3 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all">
          <span>Read Full Story</span>
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
