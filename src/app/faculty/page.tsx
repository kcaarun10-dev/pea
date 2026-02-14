"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, GraduationCap, Users } from 'lucide-react';
import Link from 'next/link';

interface FacultyMember {
    id: string;
    name: string;
    role: string;
    dept: string;
    image: string;
    type?: string;
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

const FacultyPage = () => {
    const [faculty, setFaculty] = useState<FacultyMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/faculty')
            .then(res => res.json())
            .then(data => {
                setFaculty(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setFaculty([]);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center bg-muted/30">
            <div className="p-10 bg-white rounded-[2rem] shadow-xl text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="font-black text-primary uppercase tracking-widest text-xs">Meeting Our Educators...</p>
            </div>
        </div>
    );

    const administration = (faculty || []).filter(f => f && (f.dept === 'Administration' || f.role === 'Chairman' || f.role === 'Principal'));
    const teachers = (faculty || []).filter(f => f && !administration.find(a => a.id === f.id));

    return (
        <div className="pt-24 min-h-screen bg-zinc-50">
            {/* Header */}
            <section className="bg-primary text-white py-32 relative overflow-hidden">
                <Image src="/images/hero2.webp" alt="Background" fill className="object-cover opacity-20 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-6 block">Our Backbone</span>
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
                            Our <br /><span className="text-accent italic">Educators</span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                            Click on any profile to learn more about their background, qualifications, and vision.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Administration Section */}
            {administration.length > 0 && (
                <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                            <Users size={24} />
                        </div>
                        <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">School Administration</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {administration.map((member, idx) => (
                            <FacultyCard key={member.id} member={member} delay={idx * 0.1} />
                        ))}
                    </div>
                </section>
            )}

            {/* Teaching Faculty */}
            {teachers.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-16">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                                <GraduationCap size={24} />
                            </div>
                            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Academic Faculty</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teachers.map((member, idx) => (
                                <FacultyCard key={member.id} member={member} delay={idx * 0.1} small />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

const FacultyCard = ({ member, delay, small }: { member: FacultyMember; delay: number; small?: boolean }) => (
    <Link href={`/faculty/${member.id}`}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className={`group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer h-full ${small ? 'p-4' : 'p-6'}`}
        >
            <div className={`relative rounded-[2rem] overflow-hidden mb-6 ${small ? 'aspect-[4/5]' : 'aspect-square'}`}>
                <Image
                    src={member.image || "/images/placeholder-user.webp"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30">View Full Profile</span>
                </div>
            </div>

            <div className="space-y-2">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">{member.dept}</span>
                <h3 className={`font-black text-primary tracking-tighter transition-colors group-hover:text-accent ${small ? 'text-xl' : 'text-2xl'}`}>{member.name}</h3>
                <p className="text-muted-foreground font-medium text-sm">{member.role}</p>
            </div>
        </motion.div>
    </Link>
);

export default FacultyPage;
