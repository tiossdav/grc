import { useState, useEffect } from "react";
import axios from "axios";
import { Users, Plus, Pencil, Trash2, X } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  type: string;
  website_url: string | null;
  contact_email: string | null;
  is_active: boolean;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    website_url: "",
    contact_email: "",
    is_active: true
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get("/api/admin/partners");
      if (response.data.success) {
        setPartners(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch partners");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name || "",
        type: partner.type || "",
        website_url: partner.website_url || "",
        contact_email: partner.contact_email || "",
        is_active: partner.is_active
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: "",
        type: "",
        website_url: "",
        contact_email: "",
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await axios.put(`/api/admin/partners/${editingPartner.id}`, formData);
      } else {
        await axios.post("/api/admin/partners", formData);
      }
      fetchPartners();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert("Failed to save partner");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        await axios.delete(`/api/admin/partners/${id}`);
        fetchPartners();
      } catch (err: any) {
        console.error(err);
        alert("Failed to delete partner");
      }
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Partners Management</h2>
          <p className="text-gray-600 mt-1">Manage corporate and academic partners</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#95111c] hover:bg-[#7a0e16] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

      {error && (
        <div className="bg-red-50 p-4 border border-red-200 rounded-xl text-red-700 font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#95111c]"></div>
          </div>
        ) : partners.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-200 shadow-sm">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No Partners Found</h3>
            <p className="text-gray-500 mt-1">Get started by adding your first partner.</p>
          </div>
        ) : (
          partners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    partner.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {partner.is_active ? "Active" : "Inactive"}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{partner.type}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                {partner.contact_email && <p className="text-sm text-gray-500 mb-1">{partner.contact_email}</p>}
                {partner.website_url && (
                  <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    Visit Website
                  </a>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleOpenModal(partner)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                {editingPartner ? "Edit Partner" : "Add New Partner"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Partner Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#95111c] focus:border-transparent outline-none"
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Partner Type *</label>
                <input
                  type="text"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#95111c] focus:border-transparent outline-none"
                  placeholder="e.g. Corporate, Academic"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#95111c] focus:border-transparent outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#95111c] focus:border-transparent outline-none"
                  placeholder="contact@partner.com"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded border-gray-300 text-[#95111c] focus:ring-[#95111c]"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">Active Partner</label>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#95111c] hover:bg-[#7a0e16] text-white text-sm font-bold rounded-xl transition-all shadow-sm"
                >
                  {editingPartner ? "Save Changes" : "Create Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
