import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { OrganizationSignupForm } from '../components/OrganizationSignupForm';

// Reusable ScrollReveal component
const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  highlight?: string;
}

export function RepaxioPage() {
  const [activeTab, setActiveTab] = useState<'signup' | 'demo'>('signup');
  const ctaSectionRef = useRef<HTMLElement>(null);

  const scrollToCTA = (tab: 'signup' | 'demo') => {
    setActiveTab(tab);
    ctaSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const features: Feature[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: 'Real-Time Review Monitoring',
      description: 'Get instant notifications when new reviews are posted across Google, Yelp, Facebook, and more.',
      highlight: 'Never miss a review'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Powered Response Generation',
      description: 'Let our advanced AI craft thoughtful, personalized responses that match your brand voice.',
      highlight: 'Save hours every week'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: 'Smart SMS Campaigns',
      description: 'Engage customers with automated, targeted SMS campaigns that drive repeat business and positive reviews.',
      highlight: 'Increase repeat customers by 35%'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Advanced Analytics & Insights',
      description: 'Track sentiment trends, platform performance, response times, and customer satisfaction over time.',
      highlight: 'Data-driven decisions'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Competitor Tracking',
      description: 'Monitor competitor reviews and ratings to benchmark your performance and identify opportunities.',
      highlight: 'Stay ahead of competition'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Multi-Location Management',
      description: 'Manage multiple locations from a single dashboard with location-specific insights and team access controls.',
      highlight: 'Enterprise-ready'
    },
  ];

  const platforms = [
    { name: 'Google Business', color: 'text-blue-500' },
    { name: 'Yelp', color: 'text-red-500' },
    { name: 'Facebook', color: 'text-blue-600' },
    { name: 'TripAdvisor', color: 'text-green-600' },
    { name: 'And More', color: 'text-purple-600' },
  ];

  const benefits = [
    {
      stat: '98%',
      label: 'Response Rate',
      description: 'Industry-leading engagement'
    },
    {
      stat: '45min',
      label: 'Avg. Response Time',
      description: 'Lightning-fast replies'
    },
    {
      stat: '10K+',
      label: 'Reviews Managed',
      description: 'Trusted by businesses'
    },
    {
      stat: '35%',
      label: 'More Repeat Customers',
      description: 'Proven results'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background */}
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
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your Online{' '}
              <span className="text-gradient bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Reputation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              AI-powered reputation management that helps local businesses monitor, respond to,
              and grow their online presence—all in one intelligent platform.
            </p>

            {/* Platform Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="px-4 py-2 glass-morphism rounded-full text-sm font-semibold"
                >
                  <span className={platform.color}>{platform.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Hero CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                onClick={() => scrollToCTA('signup')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="button-hover"
                />
              </motion.button>

              <motion.button
                onClick={() => scrollToCTA('demo')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-morphism hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold text-lg transition-all border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Book a Demo
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 text-sm text-slate-500 dark:text-slate-400"
            >
              ✓ No credit card required  ✓ 14-day free trial  ✓ Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-morphism rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {benefit.stat}
                  </div>
                  <div className="font-semibold mb-1">{benefit.label}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{benefit.description}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Powerful features designed specifically for local businesses like yours
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="glass-morphism rounded-2xl p-8 h-full hover:shadow-2xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg relative z-10"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 relative z-10">
                    {feature.description}
                  </p>
                  {feature.highlight && (
                    <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full text-sm font-semibold text-purple-600 dark:text-purple-400 relative z-10">
                      {feature.highlight}
                    </div>
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/10 dark:to-indigo-950/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">How Repaxio Works</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Get started in minutes, see results immediately
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {[
              {
                step: '1',
                title: 'Connect Your Platforms',
                description: 'Link your Google Business, Yelp, Facebook, and other review platforms in just a few clicks.',
              },
              {
                step: '2',
                title: 'AI Learns Your Brand',
                description: 'Our intelligent system analyzes your business and creates responses that match your unique voice and style.',
              },
              {
                step: '3',
                title: 'Monitor & Engage',
                description: 'Get real-time notifications, AI-suggested responses, and powerful analytics—all from one dashboard.',
              },
              {
                step: '4',
                title: 'Grow Your Business',
                description: 'Watch your ratings improve, response time decrease, and customer satisfaction soar.',
              },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-6 glass-morphism rounded-2xl p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Signup or Demo */}
      <section ref={ctaSectionRef} className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                Choose your path to success
              </p>

              {/* Tab Switcher */}
              <div className="inline-flex items-center gap-2 p-2 glass-morphism rounded-xl mb-12">
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'signup'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Sign Up Now
                </button>
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'demo'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'signup' ? (
              <OrganizationSignupForm />
            ) : (
              <DemoBookingForm />
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Demo Booking Form Component
function DemoBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    locations: '1',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitSuccess(true);
    setIsSubmitting(false);
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-morphism rounded-3xl p-12 max-w-2xl mx-auto text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
        >
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-4xl font-bold mb-4">Demo Scheduled!</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Thank you for your interest in Repaxio.
        </p>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <p className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
            We'll be in touch soon
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Our team will contact you at <strong>{formData.email}</strong> to confirm your demo time.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl"
    >
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-2 text-center">Schedule Your Personal Demo</h3>
        <p className="text-center text-slate-600 dark:text-slate-400">
          See Repaxio in action with a personalized walkthrough
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Company Name *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="Your Business"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Industry *</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            >
              <option value="">Select an industry...</option>
              <option value="restaurant">Restaurant / Food Service</option>
              <option value="medical">Medical / Healthcare</option>
              <option value="dental">Dental</option>
              <option value="automotive">Automotive</option>
              <option value="real-estate">Real Estate</option>
              <option value="retail">Retail</option>
              <option value="beauty">Beauty / Salon</option>
              <option value="professional">Professional Services</option>
              <option value="home-services">Home Services</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Number of Locations</label>
            <select
              name="locations"
              value={formData.locations}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            >
              <option value="1">1 Location</option>
              <option value="2-5">2-5 Locations</option>
              <option value="6-10">6-10 Locations</option>
              <option value="11+">11+ Locations</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Preferred Date</label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Preferred Time</label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            >
              <option value="">Select a time...</option>
              <option value="9am">9:00 AM</option>
              <option value="10am">10:00 AM</option>
              <option value="11am">11:00 AM</option>
              <option value="12pm">12:00 PM</option>
              <option value="1pm">1:00 PM</option>
              <option value="2pm">2:00 PM</option>
              <option value="3pm">3:00 PM</option>
              <option value="4pm">4:00 PM</option>
              <option value="5pm">5:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Additional Notes</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            placeholder="Tell us what you'd like to learn about..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Scheduling...
            </>
          ) : (
            'Schedule Demo'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
