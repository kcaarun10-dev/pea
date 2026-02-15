"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Bell,
    Image as ImageIcon,
    FileText,
    Users,
    Settings,
    LogOut,
    Plus,
    TrendingUp,
    Activity,
    X,
    CheckCircle,
    Clock,
    Search,
    Filter as FilterIcon,
    ChevronRight,
    SearchIcon,
    Edit2,
    Upload,
    MessageCircle,
    Trash2,
    Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const AdminDashboard = () => {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [activeTab, setActiveTab] = useState('Dashboard');
    const [notices, setNotices] = useState<any[]>([]);
    const [admissions, setAdmissions] = useState<any[]>([]);
    const [gallery, setGallery] = useState<any[]>([]);
    const [faculty, setFaculty] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [showFacultyModal, setShowFacultyModal] = useState(false);
    const [newNotice, setNewNotice] = useState({ title: '', category: 'General', type: 'Announcement', content: '', image: '' });
    const [newGallery, setNewGallery] = useState({ title: '', src: '', category: 'School Events' });
    const [newFaculty, setNewFaculty] = useState({
        name: '', role: '', dept: '', image: '', email: '', phone: '',
        bio: '', qualification: '', experience: '', specialties: '', whatsapp: '',
        facebook: '', instagram: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [settings, setSettings] = useState<any>(null);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [academicData, setAcademicData] = useState<any>(null);
    const [aboutData, setAboutData] = useState<any>(null);
    const [homeData, setHomeData] = useState<any>(null);
    const [admissionsPageData, setAdmissionsPageData] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [currentTime, setCurrentTime] = useState(new Date());

    // Check for existing session on mount
    useEffect(() => {
        const session = localStorage.getItem('adminAuth');
        if (session === 'authenticated') {
            setIsAuthenticated(true);
        }
    }, []);

    // Handle login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'arun' && password === 'arun') {
            setIsAuthenticated(true);
            localStorage.setItem('adminAuth', 'authenticated');
            setLoginError('');
        } else {
            setLoginError('Invalid username or password');
        }
    };

    // Handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
        setUsername('');
        setPassword('');
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [noticesRes, admissionsRes, galleryRes, settingsRes, facultyRes, feedbackRes, academicsRes, aboutRes, homeRes, admissionsPageRes] = await Promise.all([
                    fetch('/api/notices'),
                    fetch('/api/admissions'),
                    fetch('/api/gallery'),
                    fetch('/api/settings'),
                    fetch('/api/faculty'),
                    fetch('/api/feedback'),
                    fetch('/api/academics'),
                    fetch('/api/about'),
                    fetch('/api/home'),
                    fetch('/api/admissions-page')
                ]);

                const [noticesData, admissionsData, galleryData, settingsData, facultyData, feedbackData, currentAcademics, currentAbout, currentHome, currentAdmissionsPage] = await Promise.all([
                    noticesRes.json(),
                    admissionsRes.json(),
                    galleryRes.json(),
                    settingsRes.json(),
                    facultyRes.json(),
                    feedbackRes.json(),
                    academicsRes.json(),
                    aboutRes.json(),
                    homeRes.json(),
                    admissionsPageRes.json()
                ]);

                const defaultHome = {
                    hero: { badge: 'Welcome To', title1: 'Purandhara', title2: 'Academy', titleAccent: 'Everest', description: 'Empowering students with holistic education and values.' },
                    stats: [{ value: '15+', label: 'Years of Excellence' }, { value: '500+', label: 'Happy Students' }, { value: '100%', label: 'Pass Rate' }],
                    features: [
                        { title: 'Quality Education', description: 'International standard curriculum.' },
                        { title: 'Expert Faculty', description: 'Experienced and dedicated teachers.' },
                        { title: 'Modern Facilities', description: 'State-of-the-art labs and classrooms.' }
                    ],
                    message: { title: 'Principal\'s Message', subtitle: 'Message from Principal', content: 'Welcome to our school...', image: '' },
                    newsletter: { title: 'Join the', titleAccent: 'PEA Newsletter', description: 'Get the latest school updates...' }
                };

                const defaultAcademics = {
                    levels: [
                        { id: 'pre', title: 'Pre-Primary', description: 'Foundation years focus on play-based learning.', image: '' },
                        { id: 'basic', title: 'Basic Level', description: 'Building strong core concepts.', image: '' },
                        { id: 'sec', title: 'Secondary', description: 'Preparing for future careers.', image: '' }
                    ]
                };

                const defaultAbout = {
                    heritage: { title: 'Our Heritage', description: 'Established in 2064 BS...' },
                    mission: 'To provide quality education...',
                    vision: 'To be a center of excellence...'
                };

                const defaultAdmissionsPage = {
                    batch: '2081/82',
                    title: 'Open for Admission',
                    subtitle: 'Join us for a bright future.',
                    successMessage: 'Thank you for applying!'
                };

                const defaultSettings = {
                    schoolName1: 'Purandhara',
                    schoolName2: 'Everest Academy',
                    email: 'pea.babai3@gmail.com',
                    phone: '9857823607',
                    location: 'Babai-3, Hanspur Dang',
                    leadership: [
                        { role: 'Principal', name: 'Mr. Moti Lal KC', bio: 'Dedicated to excellence...', image: '', fb: '' },
                        { role: 'Chairman', name: 'Mr. Bal Krishna Khatri', bio: 'Leading with vision...', image: '', fb: '' }
                    ],
                    socials: { facebook: 'https://facebook.com', youtube: '' }
                };

                // Safely set data with array validation and defaults
                setNotices(Array.isArray(noticesData) ? noticesData : []);
                setAdmissions(Array.isArray(admissionsData) ? admissionsData : []);
                setGallery(Array.isArray(galleryData) ? galleryData : []);

                // Seed Settings
                setSettings(settingsData && typeof settingsData === 'object' && Object.keys(settingsData).length > 0 ? settingsData : defaultSettings);

                setFaculty(Array.isArray(facultyData) ? facultyData : []);
                setMessages(Array.isArray(feedbackData) ? feedbackData : []);

                // Use defaults if Empty or Null
                setAcademicData(currentAcademics && typeof currentAcademics === 'object' && (currentAcademics as any).levels?.length > 0 ? currentAcademics : defaultAcademics);
                setAboutData(currentAbout && typeof currentAbout === 'object' && Object.keys(currentAbout).length > 0 ? currentAbout : defaultAbout);
                setHomeData(currentHome && typeof currentHome === 'object' && Object.keys(currentHome).length > 0 ? currentHome : defaultHome);
                setAdmissionsPageData(currentAdmissionsPage && typeof currentAdmissionsPage === 'object' && Object.keys(currentAdmissionsPage).length > 0 ? currentAdmissionsPage : defaultAdmissionsPage);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Set safe defaults on error
                setNotices([]);
                setAdmissions([]);
                setGallery([]);
                setSettings({});
                setFaculty([]);
                setMessages([]);
                setAcademicData({});
                setAboutData({});
                setHomeData({});
                setAdmissionsPageData({});
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddNotice = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/notices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNotice)
            });
            if (res.ok) {
                const added = await res.json();
                setNotices([added, ...notices]);
                setShowNoticeModal(false);
                setNewNotice({ title: '', category: 'General', type: 'Announcement', content: '', image: '' });
            }
        } catch (error) {
            alert('Failed to save notice');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddGalleryItem = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGallery)
            });
            if (res.ok) {
                const added = await res.json();
                setGallery([added, ...gallery]);
                setShowGalleryModal(false);
                setNewGallery({ title: '', src: '', category: 'School Events' });
            }
        } catch (error) {
            alert('Failed to save photo');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddFacultyItem = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/faculty', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newFaculty)
            });
            if (res.ok) {
                const added = await res.json();
                setFaculty([...faculty, added]);
                setShowFacultyModal(false);
                setNewFaculty({
                    name: '', role: '', dept: '', image: '', email: '', phone: '',
                    bio: '', qualification: '', experience: '', specialties: '', whatsapp: '',
                    facebook: '', instagram: ''
                });
            }
        } catch (error) {
            alert('Failed to add faculty');
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateFacultyItem = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/faculty', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingItem)
            });
            if (res.ok) {
                const updated = await res.json();
                setFaculty(faculty.map(f => f.id === updated.id ? updated : f));
                setEditingItem(null);
            }
        } catch (error) {
            alert('Failed to update faculty');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteFacultyItem = async (id: string) => {
        if (!confirm('Are you sure you want to remove this faculty member?')) return;
        try {
            const res = await fetch('/api/faculty', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setFaculty(faculty.filter(f => f.id !== id));
            }
        } catch (error) {
            alert('Failed to delete faculty');
        }
    };

    const handleImageUpload = async (file: File) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                return data.url;
            } else {
                alert('Upload failed');
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpdateNotice = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/notices', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingItem)
            });
            if (res.ok) {
                const updated = await res.json();
                setNotices(notices.map(n => n.id === updated.id ? updated : n));
                setEditingItem(null);
            }
        } catch (error) {
            alert('Failed to update notice');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteNotice = async (id: string) => {
        if (!confirm('Are you sure you want to delete this notice?')) return;
        try {
            const res = await fetch('/api/notices', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setNotices(notices.filter(n => n.id !== id));
            }
        } catch (error) {
            alert('Failed to delete notice');
        }
    };

    const handleUpdateSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                alert('Settings updated successfully!');
            }
        } catch (error) {
            alert('Failed to update settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteFeedback = async (id: string) => {
        if (!confirm('Are you sure you want to delete this feedback?')) return;
        try {
            const res = await fetch(`/api/feedback?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages(messages.filter(m => m.id !== id));
            }
        } catch (error) {
            alert('Failed to delete feedback');
        }
    };

    const handleDeleteAdmission = async (id: string) => {
        if (!confirm('Are you sure you want to remove this application?')) return;
        try {
            const res = await fetch('/api/admissions', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setAdmissions(admissions.filter(a => a.id !== id));
            }
        } catch (error) {
            alert('Failed to delete admission');
        }
    };

    const handleUpdateAdmissionStatus = async (id: string, status: string) => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admissions', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            if (res.ok) {
                const updated = await res.json();
                setAdmissions(admissions.map(a => a.id === updated.id ? updated : a));
            }
        } catch (error) {
            alert('Failed to update status');
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateGalleryItem = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/gallery', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingItem)
            });
            if (res.ok) {
                const updated = await res.json();
                setGallery(gallery.map(g => g.id === updated.id ? updated : g));
                setEditingItem(null);
            }
        } catch (error) {
            alert('Failed to update photo');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteGalleryItem = async (id: string) => {
        if (!confirm('Are you sure you want to delete this photo?')) return;
        try {
            const res = await fetch('/api/gallery', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setGallery(gallery.filter(g => g.id !== id));
            }
        } catch (error) {
            alert('Failed to delete image');
        }
    };

    const handleSaveAcademics = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/academics', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(academicData)
            });
            if (res.ok) {
                alert('Academic content updated successfully!');
            }
        } catch (error) {
            alert('Failed to save academic content');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveHome = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/home', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(homeData)
            });
            if (res.ok) {
                alert('Home page content updated successfully!');
            }
        } catch (error) {
            alert('Failed to save home content');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveAbout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/about', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aboutData)
            });
            if (res.ok) {
                alert('About Us content updated successfully!');
            }
        } catch (error) {
            alert('Failed to save about content');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveAdmissionsPage = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/admissions-page', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(admissionsPageData)
            });
            if (res.ok) {
                alert('Admissions page content updated successfully!');
            }
        } catch (error) {
            alert('Failed to save admissions content');
        } finally {
            setIsSaving(false);
        }
    };

    const [pageEditorTab, setPageEditorTab] = useState('Home Page');

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-primary font-bold">Initializing PEA Admin CMS...</div>;

    // Show login page if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-accent flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] shadow-2xl p-12 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="bg-primary p-3 rounded-2xl">
                                <span className="text-white font-black text-2xl">PEA</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black text-primary uppercase tracking-tighter mb-2">Admin Login</h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Control Hub Access</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {loginError && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center"
                            >
                                {loginError}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 font-black uppercase tracking-widest rounded-2xl text-xs hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95"
                        >
                            Login to Dashboard
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link href="/" className="text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">
                            ← Back to Website
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Show dashboard if authenticated
    return (
        <div className="flex min-h-screen bg-muted/30">
            {/* Sidebar */}
            <aside className="w-80 bg-gradient-to-b from-primary via-primary/95 to-primary/90 text-white flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="p-8 flex items-center gap-4 relative z-10">
                    <div className="bg-white p-3 rounded-2xl">
                        <span className="text-primary font-black text-2xl">PEA</span>
                    </div>
                    <div>
                        <h2 className="font-black tracking-tighter text-lg leading-tight uppercase">Control Hub</h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Admin Portal v4.0</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2 px-4 relative z-10">
                    {[
                        { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                        { name: 'Manage Notices', icon: <Bell size={20} /> },
                        { name: 'Photo Gallery', icon: <ImageIcon size={20} /> },
                        { name: 'Admission Forms', icon: <FileText size={20} /> },
                        { name: 'Faculty Management', icon: <Users size={20} /> },
                        { name: 'User Feedbacks', icon: <MessageCircle size={20} /> },
                        { name: 'Page Content', icon: <Edit2 size={20} /> },
                        { name: 'Site Settings', icon: <Settings size={20} /> },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${activeTab === item.name
                                ? 'bg-white text-primary shadow-2xl shadow-white/5'
                                : 'hover:bg-white/5 text-white/60 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {React.cloneElement(item.icon as React.ReactElement, {
                                    size: 20
                                } as any)}
                                <span className="text-sm font-black uppercase tracking-tight">{item.name}</span>
                            </div>
                            {activeTab === item.name && (
                                <motion.div layoutId="activeDot" className="w-1.5 h-1.5 bg-accent rounded-full" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-8 mt-auto border-t border-white/5 relative z-10 space-y-2">
                    <button onClick={handleLogout} className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group px-4 py-2 w-full">
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-inherit">Logout</span>
                    </button>
                    <Link href="/" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group px-4 py-2">
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-inherit">View Website</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-x-hidden overflow-y-auto max-h-screen relative">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10">
                    <div>
                        <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <Activity size={12} className="animate-pulse" /> System Operational • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase leading-none">Welcome Back, <br /> <span className="text-accent italic">Principal</span></h1>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => setShowNoticeModal(true)} className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-primary/10">
                            <Plus size={16} /> New Notice
                        </button>
                        <button className="bg-accent text-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-accent/20 transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-accent/10">
                            <ImageIcon size={16} /> Add Photo
                        </button>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
                    >
                        {activeTab === 'Dashboard' && (
                            <div className="space-y-12">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { title: 'New Admissions', count: admissions.length, trend: admissions.filter((a: any) => a.status === 'Pending').length + ' Pending', icon: <TrendingUp className="text-green-500" />, color: 'bg-green-50' },
                                        { title: 'Active Notices', count: notices.length, trend: 'Latest: ' + (notices[0]?.title?.slice(0, 10) || 'None') + '...', icon: <Bell className="text-blue-500" />, color: 'bg-blue-50' },
                                        { title: 'Total Faculty', count: faculty.length, trend: 'Academic Staff', icon: <Users className="text-orange-500" />, color: 'bg-orange-50' },
                                        { title: 'Gallery Photos', count: gallery.length, trend: 'Managed Assets', icon: <ImageIcon className="text-purple-500" />, color: 'bg-purple-50' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col group card-hover relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                            <div className="flex justify-between items-start mb-6 relative z-10">
                                                <div className={`p-4 ${stat.color} rounded-2xl group-hover:scale-110 transition-transform duration-500`}>{stat.icon}</div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{stat.title}</span>
                                                    <h2 className="text-4xl font-black text-primary tracking-tighter">{stat.count}</h2>
                                                </div>
                                            </div>
                                            <div className="mt-auto flex items-center gap-2 relative z-10">
                                                <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} className="h-full bg-accent" />
                                                </div>
                                                <span className="text-[10px] font-black text-accent uppercase tracking-widest">{stat.trend}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Admissions Table */}
                                <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-10 overflow-hidden">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h3 className="text-2xl font-black text-primary uppercase tracking-tighter leading-none">Recent Applications</h3>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Latest student enrollments</p>
                                        </div>
                                        <button onClick={() => setActiveTab('Admission Forms')} className="bg-muted text-primary px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">View All Vault</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                                    <th className="pb-4">Student</th>
                                                    <th className="pb-4">Class</th>
                                                    <th className="pb-4">Status</th>
                                                    <th className="pb-4 text-right">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {admissions.slice(0, 5).map((row, i) => (
                                                    <tr key={i} className="group hover:bg-muted/30 transition-colors">
                                                        <td className="py-4">
                                                            <p className="font-black text-primary tracking-tighter uppercase">{row.studentName}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">{row.mobile}</p>
                                                        </td>
                                                        <td className="py-4">
                                                            <span className="text-xs font-bold text-gray-600 bg-muted px-2 py-0.5 rounded-md">Class {row.class}</span>
                                                        </td>
                                                        <td className="py-4">
                                                            <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${row.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                                                row.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                                                                }`}>
                                                                {row.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 text-right text-[10px] text-gray-400 font-black uppercase tracking-widest italic">{row.date}</td>
                                                    </tr>
                                                ))}
                                                {admissions.length === 0 && (
                                                    <tr>
                                                        <td colSpan={4} className="py-10 text-center text-gray-400 italic">No applications found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Manage Notices' && (
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <h3 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">Board Management</h3>
                                    <div className="flex gap-4 w-full md:w-auto">
                                        <div className="relative flex-1 md:w-80">
                                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Search notices..."
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <button className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-muted transition-colors">
                                            <FilterIcon size={20} className="text-primary" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {notices
                                        .filter(notice => notice.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((notice, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:shadow-2xl hover:shadow-primary/5 transition-all"
                                            >
                                                <div className="flex gap-6 items-center">
                                                    <div className="md:w-16 md:h-16 bg-muted rounded-2xl flex flex-col items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                                        <span className="text-lg font-black leading-none">{notice.date.split(' ')[1] || '01'}</span>
                                                        <span className="text-[8px] font-black uppercase tracking-widest">{notice.date.split(' ')[0] || 'JAN'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="bg-accent/10 text-accent px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest mb-2 block w-fit">
                                                            {notice.category}
                                                        </span>
                                                        <h4 className="font-black text-xl text-primary tracking-tighter uppercase group-hover:text-accent transition-colors duration-300">{notice.title}</h4>
                                                        <p className="text-sm text-gray-500 font-medium line-clamp-1 italic">{notice.content}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingItem(notice)}
                                                        className="w-12 h-12 flex items-center justify-center bg-muted rounded-xl text-gray-400 hover:text-primary hover:bg-white hover:shadow-lg transition-all"
                                                    >
                                                        <Settings size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteNotice(notice.id)}
                                                        className="w-12 h-12 flex items-center justify-center bg-red-50 rounded-xl text-red-400 hover:bg-red-500 hover:text-white hover:shadow-lg transition-all"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Admission Forms' && (
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <h3 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">Application Vault</h3>
                                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                                        <div className="relative flex-1 md:w-80">
                                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Search by student name..."
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <select
                                            className="px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-accent outline-none font-black text-[10px] uppercase tracking-widest appearance-none cursor-pointer"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option>All Status</option>
                                            <option>Pending</option>
                                            <option>Approved</option>
                                            <option>Processing</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-10 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                                    <th className="pb-6">Student Information</th>
                                                    <th className="pb-6">Academic Details</th>
                                                    <th className="pb-6">Guardian Contact</th>
                                                    <th className="pb-6">Status</th>
                                                    <th className="pb-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {admissions
                                                    .filter(row => row.studentName.toLowerCase().includes(searchQuery.toLowerCase()))
                                                    .filter(row => statusFilter === 'All Status' || row.status === statusFilter)
                                                    .map((row, i) => (
                                                        <tr key={i} className="group hover:bg-muted/30 transition-colors">
                                                            <td className="py-6">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-black uppercase tracking-tighter">
                                                                        {row.studentName.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-black text-primary uppercase tracking-tighter">{row.studentName}</p>
                                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">DOB: {row.dob}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-6">
                                                                <span className="bg-muted px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase tracking-widest block w-fit mb-2">
                                                                    Class {row.class}
                                                                </span>
                                                                <p className="text-xs text-gray-500 font-medium truncate max-w-[150px] italic">{row.previousSchool || 'First Enrollment'}</p>
                                                            </td>
                                                            <td className="py-6">
                                                                <p className="font-black text-gray-600 text-sm tracking-tighter">{row.mobile}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{row.email || 'NO EMAIL PROVIDED'}</p>
                                                            </td>
                                                            <td className="py-6">
                                                                <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${row.status === 'Approved' ? 'bg-green-100 text-green-600 shadow-sm shadow-green-100' :
                                                                    row.status === 'Processing' ? 'bg-blue-100 text-blue-600 shadow-sm shadow-blue-100' :
                                                                        'bg-yellow-100 text-yellow-600 shadow-sm shadow-yellow-100'
                                                                    }`}>
                                                                    {row.status}
                                                                </span>
                                                            </td>
                                                            <td className="py-6 text-right">
                                                                <div className="flex gap-2 justify-end">
                                                                    <button
                                                                        onClick={() => handleUpdateAdmissionStatus(row.id, row.status === 'Approved' ? 'Pending' : 'Approved')}
                                                                        disabled={isSaving}
                                                                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm ${row.status === 'Approved' ? 'bg-accent/10 text-accent' : 'bg-green-50 text-green-500 hover:bg-green-500 hover:text-white'}`}
                                                                    >
                                                                        <CheckCircle size={18} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteAdmission(row.id)}
                                                                        disabled={isSaving}
                                                                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                                    >
                                                                        <X size={18} />
                                                                    </button>
                                                                    <button className="w-10 h-10 flex items-center justify-center bg-muted text-gray-400 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                                                                        <ChevronRight size={18} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Photo Gallery' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">Visual Assets</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Manage website gallery and photos</p>
                                    </div>
                                    <button
                                        onClick={() => setShowGalleryModal(true)}
                                        className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        <Plus size={18} /> Add Photo
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {gallery.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group relative aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-xl hover:shadow-2xl transition-all"
                                        >
                                            <img src={img.src || null} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-all p-6 flex flex-col justify-end">
                                                <p className="text-white font-black text-xs uppercase tracking-widest truncate mb-3">{img.title}</p>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingItem({ ...img, type: 'Gallery' })}
                                                        className="flex-1 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-primary transition-all text-[8px] font-black uppercase tracking-widest"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteGalleryItem(img.id)}
                                                        disabled={isSaving}
                                                        className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all disabled:opacity-50"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Faculty Management' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">Faculty Directory</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Manage teachers and staff profiles</p>
                                    </div>
                                    <button
                                        onClick={() => setShowFacultyModal(true)}
                                        className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        <Plus size={18} /> Add Member
                                    </button>
                                </div>
                                <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {faculty.map((staff, i) => (
                                            <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] bg-muted/50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group shadow-inner relative">
                                                {staff.image ? (
                                                    <img src={staff.image || null} alt={staff.name} className="w-16 h-16 rounded-2xl object-cover group-hover:scale-110 transition-transform" />
                                                ) : (
                                                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition-transform">{staff.name.charAt(staff.name.lastIndexOf(' ') + 1)}</div>
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-black text-primary uppercase tracking-tighter">{staff.name}</h4>
                                                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">{staff.role}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{staff.dept} Department</p>
                                                </div>
                                                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => setEditingItem({ ...staff, type: 'Faculty' })}
                                                        className="p-2 bg-white text-primary rounded-lg shadow-sm hover:bg-primary hover:text-white transition-all"
                                                    >
                                                        <Edit2 size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteFacultyItem(staff.id)}
                                                        className="p-2 bg-white text-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'User Feedbacks' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">Global Feedbacks</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Messages from users & parents</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {messages.length > 0 ? messages.map((msg, i) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative group overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                                                <MessageCircle size={120} />
                                            </div>
                                            <div className="flex justify-between items-start mb-8 relative z-10">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center text-primary text-2xl font-black shadow-inner shadow-primary/10">
                                                        {msg.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black text-primary uppercase tracking-tighter">{msg.name}</h4>
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{msg.email}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted px-4 py-2 rounded-full">
                                                        {new Date(msg.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-muted/30 p-8 rounded-[2rem] border border-dashed border-gray-200 mb-8 relative z-10">
                                                <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-2 block">Subject: {msg.subject}</span>
                                                <p className="text-primary font-medium italic leading-relaxed">"{msg.message}"</p>
                                            </div>
                                            <div className="flex gap-4 relative z-10">
                                                <a
                                                    href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                                    className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[9px] hover:shadow-2xl hover:shadow-primary/20 transition-all flex items-center gap-3 active:scale-95"
                                                >
                                                    <Send size={16} /> Reply via Email
                                                </a>
                                                <button
                                                    onClick={() => handleDeleteFeedback(msg.id)}
                                                    className="px-8 py-4 bg-red-50 text-red-500 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-red-500 hover:text-white transition-all flex items-center gap-3 active:scale-95"
                                                >
                                                    <X size={16} /> Remove Message
                                                </button>
                                            </div>
                                        </motion.div>
                                    )) : (
                                        <div className="bg-white rounded-[3rem] border-4 border-dashed border-muted p-20 text-center">
                                            <MessageCircle size={64} className="text-muted mx-auto mb-6 opacity-20" />
                                            <p className="text-gray-400 font-black uppercase tracking-widest">Inbox is empty</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Page Content' && homeData?.hero && academicData && aboutData && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">Page Content Editor</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Live-edit website sections & pictures</p>
                                    </div>
                                    <div className="flex bg-muted p-1 rounded-2xl">
                                        {['Home Page', 'Academics', 'About Us', 'Admissions'].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setPageEditorTab(tab)}
                                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${pageEditorTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-primary'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {pageEditorTab === 'Home Page' ? (
                                    <form onSubmit={handleSaveHome} className="space-y-12">
                                        {/* Hero Editor */}
                                        <div className="bg-primary p-10 rounded-[3rem] shadow-xl text-white space-y-8">
                                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                                <h4 className="text-2xl font-black italic tracking-tighter uppercase">Hero Section</h4>
                                                <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 px-4 py-1 rounded-full">Primary Entry</span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Badge Text</label>
                                                        <input
                                                            type="text"
                                                            value={homeData.hero?.badge || ''}
                                                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, badge: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border-none outline-none font-bold text-white text-sm"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="space-y-1 col-span-1">
                                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Title Part 1</label>
                                                            <input
                                                                type="text"
                                                                value={homeData.hero?.title1 || ''}
                                                                onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, title1: e.target.value } })}
                                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border-none outline-none font-bold text-white text-sm"
                                                            />
                                                        </div>
                                                        <div className="space-y-1 col-span-1">
                                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Accent Title</label>
                                                            <input
                                                                type="text"
                                                                value={homeData.hero?.titleAccent || ''}
                                                                onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, titleAccent: e.target.value } })}
                                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border-none outline-none font-bold text-accent text-sm italic"
                                                            />
                                                        </div>
                                                        <div className="space-y-1 col-span-1">
                                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Title Part 2</label>
                                                            <input
                                                                type="text"
                                                                value={homeData.hero?.title2 || ''}
                                                                onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, title2: e.target.value } })}
                                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border-none outline-none font-bold text-white text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Description</label>
                                                        <textarea
                                                            value={homeData.hero?.description || ''}
                                                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, description: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border-none outline-none font-bold text-white text-xs h-32 resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats Editor */}
                                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                                            <h4 className="text-xl font-black text-primary uppercase tracking-tighter italic border-b border-muted pb-4">Key Statistics</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {homeData.stats?.map((stat: any, idx: number) => {
                                                    if (!stat) return null;
                                                    return (
                                                        <div key={idx} className="p-6 bg-muted rounded-[2rem] space-y-4">
                                                            <input
                                                                type="text"
                                                                value={stat.value}
                                                                onChange={(e) => {
                                                                    const next = { ...homeData };
                                                                    next.stats[idx].value = e.target.value;
                                                                    setHomeData(next);
                                                                }}
                                                                className="w-full px-4 py-3 rounded-xl bg-white border-none outline-none font-black text-primary text-xl text-center"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={stat.label}
                                                                onChange={(e) => {
                                                                    const next = { ...homeData };
                                                                    next.stats[idx].label = e.target.value;
                                                                    setHomeData(next);
                                                                }}
                                                                className="w-full px-4 py-2 rounded-lg bg-white/50 border-none outline-none font-bold text-gray-400 text-[10px] text-center uppercase tracking-widest"
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Message Editor */}
                                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                                            <div className="flex justify-between items-center border-b border-muted pb-4">
                                                <h4 className="text-xl font-black text-primary uppercase tracking-tighter italic">Leadership Message</h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle</label>
                                                        <input
                                                            type="text"
                                                            value={homeData.message?.subtitle || ''}
                                                            onChange={(e) => setHomeData({ ...homeData, message: { ...homeData.message, subtitle: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm"
                                                            placeholder="Message from Principal"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Title</label>
                                                        <input
                                                            type="text"
                                                            value={homeData.message?.title || ''}
                                                            onChange={(e) => setHomeData({ ...homeData, message: { ...homeData.message, title: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm"
                                                        />
                                                        <p className="text-[9px] text-accent font-bold mt-1 uppercase tracking-widest">* Principal Name & Role are managed in Site Settings to Leadership</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quote Banner</label>
                                                        <input
                                                            type="text"
                                                            value={homeData.message?.quote || ''}
                                                            onChange={(e) => setHomeData({ ...homeData, message: { ...homeData.message, quote: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm italic"
                                                            placeholder="Excellent Education"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Message Paragraphs</label>
                                                        {homeData.message?.paragraphs?.map((p: string, i: number) => (
                                                            <textarea
                                                                key={i}
                                                                value={p}
                                                                onChange={(e) => {
                                                                    const next = { ...homeData };
                                                                    next.message.paragraphs[i] = e.target.value;
                                                                    setHomeData(next);
                                                                }}
                                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-xs h-24 resize-none mb-2"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Leadership Picture</label>
                                                        <div className="flex gap-4">
                                                            <input
                                                                type="text"
                                                                value={homeData.message?.image || ''}
                                                                onChange={(e) => setHomeData({ ...homeData, message: { ...homeData.message, image: e.target.value } })}
                                                                className="flex-1 px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-[10px]"
                                                            />
                                                            <div className="relative">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                                    onChange={async (e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (file) {
                                                                            const url = await handleImageUpload(file);
                                                                            if (url) {
                                                                                setHomeData({ ...homeData, message: { ...homeData.message, image: url } });
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                                <button type="button" className="h-full px-6 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all">
                                                                    <Upload size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="w-full aspect-[4/5] bg-muted rounded-3xl overflow-hidden mt-4 relative">
                                                            <img src={homeData.message?.image || null} alt="Leadership Preview" className="absolute inset-0 w-full h-full object-cover" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pillars Editor */}
                                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                                            <h4 className="text-xl font-black text-primary uppercase tracking-tighter italic border-b border-muted pb-4">Key Pillars (Why Choose PEA?)</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {homeData.features?.map((feature: any, idx: number) => (
                                                    <div key={idx} className="p-6 bg-muted rounded-[2rem] space-y-4">
                                                        <input
                                                            type="text"
                                                            value={feature.title}
                                                            onChange={(e) => {
                                                                const next = { ...homeData };
                                                                next.features[idx].title = e.target.value;
                                                                setHomeData(next);
                                                            }}
                                                            className="w-full px-4 py-3 rounded-xl bg-white border-none outline-none font-black text-primary text-sm uppercase tracking-tighter"
                                                            placeholder="Feature Title"
                                                        />
                                                        <textarea
                                                            value={feature.desc}
                                                            onChange={(e) => {
                                                                const next = { ...homeData };
                                                                next.features[idx].desc = e.target.value;
                                                                setHomeData(next);
                                                            }}
                                                            className="w-full px-4 py-3 rounded-xl bg-white border-none outline-none font-bold text-gray-400 text-xs h-24 resize-none"
                                                            placeholder="Description"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const next = { ...homeData };
                                                                next.features.splice(idx, 1);
                                                                setHomeData(next);
                                                            }}
                                                            className="mt-2 text-crimson text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline w-full justify-center"
                                                        >
                                                            <Trash2 size={12} /> Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-center border-t border-muted pt-6">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const next = { ...homeData };
                                                        if (!next.features) next.features = [];
                                                        next.features.push({ title: 'New Feature', desc: 'Description here.' });
                                                        setHomeData(next);
                                                    }}
                                                    className="flex items-center gap-2 bg-primary/5 text-primary px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary/10 transition-all border border-dashed border-primary/20"
                                                >
                                                    <Plus size={16} /> Add Feature Pillar
                                                </button>
                                            </div>
                                        </div>

                                        {/* Newsletter Editor */}
                                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                                            <h4 className="text-xl font-black text-primary uppercase tracking-tighter italic border-b border-muted pb-4">Newsletter Section</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title (First Part)</label>
                                                        <input
                                                            type="text"
                                                            value={homeData.newsletter?.title || ''}
                                                            onChange={(e) => setHomeData({ ...homeData, newsletter: { ...homeData.newsletter, title: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm"
                                                            placeholder="Join the"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title (Accent Part)</label>
                                                        <input
                                                            type="text"
                                                            value={homeData.newsletter?.titleAccent || ''}
                                                            onChange={(e) => setHomeData({ ...homeData, newsletter: { ...homeData.newsletter, titleAccent: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-accent text-sm"
                                                            placeholder="PEA Newsletter"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                                                    <textarea
                                                        value={homeData.newsletter?.description || ''}
                                                        onChange={(e) => setHomeData({ ...homeData, newsletter: { ...homeData.newsletter, description: e.target.value } })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm h-32 resize-none"
                                                        placeholder="Get the latest school updates..."
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="w-full max-w-xs mx-auto block bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Synchronizing...' : 'Save Home Changes'}
                                        </button>
                                    </form>
                                ) : pageEditorTab === 'Academics' ? (
                                    <form onSubmit={handleSaveAcademics} className="space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {academicData.levels?.map((level: any, idx: number) => {
                                                if (!level) return null;
                                                return (
                                                    <div key={level.id || idx} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                                                        <div className="flex justify-between items-center border-b border-muted pb-4">
                                                            <h4 className="font-black text-primary uppercase tracking-tighter text-lg">{level.title}</h4>
                                                            <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/5 px-3 py-1 rounded-full">Level Section</span>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                                                                <textarea
                                                                    value={level.description}
                                                                    onChange={(e) => {
                                                                        const next = { ...academicData };
                                                                        next.levels[idx].description = e.target.value;
                                                                        setAcademicData(next);
                                                                    }}
                                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm h-32 resize-none"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Picture</label>
                                                                <div className="flex gap-4">
                                                                    <input
                                                                        type="text"
                                                                        value={level.image}
                                                                        onChange={(e) => {
                                                                            const next = { ...academicData };
                                                                            next.levels[idx].image = e.target.value;
                                                                            setAcademicData(next);
                                                                        }}
                                                                        className="flex-1 px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-xs"
                                                                    />
                                                                    <div className="relative">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                                            onChange={async (e) => {
                                                                                const file = e.target.files?.[0];
                                                                                if (file) {
                                                                                    const url = await handleImageUpload(file);
                                                                                    if (url) {
                                                                                        const next = { ...academicData };
                                                                                        next.levels[idx].image = url;
                                                                                        setAcademicData(next);
                                                                                    }
                                                                                }
                                                                            }}
                                                                        />
                                                                        <button type="button" className="h-full px-6 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all">
                                                                            <Upload size={18} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="w-full max-w-xs mx-auto block bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Synchronizing...' : 'Save Academic Changes'}
                                        </button>
                                    </form>
                                ) : pageEditorTab === 'About Us' ? (
                                    <form onSubmit={handleSaveAbout} className="space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                                            <div className="bg-primary p-10 rounded-[3rem] shadow-xl space-y-8">
                                                <h4 className="text-2xl font-black italic tracking-tighter uppercase border-b border-white/10 pb-4">Legacy Section</h4>
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Main Title</label>
                                                        <input
                                                            type="text"
                                                            value={aboutData.heritage?.title || ''}
                                                            onChange={(e) => setAboutData({ ...aboutData, heritage: { ...aboutData.heritage, title: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border-none outline-none font-bold text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Hero Description</label>
                                                        <textarea
                                                            value={aboutData.heritage?.description || ''}
                                                            onChange={(e) => setAboutData({ ...aboutData, heritage: { ...aboutData.heritage, description: e.target.value } })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border-none outline-none font-bold text-white text-sm h-32 resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 text-primary">
                                                <h4 className="text-2xl font-black italic tracking-tighter uppercase border-b border-muted pb-4">Mission & Vision</h4>
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Our Mission</label>
                                                        <textarea
                                                            value={aboutData.mission || ''}
                                                            onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm h-32 resize-none"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Our Vision</label>
                                                        <textarea
                                                            value={aboutData.vision || ''}
                                                            onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm h-32 resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="w-full max-w-xs mx-auto block bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Synchronizing...' : 'Save About Changes'}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSaveAdmissionsPage} className="space-y-12">
                                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Batch</label>
                                                        <input
                                                            type="text"
                                                            value={admissionsPageData.batch || ''}
                                                            onChange={(e) => setAdmissionsPageData({ ...admissionsPageData, batch: e.target.value })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Form Title</label>
                                                        <input
                                                            type="text"
                                                            value={admissionsPageData.title || ''}
                                                            onChange={(e) => setAdmissionsPageData({ ...admissionsPageData, title: e.target.value })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle / Intro</label>
                                                        <textarea
                                                            value={admissionsPageData.subtitle || ''}
                                                            onChange={(e) => setAdmissionsPageData({ ...admissionsPageData, subtitle: e.target.value })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-xs h-32 resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Submission Success Message</label>
                                                <textarea
                                                    value={admissionsPageData.successMessage || ''}
                                                    onChange={(e) => setAdmissionsPageData({ ...admissionsPageData, successMessage: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-xs h-24 resize-none"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="w-full max-w-xs mx-auto block bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Synchronizing...' : 'Save Admissions Changes'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}

                        {activeTab === 'Site Settings' && settings && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">Hub Settings</h3>
                                <form onSubmit={handleUpdateSettings} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="font-black text-primary uppercase tracking-tighter text-lg">Branding & Identity</h4>
                                        <div className="space-y-4">
                                            <div className="flex gap-4 items-end">
                                                <div className="flex-1 space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">School Logo</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.logo || ''}
                                                        onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                                                        className="w-full px-6 py-3 rounded-xl bg-muted border-none outline-none font-bold text-primary text-xs"
                                                    />
                                                </div>
                                                <div className="relative h-[52px]">
                                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const url = await handleImageUpload(file);
                                                            if (url) setSettings({ ...settings, logo: url });
                                                        }
                                                    }} />
                                                    <button type="button" className="h-full px-6 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center">
                                                        <Upload size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name Part 1</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.schoolName1 || ''}
                                                        onChange={(e) => setSettings({ ...settings, schoolName1: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name Part 2 (Accent)</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.schoolName2 || ''}
                                                        onChange={(e) => setSettings({ ...settings, schoolName2: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-accent italic"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Established Year</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.established || ''}
                                                        onChange={(e) => setSettings({ ...settings, established: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-xs"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Footer Slogan</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.footerSlogan || ''}
                                                        onChange={(e) => setSettings({ ...settings, footerSlogan: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-xs"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">School Description</label>
                                                <textarea
                                                    value={settings?.description || ''}
                                                    onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-primary text-xs h-24 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6 text-primary">
                                        <h4 className="font-black text-primary uppercase tracking-tighter text-lg">Communication Hub</h4>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Email</label>
                                                    <input
                                                        type="email"
                                                        value={settings?.email || ''}
                                                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-xs"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Phone</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.phone || ''}
                                                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-xs"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.whatsapp || ''}
                                                        onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-xs"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Office Hours</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.officeHours || ''}
                                                        onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-xs"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Address / Location</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.location || ''}
                                                        onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-xs"
                                                        placeholder="e.g. Babai-3, Hanspur Dang"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Google Map Embed URL (src only)</label>
                                                    <input
                                                        type="text"
                                                        value={settings?.mapUrl || ''}
                                                        onChange={(e) => setSettings({ ...settings, mapUrl: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-xs"
                                                        placeholder="https://www.google.com/maps/embed?pb=..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Intro Text</label>
                                                <textarea
                                                    value={settings?.contactIntro || ''}
                                                    onChange={(e) => setSettings({ ...settings, contactIntro: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none font-bold text-xs h-20 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="font-black text-primary uppercase tracking-tighter text-lg">Social Connections</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((platform) => (
                                                <div key={platform} className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest capitalize">{platform} URL</label>
                                                    <input
                                                        type="text"
                                                        value={settings.socials?.[platform] || ''}
                                                        onChange={(e) => {
                                                            const next = { ...settings };
                                                            if (!next.socials) next.socials = {};
                                                            next.socials[platform] = e.target.value;
                                                            setSettings(next);
                                                        }}
                                                        className="w-full px-6 py-3 rounded-xl bg-muted border-none outline-none font-bold text-primary text-[10px]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="font-black text-primary uppercase tracking-tighter text-lg">Map & Location</h4>
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Google Map Embed URL</label>
                                                <input
                                                    type="text"
                                                    value={settings?.mapUrl || ''}
                                                    onChange={(e) => setSettings({ ...settings, mapUrl: e.target.value })}
                                                    className="w-full px-6 py-3 rounded-xl bg-muted border-none outline-none font-bold text-primary text-[10px]"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Physical Address</label>
                                                <input
                                                    type="text"
                                                    value={settings?.location || ''}
                                                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                                    className="w-full px-6 py-3 rounded-xl bg-muted border-none outline-none font-bold text-primary text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="font-black text-primary uppercase tracking-tighter text-lg">Leadership Information</h4>
                                        <div className="space-y-4">
                                            {settings.leadership?.map((leader: any, idx: number) => {
                                                if (!leader) return null;
                                                return (
                                                    <div key={leader.id || idx} className="p-6 bg-muted rounded-[2.5rem] space-y-4 border border-white/50 shadow-inner relative group">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const next = { ...settings };
                                                                next.leadership.splice(idx, 1);
                                                                setSettings(next);
                                                            }}
                                                            className="absolute top-4 right-4 text-crimson hover:bg-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                                                            title="Remove Profile"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>

                                                        <div className="flex justify-between items-center mb-2">
                                                            <p className="text-[8px] font-black text-accent uppercase tracking-widest">{leader.role} Profile</p>
                                                            <div className="w-12 h-12 rounded-xl bg-white overflow-hidden border-2 border-white shadow-sm">
                                                                <img src={leader.image || null} alt="Preview" className="w-full h-full object-cover" />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-1">
                                                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                                                <input
                                                                    type="text"
                                                                    value={leader.name}
                                                                    onChange={(e) => {
                                                                        const newLeadership = [...settings.leadership];
                                                                        newLeadership[idx].name = e.target.value;
                                                                        setSettings({ ...settings, leadership: newLeadership });
                                                                    }}
                                                                    className="w-full px-4 py-3 rounded-xl bg-white border-none outline-none font-bold text-primary text-sm shadow-sm"
                                                                    placeholder="Name"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Facebook URL</label>
                                                                <input
                                                                    type="text"
                                                                    value={leader.fb}
                                                                    onChange={(e) => {
                                                                        const newLeadership = [...settings.leadership];
                                                                        newLeadership[idx].fb = e.target.value;
                                                                        setSettings({ ...settings, leadership: newLeadership });
                                                                    }}
                                                                    className="w-full px-4 py-3 rounded-xl bg-white border-none outline-none font-bold text-primary text-xs shadow-sm"
                                                                    placeholder="Facebook URL"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Profile Bio</label>
                                                            <textarea
                                                                value={leader.bio}
                                                                onChange={(e) => {
                                                                    const newLeadership = [...settings.leadership];
                                                                    newLeadership[idx].bio = e.target.value;
                                                                    setSettings({ ...settings, leadership: newLeadership });
                                                                }}
                                                                className="w-full px-4 py-3 rounded-xl bg-white border-none outline-none font-bold text-primary text-xs shadow-sm h-20 resize-none"
                                                                placeholder="Personal mission or bio..."
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Profile Photo</label>
                                                            <div className="flex gap-3">
                                                                <input
                                                                    type="text"
                                                                    value={leader.image}
                                                                    onChange={(e) => {
                                                                        const newLeadership = [...settings.leadership];
                                                                        newLeadership[idx].image = e.target.value;
                                                                        setSettings({ ...settings, leadership: newLeadership });
                                                                    }}
                                                                    className="flex-1 px-4 py-2 rounded-xl bg-white border-none outline-none font-bold text-primary text-[10px] shadow-sm"
                                                                />
                                                                <div className="relative">
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                                        onChange={async (e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                const url = await handleImageUpload(file);
                                                                                if (url) {
                                                                                    const newLeadership = [...settings.leadership];
                                                                                    newLeadership[idx].image = url;
                                                                                    setSettings({ ...settings, leadership: newLeadership });
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                    <button type="button" className="h-full px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all">
                                                                        <Upload size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex justify-center border-t border-muted pt-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = { ...settings };
                                                    if (!next.leadership) next.leadership = [];
                                                    next.leadership.push({ role: 'New Role', name: 'New Name', bio: '', image: '', fb: '' });
                                                    setSettings(next);
                                                }}
                                                className="flex items-center gap-2 bg-primary/5 text-primary px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary/10 transition-all border border-dashed border-primary/20"
                                            >
                                                <Plus size={16} /> Add Leader Profile
                                            </button>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="w-full bg-primary text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-xl transition-all disabled:opacity-50"
                                        >
                                            {isSaving ? 'Saving Changes...' : 'Save Site Settings'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Edit Item Modal (Notices/Gallery) */}
                <AnimatePresence>
                    {editingItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-primary/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-[3rem] p-10 max-w-3xl w-full shadow-2xl border border-white/20 max-h-[85vh] overflow-y-auto custom-scrollbar"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">
                                            {editingItem.type === 'Gallery' ? 'Edit Photo' : 'Edit Notice'}
                                        </h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                                            {editingItem.type === 'Gallery' ? 'Modify visual asset details' : 'Adjust existing publication'}
                                        </p>
                                    </div>
                                    <button onClick={() => setEditingItem(null)} className="w-12 h-12 flex items-center justify-center bg-muted rounded-2xl hover:bg-red-500 hover:text-white transition-all"><X size={24} /></button>
                                </div>

                                {editingItem.type === 'Gallery' ? (
                                    <form onSubmit={handleUpdateGalleryItem} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image Title</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    value={editingItem.title}
                                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                                                <select
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary appearance-none cursor-pointer"
                                                    value={editingItem.category || 'School Events'}
                                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                                >
                                                    <option>School Events</option>
                                                    <option>Library</option>
                                                    <option>Sports</option>
                                                    <option>Classrooms</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image Source URL</label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    required
                                                    className="flex-1 px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    placeholder={isUploading ? "Uploading..." : "Image URL"}
                                                    value={editingItem.src}
                                                    onChange={(e) => setEditingItem({ ...editingItem, src: e.target.value })}
                                                />
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const url = await handleImageUpload(file);
                                                                if (url) setEditingItem({ ...editingItem, src: url });
                                                            }
                                                        }}
                                                    />
                                                    <button type="button" className="h-full px-6 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest">
                                                        <Upload size={18} /> Upload
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSaving || isUploading}
                                            className="w-full bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Updating...' : isUploading ? 'Saving Uploaded Asset...' : 'Update Photo'}
                                        </button>
                                    </form>
                                ) : editingItem.type === 'Faculty' ? (
                                    <form onSubmit={handleUpdateFacultyItem} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                value={editingItem.name}
                                                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Photo URL</label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    className="flex-1 px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    placeholder={isUploading ? "Uploading profile..." : "Image URL"}
                                                    value={editingItem.image || ''}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingItem({ ...editingItem, image: e.target.value })}
                                                />
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const url = await handleImageUpload(file);
                                                                if (url) setEditingItem({ ...editingItem, image: url });
                                                            }
                                                        }}
                                                    />
                                                    <button type="button" className="h-full px-6 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest">
                                                        <Upload size={18} /> Upload
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</label>
                                                <select
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary appearance-none cursor-pointer"
                                                    value={editingItem.role}
                                                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                                                >
                                                    <option value="">Select Role</option>
                                                    <option>Chairman</option>
                                                    <option>Principal</option>
                                                    <option>Senior Teacher</option>
                                                    <option>Teacher (SE)</option>
                                                    <option>Teacher</option>
                                                    <option>Admission Admin</option>
                                                    <option>Office Staff</option>
                                                    <option>Accountant</option>
                                                </select>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Departments / Subjects (Select all that apply)</label>
                                                <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-[2rem]">
                                                    {['Administration', 'Science', 'Maths', 'English', 'Nepali', 'Social Studies', 'Computer', 'Accountancy', 'Economics', 'Sports'].map(dept => {
                                                        const currentDepts = (editingItem.dept || '').split(',').map((d: string) => d.trim()).filter(Boolean);
                                                        const isSelected = currentDepts.includes(dept);
                                                        return (
                                                            <button
                                                                key={dept}
                                                                type="button"
                                                                onClick={() => {
                                                                    const newDepts = isSelected
                                                                        ? currentDepts.filter((d: string) => d !== dept)
                                                                        : [...currentDepts, dept];
                                                                    setEditingItem({ ...editingItem, dept: newDepts.join(', ') });
                                                                }}
                                                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 ${isSelected
                                                                    ? 'bg-accent border-accent text-primary shadow-lg shadow-accent/20'
                                                                    : 'bg-white/50 border-transparent text-gray-400 hover:border-gray-200'
                                                                    }`}
                                                            >
                                                                {dept}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                                                <input
                                                    type="email"
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    placeholder="e.g. teacher@school.com"
                                                    value={editingItem.email || ''}
                                                    onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    placeholder="e.g. 98XXXXXXXX"
                                                    value={editingItem.phone || ''}
                                                    onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Academic Qualifications</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder="e.g. M.Sc. in Physics, B.Ed."
                                                value={editingItem.qualification || ''}
                                                onChange={(e) => setEditingItem({ ...editingItem, qualification: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    placeholder="+977..."
                                                    value={editingItem.whatsapp || ''}
                                                    onChange={(e) => setEditingItem({ ...editingItem, whatsapp: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Facebook Profile</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    placeholder="https://facebook.com/..."
                                                    value={editingItem.facebook || ''}
                                                    onChange={(e) => setEditingItem({ ...editingItem, facebook: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instagram Profile</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    placeholder="https://instagram.com/..."
                                                    value={editingItem.instagram || ''}
                                                    onChange={(e) => setEditingItem({ ...editingItem, instagram: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Specialties / Expertise</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder="e.g. Quantum Mechanics, Astrophysics"
                                                value={editingItem.specialties || ''}
                                                onChange={(e) => setEditingItem({ ...editingItem, specialties: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personal Bio / About</label>
                                            <textarea
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all h-32 font-bold text-primary placeholder:text-gray-300 resize-none"
                                                placeholder="Tell us about this educator..."
                                                value={editingItem.bio || ''}
                                                onChange={(e) => setEditingItem({ ...editingItem, bio: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSaving || isUploading}
                                            className="w-full bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Updating...' : isUploading ? 'Finalizing Profile...' : 'Update Faculty'}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleUpdateNotice} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Notice Title</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                value={editingItem.title}
                                                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                                                <select
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary appearance-none cursor-pointer"
                                                    value={editingItem.category}
                                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                                >
                                                    <option>General</option>
                                                    <option>Academic</option>
                                                    <option>Event</option>
                                                    <option>Sport</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</label>
                                                <select
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary appearance-none cursor-pointer"
                                                    value={editingItem.type}
                                                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                                                >
                                                    <option>Announcement</option>
                                                    <option>Exam</option>
                                                    <option>Holiday</option>
                                                    <option>Meeting</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image URL (Optional)</label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    className="flex-1 px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                    placeholder={isUploading ? "Uploading image..." : "Image URL"}
                                                    value={editingItem.image}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingItem({ ...editingItem, image: e.target.value })}
                                                />
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const url = await handleImageUpload(file);
                                                                if (url) setEditingItem({ ...editingItem, image: url });
                                                            }
                                                        }}
                                                    />
                                                    <button type="button" className="h-full px-6 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest">
                                                        <Upload size={18} /> Upload
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Message Content</label>
                                            <textarea
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all h-32 font-bold text-primary placeholder:text-gray-300 resize-none"
                                                value={editingItem.content}
                                                onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSaving || isUploading}
                                            className="w-full bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Updating...' : isUploading ? 'Waiting for upload...' : 'Update Notice'}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Add Notice Modal */}
                <AnimatePresence>
                    {showNoticeModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-primary/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border border-white/20"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">Draft Notice</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Publish updates to the school board</p>
                                    </div>
                                    <button onClick={() => setShowNoticeModal(false)} className="w-12 h-12 flex items-center justify-center bg-muted rounded-2xl hover:bg-red-500 hover:text-white transition-all"><X size={24} /></button>
                                </div>
                                <form onSubmit={handleAddNotice} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Notice Title</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                            placeholder="e.g. Annual Sport Meet 2026"
                                            value={newNotice.title}
                                            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                                            <select
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary appearance-none cursor-pointer"
                                                value={newNotice.category}
                                                onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                                            >
                                                <option>General</option>
                                                <option>Academic</option>
                                                <option>Event</option>
                                                <option>Sport</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</label>
                                            <select
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary appearance-none cursor-pointer"
                                                value={newNotice.type}
                                                onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
                                            >
                                                <option>Announcement</option>
                                                <option>Exam</option>
                                                <option>Holiday</option>
                                                <option>Meeting</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image URL (Optional)</label>
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                className="flex-1 px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder={isUploading ? "Uploading image..." : "https://images.unsplash.com/..."}
                                                value={newNotice.image}
                                                onChange={(e) => setNewNotice({ ...newNotice, image: e.target.value })}
                                            />
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const url = await handleImageUpload(file);
                                                            if (url) setNewNotice({ ...newNotice, image: url });
                                                        }
                                                    }}
                                                />
                                                <button type="button" className="h-full px-6 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest">
                                                    <Upload size={18} /> Upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Message Content</label>
                                        <textarea
                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all h-32 font-bold text-primary placeholder:text-gray-300 resize-none"
                                            placeholder="Details of the announcement..."
                                            value={newNotice.content}
                                            onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSaving || isUploading}
                                        className="w-full bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isSaving ? 'Deploying...' : isUploading ? 'Waiting for upload...' : 'Deploy Notice'}
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Add Photo Modal */}
                <AnimatePresence>
                    {showGalleryModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-primary/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border border-white/20"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">New Gallery Asset</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Upload visual story to the academy</p>
                                    </div>
                                    <button onClick={() => setShowGalleryModal(false)} className="w-12 h-12 flex items-center justify-center bg-muted rounded-2xl hover:bg-red-500 hover:text-white transition-all"><X size={24} /></button>
                                </div>
                                <form onSubmit={handleAddGalleryItem} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image Title</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder="e.g. Science Fair 2026"
                                                value={newGallery.title}
                                                onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                                            <select
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary appearance-none cursor-pointer"
                                                value={newGallery.category}
                                                onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                                            >
                                                <option>School Events</option>
                                                <option>Library</option>
                                                <option>Sports</option>
                                                <option>Classrooms</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image Source URL</label>
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                required
                                                className="flex-1 px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder={isUploading ? "Uploading visual story..." : "https://images.unsplash.com/..."}
                                                value={newGallery.src}
                                                onChange={(e) => setNewGallery({ ...newGallery, src: e.target.value })}
                                            />
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const url = await handleImageUpload(file);
                                                            if (url) setNewGallery({ ...newGallery, src: url });
                                                        }
                                                    }}
                                                />
                                                <button type="button" className="h-full px-6 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest">
                                                    <Upload size={18} /> Upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSaving || isUploading}
                                        className="w-full bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isSaving ? 'Uploading...' : isUploading ? 'Optimizing Image...' : 'Upload Photo'}
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Add Faculty Modal */}
                <AnimatePresence>
                    {showFacultyModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-primary/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-[3rem] p-10 max-w-3xl w-full shadow-2xl border border-white/20 max-h-[85vh] overflow-y-auto custom-scrollbar"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">New Faculty Member</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Add a new professional to the directory</p>
                                    </div>
                                    <button onClick={() => setShowFacultyModal(false)} className="w-12 h-12 flex items-center justify-center bg-muted rounded-2xl hover:bg-red-500 hover:text-white transition-all"><X size={24} /></button>
                                </div>
                                <form onSubmit={handleAddFacultyItem} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                            placeholder="e.g. Dr. Ramesh Sharma"
                                            value={newFaculty.name}
                                            onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Photo</label>
                                        <div className="flex gap-4 items-start">
                                            {/* Image Preview */}
                                            {newFaculty.image && (
                                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent shadow-lg">
                                                    <img src={newFaculty.image} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setNewFaculty({ ...newFaculty, image: '' })}
                                                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            )}
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    className="w-full px-6 py-3 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300 text-sm"
                                                    placeholder={isUploading ? "Uploading..." : "Image URL or upload below"}
                                                    value={newFaculty.image}
                                                    onChange={(e) => setNewFaculty({ ...newFaculty, image: e.target.value })}
                                                />
                                                <div className="flex gap-2">
                                                    {/* Single File Upload */}
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                            onChange={async (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    const url = await handleImageUpload(file);
                                                                    if (url) setNewFaculty({ ...newFaculty, image: url });
                                                                }
                                                            }}
                                                        />
                                                        <div className="w-full px-4 py-3 bg-muted rounded-2xl flex items-center gap-3 text-sm font-bold text-gray-400 hover:bg-muted/80 transition-all">
                                                            <Upload size={16} className="text-accent" />
                                                            <span className="truncate">{newFaculty.image ? 'Change Photo' : 'Upload Photo'}</span>
                                                        </div>
                                                    </div>
                                                    {/* Bulk Upload Button */}
                                                    <div className="relative">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                            onChange={async (e) => {
                                                                const files = e.target.files;
                                                                if (files && files.length > 0) {
                                                                    // Upload first image for this faculty member
                                                                    const url = await handleImageUpload(files[0]);
                                                                    if (url) setNewFaculty({ ...newFaculty, image: url });
                                                                    
                                                                    // Store additional images for reference
                                                                    if (files.length > 1) {
                                                                        const additionalUrls: string[] = [];
                                                                        for (let i = 1; i < files.length; i++) {
                                                                            const additionalUrl = await handleImageUpload(files[i]);
                                                                            if (additionalUrl) additionalUrls.push(additionalUrl);
                                                                        }
                                                                        // Store in localStorage for gallery use
                                                                        if (additionalUrls.length > 0) {
                                                                            localStorage.setItem('bulkUploadImages', JSON.stringify(additionalUrls));
                                                                            alert(`${files.length} images uploaded! First image set as profile. ${additionalUrls.length} additional images saved for gallery.`);
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <button type="button" className="h-full px-4 bg-accent/20 text-accent rounded-2xl hover:bg-accent/30 transition-all flex items-center gap-2 font-black text-[10px] tracking-widest">
                                                            <Upload size={16} />
                                                            Bulk
                                                        </button>
                                                    </div>
                                                </div>
                                                {!newFaculty.image && !isUploading && (
                                                    <p className="text-[10px] text-gray-400 font-medium">No file chosen</p>
                                                )}
                                                {isUploading && (
                                                    <p className="text-[10px] text-accent font-bold animate-pulse">Uploading...</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</label>
                                            <select
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary appearance-none cursor-pointer"
                                                value={newFaculty.role}
                                                onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                                            >
                                                <option value="">Select Role</option>
                                                <option>Chairman</option>
                                                <option>Principal</option>
                                                <option>Senior Teacher</option>
                                                <option>Teacher (SE)</option>
                                                <option>Teacher</option>
                                                <option>Admission Admin</option>
                                                <option>Office Staff</option>
                                                <option>Accountant</option>
                                            </select>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Departments / Subjects (Select all that apply)</label>
                                            <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-[2rem]">
                                                {['Administration', 'Science', 'Maths', 'English', 'Nepali', 'Social Studies', 'Computer', 'Accountancy', 'Economics', 'Sports'].map(dept => {
                                                    const currentDepts = (newFaculty.dept || '').split(',').map((d: string) => d.trim()).filter(Boolean);
                                                    const isSelected = currentDepts.includes(dept);
                                                    return (
                                                        <button
                                                            key={dept}
                                                            type="button"
                                                            onClick={() => {
                                                                const newDepts = isSelected
                                                                    ? currentDepts.filter((d: string) => d !== dept)
                                                                    : [...currentDepts, dept];
                                                                setNewFaculty({ ...newFaculty, dept: newDepts.join(', ') });
                                                            }}
                                                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 ${isSelected
                                                                ? 'bg-accent border-accent text-primary shadow-lg shadow-accent/20'
                                                                : 'bg-white/50 border-transparent text-gray-400 hover:border-gray-200'
                                                                }`}
                                                        >
                                                            {dept}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                                            <input
                                                type="email"
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder="e.g. teacher@school.com"
                                                value={newFaculty.email}
                                                onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder="e.g. 98XXXXXXXX"
                                                value={newFaculty.phone}
                                                onChange={(e) => setNewFaculty({ ...newFaculty, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Academic Qualifications</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                            placeholder="e.g. M.Sc. in Physics, B.Ed."
                                            value={newFaculty.qualification}
                                            onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder="+977..."
                                                value={newFaculty.whatsapp}
                                                onChange={(e) => setNewFaculty({ ...newFaculty, whatsapp: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Facebook Profile</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder="https://facebook.com/..."
                                                value={newFaculty.facebook}
                                                onChange={(e) => setNewFaculty({ ...newFaculty, facebook: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instagram Profile</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                                placeholder="https://instagram.com/..."
                                                value={newFaculty.instagram}
                                                onChange={(e) => setNewFaculty({ ...newFaculty, instagram: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Specialties / Expertise</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-primary placeholder:text-gray-300"
                                            placeholder="e.g. Quantum Mechanics, Astrophysics"
                                            value={newFaculty.specialties}
                                            onChange={(e) => setNewFaculty({ ...newFaculty, specialties: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personal Bio / About</label>
                                        <textarea
                                            className="w-full px-6 py-4 rounded-2xl bg-muted border-none outline-none focus:ring-2 focus:ring-accent transition-all h-32 font-bold text-primary placeholder:text-gray-300 resize-none"
                                            placeholder="Tell us about this educator..."
                                            value={newFaculty.bio}
                                            onChange={(e) => setNewFaculty({ ...newFaculty, bio: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSaving || isUploading}
                                        className="w-full bg-accent text-primary py-5 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isSaving ? 'Adding...' : isUploading ? 'Finalizing Profile...' : 'Add Member'}
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main >
        </div >
    );
};

export default AdminDashboard;
