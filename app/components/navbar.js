"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEnterpriseOpen, setIsEnterpriseOpen] = useState(false)
  const [isPersonalOpen, setIsPersonalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const enterpriseTimeoutRef = useRef(null)
  const personalTimeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Clear timeouts on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current)
      if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current)
    }
  }, [])

  const enterpriseSolutions = [
    { name: '360 Digital Solutions', href: '#enterprise-health-claim' },
    { name: 'Geniune Cashless', href: '#enterprise-cashless' },
     { name: 'Rejection Claims' , href: '#enterprise-cashless' },
        { name: 'Pre-authorization Approval' , href: '#enterprise-cashless' }
  ]

  const personalSolutions = [
    { name: 'Health Claim Reimbursement', href: '#personal-health-claim' },
    { name: 'Rejected Claims Recovery', href: '#rejected-claims' },
    { name: 'Claims Delay Resolution', href: '#claims-delay' },
    { name: 'Claim Short-Settled', href: '#short-settled' }
  ]

  // Handlers for Enterprise dropdown with delayed close
  const openEnterpriseDropdown = () => {
    if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current)
    setIsEnterpriseOpen(true)
    setIsPersonalOpen(false) // Close other dropdown
  }

  const closeEnterpriseDropdown = () => {
    enterpriseTimeoutRef.current = setTimeout(() => {
      setIsEnterpriseOpen(false)
    }, 200) // 200ms delay before closing
  }

  const keepEnterpriseOpen = () => {
    if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current)
    setIsEnterpriseOpen(true)
  }

  // Handlers for Personal dropdown with delayed close
  const openPersonalDropdown = () => {
    if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current)
    setIsPersonalOpen(true)
    setIsEnterpriseOpen(false) // Close other dropdown
  }

  const closePersonalDropdown = () => {
    personalTimeoutRef.current = setTimeout(() => {
      setIsPersonalOpen(false)
    }, 200) // 200ms delay before closing
  }

  const keepPersonalOpen = () => {
    if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current)
    setIsPersonalOpen(true)
  }

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
            
            <Link href="/login" className="text-[#354B62] hover:text-[#27A395] transition-colors font-medium">
              Login
            </Link>
            
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white px-6 py-2 rounded-lg font-medium hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign Up
            </Link>
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
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}