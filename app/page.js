"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Shield, FileText, Clock, Headphones, Database, FormInput, CheckCircle, Users, Award, TrendingUp, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  // const statsRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    // Hero animations - simplified for performance
    const tl = gsap.timeline()
    tl.fromTo(heroRef.current.querySelector('.trust-indicator'), 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(heroRef.current.querySelector('.hero-title'), 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(heroRef.current.querySelector('.hero-subtitle'), 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    )
    .fromTo(heroRef.current.querySelectorAll('.metric-card'), 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    )
    .fromTo(heroRef.current.querySelectorAll('.hero-cta button'), 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    )

    // Services animation - simplified
    gsap.fromTo(servicesRef.current.querySelectorAll('.service-card'), 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    )

    // Stats counter animation
    // gsap.fromTo(statsRef.current.querySelectorAll('.stat-number'), 
    //   { textContent: 0 },
    //   { 
    //     textContent: (i, target) => target.getAttribute('data-value'),
    //     duration: 1.5,
    //     ease: "power1.out",
    //     snap: { textContent: 1 },
    //     scrollTrigger: {
    //       trigger: statsRef.current,
    //       start: "top 80%",
    //       toggleActions: "play none none none"
    //     }
    //   }
    // )

    // Features animation
    gsap.fromTo(featuresRef.current.querySelectorAll('.feature-item'), 
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    )
  }, [])

  const services = [
    {
      icon: Shield,
      title: "Insurance Claims Processing",
      description: "Streamline your insurance claims with our expert processing services. We handle everything from initial submission to final approval.",
      color: "bg-[#27A395]"
    },
    {
      icon: FileText,
      title: "Rejected Claims Recovery",
      description: "Don't let rejected claims cost you money. Our specialists review and resubmit claims with higher success rates.",
      color: "bg-[#33A8D3]"
    },
    {
      icon: Clock,
      title: "Claims Delay Resolution",
      description: "Expedite delayed claims with our proven follow-up processes and direct insurer relationships.",
      color: "bg-[#354B62]"
    },
    {
      icon: Headphones,
      title: "24/7 Technical Support",
      description: "Round-the-clock technical assistance for all your healthcare management system needs.",
      color: "bg-[#27A395]"
    },
    {
      icon: Database,
      title: "CMS Portal Development",
      description: "Custom Content Management Systems tailored for healthcare providers with HIPAA compliance.",
      color: "bg-[#33A8D3]"
    },
    {
      icon: FormInput,
      title: "Form Submissions & Processing",
      description: "Automated form processing solutions that reduce manual work and improve accuracy.",
      color: "bg-[#354B62]"
    }
  ]

  const stats = [
    { number: "10000", label: "Claims Processed", suffix: "+" },
    { number: "98", label: "Success Rate", suffix: "%" },
    { number: "500", label: "Healthcare Providers", suffix: "+" },
    { number: "24", label: "Support Hours", suffix: "/7" }
  ]

  const features = [
    // "HIPAA Compliant Systems",
    "Automated Workflow Management",
    "Real-time Claim Tracking",
    "Advanced Analytics & Reporting",
    "Multi-payer Integration",
    "Secure Data Encryption",
    "Mobile-responsive Design",
    "API Integration Support"
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Optimized Hero Section */}
      <section ref={heroRef} className="relative text-white py-20 lg:py-28 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('/img4.jpg')] bg-cover bg-center z-1" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-2" />
        
        <div className="relative z-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white/10 border border-white/20">
                <CheckCircle className="w-4 h-4 mr-2 text-[#27A395]" />
                Trusted by 500+ Healthcare Organizations
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Professional Healthcare 
                <br />
                <span className="text-[#27A395]">Management Solutions</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                Streamline your healthcare operations with enterprise-grade claims processing, custom CMS development, and comprehensive technical support services.
              </p>
              
              <div className="grid grid-cols-3 gap-4 max-w-lg">
                {/* <div className="bg-white/10 border border-white/15 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#27A395]">98%</div>
                  <div className="text-sm text-white/70">Success Rate</div>
                </div>
                <div className="bg-white/10 border border-white/15 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#27A395]">10K+</div>
                  <div className="text-sm text-white/70">Claims Processed</div>
                </div> */}
                <div className="bg-white/10 border border-white/15 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#27A395]">24/7</div>
                  <div className="text-sm text-white/70">Support</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/signup">
                  <button className="bg-[#27A395] hover:bg-[#229b87] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="#services">
                  <button className="border-2 border-white/30 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#354B62] transition-all duration-300 inline-flex items-center justify-center">
                    View Services
                  </button>
                </Link>
              </div>
              
              {/* <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-white/80">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>ISO 27001 Certified</span>
                </div>
              </div> */}
            </div>
            
            <div className="lg:col-span-4 space-y-6 hidden lg:block">
              <div className="bg-white/95 p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-[#354B62] mb-4">Platform Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Healthcare Providers</span>
                    <span className="text-2xl font-bold text-[#354B62]">500+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#27A395] h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">System Uptime</span>
                    <span className="text-2xl font-bold text-[#27A395]">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#33A8D3] h-2 rounded-full" style={{width: '99%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#27A395] text-white p-6 rounded-xl text-center shadow-lg">
                <Shield className="w-12 h-12 mx-auto mb-3" />
                <div className="text-lg font-semibold">Enterprise Security</div>
                <div className="text-sm opacity-90">Bank-level encryption & compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#354B62] mb-4">Our Healthcare Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare management solutions designed to optimize your operations and improve patient outcomes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 group">
                <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#354B62] mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section ref={statsRef} className="py-20 bg-[#354B62] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  <span className="stat-number" data-value={stat.number}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-white/80 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section ref={featuresRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#354B62] mb-6">Why Choose Our Platform?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our comprehensive healthcare management platform offers cutting-edge features designed to streamline your operations and enhance patient care.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#27A395] flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#27A395] to-[#33A8D3] rounded-2xl p-8 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Ready to Transform Your Healthcare Operations?</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6" />
                    <span>Increase efficiency by up to 40%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6" />
                    <span>Trusted by 500+ healthcare providers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6" />
                    <span>Industry-leading compliance standards</span>
                  </div>
                </div>
                <Link href="/signup" className="bg-white text-[#354B62] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-gray-200 rounded-2xl h-[30rem] w-full shadow-lg overflow-hidden">
                {/* Consider using Next.js Image here */}
                <img 
                  src="/img.jpg" 
                  alt="Healthcare professionals working" 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#354B62] mb-6">About Indiem</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over a decade of experience in healthcare administration, we understand the unique challenges faced by healthcare providers. Our mission is to simplify complex processes and help you focus on what matters most - patient care.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of certified professionals combines deep healthcare industry knowledge with cutting-edge technology to deliver solutions that drive real results for your organization.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow">
                  <div className="text-3xl font-bold text-[#27A395] mb-2">10+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow">
                  <div className="text-3xl font-bold text-[#33A8D3] mb-2">50+</div>
                  <div className="text-gray-600">Expert Team Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#354B62] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-white/80">Ready to streamline your healthcare operations? Contact us today.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#27A395] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-white/80">+1 (555) 123-4567</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#33A8D3] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-white/80">info@healthcaresolutions.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#27A395] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-white/80">123 Healthcare Ave, Medical District</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}