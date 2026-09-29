// File: src/pages/LearningHub.tsx
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  Clock,
  PlayCircle,
  CheckCircle,
  Star,
  Search,
  ArrowRight,
  Zap,
  BarChart,
  Briefcase,
  Heart,
  Microscope,
  PenTool,
  X,
} from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  modules: number;
  enrolled: string;
  rating: number;
  skills: string[];
  featured: boolean;
}

export default function LearningHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Learning Pathways with vertical timeline design
  const learningPaths = [
    {
      id: "pre-doctoral",
      title: "Pre-Doctoral",
      icon: BookOpen,
      courses: 12,
      description: "PhD application & research preparation",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500",
    },
    {
      id: "doctoral",
      title: "Doctoral",
      icon: GraduationCap,
      courses: 18,
      description: "Navigating your PhD successfully",
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500",
    },
    {
      id: "post-doctoral",
      title: "Post-Doctoral",
      icon: Award,
      courses: 10,
      description: "Transition to independent research",
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-500",
    },
    {
      id: "early-career",
      title: "Early Career",
      icon: TrendingUp,
      courses: 15,
      description: "Building your academic career",
      color: "from-red-500 to-orange-500",
      borderColor: "border-red-500",
    },
  ];

  // Featured Courses
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses`);
        const data = await response.json();
        if (data.success) {
          setCourses(data.data.map((c: any) => ({
            id: c.id,
            title: c.title,
            instructor: c.instructor || "GRC Instructor",
            category: "General",
            level: c.level || "Beginner",
            duration: c.duration || "Self-paced",
            modules: 10,
            enrolled: "1.2K",
            rating: 4.8,
            skills: c.skills || ["Research", "Academic Writing"],
            featured: true,
          })));
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  // Stats
  const stats = [
    { icon: BookOpen, value: "65+", label: "Courses" },
    { icon: Users, value: "45K+", label: "Learners" },
    { icon: Award, value: "12K+", label: "Certificates" },
    { icon: Star, value: "4.8", label: "Avg Rating" },
  ];

  // User Progress
  const progress = {
    inProgress: 3,
    completed: 8,
    certificates: 5,
    hours: 67,
    streak: 12,
  };

  const getLevelColor = (level: string) => {
    if (level === "Beginner" || level === "All Levels")
      return "bg-green-100 text-green-700";
    if (level === "Intermediate") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#95111c] via-purple-900 to-indigo-900 opacity-95"></div>

        {/* Breadcrumb Navigation */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-20">
          <Breadcrumb current="Learning Hub" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-5 h-5 text-gray-900" />
            <span className="text-sm font-bold text-gray-900">
              LEARNING HUB
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Master Your Academic Journey
          </h1>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Expert-led courses designed for African researchers at every career
            stage
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, topics, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <stat.icon className="w-8 h-8 text-[#95111c] mx-auto mb-2" />
                <div className="text-3xl font-bold text-[#95111c]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* Learning Pathways - Vertical Timeline */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Learning Pathways
              </h2>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-linear-to-b from-blue-500 to-red-500"></div>

                <div className="space-y-6">
                  {learningPaths.map((path) => (
                    <div
                      key={path.id}
                      onMouseEnter={() => setHoveredPath(path.id)}
                      onMouseLeave={() => setHoveredPath(null)}
                      className="relative pl-20 group cursor-pointer"
                    >
                      {/* Timeline Node */}
                      <div
                        className={`absolute left-0 w-12 h-12 rounded-full bg-linear-to-br ${path.color} flex items-center justify-center shadow-lg transform transition-transform ${hoveredPath === path.id ? "scale-110" : ""}`}
                      >
                        <path.icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content Card */}
                      <div
                        className={`bg-white border-2 ${hoveredPath === path.id ? path.borderColor : "border-gray-200"} rounded-lg p-6 transition-all ${hoveredPath === path.id ? "shadow-xl scale-105" : "shadow-md"}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {path.title}
                          </h3>
                          <span className="text-sm font-semibold text-[#95111c] bg-red-50 px-3 py-1 rounded-full">
                            {path.courses} courses
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{path.description}</p>
                        <button className="cursor-pointer text-[#95111c] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                          Explore Track <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Courses */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Featured Courses
              </h2>

              <div className="space-y-6">
                {courses
                  .filter((c) => c.featured)
                  .map((course) => (
                    <div
                      key={course.id}
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowCourseModal(true);
                      }}
                      className="bg-white border border-gray-200 rounded-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto bg-linear-to-br from-[#95111c] to-purple-900 flex items-center justify-center relative">
                          <GraduationCap className="w-16 h-16 text-white/80" />
                          <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                            FEATURED
                          </div>
                        </div>

                        <div className="flex-1 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${getLevelColor(course.level)}`}
                            >
                              {course.level}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-semibold text-sm">
                                {course.rating}
                              </span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#95111c] transition-colors">
                            {course.title}
                          </h3>

                          <p className="text-gray-600 mb-4">
                            {course.instructor}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {course.skills.map((skill: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <PlayCircle className="w-4 h-4" />
                                {course.modules}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {course.enrolled}
                              </span>
                            </div>

                            <button className="cursor-pointer bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                              Enroll Free
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* All Courses Grid */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                More Courses
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {courses
                  .filter((c) => !c.featured)
                  .map((course) => (
                    <div
                      key={course.id}
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowCourseModal(true);
                      }}
                      className="bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="h-32 bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/80" />
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${getLevelColor(course.level)}`}
                          >
                            {course.level}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold text-sm">
                              {course.rating}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {course.instructor}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>{course.modules} modules</span>
                          <span>{course.duration}</span>
                          <span>{course.enrolled}</span>
                        </div>

                        <button className="cursor-pointer w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold py-2 rounded-lg transition-colors">
                          Start Learning
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-linear-to-br from-[#95111c] to-purple-900 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart className="w-6 h-6" />
                Your Progress
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>In Progress</span>
                    <span className="font-bold">{progress.inProgress}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-2xl font-bold">
                      {progress.completed}
                    </div>
                    <div className="text-xs text-white/80">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {progress.certificates}
                    </div>
                    <div className="text-xs text-white/80">Certificates</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{progress.hours}h</div>
                    <div className="text-xs text-white/80">Learning Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold flex items-center gap-1">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      {progress.streak}
                    </div>
                    <div className="text-xs text-white/80">Day Streak</div>
                  </div>
                </div>
              </div>

              <button className="cursor-pointer w-full bg-white text-[#95111c] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors mt-6">
                View Dashboard
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Access
              </h3>

              <div className="space-y-2">
                {[
                  { icon: Microscope, label: "Research Methods", count: 12 },
                  { icon: PenTool, label: "Academic Writing", count: 8 },
                  { icon: TrendingUp, label: "Grant Writing", count: 6 },
                  { icon: Briefcase, label: "Career Dev", count: 15 },
                  { icon: Heart, label: "Wellness", count: 7 },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="cursor-pointer w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-600 group-hover:text-[#95111c]" />
                      <span className="font-medium text-gray-900 group-hover:text-[#95111c]">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Become Instructor */}
            <div className="bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Become an Instructor</h3>
              <p className="text-white/90 mb-4 text-sm">
                Share your expertise with thousands of African researchers.
              </p>
              <button className="cursor-pointer w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modal */}
      {showCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-br from-[#95111c] to-purple-900 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {selectedCourse.title}
              </h2>
              <button
                onClick={() => setShowCourseModal(false)}
                className="cursor-pointer w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${getLevelColor(selectedCourse.level)}`}
                >
                  {selectedCourse.level}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{selectedCourse.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{selectedCourse.instructor}</p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  {
                    icon: PlayCircle,
                    label: "Modules",
                    value: selectedCourse.modules,
                  },
                  {
                    icon: Clock,
                    label: "Duration",
                    value: selectedCourse.duration,
                  },
                  {
                    icon: Users,
                    label: "Enrolled",
                    value: selectedCourse.enrolled,
                  },
                  { icon: Award, label: "Certificate", value: "Yes" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg text-center"
                  >
                    <stat.icon className="w-6 h-6 text-[#95111c] mx-auto mb-2" />
                    <div className="font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Skills you'll gain
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="cursor-pointer w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Start Learning Now - Free
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
