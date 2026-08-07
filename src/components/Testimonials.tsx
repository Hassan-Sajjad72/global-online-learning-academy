import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Globe,
  ShieldCheck,
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Qualified Teachers',
    description:
      'Learn from certified Huffaz, experienced lecturers, and subject specialists dedicated to providing high-quality education.',
    color: 'text-brand-blue',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: BookOpen,
    title: 'Personalized Learning',
    description:
      'Every student receives one-to-one attention with lessons tailored to their pace, level, and learning goals.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    icon: Globe,
    title: 'Worldwide Online Classes',
    description:
      'We proudly teach students from around the world with flexible schedules designed for different time zones.',
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Secure Learning',
    description:
      'Classes are conducted through secure online platforms, ensuring a comfortable and safe learning environment.',
    color: 'text-amber-600',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description:
      'Choose class timings that fit your family routine, whether you live in the UK, USA, Canada, Australia, or the Middle East.',
    color: 'text-rose-600',
    bg: 'bg-rose-100 dark:bg-rose-900/30',
  },
  {
    icon: Users,
    title: '3-Day Free Trial',
    description:
      'Experience our teaching methodology before making any commitment with our completely free trial classes.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  {
    icon: Sparkles,
    title: 'Quran & Academic Excellence',
    description:
      'Alongside Quran Reading, Tajweed, Hifz Support, and Islamic Studies, we also offer selected academic subjects.',
    color: 'text-teal-600',
    bg: 'bg-teal-100 dark:bg-teal-900/30',
  },
  {
    icon: CheckCircle,
    title: 'Progress Focused',
    description:
      'Our goal is to help every student build confidence, strengthen knowledge, and achieve continuous improvement.',
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
];

const Testimonials = () => {
  return (
    <section
      id="why-us"
      className="py-24 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto mb-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-green text-sm font-bold uppercase tracking-wider mb-4"
          >
            Why Choose Us
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            Why Families Around the World Choose{" "}
            <span className="text-brand-blue dark:text-brand-green">
              Global Online Learning Academy
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400"
          >
            We are committed to providing high-quality Quran and academic
            education through experienced teachers, personalized learning,
            flexible schedules, and a supportive online environment.
          </motion.p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >

              <div
                className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;