"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, User, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import useAuthStore from '../lib/authstore' // Adjust path as needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEnterpriseOpen, setIsEnterpriseOpen] = useState(false)
  const [isPersonalOpen, setIsPersonalOpen] = useState(false)
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [isUserJourneyOpen, setIsUserJourneyOpen] = useState(false)
  const [isCashlessJourneyOpen, setIsCashlessJourneyOpen] = useState(false)
  const [isReimbursementJourneyOpen, setIsReimbursementJourneyOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const enterpriseTimeoutRef = useRef(null)
  const personalTimeoutRef = useRef(null)
  const sideNavRef = useRef(null)

  // Use Zustand store for authentication
  const { user, token, initializeAuth, clearAuth } = useAuthStore()

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Clear timeouts on component unmount
  useEffect(() => {
    return () => {
      if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current)
      if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current)
    }
  }, [])

  // GSAP animation for side navbar
  useEffect(() => {
    if (sideNavRef.current) {
      gsap.fromTo(
        sideNavRef.current,
        { x: '100%' },
        { x: 0, duration: 0.3, ease: 'power3.out' }
      )
    }
  }, [isSideNavOpen])

  const enterpriseSolutions = [
    { name: '360 Digital Solutions', href: '#enterprise-health-claim' },
    { name: 'Genuine Cashless', href: '/genuine-cashless-rejection-appeal' },
    { name: 'Health Claims Cashless', href: '/health-claim-cashless' },
    { name: 'Rejection Claims', href: '#enterprise-cashless' },
    { name: 'Pre-authorization Approval', href: '/pre-authorization-approval' }
  ]

  const personalSolutions = [
    { name: 'Health Claim Reimbursement', href: '/health-claim-reimbursement' },
    { name: 'Rejected Claims Recovery', href: '/rejected-claims-recovery' },
    { name: 'Claims Delay Resolution', href: '/claim-delay-resolution' },
    { name: 'Claim Short-Settled', href: '/claim-short-settled' }
  ]

  const userJourney = [
    { name: 'Profile Setup', href: '#user-journey-profile' },
    { name: 'Health Records', href: '#user-journey-records' },
    { name: 'Appointments', href: '#user-journey-appointments' }
  ]

  const cashlessJourney = [
    { name: 'Cashless Claims', href: '#cashless-journey-claims' },
    { name: 'Hospital Network', href: '#cashless-journey-network' },
    { name: 'Approval Process', href: '#cashless-journey-approval' }
  ]

  const reimbursementJourney = [
    { name: 'Submit Receipts', href: '#reimbursement-journey-receipts' },
    { name: 'Track Claims', href: '#reimbursement-journey-track' },
    { name: 'Reimbursement Status', href: '#reimbursement-journey-status' }
  ]

  // Handlers for Enterprise dropdown
  const openEnterpriseDropdown = () => {
    if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current)
    setIsEnterpriseOpen(true)
    setIsPersonalOpen(false)
  }

  const closeEnterpriseDropdown = () => {
    enterpriseTimeoutRef.current = setTimeout(() => {
      setIsEnterpriseOpen(false)
    }, 200)
  }

  const keepEnterpriseOpen = () => {
    if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current)
    setIsEnterpriseOpen(true)
  }

  // Handlers for Personal dropdown
  const openPersonalDropdown = () => {
    if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current)
    setIsPersonalOpen(true)
    setIsEnterpriseOpen(false)
  }

  const closePersonalDropdown = () => {
    personalTimeoutRef.current = setTimeout(() => {
      setIsPersonalOpen(false)
    }, 200)
  }

  const keepPersonalOpen = () => {
    if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current)
    setIsPersonalOpen(true)
  }

  // Handlers for side navbar
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  // Dynamic side nav background class
  const sideNavBgClass = scrolled ? 'bg-white shadow-2xl' : 'bg-white/95 backdrop-blur-sm'

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-[#354B62]">Indiem</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Enterprise Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={openEnterpriseDropdown}
                onMouseEnter={openEnterpriseDropdown}
                onMouseLeave={closeEnterpriseDropdown}
                className="flex items-center text-[#354B62] hover:text-[#27A395] transition-colors font-medium py-2"
              >
                Enterprise Solutions
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isEnterpriseOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isEnterpriseOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50"
                  onMouseEnter={keepEnterpriseOpen}
                  onMouseLeave={closeEnterpriseDropdown}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-[#354B62] uppercase tracking-wider">Enterprise Solutions</h3>
                  </div>
                  {enterpriseSolutions.map((solution, index) => (
                    <Link
                      key={index}
                      href={solution.href}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#27A395]/10 hover:to-[#33A8D3]/10 hover:text-[#27A395] transition-all duration-200 group"
                      onClick={() => setIsEnterpriseOpen(false)}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#27A395] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-3"></div>
                      <span className="font-medium">{solution.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Personal Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={openPersonalDropdown}
                onMouseEnter={openPersonalDropdown}
                onMouseLeave={closePersonalDropdown}
                className="flex items-center text-[#354B62] hover:text-[#27A395] transition-colors font-medium py-2"
              >
                Personal Solutions
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isPersonalOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isPersonalOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50"
                  onMouseEnter={keepPersonalOpen}
                  onMouseLeave={closePersonalDropdown}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-[#354B62] uppercase tracking-wider">Personal Solutions</h3>
                  </div>
                  {personalSolutions.map((solution, index) => (
                    <Link
                      key={index}
                      href={solution.href}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#27A395]/10 hover:to-[#33A8D3]/10 hover:text-[#27A395] transition-all duration-200 group"
                      onClick={() => setIsPersonalOpen(false)}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#27A395] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-3"></div>
                      <span className="font-medium">{solution.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="#about" className="text-[#354B62] hover:text-[#27A395] transition-colors font-medium">
              About Us
            </Link>
            
            <Link href="/contact" className="text-[#354B62] hover:text-[#27A395] transition-colors font-medium">
              Contact
            </Link>

            {/* Conditional rendering based on authentication */}
            {token ? (
              <button
                onClick={toggleSideNav}
                className="flex items-center text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
              >
                <User className="w-6 h-6" />
              </button>
            ) : (
              <>
                <Link href="/login" className="text-[#354B62] hover:text-[#27A395] transition-colors font-medium">
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white px-6 py-2 rounded-lg font-medium hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#354B62] hover:text-[#27A395] transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {/* Enterprise Solutions Mobile */}
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsEnterpriseOpen(!isEnterpriseOpen)}
                  className="flex items-center w-full text-left text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                >
                  Enterprise Solutions
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isEnterpriseOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isEnterpriseOpen && (
                  <div className="mt-2 pl-4 space-y-1 bg-gray-50 rounded-lg p-2">
                    {enterpriseSolutions.map((solution, index) => (
                      <Link
                        key={index}
                        href={solution.href}
                        className="flex items-center py-2 text-sm text-gray-600 hover:text-[#27A395] transition-colors"
                        onClick={() => {
                          setIsOpen(false)
                          setIsEnterpriseOpen(false)
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#27A395] mr-2"></div>
                        {solution.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Solutions Mobile */}
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsPersonalOpen(!isPersonalOpen)}
                  className="flex items-center w-full text-left text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                >
                  Personal Solutions
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isPersonalOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPersonalOpen && (
                  <div className="mt-2 pl-4 space-y-1 bg-gray-50 rounded-lg p-2">
                    {personalSolutions.map((solution, index) => (
                      <Link
                        key={index}
                        href={solution.href}
                        className="flex items-center py-2 text-sm text-gray-600 hover:text-[#27A395] transition-colors"
                        onClick={() => {
                          setIsOpen(false)
                          setIsPersonalOpen(false)
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#27A395] mr-2"></div>
                        {solution.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link
                href="#about"
                className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              
              <Link
                href="/contact"
                className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Conditional rendering for mobile */}
              {token ? (
                <button
                  onClick={() => {
                    setIsOpen(false)
                    toggleSideNav()
                  }}
                  className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                >
                  Profile
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block mx-3 mt-2 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white px-4 py-2 rounded-lg font-medium text-center shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Side Navbar (Profile Section) */}
      {isSideNavOpen && (
        <div
          ref={sideNavRef}
          className={`${sideNavBgClass} fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md border-l border-gray-200 shadow-2xl z-50 flex flex-col overflow-y-auto rounded-l-xl p-6 transition-all duration-300`}
        >
          <button
            onClick={toggleSideNav}
            className="absolute top-6 right-6 text-[#354B62] hover:text-[#27A395] transition-colors focus:outline-none focus:ring-2 focus:ring-[#27A395] rounded-full p-1"
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-r from-[#27A395] to-[#33A8D3] rounded-full flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#354B62]">{user?.name || 'User'}</h3>
              <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          {/* Journey Sections */}
          <div className="space-y-6 flex-1">
            <div className="space-y-1">
              <button
                onClick={() => setIsUserJourneyOpen(!isUserJourneyOpen)}
                className="flex items-center justify-between w-full text-left text-[#354B62] hover:text-[#27A395] transition-colors font-semibold py-3 px-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#27A395] focus:ring-offset-1"
              >
                <span>User Journey</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isUserJourneyOpen ? 'rotate-180' : ''}`} />
              </button>
              {isUserJourneyOpen && (
                <div className="ml-4 space-y-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                  {userJourney.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#27A395] transition-colors group rounded-md px-2 hover:bg-white"
                      onClick={() => {
                        setIsSideNavOpen(false)
                        setIsUserJourneyOpen(false)
                      }}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#27A395] transition-colors opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <button
                onClick={() => setIsCashlessJourneyOpen(!isCashlessJourneyOpen)}
                className="flex items-center justify-between w-full text-left text-[#354B62] hover:text-[#27A395] transition-colors font-semibold py-3 px-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#27A395] focus:ring-offset-1"
              >
                <span>Cashless Journey</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isCashlessJourneyOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCashlessJourneyOpen && (
                <div className="ml-4 space-y-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                  {cashlessJourney.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#27A395] transition-colors group rounded-md px-2 hover:bg-white"
                      onClick={() => {
                        setIsSideNavOpen(false)
                        setIsCashlessJourneyOpen(false)
                      }}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#27A395] transition-colors opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <button
                onClick={() => setIsReimbursementJourneyOpen(!isReimbursementJourneyOpen)}
                className="flex items-center justify-between w-full text-left text-[#354B62] hover:text-[#27A395] transition-colors font-semibold py-3 px-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#27A395] focus:ring-offset-1"
              >
                <span>Reimbursement Journey</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isReimbursementJourneyOpen ? 'rotate-180' : ''}`} />
              </button>
              {isReimbursementJourneyOpen && (
                <div className="ml-4 space-y-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                  {reimbursementJourney.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#27A395] transition-colors group rounded-md px-2 hover:bg-white"
                      onClick={() => {
                        setIsSideNavOpen(false)
                        setIsReimbursementJourneyOpen(false)
                      }}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#27A395] transition-colors opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                clearAuth()
                setIsSideNavOpen(false)
              }}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}