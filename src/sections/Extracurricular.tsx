import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Users, Award, BookOpen, Trophy, GraduationCap, Target, Sparkles, Brain } from 'lucide-react';

interface ExtracurricularItem {
  title: string;
  organization: string;
  period: string;
  description: string[];
  icon: React.ElementType;
  achievements?: string[];
}

const extracurriculars: ExtracurricularItem[] = [
  {
    title: 'Training & Placement Coordinator',
    organization: "JSPM's Imperial College of Engineering and Research",
    period: 'Aug 2022 - Aug 2024',
    description: [
      'Served as the bridge between students and recruiting companies, facilitating campus placement activities.',
      'Organized 15+ campus recruitment drives, coordinating with HR teams from various companies.',
      'Managed training events for 500+ students, improving their employability skills.',
    ],
    icon: Users,
    achievements: [
      'Achieved 85% placement rate for the batch',
      'Brought 30+ companies for recruitment',
    ],
  },
  {
    title: 'Developer Team Lead',
    organization: 'Google Developer Student Club (GDSC), JSPM\'s ICOER',
    period: 'Mar 2023 - Aug 2024',
    description: [
      'Led a team of student developers in organizing technical workshops and coding sessions.',
      'Mentored 20+ junior developers in web development technologies and best practices.',
      'Conducted hands-on sessions on React, Node.js, and Git workflows.',
    ],
    icon: Trophy,
    achievements: [
      'Organized 10+ technical workshops',
      'Built a community of 100+ developers',
    ],
  },
];

const certifications = [
  {
    title: 'Full-Stack Web Development Bootcamp',
    issuer: 'Udemy (Angela Yu)',
    icon: BookOpen,
  },
  {
    title: 'Barclays Life Skills Program',
    issuer: 'Barclays',
    icon: Award,
  },
];

const quickStats = [
  { label: 'Students Mentored', value: '20+', icon: Users },
  { label: 'Workshops Conducted', value: '10+', icon: GraduationCap },
  { label: 'Recruitment Drives', value: '15+', icon: Target },
  { label: 'Companies Onboarded', value: '30+', icon: Award },
];

export default function Extracurricular() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Extracurricular cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.extra-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Certifications
      if (certsRef.current) {
        const certs = certsRef.current.querySelectorAll('.cert-card');
        gsap.fromTo(
          certs,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: certsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
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
      id="extracurricular"
      className="relative py-20 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-primary/5 rounded-full blur-[100px] lg:blur-[200px]" />
        <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-primary/3 rounded-full blur-[80px] lg:blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <p className="text-primary font-medium tracking-wide uppercase text-xs sm:text-sm">
              Beyond Code
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Leadership & <span className="text-gradient">Growth</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            My journey extends beyond technical skills. I've actively contributed to
            the developer community and honed my leadership abilities.
          </p>
        </div>

        {/* Quick Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="stat-item glass rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-secondary/30 transition-all duration-300"
            >
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
              <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Extracurricular Activities */}
          <div ref={cardsRef} className="lg:col-span-2 space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              Leadership Roles
            </h3>
            {extracurriculars.map((item, index) => (
              <div
                key={index}
                className="extra-card glass rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:bg-secondary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">{item.title}</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">{item.organization}</p>
                    <p className="text-xs sm:text-sm text-primary mt-0.5 sm:mt-1">{item.period}</p>
                  </div>
                </div>

                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {item.description.map((desc, i) => (
                    <li key={i} className="text-muted-foreground text-xs sm:text-sm flex items-start gap-2">
                      <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>

                {item.achievements && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {item.achievements.map((achievement, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certifications Sidebar */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              Certifications
            </h3>
            <div ref={certsRef} className="space-y-3 sm:space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="cert-card glass rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-secondary/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    <cert.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h4 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">{cert.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-6 sm:mt-8 glass rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-primary">
              <p className="text-muted-foreground italic text-xs sm:text-sm leading-relaxed">
                "Leadership is not about being in charge. It's about taking care of those in your charge."
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">— Simon Sinek</p>
            </div>

            {/* AI Badge */}
            <div className="mt-4 sm:mt-6 glass rounded-lg sm:rounded-xl p-4 sm:p-6 flex items-center gap-3">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <div>
                <p className="font-medium text-sm sm:text-base">AI Enthusiast</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Always learning new tech</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
