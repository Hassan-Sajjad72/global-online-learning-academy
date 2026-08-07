import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2 , GraduationCap } from 'lucide-react';
import axios from "axios";

const Contact = () => {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = React.useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});
  const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  setStatus("loading");

  try {

    await axios.post("/api/contact", formData);

    setStatus("success");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (error) {

    console.error(error);

    alert("Unable to send message.");

    setStatus("idle");

  }

};

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-green text-sm font-bold uppercase tracking-wider mb-4"
          >
            Get In Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            We're Here to <span className="text-brand-blue dark:text-brand-green">Support Your Child</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400"
          >
            Have questions about our courses, teachers, or enrollment? Our global support team is available 24/7.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
      <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
>
  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
    <MessageCircle className="w-6 h-6 text-emerald-600" />
  </div>

  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
    WhatsApp Support
  </h3>

  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
    Chat with our team for quick assistance regarding admissions and courses.
  </p>

  <a
    href="https://wa.me/92YOURNUMBER"
    target="_blank"
    rel="noopener noreferrer"
    className="text-emerald-600 font-bold hover:underline"
  >
    +92 318 5040028
  </a>
</motion.div>

           <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.1 }}
  className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
>
  <div className="w-12 h-12 bg-brand-blue/10 dark:bg-brand-green/10 rounded-xl flex items-center justify-center mb-6">
    <GraduationCap className="w-6 h-6 text-brand-blue dark:text-brand-green" />
  </div>

  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
    Worldwide Online Learning
  </h3>

  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
    Our live online classes are designed for students across the globe. We proudly teach learners from Pakistan, the United Kingdom, the United States, Canada, the UAE, Australia, Saudi Arabia, and many other countries.
  </p>
</motion.div>

     <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
  className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
>
  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
    <Mail className="w-6 h-6 text-amber-600" />
  </div>

  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
    Quick Response
  </h3>

  <p className="text-sm text-slate-500 dark:text-slate-400">
    Complete the contact form and our team will usually respond to your inquiry
    within <strong>24 hours</strong>.
  </p>
</motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700"
          >
            {status === 'success' ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto">
                  <Send className="w-10 h-10 text-brand-green" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="btn-primary">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
                   <input
required
type="text"
value={formData.name}
onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
}
placeholder="Your Name"
className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white"
/>  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
                    <input
required
type="email"
value={formData.email}
onChange={(e) =>
    setFormData({ ...formData, email: e.target.value })
}
placeholder="Your Email"
className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white"
/>  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                 <input
required
type="text"
value={formData.subject}
onChange={(e) =>
    setFormData({ ...formData, subject: e.target.value })
}
placeholder="How can we help?"
className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white"
/>   </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                 <textarea
required
rows={6}
value={formData.message}
onChange={(e) =>
    setFormData({ ...formData, message: e.target.value })
}
placeholder="Your Message"
className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue outline-none transition-all dark:text-white resize-none"
/>  </div>
                <button type="submit" disabled={status === 'loading'} className="w-full btn-primary py-4 flex items-center justify-center space-x-2">
                  {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
