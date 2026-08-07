import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'How are the classes conducted?',
      answer: 'All classes are conducted live via Google Meet. Once you enroll, our support team will send you a secure meeting link via email and WhatsApp before each session.',
    },
    {
      question: 'What is the duration of each class?',
      answer: 'Standard classes are 45 to 60 minutes long, depending on the subject and level. We also offer intensive sessions for exam preparation.',
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a completely free, no-obligation 3-day trial so your child can experience our teaching style and platform before you commit.',
    },
    {
      question: 'Are the teachers qualified?',
      answer: 'Absolutely. All our teachers are subject matter experts with years of experience in teaching both local and international curricula.',
    },
    {
      question: 'How do you handle different timezones?',
      answer: 'We have a flexible scheduling system. Our teachers are available across various shifts to accommodate students from the UK, USA, Middle East, and other regions.',
    },
    {
      question: 'What subjects do you offer?',
      answer: 'We offer a wide range of subjects including Mathematics, Science, Urdu, Islamic Studies, and more for all academic levels.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-green text-sm font-bold uppercase tracking-wider mb-4"
          >
            Got Questions?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            Frequently Asked <span className="text-brand-blue dark:text-brand-green">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400"
          >
            Find answers to common queries about our platform, teachers, and enrollment process.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/50"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <HelpCircle className="w-5 h-5 text-brand-blue dark:text-brand-green shrink-0" />
                  <span className="font-bold text-slate-900 dark:text-white">{faq.question}</span>
                </div>
                {activeIndex === index ? (
                  <Minus className="w-5 h-5 text-brand-blue dark:text-brand-green" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
