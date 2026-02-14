"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ContactPage = () => {
    const [settings, setSettings] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error('Error fetching settings:', err));
    }, []);

    const leadership = settings?.leadership || [
        {
            id: 'chairman',
            name: 'Mr. Bal Krishna Khatri',
            role: 'Chairman',
            fb: 'https://www.facebook.com/bal.krishna.khatri.12927',
            bio: 'Leading Purandhara Everest Academy with a vision of holistic development and academic excellence since 2064 BS.'
        },
        {
            id: 'principal',
            name: 'Mr. Moti Lal KC',
            role: 'Principal',
            fb: 'https://www.facebook.com/moti.lal.kc.2025',
            bio: 'Dedicated to fostering an environment where every student can achieve their full potential through innovation and tradition.'
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            }
        } catch (error) {
            alert('Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Get In Touch</span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-none">Connect <br /><span className="text-accent italic text-4xl md:text-6xl">With Us</span></h1>
                    <p className="text-white/60 max-w-xl mx-auto font-light text-xl">
                        {settings?.contactIntro || "We are here to answer your questions and welcome you to the PEA family."}
                    </p>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Methods */}
                    <div className="lg:col-span-1 space-y-8">
                        {[
                            { title: 'Call Center', value: settings?.phone || '9857823607', icon: <Phone size={24} />, color: 'bg-primary' },
                            { title: 'Official Email', value: settings?.email || 'pea.babai3dang@gmail.com', icon: <Mail size={24} />, color: 'bg-crimson' },
                            { title: 'Location', value: settings?.location || 'Babai-3, Hanspur Dang', icon: <MapPin size={24} />, color: 'bg-accent' },
                            { title: 'Office Hours', value: settings?.officeHours || '9:00 AM - 5:00 PM', icon: <Clock size={24} />, color: 'bg-primary-light' },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] shadow-xl flex items-center gap-6 border border-gray-100 group hover:shadow-2xl transition-all"
                            >
                                <div className={`${item.color} text-white p-5 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg flex items-center justify-center`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{item.title}</h4>
                                    <p className="text-lg font-black text-primary">{item.value}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* WhatsApp Integration */}
                        <motion.a
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            href={`https://wa.me/${settings?.whatsapp?.replace(/\s/g, '') || settings?.phone?.replace(/\s/g, '') || '9857823607'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white p-10 rounded-[3rem] shadow-xl flex items-center justify-between group hover:shadow-2xl transition-all relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                                    <MessageCircle size={32} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black opacity-80 uppercase tracking-widest text-white">Direct Support</h4>
                                    <p className="text-2xl font-black">WhatsApp Now</p>
                                </div>
                            </div>
                            <Send size={28} className="group-hover:translate-x-2 transition-transform relative z-10" />
                        </motion.a>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-2 bg-white rounded-[3.5rem] shadow-2xl p-12 md:p-16 border border-gray-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
                            <Send size={200} />
                        </div>
                        <h3 className="text-4xl font-black text-primary mb-12 uppercase tracking-tighter">Send us a <span className="text-accent italic">Message</span></h3>
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-accent/10 border-2 border-accent p-12 rounded-[2.5rem] text-center"
                            >
                                <div className="w-20 h-20 bg-accent text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-accent/20">
                                    <Send size={32} />
                                </div>
                                <h4 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4">Message Sent Successfully!</h4>
                                <p className="text-muted-foreground font-medium">Thank you for your feedback. Our team will get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Message</label>
                                    <textarea
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner h-48"
                                        placeholder="Type your message here..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    className="md:col-span-2 btn-accent py-5 text-xl font-black uppercase tracking-widest shadow-2xl shadow-accent/30 hover:shadow-accent/40 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={24} />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* School Leadership */}
            <section className="max-w-7xl mx-auto px-4 mt-32">
                <div className="text-center mb-16">
                    <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Our Visionaries</span>
                    <h2 className="text-5xl font-black text-primary tracking-tighter uppercase">School <span className="text-accent italic">Leadership</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {leadership.map((leader: any, idx: number) => (
                        <motion.div
                            key={leader.id || leader.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:shadow-2xl transition-all"
                        >
                            <div className="w-40 h-40 bg-zinc-50 rounded-[2.5rem] mb-8 relative overflow-hidden border-8 border-white shadow-xl flex items-center justify-center">
                                {leader.image ? (
                                    <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                                ) : (
                                    <span className="text-primary/10 font-black text-8xl italic">{leader.name.split(' ').pop()?.[0] || 'L'}</span>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent shadow-inner" />
                            </div>
                            <h4 className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">{leader.role}</h4>
                            <h3 className="text-3xl font-black text-primary uppercase tracking-tighter mb-4">{leader.name}</h3>
                            <p className="text-muted-foreground font-medium italic mb-8 leading-relaxed line-clamp-2">{leader.bio || 'Leading Purandhara Everest Academy with excellence and dedication.'}</p>
                            <a
                                href={leader.fb}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#1877F2] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-[#1877F2]/20 transition-all active:scale-95"
                            >
                                Connect on Facebook <MessageCircle size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Google Maps Integration */}
            <section className="max-w-7xl mx-auto px-4 mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="rounded-[3.5rem] overflow-hidden shadow-2xl h-[30rem] relative border-[12px] border-white"
                >
                    <iframe
                        src={settings?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.32782390749!2d82.16431985820312!3d27.9996841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39986b8600000001%3A0xc3f8e6e5f8e5f8e5!2sPurandhara%20Everest%20Academy!5e0!3m2!1sen!2snp!4v1700000000000"}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    />
                </motion.div>
            </section>
        </div>
    );
};

export default ContactPage;
