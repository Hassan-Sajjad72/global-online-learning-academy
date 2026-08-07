import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle, Users, Star, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-brand-light dark:bg-slate-900/50" />
      <div className="absolute top-0 right-0 w-1/2 h-full -z-10 bg-gradient-to-l from-brand-blue/5 to-transparent dark:from-brand-blue/10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-green font-medium text-sm">
              <Award className="w-4 h-4" />
              <span>#1 Choice for Overseas Pakistani Families</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white leading-[1.1]">
              Online Learning for <br />
              <span className="text-brand-blue dark:text-brand-green">Overseas Pakistani</span> Students
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Empower your children with high-quality education from expert Pakistani teachers. 
              Flexible schedules, live interactive sessions via Google Meet, and a curriculum 
              tailored for success.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/enroll" className="btn-primary w-full sm:w-auto text-center">
                Enroll Now
              </Link>
              <Link to="/enroll" className="btn-secondary w-full sm:w-auto text-center flex items-center justify-center space-x-2">
                <Play className="w-4 h-4 fill-current" />
                <span>Start Free Trial</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-brand-blue dark:text-brand-green">5,000+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Students</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-brand-blue dark:text-brand-green">200+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Teachers</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-brand-blue dark:text-brand-green">98%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Success Rate</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Content - Image/Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800"
                alt="Student learning online"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-blue/10 flex items-center justify-center">
                <button className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group">
                  <Play className="w-8 h-8 text-brand-blue dark:text-brand-green fill-current group-hover:text-brand-green transition-colors" />
                </button>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl z-20 flex items-center space-x-3"
            >
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold dark:text-white">Live Classes</div>
                <div className="text-xs text-slate-500">via Google Meet</div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl z-20 flex items-center space-x-3"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800"
                    alt="User"
                  />
                ))}
              </div>
              <div>
                <div className="text-sm font-bold dark:text-white">Join 5k+ Parents</div>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
