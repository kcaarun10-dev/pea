"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage = () => {
    const [images, setImages] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => {
                setImages(data);
                setLoading(false);
            });
    }, []);

    const categories = ['All', ...Array.from(new Set((images || []).map(img => img.category))).filter(Boolean)];

    const filteredImages = activeCategory === 'All'
        ? images
        : images.filter(img => img.category === activeCategory);

    if (loading) return (
        <div className="pt-40 pb-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-black text-primary uppercase tracking-tighter">Developing Memories...</p>
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
                    <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Visual Journey</span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-none">The Academy <br /><span className="text-accent italic text-4xl md:text-6xl">Gallery</span></h1>
                    <p className="text-white/60 max-w-xl mx-auto font-light text-xl">Capturing moments of growth, joy, and excellence at PEA.</p>
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
                        <Filter size={16} /> Filter Gallery:
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

                {/* Grid */}
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
                >
                    {(filteredImages || []).map((img, i) => (
                        <motion.div
                            key={img?.src || i} // Fallback key
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative group rounded-[2.5rem] overflow-hidden break-inside-avoid shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all cursor-pointer border-8 border-white"
                            onClick={() => setSelectedImage(img?.src || null)} // Null-safe click handler
                        >
                            <Image
                                src={img?.src || '/images/placeholder.jpg'} // Fallback image source
                                alt={img?.title || 'Gallery Image'} // Fallback alt text
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                                <span className="bg-accent text-primary text-[10px] font-black uppercase px-3 py-1 rounded-full w-fit mb-3">
                                    {img?.category || 'Uncategorized'} {/* Fallback category */}
                                </span>
                                <h4 className="text-white font-black text-xl uppercase tracking-tighter leading-tight">{img?.title || 'Untitled'}</h4> {/* Fallback title */}
                                <div className="mt-6 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    <Maximize2 size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-muted">
                        <p className="text-muted-foreground font-black uppercase tracking-widest">Category Empty</p>
                    </div>
                )}
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-primary/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-4 md:p-12"
                    >
                        <button
                            className="absolute top-10 right-10 text-white hover:text-accent transition-all p-4 bg-white/5 rounded-2xl border border-white/10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-[12px] border-white/5"
                        >
                            <Image src={selectedImage} alt="Preview" fill className="object-contain" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryPage;
