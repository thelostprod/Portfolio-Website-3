import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type WorkCategory, type Video } from "../types";
import { ArrowUpRight, Maximize, X } from "lucide-react";

interface WorkCategoryProps {
  category: WorkCategory;
}

interface VideoCardProps {
  video: Video;
  categoryName: string;
}

function VideoCard({ video, categoryName }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(video.thumbnailUrl);
  const [thumbnailFailed, setThumbnailFailed] = useState(!video.thumbnailUrl);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const cardPositionRef = useRef(0);

  const cleanupModal = () => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPositionRef.current);

    requestAnimationFrame(() => {
      if (cardPositionRef.current > 0) {
        const headerOffset = 120;
        const targetPosition = cardPositionRef.current - headerOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  };

  const handleOpenModal = () => {
    scrollPositionRef.current = window.scrollY;
    if (cardRef.current) {
      cardPositionRef.current = cardRef.current.getBoundingClientRect().top + window.scrollY;
    }
    setIsModalOpen(true);
    setIsMinimized(false);
    window.history.pushState({ modalOpen: true }, '');
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPositionRef.current);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    const currentScroll = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScroll}px`;
    document.body.style.width = '100%';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsMinimized(false);
    cleanupModal();
    if (window.history.state?.modalOpen) {
      window.history.back();
    }
  };

  useEffect(() => {
    if (!isModalOpen || isMinimized) return;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    const handleFullscreenChange = () => {
      // Don't close modal on fullscreen exit
    };

    const handlePopState = (e: PopStateEvent) => {
      if (isModalOpen && !isMinimized) {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("popstate", handlePopState);
      
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isModalOpen, isMinimized]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border transition-all duration-500 cursor-pointer group"
      onClick={handleOpenModal}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="thumbnail-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              {!thumbnailFailed && thumbnailUrl ? (
                <motion.img
                  src={thumbnailUrl}
                  onLoad={(e) => {
                    if (e.currentTarget.naturalWidth <= 120) {
                      if (thumbnailUrl.includes("maxresdefault.jpg")) {
                        setThumbnailUrl(thumbnailUrl.replace("maxresdefault.jpg", "hqdefault.jpg"));
                      } else {
                        setThumbnailFailed(true);
                      }
                    }
                  }}
                  onError={(e) => {
                    if (thumbnailUrl.includes("maxresdefault.jpg")) {
                      setThumbnailUrl(thumbnailUrl.replace("maxresdefault.jpg", "hqdefault.jpg"));
                    } else {
                      setThumbnailFailed(true);
                    }
                  }}
                  alt={`${categoryName} video preview`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-300"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${video.youtubeId}&showinfo=0&iv_load_policy=3`}
                  className="absolute inset-0 h-full w-full pointer-events-none border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  title={`${categoryName} video preview`}
                />
              )}
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="video-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden"
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${video.youtubeId}&showinfo=0&iv_load_policy=3`}
              className="w-full h-full pointer-events-none border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={`${categoryName} video`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-black/95 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseModal}
          >
            <div 
              className="w-full max-w-5xl flex items-center justify-between mb-4 sm:mb-6 z-[105] px-1 pr-[140px] sm:pr-[180px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#221DF2] animate-pulse" />
                <span className="text-[10px] sm:text-[12px] font-bold tracking-[0.2em] text-white/90 uppercase font-mono truncate max-w-[150px] sm:max-w-none">
                  {categoryName}
                </span>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-white/80 hover:text-white transition-colors"
              >
                Watch on YouTube <ArrowUpRight size={14} />
              </a>
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_24px_50px_rgba(0,0,0,0.8)] border border-white/15 max-h-[72vh] z-[105]"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
                title={`${categoryName} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Floating Video Player */}
      <AnimatePresence>
        {isModalOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[200] w-80 sm:w-96 aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
                title={`${categoryName} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              
              {/* Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <button
                    onClick={handleMaximize}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-colors"
                    aria-label="Maximize"
                  >
                    <Maximize size={14} />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="w-8 h-8 rounded-full bg-[#221DF2] hover:bg-[#1b17cc] flex items-center justify-center text-white transition-colors"
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-mono tracking-wider truncate">
                    {categoryName}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WorkCategory({ category }: WorkCategoryProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="py-16 sm:py-24 border-t border-black/10 last:border-b-0"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h3 className="font-serif italic font-normal text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black leading-tight mb-3">
            {category.title}
          </h3>
          {category.subtitle && (
            <p className="text-black/60 text-sm sm:text-base leading-relaxed font-sans font-light max-w-2xl">
              {category.subtitle}
            </p>
          )}
        </motion.div>

        {/* Videos Grid */}
        <div className={`grid gap-6 sm:gap-8 ${
          category.videos.length === 1 
            ? 'grid-cols-1 max-w-4xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {category.videos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              categoryName={category.title}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
