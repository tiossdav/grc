import { useState, useEffect } from "react";
import axios from "axios";
import { 
  HeartHandshake, 
  Mail, 
  CalendarRange, 
  Users, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Link } from "wouter";

interface Stats {
  donations: { count: number; total: number };
  subscribers: { count: number };
  events: { count: number };
  partners: { count: number };
}

interface RecentDonation {
  reference: string;
  donor_name: string;
  amount: number;
  payment_method: string;
  created_at: string;
  payment_status: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentDonations, setRecentDonations] = useState<RecentDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats");
        if (response.data.success) {
          setStats(response.data.stats);
          setRecentDonations(response.data.recentDonations);
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch dashboard metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#95111c]"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
        <p className="text-red-700 font-semibold">{error || "Error loading dashboard metrics"}</p>
      </div>
    );
  }

  const cards = [
    {
      name: "Total Donations",
      value: new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(stats.donations.total),
      subtitle: `${stats.donations.count} successful payments`,
      icon: HeartHandshake,
      color: "bg-emerald-50 text-emerald-600",
      link: "/donations"
    },
    {
      name: "Active Subscribers",
      value: stats.subscribers.count.toLocaleString(),
      subtitle: "Newsletter list size",
      icon: Mail,
      color: "bg-blue-50 text-blue-600",
      link: "/subscribers"
    },
    {
      name: "Upcoming Events",
      value: stats.events.count.toLocaleString(),
      subtitle: "Workshops & Webinars",
      icon: CalendarRange,
      color: "bg-purple-50 text-purple-600",
      link: "/events"
    },
    {
      name: "Active Partners",
      value: stats.partners.count.toLocaleString(),
      subtitle: "Clinic sponsors/mentors",
      icon: Users,
      color: "bg-amber-50 text-amber-600",
      link: "/partners"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back, Admin!</h2>
          <p className="text-gray-600 mt-1">Here is a quick overview of what is happening across the Clinic portal today.</p>
        </div>
        <div className="p-3 bg-[#95111c]/5 text-[#95111c] rounded-xl">
          <TrendingUp className="w-8 h-8" />
        </div>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.name} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500">{card.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                <span>{card.subtitle}</span>
                <Link href={card.link} className="text-[#95111c] font-bold hover:underline inline-flex items-center gap-1">
                    Manage
                    <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Donations Table */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
            <Link href="/donations" className="text-[#95111c] font-bold text-sm hover:underline inline-flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentDonations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-sm">
                      No recent donations found.
                    </td>
                  </tr>
                ) : (
                  recentDonations.map((don) => (
                    <tr key={don.reference}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {don.donor_name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-bold text-[#95111c]">
                        ₦{don.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-mono capitalize">
                        {don.payment_method?.replace("_", " ")}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          don.payment_status === "success" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {don.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {new Date(don.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Tasks</h3>
            <div className="space-y-4">
              <Link href="/events" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#95111c]/20 hover:bg-[#95111c]/5 transition-all text-sm font-bold text-gray-700">
                  <CalendarRange className="w-5 h-5 text-[#95111c]" />
                  Post New Upcoming Event
              </Link>
              <Link href="/subscribers" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#95111c]/20 hover:bg-[#95111c]/5 transition-all text-sm font-bold text-gray-700">
                  <Mail className="w-5 h-5 text-[#95111c]" />
                  Send Newsletter Campaign
              </Link>
              <Link href="/partners" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#95111c]/20 hover:bg-[#95111c]/5 transition-all text-sm font-bold text-gray-700">
                  <Users className="w-5 h-5 text-[#95111c]" />
                  Manage Partners List
              </Link>
            </div>
          </div>
          <div className="mt-8 text-xs text-gray-500 border-t border-gray-100 pt-4">
            Graduate Research Clinic CMS • Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
