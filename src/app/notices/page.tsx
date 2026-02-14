"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Bell, Download, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const NoticesPage = () => {
    const [notices, setNotices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/notices')
            .then(res => res.json())
            .then(data => {
                setNotices(data);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="pt-40 pb-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-black text-primary uppercase tracking-tighter">Synchronizing Board...</p>
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
                    <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Information Center</span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-none">The Notice <br /><span className="text-accent italic text-4xl md:text-6xl">Board</span></h1>
                    <p className="text-white/60 max-w-xl mx-auto font-light text-xl">Official announcements and academic updates from the administration.</p>
                </motion.div>
            </section>

            {/* Notices List */}
            <section className="py-20 -mt-16 relative z-20">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="space-y-4">
                        {(notices || []).map((notice, idx) => (
                            <motion.div
                                key={notice?.id || idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-2 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all group border border-gray-100"
                            >
                                <div className="flex flex-col md:flex-row gap-6 p-6">
                                    <div className="md:w-32 h-32 bg-muted rounded-2xl flex flex-col items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                        <span className="text-3xl font-black">{notice?.date?.split(' ')[1] || '??'}</span>
                                        <span className="text-xs font-black uppercase tracking-widest">{notice?.date?.split(' ')[0] || 'Date'}</span>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-accent/10 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {notice?.category || 'General'}
                                            </span>
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                                                <Clock size={12} /> 10:00 AM
                                            </span>
                                        </div>
                                        <Link href={`/notices/${notice?.id || '#'}`} target="_blank" className="hover:text-accent transition-colors">
                                            <h2 className="text-2xl font-black text-primary tracking-tighter uppercase">
                                                {notice?.title || 'Notice Title'}
                                            </h2>
                                        </Link>
                                        <p className="text-muted-foreground font-medium leading-relaxed line-clamp-2 italic">
                                            {notice?.content || 'Description not available.'}
                                        </p>
                                        {notice?.image && (
                                            <Link href={`/notices/${notice.id}`} target="_blank" className="relative block w-full h-48 md:h-64 rounded-3xl overflow-hidden mt-4 border border-gray-100">
                                                <Image
                                                    src={notice.image}
                                                    alt={notice.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                    <div className="flex md:flex-col items-center justify-center gap-3">
                                        {notice?.pdf && (
                                            <button className="p-4 bg-crimson text-white rounded-2xl hover:scale-110 transition-transform shadow-lg shadow-crimson/20">
                                                <Download size={24} />
                                            </button>
                                        )}
                                        <Link href={`/notices/${notice?.id || '#'}`} target="_blank" className="p-4 bg-primary text-white rounded-2xl hover:scale-110 transition-transform shadow-lg shadow-primary/20 flex items-center justify-center">
                                            <ArrowRight size={24} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {notices.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-muted shadow-inner"
                            >
                                <Bell size={64} className="mx-auto text-muted mb-6 animate-pulse" />
                                <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">No Current Announcements</h3>
                                <p className="text-muted-foreground font-medium italic mt-2">Check back later for fresh updates</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NoticesPage;
