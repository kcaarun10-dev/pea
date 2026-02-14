"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    GraduationCap,
    ArrowLeft,
    PhoneCall,
    Facebook,
    Instagram,
    Award,
    Briefcase,
    ChevronRight,
    MapPin,
    Calendar,
    BookOpen,
    Edit3
} from 'lucide-react';
import { useParams } from 'next/navigation';

interface FacultyMember {
    id: string;
    name: string;
    role: string;
    dept: string;
    image: string;
    email?: string;
    phone?: string;
    bio?: string;
    qualification?: string;
    experience?: string;
    specialties?: string;
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
}

const FacultyDetailPage = () => {
    const { id } = useParams();
    const [member, setMember] = useState<FacultyMember | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/faculty')
            .then(res => res.json())
            .then(data => {
                const found = Array.isArray(data) ? data.find((f: FacultyMember) => f.id === id) : null;
                setMember(found || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center bg-muted/30">
            <div className="p-10 bg-white rounded-[2rem] shadow-xl text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="font-black text-primary uppercase tracking-widest text-xs">Loading Profile...</p>
            </div>
        </div>
    );

    if (!member) return (
        <div className="min-h-screen pt-48 text-center px-4">
            <h1 className="text-4xl font-black text-primary mb-6">Profile Not Found</h1>
            <p className="text-muted-foreground mb-10">The educator profile you're looking for doesn't exist or has been removed.</p>
            <Link href="/faculty" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all">
                <ArrowLeft size={20} /> Back to Faculty
            </Link>
        </div>
    );

    return (
        <div className="bg-zinc-50 min-h-screen pt-24 pb-32">
            {/* Top Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-[2rem] border border-gray-100 shadow-sm">
                    <Link href="/faculty" className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-bold text-sm group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Team
                    </Link>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent">
                        Faculty Detail <ChevronRight size={14} /> {member.name}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Image & Contact */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-4 rounded-[3rem] border border-gray-100 shadow-xl"
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden">
                                <Image
                                    src={member.image || "/images/placeholder-user.webp"}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-primary text-white p-8 rounded-[3rem] shadow-2xl shadow-primary/20"
                        >
                            <h3 className="font-black uppercase tracking-widest text-xs text-accent mb-6">Get In Touch</h3>
                            <div className="space-y-6">
                                {member.email && (
                                    <a href={`mailto:${member.email}`} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-white/40 tracking-wider">Email Address</p>
                                            <p className="font-bold text-sm truncate">{member.email}</p>
                                        </div>
                                    </a>
                                )}
                                {member.phone && (
                                    <a href={`tel:${member.phone}`} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-white/40 tracking-wider">Phone Number</p>
                                            <p className="font-bold text-sm">{member.phone}</p>
                                        </div>
                                    </a>
                                )}
                                {member.whatsapp ? (
                                    <a href={`https://wa.me/${member.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                                            <PhoneCall size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-white/40 tracking-wider">WhatsApp Contact</p>
                                            <p className="font-bold text-sm capitalize">Chat Now</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 opacity-40">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <PhoneCall size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-wider text-white/40">WhatsApp Contact</p>
                                            <p className="font-bold text-sm">Not Available</p>
                                        </div>
                                    </div>
                                )}
                                {member.facebook ? (
                                    <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                                            <Facebook size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-white/40 tracking-wider">Facebook Page</p>
                                            <p className="font-bold text-sm capitalize">Visit Profile</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 opacity-40">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <Facebook size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Facebook Page</p>
                                            <p className="font-bold text-sm">Not Available</p>
                                        </div>
                                    </div>
                                )}
                                {member.instagram ? (
                                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                                            <Instagram size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-white/40 tracking-wider">Instagram Handle</p>
                                            <p className="font-bold text-sm capitalize">Visit Profile</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 opacity-40">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <Instagram size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Instagram Handle</p>
                                            <p className="font-bold text-sm">Not Available</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Bio & Details */}
                    <div className="lg:col-span-8 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex flex-wrap gap-2 mb-4">
                                {(member.dept || '').split(',').map((d: string) => d.trim()).filter(Boolean).map((dept: string) => (
                                    <span key={dept} className="text-[10px] font-black text-accent uppercase tracking-[0.2em] bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">{dept}</span>
                                ))}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none mb-4">{member.name}</h1>
                            <p className="text-2xl font-bold text-muted-foreground flex items-center gap-3">
                                <GraduationCap size={28} className="text-accent" />
                                {member.role}
                            </p>
                        </motion.div>

                        {/* Bio Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-10 md:p-14 rounded-[4rem] border border-gray-100 shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                                <BookOpen size={200} />
                            </div>
                            <h2 className="text-3xl font-black text-primary uppercase tracking-tighter mb-8 flex items-center gap-4">
                                <span className="w-12 h-1.5 bg-accent rounded-full" />
                                Profile Summary
                            </h2>
                            <div className="prose prose-zinc prose-xl max-w-none text-muted-foreground leading-relaxed font-medium">
                                {member.bio || `Mr./Ms. ${member.name} is a dedicated professional at Purandhara Everest Academy. Their commitment to educational excellence and student growth is a cornerstone of our institution.`}
                            </div>
                        </motion.section>

                        {/* Qualifications & Experience Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                                    <Award size={28} />
                                </div>
                                <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Educational Background</h3>
                                <p className="text-muted-foreground font-bold leading-relaxed">{member.qualification || 'Information pending update'}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6">
                                    <Briefcase size={28} />
                                </div>
                                <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Professional Experience</h3>
                                <p className="text-muted-foreground font-bold leading-relaxed">{member.experience || 'Information pending update'}</p>
                            </motion.div>
                        </div>

                        {/* Specialties Section */}
                        {member.specialties && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-accent/5 p-10 rounded-[3rem] border border-accent/10"
                            >
                                <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <ChevronRight className="text-accent" />
                                    Areas of Expertise
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {(member.specialties || '').split(',').map((s: string) => (
                                        <span key={s} className="bg-white px-6 py-2.5 rounded-2xl text-sm font-black text-primary border border-accent/10 shadow-sm shadow-accent/5">
                                            {s.trim()}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyDetailPage;
