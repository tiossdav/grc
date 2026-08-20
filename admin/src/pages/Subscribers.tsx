import { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Send, CheckCircle, XCircle } from "lucide-react";

interface Subscriber {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  subscribed_at: string;
}

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [sending, setSending] = useState(false);
  const [campaignMessage, setCampaignMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get("/api/admin/subscribers");
      if (response.data.success) {
        setSubscribers(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !htmlContent) return;
    
    setSending(true);
    setCampaignMessage({ type: "", text: "" });

    try {
      const response = await axios.post("/api/admin/send-campaign", {
        subject,
        htmlContent
      });
      if (response.data.success) {
        setCampaignMessage({ type: "success", text: response.data.message });
        setSubject("");
        setHtmlContent("");
      } else {
        setCampaignMessage({ type: "error", text: response.data.message || "Failed to send campaign" });
      }
    } catch (err: any) {
      console.error(err);
      setCampaignMessage({ type: "error", text: err.response?.data?.message || "Error sending campaign" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Newsletter Management</h2>
          <p className="text-gray-600 mt-1">Manage subscribers and send campaigns</p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Mail className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compose Campaign */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-gray-500" />
            Send Campaign
          </h3>
          {campaignMessage.text && (
            <div className={`p-4 rounded-xl mb-4 flex items-center gap-2 ${
              campaignMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
              {campaignMessage.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <p className="text-sm font-semibold">{campaignMessage.text}</p>
            </div>
          )}
          <form onSubmit={handleSendCampaign} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Subject Line</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#95111c] focus:border-transparent outline-none transition-all"
                placeholder="Monthly Research Update"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">HTML Content</label>
              <textarea
                required
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                rows={8}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#95111c] focus:border-transparent outline-none transition-all font-mono text-sm"
                placeholder="<h1>Hello {{firstName}},</h1><p>Here are our latest updates...</p>"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">You can use {'{{firstName}}'} variable for personalization.</p>
            </div>
            <button
              type="submit"
              disabled={sending || !subject || !htmlContent}
              className="w-full flex items-center justify-center gap-2 bg-[#95111c] hover:bg-[#7a0e16] text-white px-4 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              {sending ? "Sending..." : "Dispatch Campaign"}
            </button>
          </form>
        </div>

        {/* Subscribers List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-500" />
            Active Subscribers ({subscribers.length})
          </h3>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#95111c]"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl text-center text-sm font-semibold">
              {error}
            </div>
          ) : (
            <div className="flex-1 overflow-auto bg-gray-50 rounded-xl border border-gray-100">
              <ul className="divide-y divide-gray-200">
                {subscribers.length === 0 ? (
                  <li className="p-4 text-center text-gray-500 text-sm">No subscribers found</li>
                ) : (
                  subscribers.map((sub) => (
                    <li key={sub.id} className="p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {sub.first_name ? `${sub.first_name} ${sub.last_name || ''}` : sub.email}
                          </p>
                          <p className="text-xs text-gray-500">{sub.email}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          sub.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
