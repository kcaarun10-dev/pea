'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ImageIcon, Grid3X3 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Album {
    id: string;
    title: string;
    category: string;
    images: { src: string; title: string }[];
    coverImage: string;
    createdAt: string;
}

export default function AlbumDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch('/api/albums');
                if (res.ok) {
                    const albums = await res.json();
                    const found = albums.find((a: Album) => a.id === params.id);
                    if (found) {
                        setAlbum(found);
                    }
                }
            } catch (error) {
                console.error('Error fetching album:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchAlbum();
        }
    }, [params.id]);

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
                    <button
                        onClick={() => router.push('/gallery')}
                        className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:text-accent transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Gallery
                    </button>

                    <div className="relative rounded-[3rem] overflow-hidden">
                        {/* Cover Image */}
                        <div className="absolute inset-0">
                            <img
                                src={album.coverImage}
                                alt={album.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                        </div>

                        <div className="relative p-8 md:p-16 pt-32 md:pt-48">
                            <div className="max-w-3xl">
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
                                            {new Date(album.createdAt).toLocaleDateString('en-US', {
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Grid */}
            <section className="pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <Grid3X3 className="text-accent" size={24} />
                        <h2 className="text-xl font-black text-primary uppercase tracking-tight">All Photos</h2>
                    </div>

                    {album.images && album.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {album.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gray-200"
                                    onClick={() => setSelectedImage(image.src)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.title || `Photo ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <p className="text-white font-bold text-sm truncate">
                                                {image.title || `Photo ${index + 1}`}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
            {selectedImage && (
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
