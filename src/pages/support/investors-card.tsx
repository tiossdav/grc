import React, { useState } from "react";

interface Investor {
  id: string;
  name: string;
  logo: string;
  description: string;
  status?: string;
  investmentAmount?: string;
  category: string;
  website?: string;
  tags: string[];
}

export default function InvestorsCard(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const investors: Investor[] = [
    {
      id: "1",
      name: "ART Business Loans",
      logo: "🎨",
      description:
        "ART Business Loans was established to support and provide appropriate finance for businesses and social enterprises, targeting underserved areas and communities in the West Midlands. Coronavirus Business Interruption Loan Scheme: The British Business Bank has over 40 accredited lenders who currently...",
      category: "Investors",
      tags: ["Business Loans", "Social Enterprise", "West Midlands"],
    },
    {
      id: "2",
      name: "Figurative Arts & Culture Impact Fund",
      logo: "🎭",
      status: "Active",
      investmentAmount:
        "£18 million social impact investment fund for socially driven arts, culture and heritage organisations.",
      description: "Supporting arts and cultural organizations across the UK.",
      category: "Funds",
      website: "https://figurative.org.uk/fund/arts-culture-impact-fund/",
      tags: ["Arts", "Culture", "Heritage", "Impact Investment"],
    },
    {
      id: "3",
      name: "Bank Workers Charity",
      logo: "🏦",
      description:
        "The Bank Workers Charity invests to combat ill-health and poverty throughout the UK.",
      category: "Investors",
      tags: ["Health", "Poverty", "UK-wide"],
    },
    {
      id: "4",
      name: "BBRC",
      logo: "💼",
      description:
        "BBRC's mission is to improve the wellbeing of families and individuals in the UK.",
      category: "Investors",
      tags: ["Family Support", "Wellbeing", "Community"],
    },
    {
      id: "5",
      name: "Barrow Cadbury Trust",
      logo: "🤝",
      description:
        "Supporting independent charitable initiatives that address social injustice and promote equality.",
      status: "Active",
      category: "Funds",
      tags: ["Social Justice", "Equality", "Grants"],
    },
    {
      id: "6",
      name: "Social Investment Scotland",
      logo: "🏴󐁧󐁢󐁳󐁣󐁴󐁿",
      description:
        "Providing social investment to strengthen communities and support social enterprises.",
      category: "Investors",
      tags: ["Scotland", "Social Enterprise", "Community"],
    },
  ];

  const categories = ["All", "Investors", "Funds", "Advisors"];

  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch =
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || investor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-6 font-montserrat">
      <div className="max-w-7xl mx-auto">
        {/* Results Count */}
        <div className="mb-8">
          <div className="inline-block bg-[#2d1b69] text-white px-8 py-2 rounded-full shadow-lg">
            <p className="text-lg font-medium">
              Showing{" "}
              <span className="text-lg font-bold">
                {filteredInvestors.length}
              </span>{" "}
              results
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search investors, funds, or advisors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-[#2d1b69] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestors.map((investor) => (
            <div
              key={investor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Logo/Header */}
              <div className="bg-linear-to-r from-purple-100 to-blue-100 p-8 text-center">
                <div className="text-6xl mb-4">{investor.logo}</div>
                <h3 className="text-2xl font-bold text-[#2d1b69] mb-2">
                  {investor.name}
                </h3>
                {investor.status && (
                  <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                    {investor.status}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {investor.investmentAmount && (
                  <div className="mb-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                    <p className="text-sm font-bold text-purple-900">
                      {investor.investmentAmount}
                    </p>
                  </div>
                )}

                <p className="text-gray-700 text-sm mb-4 flex-1 line-clamp-4">
                  {investor.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {investor.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">{investor.category}</span>
                </div>

                {investor.website && (
                  <a
                    href={investor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm mb-4 underline break-all"
                  >
                    Visit website →
                  </a>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button className="bg-[#2d1b69] hover:bg-[#3d2579] text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Contact
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredInvestors.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
