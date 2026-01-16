import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import React, { useState } from "react";

interface Region {
  id: string;
  name: string;
  color: string;
  caseStudies: number;
}

export default function Voices(): React.ReactElement {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions: Region[] = [
    {
      id: "north-africa",
      name: "North Africa",
      color: "#FF8C42",
      caseStudies: 23,
    },
    {
      id: "west-africa",
      name: "West Africa",
      color: "#4FBFBF",
      caseStudies: 45,
    },
    {
      id: "central-africa",
      name: "Central Africa",
      color: "#7B4397",
      caseStudies: 18,
    },
    {
      id: "east-africa",
      name: "East Africa",
      color: "#DC3545",
      caseStudies: 34,
    },
    {
      id: "southern-africa",
      name: "Southern Africa",
      color: "#808080",
      caseStudies: 29,
    },
  ];

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="max-w-7xl mx-auto py-6 font-montserrat">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Information Panel */}
          <div className="bg-[#1e0f5e] text-white rounded-2xl shadow-2xl p-10">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Find examples of social investment in action near you!
            </h1>

            <p className="text-lg mb-6 leading-relaxed">
              Browse 140+ examples of social investment in action to explore how
              organisations are diversifying their income and scaling impact
              through repayable finance.
            </p>

            <p className="mb-6">
              Use the map to select your area and hit the 'Filter' button to see
              social investment case studies in your locality.
            </p>

            <p className="mb-4 font-semibold">
              You can also filter your search by:
            </p>

            <ul className="space-y-2 mb-8">
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>The amount an organisation has secured</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>The financial product used</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>
                  The social issue that is being tackled with support from
                  social investment
                </span>
              </li>
            </ul>

            <p className="font-bold mb-2">
              Have you got a great story of taking on social investment?
            </p>
            <p className="text-sm mb-4">
              We're always looking for new case studies to share to help
              organisations currently exploring the process to see how it works
              in practice. To spotlight your organisation as an investee or one
              within your profile as an investor, please email{" "}
              <a
                href="mailto:aconstable@goodfinance.org.uk"
                className="text-white hover:text-slate-150 underline"
              >
                aconstable@goodfinance.org.uk
              </a>
            </p>
          </div>

          {/* Map Panel */}
          <div className="p-6 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <h2 className="text-3xl text-center font-bold text-gray-900 mb-2">
              Case Study Mapper
            </h2>

            {/* Embedded Map */}
            <div className="flex-1 rounded-xl relative">
              <iframe
                className="w-full h-full rounded-xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16241457.96282609!2d10.0!3d5.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDAnMDAuMCJOIDEwwrAwMCcwMC4wIkU!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
                style={{ minHeight: "500px", border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Africa Case Study Map"
              />
            </div>

            {/* Region Legend */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                      selectedRegion === region.id
                        ? "bg-white shadow-md ring-2 ring-purple-500"
                        : "hover:bg-white hover:shadow"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm shrink-0"
                      style={{ backgroundColor: region.color }}
                    />
                    <div className="text-left flex-1">
                      <span className="text-sm font-medium text-gray-700 block">
                        {region.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {region.caseStudies} case studies
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg">
                Open Case Study Mapper
              </button>
            </div>
          </div>
        </div>

        {/* Selected Region Info */}
        {selectedRegion && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-pink-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                  style={{
                    backgroundColor: regions.find(
                      (r) => r.id === selectedRegion
                    )?.color,
                  }}
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {regions.find((r) => r.id === selectedRegion)?.name}
                  </h3>
                  <p className="text-gray-600">
                    {regions.find((r) => r.id === selectedRegion)?.caseStudies}{" "}
                    case studies available
                  </p>
                </div>
              </div>
              <button className="bg-[#95111c] hover:bg-[#95111c] text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        )}

        {/* Quick Filters */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Investment Amount
            </h3>
            <p className="text-sm text-gray-600">
              Filter by the size of investment secured
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Financial Product
            </h3>
            <p className="text-sm text-gray-600">
              See which financial products were used
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Social Issue
            </h3>
            <p className="text-sm text-gray-600">
              Browse by social impact area
            </p>
          </div>
        </div>

        <section className="text-[#1e0f5e] flex items-center flex-col flex-1 leading-4 space-y-3 mt-8">
          <div className=" bg-[#ffde59] max-w-7xl p-8 rounded-xl shadow-2xl overflow-hidden">
            <p className="text-3xl font-montserrat mb-4 font-medium text-center ">
              "Social investment has been incredibly valuable in the development
              of Chocolate Films. They have focused on understanding the
              company, our values and mission and have helped us in such a
              supportive way. We can't praise them enough!"
            </p>
            <p className="text-sm text-center mb-6 font-montserrat font-medium tracking-wider drop-shadow-[0_0_6px_rgb(255,255,255)]">
              Mark Currie, Director at Chocolate Films
            </p>
            <div className="flex flex-1 items-center justify-center">
              <button className="bg-[#1e0f5e] text-white px-5 py-3 rounded-xl font-medium tracking-wide">
                Read the full case study
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
