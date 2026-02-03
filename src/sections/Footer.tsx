import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, ArrowUp, Github, Linkedin, Twitter, Mail, Brain, Sparkles } from 'lucide-react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative py-12 sm:py-16 border-t border-border/50"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Logo & Tagline */}
          <div className="text-center lg:text-left">
            <a href="#hero" className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-bold tracking-tight">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="text-gradient">Shubham Kakde</span>
            </a>
            <p className="text-muted-foreground text-xs sm:text-sm mt-2">
              Full Stack Developer | Building the intelligent future.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="#about"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex gap-2 sm:gap-3">
            <a
              href="https://github.com/ShuBOY622"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://linkedin.com/in/shubhamkakde"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://twitter.com/ShuBOY622"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="mailto:shubhamkakde622@gmail.com"
              className="p-2 sm:p-2.5 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 sm:my-8 border-t border-border/50" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary" /> by Shubham Kakde
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-2.5 sm:p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-110 transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </footer>
  );
}
