"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Mail, Facebook, Clock, ArrowRight } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => setSettings(data && typeof data === 'object' && !data.error ? data : {}))
            .catch(() => setSettings({}));
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Academics', href: '/academics' },
        { name: 'Admissions', href: '/admissions' },
        { name: 'Our Team', href: '/faculty' },
        { name: 'Notice Board', href: '/notices' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-2' : 'bg-transparent py-6 text-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    {/* Top Bar (Hidden on scroll) */}
                    {!scrolled && settings && Object.keys(settings).length > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-white/10 text-xs mb-3 hidden md:flex animate-in fade-in slide-in-from-top-4 duration-700">
                            <div className="flex gap-6 opacity-80">
                                <a href={`tel:${settings.phone || '#'}`} className="flex items-center gap-1 hover:text-accent transition-colors">
                                    <Phone size={12} /> {settings.phone || '9857823607'}
                                </a>
                                <a href={`mailto:${settings.email || '#'}`} className="flex items-center gap-1 hover:text-accent transition-colors">
                                    <Mail size={12} /> {settings.email || 'pea.babai3@gmail.com'}
                                </a>
                            </div>
                            <div className="flex items-center gap-6 opacity-80">
                                <span className="flex items-center gap-1"><Clock size={12} /> Opening: {settings.officeHours || '9:00 AM - 4:00 PM'}</span>
                                {settings.socials?.facebook && (
                                    <a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all hover:scale-110">
                                        <Facebook size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Main Nav */}
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className={`relative w-12 h-12 rounded-2xl p-2 overflow-hidden transition-all duration-500 ${scrolled ? 'bg-primary shadow-lg shadow-primary/20 rotate-0' : 'bg-white/10 backdrop-blur-md border border-white/20 rotate-3 group-hover:rotate-0'}`}>
                                <Image
                                    src={settings?.logo || "/images/logo.webp"}
                                    alt="Logo"
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <span className={`text-xl font-black block tracking-tighter leading-none transition-colors duration-500 ${scrolled ? 'text-primary' : 'text-white'}`}>{settings?.schoolName1 || "PURANDHARA"}</span>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">{settings?.schoolName2 || "EVEREST ACADEMY"}</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`font-semibold text-sm tracking-wide transition-all duration-300 relative group/link ${scrolled ? 'text-primary/80 hover:text-primary' : 'text-white/80 hover:text-white'}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover/link:w-full`} />
                                </Link>
                            ))}
                            <Link href="/admissions" className="btn-accent text-sm py-2.5 px-6 shadow-xl shadow-accent/20">
                                Apply Now
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-2 rounded-xl transition-colors ${scrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'}`}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full glass-dark border-t border-white/10 py-8 px-6 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-white font-bold text-xl hover:text-accent transition-all flex items-center justify-between group"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                {link.name}
                                <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                            </Link>
                        ))}
                        <Link
                            href="/admissions"
                            onClick={() => setIsOpen(false)}
                            className="btn-accent text-center mt-4 py-4 text-lg shadow-2xl shadow-accent/30"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
