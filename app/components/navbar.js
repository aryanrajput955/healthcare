"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User, ChevronRight } from "lucide-react";
import useAuthStore from "../lib/authstore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnterpriseOpen, setIsEnterpriseOpen] = useState(false);
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isUserJourneyOpen, setIsUserJourneyOpen] = useState(false);
  const [isCashlessJourneyOpen, setIsCashlessJourneyOpen] = useState(false);
  const [isReimbursementJourneyOpen, setIsReimbursementJourneyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const enterpriseTimeoutRef = useRef(null);
  const personalTimeoutRef = useRef(null);

  const { user, token, initializeAuth, clearAuth } = useAuthStore();

  // -----------------------------------------------------------------------
  // 1. Initialize auth & scroll detection (only for main navbar)
  // -----------------------------------------------------------------------
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -----------------------------------------------------------------------
  // 2. Cleanup timeouts
  // -----------------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current);
      if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current);
    };
  }, []);

  // -----------------------------------------------------------------------
  // 3. Dropdown handlers
  // -----------------------------------------------------------------------
  const openEnterprise = () => {
    if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current);
    setIsEnterpriseOpen(true);
    setIsPersonalOpen(false);
  };
  const closeEnterprise = () => {
    enterpriseTimeoutRef.current = setTimeout(() => setIsEnterpriseOpen(false), 200);
  };
  const keepEnterprise = () => {
    if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current);
  };

  const openPersonal = () => {
    if (enterpriseTimeoutRef.current) clearTimeout(enterpriseTimeoutRef.current);
    setIsPersonalOpen(true);
    setIsEnterpriseOpen(false);
  };
  const closePersonal = () => {
    personalTimeoutRef.current = setTimeout(() => setIsPersonalOpen(false), 200);
  };
  const keepPersonal = () => {
    if (personalTimeoutRef.current) clearTimeout(personalTimeoutRef.current);
  };

  const toggleSideNav = () => setIsSideNavOpen((v) => !v);

  // -----------------------------------------------------------------------
  // 4. Menu data
  // -----------------------------------------------------------------------
  const enterpriseSolutions = [
    { name: "Health Claims Cashless", href: "/health-claim-cashless" },
    { name: "Pre-authorization Approval", href: "/pre-authorization-approval" },
  ];

  const personalSolutions = [
    { name: "Health Claim Reimbursement", href: "/health-claim-reimbursement" },
    { name: "Rejected Claims Recovery", href: "/rejected-claims-recovery" },
    { name: "Claims Delay Resolution", href: "/claim-delay-resolution" },
    { name: "Claim Short-Settled", href: "/claim-short-settled" },
  ];

  const userJourney = [
    { name: "Profile Setup", href: "#user-journey-profile" },
    { name: "Health Records", href: "#user-journey-records" },
    { name: "Appointments", href: "#user-journey-appointments" },
  ];

  const cashlessJourney = [
    { name: "Cashless Claims", href: "#cashless-journey-claims" },
    { name: "Hospital Network", href: "#cashless-journey-network" },
    { name: "Approval Process", href: "#cashless-journey-approval" },
  ];

  const reimbursementJourney = [
    { name: "Submit Receipts", href: "#reimbursement-journey-receipts" },
    { name: "Track Claims", href: "#reimbursement-journey-track" },
    { name: "Reimbursement Status", href: "#reimbursement-journey-status" },
  ];

  // -----------------------------------------------------------------------
  // 5. Render
  // -----------------------------------------------------------------------
  return (
    <>
      {/* MAIN NAVBAR – blur only when not scrolled */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img src="/claimstruelogo.png" alt="logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-[#354B62]">ClaimTrue</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Enterprise */}
              <div className="relative">
                <button
                  onMouseEnter={openEnterprise}
                  onMouseLeave={closeEnterprise}
                  className="flex items-center text-[#354B62] hover:text-[#27A395] transition-colors font-medium py-2"
                >
                  Hospital Solutions
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      isEnterpriseOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isEnterpriseOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50"
                    onMouseEnter={keepEnterprise}
                    onMouseLeave={closeEnterprise}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-[#354B62] uppercase tracking-wider">
                        Hospital Solutions
                      </h3>
                    </div>
                    {enterpriseSolutions.map((s, i) => (
                      <Link
                        key={i}
                        href={s.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#27A395]/10 hover:to-[#33A8D3]/10 hover:text-[#27A395] transition-all duration-200 group"
                        onClick={() => setIsEnterpriseOpen(false)}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#27A395] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-3"></div>
                        <span className="font-medium">{s.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal */}
              <div className="relative">
                <button
                  onMouseEnter={openPersonal}
                  onMouseLeave={closePersonal}
                  className="flex items-center text-[#354B62] hover:text-[#27A395] transition-colors font-medium py-2"
                >
                  Individual Solutions
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      isPersonalOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isPersonalOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50"
                    onMouseEnter={keepPersonal}
                    onMouseLeave={closePersonal}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-[#354B62] uppercase tracking-wider">
                        Individual Solutions
                      </h3>
                    </div>
                    {personalSolutions.map((s, i) => (
                      <Link
                        key={i}
                        href={s.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#27A395]/10 hover:to-[#33A8D3]/10 hover:text-[#27A395] transition-all duration-200 group"
                        onClick={() => setIsPersonalOpen(false)}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#27A395] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-3"></div>
                        <span className="font-medium">{s.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about-us" className="text-[#354B62] hover:text-[#27A395] transition-colors font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-[#354B62] hover:text-[#27A395] transition-colors font-medium">
                Contact
              </Link>

              {/* Auth */}
              {token ? (
                <button
                  onClick={toggleSideNav}
                  className="flex items-center cursor-pointer hover:scale-105 ease-in  text-[#354B62] hover:text-[#27A395] transition-colors font-medium"
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

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden text-[#354B62] hover:text-[#27A395] transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>

              {/* Enterprise Mobile */}
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsEnterpriseOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-left text-[#354B62] hover:text-[#27A395] font-medium"
                >
                  Enterprise Solutions
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isEnterpriseOpen ? "rotate-180" : ""}`} />
                </button>
                {isEnterpriseOpen && (
                  <div className="mt-2 pl-4 space-y-1 bg-gray-50 rounded-lg p-2">
                    {enterpriseSolutions.map((s, i) => (
                      <Link
                        key={i}
                        href={s.href}
                        className="flex items-center py-2 text-sm text-gray-600 hover:text-[#27A395]"
                        onClick={() => {
                          setIsOpen(false);
                          setIsEnterpriseOpen(false);
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#27A395] mr-2"></div>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Mobile */}
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsPersonalOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-left text-[#354B62] hover:text-[#27A395] font-medium"
                >
                  Personal Solutions
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isPersonalOpen ? "rotate-180" : ""}`} />
                </button>
                {isPersonalOpen && (
                  <div className="mt-2 pl-4 space-y-1 bg-gray-50 rounded-lg p-2">
                    {personalSolutions.map((s, i) => (
                      <Link
                        key={i}
                        href={s.href}
                        className="flex items-center py-2 text-sm text-gray-600 hover:text-[#27A395]"
                        onClick={() => {
                          setIsOpen(false);
                          setIsPersonalOpen(false);
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#27A395] mr-2"></div>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about-us" className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] font-medium" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] font-medium" onClick={() => setIsOpen(false)}>
                Contact
              </Link>

              {token ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    toggleSideNav();
                  }}
                  className="block w-full cursor-pointer text-left px-3 py-2 text-[#354B62] hover:text-[#27A395] font-medium"
                >
                  Profile
                </button>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-[#354B62] hover:text-[#27A395] font-medium" onClick={() => setIsOpen(false)}>
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
      </nav>

      {/* SIDE NAVBAR – ALWAYS SOLID, ALWAYS VISIBLE */}
      {isSideNavOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleSideNav}
          />
          {/* Panel */}
          <div className="relative w-80 bg-white h-full shadow-2xl flex flex-col overflow-y-auto p-6 rounded-l-xl">
            <button
              onClick={toggleSideNav}
              className="absolute top-6 right-6 text-[#354B62] hover:text-[#27A395] p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#27A395]"
            >
              <X class逝Name="h-6 w-6" />
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-[#27A395] to-[#33A8D3] rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#354B62]">{user?.name || "User"}</h3>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </div>

            {/* Journey Sections */}
            <div className="space-y-6 flex-1">
              {/* User Journey */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsUserJourneyOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-left text-[#354B62] hover:text-[#27A395] font-semibold py-3 px-2 rounded-lg hover:bg-gray-50"
                >
                  User Journey
                  <ChevronDown className={`h-5 w-5 transition-transform ${isUserJourneyOpen ? "rotate-180" : ""}`} />
                </button>
                {isUserJourneyOpen && (
                  <div className="ml-4 space-y-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    {userJourney.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#27A395] group px-2 hover:bg-white rounded-md"
                        onClick={() => {
                          setIsSideNavOpen(false);
                          setIsUserJourneyOpen(false);
                        }}
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#27A395] opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Cashless Journey */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsCashlessJourneyOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-left text-[#354B62] hover:text-[#27A395] font-semibold py-3 px-2 rounded-lg hover:bg-gray-50"
                >
                  Cashless Journey
                  <ChevronDown className={`h-5 w-5 transition-transform ${isCashlessJourneyOpen ? "rotate-180" : ""}`} />
                </button>
                {isCashlessJourneyOpen && (
                  <div className="ml-4 space-y-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    {cashlessJourney.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#27A395] group px-2 hover:bg-white rounded-md"
                        onClick={() => {
                          setIsSideNavOpen(false);
                          setIsCashlessJourneyOpen(false);
                        }}
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#27A395] opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Reimbursement Journey */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsReimbursementJourneyOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-left text-[#354B62] hover:text-[#27A395] font-semibold py-3 px-2 rounded-lg hover:bg-gray-50"
                >
                  Reimbursement Journey
                  <ChevronDown className={`h-5 w-5 transition-transform ${isReimbursementJourneyOpen ? "rotate-180" : ""}`} />
                </button>
                {isReimbursementJourneyOpen && (
                  <div className="ml-4 space-y-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    {reimbursementJourney.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#27A395] group px-2 hover:bg-white rounded-md"
                        onClick={() => {
                          setIsSideNavOpen(false);
                          setIsReimbursementJourneyOpen(false);
                        }}
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#27A395] opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Logout */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  clearAuth();
                  setIsSideNavOpen(false);
                }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}