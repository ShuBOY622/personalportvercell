import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, Github, Database, Stethoscope, Zap, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  subtitle: string;
  description: string[];
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  icon: React.ElementType;
  color: string;
  isAI?: boolean;
}

const projects: Project[] = [
  {
    title: 'Clinic Management App',
    subtitle: 'Full-Stack Healthcare Management System',
    description: [
      'Built a comprehensive Clinic Management App for a doctor to digitize and automate daily clinic operations.',
      'Implemented appointment booking system with doctor assignment, time slots, and daily/upcoming appointment views.',
      'Created patient records management with secure access controls, medical history tracking, and smooth workflows.',
      'Developed billing module with invoice generation, payment tracking, and comprehensive report generation features.',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS EC2'],
    image: '/project-clinic.jpg',
    demo: 'http://13.63.12.35/',
    icon: Stethoscope,
    color: 'from-emerald-500 to-teal-500',
    isAI: false,
  },
  {
    title: 'Finora',
    subtitle: 'Personal Finance Management Platform',
    description: [
      'Developed comprehensive finance management platform with expense tracking, investment portfolio monitoring, and budget management tools.',
      'Implemented live stock and mutual fund price tracking using Yahoo Finance API with real-time market data visualization.',
      'Built PDF statement parsing feature using Apache PDFBox to automatically extract and categorize bank transactions, reducing manual data entry.',
      'Created interactive dashboards with dynamic charts for expense analysis, investment insights, and budget tracking with lending/borrowing modules.',
    ],
    tech: ['Spring Boot', 'React', 'MySQL', 'Apache PDFBox', 'Yahoo Finance API'],
    image: '/project-finora.jpg',
    github: 'https://github.com/ShuBOY622/finora',
    icon: Database,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'GoalAchiever',
    subtitle: 'Microservices Goal-Tracking App',
    description: [
      'Built microservices-based goal tracking with gamification (points/challenges) and interactive boards.',
      'Implemented event-driven workflows using Apache Kafka for goal lifecycle management and real-time notifications.',
      'Designed MySQL schema with proper migrations; containerized all services using Docker Compose.',
      'Created leaderboards, achievement badges, and streak tracking to boost user engagement.',
    ],
    tech: ['Spring Boot', 'React', 'Kafka', 'MySQL', 'Docker'],
    image: '/project-goalachiever.jpg',
    github: 'https://github.com/ShuBOY622/goal-achiever',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Dynamic CMS',
    subtitle: 'Fully Dynamic Website Platform',
    description: [
      'Developed content management system with MongoDB backend enabling dynamic website updates without code changes.',
      'Built admin panel for real-time content editing: headers, navigation, image carousels, and card components with live preview.',
      'Implemented RESTful API with Express.js for CRUD operations and integrated Handlebars templating for server-side rendering.',
      'Created drag-and-drop interface for non-technical users to manage website content effortlessly.',
    ],
    tech: ['Node.js', 'MongoDB', 'Handlebars', 'Express', 'HTML/CSS/JS'],
    image: '/project-cms.jpg',
    github: 'https://github.com/ShuBOY622/dynamic-cms',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Heading entrance
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
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

        // Card Stacking Animation
        const cards = gsap.utils.toArray<HTMLElement>('.project-card-wrapper');
        cards.forEach((card, index) => {
          gsap.to(card, {
            scale: 0.9 + (0.02 * index),
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Simple fade in for reduced motion
        gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 });
        gsap.set('.project-card-wrapper', { scale: 1 });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 sm:py-32 bg-background"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-10 sm:mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <p className="text-primary font-medium tracking-wide uppercase text-xs sm:text-sm">
              Portfolio Showcase
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            A chronicle of my technical journey. Scroll down to see how I solve complex problems.
          </p>
        </div>

        {/* Projects Stack */}
        <div ref={projectsContainerRef} className="relative space-y-20 sm:space-y-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-wrapper sticky top-24 sm:top-32 h-[calc(100vh-8rem)] flex items-start justify-center"
            >
              <div className="w-full max-w-5xl glass rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative transform origin-top transition-transform duration-500">
                <div className="grid lg:grid-cols-2 gap-0 h-full">
                  {/* Image Section */}
                  <div className="relative h-64 lg:h-auto overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent lg:bg-gradient-to-t" />

                    {/* Badge */}
                    <div className={`absolute top-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg z-10`}>
                      <project.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Live Badge */}
                    {project.demo && (
                      <div className="absolute top-6 right-6 px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE DEMO
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-10 flex flex-col justify-center bg-background/40 backdrop-blur-sm lg:h-full">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-primary font-mono text-sm">0{index + 1}</span>
                        <div className="h-px w-8 bg-primary/50" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                      <p className="text-lg text-primary font-medium">{project.subtitle}</p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {project.description.map((item, i) => (
                        <p key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          {item}
                        </p>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-secondary/50 border border-white/5 rounded-full text-foreground/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-auto">
                      {project.github && (
                        <Button variant="outline" className="flex-1" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
