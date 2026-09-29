import { useState } from "react";
import {
  Mail,
  CheckCircle2,
  Sparkles,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Bell,
  ArrowRight,
  AlertCircle,
  X,
} from "lucide-react";
import Footer from "../layout/footer";
import { Header } from "../layout/header";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interestOptions = [
    { id: "research", label: "Research Opportunities", icon: BookOpen },
    { id: "grants", label: "Grants & Funding", icon: TrendingUp },
    { id: "events", label: "Workshops & Events", icon: Calendar },
    { id: "mentorship", label: "Mentorship Programs", icon: Users },
    { id: "publications", label: "Publications & Papers", icon: Sparkles },
    { id: "community", label: "Community Updates", icon: Bell },
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: "Exclusive Research Insights",
      description:
        "Access cutting-edge research findings before they're public",
    },
    {
      icon: Calendar,
      title: "Early Event Access",
      description:
        "Get first priority for workshops, webinars, and conferences",
    },
    {
      icon: Users,
      title: "Networking Opportunities",
      description: "Connect with fellow scholars and potential collaborators",
    },
    {
      icon: TrendingUp,
      title: "Funding Alerts",
      description: "Be the first to know about grants and scholarships",
    },
  ];

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    if (!email || !firstName || !lastName) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // FIX: Add /api to the path
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(
        `${apiUrl}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            interests: interests.length > 0 ? interests : undefined,
          }),
        },
      );

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError(data.message || "Subscription failed. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSubmitted(false);
    setEmail("");
    setFirstName("");
    setLastName("");
    setInterests([]);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-white to-blue-50 font-montserrat">
      <Header />
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-full mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#95111c] mb-6">
            Stay Connected with African Scholarship
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of scholars receiving exclusive research insights,
            funding opportunities, and community updates directly to your inbox.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Weekly updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#95111c] mb-4">
              Why Subscribe?
            </h2>
            <p className="text-lg text-gray-600">
              Unlock exclusive benefits designed for African scholars
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-purple-50 to-blue-50 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
                  <benefit.icon className="w-8 h-8 text-[#95111c]" />
                </div>
                <h3 className="text-lg font-bold text-[#95111c] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-yellow-200 to-orange-200 rounded-full opacity-10 blur-3xl" />

            {!isSubmitted ? (
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-[#95111c] mb-2">
                    Subscribe Now
                  </h2>
                  <p className="text-gray-600">
                    Customize your preferences to receive relevant updates
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#95111c] focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#95111c] focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#95111c] focus:border-transparent disabled:opacity-50"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What interests you? (Optional)
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {interestOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleInterest(option.id)}
                        disabled={isSubmitting}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          interests.includes(option.id)
                            ? "border-[#95111c] bg-[#95111c] text-white"
                            : "border-gray-200 hover:border-[#95111c] bg-white"
                        }`}
                      >
                        <option.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-[#95111c] to-[#7a0e16] hover:from-[#7a0e16] hover:to-[#95111c] text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Subscribe to Newsletter
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By subscribing, you agree to receive emails from The Graduate
                  Research Clinic. You can unsubscribe at any time.
                </p>
              </div>
            ) : (
              <div className="text-center py-12 relative z-10">
                <button
                  onClick={handleCloseSuccess}
                  className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                  aria-label="Close success message"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>

                <h3 className="text-3xl font-bold text-[#95111c] mb-4">
                  Welcome to the Community!
                </h3>
                <p className="text-lg text-gray-600 mb-2">
                  Thank you for subscribing, {firstName}!
                </p>
                <p className="text-gray-600 mb-4">
                  Check your inbox for a confirmation email and your first
                  newsletter.
                </p>
                <p className="text-sm text-gray-500">
                  📧 Email sent to: <strong>{email}</strong>
                </p>

                <div className="mt-8">
                  <Sparkles className="w-12 h-12 text-yellow-500 mx-auto animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-[#95111c] to-[#7a0e16]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Join Our Growing Community
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "5,000+", label: "Subscribers" },
              { number: "30+", label: "Countries" },
              { number: "95%", label: "Satisfaction Rate" },
              { number: "Weekly", label: "Updates" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Newsletter;
