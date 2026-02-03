import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Briefcase, Calendar, MapPin, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  highlights: string[];
  link?: string;
  isFreelance?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    company: 'CDAC - Centre for Development of Advanced Computing',
    role: 'Project Engineer',
    period: 'Mar 2025 - Present',
    location: 'Pune, India',
    description: [
      'Designed and developed data migration dashboards to validate and reconcile records across 200+ databases with crores of rows.',
      'Engineered reusable Spring Boot modules for schema/data comparison between legacy sources and modern targets.',
      'Implemented paginated, lazy-loaded workflows to optimize validation throughput and resource usage.',
      'Collaborated with cross-functional government teams to resolve discrepancies and ensure near-100% migration accuracy.',
    ],
    highlights: ['Spring Boot', 'Data Migration', 'Oracle', 'Microservices'],
  },
  {
    company: 'Freelance - Clinic Management System',
    role: 'Full Stack Developer',
    period: 'Jan 2025 - Feb 2025',
    location: 'Remote',
    description: [
      'Built a full-stack Clinic Management App for a doctor to digitize and automate daily clinic operations.',
      'Implemented appointment booking system with doctor assignment and time slot management.',
      'Created patient records management with secure access controls and smooth workflows.',
      'Developed billing module with invoice generation and report generation features.',
    ],
    highlights: ['React', 'Node.js', 'MongoDB', 'AWS EC2', 'Full Stack'],
    link: 'http://13.63.12.35/',
    isFreelance: true,
  },
];

const education = [
  {
    institution: 'Sunbeam Institute of Information Technology, CDAC',
    degree: 'PG-Diploma (CDAC)',
    score: '84.38%',
    period: 'Aug 2024 - Feb 2025',
    location: 'Pune, India',
  },
  {
    institution: "JSPM's Imperial College of Engineering and Research",
    degree: 'B.E. in Computer Engineering',
    score: '9.1 CGPA (84%)',
    period: 'Aug 2020 - Aug 2024',
    location: 'Pune, India',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Timeline line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        });
      }

      // Experience cards entrance
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Education cards entrance
      const eduCards = sectionRef.current?.querySelectorAll('.education-card');
      if (eduCards) {
        gsap.fromTo(
          eduCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: eduCards[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-primary/5 rounded-full blur-[100px] lg:blur-[200px]" />
        <div className="absolute bottom-1/4 right-0 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-primary/3 rounded-full blur-[80px] lg:blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <p className="text-primary font-medium tracking-wide uppercase text-xs sm:text-sm">
              Professional Journey
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            My professional journey spans from enterprise data migration at CDAC to
            freelance projects, always leveraging the latest technologies including AI.
          </p>
        </div>

        {/* Experience Timeline */}
        <div ref={timelineRef} className="relative mb-16 sm:mb-24">
          <h3 className="text-lg sm:text-xl font-semibold mb-8 sm:mb-12 flex items-center gap-2 sm:gap-3">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            Work Experience
          </h3>

          {/* Timeline Line - hidden on mobile */}
          <div className="absolute left-4 sm:left-8 top-16 sm:top-20 bottom-0 w-px hidden lg:block">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                ref={lineRef}
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Experience Cards */}
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-card relative lg:pl-16 xl:pl-20"
              >
                {/* Timeline Dot - hidden on mobile */}
                <div className="hidden lg:flex absolute left-4 sm:left-8 top-6 sm:top-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/20 items-center justify-center">
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${exp.isFreelance ? 'bg-green-500' : 'bg-primary'} animate-pulse`} />
                </div>

                <div className={`glass rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:bg-secondary/30 transition-all duration-300 group ${exp.isFreelance ? 'border-l-4 border-l-green-500' : ''}`}>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                          {exp.role}
                        </h4>
                        {exp.isFreelance && (
                          <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-green-500/20 text-green-500 rounded-full">
                            Freelance
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-muted-foreground text-sm">
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights & Link */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {exp.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 text-xs sm:text-sm text-primary hover:underline"
                      >
                        View Live
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-12 flex items-center gap-2 sm:gap-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            Education
          </h3>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="education-card glass rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:bg-secondary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">{edu.degree}</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">{edu.institution}</p>
                  </div>
                  <div className="px-2 sm:px-3 py-1 bg-primary/10 rounded-full">
                    <span className="text-xs sm:text-sm font-medium text-primary">{edu.score}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {edu.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
