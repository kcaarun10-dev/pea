"use client";

"use client";

import React, { useState, useEffect } from 'react';
import { Send, User, Users, Phone, Mail, MapPin, Calendar, Book, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdmissionPage = () => {
    const [pageData, setPageData] = useState<any>(null);
    const [formData, setFormData] = useState({
        studentName: '',
        dob: '',
        class: '',
        previousSchool: '',
        fatherName: '',
        motherName: '',
        mobile: '',
        email: '',
        address: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/admissions-page')
            .then(res => res.json())
            .then(data => setPageData(data))
            .catch(err => console.error('Error fetching admissions page data:', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSubmitted(true);
                window.scrollTo(0, 0);
            }
        } catch (error) {
            alert('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center bg-muted/30 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl text-center max-w-xl border border-gray-100"
                >
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 animate-bounce">
                        <CheckCircle size={36} />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-primary mb-4 uppercase tracking-tighter">Application Received!</h1>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-medium">
                        {pageData?.successMessage || "Thank you for choosing Purandhara Everest Academy. Our administration team will review your application and contact you within 24-48 hours."}
                    </p>
                    <button onClick={() => window.location.href = '/'} className="btn-primary w-full py-4 md:py-5 text-base md:text-lg shadow-xl shadow-primary/20">
                        Back to Homepage
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-muted/30 pb-24">
            <section className="max-w-4xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100"
                >
                    <div className="bg-primary text-white p-8 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]" />
                        <div className="relative z-10">
                            <span className="inline-block bg-accent text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">Batch {pageData?.batch || "2026"}</span>
                            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-none">{pageData?.title || "Admission Form"}</h1>
                            <p className="text-white/60 text-base md:text-lg font-light">{pageData?.subtitle || "Join the community of excellence at Purandhara Everest"}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-12 lg:p-16 space-y-8 md:space-y-12">
                        {/* Student Info */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black flex items-center gap-3 text-primary uppercase tracking-tighter">
                                <div className="p-2 bg-accent/10 rounded-xl text-accent"><User size={24} /></div> Student Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        placeholder="John Doe"
                                        value={formData.studentName}
                                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Date of Birth *</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Seeking Class *</label>
                                    <select
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-black text-primary shadow-inner appearance-none uppercase tracking-wider"
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        {['PG', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(c => (
                                            <option key={c} value={c}>Class {c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Previous School</label>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        placeholder="School name"
                                        value={formData.previousSchool}
                                        onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Parent Info */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black flex items-center gap-3 text-primary uppercase tracking-tighter">
                                <div className="p-2 bg-accent/10 rounded-xl text-accent"><Users size={24} /></div> Guardian Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Father's Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        value={formData.fatherName}
                                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Mother's Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        value={formData.motherName}
                                        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-black text-primary shadow-inner"
                                        placeholder="98XXXXXXXX"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner"
                                        placeholder="example@mail.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Permanent Address *</label>
                                    <textarea
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium text-primary shadow-inner h-32"
                                        placeholder="Street, Ward, Municipality"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="bg-muted/50 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 text-center space-y-6 md:space-y-8">
                            <p className="text-sm font-medium text-muted-foreground italic">
                                * Information collected is strictly for admission processes. We'll contact you shortly.
                            </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-accent py-5 text-xl font-black uppercase tracking-widest shadow-2xl shadow-accent/30 flex items-center justify-center gap-4 disabled:opacity-50"
                            >
                                {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div> : <><Send size={24} /> Submit Application</>}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </section>
        </div>
    );
};

export default AdmissionPage;
