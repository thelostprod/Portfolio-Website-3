import { useState, useEffect, lazy, Suspense, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Header from "./components/Header";
import WorkCategory from "./components/WorkCategory";
import { workCategoriesData } from "./data";
import { ArrowDown, Sparkles, MoveRight, ArrowUpRight } from "lucide-react";
import { StudioLight3D, Tripod3D, Clapperboard3D, Microphone3D } from "./components/Background3DElements";

const Capabilities = lazy(() => import("./components/Capabilities"));
const ContactForm = lazy(() => import("./components/ContactForm"));

function SectionFallback() {
  return <div className="min-h-[12rem]" aria-hidden="true" />;
}

export default function App() {
  // Framer motion scroll progress indicator at the top of the viewport
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // State for tracking mouse coordinates for the custom interactive cursor
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  // States for 3D Tilt Hover effect on Hero Image
  const [heroRotateX, setHeroRotateX] = useState(0);
  const [heroRotateY, setHeroRotateY] = useState(0);

  // States for Magnetic Button 1 (View Work)
  const [btn1Offset, setBtn1Offset] = useState({ x: 0, y: 0 });

  // States for Magnetic Button 2 (Book a Call)
  const [btn2Offset, setBtn2Offset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Set up mouse enters on high-end elements to change cursor size/behavior
  const onMouseEnterInteractive = (type: string, text: string = "") => {
    // Check if any modal is open before changing cursor
    const isModalOpen = document.querySelector('[class*="z-[100]"], [class*="z-[110]"], [class*="z-[200]"]');
    if (isModalOpen) return;
    
    setCursorVariant(type);
    setCursorText(text);
  };

  const onMouseLeaveInteractive = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  // 3D Tilt Handlers
  const handleHeroMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    
    // Rotation values between -15 and 15 degrees
    const rotateY = ((x / width) - 0.5) * 30;
    const rotateX = (((y / height) - 0.5) * -30);
    
    setHeroRotateX(rotateX);
    setHeroRotateY(rotateY);
  };

  const handleHeroMouseLeave = () => {
    setHeroRotateX(0);
    setHeroRotateY(0);
    onMouseLeaveInteractive();
  };

  // Magnetic Button Handlers
  const handleBtn1MouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtn1Offset({ x: x * 0.4, y: y * 0.4 });
    onMouseEnterInteractive("hover");
  };

  const handleBtn1MouseLeave = () => {
    setBtn1Offset({ x: 0, y: 0 });
    onMouseLeaveInteractive();
  };

  const handleBtn2MouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtn2Offset({ x: x * 0.4, y: y * 0.4 });
    onMouseEnterInteractive("hover");
  };

  const handleBtn2MouseLeave = () => {
    setBtn2Offset({ x: 0, y: 0 });
    onMouseLeaveInteractive();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        duration: 0.8
      } 
    },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
      }
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -15, rotateX: 5 },
    show: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 60, 
        damping: 18,
        delay: 0.4 
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#221DF2]/10 selection:text-black overflow-x-hidden relative">
      
      {/* Scroll Progress Bar at the absolute top of the screen */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#221DF2] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Custom Spring-driven Interactive Cursor using brand color #221DF2 */}
      <div className="hidden lg:block">
        <motion.div
          className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
          animate={{
            x: mousePosition.x - 6,
            y: mousePosition.y - 6,
            scale: cursorVariant === "hover" ? 4.5 : cursorVariant === "play" ? 7 : cursorVariant === "view" ? 6 : 1,
            backgroundColor: cursorVariant === "hover" ? "rgba(34, 29, 242, 0.08)" : cursorVariant === "play" ? "rgba(34, 29, 242, 0.95)" : cursorVariant === "view" ? "rgba(34, 29, 242, 0.9)" : "rgb(34, 29, 242)",
          }}
          transition={{ type: "spring", stiffness: 600, damping: 28 }}
        >
          {cursorVariant === "play" && (
            <div className="absolute inset-0 flex items-center justify-center text-[7px] font-bold font-mono tracking-widest text-white leading-none">
              {cursorText || "PLAY"}
            </div>
          )}
          {cursorVariant === "view" && (
            <div className="absolute inset-0 flex items-center justify-center text-[7px] font-bold font-mono tracking-widest text-white leading-none">
              {cursorText || "VIEW"}
            </div>
          )}
        </motion.div>
        
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[9998]"
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: (cursorVariant === "hover" || cursorVariant === "view") ? 1.4 : cursorVariant === "play" ? 0 : 1,
            borderColor: cursorVariant === "hover" ? "rgba(34, 29, 242, 0.5)" : cursorVariant === "view" ? "rgba(34, 29, 242, 0.4)" : "rgba(34, 29, 242, 0.2)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
        />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-32 pb-20 relative bg-white overflow-hidden">
        {/* Subtle grid background to simulate premium paper alignment sheets */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

        {/* Floating 3D Studio Background Elements */}
        <Clapperboard3D className="bottom-[12%] left-[4%] 2xl:left-[6%] hidden xl:block opacity-95 hover:opacity-100 scale-90 transition-all duration-300" scrollProgress={scrollYProgress} />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6 sm:gap-8">
              
              {/* Premium top badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#221DF2]/5 text-[#221DF2] border border-[#221DF2]/10 cursor-pointer"
                onMouseEnter={() => onMouseEnterInteractive("hover")}
                onMouseLeave={onMouseLeaveInteractive}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Sparkles size={11} className="text-[#221DF2] animate-pulse" />
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase font-mono">
                  Portfolio 2026
                </span>
              </motion.div>

              {/* Editorial Display Title with "Adarsh" and color elements */}
              <div className="flex flex-col gap-3 w-full">
                <motion.span
                  variants={itemVariants}
                  className="text-[#221DF2]/80 uppercase tracking-[0.3em] text-[10px] font-bold font-mono block"
                >
                  Video Editor & Creative Director
                </motion.span>
                
                <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[7.5rem] tracking-tight text-black leading-[0.85] uppercase overflow-hidden">
                  <motion.span 
                    variants={titleWordVariants} 
                    className="block hover:tracking-wide hover:text-[#221DF2] transition-all duration-500 cursor-default"
                  >
                    Adarsh
                  </motion.span>
                </h1>
              </div>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-black/50 text-sm sm:text-base leading-relaxed tracking-wide max-w-md font-sans font-light"
              >
                Specializing in storytelling-driven video editing, cinematic pacing, and attention-focused content that helps brands and creators turn ideas into videos people actually stop to watch.
              </motion.p>

              {/* Buttons with Magnetic cursor-tracking springs and brand colors */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                <motion.a
                  href="#work"
                  onMouseMove={handleBtn1MouseMove}
                  onMouseLeave={handleBtn1MouseLeave}
                  animate={{ x: btn1Offset.x, y: btn1Offset.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="px-8 py-4 bg-[#221DF2] text-white hover:bg-[#1b17cc] rounded-full font-bold tracking-widest text-[11px] uppercase transition-colors duration-300 text-center flex items-center justify-center gap-2 group cursor-pointer shadow-md hover:shadow-xl"
                >
                  <span style={{ transform: "translateZ(10px)" }}>View Work</span>
                  <MoveRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </motion.a>
                
                <motion.a
                  href="#contact"
                  onMouseMove={handleBtn2MouseMove}
                  onMouseLeave={handleBtn2MouseLeave}
                  animate={{ x: btn2Offset.x, y: btn2Offset.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="px-8 py-4 bg-[#221DF2]/5 text-[#221DF2] hover:bg-[#221DF2]/10 rounded-full font-bold tracking-widest text-[11px] uppercase border border-[#221DF2]/15 transition-colors duration-300 text-center cursor-pointer flex items-center justify-center"
                >
                  <span style={{ transform: "translateZ(8px)" }}>Book a Call</span>
                </motion.a>
              </motion.div>
            </div>

            {/* Right Portrait Column with Interactive 3D Card Tilt */}
            <div className="lg:col-span-5 flex justify-center perspective-[1000px]">
              <motion.div
                variants={imageContainerVariants}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                animate={{ rotateX: heroRotateX, rotateY: heroRotateY }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onMouseEnter={() => onMouseEnterInteractive("view", "HELLO")}
                style={{ transformStyle: "preserve-3d" }}
                className="relative aspect-[3/4] w-full max-w-[320px] sm:max-w-[360px] rounded-xl overflow-hidden bg-white border border-black/10 p-2.5 shadow-2xl cursor-pointer hover:border-[#221DF2]/40 transition-colors"
              >
                {/* Print visual details - float inside 3D space with brand blue */}
                <div className="absolute bottom-6 left-6 z-10" style={{ transform: "translateZ(30px)" }}>
                   <span className="text-[8px] uppercase tracking-[0.2em] bg-[#221DF2] text-white px-2.5 py-1.5 font-bold rounded-sm shadow-md font-mono">
                     ADARSH // CREATIVE
                   </span>
                </div>
                <div className="w-full h-full overflow-hidden rounded-lg relative" style={{ transform: "translateZ(10px)" }}>
                  <img
                    src="/assets/adarsh-portrait-new.png"
                    alt="Adarsh Portrait"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover grayscale brightness-[0.98] contrast-[1.02] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down indicator hint with brand blue hover */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-black/30 hover:text-[#221DF2] cursor-pointer transition-colors duration-300">
          <span className="text-[9px] font-mono tracking-widest uppercase">Scroll to work</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </div>
      </section>

      {/* Introduction Section (Photo Removed as Requested, Centered Content Layout) */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-black/10" id="about">
        {/* Floating 3D Studio Light casting a soft light cone */}
        <StudioLight3D className="top-[12%] left-[2%] 2xl:left-[4%] hidden md:block opacity-95 hover:opacity-100 scale-[0.8] lg:scale-[0.95] xl:scale-[1.05] transition-all duration-300" scrollProgress={scrollYProgress} />
        <Microphone3D className="bottom-[12%] right-[2%] 2xl:right-[4%] hidden md:block opacity-95 hover:opacity-100 scale-[0.8] lg:scale-[0.95] xl:scale-[1.05] transition-all duration-300" scrollProgress={scrollYProgress} />

        <div className="max-w-4xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-6 sm:gap-8">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#221DF2] bg-[#221DF2]/5 px-3 py-1 rounded-full w-fit border border-[#221DF2]/10 uppercase font-mono">
              Philosophy / About
            </span>
            <h2 className="font-serif italic font-normal text-4xl sm:text-6xl tracking-tight text-black leading-tight">
              Why do some videos make us stop scrolling?
            </h2>
            
            <div className="flex flex-col gap-6 text-sm sm:text-base text-black/60 leading-relaxed font-light font-sans max-w-3xl text-left">
              <p className="text-lg sm:text-xl text-black/80 font-medium leading-relaxed">
                I became a video editor because a question wouldn't leave me alone.
              </p>
              <p>
                During my engineering degree, I found myself spending less time studying formulas and more time dissecting ads, trailers, and content that held my attention.
              </p>
              <p>
                The more I looked, the more I realized that great videos aren't accidents. Every cut, every sound, every second is designed to make people feel something.
              </p>
              <p className="font-semibold text-black/80">
                That curiosity became an obsession.
              </p>
              <p className="text-[#221DF2] font-serif italic text-xl sm:text-3xl border-l-2 border-[#221DF2] pl-5 mt-4 leading-relaxed font-normal text-left">
                Today, I edit videos for the same reason I started studying them: to create content people don't just watch—they remember.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section with premium Apple-like gradient design and animated blobs */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-white via-slate-50/70 to-[#221DF2]/[0.025] relative overflow-hidden border-t border-b border-black/5" id="work">
        {/* Soft interactive/ambient Apple glow blobs */}
        <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-[#221DF2]/[0.015] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-12 -left-20 w-[350px] h-[350px] bg-indigo-200/[0.12] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          {/* Tripod sticker in front of the Selected Work title where there is plenty of empty space */}
          <Tripod3D className="absolute top-0 right-6 sm:right-12 lg:right-[15%] xl:right-[20%] hidden md:block opacity-95 hover:opacity-100 scale-[0.85] lg:scale-[1.0] xl:scale-[1.1] transition-all duration-300 z-20" scrollProgress={scrollYProgress} />

          <header className="max-w-xl mb-16 sm:mb-24">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#221DF2] uppercase bg-[#221DF2]/5 px-3 py-1 rounded-full mb-4 inline-block border border-[#221DF2]/10 font-mono">
              Selected Work
            </span>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl tracking-tight text-black leading-tight mb-4">
              Creative Portfolio
            </h2>
            <p className="text-black/60 text-sm sm:text-base leading-relaxed font-sans font-light">
              A showcase of work across motion graphics, animation, documentary, and real estate. Each category represents a distinct creative discipline with its own visual language and storytelling approach.
            </p>
          </header>

          <div className="flex flex-col">
            {workCategoriesData.map((category) => (
              <WorkCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities List Component */}
      <Suspense fallback={<SectionFallback />}>
        <Capabilities />
      </Suspense>

      {/* About/Strategy Block */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-black/10">
        <div className="absolute left-0 top-1/2 w-64 h-64 bg-[#221DF2]/[0.01] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#221DF2] uppercase bg-[#221DF2]/5 px-3 py-1 rounded-full mb-4 inline-block border border-[#221DF2]/10 font-mono">
                Methodology / Mission
              </span>
              <h2 className="font-serif italic font-normal text-3xl sm:text-5xl tracking-tight text-black leading-tight">
                Creativity Backed <br />By Strategy.
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base text-black/60 leading-relaxed font-light font-sans lg:pl-8">
              <p className="text-black font-serif italic text-xl sm:text-2xl tracking-tight leading-snug font-normal">
                I don't just focus on making content look good.
              </p>
              <p className="text-[#221DF2] font-serif italic text-xl sm:text-2xl tracking-tight leading-snug font-normal">
                I focus on making people stop, watch and remember.
              </p>
              <p className="text-[#221DF2] font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase border-l-2 border-[#221DF2]/20 pl-4 mt-4 font-mono">
                Every edit, transition and storytelling decision is made with purpose.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form and Channels Component */}
      <Suspense fallback={<SectionFallback />}>
        <ContactForm />
      </Suspense>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-black/10 text-black/40 text-[10px] uppercase tracking-widest font-mono">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-center text-center sm:text-left">
            <span>Available for Commissions — 2026</span>
            <span>Based in New Delhi, India</span>
          </div>
          <div className="flex gap-6">
            <a 
              href="https://www.linkedin.com/in/adarsh-choudhary-12b505251" 
              target="_blank" 
              rel="noopener noreferrer" 
              onMouseEnter={() => onMouseEnterInteractive("hover")}
              onMouseLeave={onMouseLeaveInteractive}
              className="hover:text-[#221DF2] transition-colors inline-flex items-center gap-0.5"
            >
              LinkedIn <ArrowUpRight size={10} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
