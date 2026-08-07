import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, ShieldCheck, Sparkles, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const FreeTrial = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    country: '',
    subject: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const benefits = [
    '3 Days of Full Access',
    'Live Interactive Sessions',
    'Expert Teacher Feedback',
    'No Credit Card Required',
    'Personalized Study Plan',
    'Secure Google Meet Link',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post('/api/trial', formData);
      if (response.data.success) {
        setStatus('success');
        setFormData({ studentName: '', parentName: '', email: '', country: '', subject: '' });
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="free-trial" className="py-24 bg-brand-blue dark:bg-slate-900 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 rounded-full -ml-48 -mb-48 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Experience the Difference with Our <br />
              <span className="text-brand-green">3-Day Free Trial</span>
            </h2>
            
            <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
              We are so confident in our teaching quality that we offer a completely free, 
              no-obligation 3-day trial. Let your child experience live interactive learning 
              with Pakistan's top educators.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center space-x-3 text-white">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-3 text-white/80 pt-4">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-bold">Registration takes only 30 seconds!</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 border border-white/20">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">We'll contact you shortly to schedule your trial.</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary py-2 px-6">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Quick Trial Request</h3>
                    <ShieldCheck className="w-6 h-6 text-brand-blue dark:text-brand-green" />
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Error sending request. Please try again.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Student Name"
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-brand-blue dark:text-white"
                    />
                    <input
                      required
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Parent Name"
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-brand-blue dark:text-white"
                    />
                  </div>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-brand-blue dark:text-white"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-brand-blue dark:text-white"
                    />
                  <select
  required
  name="subject"
  value={formData.subject}
  onChange={handleChange}
  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-brand-blue dark:text-white"
>
  <option value="">Select Course</option>

  <option value="Quran Reading (Nazra)">
    Quran Reading (Nazra)
  </option>

  <option value="Tajweed">
    Tajweed
  </option>

  <option value="Islamic Studies">
    Islamic Studies
  </option>

  <option value="Arabic Language">
    Arabic Language
  </option>

  <option value="Mathematics">
    Mathematics
  </option>

  <option value="Science">
    Science
  </option>
</select>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full btn-primary py-3 flex items-center justify-center space-x-2 disabled:opacity-70"
                  >
                    {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    <span>Claim Free Trial Now</span>
                  </button>
                </form>
              )}
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl -z-0" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-blue/20 rounded-full blur-2xl -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FreeTrial;
