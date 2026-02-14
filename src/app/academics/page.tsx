"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Book, Microscope, Monitor, Users, Award, ChevronRight, GraduationCap, School } from 'lucide-react';

const AcademicsPage = () => {
    const [academicData, setAcademicData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const getLevelIcon = (title: string) => {
        switch (title) {
            case "Pre-Primary": return <GraduationCap size={40} className="text-accent" />;
            case "Primary Level": return <Book size={40} className="text-accent" />;
            case "Lower Secondary": return <Users size={40} className="text-accent" />;
            case "Secondary Level": return <School size={40} className="text-accent" />;
            default: return <GraduationCap size={40} className="text-accent" />;
        }
    };

    const getFacilityIcon = (title: string) => {
        switch (title) {
            case "Science Laboratory": return <Microscope size={24} />;
            case "IT & Computer Center": return <Monitor size={24} />;
            case "Library": return <Book size={24} />;
            default: return <School size={24} />;
        }
    };

    useEffect(() => {
        fetch('/api/academics')
            .then(res => res.json())
            .then(data => {
                setAcademicData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || !academicData) return (
        <div className="min-h-screen pt-24 flex items-center justify-center bg-muted/30">
            <div className="p-10 bg-white rounded-[2rem] shadow-xl text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="font-black text-primary uppercase tracking-widest text-xs">Curating Academic Journey...</p>
            </div>
        </div>
    );

    const { levels, facilities } = academicData;

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
                    <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Our Excellence</span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-none">Holistic <br /><span className="text-accent italic text-4xl md:text-6xl">Academics</span></h1>
                    <p className="text-white/60 max-w-2xl mx-auto font-light text-xl leading-relaxed px-4">
                        We believe in education that goes beyond textbooks, nurturing character, curiosity, and the capability to lead.
                    </p>
                </motion.div>
            </section>

            {/* Academic Levels */}
            <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {(levels || []).map((level: any, idx: number) => (
                        <motion.div
                            key={level.title || idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100 group"
                        >
                            <div className="flex flex-col h-full">
                                <div className="h-64 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                    {/* Placeholder image if not exists */}
                                    <div className="absolute inset-0 bg-muted flex items-center justify-center text-primary/20 italic font-bold text-2xl uppercase tracking-tighter">
                                        {level.title || 'Academic'} Journey
                                    </div>
                                    <Image
                                        src={level.image || '/images/hero1.webp'}
                                        alt={level.title || 'Level'}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-10 flex-1 flex flex-col">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            {getLevelIcon(level.title)}
                                        </div>
                                        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">{level.title || 'Academic Level'}</h2>
                                    </div>
                                    <p className="text-muted-foreground font-medium text-lg leading-relaxed mb-8 flex-1">
                                        {level.description || 'Providing holistic education for our students.'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {(level.features || []).map((feature: string) => (
                                            <div key={feature} className="flex items-center gap-2 text-sm font-bold text-primary/60">
                                                <ChevronRight size={16} className="text-accent" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Facilities Highlight */}
            <section className="py-32 bg-white mt-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Modern Infrastructure</span>
                    <h2 className="text-5xl font-black text-primary mb-16 tracking-tighter uppercase">World Class Facilities</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {(facilities || []).map((fac: any, idx: number) => (
                            <motion.div
                                key={fac.title || idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 bg-muted/30 rounded-[2.5rem] border border-gray-100 group hover:bg-primary transition-all duration-500"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-primary mb-8 mx-auto group-hover:rotate-12 group-hover:scale-110 transition-transform">
                                    {getFacilityIcon(fac.title)}
                                </div>
                                <h3 className="text-2xl font-black text-primary mb-4 group-hover:text-white transition-colors tracking-tighter uppercase">{fac.title || 'Facility'}</h3>
                                <p className="text-muted-foreground font-medium group-hover:text-white/60 transition-colors">
                                    {fac.description || 'State of the art learning environment.'}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="bg-primary rounded-[4rem] p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Award size={64} className="mx-auto text-accent mb-8 animate-float" />
                        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase leading-tight">Ready to join the elite academic journey?</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button onClick={() => window.location.href = '/admissions'} className="btn-accent px-12 py-5 text-xl font-black">Apply Now</button>
                            <button onClick={() => window.location.href = '/contact'} className="bg-white/10 border border-white/20 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all">Visit PEA</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AcademicsPage;
