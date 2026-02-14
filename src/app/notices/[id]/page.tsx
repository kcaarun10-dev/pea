"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, Calendar, ChevronLeft, Share2, Tag, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NoticeDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const [notice, setNotice] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await fetch('/api/notices');
                const data = await res.json();
                const foundNotice = Array.isArray(data) ? data.find((n: any) => n.id === id) : null;
                setNotice(foundNotice);
            } catch (error) {
                console.error('Error fetching notice:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchNotice();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-muted/30">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!notice) {
        return (
            <div className="min-h-screen pt-40 text-center bg-muted/30">
                <h1 className="text-4xl font-black text-primary mb-6">Notice Not Found</h1>
                <Link href="/notices" className="btn-primary px-8 py-4">Back to Notices</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4">
                {/* Navigation */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-black uppercase tracking-widest text-xs group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Notices
                </button>

                {/* Notice Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden mb-12 border border-gray-100"
                >
                    <div className="p-8 md:p-12">
                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Tag size={12} /> {notice.category || 'General'}
                            </span>
                            <span className="bg-primary/5 text-primary/60 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Calendar size={12} /> {notice.date}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tighter leading-tight uppercase">
                            {notice.title}
                        </h1>

                        <div className="flex items-center gap-4 border-t border-muted pt-8 mt-8">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-black italic">PEA</div>
                            <div>
                                <h4 className="text-sm font-black text-primary uppercase">Administration</h4>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Posted by Admin</p>
                            </div>
                        </div>
                    </div>

                    {notice.image && (
                        <div className="relative aspect-[16/9] w-full border-t border-muted">
                            <Image
                                src={notice.image}
                                alt={notice.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[3.5rem] shadow-xl p-8 md:p-16 border border-gray-100"
                >
                    <div className="prose prose-xl max-w-none prose-primary text-muted-foreground font-medium leading-[1.8] italic">
                        {(notice?.content || '').split('\n').map((para: string, i: number) => (
                            <p key={i} className="mb-6">{para}</p>
                        ))}
                    </div>

                    <div className="mt-16 pt-12 border-t border-muted flex flex-wrap items-center justify-between gap-8">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                            <BookOpen size={16} /> Reference: #{notice.id}
                        </div>
                        <button className="flex items-center gap-2 bg-muted hover:bg-muted-foreground hover:text-white px-6 py-3 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]">
                            <Share2 size={16} /> Share Notice
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NoticeDetail;
