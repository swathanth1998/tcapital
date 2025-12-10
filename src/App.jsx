import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, X, ArrowUpRight, Activity, Building, ArrowLeft } from 'lucide-react';

// --- Assets & Constants ---
// Theme Colors (Tailwind classes used below):
// Teal: text-teal-500, bg-teal-500
// Orange: text-orange-500, bg-orange-500
// White: text-white, bg-white
// Dark: text-gray-900, bg-gray-900

const COMPANIES = [
  { name: "Care.ai", color: "bg-teal-500", icon: "Ai" },
  { name: "HealthGrid", color: "bg-orange-500", icon: "Hg" },
  { name: "Galvanon", color: "bg-teal-500", icon: "Gv" },
  { name: "Oncologic", color: "bg-orange-500", icon: "On" },
  { name: "DifGen", color: "bg-teal-500", icon: "Dg" }
];

// --- Components ---

const GeometricLoader = ({ onComplete }) => {
  const transition = { duration: 1.5, ease: [0.6, 0.01, 0.05, 0.9] };

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="relative w-32 h-32">
        <motion.div
          className="absolute bg-orange-500 w-10 h-10 top-0 left-10"
          initial={{ y: -100, opacity: 0, rotate: 45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ ...transition, delay: 0.2 }}
        />
        <motion.div
          className="absolute bg-teal-500 w-10 h-10 top-12 left-0"
          initial={{ x: -100, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ ...transition, delay: 0.4 }}
        />
        <motion.div
          className="absolute bg-gray-900 w-10 h-20 top-12 left-12"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...transition, delay: 0.6 }}
          style={{ borderBottomRightRadius: '20px' }} 
        />
        <motion.div
          className="absolute -bottom-12 left-0 w-full text-center text-black font-bold tracking-widest text-sm"
          initial={{ opacity: 0, letterSpacing: '0px' }}
          animate={{ opacity: 1, letterSpacing: '4px' }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          LOADING
        </motion.div>
      </div>
    </motion.div>
  );
};

const Navbar = ({ scrolled, currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (viewName) => {
    setView(viewName);
    setIsOpen(false);
    // If navigating to home sections, you might want to scroll, 
    // but for now we are just switching "Views"
    if (viewName === 'home') window.scrollTo(0,0);
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => handleNavClick('home')}
        >
           <div className="relative w-8 h-8">
              <div className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-sm"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-teal-500 rounded-sm"></div>
              <div className="absolute bottom-0 right-0 w-4 h-8 bg-gray-900 rounded-br-lg"></div>
           </div>
           <span className={`font-bold text-xl tracking-tight transition-colors text-gray-900`}>TCapital</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
            <button 
                onClick={() => handleNavClick('portfolio')}
                className={`text-sm font-medium hover:text-orange-500 transition-colors relative group ${currentView === 'portfolio' ? 'text-orange-500' : 'text-gray-800'}`}
            >
              Portfolio
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-orange-500 transition-all duration-300 ${currentView === 'portfolio' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
            {['Expertise', 'Team', 'About'].map((item) => (
                <button 
                    key={item} 
                    onClick={() => handleNavClick('home')} // Simplified for demo to go home
                    className={`text-sm font-medium hover:text-orange-500 transition-colors relative group text-gray-800`}
                >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </button>
            ))}
          <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
            Pitch Us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white fixed top-20 left-0 w-full overflow-hidden border-t border-gray-100"
          >
            <div className="flex flex-col p-8 gap-6">
               <button
                  onClick={() => handleNavClick('portfolio')}
                  className="text-left text-2xl font-light text-gray-900 hover:text-orange-500 transition-colors"
                >
                  Portfolio
                </button>
              {['Expertise', 'Team', 'About'].map((item, i) => (
                <button
                  key={item}
                  onClick={() => handleNavClick('home')}
                  className="text-left text-2xl font-light text-gray-900 hover:text-orange-500 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Animations ---

const FloatingExitCards = () => {
  return (
    <div className="relative w-full h-[400px] md:w-[400px] overflow-visible perspective-1000">
      {COMPANIES.map((company, index) => (
        <FloatingCard key={company.name} company={company} index={index} total={COMPANIES.length} />
      ))}
    </div>
  );
};

const FloatingCard = ({ company, index, total }) => {
    // Adjusted stagger to accommodate more items smoothly
    const delay = index * 2.2; 
    
    return (
        <motion.div
            className="absolute left-0 bottom-0 w-48 h-16 bg-white rounded-lg shadow-xl border border-gray-100 flex items-center gap-4 px-4 z-10"
            initial={{ x: -50, y: 100, opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
                x: [0, 100, 250], 
                y: [0, -150, -350],
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.9],
                rotate: [0, 5, 10]
            }}
            transition={{
                duration: 11, // Increased duration for a more leisurely float with more items
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1]
            }}
        >
            <div className={`w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs ${company.color}`}>
                {company.icon}
            </div>
            <div>
                <p className="font-bold text-gray-900 text-sm">{company.name}</p>
            </div>
        </motion.div>
    )
}

const Hero = ({ setView }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-gray-900 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-white to-white" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="flex gap-3 mb-6"
            >
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-600 text-xs font-bold tracking-wider uppercase">
                    <Activity size={12} /> Healthcare
                </span>
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold tracking-wider uppercase">
                    <Building size={12} /> Real Estate
                </span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tighter mb-8 text-gray-900"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              Investing in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-gray-900 to-teal-500">
                Transformational
              </span> <br />
              Outcomes.
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed font-medium"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              We partner with visionary founders redefining <strong>Healthcare</strong> and <strong>Real Estate</strong> infrastructure.
            </motion.p>
            
            <motion.div
              className="mt-12 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              <button 
                onClick={() => setView('portfolio')}
                className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-orange-500 transition-all duration-300 font-bold shadow-xl hover:shadow-orange-500/30"
              >
                Explore Portfolio
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
          
          {/* Animated Hero Elements */}
          <motion.div 
            style={{ opacity }}
            className="md:col-span-5 hidden md:flex justify-end items-center relative h-[500px]"
          >
             {/* Background Glows */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"></div>
             <FloatingExitCards />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ company, category, status, acquiredBy, image, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    className="group relative h-[400px] w-full overflow-hidden bg-gray-900 rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
  >
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors z-10" />
    <img 
      src={image} 
      alt={company} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
    />
    <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 shadow-sm ${color === 'teal' ? 'bg-teal-500' : 'bg-orange-500'}`}>
            {category}
            </span>
            {status === 'acquired' && (
                <span className="text-xs font-medium text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-md w-fit">
                    Acquired by {acquiredBy}
                </span>
            )}
        </div>
        
        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
          <ArrowUpRight size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">{company}</h3>
        <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 text-sm drop-shadow-md">
          {status === 'active' ? 'Fueling growth and innovation.' : `A success story in ${category.toLowerCase()}.`}
        </p>
      </div>
    </div>
  </motion.div>
);

const StatsSection = () => {
    return (
        <section className="py-24 bg-orange-500 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-6">
                    {[
                        { label: "Assets Under Management", value: "$450M+" },
                        { label: "Successful Exits", value: "12" },
                        { label: "Years of Experience", value: "20+" },
                        { label: "Active Investments", value: "8" }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h4 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight text-white">
                                {stat.value}
                            </h4>
                            <p className="text-sm text-orange-100 uppercase tracking-widest font-bold border-t border-white/30 pt-4 mt-2 inline-block w-full">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Marquee = () => {
    return (
        <div className="w-full bg-orange-500 py-16 overflow-hidden flex">
            <motion.div 
                className="flex gap-24 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-24 items-center">
                        {[
                            "Care.ai", "HealthGrid", "Galvanon", "Oncologic", "DifGen"
                        ].map(name => (
                            <span key={name} className="text-5xl font-bold text-white/90 hover:text-white transition-colors cursor-default">
                                {name}
                            </span>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

const Footer = ({ setView }) => (
  <footer className="bg-black text-white pt-24 pb-12 border-t border-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                 {/* Footer Logo */}
                <div className="relative w-6 h-6">
                    <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-sm"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-teal-500 rounded-sm"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-6 bg-white rounded-br-md"></div>
                </div>
                <span className="font-bold text-lg">TCapital</span>
            </div>
          <p className="text-gray-400 max-w-sm text-lg">
            Domain expertise in <strong>Healthcare</strong> and <strong>Real Estate</strong>. <br/>
            Building the future, one partnership at a time.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-teal-400">Explore</h4>
          <ul className="space-y-4 text-gray-400">
             <li><button onClick={() => setView('portfolio')} className="hover:text-white transition-colors text-left">Portfolio</button></li>
            {['Expertise', 'Team', 'Contact'].map(link => (
              <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-orange-500">Social</h4>
          <ul className="space-y-4 text-gray-400">
            {['LinkedIn', 'Twitter', 'Crunchbase'].map(link => (
              <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-500">
        <p>© 2024 TCapital. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const PortfolioView = ({ setView }) => {
    // Scroll to top when mounted
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-20 min-h-screen bg-white"
        >
            <div className="max-w-7xl mx-auto px-6">
                <button 
                    onClick={() => setView('home')}
                    className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Home
                </button>
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-gray-900">Our <span className="text-orange-500">Portfolio</span>.</h2>
                        <p className="text-xl text-gray-500">Transforming industries through strategic acquisition and growth.</p>
                    </div>
                </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PortfolioCard 
                  company="Care.ai" 
                  category="Healthcare AI" 
                  status="acquired"
                  acquiredBy="Stryker"
                  color="teal"
                  image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
                />
                <PortfolioCard 
                  company="HealthGrid" 
                  category="Patient Engagement" 
                  status="acquired"
                  acquiredBy="Allscripts"
                  color="orange"
                  image="https://images.unsplash.com/photo-1579684385136-137af7513528?q=80&w=1000&auto=format&fit=crop"
                />
                <PortfolioCard 
                  company="Galvanon" 
                  category="Patient Experience" 
                  status="acquired"
                  acquiredBy="NCR"
                  color="teal"
                  image="https://images.unsplash.com/photo-1516574187841-69301976e499?q=80&w=1000&auto=format&fit=crop"
                />
                <PortfolioCard 
                    company="Oncologic" 
                    category="Oncology" 
                    status="active"
                    color="orange"
                    image="https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1000&auto=format&fit=crop"
                />
                <PortfolioCard 
                    company="DifGen" 
                    category="Pharmaceuticals" 
                    status="active"
                    color="teal"
                    image="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000&auto=format&fit=crop"
                />
              </div>
            </div>
            
            <section className="mt-32 py-24 bg-gray-50">
                 <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold mb-6">Investment Criteria</h3>
                    <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-xl mb-2 text-teal-600">Sector</h4>
                            <p className="text-gray-600">Healthcare IT, Real Estate Tech, and Digital Infrastructure.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-xl mb-2 text-orange-500">Stage</h4>
                            <p className="text-gray-600">Series A through Growth Equity. Revenue generating with proven product-market fit.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-xl mb-2 text-gray-900">Geography</h4>
                            <p className="text-gray-600">Primary focus on North America and Europe.</p>
                        </div>
                    </div>
                 </div>
            </section>
        </motion.div>
    )
}

const HomeView = ({ setView }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Hero setView={setView} />
            <Marquee />
            <StatsSection />
            <section id="expertise" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">Deep expertise in <br/><span className="text-orange-500">Critical Sectors.</span></h2>
                        </div>
                        <div className="space-y-8 text-xl text-gray-500">
                            <p>
                                <strong className="text-gray-900">Healthcare:</strong> We invest in digital health, AI-driven diagnostics, and patient engagement platforms that improve outcomes and streamline care delivery.
                            </p>
                            <p>
                                <strong className="text-gray-900">Real Estate:</strong> We back technologies that modernize property management, construction, and the built environment.
                            </p>
                            <button className="text-teal-600 border-b border-teal-600 pb-1 hover:text-orange-500 hover:border-orange-500 transition-colors font-medium">
                                View Investment Criteria
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-32 px-6 text-center bg-gray-50">
                <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter text-gray-900">Ready to <span className="text-teal-500">scale</span>?</h2>
                <button className="bg-orange-500 text-white text-xl px-12 py-5 rounded-full font-bold hover:bg-black transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20">
                    Get in Touch
                </button>
            </section>
        </motion.div>
    )
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState('home'); // 'home' or 'portfolio'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-orange-200 selection:text-orange-900">
      <AnimatePresence>
        {loading && <GeometricLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
          <Navbar scrolled={scrolled} currentView={view} setView={setView} />
          
          <main>
              {view === 'home' ? (
                  <HomeView setView={setView} />
              ) : (
                  <PortfolioView setView={setView} />
              )}
          </main>
          
          <Footer setView={setView} />
        </motion.div>
      )}
    </div>
  );
}