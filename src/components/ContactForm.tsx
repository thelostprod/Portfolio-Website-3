import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { contactData } from "../data";
import { Mail, Linkedin, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct the mailto link with pre-filled fields to ensure message is received
    const subject = encodeURIComponent(`Creative Brief from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Adarsh,\n\nI would love to book a call / work on a project with you.\n\n` +
      `Sender Name: ${formData.name}\n` +
      `Sender Email: ${formData.email}\n\n` +
      `Project Brief:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name}`
    );
    const mailtoUrl = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    
    // Simulate real high-end async submission with Apple-like slick feedback
    setTimeout(() => {
      // Open the user's native email client with pre-filled message
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-black/10" id="contact">
      {/* Dynamic blurred glow background sheets (Apple-inspired light leaks) */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#221DF2]/[0.025] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -left-20 top-1/4 w-[350px] h-[350px] bg-blue-100/[0.15] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Narrative, Social Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#221DF2] uppercase bg-[#221DF2]/5 px-3 py-1 rounded-full mb-4 inline-block border border-[#221DF2]/10 font-mono">
                Connection
              </span>
              <h2 className="font-serif italic font-normal text-3xl sm:text-5xl tracking-tight text-black leading-tight">
                Let's Create Something Worth Watching.
              </h2>
            </div>
            
            <p className="text-black/50 text-sm leading-relaxed font-light max-w-sm font-sans mt-2">
              Ready to elevate your product, podcast, or social brand presence? Connect directly via the links below, or use the interactive brief engine.
            </p>
            
            <div className="flex flex-col gap-4 mt-6">
              {/* Direct Mail Card */}
              <motion.a 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.99 }}
                href={`mailto:${contactData.email}`} 
                className="group flex items-center gap-4 py-4 px-6 bg-slate-50/50 hover:bg-white rounded-2xl border border-black/[0.06] hover:border-[#221DF2]/20 hover:shadow-[0_15px_30px_rgba(34,29,242,0.03)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-black/[0.03] text-black flex items-center justify-center group-hover:bg-[#221DF2] group-hover:text-white transition-colors duration-300">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-black/40 uppercase block mb-0.5 font-mono">Email Direct</span>
                  <span className="text-sm font-semibold text-black/80 font-serif italic tracking-tight">{contactData.email}</span>
                </div>
              </motion.a>

              {/* LinkedIn Profile Card */}
              <motion.a 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.99 }}
                href={contactData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-4 py-4 px-6 bg-slate-50/50 hover:bg-white rounded-2xl border border-black/[0.06] hover:border-[#221DF2]/20 hover:shadow-[0_15px_30px_rgba(34,29,242,0.03)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-black/[0.03] text-black flex items-center justify-center group-hover:bg-[#221DF2] group-hover:text-white transition-colors duration-300">
                  <Linkedin size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-black/40 uppercase block mb-0.5 font-mono">LinkedIn Profile</span>
                  <span className="text-sm font-semibold text-black/80 font-serif italic tracking-tight">Adarsh</span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Block: Incredibly Creative Glassmorphic Brief Card */}
          <div className="lg:col-span-7 relative">
            
            {/* Ambient colorful circle halo hovering behind the form card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#221DF2]/5 via-purple-100/10 to-indigo-50/10 rounded-3xl blur-2xl pointer-events-none opacity-80" />
            
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-black/[0.08] shadow-[0_32px_100px_rgba(34,29,242,0.05)] overflow-hidden">
              
              {/* Premium top gradient line accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#221DF2]/80 to-transparent" />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="creative-form"
                    initial={{ opacity: 1, y: 10 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 relative z-10"
                  >
                    <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-2">
                      <div className="flex flex-col">
                        <h3 className="font-serif italic font-normal text-xl text-black tracking-tight flex items-center gap-2">
                          Get In Touch
                        </h3>
                        <p className="text-[10px] text-black/40 font-mono uppercase tracking-widest mt-1">
                          Fill out this simple form to send a message directly to me.
                        </p>
                      </div>
                      <Sparkles size={16} className="text-[#221DF2] animate-pulse" />
                    </div>

                    {/* Name field with floating active underline indicator */}
                    <div className="flex flex-col gap-2 relative">
                      <div className="flex justify-between items-baseline">
                        <label htmlFor="name" className="text-[9px] font-bold tracking-widest text-black/50 uppercase font-mono">Your Name</label>
                        {formData.name && <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase">Ready</span>}
                      </div>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          id="name"
                          name="name"
                          placeholder="e.g. Jeffrey"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full text-sm font-medium text-black bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-[#221DF2]/50 rounded-2xl px-5 py-4 focus:outline-none transition-all duration-300 placeholder:text-black/20"
                        />
                        <motion.div 
                          className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#221DF2]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Email field with floating active underline indicator */}
                    <div className="flex flex-col gap-2 relative">
                      <div className="flex justify-between items-baseline">
                        <label htmlFor="email" className="text-[9px] font-bold tracking-widest text-black/50 uppercase font-mono">Your Email</label>
                        {formData.email && <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase">Ready</span>}
                      </div>
                      <div className="relative">
                        <input
                          required
                          type="email"
                          id="email"
                          name="email"
                          placeholder="e.g. jeffrey@islandboy.com"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full text-sm font-medium text-black bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-[#221DF2]/50 rounded-2xl px-5 py-4 focus:outline-none transition-all duration-300 placeholder:text-black/20"
                        />
                        <motion.div 
                          className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#221DF2]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Message field with active character state counter */}
                    <div className="flex flex-col gap-2 relative">
                      <div className="flex justify-between items-baseline">
                        <label htmlFor="message" className="text-[9px] font-bold tracking-widest text-black/50 uppercase font-mono">Your Message</label>
                        <span className="text-[8px] font-mono text-black/30">
                          {formData.message.length} chars
                        </span>
                      </div>
                      <div className="relative">
                        <textarea
                          required
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="Hi,

Need someone who can blur faces, erase details, and work miracles in post-production."
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full text-sm font-medium text-black bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-[#221DF2]/50 rounded-2xl px-5 py-4 focus:outline-none transition-all duration-300 placeholder:text-black/40 resize-none"
                        />
                        <motion.div 
                          className="absolute bottom-1 left-5 right-5 h-[2px] bg-[#221DF2]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* High-end interactive Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(34, 29, 242, 0.15)" }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#221DF2] hover:bg-blue-700 text-white font-bold tracking-widest text-[11px] uppercase py-4.5 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer disabled:bg-neutral-200 disabled:text-black/40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1.5 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="thank-you"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="flex flex-col items-center justify-center text-center py-12 z-10 relative"
                  >
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2, stiffness: 250 }}
                      className="w-16 h-16 rounded-full bg-[#221DF2]/5 text-[#221DF2] flex items-center justify-center mb-6 border border-[#221DF2]/10"
                    >
                      <CheckCircle size={28} />
                    </motion.div>
                    <h3 className="font-serif italic font-normal text-2xl text-black tracking-tight mb-3">
                      Message Sent Successfully
                    </h3>
                    <p className="text-black/60 text-sm leading-relaxed max-w-sm mb-8 font-sans font-light">
                      Thank you! I have received your message and will get back to you within 24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold tracking-widest text-[#221DF2] hover:text-blue-700 uppercase transition-colors cursor-pointer"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
