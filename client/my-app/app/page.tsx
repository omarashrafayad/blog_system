import { PostGrid } from '@/components/home/PostGrid';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
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
            className="rounded-full bg-foreground px-8 py-3.5 font-bold text-background transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Start Writing
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-muted-foreground transition-colors hover:text-foreground group"
          >
            Manage Blog <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mb-10 border-b border-border pb-6">
        <h2 className="text-2xl font-bold tracking-tight">Recent Publications</h2>
      </div>

      <PostGrid />

      {/* Footer-like Newsletter */}
      <div className="mt-32 rounded-[2.5rem] bg-foreground px-8 py-16 text-center text-background shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl" />

        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h3>
          <p className="text-background/60 mb-8 max-w-md mx-auto">Get the best of our stories delivered weekly to your inbox. No spam, ever.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto bg-white/5 p-2 rounded-2xl ring-1 ring-white/10 backdrop-blur-sm">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-2 outline-none text-background placeholder:text-background/40"
            />
            <button className="bg-background text-foreground px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all hover:bg-white hover:scale-[1.02] active:scale-95">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
