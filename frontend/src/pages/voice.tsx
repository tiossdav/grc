// File: src/pages/Voices.tsx
import { useState } from "react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Mic,
  Video,
  BookOpen,
  Globe,
  Bell,
  Play,
  Pause,
  Clock,
  User,
  Calendar,
  TrendingUp,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronRight,
  Search,
  Rss,
  Headphones,
  Youtube,
  Radio,
  FileText,
  AlertCircle,
  Eye,
  Download,
  ExternalLink,
  MapPin,
  Users,
  Award,
  Sparkles,
  Volume2,
  SkipBack,
  SkipForward,
  List,
  X,
} from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";

interface Video {
  title: string;
  organization: string;
  duration: string;
  views: string;
  category: string;
  urgent: boolean;
  region: string;
  description: string;
  embedUrl: string;
  image: string;
}

interface Podcast {
  id: number;
  title: string;
  host: string;
  duration: string;
  episode: string;
  listens: string;
  date: string;
  image: null;
  description: string;
  topics: string[];
  audioUrl: string;
  region: string;
}



export default function Voices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [showPlaylist, setShowPlaylist] = useState<number | false>(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = [
    { id: "all", label: "All Content", icon: Globe },
    { id: "podcasts", label: "Podcasts", icon: Mic },
    { id: "videos", label: "Videos", icon: Video },
    { id: "blogs", label: "Blog Articles", icon: BookOpen },
    { id: "awareness", label: "Public Awareness", icon: Bell },
    { id: "global", label: "Global Insights", icon: Globe },
  ];

  const regions = [
    { id: "all", label: "All Regions", icon: Globe },
    { id: "west", label: "West Africa", flag: "🇳🇬" },
    { id: "east", label: "East Africa", flag: "🇰🇪" },
    { id: "southern", label: "Southern Africa", flag: "🇿🇦" },
    { id: "north", label: "North Africa", flag: "🇪🇬" },
    { id: "central", label: "Central Africa", flag: "🇨🇩" },
  ];

  const featuredPodcasts = [
    {
      id: 1,
      title: "Navigating PhD Life in Africa",
      host: "Dr. Amara Johnson",
      duration: "45:32",
      episode: "Episode 12",
      listens: "12.5K",
      date: "Jan 15, 2026",
      image: null,
      description:
        "Practical strategies for balancing research, funding, and life as a doctoral student across African institutions.",
      topics: ["PhD Journey", "Research Tips", "Work-Life Balance"],
      audioUrl: "#",
      region: "west",
    },
    {
      id: 2,
      title: "Breaking Barriers in STEM Research",
      host: "Prof. Kwame Osei",
      duration: "52:18",
      episode: "Episode 8",
      listens: "18.2K",
      date: "Jan 12, 2026",
      image: null,
      description:
        "Inspiring stories of African researchers making groundbreaking discoveries in science and technology.",
      topics: ["STEM", "Innovation", "Success Stories"],
      audioUrl: "#",
      region: "west",
    },
    {
      id: 3,
      title: "Funding Your Research Dreams",
      host: "Dr. Fatima Hassan",
      duration: "38:45",
      episode: "Episode 5",
      listens: "9.8K",
      date: "Jan 8, 2026",
      image: null,
      description:
        "Expert advice on securing grants, scholarships, and alternative funding sources for African scholars.",
      topics: ["Grants", "Scholarships", "Funding"],
      audioUrl: "#",
      region: "north",
    },
  ];

  const videoPlaylists = [
    {
      id: 1,
      title: "Research Essentials Series",
      videoCount: 12,
      totalDuration: "3h 45min",
      thumbnail: null,
      description: "Complete guide to research methodology and best practices",
      videos: [
        {
          title: "Introduction to Research Design",
          duration: "18:30",
          views: "45K",
        },
        {
          title: "Qualitative vs Quantitative Methods",
          duration: "22:15",
          views: "38K",
        },
        {
          title: "Data Collection Techniques",
          duration: "25:40",
          views: "32K",
        },
        {
          title: "Ethical Research Practices",
          duration: "20:10",
          views: "29K",
        },
      ],
    },
    {
      id: 2,
      title: "African Climate Research",
      videoCount: 8,
      totalDuration: "2h 20min",
      thumbnail: null,
      description: "Climate change impacts and solutions across Africa",
      videos: [
        {
          title: "Climate Patterns in Sub-Saharan Africa",
          duration: "16:45",
          views: "52K",
        },
        {
          title: "Agricultural Adaptation Strategies",
          duration: "19:20",
          views: "48K",
        },
        {
          title: "Water Resources Management",
          duration: "21:30",
          views: "41K",
        },
        {
          title: "Renewable Energy Solutions",
          duration: "18:15",
          views: "36K",
        },
      ],
    },
    {
      id: 3,
      title: "Mental Health for Academics",
      videoCount: 6,
      totalDuration: "1h 50min",
      thumbnail: null,
      description: "Wellness and mental health resources for researchers",
      videos: [
        {
          title: "Recognizing Academic Burnout",
          duration: "15:20",
          views: "67K",
        },
        {
          title: "Stress Management Techniques",
          duration: "18:45",
          views: "59K",
        },
        {
          title: "Work-Life Balance Strategies",
          duration: "20:10",
          views: "54K",
        },
        {
          title: "Building Support Networks",
          duration: "17:30",
          views: "48K",
        },
      ],
    },
  ];

  const trendingBlogs = [
    {
      title: "10 Essential Tools Every African Researcher Should Know",
      author: "Dr. Chioma Nwankwo",
      readTime: "8 min read",
      views: "24.3K",
      date: "Jan 18, 2026",
      category: "Resources",
      region: "west",
      excerpt:
        "From reference managers to data analysis platforms, discover the digital tools transforming research across Africa.",
      image: null,
      featured: true,
    },
    {
      title: "The Rise of Open Access Publishing in African Universities",
      author: "Prof. Tendai Moyo",
      readTime: "12 min read",
      views: "18.7K",
      date: "Jan 16, 2026",
      category: "Publishing",
      region: "southern",
      excerpt:
        "How African institutions are leading the charge in making research freely accessible to all.",
      image: null,
      featured: false,
    },
    {
      title: "Building Collaborative Research Networks Across Borders",
      author: "Dr. Ahmed El-Sayed",
      readTime: "10 min read",
      views: "15.2K",
      date: "Jan 14, 2026",
      category: "Collaboration",
      region: "north",
      excerpt:
        "Strategies for forming productive partnerships with researchers globally while maintaining African perspectives.",
      image: null,
      featured: false,
    },
    {
      title: "Decolonizing Research Methodologies in African Contexts",
      author: "Dr. Nala Mthembu",
      readTime: "15 min read",
      views: "21.4K",
      date: "Jan 10, 2026",
      category: "Methodology",
      region: "southern",
      excerpt:
        "Re-examining traditional research approaches through an African lens and developing indigenous methodologies.",
      image: null,
      featured: false,
    },
  ];

  const publicAwarenessVideos = [
    {
      title: "Understanding Climate Change Impact on African Agriculture",
      organization: "African Climate Research Initiative",
      duration: "15:42",
      views: "145K",
      category: "Environment",
      urgent: true,
      region: "all",
      description:
        "Critical insights into how climate patterns are affecting food security across the continent.",
      embedUrl: "https://www.youtube.com/embed/Fo7zq8WeVpc?si=TZhfnbMLXXebLgbX",
      image: "https://img.youtube.com/vi/Fo7zq8WeVpc/0.jpg",
    },
    {
      title: "Mental Health Awareness for Researchers",
      organization: "Academic Wellness Network",
      duration: "22:18",
      views: "89K",
      category: "Health",
      urgent: false,
      region: "all",
      description:
        "Recognizing burnout, stress management, and resources for maintaining mental wellness in academia.",
      embedUrl: "https://www.youtube.com/embed/Fo7zq8WeVpc?si=TZhfnbMLXXebLgbX",
      image: "https://img.youtube.com/vi/Fo7zq8WeVpc/0.jpg",
    },
    {
      title: "Ethical Research Practices: A Guide for African Scholars",
      organization: "Pan-African Research Ethics Board",
      duration: "18:35",
      views: "67K",
      category: "Ethics",
      urgent: false,
      region: "all",
      description:
        "Essential guidelines for conducting ethical research with community engagement and informed consent.",
      embedUrl: "https://www.youtube.com/embed/Fo7zq8WeVpc?si=TZhfnbMLXXebLgbX",
      image: "https://img.youtube.com/vi/Fo7zq8WeVpc/0.jpg",
    },
    {
      title: "Digital Literacy and Cybersecurity for Academics",
      organization: "Tech for Scholars Africa",
      duration: "20:15",
      views: "52K",
      category: "Technology",
      urgent: true,
      region: "all",
      description:
        "Protecting your research data and digital identity in an increasingly connected world.",
      embedUrl: "https://www.youtube.com/embed/Fo7zq8WeVpc?si=TZhfnbMLXXebLgbX",
      image: "https://img.youtube.com/vi/Fo7zq8WeVpc/0.jpg",
    },
  ];

  const globalInsights = [
    {
      title: "Global Research Trends Shaping 2026",
      source: "International Research Council",
      type: "Report",
      region: "Global",
      date: "Jan 2026",
      impact: "High",
      downloadUrl: "#",
    },
    {
      title: "African Innovation Hubs: A Global Comparison",
      source: "World Innovation Forum",
      type: "Analysis",
      region: "Multi-Regional",
      date: "Dec 2025",
      impact: "Medium",
      downloadUrl: "#",
    },
    {
      title: "Sustainable Development Goals: African Progress Report",
      source: "UN Research Division",
      type: "Report",
      region: "Africa",
      date: "Jan 2026",
      impact: "High",
      downloadUrl: "#",
    },
  ];

  const pastRecordings = [
    {
      title: "Quantum Redirections and 'The Field' in Global Social Science",
      host: "Professor Oka Obono",
      date: "August 19th, 2026",
      audioUrl: "https://res.cloudinary.com/boq4ks8l/video/upload/Meeting_2_compressed.mp3",
    }
  ];

  const liveStreams = [
    {
      title: "Monthly Researcher Roundtable",
      host: "ScholarLink Africa",
      time: "Every Last Friday, 3 PM WAT",
      participants: "250+ avg",
      status: "upcoming",
      nextDate: "Jan 31, 2026",
    },
    {
      title: "Ask the Expert: Grant Writing Workshop",
      host: "Dr. Patricia Mensah",
      time: "Bi-weekly Tuesdays, 5 PM WAT",
      participants: "180+ avg",
      status: "live",
      nextDate: "Today at 5 PM",
    },
  ];

  const podcastSeries = [
    {
      title: "African Scholars Unfiltered",
      episodes: 24,
      subscribers: "45K",
      rating: 4.8,
      category: "Career Development",
      description: "Raw, honest conversations about the academic journey",
    },
    {
      title: "Research Impact Stories",
      episodes: 18,
      subscribers: "32K",
      rating: 4.9,
      category: "Innovation",
      description: "How African research is changing lives globally",
    },
    {
      title: "The Grant Hunters",
      episodes: 15,
      subscribers: "28K",
      rating: 4.7,
      category: "Funding",
      description: "Demystifying the grant application process",
    },
  ];

  const popularTopics = [
    { name: "Grant Writing", count: 145 },
    { name: "PhD Life", count: 132 },
    { name: "Publishing Tips", count: 98 },
    { name: "Mental Health", count: 87 },
    { name: "Research Methods", count: 76 },
  ];

  const handlePlayPodcast = (podcast: Podcast) => {
    setCurrentPodcast(podcast);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen pb-24">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#95111c] via-[#7a0e16] to-purple-900">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-20">
          <Breadcrumb current="Voices" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400 px-6 py-2 rounded-full mb-6">
              <Radio className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-bold text-gray-900 tracking-wider uppercase">
                Voices of African Scholarship
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Stories, Insights & Knowledge
            </h1>

            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Podcasts, blogs, videos, and global perspectives empowering
              African researchers to lead, innovate, and inspire.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search podcasts, articles, videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {[
              { icon: Mic, number: "50+", label: "Podcast Episodes" },
              { icon: BookOpen, number: "200+", label: "Blog Articles" },
              { icon: Video, number: "100+", label: "Video Resources" },
              { icon: Users, number: "75K+", label: "Community Members" },
              { icon: Globe, number: "40+", label: "Countries Reached" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <stat.icon className="w-8 h-8 text-[#95111c] mb-2" />
                <div className="text-3xl font-bold text-[#95111c] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      {/* Sticky only on desktop, static on mobile */}
      <section className="lg:sticky lg:top-16 bg-white/95 backdrop-blur-sm z-40 shadow-sm py-4 sm:py-6 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-3 sm:mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-[#95111c] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <cat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Regional Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedRegion === region.id
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {region.flag && <span className="mr-1">{region.flag}</span>}
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* No extra spacing needed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Your content */}
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Live & Upcoming Events */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <Radio className="w-8 h-8 text-red-500" />
                Live & Upcoming Events
              </h2>

              <div className="space-y-4">
                {liveStreams.map((stream, idx) => (
                  <div
                    key={idx}
                    className={`relative bg-linear-to-r ${
                      stream.status === "live"
                        ? "from-red-50 to-pink-50 border-red-200"
                        : "from-purple-50 to-blue-50 border-purple-200"
                    } rounded-xl p-6 border-2 hover:shadow-lg transition-all`}
                  >
                    {stream.status === "live" && (
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                          <span className="w-2 h-2 bg-white rounded-full"></span>
                          LIVE NOW
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-2 pr-24">
                      {stream.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Hosted by {stream.host}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {stream.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {stream.participants}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {stream.nextDate}
                      </span>
                    </div>

                    <button
                      className={`${
                        stream.status === "live"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-[#95111c] hover:bg-[#7a0e16]"
                      } text-white cursor-pointer font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2`}
                    >
                      {stream.status === "live" ? (
                        <>
                          <Play className="w-5 h-5" />
                          Join Live Stream
                        </>
                      ) : (
                        <>
                          <Bell className="w-5 h-5" />
                          Set Reminder
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Event Recordings */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <Mic className="w-8 h-8 text-purple-600" />
                Past Event Recordings
              </h2>

              <div className="space-y-4">
                {pastRecordings.map((recording, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:shadow-lg transition-all"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {recording.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Hosted by {recording.host} • {recording.date}
                    </p>
                    <div className="w-full">
                      <audio controls className="w-full rounded-lg">
                        <source src={recording.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Podcasts */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <Headphones className="w-8 h-8" />
                Featured Podcast Episodes
              </h2>

              <div className="space-y-6">
                {featuredPodcasts.map((podcast) => (
                  <div
                    key={podcast.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100 group"
                  >
                    <div className="flex gap-6">
                      <div className="shrink-0">
                        <div className="w-32 h-32 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Mic className="w-16 h-16 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                              {podcast.episode}
                            </span>
                            <span className="text-xs text-gray-500">
                              {podcast.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Headphones className="w-4 h-4" />
                            {podcast.listens} listens
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#95111c] transition-colors">
                          {podcast.title}
                        </h3>

                        <p className="text-gray-600 mb-3">
                          Hosted by {podcast.host} • {podcast.duration}
                        </p>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {podcast.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {podcast.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handlePlayPodcast(podcast)}
                            className="cursor-pointer bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold px-6 py-2 rounded-lg transition-all flex items-center gap-2"
                          >
                            <Play className="w-5 h-5" />
                            Listen Now
                          </button>
                          <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Share2 className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Awareness Videos */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <Bell className="w-8 h-8" />
                Public Awareness Videos
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {publicAwarenessVideos.map((video, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    {video.urgent && (
                      <div className="bg-red-500 text-white text-center py-2 text-xs font-bold flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        URGENT & IMPORTANT
                      </div>
                    )}

                    <div className="h-48 bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                      <img
                        src={video.image}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-20 h-20 text-white" />
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                          {video.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {video.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3">
                        {video.organization}
                      </p>

                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                        {video.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {video.duration}
                        </span>
                        <button className="cursor-pointer text-[#95111c] hover:text-[#7a0e16] font-semibold text-sm flex items-center gap-1">
                          Watch Now
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Playlists */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <List className="w-8 h-8" />
                Video Playlists
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {videoPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden group cursor-pointer"
                  >
                    <div className="h-40 bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                      <Video className="w-16 h-16 text-white/80" />
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {playlist.videoCount} videos
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#95111c] transition-colors">
                        {playlist.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {playlist.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {playlist.totalDuration}
                        </span>
                      </div>

                      <button
                        onClick={() => setShowPlaylist(playlist.id)}
                        className="cursor-pointer w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        View Playlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded Playlist View */}
              {showPlaylist && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {videoPlaylists.find((p) => p.id === showPlaylist)?.title}
                    </h3>
                    <button
                      onClick={() => setShowPlaylist(false)}
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {videoPlaylists
                      .find((p) => p.id === showPlaylist)
                      ?.videos.map((video, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100"
                        >
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                            <Play className="w-6 h-6 text-[#95111c]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {video.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{video.duration}</span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {video.views}
                              </span>
                            </div>
                          </div>
                          <button className="cursor-pointer  p-2 hover:bg-gray-100 rounded-lg">
                            <Bookmark className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blog Articles */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                Featured Blog Articles
              </h2>

              <div className="space-y-6">
                {trendingBlogs.map((blog, idx) => (
                  <article
                    key={idx}
                    className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden ${
                      blog.featured ? "lg:flex" : ""
                    }`}
                  >
                    {blog.featured && (
                      <div className="lg:w-1/3 h-64 lg:h-auto bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center relative">
                        <Sparkles className="w-20 h-20 text-white/80" />
                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </div>
                      </div>
                    )}

                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {blog.date}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-[#95111c] transition-colors cursor-pointer">
                        {blog.title}
                      </h3>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {blog.author}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {blog.readTime}
                          </span>
                          <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {blog.views}
                          </span>
                        </div>

                        <button className="cursor-pointer  text-[#95111c] hover:text-[#7a0e16] font-semibold flex items-center gap-2">
                          Read More
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Global Insights */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8" />
                Global Research Insights
              </h2>

              <div className="space-y-4">
                {globalInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                            {insight.type}
                          </span>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              insight.impact === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {insight.impact} Impact
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {insight.title}
                        </h3>

                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            {insight.source}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {insight.region}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {insight.date}
                          </span>
                        </div>
                      </div>

                      <button className="ml-4 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Podcast Series */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mic className="w-6 h-6 text-purple-600" />
                Popular Podcast Series
              </h3>

              <div className="space-y-4">
                {podcastSeries.map((series, idx) => (
                  <div
                    key={idx}
                    className="pb-4 border-b border-gray-100 last:border-0"
                  >
                    <h4 className="font-bold text-gray-900 mb-2 hover:text-[#95111c] cursor-pointer">
                      {series.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {series.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{series.episodes} episodes</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {series.subscribers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {series.rating}★
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Trending Topics
              </h3>

              <div className="space-y-3">
                {popularTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {topic.name}
                    </span>
                    <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {topic.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-linear-to-br from-[#95111c] to-purple-800 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Stay Updated</h3>
              </div>

              <p className="text-white/90 mb-4 text-sm">
                Get weekly insights, new podcast episodes, and research updates
                delivered to your inbox.
              </p>

              <button
                onClick={() => setShowNewsletterModal(true)}
                className="cursor-pointer w-full bg-white text-[#95111c] font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe Now
              </button>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Join Our Community
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Twitter",
                    color: "bg-blue-400",
                    icon: MessageSquare,
                  },
                  { name: "YouTube", color: "bg-red-500", icon: Youtube },
                  { name: "LinkedIn", color: "bg-blue-600", icon: Users },
                  { name: "Podcast RSS", color: "bg-orange-500", icon: Rss },
                ].map((social, idx) => (
                  <button
                    key={idx}
                    className={`cursor-pointer w-full ${social.color} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2`}
                  >
                    <social.icon className="w-5 h-5" />
                    Follow on {social.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Audio Player (when podcast is playing) */}
      {currentPodcast && (
        <div className="fixed bottom-0 left-0 right-0 bg-linear-to-r from-purple-900 to-indigo-900 text-white shadow-2xl z-50 border-t-4 border-yellow-400">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-6">
              {/* Podcast Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold truncate">{currentPodcast.title}</h4>
                  <p className="text-sm text-white/70 truncate">
                    {currentPodcast.host}
                  </p>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-gray-900" />
                  ) : (
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  )}
                </button>

                <button className="p-2 cursor-pointer  hover:bg-white/10 rounded-full transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 hidden lg:block">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/70">12:34</span>
                  <div className="flex-1 bg-white/20 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                  <span className="text-xs text-white/70">
                    {currentPodcast.duration}
                  </span>
                </div>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center gap-2">
                <button className="p-2 cursor-pointer hover:bg-white/10 rounded-lg transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="p-2 cursor-pointer hover:bg-white/10 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPodcast(null)}
                  className="p-2 cursor-pointer hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full bg-white rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
              <h3 className="font-bold">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="aspect-video">
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{selectedVideo.organization}</span>
                <span className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Subscribe to Newsletter
              </h3>
              <button
                onClick={() => setShowNewsletterModal(false)}
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Get the latest podcasts, articles, and research insights delivered
              weekly.
            </p>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="cursor-pointer w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-3 rounded-lg transition-colors"
              >
                Subscribe Now
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
