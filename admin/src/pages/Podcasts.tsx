import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Podcast {
  id: number;
  title: string;
  host: string;
  description: string;
  media_url: string;
  status: "published" | "upcoming" | "live" | "archived";
  date: string;
  participants_count: number;
  created_at: string;
}

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    host: "",
    description: "",
    media_url: "",
    status: "published",
    date: "",
    participants_count: ""
  });

  const fetchPodcasts = async () => {
    try {
      const response = await axios.get("/api/admin/podcasts");
      if (response.data.success) {
        setPodcasts(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch podcasts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      host: "",
      description: "",
      media_url: "",
      status: "published",
      date: "",
      participants_count: ""
    });
    setShowModal(true);
  };

  const openEditModal = (podcast: Podcast) => {
    setEditingId(podcast.id);
    const formatForInput = (isoString: string | null) => {
      if (!isoString) return "";
      const d = new Date(isoString);
      const tzOffset = d.getTimezoneOffset() * 60000;
      return (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
    };

    setFormData({
      title: podcast.title,
      host: podcast.host || "",
      description: podcast.description || "",
      media_url: podcast.media_url || "",
      status: podcast.status || "published",
      date: formatForInput(podcast.date),
      participants_count: podcast.participants_count ? String(podcast.participants_count) : ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this podcast?")) return;
    try {
      await axios.delete(`/api/admin/podcasts/${id}`);
      fetchPodcasts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete podcast");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/admin/podcasts/${editingId}`, formData);
      } else {
        await axios.post("/api/admin/podcasts", formData);
      }
      setShowModal(false);
      fetchPodcasts();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save podcast");
    }
  };

  if (loading) return <div className="p-8">Loading podcasts...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Podcasts & Audio</h2>
          <p className="text-gray-500 text-sm mt-1">Manage Voice page audio and live streams</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#95111c] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#7a0e17] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Podcast
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Host</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {podcasts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No podcasts found. Add your first recording.
                  </td>
                </tr>
              ) : (
                podcasts.map((podcast) => (
                  <tr key={podcast.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{podcast.title}</td>
                    <td className="px-6 py-4">{podcast.host}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        podcast.status === 'published' ? 'bg-green-100 text-green-700' :
                        podcast.status === 'live' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {podcast.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {podcast.date ? new Date(podcast.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(podcast)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(podcast.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Podcast" : "Add Podcast"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="podcastForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Host</label>
                    <input type="text" value={formData.host} onChange={e => setFormData({...formData, host: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date/Time</label>
                    <input type="datetime-local" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Media URL (Cloudinary audio/video link)</label>
                    <input type="url" value={formData.media_url} onChange={e => setFormData({...formData, media_url: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all">
                      <option value="published">Published</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Participants/Listeners Count</label>
                    <input type="number" value={formData.participants_count} onChange={e => setFormData({...formData, participants_count: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" form="podcastForm" className="px-5 py-2.5 text-sm font-medium text-white bg-[#95111c] hover:bg-[#7a0e17] rounded-xl transition-colors">
                {editingId ? "Update Podcast" : "Create Podcast"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
