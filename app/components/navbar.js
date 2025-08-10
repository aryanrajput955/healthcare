"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    { name: 'Insurance Claims Processing', href: '#services' },
    { name: 'Rejected Claims Recovery', href: '#services' },
    { name: 'Claims Delay Resolution', href: '#services' },
    { name: 'Technical Support', href: '#services' },
    { name: 'CMS Portal Development', href: '#services' },
    { name: 'Form Processing', href: '#services' }
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png" // Adjust the path to your logo file
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-[#354B62]">HealthCare Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#354B62] hover:text-[#27A395] transition-colors font-medium">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
              >
                Services
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#27A395] transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.name}
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
              className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white px-6 py-2 rounded-lg font-medium hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300"
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
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center w-full text-left text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
                >
                  Services
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="mt-2 pl-4 space-y-1">
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        href={service.href}
                        className="block py-1 text-sm text-gray-600 hover:text-[#27A395] transition-colors"
                        onClick={() => {
                          setIsOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {service.name}
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
                className="block mx-3 mt-2 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white px-4 py-2 rounded-lg font-medium text-center"
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