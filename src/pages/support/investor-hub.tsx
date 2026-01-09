import React, { useState } from "react";
import InvestorsCard from "./investors-card";

interface Region {
  id: string;
  name: string;
  color: string;
  localInvestors: number;
  nationalInvestors: number;
}

export default function InvestorsHub(): React.ReactElement {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [filters, setFilters] = useState({
    location: "Any",
    borrowingAmount: "Any",
    productType: "Any",
    socialIssueArea: "Any",
    listingCategory: "All",
  });

  const regions: Region[] = [
    {
      id: "north-africa",
      name: "North Africa",
      color: "#FF8C42",
      localInvestors: 45,
      nationalInvestors: 120,
    },
    {
      id: "west-africa",
      name: "West Africa",
      color: "#4FBFBF",
      localInvestors: 78,
      nationalInvestors: 165,
    },
    {
      id: "central-africa",
      name: "Central Africa",
      color: "#7B4397",
      localInvestors: 32,
      nationalInvestors: 95,
    },
    {
      id: "east-africa",
      name: "East Africa",
      color: "#DC3545",
      localInvestors: 62,
      nationalInvestors: 148,
    },
    {
      id: "southern-africa",
      name: "Southern Africa",
      color: "#808080",
      localInvestors: 54,
      nationalInvestors: 132,
    },
  ];

  const handleFilterChange = (key: string, value: string): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = (): void => {
    console.log("Searching with filters:", filters, "Location:", location);
  };

  return (
    <div className="min-h-screen py-12 px-4 font-montserrat">
      <div className="max-w-7xl mx-auto p-6 bg-[#fffeeb] rounded-xl">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 font-montserrat">
          <h1 className="text-4xl font-medium text-gray-900 mb-3">
            Social Investors and Funds
          </h1>
          <p className="text-2xl font-medium text-gray-900 mb-2">
            Browse our list of social investors and funds using the map or the
            form below.
          </p>
          <p className="text-sm text-gray-900 mb-3">
            Investors are responsible for keeping their profiles up to date, but
            if you spot something that doesn't look right, please email{" "}
            <a
              href="mailto:info@goodfinance.org.uk"
              className="text-blue-900 underline"
            >
              info@goodfinance.org.uk
            </a>
          </p>
          <p className="text-sm text-gray-900 mb-4">
            If you're an organisation that offers advisory services and you'd
            like to enquire about listing with Good Finance, please check out
            the{" "}
            <a href="#" className="text-blue-600 underline">
              For Investors terms
            </a>
            .
          </p>
          <p className="text-sm text-gray-900 mb-4">
            Looking for Advisors instead? Click the button below to jump to the
            Advisor Directory.
          </p>
          <div className="flex items-center justify-center">
            <button className="bg-[#190974] hover:bg-[#1f0d89] text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Find an Advisor
            </button>
          </div>
        </div>

        {/* Map and Filter Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <div className="relative rounded-lg overflow-hidden">
              <iframe
                className="w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16241457.96282609!2d10.0!3d5.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDAnMDAuMCJOIDEwwrAwMCcwMC4wIkU!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
                style={{ height: "600px", border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Africa Investment Map"
              />
            </div>

            {/* Region Legend */}
            <div className="mt-4 flex flex-wrap gap-3">
              {regions.map((region) => (
                <div
                  key={region.id}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: region.color }}
                  />
                  <span className="text-sm text-gray-700">{region.name}</span>
                </div>
              ))}
            </div>

            {/* Selected Region Info */}
            {selectedRegion && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-2">
                  {regions.find((r) => r.id === selectedRegion)?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Local investors:{" "}
                  <span className="font-semibold">
                    {
                      regions.find((r) => r.id === selectedRegion)
                        ?.localInvestors
                    }
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  National investors:{" "}
                  <span className="font-semibold">
                    {
                      regions.find((r) => r.id === selectedRegion)
                        ?.nationalInvestors
                    }
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Filter Section */}
          <div className="bg-[#b0004b] rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm mb-6 leading-relaxed">
              Browse our list of investors using the map or the form below. You
              can filter your results by clicking on one of the regions at the
              top of the results list which will appear under the map.
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="My location or postcode"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-gray-900 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg text-gray-900 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option>- Any -</option>
                  <option>North Africa</option>
                  <option>West Africa</option>
                  <option>Central Africa</option>
                  <option>East Africa</option>
                  <option>Southern Africa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Borrowing amount
                </label>
                <select
                  value={filters.borrowingAmount}
                  onChange={(e) =>
                    handleFilterChange("borrowingAmount", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg text-gray-900 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option>- Any -</option>
                  <option>Under £50k</option>
                  <option>£50k - £250k</option>
                  <option>£250k - £1m</option>
                  <option>Over £1m</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product type
                </label>
                <select
                  value={filters.productType}
                  onChange={(e) =>
                    handleFilterChange("productType", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg text-gray-900 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option>- Any -</option>
                  <option>Loan</option>
                  <option>Equity</option>
                  <option>Grant</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Social issue area
                </label>
                <select
                  value={filters.socialIssueArea}
                  onChange={(e) =>
                    handleFilterChange("socialIssueArea", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg text-gray-900 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option>- Any -</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Environment</option>
                  <option>Community</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Listing category
                </label>
                <select
                  value={filters.listingCategory}
                  onChange={(e) =>
                    handleFilterChange("listingCategory", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg text-gray-900 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option>All</option>
                  <option>Featured</option>
                  <option>New</option>
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-4"
              >
                Filter results
              </button>
            </div>
          </div>
        </div>
        <InvestorsCard />
      </div>
    </div>
  );
}
