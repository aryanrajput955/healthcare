"use client"

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowLeft, Zap, TrendingUp, Database, Shield } from 'lucide-react'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    organizationType: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const sidebarRef = useRef(null)

  useEffect(() => {
    // Container animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    )

    // Form animation
    gsap.fromTo(formRef.current.children, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power3.out" }
    )

    // Sidebar animation
    gsap.fromTo(sidebarRef.current.children, 
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.5, ease: "power3.out" }
    )

    // Floating animation for background elements
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Signup attempt:', formData)
    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const validateStep1 = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.organization.trim() !== '' &&
      formData.organizationType !== ''
    )
  }

  const handleContinue = () => {
    if (validateStep1()) {
      setCurrentStep(2)
    } else {
      // You can add error handling here if needed
      alert('Please fill in all required fields correctly before continuing.')
    }
  }

  const organizationTypes = [
    'Hospital',
    'Clinic',
    'Private Practice',
    'Insurance Company',
    'Healthcare Network',
    'Medical Center',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#33A8D3] via-[#27A395] to-[#354B62] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-element absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 left-32 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        <div className="floating-element absolute bottom-32 right-40 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="floating-element absolute bottom-20 left-20 w-28 h-28 bg-white/8 rounded-full blur-xl"></div>
      </div>
      
      <div ref={containerRef} className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid lg:grid-cols-2">
        {/* Left Side - Info Panel */}
        <div className="bg-gradient-to-br from-[#354B62] to-[#33A8D3] p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 bg-black/10"></div>
          <div ref={sidebarRef} className="relative z-10">
            <div className="mb-8">
              <Zap className="w-16 h-16 mb-6 text-white/90" />
              <h2 className="text-3xl font-bold mb-4">Transform Your Healthcare Operations</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Join thousands of healthcare professionals who trust our platform to streamline their operations and improve patient outcomes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-2 mt-1">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Increase Efficiency</h3>
                  <p className="text-white/80">Boost your claims processing efficiency by up to 40%</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-2 mt-1">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Comprehensive CMS</h3>
                  <p className="text-white/80">Full-featured content management tailored for healthcare</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-2 mt-1">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Enterprise Security</h3>
                  <p className="text-white/80">Bank-level security with HIPAA compliance guaranteed</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-white/80 text-sm">Claims Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-white/80 text-sm">Healthcare Providers</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <p className="text-sm text-white/90 italic">
                "The signup process was seamless, and we were up and running within hours. The platform has exceeded our expectations."
              </p>
              <div className="mt-3">
                <p className="font-semibold">Michael Chen, MD</p>
                <p className="text-white/80 text-sm">Director, Metro Health Systems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
          <div ref={formRef}>
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-[#354B62] hover:text-[#27A395] transition-colors mb-6 group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-[#354B62] mb-3">Create Your Account</h1>
              <p className="text-gray-600 text-lg">Start your healthcare management journey today</p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Account Setup</span>
                <span className="text-sm font-medium text-[#27A395]">Step {currentStep} of 2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                        First Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white ${
                            formData.firstName.trim() === '' ? 'border-gray-200' : 'border-green-200'
                          }`}
                          placeholder="First name"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                        Last Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white ${
                            formData.lastName.trim() === '' ? 'border-gray-200' : 'border-green-200'
                          }`}
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white ${
                          formData.email.trim() === '' ? 'border-gray-200' : 'border-green-200'
                        }`}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="organization" className="block text-sm font-semibold text-gray-700">
                        Organization Name
                      </label>
                      <div className="relative group">
                        <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white ${
                            formData.organization.trim() === '' ? 'border-gray-200' : 'border-green-200'
                          }`}
                          placeholder="Your healthcare organization"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="organizationType" className="block text-sm font-semibold text-gray-700">
                        Organization Type
                      </label>
                      <select
                        id="organizationType"
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleChange}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white ${
                          formData.organizationType === '' ? 'border-gray-200' : 'border-green-200'
                        }`}
                        required
                      >
                        <option value="">Select type</option>
                        {organizationTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!validateStep1()}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:shadow-lg ${
                      validateStep1()
                        ? 'bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white hover:from-[#33A8D3] hover:to-[#27A395] hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Security Setup
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Create Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-700 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        At least 8 characters
                      </li>
                      <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        One uppercase letter
                      </li>
                      <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        One number
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-[#27A395] focus:ring-[#27A395] focus:ring-2"
                      required
                    />
                    <label htmlFor="agreeToTerms" className="text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <Link href="#" className="text-[#27A395] hover:text-[#33A8D3] font-semibold transition-colors hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="text-[#27A395] hover:text-[#33A8D3] font-semibold transition-colors hover:underline">
                        Privacy Policy
                      </Link>
                      . I understand that my data will be processed in accordance with HIPAA regulations.
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white py-4 rounded-xl font-semibold text-lg hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            {currentStep === 1 && (
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-[#27A395] hover:text-[#33A8D3] font-semibold transition-colors hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
