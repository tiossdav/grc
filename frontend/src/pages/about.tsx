import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Users,
  Target,
  Eye,
  Heart,
  Globe,
  Award,
  Lightbulb,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Building2,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Sparkles,
  Users2,
  Zap,
  Phone,
} from "lucide-react";
import Francis from "@/assets/images/bod/Francis.png";
import Taibat from "@/assets/images/bod/Taibat.png";
import Ibiba from "@/assets/images/bod/Ibiba.png";
import temilade from "@/assets/images/bod/temilade.png";
import Joaanna from "@/assets/images/bod/Joaanna.png";
import laolu from "@/assets/images/bod/laolu.png";
import Aiyede from "@/assets/images/bod/Aiyede.png";
import mary from "@/assets/images/bod/mary.png";
import Ayodele from "@/assets/images/bod/Ayodele.png";
import tolu from "@/assets/images/bod/tolu.png";
import Adewumi from "@/assets/images/bod/Adewumi.png";
import { PageLoader } from "@/components/loaders/PageLoader";
import { usePageLoader } from "@/hooks/usePageLoader";

export default function AboutPage(): React.ReactElement {
  const [activeSection, setActiveSection] = useState("story");
  const { isLoading } = usePageLoader(1000);

  // Scroll to section when tab is clicked
  useEffect(() => {
    const element = document.getElementById(activeSection);
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 1200);
    }
  }, []);

  // Core Values
  const coreValues = [
    {
      icon: Heart,
      title: "Excellence",
      description:
        "We uphold the highest standards in research, mentorship, and academic support.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of networks, partnerships, and knowledge co-production.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Globe,
      title: "Pan-Africanism",
      description:
        "We are committed to advancing African scholarship and sustainable development across the continent and diaspora.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace interdisciplinary approaches and creative solutions to complex challenges.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We operate with transparency, accountability, and ethical responsibility in all our engagements.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Empowerment",
      description:
        "We equip scholars with skills, resources, and networks to thrive in academia and beyond.",
      color: "from-pink-500 to-pink-600",
    },
  ];

  // Board of Directors - Updated with actual members
  const boardOfDirectors = [
    {
      name: "Prof. Francis Egbokhare",
      role: "Board Member",
      image: Francis,
      bio: "Distinguished Nigerian academic and linguist, Professor of Linguistics and former Dean of the Faculty of Arts at the University of Lagos. Served as Vice-Chancellor of the University of Benin (2010-2020), championing institutional reforms and expanded research initiatives.",
      expertise: ["Linguistics", "Language Policy", "Educational Leadership"],
      affiliation: "University of Lagos",
    },
    {
      name: "Dr. Temilade Sesan",
      role: "Board Member",
      image: temilade,
      bio: "Sociologist (PhD Sociology and Social Policy, University of Nottingham) with research expertise in sustainable cities, energy access, agriculture and social protection. Works across sectors to identify pathways to greater inclusion of marginalized groups.",
      expertise: [
        "International Development",
        "Social Protection",
        "Sustainable Cities",
      ],
      affiliation: "University of Ibadan",
    },
    {
      name: "Mary Omoyeme Alheri Victor-Magaji",
      role: "Board Member",
      image: mary,
      bio: "Legal practitioner, human resource professional, and humanitarian committed to advancing the rights of women, youth, children, and persons with disabilities. Global Secretary of the Network of Women with Disabilities.",
      expertise: ["Human Rights Law", "Disability Rights", "Human Resources"],
      affiliation: "MAVIC Impact Foundation",
    },
    {
      name: "Prof. Taibat Lawanson",
      role: "Board Member",
      image: Taibat,
      bio: "Leading urban planner and heritage scholar, Leverhulme Professor of Planning and Heritage at the University of Liverpool, UK. Global Fellow at the Peace Research Institute Oslo and Vice President of the African Planners Institute.",
      expertise: [
        "Urban Planning",
        "Heritage Studies",
        "Environmental Justice",
      ],
      affiliation: "University of Liverpool",
    },
    {
      name: "Segun Ayodele",
      role: "Board Member",
      image: Ayodele,
      bio: "Board member with expertise in organizational development and research coordination.",
      expertise: ["Organizational Development", "Research Coordination"],
      affiliation: "Graduate Research Clinic",
    },
    {
      name: "Joanna Adewunmi",
      role: "Board Member",
      image: Joaanna,
      bio: "Doctoral candidate in the School of Information Sciences at the University of Illinois Urbana-Champaign. Research explores the intersection of information technology, information behavior, race, and gender, with focus on women in STEM.",
      expertise: ["Information Sciences", "Gender Studies", "STEM Equity"],
      affiliation: "University of Illinois Urbana-Champaign",
    },
    {
      name: "Toluwalase Adewunmi",
      role: "Board Member",
      image: tolu,
      bio: "Student at the University of Ibadan with strong emphasis on volunteerism, leadership, and community engagement. Millennium Fellow Class of 2025 and participant in the African Leadership Programme.",
      expertise: ["Youth Leadership", "Community Engagement", "Volunteerism"],
      affiliation: "University of Ibadan",
    },
    {
      name: "Prof. Remi Aiyede",
      role: "Board Member",
      image: Aiyede,
      bio: "Prominent Nigerian political scientist and governance expert, Professor of Political Institutions, Governance, and Public Policy at the University of Ibadan. Fellow of the Pan-African Scientific Research Council.",
      expertise: ["Political Science", "Governance", "Public Policy"],
      affiliation: "University of Ibadan",
    },
    {
      name: "Olaoluwa Oluwagbenga Aladejana",
      role: "Board Member",
      image: laolu,
      bio: "Seasoned technology expert with nearly two decades of experience in urban mobility and government digital transformation. Co-founder and Chief Technology Officer of Zenolynk Technology Limited.",
      expertise: [
        "Technology Leadership",
        "Urban Mobility",
        "Digital Transformation",
      ],
      affiliation: "Zenolynk Technology Limited",
    },
    {
      name: "Ibiba Odili",
      role: "Board Member",
      image: Ibiba,
      bio: "Retired Assistant Commander General of Narcotics from NDLEA. Founder/CEO of Phenomenal Strides Foundation promoting family and youth empowerment. UNODC-certified Master Trainer and author of 'Game Changing Parenting'.",
      expertise: [
        "Drug Prevention",
        "Youth Development",
        "Community Resilience",
      ],
      affiliation: "Phenomenal Strides Foundation",
    },
    {
      name: "Oluwatobiloba Adewunmi",
      role: "Board Member",
      image: Adewumi,
      bio: "Doctoral candidate at the Center for African Studies, University of Illinois Urbana-Champaign. Research focuses on climate change politics in post-1960 Lagos, urban political ecology, and sustainable development.",
      expertise: [
        "Climate Politics",
        "Urban Ecology",
        "Sustainable Development",
      ],
      affiliation: "University of Illinois Urbana-Champaign",
    },
  ];

  // Strategic Partners - Updated with actual partners
  const strategicPartners = [
    {
      name: "SHRIN",
      fullName: "Slum and Rural Health Initiative",
      type: "Health Organization",
      description:
        "Partnering to improve health outcomes in underserved communities",
    },
    {
      name: "NAL",
      fullName: "Nigerian Academy of Letters",
      type: "Academic Institution",
      description: "Collaboration on literary research and academic excellence",
    },
    {
      name: "NIIA",
      fullName: "Nigerian Institute of International Affairs",
      type: "Research Institute",
      description:
        "Joint research on international relations and policy analysis",
    },
    {
      name: "ASLI",
      fullName: "African Space Leadership Institute",
      type: "Space & Technology",
      description:
        "Advancing space science research and leadership development",
    },
    {
      name: "DiasporaNG",
      fullName: "DiasporaNG",
      type: "Diaspora Network",
      description: "Connecting African diaspora scholars and professionals",
    },
    {
      name: "HelpMum Africa",
      fullName: "HelpMum Africa",
      type: "NGO",
      description:
        "Supporting maternal health and women's empowerment initiatives",
    },
    {
      name: "Duke of Shomolu Foundation",
      fullName: "Duke of Shomolu Foundation",
      type: "Foundation",
      description: "Community development and educational advancement programs",
    },
    {
      name: "Achievers University, Owo",
      fullName: "Achievers University, Owo",
      type: "Educational Institution",
      description: "Academic collaboration and capacity building initiatives",
    },
  ];

  // Impact Statistics
  const impactStats = [
    { number: "2,500+", label: "Scholars Supported", icon: GraduationCap },
    { number: "15", label: "African Countries", icon: Globe },
    { number: "50+", label: "Partner Organizations", icon: Handshake },
    { number: "120+", label: "Research Projects", icon: BookOpen },
    { number: "85%", label: "Graduation Rate", icon: Award },
    { number: "200+", label: "Publications Supported", icon: Star },
  ];

  // Milestones
  const milestones = [
    {
      year: "2019",
      title: "Foundation Year",
      description:
        "The Graduate Research Clinic was established with a vision to transform African scholarship.",
      icon: Sparkles,
    },
    {
      year: "2020",
      title: "First Cohort Launch",
      description:
        "Launched our inaugural mentorship program with 50 graduate students across 5 countries.",
      icon: Users,
    },
    {
      year: "2021",
      title: "Pan-African Expansion",
      description:
        "Expanded operations to 10 African countries and established strategic partnerships.",
      icon: Globe,
    },
    {
      year: "2022",
      title: "Research Excellence Awards",
      description:
        "Introduced annual awards recognizing outstanding research by early career scholars.",
      icon: Award,
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description:
        "Launched comprehensive online platform and virtual workshops reaching 1,000+ scholars.",
      icon: Zap,
    },
    {
      year: "2024",
      title: "Global Recognition",
      description:
        "Recognized by UNESCO and African Union as a leading capacity-building organization.",
      icon: Star,
    },
  ];

  // Priority Areas
  const priorityAreas = [
    "Setting high-level research and publishing goals",
    "Embracing Inter/Multi/Trans-disciplinarity and Improving the use of mixed methodology",
    "Thriving in graduate school and graduating in record time",
    "Soft skills for graduate students, early career scholars and tenured professors",
    "Entering the Job Market after (graduate) School",
    "Strategies for achieving tenure/professorship in record time",
    "Building a mental health support system",
    "Achieving Work-Study-Life-Family-Spirit balance",
    "Digital and Information Technology skills for researchers",
    "How to become a Public Scholar",
    "How to Become an Academic Consultant (Acadepreneurship)",
    "Leaving the Academia and Becoming an Independent Scholar",
    "Preparing for Post-Retirement",
  ];

  return (
    <>
      <PageLoader loading={isLoading} message="Loading About Us..." />

      {!isLoading && (
        <div className="bg-linear-to-b from-purple-50 to-white min-h-screen">
          <Header />

          {/* Hero Section */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-[#95111c] via-[#7a0e16] to-[#95111c]">
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4zIi8+PC9nPjwvc3ZnPg==')]"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-yellow-400 px-6 py-2 rounded-full mb-6">
                  <Heart className="w-5 h-5 text-gray-900" />
                  <span className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                    About Us
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Empowering African Scholars to Transform the World
                </h1>

                <p className="text-xl text-white/90 mb-10 leading-relaxed">
                  We are a pan-African non-profit organization dedicated to
                  fostering research excellence, building networks, and
                  empowering the next generation of African scholars and
                  researchers.
                </p>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <section className="sticky top-16 bg-white/95 backdrop-blur-sm z-40 shadow-sm py-4 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { id: "story", label: "Our Story" },
                  { id: "mission", label: "Vision & Mission" },
                  { id: "values", label: "Core Values" },
                  { id: "team", label: "Our Team" },
                  { id: "partners", label: "Partners" },
                  { id: "impact", label: "Our Impact" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeSection === tab.id
                        ? "bg-[#95111c] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Our Story */}
            <section id="story" className="mb-32 scroll-mt-32">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-[#95111c] mb-8 flex items-center gap-3">
                  <BookOpen className="w-10 h-10" />
                  Our Story
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The Graduate Research Clinic was born from a simple but
                    powerful observation: African graduate students and early
                    career scholars often face unique challenges that impede
                    their academic progress and professional development. From
                    limited access to mentorship and resources to navigating
                    complex academic systems, these barriers were preventing
                    brilliant minds from reaching their full potential.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Founded in 2019, our organization emerged as a direct
                    response to these challenges. We recognized that African
                    scholarship needed more than just funding—it needed a
                    comprehensive support system that would address the entire
                    academic value chain, from undergraduate research to
                    post-retirement planning.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    What began as a small mentorship initiative connecting 50
                    graduate students with experienced researchers has evolved
                    into a pan-African movement spanning 15 countries,
                    supporting over 2,500 scholars, and partnering with 50+
                    leading institutions and organizations.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Today, The Graduate Research Clinic stands as a testament to
                    the power of collaboration, mentorship, and community. We
                    have facilitated hundreds of research projects, supported
                    countless publications, and created pathways for academic
                    excellence that are uniquely African yet globally
                    competitive.
                  </p>

                  <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-xl p-8 my-8 border border-purple-200">
                    <p className="text-lg font-semibold text-[#95111c] italic">
                      "Our vision is not just to support African scholars—it's
                      to create a thriving ecosystem where African research
                      leads global conversations on development, innovation, and
                      social transformation."
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                      — Founder's Vision Statement
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Vision & Mission */}
            <section id="mission" className="mb-32 scroll-mt-32">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Vision */}
                <div className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-2xl shadow-2xl p-8 text-white h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Eye className="w-10 h-10 text-yellow-400" />
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>

                  <p className="text-white/95 leading-relaxed text-lg grow">
                    To be one of the topmost African non-profit organizations
                    that fosters innovative research and collaboration across
                    disciplines, generations, and geographical boundaries,
                    empowering African scholars and professionals to address
                    complex global challenges and contribute to the advancement
                    of African/African Diaspora studies and sustainable
                    development in Africa and beyond!
                  </p>
                </div>

                {/* Mission */}
                <div className="bg-linear-to-br from-purple-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-10 h-10 text-yellow-400" />
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>

                  <p className="text-white/95 leading-relaxed text-lg mb-6 grow">
                    To create a powerful support system/network at all levels of
                    the academic value chain, especially for (under)graduate
                    students, early career scholars and budding acadepreneurs
                    from various disciplines, backgrounds, research interests,
                    ideological persuasions, cultural orientations, countries
                    etc. by connecting them to established, skilled experts and
                    mentors within and outside the academia for knowledge
                    transfer and co-production.
                  </p>

                  <div className="pt-6 border-t border-white/20">
                    <p className="text-sm text-white/90">
                      <strong>Ultimate Purpose:</strong> Fostering collaboration
                      for finding solutions to development challenges in Africa
                      and her Diaspora, opening doors of opportunities for
                      career mobility, and empowering the next generation of
                      African researchers and development practitioners.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Values */}
            <section id="values" className="mb-32 scroll-mt-32">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#95111c] mb-4">
                  Our Core Values
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  The principles that guide our work and define our commitment
                  to African scholarship
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreValues.map((value, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100 group h-full flex flex-col"
                  >
                    <div
                      className={`inline-flex p-4 bg-linear-to-br ${value.color} rounded-xl mb-6 group-hover:scale-110 transition-transform self-start`}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed grow">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Priority Areas */}
              <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 border border-blue-100 mt-16">
                <h2 className="text-3xl font-bold text-[#95111c] mb-8 flex items-center gap-3">
                  <Target className="w-8 h-8" />
                  Priority Areas of Intervention
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {priorityAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-800">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Board of Directors */}
            <section id="team" className="mb-32 scroll-mt-32">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#95111c] mb-4">
                  Board of Directors
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Distinguished scholars and practitioners providing strategic
                  guidance and leadership
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {boardOfDirectors.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 h-full flex flex-col"
                  >
                    {/* Header with Image */}
                    <div className="bg-linear-to-br from-[#95111c] to-[#7a0e16] p-6">
                      <div className="flex items-center gap-6">
                        <div className="w-28 h-28 bg-white rounded-xl overflow-hidden shrink-0">
                          {member.image ? (
                            <img
                              src={`${member.image}`}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#95111c] text-3xl font-bold">
                              <span>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {member.name}
                          </h3>
                          <p className="text-yellow-400 font-semibold mb-1">
                            {member.role}
                          </p>
                          <p className="text-white/80 text-sm">
                            {member.affiliation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 grow flex flex-col">
                      <p className="text-gray-700 leading-relaxed mb-6 grow">
                        {member.bio}
                      </p>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#95111c]" />
                          Areas of Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((exp, eidx) => (
                            <span
                              key={eidx}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Strategic Partners */}
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

            {/* Our Impact */}
            <section id="impact" className="mb-20 scroll-mt-32">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#95111c] mb-4">
                  Our Impact in Numbers
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Transforming African scholarship one scholar at a time
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {impactStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                      <stat.icon className="w-8 h-8 text-[#95111c]" />
                    </div>
                    <div className="text-4xl font-bold text-[#95111c] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Milestones Timeline */}
              <div className="bg-linear-to-br from-gray-50 to-purple-50 rounded-2xl p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-[#95111c] mb-12 text-center">
                  Our Journey: Key Milestones
                </h3>

                <div className="space-y-8">
                  {milestones.map((milestone, idx) => (
                    <div key={idx} className="flex gap-6 items-start group">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-12 h-12 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <milestone.icon className="w-6 h-6 text-white" />
                        </div>
                        {idx < milestones.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-300 my-2"></div>
                        )}
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-[#95111c]">
                            {milestone.year}
                          </span>
                          <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-2xl shadow-2xl p-12 text-white text-center">
              <Users2 className="w-16 h-16 mx-auto mb-6 text-yellow-400" />

              <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>

              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Whether you're a graduate student seeking mentorship, an
                established scholar wanting to give back, or an organization
                looking to partner—there's a place for you in our community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105">
                  <GraduationCap className="w-5 h-5" />
                  Join as a Scholar
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl transition-all border-2 border-white/30 flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Become a Mentor
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl transition-all border-2 border-white/30 flex items-center justify-center gap-2">
                  <Handshake className="w-5 h-5" />
                  Partner With Us
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                <div className="flex flex-wrap gap-6 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>info@graduateresearchclinic.org</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+234 XXX XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Pan-African | Based in Nigeria</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
}
