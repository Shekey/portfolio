import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ArrowUp } from "lucide-react";
import { useLenis } from "../SmoothScrollProvider";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    }
  };

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        ".back-to-top",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top fixed bottom-8 right-8 z-50 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6 text-white group-hover:translate-y-[-2px] transition-transform" />
    </button>
  );
}
