"use client";

import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  Headphones, 
  BadgePercent, 
  Building2 
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "100% Verified Listings",
    description:
      "Every property on RentNest is thoroughly checked and verified to ensure safety and prevent fake postings.",
  },
  {
    id: 2,
    icon: Search,
    title: "Smart & Fast Search",
    description:
      "Filter properties by location, price range, property type, and amenities in seconds to find your perfect fit.",
  },
  {
    id: 3,
    icon: BadgePercent,
    title: "Zero Hidden Costs",
    description:
      "Complete transparency with pricing. No surprise fees or hidden charges when booking through RentNest.",
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Dedicated Support",
    description:
      "Our friendly support team is always ready to assist both tenants and landlords with any queries.",
  },
  {
    id: 5,
    icon: Building2,
    title: "Direct Owner Contact",
    description:
      "Connect directly with genuine property owners without dealing with unnecessary middlemen or hassle.",
  },
  {
    icon: Sparkles,
    id: 6,
    title: "Seamless Booking",
    description:
      "Schedule visits and complete your rental agreements effortlessly with our streamlined online process.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            Why RentNest
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
            Why Choose Us For Your Next Home?
          </h2>
          <p className="mt-4 text-gray-400 text-base md:text-lg">
            We make renting simple, secure, and transparent. Here is why thousands
            of renters and property owners trust RentNest every day.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 hover:border-emerald-500/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 group shadow-lg"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Icon size={28} />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-semibold mt-6 text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}