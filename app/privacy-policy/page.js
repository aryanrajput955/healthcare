"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
  const policyRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = policyRef.current?.querySelectorAll('.policy-section');
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
            trigger: policyRef.current,
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
          <h1 className="text-4xl font-bold text-[#354B62] mb-8 text-center">Privacy Policy</h1>
          <p className="text-sm text-[#354B62] mb-12 text-center">Effective Date: November 2, 2025</p>

          <div ref={policyRef} className="space-y-12">
            {/* Introduction */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">Introduction</h2>
              <p className="text-[#354B62] leading-relaxed">
                This Privacy Policy (&quot;Policy&quot;) outlines how Indiem (hereinafter referred to as &quot;the Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company registered under the Companies Act, 2013, collects, uses, stores, discloses, and protects your personal information. The Company operates the website www.indiem.tech (&quot;Website&quot;) and provides health insurance claim management services (&quot;Services&quot;) to hospitals and patients across India.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                All visitors and users of the Website are collectively referred to as &quot;you&quot;, &quot;your&quot;, or &quot;Users&quot;. By visiting this Website or using our Services, you agree to be bound by the terms and conditions of this Privacy Policy and consent to our collection, use, and disclosure of your personal information in accordance with this Policy.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                This Privacy Policy has been prepared in compliance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (&quot;SPI Rules&quot;), and the Information Technology (Intermediaries Guidelines) Rules, 2011, as amended from time to time.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">
                If you do not agree with the terms of this Privacy Policy, please do not use or access our Website or Services.
              </p>
            </div>

            {/* Definitions */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">1. Definitions</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">1.1 Personal Information</h3>
              <p className="text-[#354B62] leading-relaxed">
                &quot;Personal Information&quot; means any information that relates to or identifies you and may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>First name, middle name, last name</li>
                <li>Contact information (phone numbers, email addresses, residential address)</li>
                <li>Date of birth, age, gender</li>
                <li>Identity proof details (Aadhaar, PAN, Voter ID, Passport, Driving License)</li>
                <li>Policyholder information</li>
                <li>Insurance policy details</li>
                <li>Hospital admission and treatment information</li>
                <li>Family member information</li>
                <li>Any other information provided by you</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">1.2 Sensitive Personal Data or Information (SPDI)</h3>
              <p className="text-[#354B62] leading-relaxed">
                &quot;Sensitive Personal Data or Information&quot; means Personal Information which consists of information relating to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Password</li>
                <li>Financial information such as bank account, credit card, debit card, or other payment instrument details</li>
                <li>Physical, physiological, and mental health condition</li>
                <li>Medical records and history including prescriptions, test reports, diagnoses, treatment plans</li>
                <li>Sexual orientation</li>
                <li>Biometric information</li>
                <li>Any detail relating to the above clauses as provided to the Company for providing Services</li>
                <li>Any information received under the above clauses by the Company for processing, storing, or processing under lawful contract or otherwise</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                Note: Information freely available or accessible in the public domain or furnished under the Right to Information Act, 2005 is not considered SPDI.
              </p>
            </div>

            {/* Scope and Applicability */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">2. Scope and Applicability</h2>
              <p className="text-[#354B62] leading-relaxed">
                This Privacy Policy applies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>All Users who visit, access, or use our Website</li>
                <li>Hospitals who register with us to avail our healthcare claim management services</li>
                <li>Patients who share their information with us directly or through hospitals for claim processing services</li>
                <li>All forms of Personal Information, whether collected or stored physically or electronically</li>
              </ul>
            </div>

            {/* Information We Collect */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">3. Information We Collect</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">3.1 Information Provided by You</h3>
              <p className="text-[#354B62] leading-relaxed mb-2">For Hospitals:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Hospital name, registration details, and GST information</li>
                <li>Authorized representative&apos;s name, designation, contact details</li>
                <li>Hospital infrastructure and empanelment details</li>
                <li>Bank account information for payment processing</li>
                <li>TPA (Third Party Administrator) tie-ups and insurance company relationships</li>
                <li>Hospital MIS and billing system details</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">For Patients:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Full name, age, gender, contact information</li>
                <li>Residential address</li>
                <li>Identity proof documents (Aadhaar, PAN, etc.)</li>
                <li>Insurance policy details (policy number, insurer name, sum insured, policy tenure)</li>
                <li>Medical history and current health conditions</li>
                <li>Hospital admission details and treatment information</li>
                <li>Prescription, diagnostic reports, and medical bills</li>
                <li>Bank account details for reimbursement claims</li>
                <li>Family member details (for dependent coverage)</li>
                <li>Claim history and status</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">3.2 Information Automatically Collected</h3>
              <p className="text-[#354B62] leading-relaxed">
                We may automatically collect certain information when you visit our Website:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Device information (device type, operating system, browser type)</li>
                <li>IP address and location data</li>
                <li>Website usage patterns and pages visited</li>
                <li>Time spent on pages</li>
                <li>Referring website information</li>
                <li>Cookies and similar tracking technologies (see Section 9)</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">3.3 Information from Third Parties</h3>
              <p className="text-[#354B62] leading-relaxed">
                We may collect information from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Insurance companies and TPAs</li>
                <li>Hospitals and healthcare providers</li>
                <li>Diagnostic centers and laboratories</li>
                <li>Government databases and registries</li>
                <li>Credit information bureaus (with your consent, where applicable)</li>
                <li>Other publicly available sources</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">4. How We Use Your Information</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">4.1 Primary Purposes</h3>
              <p className="text-[#354B62] leading-relaxed mb-2">For Hospital Services:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Health claim cashless processing and pre-authorization approval</li>
                <li>Managing genuine cashless rejection claims</li>
                <li>Facilitating claim desk operations</li>
                <li>Hospital MIS and dashboard analytics</li>
                <li>Payment processing and reconciliation</li>
                <li>Compliance with regulatory requirements</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4 mb-2">For Patient Services:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Health claim reimbursement processing</li>
                <li>Rejected claims recovery assistance</li>
                <li>Claims delay resolution</li>
                <li>Claim short-settlement recovery</li>
                <li>Document collection and verification</li>
                <li>Communication with insurance companies and TPAs on your behalf</li>
                <li>Providing claim status updates</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">4.2 Secondary Purposes</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>To improve and customize our Services</li>
                <li>To send service-related notifications and updates</li>
                <li>To conduct data analysis and research for service improvement</li>
                <li>To detect, prevent, and protect against fraud and unauthorized activities</li>
                <li>To comply with legal obligations and respond to legal processes</li>
                <li>To enforce our Terms of Service</li>
                <li>To resolve disputes and troubleshoot problems</li>
                <li>To provide customer support</li>
                <li>To send promotional communications (with your consent)</li>
              </ul>
            </div>

            {/* Information Sharing and Disclosure */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">5. Information Sharing and Disclosure</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">5.1 With Your Consent</h3>
              <p className="text-[#354B62] leading-relaxed">
                We may share your Personal Information with third parties only with your express consent, which may be obtained at the time of collection or subsequently.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">5.2 Service Providers and Partners</h3>
              <p className="text-[#354B62] leading-relaxed">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Insurance Companies and TPAs: To process your claims, verify coverage, and facilitate approvals and payments.</li>
                <li>Hospitals and Healthcare Providers: To coordinate treatment, billing, and claim documentation.</li>
                <li>Diagnostic Centers and Laboratories: To obtain and verify medical reports and test results.</li>
                <li>Technology Service Providers: Including cloud storage providers, IT infrastructure providers, payment gateways, and communication service providers who assist in delivering our Services.</li>
                <li>Legal and Regulatory Authorities: When required by law, court order, or governmental request, or to protect our rights and safety.</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">5.3 Business Transfers</h3>
              <p className="text-[#354B62] leading-relaxed">
                In the event of a merger, acquisition, reorganization, sale of assets, or bankruptcy, your Personal Information may be transferred to the successor entity, provided such entity agrees to comply with this Privacy Policy.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">5.4 Restrictions on Sharing</h3>
              <p className="text-[#354B62] leading-relaxed">
                We will NOT:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Sell your Personal Information to third parties for marketing purposes</li>
                <li>Share your SPDI without your explicit consent, except as required by law</li>
                <li>Use your information for purposes incompatible with those disclosed at collection</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">6. Data Retention</h2>
              <p className="text-[#354B62] leading-relaxed">
                We will retain your Personal Information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">Retention Periods:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Active user data: Duration of service relationship</li>
                <li>Claim-related information: Minimum 7 years from claim closure (as per regulatory requirements)</li>
                <li>Financial records: As per applicable tax and accounting laws</li>
                <li>Medical records: As per Indian Medical Council regulations and applicable laws</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                After the retention period expires, we will securely delete or anonymize your Personal Information in accordance with applicable data protection laws.
              </p>
            </div>

            {/* Data Security */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">7. Data Security</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">7.1 Security Measures</h3>
              <p className="text-[#354B62] leading-relaxed">
                We implement industry-standard security measures to protect your Personal Information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure servers with firewall protection</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Employee training on data protection and confidentiality</li>
                <li>Secure backup and disaster recovery procedures</li>
                {/* <li>Compliance with ISO 27001:2013 standards (if applicable)</li> */}
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">7.2 Your Responsibility</h3>
              <p className="text-[#354B62] leading-relaxed">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>Using strong passwords and changing them periodically</li>
                <li>Not sharing your account access with unauthorized persons</li>
                <li>Logging out after each session</li>
                <li>Notifying us immediately of any unauthorized access or security breach</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">7.3 Limitations</h3>
              <p className="text-[#354B62] leading-relaxed">
                While we strive to protect your Personal Information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but will take all reasonable measures to safeguard your information.
              </p>
            </div>

            {/* Your Rights and Choices */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">8. Your Rights and Choices</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">8.1 Access and Correction</h3>
              <p className="text-[#354B62] leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Access your Personal Information held by us</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Update your information through your account settings</li>
                <li>Request details of third parties with whom your information has been shared</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                To exercise these rights, contact us at: contact@indiem.tech / support@indiem.tech
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">8.2 Withdrawal of Consent</h3>
              <p className="text-[#354B62] leading-relaxed">
                You may withdraw your consent for collection, use, or disclosure of your Personal Information at any time by notifying us in writing. However, please note that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Withdrawal may affect our ability to provide Services to you</li>
                <li>We may retain certain information as required by law or for legitimate business purposes</li>
                <li>Previous processing based on your consent remains lawful</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">8.3 Opt-Out Options</h3>
              <p className="text-[#354B62] leading-relaxed">
                Marketing Communications: You may opt out of receiving promotional emails and SMS by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Clicking the &quot;unsubscribe&quot; link in emails</li>
                <li>Replying &quot;STOP&quot; to SMS messages</li>
                <li>Contacting us at contact@indiem.tech</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                Note: You cannot opt out of service-related communications necessary for providing our Services.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">8.4 Data Portability</h3>
              <p className="text-[#354B62] leading-relaxed">
                Upon request, we will provide your Personal Information in a structured, commonly used, and machine-readable format, subject to technical feasibility and legal requirements.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">8.5 Right to Erasure</h3>
              <p className="text-[#354B62] leading-relaxed">
                You may request deletion of your Personal Information. We will comply with such requests except where:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Retention is required by law</li>
                <li>Information is necessary for legal claims or compliance</li>
                <li>Retention is necessary for fulfilling our contractual obligations</li>
              </ul>
            </div>

            {/* Cookies and Tracking Technologies */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">9. Cookies and Tracking Technologies</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">9.1 What Are Cookies?</h3>
              <p className="text-[#354B62] leading-relaxed">
                Cookies are small text files stored on your device that help us improve your experience on our Website.
              </p>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">9.2 Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Essential Cookies: Required for Website functionality and security.</li>
                <li>Functional Cookies: Remember your preferences and settings.</li>
                <li>Analytics Cookies: Help us understand how visitors use our Website (using tools like Google Analytics).</li>
                <li>Marketing Cookies: Track your browsing behavior for personalized advertising (only with your consent).</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">9.3 Managing Cookies</h3>
              <p className="text-[#354B62] leading-relaxed">
                You can control cookies through your browser settings. However, disabling cookies may affect Website functionality and your user experience.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">10. Third-Party Links</h2>
              <p className="text-[#354B62] leading-relaxed">
                Our Website may contain links to third-party websites and services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any Personal Information.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">11. Children's Privacy</h2>
              <p className="text-[#354B62] leading-relaxed">
                Our Services are not directed to individuals under the age of 18. We do not knowingly collect Personal Information from minors. If you are under 18, please do not use our Services or provide any information without parental or guardian consent. If we learn that we have collected information from a minor without proper consent, we will promptly delete such information.
              </p>
            </div>

            {/* International Data Transfers */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">12. International Data Transfers</h2>
              <p className="text-[#354B62] leading-relaxed">
                Your Personal Information is processed and stored within India. If you access our Services from outside India, you consent to the transfer of your information to India and processing in accordance with Indian laws.
              </p>
            </div>

            {/* Changes to This Privacy Policy */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-[#354B62] leading-relaxed">
                We reserve the right to modify this Privacy Policy at any time to reflect changes in our practices, technology, legal requirements, or business operations. When we make material changes, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Update the &quot;Effective Date&quot; at the top of this Policy</li>
                <li>Post the revised Policy on our Website</li>
                <li>Notify you via email or prominent notice on our Website (for significant changes)</li>
              </ul>
              <p className="text-[#354B62] leading-relaxed mt-4">
                Your continued use of our Services after such modifications constitutes your acceptance of the updated Privacy Policy. We encourage you to review this Policy periodically.
              </p>
            </div>

            {/* Grievance Redressal */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">14. Grievance Redressal</h2>
              <h3 className="text-xl font-medium text-[#33A8D3] mb-2">14.1 Grievance Officer</h3>
              <p className="text-[#354B62] leading-relaxed">
                In accordance with the Information Technology Act, 2000 and the SPI Rules, we have appointed a Grievance Officer to address your concerns regarding privacy and data protection.
              </p>
              <p className="text-[#354B62] leading-relaxed mt-4">Grievance Officer Details:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>Name: Shashank Agnihotri</li>
                <li>Email: shashank.agnihotri@indiem.tech</li>
                <li>Phone: +91 9675124370</li>
                <li>Address: Office No – 101, First Floor, Plot No. A-61, Sector-16, Noida, UP-201301</li>
              </ul>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">14.2 Complaint Resolution Process</h3>
              <ol className="list-decimal pl-6 space-y-2 text-[#354B62]">
                <li>Submit your complaint in writing via email or post</li>
                <li>We will acknowledge receipt within 10 working days</li>
                <li>We aim to resolve complaints within one month from receipt</li>
                <li>If your complaint cannot be resolved within this timeframe, we will inform you of the reasons and expected resolution time</li>
              </ol>

              <h3 className="text-xl font-medium text-[#33A8D3] mt-6 mb-2">14.3 Escalation</h3>
              <p className="text-[#354B62] leading-relaxed">
                If you are not satisfied with our response, you may escalate your complaint to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62]">
                <li>The appropriate data protection authority</li>
                <li>The Cyber Appellate Tribunal under the Information Technology Act, 2000</li>
                <li>Consumer forums and courts as per applicable law</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">15. Contact Information</h2>
              <p className="text-[#354B62] leading-relaxed">
                For any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#354B62] mt-4">
                <li>ClaimTrue</li>
                <li>Email: shashank.agnihotri@indiem.tech</li>
                <li>Phone: +91 9675124370</li>
                <li>Address: Office No – 101, First Floor, Plot No. A-61, Sector-16, Noida, UP-201301</li>
                <li>Website: www.indiem.tech</li>
              </ul>
            </div>

            {/* Governing Law */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">16. Governing Law</h2>
              <p className="text-[#354B62] leading-relaxed">
                This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with this Policy shall be subject to the exclusive jurisdiction of the courts in Noida, India.
              </p>
            </div>

            {/* Language */}
            <div className="policy-section">
              <h2 className="text-2xl font-semibold text-[#27A395] mb-4">17. Language</h2>
              <p className="text-[#354B62] leading-relaxed">
                This Privacy Policy is executed in English. In case of any conflict between the English version and any translation, the English version shall prevail.
              </p>
            </div>
          </div>

          <p className="text-sm text-[#354B62] mt-12 text-center">
            By using our Website and Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
          </p>
          <p className="text-sm text-[#354B62] mt-4 text-center">Last Updated: November 2, 2025</p>
        </div>
      </section>
    </div>
  );
}