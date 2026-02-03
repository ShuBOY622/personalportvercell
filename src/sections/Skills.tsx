import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Brain, Sparkles, Bot, Cpu, Network, Database, Layers, Code, Globe, Terminal, Server, Settings } from 'lucide-react';
import {
  SiJavascript, SiTypescript, SiOracle, SiCplusplus, SiMysql,
  SiSpringboot, SiReact, SiNodedotjs, SiExpress,
  SiDocker, SiAmazonwebservices, SiGit, SiMongodb, SiPostgresql
} from "react-icons/si";

interface Skill {
  name: string;
  level: number;
  category: string;
  isNew?: boolean;
  icon?: any;
}

const skills: Skill[] = [
  // Advanced Technologies
  { name: 'AI-Assisted Dev', level: 90, category: 'Advanced Technologies', isNew: true, icon: Bot },
  { name: 'Smart Solutions', level: 88, category: 'Advanced Technologies', isNew: true, icon: Sparkles },
  { name: 'Automation', level: 85, category: 'Advanced Technologies', isNew: true, icon: Settings },
  { name: 'System Optimization', level: 82, category: 'Advanced Technologies', isNew: true, icon: Cpu },
  { name: 'Modern Architecture', level: 80, category: 'Advanced Technologies', isNew: true, icon: Layers },
  { name: 'Integration', level: 85, category: 'Advanced Technologies', isNew: true, icon: Network },

  // Languages
  { name: 'Java', level: 90, category: 'Languages', icon: SiOracle },
  { name: 'JavaScript', level: 88, category: 'Languages', icon: SiJavascript },
  { name: 'TypeScript', level: 82, category: 'Languages', icon: SiTypescript },
  { name: 'C++', level: 78, category: 'Languages', icon: SiCplusplus },
  { name: 'SQL', level: 85, category: 'Languages', icon: Database },

  // Frameworks
  { name: 'Spring Boot', level: 90, category: 'Frameworks', icon: SiSpringboot },
  { name: 'React', level: 88, category: 'Frameworks', icon: SiReact },
  { name: 'Node.js', level: 85, category: 'Frameworks', icon: SiNodedotjs },
  { name: 'Express', level: 83, category: 'Frameworks', icon: SiExpress },

  // Tools & Platforms
  { name: 'Docker', level: 82, category: 'Tools', icon: SiDocker },
  { name: 'AWS', level: 78, category: 'Tools', icon: SiAmazonwebservices },
  { name: 'Git', level: 88, category: 'Tools', icon: SiGit },
  { name: 'MongoDB', level: 82, category: 'Tools', icon: SiMongodb },
  { name: 'MySQL', level: 85, category: 'Tools', icon: SiMysql },
  { name: 'PostgreSQL', level: 78, category: 'Tools', icon: SiPostgresql },

  // Concepts
  { name: 'DSA', level: 88, category: 'Concepts', icon: Code },
  { name: 'OOP', level: 92, category: 'Concepts', icon: Layers },
  { name: 'REST APIs', level: 90, category: 'Concepts', icon: Globe },
  { name: 'Microservices', level: 85, category: 'Concepts', icon: Server },
  { name: 'System Design', level: 80, category: 'Concepts', icon: Terminal },
];

const categories = ['Advanced Technologies', 'Languages', 'Frameworks', 'Tools', 'Concepts'];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        // Desktop & Standard Motion (Horizontal Scroll)
        isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        // Mobile or Reduced Motion (Vertical Stack or Simplified)
        isMobileOrReduced: "(max-width: 767px), (prefers-reduced-motion: reduce)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        if (isDesktop && containerRef.current && sectionRef.current) {
          // Horizontal Scroll Logic
          const totalWidth = containerRef.current.scrollWidth;
          const viewportWidth = window.innerWidth;

          gsap.set(containerRef.current, { willChange: 'transform' });
          gsap.to(containerRef.current, {
            x: () => -(totalWidth - viewportWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onLeave: () => gsap.set(containerRef.current, { willChange: 'auto' }),
              onEnterBack: () => gsap.set(containerRef.current, { willChange: 'transform' })
            },
          });
        }
      });

      // Title Animation (Simple fade for all)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Group skills by category
  const skillsByCategory = categories.map(category => ({
    title: category,
    items: skills.filter(s => s.category === category)
  }));

  return (
    <section ref={sectionRef} id="skills" className="relative h-screen bg-background overflow-hidden flex flex-col justify-center">
      {/* Header */}
      <div ref={titleRef} className="absolute top-10 sm:top-16 left-0 right-0 z-10 text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-primary font-medium tracking-wide uppercase text-xs sm:text-sm">
            Technical Proficiency
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Skills & <span className="text-gradient">Technologies</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Scroll down to explore my tech stack
        </p>
      </div>

      {/* Container - Horizontal on Desktop, Vertical/Grid behavior controlled via CSS/GSAP context usually, 
          but here we kept the structure flex. On mobile, we might want to allow native scroll if not pinned.
          The matchMedia logic above only enables pinning on desktop. On mobile, this flex container 
          needs to be scrollable horizontally naturally or stack vertically. 
          For true responsiveness, 'flex-col' on mobile would be better, but 'flex' works for horizontal swipe.
          Let's ensure it's scrollable on mobile.
      */}
      <div
        ref={containerRef}
        className="flex items-center px-4 sm:px-10 gap-10 sm:gap-20 w-fit h-full pt-20 overflow-x-auto sm:overflow-visible no-scrollbar"
      >
        {/* Intro Card */}
        <div className="flex-shrink-0 w-[80vw] sm:w-[500px] h-[50vh] sm:h-[60vh] glass rounded-3xl p-8 flex flex-col justify-center items-center text-center">
          <Brain className="w-16 h-16 text-primary mb-6 animate-pulse" />
          <h3 className="text-2xl font-bold mb-4">Core Competencies</h3>
          <p className="text-muted-foreground leading-relaxed">
            My technical expertise spans across the entire development lifecycle.
            From designing robust backend systems with Java & Spring Boot, to crafting
            interactive frontends with React, and integrating AI for smarter operations.
          </p>
        </div>

        {/* Skill Categories */}
        {skillsByCategory.map((group, index) => (
          <div key={group.title} className="flex-shrink-0 w-[85vw] sm:w-[600px] flex flex-col gap-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-primary/50">0{index + 1}.</span> {group.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {group.items.map((skill) => (
                <div
                  key={skill.name}
                  className="glass p-4 rounded-xl flex items-center gap-3 hover:bg-primary/10 transition-colors group"
                >
                  <div className="p-2 bg-background/50 rounded-lg group-hover:scale-110 transition-transform">
                    {skill.icon && <skill.icon className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">{skill.name}</h4>
                    <div className="w-full h-1 bg-muted mt-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* End Spacer */}
        <div className="w-[10vw]"></div>
      </div>
    </section>
  );
}
