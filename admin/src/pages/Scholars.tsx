import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Scholar {
  id: number;
  first_name: string;
  last_name: string;
  institution: string | null;
  degree_level: string | null;
  field_of_study: string | null;
  country: string | null;
  status: string;
}

export default function Scholars() {
  const [scholars, setScholars] = useState<Scholar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    institution: "",
    degree_level: "phd",
    field_of_study: "",
    country: "",
    status: "active"
  });

  const fetchScholars = async () => {
    try {
      const response = await axios.get("/api/admin/scholars");
      if (response.data.success) {
        setScholars(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch scholars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholars();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      first_name: "",
      last_name: "",
      institution: "",
      degree_level: "phd",
      field_of_study: "",
      country: "",
      status: "active"
    });
    setShowModal(true);
  };

  const openEditModal = (scholar: Scholar) => {
    setEditingId(scholar.id);
    setFormData({
      first_name: scholar.first_name,
      last_name: scholar.last_name,
      institution: scholar.institution || "",
      degree_level: scholar.degree_level || "phd",
      field_of_study: scholar.field_of_study || "",
      country: scholar.country || "",
      status: scholar.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this scholar?")) return;
    try {
      await axios.delete(`/api/admin/scholars/${id}`);
      fetchScholars();
    } catch (err) {
      console.error(err);
      alert("Failed to delete scholar");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/admin/scholars/${editingId}`, formData);
      } else {
        await axios.post("/api/admin/scholars", formData);
      }
      setShowModal(false);
      fetchScholars();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save scholar");
    }
  };

  if (loading) return <div className="p-8">Loading scholars...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Scholars & Experts</h2>
          <p className="text-gray-500 text-sm mt-1">Manage network of expert contributors</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#95111c] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#7a0e17] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Scholar
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Institution</th>
                <th className="px-6 py-4">Degree</th>
                <th className="px-6 py-4">Field</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scholars.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No scholars found.
                  </td>
                </tr>
              ) : (
                scholars.map((scholar) => (
                  <tr key={scholar.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{scholar.first_name} {scholar.last_name}</td>
                    <td className="px-6 py-4">{scholar.institution}</td>
                    <td className="px-6 py-4 capitalize">{scholar.degree_level}</td>
                    <td className="px-6 py-4">{scholar.field_of_study}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(scholar)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(scholar.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
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
                {editingId ? "Edit Scholar" : "Add Scholar"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="scholarForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input type="text" required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input type="text" required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    <input type="text" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree Level</label>
                    <select value={formData.degree_level} onChange={e => setFormData({...formData, degree_level: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none">
                      <option value="undergraduate">Undergraduate</option>
                      <option value="masters">Masters</option>
                      <option value="phd">PhD</option>
                      <option value="postdoc">Postdoc</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    <input type="text" value={formData.field_of_study} onChange={e => setFormData({...formData, field_of_study: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="alumni">Alumni</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" form="scholarForm" className="px-5 py-2.5 text-sm font-medium text-white bg-[#95111c] hover:bg-[#7a0e17] rounded-xl transition-colors">
                {editingId ? "Update Scholar" : "Create Scholar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
