'use client';

import { useState, useRef } from 'react';
import { ImageIcon, X, Upload } from 'lucide-react';

interface ImageUploadProps {
    value?: string | File;
    onChange: (value: File | string) => void;
    error?: string;
}

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(
        typeof value === 'string' ? value : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
                <ImageIcon size={18} />
                <label className="text-sm font-semibold tracking-tight">Header Image</label>
            </div>

            <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all ${preview ? 'border-primary/50' : 'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
            >
                {preview ? (
                    <>
                        <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center">
                            <div className="rounded-full bg-white/20 p-2 backdrop-blur-md">
                                <Upload className="text-white" size={24} />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove();
                            }}
                            className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white shadow-lg transition-transform hover:scale-110"
                        >
                            <X size={16} />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-3">
                            <Upload size={24} />
                        </div>
                        <p className="text-sm font-medium">Click to upload from device</p>
                        <p className="text-xs">JPG, PNG or WEBP (max. 5MB)</p>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {error && <p className="text-xs font-medium text-destructive px-2">{error}</p>}
        </div>
    );
}
