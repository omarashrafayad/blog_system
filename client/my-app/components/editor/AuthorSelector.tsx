'use client';

import { useAuthors, useCreateAuthor } from '@/hooks';
import { useState } from 'react';
import { Plus, User, Check } from 'lucide-react';

interface AuthorSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function AuthorSelector({ value, onChange }: AuthorSelectorProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');

    const { data: authors = [], isLoading } = useAuthors();

    const mutation = useCreateAuthor();

    // Specific logic for AuthorSelector onSuccess
    const handleAddAuthor = (name: string) => {
        mutation.mutate({ name }, {
            onSuccess: (newAuthor) => {
                onChange(newAuthor.name); // Using name for now as the Post model expects a string
                setIsAdding(false);
                setNewName('');
            }
        });
    };

    if (isLoading) return <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />;

    return (
        <div className="space-y-3">
            <label className="text-sm font-semibold tracking-tight">Post Author</label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {authors.map((author) => (
                    <button
                        key={author.id}
                        type="button"
                        onClick={() => onChange(author.name)}
                        className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${value === author.name
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border bg-card hover:border-primary/50'
                            }`}
                    >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${value === author.name ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                            }`}>
                            <User size={20} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-medium">{author.name}</p>
                            {value === author.name && <p className="text-xs text-primary font-semibold">Selected</p>}
                        </div>
                        {value === author.name && <Check size={18} className="text-primary" />}
                    </button>
                ))}

                {!isAdding ? (
                    <button
                        type="button"
                        onClick={() => setIsAdding(true)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border p-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                    >
                        <Plus size={18} />
                        Add New Author
                    </button>
                ) : (
                    <div className="flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/5 p-2">
                        <input
                            autoFocus
                            className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground/50"
                            placeholder="Author name..."
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddAuthor(newName);
                                if (e.key === 'Escape') setIsAdding(false);
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => handleAddAuthor(newName)}
                            disabled={!newName || mutation.isPending}
                            className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
