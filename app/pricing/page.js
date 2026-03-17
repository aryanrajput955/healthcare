import Pricing from "../components/Pricing";

export const metadata = {
  title: "Pricing Plans | ClaimTrue Health Insurance Claims Service",
  description: "Explore our transparent pricing for individual policyholders, clinics, and hospitals. Choose from Personal Protection, Starter, or Enterprise plans for expert health insurance claim management.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Pricing />
    </div>
  );
}
