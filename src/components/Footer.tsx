"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch('/api/settings').then(res => res.json()).then(data => setSettings(data));
    }, []);
    return (
        <footer className="relative bg-primary text-white pt-24 pb-12 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-crimson/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* School Info */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="bg-white p-2 rounded-2xl w-14 h-14 flex items-center justify-center overflow-hidden shadow-xl group-hover:scale-110 transition-transform">
                                <Image src={settings?.logo || "/images/logo.webp"} alt="Logo" width={48} height={48} />
                            </div>
                            <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                                {settings?.schoolName1 || "PEA"}<br />
                                <span className="text-accent not-italic text-sm tracking-[0.2em] font-medium">DANG</span>
                            </span>
                        </Link>
                        <p className="text-white/60 text-lg font-light leading-relaxed">
                            {settings?.description || '"Connecting students, parents, and community for a brighter future." Purandhara Everest Academy is dedicated to shaping young minds with values and excellence.'}
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Facebook size={20} />, href: settings?.socials?.facebook || "#" },
                                { icon: <Twitter size={20} />, href: settings?.socials?.twitter || "#" },
                                { icon: <Instagram size={20} />, href: settings?.socials?.instagram || "#" },
                                { icon: <Youtube size={20} />, href: settings?.socials?.youtube || "#" },
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 hover:-translate-y-1">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-10">Useful Links</h4>
                        <ul className="space-y-5">
                            {['Home', 'About Us', 'Academics', 'Admissions', 'Our Team', 'Notice Board', 'Gallery', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-white transition-all flex items-center gap-3 group text-lg font-medium">
                                        <span className="w-2 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-all"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Academics */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-10">Academics</h4>
                        <ul className="space-y-5">
                            {['Pre-Primary', 'Primary', 'Lower Secondary', 'Secondary', 'Science Lab', 'Computer Lab'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-white/60 hover:text-white transition-all flex items-center gap-3 group text-lg font-medium">
                                        <span className="w-2 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-all"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-10">Connect</h4>
                        <div className="space-y-8">
                            <div className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Location</h5>
                                    <p className="text-white font-bold">{settings?.location || "Babai-3, Hanspur Dang"}</p>
                                </div>
                            </div>
                            <div className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Admissions</h5>
                                    <p className="text-white font-bold">{settings?.phone || "9857823607"}</p>
                                </div>
                            </div>
                            <div className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Email Us</h5>
                                    <p className="text-white font-bold truncate">{settings?.email || "pea.babai3@gmail.com"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-white/40 text-sm font-medium">
                        © {new Date().getFullYear()} Purandhara Everest Academy.
                    </div>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
                    </div>
                    <div className="bg-white/5 px-6 py-2 rounded-full border border-white/10 text-xs font-bold italic text-white/60">
                        {settings?.footerSlogan || "Excellence in Dang Since 20XX"}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
