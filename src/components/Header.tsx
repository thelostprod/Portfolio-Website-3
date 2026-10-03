import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ["work", "capabilities", "about", "contact"];
      let currentSection = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Work", href: "#work", id: "work" },
    { label: "Capabilities", href: "#capabilities", id: "capabilities" },
    { label: "About", href: "#about", id: "about" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-black/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Logo and Status */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="font-serif font-medium text-lg sm:text-xl tracking-tight text-black flex flex-col group"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#221DF2] font-semibold font-sans mb-0.5">Portfolio 2026</span>
            <span className="leading-tight group-hover:text-[#221DF2] transition-colors">Adarsh</span>
          </a>
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-[#221DF2]/5 text-[#221DF2]/80 border border-[#221DF2]/15">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse inline-block" style={{ width: '6px', height: '6px' }} />
            New Delhi / Commissions Open
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`relative text-[11px] font-medium tracking-[0.2em] uppercase transition-all py-1 ${
                    activeSection === item.id
                      ? "text-[#221DF2] border-b border-[#221DF2]"
                      : "text-black/60 hover:text-[#221DF2]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] uppercase text-[#221DF2] hover:text-white hover:bg-[#221DF2] transition-all border border-[#221DF2]/20 rounded-full px-5 py-2.5 bg-[#221DF2]/5"
          >
            Book a Call <ArrowUpRight size={12} />
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-black/80 hover:text-[#221DF2] transition-colors p-1"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/10 py-8 px-6 shadow-2xl md:hidden"
          >
            <ul className="flex flex-col gap-6 text-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xs font-semibold tracking-[0.25em] uppercase transition-colors ${
                      activeSection === item.id ? "text-[#221DF2]" : "text-black/60 hover:text-[#221DF2]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 border-t border-black/5">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-[#221DF2] hover:bg-[#1b17cc] transition-all rounded-full w-full py-3"
                >
                  Book a Call <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
