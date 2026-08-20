import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import library from "@/assets/images/library.jpg";
import { DonationModal } from "@/components/DonationModal";
import {
  BookOpen,
  Users,
  Globe,
  GraduationCap,
  Target,
  Network,
  Award,
  ChevronRight,
  TrendingUp,
  Heart,
  Calendar,
  Mail,
  Star,
  Quote,
  Download,
  ArrowRight,
} from "lucide-react";
import { useLocation } from "wouter";
import { TbCurrencyNaira } from "react-icons/tb";
import { usePageLoader } from "@/hooks/usePageLoader";
import { PageLoader } from "@/components/loaders/PageLoader";
import { SEO } from "@/components/seo/SEO";

const Home = () => {
  const { isLoading } = usePageLoader(1200); // 1.2 seconds minimum
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
    vision: false,
    priority: false,
    donation: false,
    events: false,
    testimonails: false,
    capacity: false,
  });
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedDonationAmount, setSelectedDonationAmount] = useState<
    number | null
  >(null);
  const [showNudge, setShowNudge] = useState(true);

  // Update the donation button clicks to open the modal
  const handleDonateClick = (amount?: number) => {
    setSelectedDonationAmount(amount || null);
    setIsDonationModalOpen(true);
  };

  const openAboutPage = () => {
    setLocation("/about");
  };

  const openPrograms = () => {
    setLocation("/learning-hub");
  };

  useEffect(() => {
    if (isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 },
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading]);

  const priorityAreas = [
    {
      icon: Target,
      title: "Research Excellence",
      desc: "Setting high-level research and publishing goals",
    },
    {
      icon: Network,
      title: "Interdisciplinary Approach",
      desc: "Embracing multi-disciplinary collaboration",
    },
    {
      icon: GraduationCap,
      title: "Graduate Success",
      desc: "Thriving in graduate school in record time",
    },
    {
      icon: Award,
      title: "Career Development",
      desc: "Strategies for tenure and professorship",
    },
    {
      icon: Heart,
      title: "Mental Wellness",
      desc: "Building a mental health support system",
    },
    {
      icon: TrendingUp,
      title: "Work-Life Balance",
      desc: "Achieving holistic life balance",
    },
  ];

  const capacityBuilding = [
    "Applying for funded PhD/Post-doc",
    "Research Methodology & Design",
    "Academic Writing & Publishing",
    "Grantsmanship & Funding",
    "Professional Profile Building",
    "Emotional Intelligence & Mental Health",
  ];

  const donationOptions = [
    {
      amount: 50000,
      impact:
        "Support a one year mentorship session for an undergraduate or postgraduate student",
    },
    {
      amount: 250000,
      impact:
        "Support a training workshop/masterclass for up to 5 early career researchers",
    },
    {
      amount: 1000000,
      impact:
        "Fund the provision of books and materials for an interdisciplinary research lab for up to 10 scholars",
    },
    {
      amount: 10000000,
      impact:
        "Support a multi-year research and program development projects in several knowledge-based institutions",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Amara Okafor",
      role: "Postdoctoral Researcher, University of Lagos",
      text: "The Graduate Research Clinic connected me with mentors who transformed my research approach. I successfully published 3 papers in top-tier journals!",
      rating: 5,
    },
    {
      name: "Ibrahim Mensah",
      role: "PhD Candidate, University of Ghana",
      text: "The capacity building programs gave me the skills to secure a fully-funded PhD position. Forever grateful for this community!",
      rating: 5,
    },
    {
      name: "Prof. Naledi Mbatha",
      role: "Associate Professor, University of Cape Town",
      text: "As a mentor in this network, I've witnessed incredible growth in young African scholars. This is the future of African academia!",
      rating: 5,
    },
  ];

  const upcomingEvents = [
    {
      date: "15 Feb",
      title: "Grant Writing Workshop",
      type: "Virtual Workshop",
      spots: "25 spots left",
    },
    {
      date: "22 Feb",
      title: "Academic Publishing Masterclass",
      type: "Webinar Series",
      spots: "Open Registration",
    },
    {
      date: "05 Mar",
      title: "Mentorship Networking Event",
      type: "Hybrid Event",
      spots: "Limited Seats",
    },
  ];

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-NG").format(amount);

  return (
    <>
      <SEO
        title="Graduate Research Clinic - Home"
        description="Empowering African scholars through research collaboration, mentorship, and funding opportunities"
        keywords="African scholars, research network, academic funding, graduate studies, PhD programs Africa"
        url="https://graduateresearchclinic.org"
      />
      <PageLoader
        loading={isLoading}
        message="Loading Graduate Research Clinic..."
      />

      {!isLoading && (
        <div className="bg-linear-to-b from-purple-50 to-white">
          <Header />

          {/* Hero Section */}
          <section className="relative min-h-[85vh] w-full overflow-hidden">
            <img
              src={library}
              alt="Academic library"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#95111c]/90 via-[#95111c]/70 to-transparent" />

            <div className="relative z-10 flex flex-col h-full min-h-[85vh] justify-center px-4 sm:px-6 lg:px-12">
              <div className="max-w-7xl mx-auto w-full">
                <div className="max-w-3xl text-white space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                  <div className="flex items-center gap-2 text-yellow-400 mb-4">
                    <span className="text-sm font-semibold tracking-wider uppercase">
                      The Graduate Research Clinic
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    Empowering African Scholars
                  </h1>

                  <p className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl">
                    Connecting researchers, mentors, and innovators to advance
                    African scholarship and solve real-world development
                    challenges across the continent and diaspora.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      size="lg"
                      className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-6 text-lg group"
                    >
                      Join Our Network
                      <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      onClick={openPrograms}
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-[#95111c] font-semibold px-8 py-6 text-lg"
                    >
                      Explore Programs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-linear-to-r from-[#95111c] to-[#7a0e16] py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {[
                  { number: "500+", label: "Scholars Connected" },
                  { number: "50+", label: "Research Projects" },
                  { number: "30+", label: "Countries Reached" },
                  { number: "100+", label: "Publications Supported" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center animate-in fade-in zoom-in duration-700"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="text-3xl lg:text-5xl font-bold text-yellow-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm lg:text-base text-white/90">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vision & Mission - Simplified */}
          <section
            id="vision"
            data-animate
            // ref={addToObserver}
            className={`relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8  transition-all duration-1000 ${
              isVisible["vision"] === true
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-white to-blue-50 opacity-60"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzk1MTExYyIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

            <div className="max-w-4xl mx-auto relative text-center">
              {/* Section Header */}
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#95111c] mb-4">
                  Vision & Mission
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Driving excellence in African scholarship through
                  collaboration and innovation
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={openAboutPage}
                className="bg-[#95111c] hover:bg-[#7a0e16] cursor-pointer text-white font-bold px-8 py-4 rounded-lg transition-all hover:shadow-lg group inline-flex items-center"
              >
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Priority Areas */}
          <section
            id="priority"
            data-animate
            className={`py-16 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
              isVisible["priority"] === true
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#95111c] mb-4">
                  Priority Areas
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Strategic interventions designed to empower African scholars
                  at every stage of their academic journey
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {priorityAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="group bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="p-4 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                      <area.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#95111c] mb-3">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Donation Section */}
          <section
            id="donation"
            data-animate
            className={`py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-yellow-50 to-orange-50 transition-all duration-1000 ${
              isVisible["donation"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-yellow-200 px-4 py-2 rounded-full mb-4">
                  <Heart className="w-5 h-5 text-[#95111c]" />
                  <span className="text-sm font-semibold text-[#95111c]">
                    Support Our Mission
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#95111c] mb-4">
                  Make an Impact Today
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                  Your donation empowers the next generation of African scholars
                  and researchers
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Donation Options */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#95111c] mb-4 sm:mb-6">
                      Select Amount
                    </h3>

                    {/* Preset Amounts - Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                      {donationOptions.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedDonation(option.amount)}
                          className={`p-4 sm:p-6 cursor-pointer rounded-xl border-2 transition-all text-left ${
                            selectedDonation === option.amount
                              ? "border-[#95111c] bg-[#95111c] text-white shadow-lg scale-105"
                              : "border-gray-200 hover:border-[#95111c] hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center gap-0.5 text-2xl sm:text-3xl font-bold mb-2">
                            <TbCurrencyNaira className="w-8 h-8 sm:w-9 sm:h-9 " />
                            <span>{formatAmount(option.amount)}</span>
                          </div>
                          <div
                            className={`text-xs sm:text-sm ${
                              selectedDonation === option.amount
                                ? "text-white/90"
                                : "text-gray-600"
                            }`}
                          >
                            {option.impact}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Custom Amount
                      </label>
                      <div className="relative">
                        <TbCurrencyNaira className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          placeholder="Enter amount"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#95111c] focus:outline-none text-base"
                          onChange={(e) =>
                            setSelectedDonation(Number(e.target.value))
                          }
                        />
                      </div>
                    </div>

                    {/* Donate Button */}
                    <Button
                      size="lg"
                      onClick={() =>
                        handleDonateClick(selectedDonation ?? undefined)
                      }
                      className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 sm:py-6 text-base sm:text-lg"
                    >
                      <Heart className="mr-2 w-5 h-5" />
                      Donate Now
                    </Button>
                  </div>

                  {/* Impact Info */}
                  <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#95111c] mb-4 sm:mb-6">
                      Your Impact
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        {
                          icon: GraduationCap,
                          text: "Fund scholarships for emerging scholars",
                        },
                        {
                          icon: BookOpen,
                          text: "Provide access to research resources",
                        },
                        { icon: Users, text: "Connect mentors with students" },
                        {
                          icon: Globe,
                          text: "Support pan-African collaboration",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 sm:gap-4"
                        >
                          <div className="p-2 bg-white rounded-lg shrink-0">
                            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#95111c]" />
                          </div>
                          <p className="text-sm sm:text-base text-gray-700 pt-1">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white rounded-lg border-l-4 border-[#95111c]">
                      <p className="text-xs sm:text-sm text-gray-600 italic">
                        "Every donation, no matter the size, creates ripple
                        effects across the African academic community."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <DonationModal
            isOpen={isDonationModalOpen}
            onClose={() => setIsDonationModalOpen(false)}
            preselectedAmount={selectedDonationAmount}
          />

          {/* Upcoming Events */}
          <section
            id="events"
            data-animate
            className={`py-16 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
              isVisible["events"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#95111c] mb-4">
                  Register for Upcoming Events{" "}
                </h2>
                <p className="text-xl text-gray-600">
                  Join our workshops, webinars, and networking events
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {upcomingEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="bg-linear-to-r from-[#95111c] to-[#7a0e16] p-6 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-6 h-6" />
                        <span className="text-2xl font-bold">{event.date}</span>
                      </div>
                      <div className="text-sm opacity-90">{event.type}</div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#95111c] mb-3 group-hover:text-[#7a0e16] transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {event.spots}
                        </span>
                        <Button
                          size="sm"
                          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#95111c] text-[#95111c] hover:bg-[#95111c] hover:text-white font-semibold px-8"
                >
                  View All Events
                </Button>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section
            id="testimonials"
            data-animate
            className={`py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-purple-50 to-blue-50 transition-all duration-1000 ${
              isVisible["testimonials"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#95111c] mb-4">
                  Success Stories
                </h2>
                <p className="text-xl text-gray-600">
                  Hear from scholars whose lives we've transformed
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
                  >
                    <Quote className="w-10 h-10 text-yellow-500 mb-4" />

                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>

                    <div className="border-t pt-4">
                      <p className="font-bold text-[#95111c]">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Capacity Building */}
          <section
            id="capacity"
            data-animate
            className={`py-16 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
              isVisible["capacity"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 text-[#95111c] mb-4">
                    <GraduationCap className="w-6 h-6" />
                    <span className="text-sm font-semibold tracking-wider uppercase">
                      Capacity Building
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#95111c] mb-6">
                    Comprehensive Training Programs
                  </h2>
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                    Tailored capacity building for pre-doctoral, doctoral, and
                    post-doctoral candidates across all disciplines and research
                    interests.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-8"
                    >
                      View All Programs
                      <ChevronRight className="ml-2" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#95111c] text-[#95111c] hover:bg-[#95111c] hover:text-white font-semibold px-8"
                    >
                      <Download className="mr-2 w-5 h-5" />
                      Download Brochure
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {capacityBuilding.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all hover:translate-x-2 animate-in slide-in-from-right duration-700"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="p-2 bg-yellow-100 rounded-lg shrink-0">
                        <BookOpen className="w-5 h-5 text-[#95111c]" />
                      </div>
                      <span className="font-medium text-gray-800">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-[#95111c] to-[#7a0e16]">
            <div className="max-w-4xl mx-auto text-center">
              <Mail className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Stay Connected
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get updates on programs, events, and opportunities for African
                scholars
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 whitespace-nowrap"
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#95111c] mb-6">
                Ready to Advance Your Research Career?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Join a thriving community of African scholars, researchers, and
                mentors committed to excellence and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-10 py-6 text-lg"
                >
                  Become a Member
                </Button>
                <Button
                  size="lg"
                  className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-10 py-6 text-lg"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </section>

          {/* Floating Donate Button */}
          {!isDonationModalOpen && (
            <div className="fixed bottom-6 right-6 z-50">
              <button
                onClick={() => handleDonateClick()}
                className="group flex items-center gap-3 bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold px-5 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline">Donate</span>
              </button>
            </div>
          )}

          <Footer />

          {/* Call for Applications Nudge */}
          {showNudge && (
            <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500 max-w-sm w-full">
              <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-[#95111c] overflow-hidden p-1">
                <div className="relative p-5">
                  <button 
                    onClick={() => setShowNudge(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-1 transition-colors"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                  
                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-lg">Call for Applications!</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        We are currently hiring for multiple positions. Join our mission to transform African research.
                      </p>
                      <button 
                        onClick={() => {
                          setShowNudge(false);
                          setLocation("/careers");
                        }}
                        className="text-sm font-bold text-white bg-[#95111c] hover:bg-[#7a0e16] px-4 py-2 rounded-lg transition-colors w-full text-center shadow-sm cursor-pointer"
                      >
                        View Open Roles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
