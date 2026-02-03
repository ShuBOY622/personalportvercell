import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Code2, Server, Brain, Sparkles, Bot } from 'lucide-react';

const highlights = [
  {
    icon: Brain,
    title: 'AI & Prompt Engineering',
    description: 'Crafting intelligent AI solutions with advanced prompt engineering techniques',
  },
  {
    icon: Code2,
    title: 'Frontend Excellence',
    description: 'Building responsive, interactive UIs with React and modern frameworks',
  },
  {
    icon: Server,
    title: 'Backend Architecture',
    description: 'Designing robust APIs and microservices with Spring Boot & Node.js',
  },
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    description: 'Developing autonomous AI agents for task automation and workflows',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Heading 3D rotation entrance
        gsap.fromTo(
          headingRef.current,
          { rotateX: 90, opacity: 0, transformOrigin: 'center bottom' },
          {
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Image scale reveal with parallax
        gsap.fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0, y: 100 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax for floating elements
        gsap.to('.about-floating', {
          y: -30,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Content blocks slide in and Cards stagger
        contentRefs.current.forEach((ref, index) => {
          if (ref) {
            gsap.fromTo(
              ref,
              { x: index % 2 === 0 ? -40 : 40, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, delay: index * 0.1, ease: 'expo.out', scrollTrigger: { trigger: ref, start: 'top 90%', toggleActions: 'play none none reverse' } }
            );
          }
        });

        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.highlight-card');
          gsap.fromTo(cards, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([headingRef.current, imageRef.current], { opacity: 1, scale: 1, y: 0, rotateX: 0 });
        contentRefs.current.forEach(ref => gsap.set(ref, { opacity: 1, x: 0 }));
        if (cardsRef.current) gsap.set(cardsRef.current.querySelectorAll('.highlight-card'), { opacity: 1, y: 0 });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToContentRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) contentRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] bg-primary/5 rounded-full blur-[150px] lg:blur-[200px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <p className="text-primary font-medium tracking-wide uppercase text-xs sm:text-sm">
              About Me
            </p>
          </div>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
            style={{ perspective: '1000px' }}
          >
            The Story Behind{' '}
            <span className="text-gradient">The Code</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-24">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative order-2 lg:order-1"
            style={{ perspective: '1000px' }}
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-primary/20 blur-[40px] lg:blur-[60px] scale-90" />

              <img
                src="/about-portrait2.jpg"
                alt="Shubham Kakde"
                className="relative w-full h-full object-cover rounded-2xl"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="about-floating absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 p-4 sm:p-6 glass rounded-xl sm:rounded-2xl shadow-xl z-20">
              <p className="text-2xl sm:text-4xl font-bold text-gradient">9.1</p>
              <p className="text-xs sm:text-sm text-muted-foreground">CGPA</p>
            </div>

            {/* AI Badge */}
            <div className="about-floating absolute -top-3 left-4 sm:-top-4 sm:left-8 px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full flex items-center gap-1.5 sm:gap-2 shadow-xl z-20" style={{ transitionDelay: '0.2s' }}>
              <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium">Full Stack</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-5 sm:space-y-8 order-1 lg:order-2">
            <div ref={(el) => addToContentRefs(el, 0)}>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                From Curiosity to Software engineer
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                My journey into software development began with a simple curiosity about how
                things work on the internet. That curiosity quickly evolved into a passion for
                building intelligent digital experiences that make a real difference.
              </p>
            </div>

            <div ref={(el) => addToContentRefs(el, 1)}>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Today, I'm a <span className="text-primary font-medium">Full Stack Developer</span> with expertise
                in the MERN stack, Spring Boot ecosystem, and cutting-edge AI technologies. I hold a B.E. in
                Computer Engineering with a <span className="text-primary font-medium">9.1 CGPA</span> from JSPM's Imperial College,
                and a PG-Diploma from CDAC with 84.38%.
              </p>
            </div>

            <div ref={(el) => addToContentRefs(el, 2)}>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                What sets me apart is my deep expertise in <span className="text-primary font-medium">AI and prompt engineering</span>.
                I've built numerous projects leveraging AI chatbots, autonomous agents, and the latest technologies
                like <span className="text-primary font-medium">MCP servers</span> and <span className="text-primary font-medium">Agentic AI</span>.
                I'm always up-to-date with the latest tech trends and incorporate them into my solutions.
              </p>
            </div>

            <div ref={(el) => addToContentRefs(el, 3)} className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                AI Expert
              </div>
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/50 rounded-full text-xs sm:text-sm font-medium">
                Problem Solver
              </div>
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/50 rounded-full text-xs sm:text-sm font-medium">
                Team Player
              </div>
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/50 rounded-full text-xs sm:text-sm font-medium">
                Continuous Learner
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Cards */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="highlight-card group p-4 sm:p-6 glass rounded-xl sm:rounded-2xl hover:bg-secondary/50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
