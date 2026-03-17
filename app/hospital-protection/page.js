import HospitalProtectionDetails from "../components/HospitalProtectionDetails";

export const metadata = {
  title: "Hospital & Clinic Claim Management | ClaimTrue Solutions",
  description: "Advanced daily documentation audit, file management, and insurance empanelment support for clinics and multi-specialty hospitals. Reduce rejections by 60%.",
  openGraph: {
    title: "ClaimTrue Hospital Solutions: Zero Rejection Workflow",
    description: "Scale your hospital's claim efficiency with digital file management and expert liaison support.",
    images: ["/hospital-hero.png"],
  },
};

export default function HospitalProtectionPage() {
  // Pass the hero image URL here when available
  const heroImageUrl = "https://res.cloudinary.com/dhlvq35cc/image/upload/v1773737693/doc_ii0ipq.jpg"; 

  return (
    <main>
      <HospitalProtectionDetails heroImageUrl={heroImageUrl} />
    </main>
  );
}
