import React from 'react';
import EnrollmentForm from '../components/EnrollmentForm';
import { motion } from 'motion/react';
import { CheckCircle, ShieldCheck, Clock } from 'lucide-react';

const Enrollment = () => {
  return (
    <div className="pt-32 pb-24 bg-brand-light dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                Enroll Your Child in <br />
                <span className="text-brand-blue dark:text-brand-green">Global Excellence</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Join our community of overseas Pakistani families. Our enrollment process is simple, 
                secure, and designed to get your child started with their 3-day free trial as 
                quickly as possible.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6 text-brand-blue dark:text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">3-Day Free Trial</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Experience our teaching style with no upfront commitment.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Secure Learning</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">All sessions are conducted via secure Google Meet links.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Flexible Scheduling</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">We work around your child's school schedule and timezone.</p>
                </div>
              </div>
            </div>

         
          </motion.div>

          {/* Right Side: Form */}
          <EnrollmentForm />
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
