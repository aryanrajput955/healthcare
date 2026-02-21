"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TermsOfService() {
  const termsRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = termsRef.current?.querySelectorAll('.terms-section');
      if (!sections) return;

      gsap.fromTo(
        sections,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: termsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#354B62] mb-4 text-center">Terms of Service</h1>
          <p className="text-xl font-bold text-[#354B62] mb-8 text-center">PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING OUR SERVICES</p>
          <p className="text-sm text-[#354B62] mb-12 text-center">Effective Date: November 2, 2025</p>

          <div ref={termsRef} className="space-y-12">
            {/* Introduction */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">Introduction</h2>
              <p className="text-[#354B62] leading-relaxed">
                These Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;, or &quot;Agreement&quot;) constitute a legally binding agreement between you and Indiem (hereinafter referred to as &quot;the Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company registered under the Companies Act, 2013, having its registered office at Office No – 101, First Floor, Plot No. A-61, Sector-16, Noida, UP-201301.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                These Terms govern your access to and use of:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Our website www.indiem.tech (&quot;Website&quot;)</li>
                <li>Our mobile applications (if applicable)</li>
                <li>All related services, products, and content (collectively referred to as &quot;Services&quot;)</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                By accessing or using our Services, you agree to be bound by these Terms of Service and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you must not access or use our Services.
              </p>
            </div>

            {/* Definitions */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">1. Definitions</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">&quot;User&quot; or &quot;You&quot; means:</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Hospitals that access or use our Services for health insurance claim management</li>
                <li>Patients who share their information with us or avail our claim assistance services</li>
                <li>Any individual or entity that visits or uses our Website</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">&quot;Services&quot; means all services provided by the Company, including but not limited to:</h3>
              <p className="text-[#354B62] leading-relaxed mb-2">For Hospitals:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Health Claim Cashless processing</li>
                <li>Genuine Cashless Rejection Claims management</li>
                <li>Pre-authorization approval assistance</li>
                <li>Claim desk management</li>
                <li>Hospital MIS and analytics</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">For Patients:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Health Claim Reimbursement processing</li>
                <li>Rejected Claims Recovery</li>
                <li>Claims Delay Resolution</li>
                <li>Claim Short-Settlement recovery</li>
                <li>Documentation assistance</li>
                <li>Insurance company liaison</li>
              </ul>

              <p className="text-[#354B62] leading-relaxed mt-4">
                &quot;Applicable Law&quot; means any statute, law, regulation, ordinance, rule, judgment, order, decree, clearance, approval, directive, guideline, policy, requirement, or other governmental restriction having jurisdiction over the subject matter of these Terms.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                &quot;Personal Information&quot; and &quot;SPDI&quot; have the meanings assigned to them in our Privacy Policy.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                &quot;Third Party&quot; includes insurance companies, Third Party Administrators (TPAs), hospitals, diagnostic centers, and other service providers.
              </p>
            </div>

            {/* Acceptance of Terms */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">2. Acceptance of Terms</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">2.1 Agreement to Terms</h3>
              <p className="text-[#354B62] leading-relaxed">
                By accessing or using our Services, you acknowledge that:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-[#354B62]">
                <li>You have read, understood, and agree to be bound by these Terms</li>
                <li>You have read and agree to our Privacy Policy</li>
                <li>You are at least 18 years of age and legally capable of entering into binding contracts</li>
                <li>If you are accessing on behalf of an organization, you have the authority to bind that organization to these Terms</li>
              </ol>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">2.2 Modifications to Terms</h3>
              <p className="text-[#354B62] leading-relaxed">
                We reserve the right to modify these Terms at any time for legitimate business purposes, including compliance with legal and regulatory frameworks. When we make changes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>We will post the modified Terms on our Website</li>
                <li>We will update the &quot;Effective Date&quot; at the top</li>
                <li>We may notify you via email or Website notification for material changes</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                Your continued use of Services after changes constitutes acceptance of the modified Terms.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                It is your responsibility to review these Terms periodically. If you do not agree to the modified Terms, you must discontinue use of our Services.
              </p>
            </div>

            {/* Eligibility and User Registration */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">3. Eligibility and User Registration</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">3.1 Eligibility Requirements</h3>
              <p className="text-[#354B62] leading-relaxed mb-2">For Hospitals:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Must be a legally registered hospital or healthcare facility in India</li>
                <li>Must have valid registration with appropriate medical and statutory authorities</li>
                <li>Must have authorized representatives with power to bind the hospital</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">For Patients:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Must be 18 years of age or older</li>
                <li>Must have a valid health insurance policy</li>
                <li>Must provide accurate and complete information</li>
                <li>Minors may use Services only under parent/legal guardian supervision</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">3.2 Account Registration</h3>
              <p className="text-[#354B62] leading-relaxed">
                To access certain Services, you must create an account by providing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Complete and accurate registration information</li>
                <li>Valid contact details (email and phone number)</li>
                <li>Identity verification documents</li>
                <li>Any other information reasonably requested by us</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">Account Responsibilities:</h3>
              <p className="text-[#354B62] leading-relaxed">
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Be solely responsible for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use or security breach</li>
                <li>Not create multiple accounts or fake accounts</li>
                <li>Not transfer or share your account with others</li>
                <li>Keep your account information current and accurate</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">Account Termination:</h3>
              <p className="text-[#354B62] leading-relaxed">
                We reserve the right to suspend, deactivate, or terminate your account if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>You breach these Terms</li>
                <li>You provide false or misleading information</li>
                <li>Your account is inactive for an extended period</li>
                <li>Required by law or regulatory authority</li>
                <li>We discontinue Services to all users</li>
              </ul>
            </div>

            {/* Services Description */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">4. Services Description</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">4.1 Hospital Services</h3>
              <p className="text-[#354B62] leading-relaxed mb-2">Cashless Claim Processing:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Pre-authorization request submission</li>
                <li>Document verification and compilation</li>
                <li>Liaison with insurance companies and TPAs</li>
                <li>Query resolution and follow-up</li>
                <li>Approval facilitation</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">Cashless Rejection Management:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Analysis of rejection reasons</li>
                <li>Documentation review and correction</li>
                <li>Appeal preparation and submission</li>
                <li>Follow-up with insurers and TPAs</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">Pre-authorization Approval:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Real-time pre-auth request processing</li>
                <li>Document management and submission</li>
                <li>Multi-level follow-up</li>
                <li>Approval tracking and updates</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">4.2 Patient Services</h3>
              <p className="text-[#354B62] leading-relaxed mb-2">Reimbursement Claim Processing:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Document collection and verification</li>
                <li>Claim form preparation and submission</li>
                <li>Follow-up with insurance companies</li>
                <li>Status tracking and updates</li>
                <li>Payment facilitation</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">Rejected Claim Recovery:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Rejection reason analysis</li>
                <li>Document rectification</li>
                <li>Appeal drafting and submission</li>
                <li>Negotiation with insurance companies</li>
                <li>Claim resubmission</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">Claim Delay Resolution:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Delay reason identification</li>
                <li>Multi-level escalation</li>
                <li>Regular follow-up with insurers and TPAs</li>
                <li>Resolution tracking</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">Short-Settlement Recovery:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Settlement analysis</li>
                <li>Discrepancy identification</li>
                <li>Additional claim submission</li>
                <li>Negotiation for full settlement</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">4.3 Service Limitations</h3>
              <p className="text-[#354B62] leading-relaxed">
                We do NOT:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Sell insurance policies</li>
                <li>Act as an insurance company or TPA</li>
                <li>Guarantee claim approval or specific claim amounts</li>
                <li>Provide medical advice or treatment</li>
                <li>Make payment decisions on behalf of insurance companies</li>
                <li>Have authority to approve or reject claims</li>
              </ul>
            </div>

            {/* User Obligations and Representations */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">5. User Obligations and Representations</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">5.1 Accuracy of Information</h3>
              <p className="text-[#354B62] leading-relaxed">
                You represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>All information provided by you is true, accurate, current, and complete</li>
                <li>You have the right to provide such information</li>
                <li>You will promptly update any changes to your information</li>
                <li>You have not misrepresented your identity or information</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">5.2 Hospital Obligations</h3>
              <p className="text-[#354B62] leading-relaxed">
                Hospitals agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Provide accurate patient information and medical records</li>
                <li>Comply with medical ethics and patient confidentiality requirements</li>
                <li>Cooperate in documentation and verification processes</li>
                <li>Respond promptly to our requests for information</li>
                <li>Maintain proper billing and documentation practices</li>
                <li>Ensure authorized personnel access the Services</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">5.3 Patient Obligations</h3>
              <p className="text-[#354B62] leading-relaxed">
                Patients agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Provide complete and accurate medical and insurance information</li>
                <li>Submit required documents in timely manner</li>
                <li>Cooperate in the claim processing workflow</li>
                <li>Respond to queries and requests for clarification</li>
                <li>Inform us of any changes in insurance coverage or contact details</li>
                <li>Not submit fraudulent or inflated claims</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">5.4 Prohibited Conduct</h3>
              <p className="text-[#354B62] leading-relaxed">
                You shall NOT:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Use Services for any unlawful purpose</li>
                <li>Submit false, fraudulent, or misleading information</li>
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our Services</li>
                <li>Use automated systems (bots, scrapers) without authorization</li>
                <li>Impersonate another person or entity</li>
                <li>Upload viruses, malware, or harmful code</li>
                <li>Engage in any activity that harms our reputation or business</li>
                <li>Use Services to compete with us or develop competing services</li>
                <li>Share confidential information obtained through Services</li>
              </ul>
            </div>

            {/* Fees and Payment */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">6. Fees and Payment</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">6.1 Service Fees</h3>
              <p className="text-[#354B62] leading-relaxed mb-2">Hospital Services: [Specify fee structure - e.g., monthly subscription, per-claim fee, percentage-based]</p>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">Patient Services:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Registration fee: ₹[Amount] (one-time, upon case acceptance)</li>
                <li>Success fee: [X]% + GST of claim amount recovered (payable only upon successful claim resolution)</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">6.2 Payment Terms</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>All fees are in Indian Rupees (INR)</li>
                <li>Fees are non-refundable except as required by law</li>
                <li>Payment must be made through authorized payment methods</li>
                <li>You authorize us to charge the payment method provided</li>
                <li>You are responsible for any applicable taxes</li>
                <li>Late payments may result in service suspension</li>
                <li>We reserve the right to modify fees with reasonable notice</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">6.3 No Upfront Guarantee</h3>
              <p className="text-[#354B62] leading-relaxed">
                We do not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Claim approval or specific claim amounts</li>
                <li>Specific timelines for claim resolution</li>
                <li>Any particular outcome or success rate</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                Payment of fees does not guarantee any specific result but compensates us for our professional services and efforts.
              </p>
            </div>

            {/* Intellectual Property Rights */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">7. Intellectual Property Rights</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">7.1 Company Intellectual Property</h3>
              <p className="text-[#354B62] leading-relaxed">
                All content on our Website and Services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Text, graphics, logos, images, audio, video</li>
                <li>Software, source code, algorithms</li>
                <li>Designs, layout, look and feel</li>
                <li>Trademarks, service marks, trade names</li>
                <li>Databases and compilations</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                are owned by or licensed to the Company and protected by Indian and international intellectual property laws, including copyright, trademark, patent, and trade secret laws.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">7.2 Limited License</h3>
              <p className="text-[#354B62] leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Access and use our Services for their intended purpose</li>
                <li>View and download Website content for personal, non-commercial use</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                You may NOT:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Copy, modify, distribute, or create derivative works</li>
                <li>Reverse engineer or decompile our software</li>
                <li>Remove or modify any copyright or proprietary notices</li>
                <li>Use our intellectual property for commercial purposes without written consent</li>
                <li>Frame or mirror any portion of our Website</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">7.3 User Content</h3>
              <p className="text-[#354B62] leading-relaxed">
                By submitting content (documents, information, feedback) to us, you grant us a worldwide, non-exclusive, royalty-free, perpetual license to use, reproduce, modify, and display such content solely for providing our Services. You represent that you have all necessary rights to grant this license.
              </p>
            </div>

            {/* Confidentiality */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">8. Confidentiality</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">8.1 Confidential Information</h3>
              <p className="text-[#354B62] leading-relaxed">
                Both parties agree to maintain the confidentiality of all confidential information received, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Personal Information and SPDI</li>
                <li>Medical records and health information</li>
                <li>Insurance policy details</li>
                <li>Business information and trade secrets</li>
                <li>Financial information</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">8.2 Use of Confidential Information</h3>
              <p className="text-[#354B62] leading-relaxed">
                Confidential information may only be used for the purposes of providing or receiving Services and shall not be disclosed to third parties except:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>As authorized by you</li>
                <li>As required by law</li>
                <li>To service providers under confidentiality obligations</li>
                <li>To insurance companies and TPAs for claim processing</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">8.3 Security Measures</h3>
              <p className="text-[#354B62] leading-relaxed">
                We implement reasonable security measures to protect confidential information (see Privacy Policy for details). You must also take reasonable precautions to protect your account credentials and information.
              </p>
            </div>

            {/* Disclaimer of Warranties */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">9. Disclaimer of Warranties</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">9.1 &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Basis</h3>
              <p className="text-[#354B62] leading-relaxed">
                OUR SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy, reliability, or completeness of information</li>
                <li>Uninterrupted or error-free service</li>
                <li>Security or freedom from viruses</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">9.2 No Medical or Legal Advice</h3>
              <p className="text-[#354B62] leading-relaxed">
                We do not provide medical, legal, or financial advice. Our Services are administrative in nature and do not replace professional consultation with doctors, lawyers, or financial advisors.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">9.3 Third-Party Services</h3>
              <p className="text-[#354B62] leading-relaxed">
                We are not responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Decisions made by insurance companies or TPAs</li>
                <li>Quality of medical care provided by hospitals</li>
                <li>Accuracy of information provided by third parties</li>
                <li>Availability or performance of third-party services</li>
                <li>Actions or omissions of hospitals, insurers, or TPAs</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">9.4 No Guarantee of Outcomes</h3>
              <p className="text-[#354B62] leading-relaxed">
                We cannot and do not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Approval of insurance claims</li>
                <li>Specific claim amounts or settlements</li>
                <li>Timelines for claim processing</li>
                <li>Success in recovering rejected claims</li>
                <li>Any particular outcome or result</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">10. Limitation of Liability</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">10.1 Limitation of Damages</h3>
              <p className="text-[#354B62] leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR:
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                Indirect, Incidental, Special, Consequential, or Punitive Damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Loss of profits or revenue</li>
                <li>Loss of data or information</li>
                <li>Business interruption</li>
                <li>Loss of opportunity</li>
                <li>Reputational harm</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                arising from or related to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Your use or inability to use our Services</li>
                <li>Any claim processing delays or denials</li>
                <li>Unauthorized access to your account</li>
                <li>Errors, omissions, or inaccuracies in our Services</li>
                <li>Actions of third parties (insurers, hospitals, TPAs)</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">10.2 Cap on Liability</h3>
              <p className="text-[#354B62] leading-relaxed">
                Our total liability for any claims arising from or related to these Terms or our Services shall not exceed:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>For Hospitals: The amount of fees paid by you in the 12 months preceding the claim</li>
                <li>For Patients: The amount of fees paid by you for the specific case</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">10.3 Specific Disclaimers</h3>
              <p className="text-[#354B62] leading-relaxed">
                The Company shall NOT be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Claim rejections or delays by insurance companies or TPAs</li>
                <li>Inaccurate information provided by you or third parties</li>
                <li>Medical treatment decisions or outcomes</li>
                <li>Hospital billing disputes</li>
                <li>Payment processing delays by financial institutions</li>
                <li>Force majeure events (see Section 11)</li>
              </ul>
            </div>

            {/* Force Majeure */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">11. Force Majeure</h2>
              <p className="text-[#354B62] leading-relaxed">
                We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Natural disasters (earthquakes, floods, pandemics)</li>
                <li>War, terrorism, civil unrest</li>
                <li>Government actions or regulations</li>
                <li>Labor disputes or strikes</li>
                <li>Internet or telecommunications failures</li>
                <li>Power outages or infrastructure failures</li>
                <li>Acts of God</li>
              </ul>
            </div>

            {/* Indemnification */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">12. Indemnification</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">12.1 Your Indemnification</h3>
              <p className="text-[#354B62] leading-relaxed">
                You agree to indemnify, defend, and hold harmless the Company, its affiliates, officers, directors, employees, agents, and representatives from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising from or related to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Your breach of these Terms</li>
                <li>Your violation of any law or third-party rights</li>
                <li>Your use or misuse of our Services</li>
                <li>Information you provide to us</li>
                <li>Your negligence or willful misconduct</li>
                <li>Claims by insurance companies, hospitals, or patients related to your actions</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">12.2 Defense of Claims</h3>
              <p className="text-[#354B62] leading-relaxed">
                We reserve the right, at our own expense, to assume the exclusive defense and control of any matter subject to indemnification by you. You agree to cooperate fully with our defense of such claims.
              </p>
            </div>

            {/* Termination */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">13. Termination</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">13.1 Termination by You</h3>
              <p className="text-[#354B62] leading-relaxed">
                You may terminate your account and stop using our Services at any time by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Following the account deactivation process on our Website</li>
                <li>Sending written notice to [shashank.agnihotri@indiem.tech]</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">13.2 Termination by Us</h3>
              <p className="text-[#354B62] leading-relaxed">
                We may immediately terminate or suspend your access to Services, without notice, if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>You breach these Terms or our Privacy Policy</li>
                <li>You engage in fraudulent or illegal activities</li>
                <li>You provide false or misleading information</li>
                <li>Your account remains inactive for [X] months</li>
                <li>Required by law or regulatory authority</li>
                <li>We discontinue Services (with reasonable notice)</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">13.3 Effect of Termination</h3>
              <p className="text-[#354B62] leading-relaxed">
                Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Your right to access and use Services immediately ceases</li>
                <li>You must pay all outstanding fees</li>
                <li>We may delete your account and associated data (subject to legal retention requirements)</li>
                <li>Provisions that should survive termination (including confidentiality, indemnification, limitation of liability) shall remain in effect</li>
                <li>No refunds will be provided except as required by law</li>
              </ul>
            </div>

            {/* Dispute Resolution */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">14. Dispute Resolution</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">14.1 Grievance Redressal</h3>
              <p className="text-[#354B62] leading-relaxed">
                Before initiating any legal proceedings, you agree to first attempt to resolve disputes through our internal grievance mechanism:
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">Step 1: Send a written complaint to our Grievance Officer:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Name: Shashank Agnihotri</li>
                <li>Email: shashank.agnihotri@indiem.tech</li>
                <li>Address: Office No – 101, First Floor, Plot No. A-61, Sector-16, Noida, UP-201301</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">Step 2: We will acknowledge your complaint within 10 working days</p>
              <p className="text-[#354B62] leading-relaxed mt-4">Step 3: We will attempt to resolve the dispute within 30 days</p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">14.2 Negotiation</h3>
              <p className="text-[#354B62] leading-relaxed">
                If the grievance mechanism does not resolve the dispute, both parties agree to negotiate in good faith for 30 days before initiating formal proceedings.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">14.3 Governing Law</h3>
              <p className="text-[#354B62] leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">14.4 Jurisdiction</h3>
              <p className="text-[#354B62] leading-relaxed">
                Any disputes arising from or relating to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts in Noida, India.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">14.5 Class Action Waiver</h3>
              <p className="text-[#354B62] leading-relaxed">
                You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
              </p>
            </div>

            {/* General Provisions */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">15. General Provisions</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">15.1 Entire Agreement</h3>
              <p className="text-[#354B62] leading-relaxed">
                These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and the Company regarding our Services and supersede all prior agreements and understandings.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">15.2 Severability</h3>
              <p className="text-[#354B62] leading-relaxed">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">15.3 Waiver</h3>
              <p className="text-[#354B62] leading-relaxed">
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver must be in writing and signed by an authorized representative of the Company.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">15.4 Assignment</h3>
              <p className="text-[#354B62] leading-relaxed">
                You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms or our rights to any affiliate or successor entity without restriction.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">15.5 No Third-Party Beneficiaries</h3>
              <p className="text-[#354B62] leading-relaxed">
                These Terms do not create any third-party beneficiary rights except as expressly stated herein.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">15.6 Notices</h3>
              <p className="text-[#354B62] leading-relaxed">
                All notices under these Terms must be in writing and delivered to:
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">To Company:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>ClaimTrue</li>
                <li>Office No – 101, First Floor, Plot No. A-61, Sector-16, Noida, UP-201301</li>
                <li>Email: shashank.agnihotri@indiem.tech </li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">To You:</p>
              <p className="text-[#354B62] leading-relaxed">
                At the email address or physical address provided in your account
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                Notices are deemed received:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Immediately if delivered by email (during business hours)</li>
                <li>3 business days if sent by courier or registered post</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">15.7 Relationship of Parties</h3>
              <p className="text-[#354B62] leading-relaxed">
                Nothing in these Terms creates a partnership, joint venture, agency, franchise, employment, or fiduciary relationship between you and the Company. You have no authority to bind the Company in any manner.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">15.8 Language</h3>
              <p className="text-[#354B62] leading-relaxed">
                These Terms are executed in English. Any translation is provided for convenience only. In case of conflict, the English version shall prevail.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">15.9 Electronic Communications</h3>
              <p className="text-[#354B62] leading-relaxed">
                By using our Services, you consent to receive electronic communications from us. You agree that all agreements, notices, disclosures, and other communications provided electronically satisfy any legal requirement that such communications be in writing.
              </p>
            </div>

            {/* Compliance with Laws */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">16. Compliance with Laws</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">16.1 Regulatory Compliance</h3>
              <p className="text-[#354B62] leading-relaxed">
                We operate in compliance with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Information Technology Act, 2000</li>
                <li>Insurance Regulatory and Development Authority of India (IRDAI) regulations</li>
                <li>Insurance Act, 1938</li>
                <li>Data protection and privacy laws</li>
                <li>Consumer protection laws</li>
                <li>Healthcare and medical privacy regulations</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">16.2 Anti-Fraud Provisions</h3>
              <p className="text-[#354B62] leading-relaxed">
                Both parties agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Not engage in any fraudulent activities</li>
                <li>Report suspected fraud to appropriate authorities</li>
                <li>Cooperate with investigations</li>
                <li>Maintain accurate records and documentation</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">16.3 Your Compliance</h3>
              <p className="text-[#354B62] leading-relaxed">
                You agree to comply with all applicable laws and regulations in your jurisdiction when using our Services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Insurance regulations</li>
                <li>Tax laws</li>
                <li>Consumer protection laws</li>
                <li>Data protection and privacy laws</li>
              </ul>
            </div>

            {/* Important Disclaimers */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">17. Important Disclaimers</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">17.1 Not an Insurance Company or TPA</h3>
              <p className="text-[#354B62] leading-relaxed">
                WE ARE NOT:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>An insurance company</li>
                <li>A Third Party Administrator (TPA)</li>
                <li>Licensed to sell insurance policies</li>
                <li>Authorized to approve or reject insurance claims</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                WE ARE:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>A technology-enabled service provider</li>
                <li>Facilitators of insurance claim processing</li>
                <li>Administrative support for hospitals and patients</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">17.2 No Guarantee of Results</h3>
              <p className="text-[#354B62] leading-relaxed">
                We provide best-effort services but cannot guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Approval of any insurance claim</li>
                <li>Specific claim amount settlements</li>
                <li>Timelines for claim processing by insurers</li>
                <li>Success in recovering rejected claims</li>
                <li>Any particular outcome or result</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">17.3 Insurance Company Decisions</h3>
              <p className="text-[#354B62] leading-relaxed">
                Final decisions on claim approval, rejection, amount payable, and settlement timing are made solely by insurance companies and TPAs. We have no control over or responsibility for such decisions.
              </p>
            </div>

            {/* Contact Information */}
            <div className="terms-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">18. Contact Information</h2>
              <p className="text-[#354B62] leading-relaxed">
                For questions, concerns, or support regarding these Terms or our Services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62] mt-4">
                <li>ClaimTrue</li>
                <li>Registered Office: Office No – 101, First Floor, Plot No. A-61, Sector-16, Noida, UP-201301</li>
                <li>Email: contact@indiem.tech</li>
                <li>Phone: +91 9675124370</li>
                <li>Website: www.indiem.tech</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                Grievance Officer: Shashank Agnihotri, shashank.agnihotri@indiem.tech
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-[#27A395] mb-4 text-center">ACKNOWLEDGMENT AND ACCEPTANCE</h2>
            <p className="text-[#354B62] leading-relaxed">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-[#354B62] mt-4">
              <li>You have read and understood these Terms of Service</li>
              <li>You agree to be bound by these Terms and our Privacy Policy</li>
              <li>You have the legal capacity to enter into this Agreement</li>
              <li>You will comply with all applicable laws and regulations</li>
              <li>You accept the limitations and disclaimers stated herein</li>
            </ol>
            <p className="text-[#354B62] leading-relaxed mt-4">
              If you do not agree to these Terms, you must immediately discontinue use of our Services.
            </p>
          </div>

          <p className="text-sm text-[#354B62] mt-12 text-center">Last Updated: November 2, 2025</p>
          <p className="text-sm text-[#354B62] mt-2 text-center">Version: 1.0</p>
        </div>
      </section>
    </div>
  );
}