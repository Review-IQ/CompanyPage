import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

// TypeScript interfaces
interface NavLink {
  label: string;
  href: string;
}

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

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

interface RoadmapItem {
  quarter: string;
  year: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

// Logo Components
const HexagonIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <path
      d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
      fill="url(#hexGradient)"
      stroke="url(#hexGradient)"
      strokeWidth="2"
    />
    <text
      x="50"
      y="58"
      fontSize="32"
      fontWeight="800"
      fill="white"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
    >
      FH
    </text>
  </svg>
);

const FullLogo = ({ className = "h-8" }: { className?: string }) => (
  <div className="flex items-center gap-3">
    <HexagonIcon className={className} />
    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
      FoundHex
    </span>
  </div>
);

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
const MagneticButton = ({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) => {
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
    <motion.a
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

// Testimonials Carousel - Currently unused but kept for future use
// const TestimonialsCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, 6000);
//     return () => clearInterval(timer);
//   }, [testimonials.length]);

//   return (
//     <div className="relative h-80 flex items-center justify-center">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: -20, scale: 0.95 }}
//           transition={{ duration: 0.5 }}
//           className="text-center max-w-3xl mx-auto"
//         >
//           <div className="mb-8">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
//               {testimonials[currentIndex].avatar}
//             </div>
//             <p className="text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-200 mb-6 leading-relaxed">
//               "{testimonials[currentIndex].quote}"
//             </p>
//             <div>
//               <p className="font-bold text-lg text-slate-900 dark:text-white">
//                 {testimonials[currentIndex].author}
//               </p>
//               <p className="text-slate-600 dark:text-slate-400">
//                 {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Indicators */}
//       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
//         {testimonials.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-2 h-2 rounded-full transition-all duration-300 ${
//               index === currentIndex
//                 ? 'bg-purple-600 w-8'
//                 : 'bg-slate-300 dark:bg-slate-600'
//             }`}
//             aria-label={`Go to testimonial ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// Interactive Roadmap Timeline - Currently unused but kept for future use
// const RoadmapTimeline = ({ items }: { items: RoadmapItem[] }) => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const statusColors = {
//     completed: 'from-green-500 to-emerald-600',
//     'in-progress': 'from-purple-500 to-indigo-600',
//     planned: 'from-slate-400 to-slate-500',
//   };

//   return (
//     <div className="relative">
//       {/* Timeline Line */}
//       <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-indigo-600 to-purple-600 transform -translate-x-1/2 hidden md:block" />

//       <div className="space-y-12">
//         {items.map((item, index) => (
//           <ScrollReveal key={index} delay={index * 0.1}>
//             <motion.div
//               className={`flex flex-col md:flex-row items-center gap-8 ${
//                 index % 2 === 0 ? 'md:flex-row-reverse' : ''
//               }`}
//               onHoverStart={() => setActiveIndex(index)}
//               onHoverEnd={() => setActiveIndex(null)}
//             >
//               {/* Content */}
//               <motion.div
//                 className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <div className="glass-morphism rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
//                   <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 mb-4">
//                     <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
//                       {item.quarter} {item.year}
//                     </span>
//                   </div>
//                   <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
//                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </motion.div>

//               {/* Timeline Node */}
//               <motion.div
//                 className="relative z-10"
//                 animate={{
//                   scale: activeIndex === index ? 1.2 : 1,
//                 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${statusColors[item.status]} flex items-center justify-center shadow-lg`}>
//                   {item.status === 'completed' && (
//                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                   {item.status === 'in-progress' && (
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                       className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
//                     />
//                   )}
//                   {item.status === 'planned' && (
//                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   )}
//                 </div>
//               </motion.div>

//               {/* Spacer */}
//               <div className="flex-1 hidden md:block" />
//             </motion.div>
//           </ScrollReveal>
//         ))}
//       </div>
//     </div>
//   );
// };

// Animated Counter
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState('0');

  useEffect(() => {
    if (isInView) {
      // Extract number from value
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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Dark mode detection
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks: NavLink[] = [
    { label: 'Product', href: '#product' },
    { label: 'Approach', href: '#approach' },
    { label: 'Technology', href: '#technology' },
    { label: 'Vision', href: '#vision' },
  ];

  const stats: Stat[] = [
    { value: '10K+', label: 'Reviews Managed' },
    { value: '98%', label: 'Response Rate' },
    { value: '45min', label: 'Avg. Response Time' },
    { value: '4.8★', label: 'Customer Rating' },
  ];

  // Testimonials data - Currently unused but kept for future use
  // const testimonials: Testimonial[] = [
  //   {
  //     quote: "Repaxio transformed how we manage our online reputation. The AI responses are incredibly natural and save us hours every week.",
  //     author: "Sarah Martinez",
  //     role: "Owner",
  //     company: "Bella Vista Restaurant",
  //     avatar: "SM"
  //   },
  //   {
  //     quote: "The SMS campaigns feature helped us increase repeat customers by 35% in just two months. This platform pays for itself.",
  //     author: "Dr. James Chen",
  //     role: "Practice Manager",
  //     company: "Wellness Medical Center",
  //     avatar: "JC"
  //   },
  //   {
  //     quote: "Finally, a reputation management tool built for real businesses. The competitor tracking gives us insights we never had before.",
  //     author: "Michael Rodriguez",
  //     role: "Director of Operations",
  //     company: "Premium Auto Group",
  //     avatar: "MR"
  //   },
  //   {
  //     quote: "FoundHex understands local businesses. Their customer support is incredible and the platform just works flawlessly.",
  //     author: "Emily Thompson",
  //     role: "Marketing Director",
  //     company: "Elite Home Services",
  //     avatar: "ET"
  //   }
  // ];

  // Roadmap data - Currently unused but kept for future use
  // const roadmapItems: RoadmapItem[] = [
  //   {
  //     quarter: "Q4",
  //     year: "2024",
  //     title: "Repaxio Launch",
  //     description: "Launched our flagship AI-powered reputation management platform with review monitoring, AI responses, and SMS campaigns.",
  //     status: "completed"
  //   },
  //   {
  //     quarter: "Q1",
  //     year: "2025",
  //     title: "Advanced Analytics",
  //     description: "Currently rolling out comprehensive analytics dashboard with sentiment analysis and competitive benchmarking.",
  //     status: "in-progress"
  //   },
  //   {
  //     quarter: "Q2",
  //     year: "2025",
  //     title: "Multi-Location Support",
  //     description: "Enterprise features for businesses with multiple locations, including centralized management and location-specific insights.",
  //     status: "in-progress"
  //   },
  //   {
  //     quarter: "Q3",
  //     year: "2025",
  //     title: "Platform Expansion",
  //     description: "New products focused on operations and customer experience, seamlessly integrated with Repaxio.",
  //     status: "planned"
  //   },
  //   {
  //     quarter: "Q4",
  //     year: "2025",
  //     title: "AI-Powered Insights",
  //     description: "Predictive analytics and recommendations to help businesses proactively improve customer satisfaction.",
  //     status: "planned"
  //   }
  // ];

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
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Enhanced Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-morphism shadow-lg py-3 border-b border-white/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FullLogo />
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
            <MagneticButton
              href="https://repaxio.com"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Try Repaxio</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="button-bg"
              />
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

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
              href="#product"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group"
            >
              <span className="relative z-10">Discover Repaxio</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </MagneticButton>
            <MagneticButton
              href="#approach"
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
        {/* Enhanced Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/50 to-indigo-50 dark:from-slate-900 dark:via-purple-950/20 dark:to-indigo-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent dark:from-purple-900/20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Meet <span className="text-gradient">Repaxio</span>
              </motion.h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Our flagship AI-powered reputation management platform that helps local businesses
                monitor, respond to, and grow their online presence.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="glass-morphism rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <motion.svg
                      className="w-24 h-24 text-white opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </motion.svg>
                    {/* Animated lines */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-px bg-white/30"
                        initial={{ width: 0, left: '50%' }}
                        animate={{
                          width: ['0%', '80%', '0%'],
                          left: ['50%', '10%', '50%'],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.5,
                          repeat: Infinity,
                        }}
                        style={{ top: `${30 + i * 20}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="space-y-6">
                <ScrollReveal delay={0.2}>
                  <h3 className="text-3xl font-bold">Transform Your Online Reputation</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    Repaxio monitors reviews across all platforms, generates AI-powered responses,
                    and helps you engage customers through intelligent SMS campaigns—all in one place.
                  </p>
                </ScrollReveal>

                <div className="space-y-4">
                  {[
                    { title: 'Real-time Review Monitoring', desc: 'Never miss a review with instant notifications from all major platforms' },
                    { title: 'AI-Generated Responses', desc: 'Thoughtful, personalized responses crafted by advanced AI' },
                    { title: 'Intelligent SMS Campaigns', desc: 'Automated customer engagement that drives repeat business' }
                  ].map((feature, index) => (
                    <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                      <motion.div
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <motion.div
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-lg">{feature.title}</h4>
                          <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>

                <ScrollReveal delay={0.6}>
                  <MagneticButton
                    href="https://repaxio.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    Visit Repaxio
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </MagneticButton>
                </ScrollReveal>
              </div>
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

      {/* Testimonials Section - Hidden until real testimonials are available */}
      {/* <section id="testimonials" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/10 dark:to-indigo-950/10" />

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Business Owners</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                See what our customers have to say about transforming their businesses with FoundHex.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-morphism rounded-3xl p-12 shadow-2xl">
              <TestimonialsCarousel testimonials={testimonials} />
            </div>
          </ScrollReveal>
        </div>
      </section> */}

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

      {/* Interactive Roadmap Section - Removed per user request */}
      {/* <section id="roadmap" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-950/20" />

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Product Roadmap</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Follow our journey as we build the future of local business software. Here's what we've accomplished and what's coming next.
              </p>
            </div>
          </ScrollReveal>

          <RoadmapTimeline items={roadmapItems} />
        </div>
      </section> */}

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
                x: Math.random() * window.innerWidth,
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

          <ScrollReveal className="mt-16" delay={0.3}>
            <motion.div
              className="glass-morphism rounded-2xl p-12 text-center relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full mb-6 relative z-10"
                whileHover={{ scale: 1.05 }}
              >
                <motion.svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </motion.svg>
                <span className="font-semibold text-purple-600 dark:text-purple-400">Innovation Roadmap</span>
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">What's Next</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto relative z-10">
                We're constantly innovating and expanding our platform. Stay tuned for new products
                and features designed to solve the toughest challenges facing local businesses today.
              </p>
            </motion.div>
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
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us on This Journey</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
                  Be the first to know about new products, features, and opportunities to transform your business.
                </p>

                <form className="max-w-md mx-auto mb-8">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-4 rounded-xl glass-morphism focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap relative overflow-hidden group"
                    >
                      <span className="relative z-10">Get Updates</span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  </div>
                </form>

                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Interested in partnerships?{' '}
                  <motion.a
                    href="mailto:partnerships@foundhex.com"
                    className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    Get in touch
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-slate-300 py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <BackgroundHexagons />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <FullLogo className="h-8" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Building intelligent infrastructure for local businesses.
              </p>
            </motion.div>

            {[
              {
                title: 'Product',
                links: [
                  { label: 'Repaxio', href: 'https://repaxio.com' },
                  { label: 'Features', href: '#product' },
                  { label: 'Technology', href: '#technology' },
                  { label: 'Pricing', href: '#' }
                ]
              },
              {
                title: 'Company',
                links: [
                  { label: 'About', href: '#approach' },
                  { label: 'Blog', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Contact', href: 'mailto:contact@foundhex.com' }
                ]
              },
              {
                title: 'Legal',
                links: [
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Security', href: '#' },
                  { label: 'Compliance', href: '#' }
                ]
              }
            ].map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (sectionIndex + 1) * 0.1 }}
              >
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              className="text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2025 FoundHex Inc. All rights reserved.
            </motion.div>

            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {[
                { label: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
                { label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { label: 'GitHub', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
