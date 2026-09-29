import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Users,
  Handshake,
  Globe,
  Target,
  Briefcase,
  GraduationCap,
  Heart,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  Building2,
  Calendar,
  FileText,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function PartnerPortal(): React.ReactElement {
  const [, setPartnerType] = useState<string | null>(null);

  const partnershipTypes = [
    {
      icon: GraduationCap,
      title: "Academic Institutions",
      description:
        "Universities, research centers, and educational organizations",
      benefits: [
        "Joint research initiatives",
        "Student exchange programs",
        "Collaborative workshops and seminars",
        "Shared resources and expertise",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Building2,
      title: "Corporate Partners",
      description:
        "Private sector organizations committed to research and development",
      benefits: [
        "Sponsored research projects",
        "Internship opportunities for scholars",
        "Funding for capacity building",
        "Industry-academia knowledge exchange",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Heart,
      title: "NGOs & Foundations",
      description: "Non-profit organizations supporting African development",
      benefits: [
        "Grant funding opportunities",
        "Collaborative advocacy initiatives",
        "Community engagement programs",
        "Policy research partnerships",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Globe,
      title: "International Organizations",
      description: "Global bodies fostering research and development in Africa",
      benefits: [
        "Cross-border research collaboration",
        "Access to global networks",
        "Capacity building programs",
        "International conference participation",
      ],
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  // const currentPartners = [
  //   {
  //     name: "African Research Universities Alliance",
  //     type: "Academic Institution",
  //     since: "2022",
  //     focus: "Multi-disciplinary research",
  //     logo: null,
  //   },
  //   {
  //     name: "Gates Foundation Africa",
  //     type: "Foundation",
  //     since: "2023",
  //     focus: "Health & Development",
  //     logo: null,
  //   },
  //   {
  //     name: "Pan-African University",
  //     type: "Academic Institution",
  //     since: "2021",
  //     focus: "Graduate education",
  //     logo: null,
  //   },
  //   {
  //     name: "African Development Bank",
  //     type: "International Organization",
  //     since: "2023",
  //     focus: "Economic research",
  //     logo: null,
  //   },
  // ];

  // Strategic Partners - Updated with actual partners

  const [strategicPartners, setStrategicPartners] = useState<any[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/partners`);
        const data = await response.json();
        if (data.success) {
          setStrategicPartners(data.data.map((p: any) => ({
            name: p.name,
            fullName: p.full_name || p.name,
            type: p.type || "Partner",
            description: p.description || "",
          })));
        }
      } catch (err) {
        console.error("Failed to fetch partners", err);
      }
    };
    fetchPartners();
  }, []);

  const partnershipOpportunities = [
    {
      title: "Collaborative Research Grants",
      description:
        "Co-fund research projects addressing African development challenges",
      icon: Target,
      type: "Funding",
    },
    {
      title: "Mentorship Programs",
      description:
        "Provide expert mentors for early career scholars and graduate students",
      icon: Users,
      type: "Capacity Building",
    },
    {
      title: "Resource Sharing",
      description:
        "Share libraries, databases, laboratories, and digital tools",
      icon: BookOpen,
      type: "Infrastructure",
    },
    {
      title: "Joint Publications",
      description:
        "Co-author research papers, policy briefs, and thought leadership pieces",
      icon: FileText,
      type: "Knowledge Production",
    },
    {
      title: "Conference Sponsorship",
      description:
        "Support annual conferences, workshops, and training programs",
      icon: Calendar,
      type: "Events",
    },
    {
      title: "Career Development",
      description:
        "Offer internships, job placements, and professional development opportunities",
      icon: Briefcase,
      type: "Employment",
    },
  ];

  const impactMetrics = [
    { number: "50+", label: "Active Partnerships", icon: Handshake },
    { number: "2,500+", label: "Scholars Supported", icon: GraduationCap },
    { number: "15", label: "Countries Reached", icon: Globe },
    { number: "120+", label: "Research Projects", icon: BookOpen },
  ];

  const testimonials = [
    {
      quote:
        "Our partnership with The Graduate Research Clinic has opened doors for our researchers to collaborate across borders and disciplines. The impact has been transformative.",
      author: "Dr. Amina Okoro",
      position: "Director of Research",
      organization: "East African University Consortium",
    },
    {
      quote:
        "Supporting early career scholars through this platform aligns perfectly with our mission. The mentorship framework is excellent and yields measurable results.",
      author: "Prof. Kwame Mensah",
      position: "Program Director",
      organization: "African Scholars Foundation",
    },
  ];

  return (
    <div className="bg-linear-to-b from-purple-50 to-white min-h-screen font-montserrat">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#95111c] via-[#7a0e16] to-[#95111c]">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4zIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        {/* Breadcrumb Navigation */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-20">
          <Breadcrumb current="Partner Portal" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400 px-6 py-2 rounded-full mb-6">
              <Handshake className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Partner Portal
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Collaborate. Empower. Transform.
            </h1>

            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Join us in building Africa's future through research excellence,
              knowledge sharing, and sustainable partnerships that empower the
              next generation of African scholars.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:scale-105">
                Become a Partner
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl transition-all border-2 border-white/30">
                Download Partnership Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <metric.icon className="w-8 h-8 text-[#95111c]" />
                </div>
                <div className="text-3xl font-bold text-[#95111c] mb-1">
                  {metric.number}
                </div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Partnership Types */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We welcome diverse partnerships that align with our mission to
              empower African scholars and advance research excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100 group cursor-pointer flex flex-col"
                onClick={() => setPartnerType(type.title)}
              >
                {/* Icon - Fixed width container */}
                <div className="mb-6">
                  <div
                    className={`p-4 bg-linear-to-br ${type.color} rounded-xl inline-flex group-hover:scale-110 transition-transform`}
                  >
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#95111c] transition-colors">
                  {type.title}
                </h3>

                <p className="text-gray-600 mb-6">{type.description}</p>

                {/* Benefits list with flex-1 to push button down */}
                <div className="space-y-3 flex-1 mb-6">
                  {type.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Button - Always at bottom */}
                <button className="cursor-pointer w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Collaboration Areas */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Ways to Collaborate
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple pathways to support our mission and create meaningful
              impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipOpportunities.map((opp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-[#95111c] transition-colors">
                    <opp.icon className="w-6 h-6 text-[#95111c] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {opp.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#95111c] transition-colors">
                  {opp.title}
                </h3>

                <p className="text-sm text-gray-600">{opp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Partners */}
        <section id="partners" className="mb-32 scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Our Strategic Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating with leading institutions to amplify our impact
              across Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategicPartners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-white to-purple-50 rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-purple-100 text-center flex flex-col"
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-[#95111c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-10 h-10 text-white" />
                </div>

                {/* Partner Name - Fixed height */}
                <h3 className="font-bold text-2xl text-gray-900 min-h-12 flex items-center justify-center">
                  {partner.name}
                </h3>

                {/* Full Name - Fixed height */}
                <p className="text-sm text-gray-600 mb-3 min-h-10 flex items-center justify-center">
                  {partner.fullName}
                </p>

                {/* Type Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {partner.type}
                  </span>
                </div>

                {/* Description - Flexible space, pushes to bottom */}
                <div className="pt-3 border-t border-purple-200 mt-auto">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 mx-auto shadow-lg hover:scale-105">
              Become a Partner
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Partner Testimonials
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                    </p>
                    <p className="text-sm text-purple-600">
                      {testimonial.organization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-2xl shadow-2xl p-12 text-white text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-400" />

          <h2 className="text-4xl font-bold mb-4">Ready to Make an Impact?</h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our growing network of partners committed to advancing African
            research excellence and empowering the next generation of scholars.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105">
              <Mail className="w-5 h-5" />
              Get in Touch
            </button>
            <button className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl transition-all border-2 border-white/30 flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              Partnership Proposal Template
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4">
              Contact Our Partnerships Team
            </h3>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>partnerships@graduateresearchclinic.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 XXX XXX XXXX</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
