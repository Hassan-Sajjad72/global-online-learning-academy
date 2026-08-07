import React from "react";
import { motion } from "motion/react";
import {
  Star,
  Award,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";



const Teachers = () => {
  const teachers = [
    {
      name: "Kousar Mushtaq",
      title: "Quran Instructor",
      subject: "Quran Reading (Nazra), Tajweed & Ahadees",
      experience: "Certified Hafiza-e-Quran",
      rating: "5.0",
      image:  " /teachers/kousar.png",
        
      bio: "An experienced Hafiza-e-Quran dedicated to helping students of all ages develop fluent Quran recitation, proper Tajweed, and a deeper understanding of Ahadees through engaging one-to-one online lessons.",
    },
    {
      name: "Sania Tehseen",
      title: "Quran Instructor",
      subject: "Quran Reading (Nazra) & Tajweed",
      experience: "Certified Hafiza-e-Quran",
      rating: "5.0",
      image:
        " /teachers/sania.png",
      bio: "Have a Master's Degree in Islamiyat and passionate Hafiza-e-Quran committed to teaching Quran Reading and Tajweed with patience, encouragement, and personalized attention for every learner.",
    },
    {
      name: "Abdul Rehman",
      title: "Quran Instructor",
      subject: "Quran Reading (Nazra), Tajweed & Ahadees",
      experience: "Certified Hafiz-e-Quran",
      rating: "5.0",
      image: " /teachers/wasy.png",
      bio: "Dedicated Hafiz-e-Quran with experience in teaching Nazra, Tajweed, and Ahadees through structured online sessions that build confidence and strong Islamic values.",
    },
    {
      name: "Yaseen Mushtaq",
      title: "Lecturer, Air University",
      subject: "Computer Science",
      experience: "University Lecturer",
      rating: "5.0",
      image:
        " /teachers/yaseen.png",
      bio: "Computer Science lecturer with experience in programming, software engineering, web technologies, and modern computing, making complex concepts simple for students.",
    },
    {
      name: "Sibgha Mushtaq",
      title: "Microbiologist",
      subject: "Biology & Science",
      experience: "Science Educator",
      rating: "5.0",
      image:
        " /teachers/doctor.png",
      bio: "A microbiologist passionate about inspiring students to understand Biology and Science through interactive learning and real-world applications.",
    },
  ];

  return (
    <section
      id="teachers"
      className="py-24 bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-green text-sm font-bold uppercase tracking-wider mb-4"
          >
            Meet Our Qualified Teachers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            Learn from Experienced{" "}
            <span className="text-brand-blue dark:text-brand-green">
              Quran & Academic Educators
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400"
          >
            Our experienced teachers are committed to providing high-quality
            online education with a strong focus on Quranic learning,
            personalized attention, and academic excellence.
          </motion.p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {teachers.map((teacher, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              <div className="relative h-72 overflow-hidden">

                <img
                  src={teacher.image}
                  alt={teacher.name}
                 className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 rounded-lg px-3 py-1 shadow-lg flex items-center space-x-1">

                  <Star className="w-4 h-4 text-yellow-400 fill-current" />

                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {teacher.rating}
                  </span>

                </div>

              </div>

              <div className="p-6">

                <div className="text-xs uppercase tracking-widest font-bold text-brand-blue dark:text-brand-green mb-2">
                  {teacher.subject}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {teacher.name}
                </h3>

                <p className="text-sm font-semibold text-brand-green mt-1">
                  {teacher.title}
                </p>

                <div className="flex items-center space-x-2 mt-4 mb-4 text-slate-500 dark:text-slate-400 text-sm">

                  <Award className="w-4 h-4 text-brand-green" />

                  <span>{teacher.experience}</span>

                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {teacher.bio}
                </p>

                <Link
                  to="/enroll"
                  className="inline-flex items-center space-x-2 text-brand-blue dark:text-brand-green font-bold hover:underline"
                >
                  <span>Book a Free Trial</span>

                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

            </motion.div>

          ))}
        </div>
                <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <div className="rounded-3xl bg-gradient-to-r from-brand-blue to-brand-green p-10 md:p-12 text-center shadow-2xl">

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">

              <GraduationCap className="w-10 h-10 text-white" />

            </div>

            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Start Learning with Our Expert Teachers
            </h3>

            <p className="max-w-3xl mx-auto text-white/90 text-lg leading-relaxed mb-8">
              Whether your child wants to learn Quran Reading (Nazra),
              Tajweed, Islamic Studies or improve academic performance,
              our experienced teachers provide one-to-one online classes
              designed to build confidence and lasting knowledge.
            </p>

            <Link
              to="/enroll"
              className="inline-flex items-center space-x-3 bg-white text-brand-blue font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
              <span>Book Your Free Trial Today</span>

              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Teachers;