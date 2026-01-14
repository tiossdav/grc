import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import partner from "@/assets/images/partner.png";

interface ContentCard {
  id: number;
  type: "Blog" | "Podcast" | "Video";
  title: string;
  description: string;
  image?: string;
}

export default function PartnerPortal(): React.ReactElement {
  const [, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const contentCards: ContentCard[] = [
    {
      id: 1,
      type: "Blog",
      title: "Securing a pub's future: Lessons from The Punch Bowl Inn",
      description:
        "You're passionate about coming together as a community to save and run your village pub – but how do you find the funding to turn that vision into reality? Andrew Dubock, Communications Manager at Plunkett UK, shares how one North Yorkshire village made it happen.",
    },
    {
      id: 2,
      type: "Blog",
      title:
        "Backbone of Britain: What does the latest State of Social Enterprise report tell us about social investment?",
      description:
        "Backbone of Britain – State of Social Enterprise 2025 is the latest research from Social Enterprise UK (SEUK) published with the support of Access: The Foundation for Social Investment and Better Society Capital.",
    },
    {
      id: 3,
      type: "Blog",
      title: "Benny The Beaver: A Social Investment Story",
      description:
        "Meet Benny, a determined beaver with one mission: to end homelessness in the forest... With the help of the Good Finance fairy, he's introduced to the world of repayable finance and suddenly, his dream of building a social enterprise may become reality!",
    },
  ];

  const filteredContent =
    activeFilter === "All"
      ? contentCards
      : contentCards.filter((card) => card.type === activeFilter);

  return (
    <div className="font-montserrat">
      <Header />
      {/* Hero Section with Accordion */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">
            {/* Left - Image */}
            <div className="w-full ">
              <img
                src={partner}
                alt="Person Learning"
                className="max-w-full max-h-full object-cover"
              />
            </div>

            {/* Right - Content */}
            <div className="p-12">
              <h1 className="text-4xl font-bold text-indigo-900 mb-6">
                Working in partnership
              </h1>

              <p className="text-base text-gray-700 mb-4 leading-relaxed">
                Good Finance is a collaborative project to help improve access
                to information on social investment for charities and social
                enterprises.
              </p>

              <p className="text-base text-gray-700 mb-6 leading-relaxed">
                We take a 'user-led' approach and work in collaboration with a
                range of key partners and stakeholders to ensure we are reaching
                social purpose organisations across the UK. If your organisation
                wants to support members or users in your network with deepening
                their understanding of social investment, or you think you could
                support us in furthering our mission, we'd love to hear from
                you.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "For Social Investors",
                  "For Advisors",
                  "For Infrastructure",
                  "For everyone",
                ].map((item) => (
                  <div key={item} className="border-b border-gray-200 pb-3">
                    <button
                      onClick={() => toggleSection(item)}
                      className="w-full flex items-center justify-between text-left hover:text-pink-700 transition-colors"
                    >
                      <span className="text-base font-semibold text-gray-800">
                        {item}
                      </span>
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              <button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                View partnership opportunities
              </button>
            </div>
          </div>
        </div>

        {/* For Social Investors Section */}
        <div className="bg-indigo-900 py-8 text-center rounded-t-2xl">
          <h2 className="text-4xl font-bold text-white">
            For Social Investors
          </h2>
        </div>

        {/* Investor Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Listing Profile Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Listing an investor profile on Good Finance
                </h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Is your organisation's profile listed on Good Finance? If you
                  have a track record in social investment, we'd love to see
                  your organisation listed in the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Investor Directory
                  </a>
                  .
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  If you're already listed in the Investor Directory, you can{" "}
                  <a href="#" className="text-blue-600 underline">
                    log in
                  </a>{" "}
                  to ensure your profile is up to date.
                </p>
                <p className="text-sm text-gray-700 mb-6">
                  If you have any questions or would like to learn more, please
                  contact Annie Constable (Digital Content Manager) at{" "}
                  <a
                    href="mailto:aconstable@goodfinance.org.uk"
                    className="text-blue-600 underline"
                  >
                    aconstable@goodfinance.org.uk
                  </a>
                  .
                </p>
                <button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Register your interest
                </button>
              </div>
              <div className="bg-gray-200 min-h-[300px] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Business meeting image</p>
              </div>
            </div>
          </div>

          {/* Investor Data Dashboard & Case Study */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Investor Data Dashboard
              </h3>
              <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  Team reviewing data image
                </p>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                We're delighted to share the Good Finance investor data
                dashboards with you.
              </p>
              <p className="text-sm text-gray-700 mb-4">
                These data dashboard are an interactive way of exploring Good
                Finance data.
              </p>
              <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Explore the Data Dashboard
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Submit a case study
              </h3>
              <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Handshake image</p>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Have you got a brilliant example of social investment in action
                from your portfolio? We're always looking for new{" "}
                <a href="#" className="text-blue-600 underline">
                  case studies
                </a>{" "}
                and can link them directly to your investor profile.
              </p>
              <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Submit a case study
              </button>
            </div>
          </div>
        </div>

        {/* Keeping Profile Updated */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">
            <div className="p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Keeping your profile up to date
              </h3>
              <p className="text-base text-gray-700 mb-4">
                It's your responsibility to keep your profile up to date.
              </p>
              <p className="text-base text-gray-700 mb-4">
                Use the button below to log-in to...
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm text-gray-700">
                <li>Update contact information</li>
                <li>Update logos</li>
                <li>Minor amends to wording to reflect any recent changes</li>
                <li>Publish / unpublish funds as per availability</li>
                <li>Add a link to your latest Impact Report</li>
                <li>
                  Change investment criteria e.g. location, amount, investment
                  type and social impact area
                </li>
              </ul>
              <button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Log-in
              </button>
            </div>
            <div className="bg-amber-100 min-h-[400px] flex items-center justify-center">
              <p className="text-gray-600 text-sm">Person at laptop image</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Staying in touch
          </h3>
          <p className="text-base text-gray-700 mb-6 max-w-3xl mx-auto">
            At Good Finance, we keep investors in the loop with any events,
            opportunities, new tools / resources or focus areas that may be of
            interest.
          </p>
          <p className="text-base text-gray-700 mb-6">
            If you are not yet signed up to receive these quarterly updates,
            please sign up to our investor newsletter today!
          </p>
          <button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Sign up to the investor newsletter
          </button>
        </div>

        {/* For Advisors Section */}
        <div className="bg-indigo-900 py-8 text-center rounded-t-2xl">
          <h2 className="text-4xl font-bold text-white">For Advisors</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">
            <div className="p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Listing an Advisor profile on Good Finance
              </h3>
              <p className="text-base text-gray-700 mb-4">
                <strong>
                  If you have a track record in advisory services for charities,
                  social enterprises and community organisations, we'd love to
                  see your organisation listed in the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Advisor Directory
                  </a>
                  .
                </strong>
              </p>
              <p className="text-sm text-gray-700 mb-4">
                Advisors and advisory organisations are critical in supporting
                charities and social enterprises on their social investment
                journey; whether that be with financial modelling and business
                planning, or leadership training and impact management.
              </p>
              <p className="text-sm text-gray-700 mb-6">
                If you're already listed in the Advisor Directory, you can{" "}
                <a href="#" className="text-blue-600 underline">
                  log in
                </a>{" "}
                to ensure your profile is up to date.
              </p>
              <div className="flex gap-4">
                <button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Register your interest
                </button>
                <button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Log-in to my advisor profile
                </button>
              </div>
            </div>
            <div className="bg-amber-100 min-h-[400px] flex items-center justify-center">
              <p className="text-gray-600 text-sm">Advisor at laptop image</p>
            </div>
          </div>
        </div>

        {/* Eligibility Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Who is eligible to list via the Advisor Directory?
            </h3>
            <div className="bg-gray-200 h-48 rounded-lg mb-6 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Two people meeting image</p>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Great question! If you're an organisation or individual offering
              advisory services to charities, social enterprises and community
              organisations, you might be eligible for an organisation via the
              directory.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              In a nutshell, you must...
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-sm text-gray-700">
              <li>Have professional indemnity insurance</li>
              <li>
                Have supported a social purpose organisation in the last 6
                months
              </li>
              <li>
                Provide dedicated support to charities, social enterprises or
                community organisations
              </li>
              <li>Have more than one year of experience</li>
            </ul>
            <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Read the listing criteria
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              I'm an Advisor / Advisory Service – where do I sign up?
            </h3>
            <div className="bg-gray-200 h-48 rounded-lg mb-6 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                Business conversation image
              </p>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              The form is split out into five key sections and should take no
              longer than 10-minutes to complete. It might be helpful to check
              out the{" "}
              <a href="#" className="text-blue-600 underline">
                listing criteria guidance document
              </a>{" "}
              ahead of going through this process.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Once you have completed this form, it will take some time for the
              team here at Good Finance to review and approve your listing.
              We're aiming to turn around profiles within two weeks, but this is
              not guaranteed – please email{" "}
              <a
                href="mailto:aconstable@goodfinance.org.uk"
                className="text-blue-600 underline"
              >
                aconstable@goodfinance.org.uk
              </a>{" "}
              if you'd like an update on your profile.
            </p>
            <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Sign up to list as an advisor
            </button>
          </div>
        </div>

        {/* Boards and Trustees Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">
            <div className="p-12">
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">
                Social investment for boards and trustees
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                This information hub offers practical support and guidance to
                help board members of charities and social enterprises
                understand the opportunities and risks of social investment.
              </p>
              <p className="text-sm text-gray-700">
                Some of this content has been repurposed from content originally
                developed for Get Informed: Social Investment for Boards with
                the help of Better Society Capital in partnership with{" "}
                <a href="#" className="text-blue-600 underline">
                  Charity Commission
                </a>
                ,{" "}
                <a href="#" className="text-blue-600 underline">
                  Reach Volunteering
                </a>
                ,{" "}
                <a href="#" className="text-blue-600 underline">
                  Cass Business School
                </a>
                ,{" "}
                <a href="#" className="text-blue-600 underline">
                  Trustees Unlimited
                </a>
                ,{" "}
                <a href="#" className="text-blue-600 underline">
                  Association of Chairs
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 underline">
                  The Honorary Treasurers Forum
                </a>
                .
              </p>
            </div>
            <div className="bg-gray-200 min-h-[400px] flex items-center justify-center">
              <p className="text-gray-500 text-sm">Board meeting image</p>
            </div>
          </div>
        </div>

        {/* Three Resource Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-yellow-400 h-48 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-700 text-sm">Network illustration</p>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Hear from peers
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Watch short videos featuring trustees and directors on what social
              investment enabled them to do and what the biggest challenges
              were.
            </p>
            <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors w-full">
              Peer videos
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Two people talking image</p>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Stories</h3>
            <p className="text-sm text-gray-700 mb-4">
              Read individual stories from trustees and directors about their
              experience of taking on social investment.
            </p>
            <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors w-full">
              Read trustee stories
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-linear-to-br from-pink-400 to-purple-400 h-48 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-white text-sm">Colorful people illustration</p>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              More resources
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Additional resources for board members and trustees wanting to
              navigate finances and decision making for their organisation.
            </p>
            <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors w-full">
              Access further resources
            </button>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-purple-700 rounded-xl shadow-xl p-12 text-center text-white mb-8">
          <blockquote className="text-xl font-medium max-w-4xl mx-auto">
            "Social investment has provided us with the working capital needed
            to grow and meet the needs of the charity. Boards need to better
            understand the various options available and how social investment
            can support their charitable mission."
          </blockquote>
          <p className="text-lg mt-4 font-semibold">
            Azlina Bulmer, Chair, The Works
          </p>
        </div>

        {/* Podcasts, Videos & Blogs Section */}
        <div className="bg-indigo-900 py-8 text-center rounded-t-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Podcasts, Videos & Blogs
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {["All", "Blog", "Podcast", "Video"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  activeFilter === filter
                    ? filter === "Blog"
                      ? "bg-pink-600 text-white"
                      : filter === "Podcast"
                      ? "bg-purple-600 text-white"
                      : filter === "Video"
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-900"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {filteredContent.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div
                className={`py-2 text-center text-white font-semibold text-sm ${
                  card.type === "Blog"
                    ? "bg-pink-600"
                    : card.type === "Podcast"
                    ? "bg-purple-600"
                    : "bg-teal-600"
                }`}
              >
                {card.type}
              </div>
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Image placeholder</p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-700 mb-4">{card.description}</p>
                <button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            See all Blogs
          </button>
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            See all Podcasts
          </button>
          <button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            See all Videos
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
