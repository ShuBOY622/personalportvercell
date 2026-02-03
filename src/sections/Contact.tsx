import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Particle network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    const connectionDistance = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          particle.vx += (dx / dist) * 0.5;
          particle.vy += (dy / dist) * 0.5;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(var(--primary) / 0.5)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsl(var(--primary) / ${0.2 * (1 - distance / connectionDistance)})`;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          fields,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const contactInfo = sectionRef.current?.querySelectorAll('.contact-info-item');
      if (contactInfo) {
        gsap.fromTo(
          contactInfo,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contactInfo[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-32 overflow-hidden"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-primary/5 rounded-full blur-[100px] lg:blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-primary/3 rounded-full blur-[80px] lg:blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <p className="text-primary font-medium tracking-wide uppercase text-xs sm:text-sm">
              Get In Touch
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            Have a project in mind or want to discuss AI-powered solutions? I'd love to hear from you.
            Let's create something amazing with the latest technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="contact-info-item glass rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:bg-secondary/30 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-sm sm:text-base mb-1">Email</h4>
              <a
                href="mailto:shubhamkakde622@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
              >
                shubhamkakde622@gmail.com
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>

            <div className="contact-info-item glass rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:bg-secondary/30 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-sm sm:text-base mb-1">Phone</h4>
              <a
                href="tel:+919284706541"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
              >
                +91-9284706541
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>

            <div className="contact-info-item glass rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:bg-secondary/30 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-sm sm:text-base mb-1">Location</h4>
              <p className="text-muted-foreground text-sm">Pune, India</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://linkedin.com/in/shubhamkakde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:bg-secondary/30 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/ShuBOY622"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:bg-secondary/30 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm">GitHub</span>
              </a>
              <a
                href="https://twitter.com/ShuBOY622"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:bg-secondary/30 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm">Twitter</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center mb-3 sm:mb-4">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="form-field">
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary transition-colors text-sm"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="form-field mb-5 sm:mb-6">
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or AI requirements..."
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-colors resize-none text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full magnetic-btn bg-primary hover:bg-primary/90 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
