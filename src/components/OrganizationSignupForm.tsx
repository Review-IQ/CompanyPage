import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5110/api';

interface SignupFormData {
  organizationName: string;
  industry: string;
  contactEmail: string;
  contactName: string;
  phoneNumber: string;
  subscriptionPlan: 'Free' | 'Pro' | 'Enterprise';
  website?: string;
  description?: string;
  firstLocationName?: string;
  firstLocationAddress?: string;
  firstLocationCity?: string;
  firstLocationState?: string;
  firstLocationZipCode?: string;
}

export function OrganizationSignupForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SignupFormData>({
    organizationName: '',
    industry: '',
    contactEmail: '',
    contactName: '',
    phoneNumber: '',
    subscriptionPlan: 'Free',
    website: '',
    description: '',
    firstLocationName: '',
    firstLocationAddress: '',
    firstLocationCity: '',
    firstLocationState: '',
    firstLocationZipCode: '',
  });

  const industries = [
    'Restaurant / Food Service',
    'Medical / Healthcare',
    'Dental',
    'Automotive',
    'Real Estate',
    'Retail',
    'Beauty / Salon',
    'Professional Services',
    'Home Services',
    'Other',
  ];

  const subscriptionPlans = [
    {
      name: 'Free' as const,
      price: '$0',
      features: ['1 Location', '1 User', '10 SMS/month', 'Basic Analytics'],
    },
    {
      name: 'Pro' as const,
      price: '$99',
      features: ['5 Locations', '10 Users', '500 SMS/month', 'Advanced Analytics', 'Priority Support'],
    },
    {
      name: 'Enterprise' as const,
      price: 'Custom',
      features: ['Unlimited Locations', 'Unlimited Users', 'Unlimited SMS', 'Custom Integrations', 'Dedicated Support'],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/signup/organization`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organizationName: formData.organizationName,
          industry: formData.industry,
          description: formData.description,
          website: formData.website,
          phoneNumber: formData.phoneNumber,
          contactEmail: formData.contactEmail,
          contactName: formData.contactName,
          subscriptionPlan: formData.subscriptionPlan,
          firstLocationName: formData.firstLocationName,
          firstLocationAddress: formData.firstLocationAddress,
          firstLocationCity: formData.firstLocationCity,
          firstLocationState: formData.firstLocationState,
          firstLocationZipCode: formData.firstLocationZipCode,
          firstLocationCountry: 'USA',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create organization');
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate step 1
      if (!formData.organizationName || !formData.industry || !formData.contactEmail || !formData.contactName) {
        setError('Please fill in all required fields');
        return;
      }
    }
    setStep(step + 1);
    setError(null);
  };

  const prevStep = () => {
    setStep(step - 1);
    setError(null);
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
        <h2 className="text-4xl font-bold mb-4">Welcome to RepX!</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Your organization has been created successfully.
        </p>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
            Check your email
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            We've sent an invitation to <strong>{formData.contactEmail}</strong>
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Click the link in the email to set your password and access your account.
          </p>
        </div>
        <motion.a
          href="https://repx.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Return to RepX
        </motion.a>
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
        <h2 className="text-4xl font-bold mb-2 text-center">
          Get Started with <span className="text-gradient">RepX</span>
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400">
          Create your organization and start managing your reputation in minutes
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <motion.div
              animate={{
                scale: step === s ? 1.1 : 1,
                backgroundColor: step >= s ? '#7c3aed' : '#e2e8f0',
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            >
              {s}
            </motion.div>
            {s < 3 && (
              <div
                className={`w-16 h-1 mx-2 transition-colors ${
                  step > s ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* Step 1: Organization Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold mb-2">Organization Name *</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="Acme Restaurant Group"
                />
              </div>

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
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Contact Name *</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
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
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="john@acme.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="https://acme.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="Tell us about your organization..."
                />
              </div>

              <div className="flex justify-end">
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Next Step
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: First Location (Optional) */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We'll create your first location automatically. You can customize it later or add it now (optional).
              </p>

              <div>
                <label className="block text-sm font-semibold mb-2">Location Name</label>
                <input
                  type="text"
                  name="firstLocationName"
                  value={formData.firstLocationName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="Leave blank to use default name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Address</label>
                <input
                  type="text"
                  name="firstLocationAddress"
                  value={formData.firstLocationAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold mb-2">City</label>
                  <input
                    type="text"
                    name="firstLocationCity"
                    value={formData.firstLocationCity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">State</label>
                  <input
                    type="text"
                    name="firstLocationState"
                    value={formData.firstLocationState}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="firstLocationZipCode"
                    value={formData.firstLocationZipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg glass-morphism border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="10001"
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 glass-morphism rounded-lg font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Next Step
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Subscription Plan */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                Choose the plan that's right for your business
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <motion.div
                    key={plan.name}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => setFormData((prev) => ({ ...prev, subscriptionPlan: plan.name }))}
                    className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${
                      formData.subscriptionPlan === plan.name
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                        : 'border-slate-300 dark:border-slate-600 glass-morphism hover:border-purple-400'
                    }`}
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-gradient">{plan.price}</div>
                      {plan.name !== 'Free' && <div className="text-sm text-slate-600 dark:text-slate-400">/month</div>}
                    </div>

                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {formData.subscriptionPlan === plan.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4 w-8 h-8 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between gap-4 pt-6">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 glass-morphism rounded-lg font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Creating...
                    </>
                  ) : (
                    'Create Organization'
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
