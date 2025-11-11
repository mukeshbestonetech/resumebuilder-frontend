"use client";
import { createCheckoutSession } from "@/src/actions/payment.action";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "For individuals just getting started.",
    features: [
      "Up to 2 resumes",
      "Access to all templates",
      "AI summary generation (3 credits)",
      "Standard PDF download",
    ],
    buttonText: "Get Started",
    isFeatured: false,
  },
  {
    name: "Basic",
    price: "$10",
    period: "/ month",
    description: "For job seekers who want to stand out.",
    features: [
      "Up to 5 resumes",
      "Access to all templates",
      "AI summary generation (15 credits)",
      "High-resolution PDF download",
      "Remove our branding",
    ],
    buttonText: "Choose Basic",
    isFeatured: false,
    priceId: "price_1SRwgHJzBjSLyTjG0cmJF2Eu"
  },
  {
    name: "Pro",
    price: "$25",
    period: "/ month",
    description: "For power users and professionals.",
    features: [
      "Up to 50 resumes",
      "Access to all templates",
      "AI generation (unlimited credits)",
      "High-resolution PDF download",
      "Remove our branding",
      "Priority support",
    ],
    buttonText: "Go Pro",
    isFeatured: true,
    priceId: "price_1SRwiqJzBjSLyTjGhWDAWgcy"
  },
];

export default function PricingPage() {
  const handleSubscribe = async (priceId: string) => {
    const resp = await createCheckoutSession({
      priceId,
      successUrl: `${window.location.origin}/dashboard?subscribed=1`,
      cancelUrl: `${window.location.origin}/pricing`
    });
    console.log("Checkout Session Response:", resp);
    window.location = resp?.data?.url;
  };


  return (
    <div className="bg-gray-900">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white">
          Find the perfect plan for you
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Simple and transparent pricing. No hidden fees. Cancel anytime.
        </p>

        <div className="mt-20 grid lg:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 text-left transform transition-transform hover:scale-105 ${plan.isFeatured
                  ? "bg-gray-800 border-2 border-orange-500"
                  : "bg-gray-800 border border-gray-700"
                }`}
            >
              <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
              <p className="mt-4 text-4xl font-bold text-white">{plan.price}<span className="text-lg font-normal text-gray-400">{plan.period}</span></p>
              <p className="mt-4 text-gray-400">{plan.description}</p>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`mt-10 w-full font-bold py-3 rounded-lg transition-colors ${plan.isFeatured
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
                type="button"
                onClick={() => handleSubscribe(plan?.priceId || "")}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
