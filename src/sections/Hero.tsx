import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Twitter, ArrowDown, Mail, Sparkles, Bot, Brain } from 'lucide-react';
import SplitType from 'split-type';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Split text for reveal animation
        if (nameRef.current) {
          const text = new SplitType(nameRef.current, { types: 'chars' });
          tl.fromTo(
            text.chars,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: 'back.out(1.7)' }
          );
        }

        // Parallax effect
        gsap.to('.hero-bg-bloom', {
          yPercent: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Role, Desc, Badges, CTA, Socials...
        tl.fromTo(roleRef.current, { width: 0, opacity: 0 }, { width: '100%', opacity: 1, duration: 0.8 }, '-=0.4');
        tl.fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3');
        tl.fromTo(badgesRef.current?.children || [], { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.4');
        tl.fromTo(ctaRef.current?.children || [], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.3');
        tl.fromTo(socialsRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.2');

        const floatingBadges = imageRef.current?.querySelectorAll('.floating-badge');
        if (floatingBadges) {
          floatingBadges.forEach((badge, i) => {
            gsap.to(badge, { y: '+=10', duration: 2 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Fallback or simplified animations
        gsap.set([nameRef.current, roleRef.current, descRef.current, badgesRef.current?.children, ctaRef.current?.children, socialsRef.current?.children], { opacity: 1, y: 0, scale: 1 });
        if (roleRef.current) roleRef.current.style.width = '100%';
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split name into characters
  const name = 'Shubham Kakde';

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-bg-bloom absolute top-1/4 right-0 w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] bg-primary/5 rounded-full blur-[150px] lg:blur-[200px]" />
        <div className="hero-bg-bloom absolute bottom-0 left-1/4 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-primary/3 rounded-full blur-[100px] lg:blur-[150px]" />
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Greeting */}
            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <p className="text-primary font-medium tracking-wide uppercase text-xs sm:text-sm">
                  Full Stack Developer
                </p>
              </div>
              <h1
                ref={nameRef}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight overflow-hidden pb-2"
              >
                {name}
              </h1>
            </div>

            {/* Role with typewriter effect */}
            <div className="overflow-hidden flex justify-center lg:justify-start">
              <p
                ref={roleRef}
                className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground whitespace-nowrap overflow-hidden"
              >
                Full Stack Engineer
              </p>
            </div>

            {/* AI Skills Badges */}
            <div ref={badgesRef} className="flex flex-wrap justify-center lg:justify-start gap-2">
              <span className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1.5 border border-primary/20">
                <Brain className="w-3.5 h-3.5" />
                Problem Solving
              </span>
              <span className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1.5 border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                Modern Tech
              </span>
              <span className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1.5 border border-primary/20">
                <Bot className="w-3.5 h-3.5" />
                Efficiency
              </span>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              I build robust and scalable web applications. I leverage modern technologies
              and AI tools efficiently to solve complex problems and deliver high-quality
              solutions, focusing on clean code and user experience.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="magnetic-btn bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 text-sm sm:text-base"
              >
                View My Work
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="magnetic-btn border-border hover:bg-secondary text-sm sm:text-base"
              >
                Get In Touch
                <Mail className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex justify-center lg:justify-start gap-3 pt-2">
              <a
                href="https://github.com/ShuBOY622"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/shubhamkakde"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://twitter.com/ShuBOY622"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-border/50">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">2+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">10+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Projects Built</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">100%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Commitment</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] lg:blur-[80px] scale-75" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl">
                <img
                  src="/hero-portrait2.jpg"
                  alt="Shubham Kakde"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="floating-badge absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full">
                <span className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  Smart Ops
                </span>
              </div>
              <div className="floating-badge absolute top-4 -right-2 sm:top-8 sm:-right-4 px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full" style={{ animationDelay: '0.5s' }}>
                <span className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  Optimized
                </span>
              </div>
              <div className="floating-badge absolute -top-2 left-1/4 sm:-top-4 px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full" style={{ animationDelay: '1s' }}>
                <span className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  Scalable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
