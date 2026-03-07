'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Heading1,
    Heading2,
    Link as LinkIcon,
    Image as ImageIcon,
    Undo,
    Redo
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            Placeholder.configure({
                placeholder: 'Write your story...',
            }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none min-h-[300px] p-4',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('Image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/50 p-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                    title="Heading 1"
                >
                    <Heading1 size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </button>

                <div className="w-px h-6 bg-border mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('bold') ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                    title="Bold"
                >
                    <Bold size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('italic') ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                    title="Italic"
                >
                    <Italic size={18} />
                </button>

                <div className="w-px h-6 bg-border mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('bulletList') ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                    title="Bullet List"
                >
                    <List size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('orderedList') ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                    title="Ordered List"
                >
                    <ListOrdered size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('blockquote') ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                    title="Blockquote"
                >
                    <Quote size={18} />
                </button>

                <div className="w-px h-6 bg-border mx-1" />

                <button
                    type="button"
                    onClick={addLink}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('link') ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                    title="Link"
                >
                    <LinkIcon size={18} />
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className="p-2 rounded-md transition-colors hover:bg-accent"
                    title="Image"
                >
                    <ImageIcon size={18} />
                </button>

                <div className="w-px h-6 bg-border mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded-md transition-colors hover:bg-accent disabled:opacity-30"
                    title="Undo"
                >
                    <Undo size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded-md transition-colors hover:bg-accent disabled:opacity-30"
                    title="Redo"
                >
                    <Redo size={18} />
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
