"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Phone, Mail, MapPin, Shield, FileText, Clock, Headphones, Database, FormInput, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(footerRef.current.querySelectorAll('.footer-section'), 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      }
    )
  }, [])

  const services = [
    { name: 'Insurance Claims Processing', href: '#services', icon: Shield },
    { name: 'Rejected Claims Recovery', href: '#services', icon: FileText },
    { name: 'Claims Delay Resolution', href: '#services', icon: Clock },
    { name: 'Technical Support', href: '#services', icon: Headphones },
    { name: 'CMS Portal Development', href: '#services', icon: Database },
    { name: 'Form Processing', href: '#services', icon: FormInput }
  ]

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#team' },
    { name: 'Careers', href: '#careers' },
    { name: 'Blog', href: '#blog' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Resources', href: '#resources' }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    // { name: 'HIPAA Compliance', href: '#hipaa' },
    { name: 'Security', href: '#security' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'Accessibility', href: '#accessibility' }
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram }
  ]

  return (
    <footer ref={footerRef} className="bg-[#354B62] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#27A395]/20 to-[#33A8D3]/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="footer-section lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="/logo.png" // Adjust the path to your logo file
                  alt="Logo"
                  className=" w-12 h-12  object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold">Indiem</h3>
                  <p className="text-white/70 text-sm">Professional Healthcare Management</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Streamlining healthcare operations with cutting-edge technology and expert support. 
                Trusted by 500+ healthcare providers nationwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#27A395]" />
                  <span className="text-white/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#27A395]" />
                  <span className="text-white/80">hello@indiem.tech</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-12 h-9  sm:w-20 h-10 text-[#27A395]" />
                  <span className="text-white/80 lowercase ">OFFICE NO – 101, FIRST FLOOR , AT PLOT NO. A-61, SECTOR-16, SEVEN WONDER BUSINESS CENTER, SECTOR-16, NOIDA, UP-201301</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4 className="text-lg font-semibold mb-6 text-white">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      href={service.href} 
                      className="flex items-center space-x-2 text-white/70 hover:text-[#27A395] transition-colors group"
                    >
                      <service.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-white/70 hover:text-[#27A395] transition-colors flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Certifications */}
              {/* <div className="mt-8">
                <h5 className="font-semibold mb-3 text-white">Certifications</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#27A395] text-white text-xs px-2 py-1 rounded">HIPAA Compliant</span>
                  <span className="bg-[#33A8D3] text-white text-xs px-2 py-1 rounded">SOC 2 Type II</span>
                  <span className="bg-[#27A395] text-white text-xs px-2 py-1 rounded">ISO 27001</span>
                </div>
              </div> */}
            </div>

            {/* Newsletter & Legal */}
            <div className="footer-section">
              <h4 className="text-lg font-semibold mb-6 text-white">Stay Updated</h4>
              <p className="text-white/70 mb-4">
                Get the latest healthcare industry insights and platform updates.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#27A395] focus:border-transparent"
                  />
                  <button className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] px-4 py-2 rounded-r-lg hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Legal Links */}
              <div className="mb-6">
                <h5 className="font-semibold mb-3 text-white">Legal</h5>
                <ul className="space-y-2">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-white/60 hover:text-white/80 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="font-semibold mb-3 text-white">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#27A395] transition-colors group"
                    >
                      <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-white/60">
                <span>&copy; 2025 Indiem. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-white/60">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>for healthcare professionals</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-white/60">
                {/* <span>🔒 Secure & HIPAA Compliant</span> */}
                {/* <span>•</span> */}
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-center">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Emergency Support:</span>
                <span>+1 (555) 911-HELP</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Available 24/7 for critical healthcare systems</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}