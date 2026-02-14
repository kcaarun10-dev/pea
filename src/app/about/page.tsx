"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Target, Eye, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    const [aboutData, setAboutData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/about')
            .then(res => res.json())
            .then(data => {
                setAboutData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || !aboutData) return (
        <div className="min-h-screen pt-24 flex items-center justify-center bg-muted/30">
            <div className="p-10 bg-white rounded-[2rem] shadow-xl text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="font-black text-primary uppercase tracking-widest text-xs">Tracing Our Legacy...</p>
            </div>
        </div>
    );

    const { heritage, mission, vision, achievements } = aboutData;

    return (
        <div className="pt-24 min-h-screen">
            {/* Header */}
            <section className="bg-primary text-white py-32 relative overflow-hidden">
                <Image src="/images/hero2.webp" alt="Background" fill className="object-cover opacity-20 scale-105 animate-float" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">Our <br /><span className="text-accent italic">{heritage.title.replace('Our ', '')}</span></h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">{heritage.description}</p>
                    </motion.div>
                </div>
            </section>

            {/* Intro */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-5xl font-black text-primary leading-tight">{heritage.introTitle.split(' ').slice(0, 2).join(' ')} <span className="text-accent">{heritage.introTitle.split(' ')[2]}</span> <br /> {heritage.introTitle.split(' ').slice(3).join(' ')}</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                                {heritage.introText}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {heritage.points.map((point: string) => (
                                    <div key={point} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-gray-100 group hover:border-accent transition-all">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                            <CheckCircle size={20} />
                                        </div>
                                        <span className="font-black text-primary text-sm uppercase tracking-wider">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-2xl group-hover:bg-accent/30 transition-all" />
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video border-8 border-white">
                                <Image src="/images/intro.webp" alt="About PEA" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-32 bg-muted/30 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                <span className="text-3xl font-black italic">M</span>
                            </div>
                            <h3 className="text-3xl font-black mb-6 text-primary uppercase tracking-tighter transition-colors group-hover:text-accent">Our Mission</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                                {mission}
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-primary p-12 rounded-[3rem] shadow-xl border border-white/5 flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-white/10 text-white rounded-3xl flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                <span className="text-3xl font-black italic">V</span>
                            </div>
                            <h3 className="text-3xl font-black mb-6 text-white uppercase tracking-tighter transition-colors group-hover:text-accent">Our Vision</h3>
                            <p className="text-white/60 leading-relaxed text-lg font-light">
                                {vision}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 font-black">
                    <div className="text-center mb-20">
                        <span className="text-accent text-xs uppercase tracking-[0.3em] mb-4 block">Milestones</span>
                        <h2 className="text-5xl md:text-6xl text-primary mb-4 tracking-tighter">Our Achievements</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievements.map((award: any, i: number) => (
                            <div key={award.title} className="p-10 rounded-[2.5rem] bg-muted border border-gray-100 group hover:bg-primary hover:text-white transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform">
                                    <Award size={32} />
                                </div>
                                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-accent">{award.title}</h4>
                                <p className="text-muted-foreground group-hover:text-white/60 text-base leading-relaxed font-medium">{award.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
