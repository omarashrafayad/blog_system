import Link from 'next/link';

export function Nav() {
  return (
    <nav className="border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Blog
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            Home
          </Link>
          <Link href="/dashboard" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
