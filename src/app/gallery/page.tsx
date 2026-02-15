"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Filter, ImageIcon, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Album {
    id: string;
    title: string;
    category: string;
    images: { src: string; title: string }[];
    coverImage: string;
    createdAt: string;
}

const GalleryPage = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/albums')
            .then(res => res.json())
            .then(data => {
                setAlbums(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setAlbums([]);
                setLoading(false);
            });
    }, []);

    const safeAlbums = Array.isArray(albums) ? albums : [];
    const categories = ['All', ...Array.from(new Set(safeAlbums.map(album => album?.category))).filter(Boolean)];

    const filteredAlbums = activeCategory === 'All'
        ? safeAlbums
        : safeAlbums.filter(album => album?.category === activeCategory);

    if (loading) return (
        <div className="pt-40 pb-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-black text-primary uppercase tracking-tighter">Loading Albums...</p>
        </div>
    );

    return (
        <div className="pt-24 min-h-screen pb-24 bg-muted/30">
            {/* Header */}
            <section className="bg-primary text-white py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Photo Collections</span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-none">The Academy <br /><span className="text-accent italic text-4xl md:text-6xl">Albums</span></h1>
                    <p className="text-white/60 max-w-xl mx-auto font-light text-xl">Browse our photo collections from school events and activities.</p>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
                {/* Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 md:p-8 rounded-[3rem] shadow-2xl flex flex-wrap items-center justify-center gap-4 mb-20 border border-gray-100"
                >
                    <div className="flex items-center gap-2 mr-6 text-primary font-black uppercase tracking-widest text-[10px]">
                        <Filter size={16} /> Filter Albums:
                    </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as string)}
                            className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                                ? 'bg-accent text-primary shadow-xl shadow-accent/20 scale-105'
                                : 'bg-muted text-muted-foreground hover:bg-primary hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Albums Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {(filteredAlbums || []).map((album, i) => (
                        <motion.div
                            key={album?.id || i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/gallery/album/${album.id}`}>
                                <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer border-4 border-white">
                                    {/* Cover Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={album?.coverImage || '/images/placeholder.jpg'}
                                            alt={album?.title || 'Album'}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        {/* Photo Count Badge */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                            <ImageIcon size={14} className="text-primary" />
                                            <span className="text-xs font-black text-primary">{album?.images?.length || 0}</span>
                                        </div>
                                    </div>

                                    {/* Album Info */}
                                    <div className="p-6">
                                        <span className="inline-block bg-accent/20 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                                            {album?.category || 'Uncategorized'}
                                        </span>
                                        <h3 className="text-lg font-black text-primary uppercase tracking-tight leading-tight mb-2 line-clamp-2">
                                            {album?.title || 'Untitled Album'}
                                        </h3>
                                        <div className="flex items-center justify-between text-gray-400">
                                            <div className="flex items-center gap-1 text-xs font-bold">
                                                <Calendar size={12} />
                                                {album?.createdAt ? new Date(album.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown date'}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs font-black text-accent group-hover:translate-x-1 transition-transform">
                                                View <ChevronRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredAlbums.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-muted">
                        <ImageIcon size={48} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-muted-foreground font-black uppercase tracking-widest">No Albums Found</p>
                        <p className="text-gray-400 text-sm mt-2">Albums will appear here when added from the admin panel.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default GalleryPage;
