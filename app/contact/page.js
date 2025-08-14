"use client"

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Send, User, Building, MessageSquare, ArrowLeft, CheckCircle, Shield, Headphones, Calendar, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
    serviceType: '',
    urgency: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const contactInfoRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current.children, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    )

    // Form animation
    gsap.fromTo(formRef.current.querySelectorAll('.form-group'), 
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        }
      }
    )

    // Contact info animation
    gsap.fromTo(contactInfoRef.current.querySelectorAll('.contact-card'), 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15,
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 80%",
        }
      }
    )

    // Map animation
    gsap.fromTo(mapRef.current, 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%",
        }
      }
    )
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Contact form submitted:', formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: '',
        serviceType: '',
        urgency: 'normal'
      })
    }, 3000)
  }

  const serviceTypes = [
    'Insurance Claims Processing',
    'Rejected Claims Recovery',
    'Claims Delay Resolution',
    'Technical Support',
    'CMS Portal Development',
    'Form Processing',
    'General Inquiry',
    'Partnership Opportunity'
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our healthcare specialists',
      contact: '+1 (555) 123-4567',
      availability: 'Mon-Fri: 8AM-8PM EST',
      color: 'bg-[#27A395]'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message about your needs',
      contact: 'info@healthcaresolutions.com',
      availability: 'Response within 2 hours',
      color: 'bg-[#33A8D3]'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant support from our team',
      contact: 'Available on website',
      availability: '24/7 Support Available',
      color: 'bg-[#354B62]'
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      description: 'Book a consultation with our experts',
      contact: 'Book online',
      availability: 'Flexible scheduling',
      color: 'bg-[#27A395]'
    }
  ]

  const officeLocations = [
    {
      city: 'New York',
      address: '123 Healthcare Ave, Medical District, NY 10001',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 8AM-8PM EST'
    },

  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#27A395] via-[#33A8D3] to-[#354B62] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/img2.jpg" 
            alt="Healthcare professionals" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="text-center">
            <Link href="/" className="inline-flex items-center text-white/90 hover:text-white transition-colors mb-6 group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Ready to transform your healthcare operations? Our team of experts is here to help you streamline your processes and improve patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-white/90">
                <Shield className="w-5 h-5" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Headphones className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Globe className="w-5 h-5" />
                <span>Nationwide Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section ref={contactInfoRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#354B62] mb-4">How Can We Help You?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us. Our healthcare specialists are ready to assist you with any questions or concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className={`${method.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#354B62] mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="space-y-2">
                  <p className="font-semibold text-[#27A395]">{method.contact}</p>
                  <p className="text-sm text-gray-500">{method.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div ref={formRef} className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#354B62] mb-4">Send Us a Message</h2>
                <p className="text-gray-600 text-lg">
                  Fill out the form below and we'll get back to you within 2 hours during business hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll respond within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Enter your organization name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Interest
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      >
                        <option value="">Select a service</option>
                        {serviceTypes.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="normal">Normal - Standard request</option>
                        <option value="high">High - Urgent matter</option>
                        <option value="critical">Critical - Emergency</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Please provide detailed information about your needs..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white py-4 rounded-xl font-semibold text-lg hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information & Image */}
            <div className="space-y-8">
              {/* Professional Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/img.jpg" 
                  alt="Healthcare professionals in consultation" 
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Office Locations */}
              <div className="bg-gradient-to-br from-[#354B62] to-[#27A395] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Office Locations</h3>
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="border-b border-white/20 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-lg mb-2">{office.city} Office</h4>
                      <div className="space-y-2 text-white/90">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span className="text-sm">{office.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">{office.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-800 mb-3">Emergency Support</h3>
                <p className="text-red-700 mb-4">
                  For critical healthcare system issues that require immediate attention:
                </p>
                <div className="flex items-center space-x-3 text-red-800 font-semibold">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 911-HELP</span>
                </div>
                <p className="text-red-600 text-sm mt-2">Available 24/7 for emergency support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section ref={mapRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#354B62] mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">Visit our headquarters or any of our regional offices</p>
          </div>
          
          <div className="bg-gray-400 rounded-3xl shadow-2xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 h-96">
              <img 
                src="/img3.jpg" 
                alt="HealthCare Solutions headquarters building" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">HealthCare Solutions Headquarters</h3>
                  <p className="text-white/90">123 Healthcare Ave, Medical District, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
