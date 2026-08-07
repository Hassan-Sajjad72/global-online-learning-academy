import React from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  BookOpen,
  FlaskConical,
  Languages,
  History,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const subjects = [
    {
      title: 'Quran Reading (Nazra)',
      icon: BookOpen,
      levels: 'All Ages',
      desc: 'Learn to read the Holy Quran with proper pronunciation under the guidance of experienced online tutors.',
      color:
        'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    {
      title: 'Tajweed',
      icon: Globe,
      levels: 'All Levels',
      desc: 'Master the rules of Tajweed and improve your Quran recitation with one-to-one personalized learning.',
      color:
        'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      title: 'Islamic Studies',
      icon: History,
      levels: 'Children & Adults',
      desc: 'Learn Islamic beliefs, Seerah, Hadith, daily supplications, and essential Islamic values.',
      color:
        'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    },
    {
  title: 'Arabic Language',
  icon: Languages,
  levels: 'Beginners to Intermediate',
  desc: 'Learn to read, write, and understand Arabic with structured lessons designed for children and adults.',
  color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
},
    {
      title: 'Mathematics',
      icon: Calculator,
      levels: 'Primary to Secondary',
      desc: 'Build confidence in arithmetic, algebra, geometry, and problem-solving with expert tutors.',
      color:
        'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    },
    {
      title: 'Science',
      icon: FlaskConical,
      levels: 'Primary to Secondary',
      desc: 'Understand scientific concepts through interactive online classes and practical explanations.',
      color:
        'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    },
  ];

  return (
    <section
      id="courses"
      className="py-24 bg-brand-light/30 dark:bg-slate-900/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-green text-sm font-bold uppercase tracking-wider mb-4"
            >
              Our Courses
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white"
            >
              Quran & Academic Courses
              <br />
              <span className="text-brand-blue dark:text-brand-green">
                For Every Learner
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/enroll"
              className="btn-outline flex items-center space-x-2 group"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl ${subject.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <subject.icon className="w-7 h-7" />
              </div>

              <div className="text-xs font-bold text-brand-blue dark:text-brand-green uppercase tracking-widest mb-2">
                {subject.levels}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-blue dark:group-hover:text-brand-green transition-colors">
                {subject.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {subject.desc}
              </p>

              <Link
                to="/enroll"
                className="flex items-center space-x-2 text-sm font-bold text-brand-blue dark:text-brand-green hover:underline"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;