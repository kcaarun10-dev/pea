"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Calendar,
  Bell,
  Microscope
} from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  image?: string;
}

interface GalleryImage {
  src: string;
  title: string;
}

export default function Home() {
  const [notices, setNotices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/notices').then(res => res.json()).then(data => setNotices(data.slice(0, 4)));
    fetch('/api/gallery').then(res => res.json()).then(data => setGallery(data.slice(0, 4)));
    fetch('/api/settings').then(res => res.json()).then(data => setSettings(data));
    fetch('/api/home').then(res => res.json()).then(data => setHomeData(data));
  }, []);

  if (!homeData) return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-muted/30">
      <div className="p-10 bg-white rounded-[2rem] shadow-xl text-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="font-black text-primary uppercase tracking-widest text-xs">Welcoming You Home...</p>
      </div>
    </div>
  );

  const principal = settings?.leadership?.find((l: any) => l.role === 'Principal');
  const chairman = settings?.leadership?.find((l: any) => l.role === 'Chairman');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <Image
          src={homeData?.hero?.image || "/images/hero1.webp"}
          alt="School Hero"
          fill
          className="object-cover scale-105 animate-float opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl text-white"
          >
            <span className="inline-flex items-center gap-2 bg-accent text-primary px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-accent/20">
              <BookOpen size={14} /> {homeData?.hero?.badge || 'Education'}
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              {homeData?.hero?.title1 || 'Excellence in'} <br />
              <span className="text-accent italic">{homeData?.hero?.titleAccent || 'Education'}</span> <br />
              {homeData?.hero?.title2 || 'For All'}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-xl font-light leading-relaxed">
              {homeData?.hero?.description || 'Providing quality education for a brighter future.'}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/admissions" className="btn-accent text-lg px-10 py-5 group shadow-2xl shadow-accent/20">
                Start Journey <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/about" className="bg-white/10 backdrop-blur-md text-white border border-white/20 py-5 px-10 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2">
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        {homeData?.stats && Array.isArray(homeData.stats) && homeData.stats.length > 0 && (
          <div className="absolute bottom-12 right-12 hidden xl:flex gap-12 bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            {homeData.stats.map((stat: any, i: number) => (
              <React.Fragment key={stat?.label || i}>
                <div className="text-center">
                  <p className="text-accent text-4xl font-black">{stat?.value || '0'}</p>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">{stat?.label || 'Stat'}</p>
                </div>
                {i < homeData.stats.length - 1 && <div className="w-px h-12 bg-white/10" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>

      {/* Principal's Message Section */}
      <section className="py-32 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute -inset-4 bg-accent/20 rounded-[4rem] blur-2xl" />
              <div className="relative rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl aspect-[4/5]">
                {/* Principal Photo Placeholder */}
                <div className="absolute inset-0 bg-muted flex items-center justify-center text-primary/10 italic font-black text-3xl text-center p-12">
                  Principal<br />Purandhara Everest Academy
                </div>
                <Image
                  src={homeData?.message?.image || "/images/placeholder-user.webp"}
                  alt="Principal"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 hidden md:block">
                <span className="text-accent font-black italic text-4xl leading-none">"{homeData?.message?.quote || 'Education is the key to success.'}</span>
                <p className="text-primary font-black uppercase tracking-widest text-[10px] mt-2">{principal?.name || 'Principal'}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">{homeData?.message?.subtitle || 'Message from Principal'}</span>
              <h2 className="text-5xl font-black text-primary mb-8 tracking-tighter uppercase leading-tight">{(homeData?.message?.title || 'Academic Leadership').split(' ').slice(0, 3).join(' ')} <br /> <span className="text-accent italic">{(homeData?.message?.title || 'Academic Leadership').split(' ').slice(3).join(' ')}</span></h2>
              <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed italic">
                {(homeData?.message?.paragraphs || []).map((p: string, i: number) => (
                  <p key={i}>"{p}"</p>
                ))}
              </div>
              <div className="mt-12 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-black italic shadow-xl">PEA</div>
                <div>
                  <h4 className="text-xl font-black text-primary uppercase tracking-tighter">{principal?.name || 'Principal'}</h4>
                  <p className="text-sm font-bold text-accent uppercase tracking-widest">{principal?.role || 'Principal'}</p>
                  <a href={principal?.fb || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline mt-1 block">View FB Profile</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Highlights/Stats Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Key Pillars</span>
            <h2 className="text-5xl font-black text-primary tracking-tighter uppercase mb-6">Why Choose PEA?</h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed italic">Discover the core values and facilities that make us the leading academy in the region.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(homeData.features || []).map((feature: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-muted/30 p-12 rounded-[3.5rem] border border-gray-100 group hover:bg-primary transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Award size={32} />
                </div>
                <h3 className="text-2xl font-black text-primary mb-4 group-hover:text-white transition-colors tracking-tighter uppercase leading-tight">{feature?.title || 'Highlight'}</h3>
                <p className="text-muted-foreground font-medium group-hover:text-white/60 transition-colors">{feature?.desc || 'Exceptional academic and personal growth environment.'}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice Board Preview */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 text-crimson font-black uppercase tracking-[0.2em] text-xs mb-6">
                <Bell size={18} className="animate-bounce" /> News & Events
              </div>
              <h2 className="text-5xl font-black text-primary mb-6 leading-tight">Latest from <br /> <span className="text-accent">Our Board</span></h2>
              <p className="text-muted-foreground mb-8 text-lg font-medium">Stay updated with the latest happenings, results, and important announcements from Purandhara Everest Academy.</p>
              <Link href="/notices" className="inline-flex items-center gap-4 text-primary font-black hover:text-accent transition-colors group text-lg">
                View All Announcements <div className="w-12 h-12 rounded-full border-2 border-primary/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all"><ArrowRight size={20} /></div>
              </Link>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {notices.map((notice, idx) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 card-hover group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full">
                      <Calendar size={14} className="text-accent" />
                      <span className="text-[10px] font-black text-muted-foreground uppercase">{notice.date}</span>
                    </div>
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">{notice.category}</span>
                  </div>
                  <Link href={`/notices/${notice.id}`} target="_blank" className="group-hover:text-accent transition-colors">
                    <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{notice.title}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 italic font-medium">
                    {notice.content}
                  </p>
                  {notice.image && (
                    <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-4 border border-gray-100">
                      <Image src={notice.image} alt={notice.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  )}
                  <Link href={`/notices/${notice.id}`} target="_blank" className="text-primary/40 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                    Read More <ArrowRight size={12} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-16">
            <div>
              <span className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Visual Journey</span>
              <h2 className="text-5xl font-black text-white">Glimpses of PEA</h2>
            </div>
            <Link href="/gallery" className="btn-accent px-10">Explore All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(gallery || []).map((img, i) => (
              <motion.div
                key={img?.src || i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group border border-white/5"
              >
                <Image src={img?.src || "/images/placeholder.webp"} alt={img?.title || "Gallery Image"} fill className="object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <p className="text-white font-black text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img?.title || "Untitled"}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-accent rounded-[3.5rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase mb-6 leading-none">{homeData?.newsletter?.title || 'Join the'} <br /> <span className="italic">{homeData?.newsletter?.titleAccent || 'PEA Newsletter'}</span></h2>
              <p className="text-primary/70 font-medium text-lg mb-10 max-w-xl mx-auto">{homeData?.newsletter?.description || 'Get the latest school updates, event invitations, and academic news delivered to your inbox.'}</p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-1 px-8 py-5 rounded-2xl bg-white border-none outline-none focus:ring-4 focus:ring-primary/10 font-bold text-primary shadow-inner"
                />
                <button type="button" className="bg-primary text-white font-bold py-5 px-10 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Subscribe
                </button>
              </form>
              <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary/40 italic">We respect your privacy. No spam, ever.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
