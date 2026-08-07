import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, CalendarCheck, Video, Rocket, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register Online',
      desc: 'Fill out our simple enrollment form with your child\'s details and subject preferences.',
      color: 'bg-blue-500',
    },
    {
      icon: CalendarCheck,
      title: 'Book Free Trial',
      desc: 'Schedule your 3-day free trial at a time that works for your family\'s timezone.',
      color: 'bg-emerald-500',
    },
    {
      icon: Video,
      title: 'Get Meeting Link',
      desc: 'Receive your secure Google Meet link via email and WhatsApp from our support team.',
      color: 'bg-indigo-500',
    },
    {
      icon: Rocket,
      title: 'Start Learning',
      desc: 'Join the live interactive session and begin your child\'s journey to academic success.',
      color: 'bg-amber-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-green text-sm font-bold uppercase tracking-wider mb-4"
          >
            Our Simple Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            How to Get Started in <span className="text-brand-blue dark:text-brand-green">4 Easy Steps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400"
          >
            We've streamlined our onboarding process to make it as easy as possible for busy overseas parents.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-8 inline-block">
                  <div className={`w-20 h-20 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-brand-blue flex items-center justify-center text-sm font-bold text-brand-blue dark:text-brand-green">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                  {step.desc}
                </p>
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8 flex justify-center">
                    <ArrowRight className="w-6 h-6 text-slate-300 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
