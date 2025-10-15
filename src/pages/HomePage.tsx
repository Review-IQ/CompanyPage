import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

// TypeScript interfaces
interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Value {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface TechStack {
  name: string;
  icon: JSX.Element;
}

interface Stat {
  value: string;
  label: string;
}

// Enhanced Animated Background with Floating Particles
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Background Hexagons with Multiple Layers
const BackgroundHexagons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <FloatingParticles />

    {/* Large rotating hexagons */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 opacity-20"
    >
      <svg viewBox="0 0 200 200" fill="none">
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
        <path d="M100 10 L180 55 L180 145 L100 190 L20 145 L20 55 Z" stroke="url(#hexGradient)" strokeWidth="0.5" />
      </svg>
    </motion.div>

    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 opacity-20"
    >
      <svg viewBox="0 0 200 200" fill="none">
        <path d="M100 10 L180 55 L180 145 L100 190 L20 145 L20 55 Z" stroke="url(#hexGradient)" strokeWidth="0.5" />
      </svg>
    </motion.div>

    {/* Small floating hexagons */}
    <motion.div
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 right-1/4 w-24 h-24 opacity-10"
    >
      <svg viewBox="0 0 200 200" fill="none">
        <path d="M100 10 L180 55 L180 145 L100 190 L20 145 L20 55 Z" fill="url(#hexGradient)" />
      </svg>
    </motion.div>

    <motion.div
      animate={{
        y: [0, 30, 0],
        rotate: [0, -180, -360]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/3 left-1/3 w-16 h-16 opacity-10"
    >
      <svg viewBox="0 0 200 200" fill="none">
        <path d="M100 10 L180 55 L180 145 L100 190 L20 145 L20 55 Z" fill="url(#hexGradient)" />
      </svg>
    </motion.div>
  </div>
);

// Advanced Scroll Reveal with Variants
const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = 'up'
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionOffset = {
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionOffset[direction] }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, to, className = "" }: { children: React.ReactNode; to: string; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    </motion.div>
  );
};

// Animated Counter
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState('0');

  useEffect(() => {
    if (isInView) {
      const numMatch = value.match(/[\d.]+/);
      if (numMatch) {
        const targetNum = parseFloat(numMatch[0]);
        const duration = 2000;
        const steps = 60;
        const increment = targetNum / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(value.replace(/[\d.]+/, current.toFixed(value.includes('.') ? 1 : 0)));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const stats: Stat[] = [
    { value: '10K+', label: 'Reviews Managed' },
    { value: '98%', label: 'Response Rate' },
    { value: '45min', label: 'Avg. Response Time' },
    { value: '4.8★', label: 'Customer Rating' },
  ];

  const approaches: Feature[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-First Philosophy',
      description: 'We build intelligent systems that learn and adapt to your business, not just automation tools.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Local Business Focus',
      description: 'Deep expertise in the unique challenges faced by restaurants, medical practices, and service businesses.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Customer-Centric Development',
      description: 'We build with real business owners, iterating based on actual needs and feedback.',
    },
  ];

  const values: Value[] = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'We push boundaries with cutting-edge AI and modern technology to create tools that didn\'t exist before.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 010 2H6v10h2a1 1 0 010 2H5a1 1 0 01-1-1V5zM20 5a1 1 0 00-1-1h-4a1 1 0 000 2h2v10h-2a1 1 0 000 2h4a1 1 0 001-1V5z" />
        </svg>
      ),
      title: 'Simplicity',
      description: 'Complex problems deserve elegant solutions. We make powerful software that anyone can use.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Growth',
      description: 'Your success is our success. We build tools that scale with you, from day one to enterprise.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Trust',
      description: 'Security, reliability, and transparency aren\'t features—they\'re foundations of everything we build.',
    },
  ];

  const techStack: TechStack[] = [
    {
      name: 'Microsoft Azure',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 3.41L14.27 21.49 11.69 15.36 16.47 6.59 9.21 18.18 7.27 13.37 2 14.91 13.78 3.41z" />
        </svg>
      ),
    },
    {
      name: 'MongoDB',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.74 4.23c-.84-1-1.57-2-1.71-2.22H12c-.14.21-.87 1.22-1.71 2.22-7.2 9.19 1.14 15.39 1.14 15.39l.07.05c.06.95.22 2.33.22 2.33h.62s.15-1.37.21-2.33l.07-.06s8.32-6.19 1.12-15.38zM12 19.48a3.48 3.48 0 01-.48-.48L12 9l.45 10a3.57 3.57 0 01-.45.48z" />
        </svg>
      ),
    },
    {
      name: 'React',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z" />
        </svg>
      ),
    },
    {
      name: 'AI/ML',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero Section with Enhanced Animations */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
      >
        <BackgroundHexagons />

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Building{' '}
              <motion.span
                className="text-gradient inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Intelligent Infrastructure
              </motion.span>
              <br />
              for Local Businesses
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We create AI-powered software solutions that empower restaurants, medical practices,
            and service businesses to thrive in the digital age.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              to="/repaxio"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group inline-block"
            >
              <span className="relative z-10">Discover Repaxio</span>
            </MagneticButton>
            <MagneticButton
              to="#approach"
              className="px-8 py-4 glass-morphism hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold text-lg transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
            >
              Learn About Us
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20"
          >
            <motion.a
              href="#product"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Product Showcase Section */}
      <section id="product" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/50 to-indigo-50 dark:from-slate-900 dark:via-purple-950/20 dark:to-indigo-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent dark:from-purple-900/20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Meet <span className="text-gradient">Repaxio</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
                Our flagship AI-powered reputation management platform that helps local businesses
                monitor, respond to, and grow their online presence.
              </p>
              <MagneticButton
                to="/repaxio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Explore Repaxio
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="glass-morphism rounded-xl p-6 text-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 relative z-10">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 relative z-10">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="approach" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Build Differently</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                We're not just another software company. We're experts in local business operations
                who happen to build exceptional software.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {approaches.map((approach, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="glass-morphism rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg relative z-10"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {approach.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">{approach.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                    {approach.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why FoundHex Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/10 dark:to-indigo-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent dark:from-indigo-900/20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why FoundHex</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Our values guide every decision we make and every line of code we write.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
                <motion.div
                  whileHover={{ scale: 1.02, rotateX: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="glass-morphism rounded-2xl p-8 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-start gap-6 relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {value.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Built on Modern Technology</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                We use cutting-edge technology to deliver secure, scalable, and reliable solutions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="glass-morphism rounded-xl p-8 text-center transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="text-purple-600 dark:text-purple-400 mb-4 flex justify-center relative z-10"
                    whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {tech.icon}
                  </motion.div>
                  <h4 className="font-semibold text-lg relative z-10">{tech.name}</h4>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { value: '99.9%', label: 'Uptime Guarantee' },
                { value: 'SOC 2', label: 'Type II Certified' },
                { value: '256-bit', label: 'End-to-End Encryption' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="glass-morphism rounded-xl p-8 text-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-4xl font-bold text-gradient mb-2 relative z-10">{item.value}</div>
                  <div className="text-slate-600 dark:text-slate-400 relative z-10">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-950/20" />
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * 600,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Building the Future</h2>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We're just getting started. Our vision is to create a complete ecosystem of
                intelligent tools that make running a local business effortless.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                From reputation management to operations, marketing to customer experience—we're
                building the infrastructure that will power the next generation of local businesses.
                Each product we create is designed to work seamlessly together, creating a unified
                platform that grows with you.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <motion.div
              className="glass-morphism rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
                  Join the businesses already thriving with Repaxio
                </p>
                <MagneticButton
                  to="/repaxio"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Now
                </MagneticButton>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
