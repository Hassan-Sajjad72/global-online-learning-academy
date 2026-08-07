import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    country: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await axios.post('/api/enroll', formData);
      if (response.data.success) {
        setStatus('success');
        setFormData({
          studentName: '',
          parentName: '',
          email: '',
          country: '',
          subject: '',
          message: '',
        });
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-2xl text-center space-y-6 border border-brand-green/20"
      >
        <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-brand-green" />
        </div>
        <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Enrollment Successful!</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Thank you for choosing Global Online Learning Academy. Our team will contact you within 24 hours 
          via email and WhatsApp to schedule your 3-day free trial.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-primary"
        >
          Enroll Another Student
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Start Your Journey</h2>
        <p className="text-slate-600 dark:text-slate-400">Fill out the form below to book your 3-day free trial.</p>
      </div>

      {status === 'error' && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center space-x-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="studentName" className="text-sm font-bold text-slate-700 dark:text-slate-300">Student Name</label>
            <input
              required
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="parentName" className="text-sm font-bold text-slate-700 dark:text-slate-300">Parent Name</label>
            <input
              required
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-bold text-slate-700 dark:text-slate-300">Country of Residence</label>
            <input
              required
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. United Kingdom"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white"
            />
          </div>
        </div>

<div className="space-y-2">
  <label
    htmlFor="subject"
    className="text-sm font-bold text-slate-700 dark:text-slate-300"
  >
    Select Subject
  </label>

  <select
    required
    id="subject"
    name="subject"
    value={formData.subject}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white"
  >
    <option value="">Choose a subject...</option>

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

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Additional Message (Optional)</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Any specific requirements or questions?"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary py-4 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Enrollment</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
          <AlertCircle className="w-4 h-4" />
          <span>Your data is secure and will only be used for enrollment purposes.</span>
        </div>
      </form>
    </motion.div>
  );
};

export default EnrollmentForm;
