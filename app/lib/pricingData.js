import { User, Stethoscope, Hospital, Building2 } from 'lucide-react';

export const personalPlan = {
  id: 'personal',
  title: "Personal Protection Plan",
  price: "₹499",
  period: "/year",
  target: "Individual Policyholders",
  patients: "1Person",
  subtext: "Comprehensive coverage for individuals and families protecting their health claims.",
  features: [
    "Pre-Submission Claim Audit",
    "Medical Bill Verification",
    "Policy Coverage Validation",
    "Documentation Completeness Check",
    "Policy Purchase Assistance",
    "Free Claim Submission Guidance",
    "Special Assistance for Senior Citizens",
    "Discounted Claim Processing (upto 30%)",
  ],
  buttonText: "GET STARTED",
  isPopular: true,
  color: 'from-[#27A395] to-[#33A8D3]'
};

export const hospitalPlans = [
  {
    id: 'starter',
    title: "STARTER",
    price: "₹1,499",
    period: "/mo",
    target: "Small Clinics",
    patients: "Up to 10 patients",
    additionalRate: "₹169 per patient",
    features: [
      "Pre-Submission Claim Audit",
      "Medical Bill Verification",
      "Policy Coverage Validation",
      "Documentation Completeness Check",
      "Claim File Organization & Tracking",
      "Compliance Verification",
      "Proactive Rejection Risk Correction",
    ],
    buttonText: "REQUEST DEMO",
    isPopular: false,
    color: 'from-[#27A395] to-[#1e293b]'
  },
  {
    id: 'enterprise',
    title: "ENTERPRISE",
    price: "₹3,999",
    period: "/mo",
    target: "Growing Hospitals",
    patients: "Up to 25 patients",
    additionalRate: "₹169 per patient",
    features: [
      "Pre-Submission Claim Audit",
      "Medical Bill Verification",
      "Policy Coverage Validation",
      "Documentation Completeness Check",
      "Claim File Organization & Tracking",
      "Compliance Verification",
      "Proactive Rejection Risk Correction",
      "Complete File Management System",
      "Digital Patient Documentation Framework",
      "Online Patient Portal for Document Upload",
      "Technical Support for Patients",
      "Free Empanelment Support",
    ],
    buttonText: "REQUEST DEMO",
    isPopular: true,
    color: 'from-[#1e293b] to-[#0f172a]'
  },
  {
    id: 'custom',
    title: "CUSTOM",
    price: "Contact Us",
    period: "",
    target: "Large Institutions",
    patients: "Unlimited",
    additionalRate: "Custom Pricing",
    features: [
      "Unlimited Monthly Patient Files",
      "Full Empanelment Management",
      "Dedicated Team",
      "White-Label Solutions",
      "API Integration",
      "Priority 24/7 Support",
    ],
    buttonText: "REQUEST QUOTE",
    isPopular: false,
    isDark: true,
    color: 'from-[#0f172a] to-black'
  },
];

export const featureGroups = [
  {
    title: 'Audience & Capacity',
    features: ['Target Audience', 'Patients Covered', 'Additional Patient Rate']
  },
  {
    title: 'Core Claim Services',
    features: ['Pre-Submission Claim Audit', 'Medical Bill Verification', 'Policy Coverage Validation', 'Documentation Completeness Check']
  },
  {
    title: 'Advanced Management',
    features: ['Claim File Organization & Tracking', 'Compliance Verification', 'Proactive Rejection Risk Correction']
  },
  {
    title: 'Support & Consultation',
    features: ['Policy Purchase Assistance', 'Free Claim Submission Guidance', 'Special Assistance for Senior Citizens', 'Discounted Claim Processing (upto 30%)', 'Technical Support for Patients', 'Free Empanelment Support']
  },
  {
    title: 'Digital Infrastructure',
    features: ['Complete File Management System', 'Digital Patient Documentation Framework', 'Online Patient Portal for Document Upload']
  }
];
