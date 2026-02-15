'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, ImageIcon, Grid3X3, Edit2, Save, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface AlbumImage {
    src: string;
    title: string;
}

interface Album {
    id: string;
    title: string;
    category: string;
    description?: string;
    eventDate?: string;
    images: AlbumImage[];
    coverImage: string;
    createdAt: string;
}

export default function AlbumDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editData, setEditData] = useState<Partial<Album>>({});
    const [editImages, setEditImages] = useState<AlbumImage[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch('/api/albums');
                if (res.ok) {
                    const albums = await res.json();
                    const found = albums.find((a: Album) => a.id === params.id);
                    if (found) {
                        setAlbum(found);
                        setEditData({
                            title: found.title,
                            category: found.category,
                            description: found.description || '',
                            eventDate: found.eventDate || found.createdAt?.split('T')[0] || ''
                        });
                        setEditImages([...found.images]);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch album:', error);
            } finally {
                setLoading(false);
            }
        };

        // Check admin authentication
        const checkAuth = () => {
            const auth = localStorage.getItem('adminAuth');
            setIsAuthenticated(auth === 'true');
        };

        fetchAlbum();
        checkAuth();
    }, [params.id]);

    const handleSave = async () => {
        if (!album) return;
        setIsSaving(true);

        try {
            const res = await fetch('/api/albums', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: album.id,
                    ...editData,
                    images: editImages,
                    coverImage: editImages[0]?.src || album.coverImage
                })
            });

            if (res.ok) {
                const updated = await res.json();
                setAlbum({ ...album, ...updated, images: editImages });
                setIsEditing(false);
                alert('Album updated successfully!');
            } else {
                alert('Failed to update album');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update album');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageTitleChange = (index: number, newTitle: string) => {
        const updated = [...editImages];
        updated[index] = { ...updated[index], title: newTitle };
        setEditImages(updated);
    };

    const handleRemoveImage = (index: number) => {
        if (confirm('Remove this image from the album?')) {
            const updated = editImages.filter((_, i) => i !== index);
            setEditImages(updated);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-muted flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (!album) {
        return (
            <div className="min-h-screen bg-muted">
                <Navbar />
                <div className="pt-32 pb-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-3xl font-black text-primary mb-4">Album Not Found</h1>
                        <p className="text-gray-600 mb-8">The album you're looking for doesn't exist.</p>
                        <button
                            onClick={() => router.push('/gallery')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all"
                        >
                            <ArrowLeft size={20} />
                            Back to Gallery
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => router.push('/gallery')}
                            className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Gallery
                        </button>

                        {/* Edit/Save Buttons */}
                        {isAuthenticated && (
                            <div className="flex items-center gap-2">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
                                    >
                                        <Edit2 size={18} />
                                        Edit Album
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditData({
                                                    title: album?.title,
                                                    category: album?.category,
                                                    description: album?.description || '',
                                                    eventDate: album?.eventDate || album?.createdAt?.split('T')[0] || ''
                                                });
                                                setEditImages([...(album?.images || [])]);
                                            }}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
                                            disabled={isSaving}
                                        >
                                            <X size={18} />
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-xl font-bold hover:bg-accent/90 transition-all disabled:opacity-50"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={18} />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Album Content */}
                    <section className="relative rounded-[3rem] overflow-hidden">
                        {/* Cover Image */}
                        <div className="absolute inset-0">
                            <img
                                src={isEditing ? (editImages[0]?.src || album?.coverImage) : album?.coverImage}
                                alt={album?.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                        </div>

                        <div className="relative p-8 md:p-16 pt-32 md:pt-48">
                            <div className="max-w-3xl">
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <select
                                                value={editData.category}
                                                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                                className="px-4 py-2 bg-accent text-primary text-xs font-black uppercase tracking-widest rounded-full border-none outline-none"
                                            >
                                                <option>School Events</option>
                                                <option>Library</option>
                                                <option>Sports</option>
                                                <option>Classrooms</option>
                                                <option>Other</option>
                                            </select>
                                            <input
                                                type="text"
                                                value={editData.title}
                                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                                className="w-full text-4xl md:text-6xl font-black text-white uppercase tracking-tighter bg-transparent border-2 border-white/30 rounded-2xl px-4 py-2 outline-none focus:border-accent"
                                                placeholder="Album Title"
                                            />
                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2 text-white/80">
                                                    <Calendar size={18} />
                                                    <input
                                                        type="date"
                                                        value={editData.eventDate}
                                                        onChange={(e) => setEditData({ ...editData, eventDate: e.target.value })}
                                                        className="bg-white/20 text-white font-bold text-sm rounded-lg px-3 py-1 border-none outline-none"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 text-white/80">
                                                    <ImageIcon size={18} />
                                                    <span className="font-bold text-sm">{editImages.length} Photos</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="inline-block px-4 py-1 bg-accent text-primary text-xs font-black uppercase tracking-widest rounded-full mb-4">
                                                {album.category}
                                            </span>
                                            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                                                {album.title}
                                            </h1>
                                            <div className="flex flex-wrap items-center gap-6 text-white/80">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={18} />
                                                    <span className="font-bold text-sm">
                                                        {new Date(album.eventDate || album.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <ImageIcon size={18} />
                                                    <span className="font-bold text-sm">{album.images?.length || 0} Photos</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mt-6">
                            {isEditing ? (
                                <textarea
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    placeholder="Add album description..."
                                    className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-gray-200 outline-none focus:border-accent font-medium text-primary resize-none h-32"
                                />
                            ) : (
                                album.description && (
                                    <p className="text-gray-600 font-medium leading-relaxed bg-white rounded-2xl p-6">
                                        {album.description}
                                    </p>
                                )
                            )}
                        </div>
                </div>
            </section>

            {/* Image Grid */}
            <section className="pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <Grid3X3 className="text-accent" size={24} />
                        <h2 className="text-xl font-black text-primary uppercase tracking-tight">
                            {isEditing ? 'Edit Photos' : 'All Photos'}
                        </h2>
                    </div>

                    {(isEditing ? editImages : album.images)?.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <AnimatePresence mode="popLayout">
                                {(isEditing ? editImages : album.images).map((image, index) => (
                                    <motion.div
                                        key={index}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`group relative aspect-square rounded-2xl overflow-hidden ${isEditing ? '' : 'cursor-pointer bg-gray-200'}`}
                                        onClick={() => !isEditing && setSelectedImage(image.src)}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.title || `Photo ${index + 1}`}
                                            className={`w-full h-full object-cover ${isEditing ? '' : 'transition-transform duration-500 group-hover:scale-110'}`}
                                            loading="lazy"
                                        />

                                        {isEditing ? (
                                            <div className="absolute inset-0 bg-primary/80 p-4 flex flex-col justify-end">
                                                <input
                                                    type="text"
                                                    value={image.title || ''}
                                                    onChange={(e) => handleImageTitleChange(index, e.target.value)}
                                                    placeholder={`Photo ${index + 1} title`}
                                                    className="w-full px-3 py-2 rounded-xl bg-white/20 text-white placeholder:text-white/50 text-sm font-bold outline-none focus:bg-white/30"
                                                />
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-white/60 text-xs font-bold">
                                                        {index === 0 ? 'Cover Photo' : `Photo ${index + 1}`}
                                                    </span>
                                                    <button
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-all"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <p className="text-white font-bold text-sm truncate">
                                                        {image.title || `Photo ${index + 1}`}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <ImageIcon size={48} className="text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-bold">No images in this album</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {!isEditing && selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full view"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </motion.div>
            )}

            <Footer />
        </div>
    );
}
