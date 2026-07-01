import { useState, useEffect } from "react";
import axios from "axios";
import { CalendarRange, Plus, Edit, Trash2, X, AlertTriangle, Monitor, MapPin } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  event_type: "workshop" | "conference" | "seminar" | "training" | "webinar";
  start_date: string;
  end_date: string | null;
  location: string | null;
  is_virtual: boolean;
  max_participants: number | null;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "workshop",
    start_date: "",
    end_date: "",
    location: "",
    is_virtual: false,
    max_participants: "",
    status: "upcoming"
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/admin/events");
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      event_type: "workshop",
      start_date: "",
      end_date: "",
      location: "",
      is_virtual: false,
      max_participants: "",
      status: "upcoming"
    });
    setShowModal(true);
  };

  const openEditModal = (event: Event) => {
    setEditingId(event.id);
    
    // Format dates for datetime-local input fields (YYYY-MM-DDTHH:MM)
    const formatForInput = (isoString: string | null) => {
      if (!isoString) return "";
      const date = new Date(isoString);
      const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
      const localISOTime = (new Date(date.getTime() - tzOffset)).toISOString().slice(0, 16);
      return localISOTime;
    };

    setFormData({
      title: event.title,
      description: event.description || "",
      event_type: event.event_type,
      start_date: formatForInput(event.start_date),
      end_date: formatForInput(event.end_date),
      location: event.location || "",
      is_virtual: event.is_virtual,
      max_participants: event.max_participants ? String(event.max_participants) : "",
      status: event.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await axios.delete(`/api/admin/events/${id}`);
      if (response.data.success) {
        setEvents(events.filter(e => e.id !== id));
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete event");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      max_participants: formData.max_participants ? Number(formData.max_participants) : null,
      end_date: formData.end_date || null
    };

    try {
      if (editingId) {
        const response = await axios.put(`/api/admin/events/${editingId}`, payload);
        if (response.data.success) {
          setEvents(events.map(e => e.id === editingId ? response.data.data : e));
          setShowModal(false);
        }
      } else {
        const response = await axios.post("/api/admin/events", payload);
        if (response.data.success) {
          setEvents([response.data.data, ...events]);
          setShowModal(false);
        }
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save event");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#95111c]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner and Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-gray-600 mt-1">Create, edit, or delete events, workshops, webinars, and training courses.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-md text-sm cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      )}

      {/* Events Table / Card list */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location / Venue</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Slots</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 text-sm">
                    No events registered yet. Click "Create Event" to post one!
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 text-sm max-w-xs truncate">{event.title}</div>
                      <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">{event.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                      {event.event_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-700 font-medium">
                      <div>{new Date(event.start_date).toLocaleDateString()} at {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      {event.end_date && (
                        <div className="text-gray-400 mt-0.5">Ends {new Date(event.end_date).toLocaleDateString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {event.is_virtual ? (
                        <span className="inline-flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md text-xs font-semibold">
                          <Monitor className="w-3 h-3" /> Virtual
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="truncate max-w-[150px]">{event.location || "Physical venue"}</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                      {event.max_participants ? `${event.max_participants} slots` : "Unlimited"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        event.status === "upcoming" ? "bg-blue-50 text-blue-700" :
                        event.status === "ongoing" ? "bg-green-50 text-green-700" :
                        event.status === "completed" ? "bg-gray-100 text-gray-700" :
                        "bg-red-50 text-red-700"
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openEditModal(event)}
                          className="text-gray-600 hover:text-[#95111c] p-1.5 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          title="Delete"
                        >
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

      {/* Event Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-gray-200 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 inline-flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-[#95111c]" />
                {editingId ? "Edit Event Details" : "Create New Event"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Masterclass on Thesis Writing"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summarize the agenda, requirements, or focus topics..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Event Type *</label>
                  <select
                    value={formData.event_type}
                    onChange={(e: any) => setFormData({ ...formData, event_type: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                    <option value="seminar">Seminar</option>
                    <option value="training">Training</option>
                    <option value="webinar">Webinar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">End Date & Time (Optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-bold text-gray-900">Virtual / Online Event?</label>
                    <p className="text-xs text-gray-500">Toggles zoom details vs physical location fields</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.is_virtual}
                    onChange={(e) => setFormData({ ...formData, is_virtual: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#95111c] focus:ring-[#95111c]"
                  />
                </div>

                {!formData.is_virtual ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Physical Location Address</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Auditorium Hall A, University of Lagos"
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Virtual Meeting Link (stored in location)</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Zoom link or webinar URL"
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Participant Slots Capacity (Optional)</label>
                  <input
                    type="number"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                    placeholder="Leave empty for unlimited slots"
                    min="1"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#95111c] focus:border-[#95111c]"
                  />
                </div>
              </div>

              {/* Modal Footer actions */}
              <div className="border-t border-gray-200 pt-4 flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
                >
                  {editingId ? "Save Changes" : "Post Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
