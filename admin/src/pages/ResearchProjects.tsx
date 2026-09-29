import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface ResearchProject {
  id: number;
  title: string;
  description: string | null;
  lead_scholar_id: number | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  funding_amount: number | null;
}

export default function ResearchProjects() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "ongoing",
    start_date: "",
    end_date: "",
    funding_amount: ""
  });

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/admin/research-projects");
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch research projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      status: "ongoing",
      start_date: "",
      end_date: "",
      funding_amount: ""
    });
    setShowModal(true);
  };

  const openEditModal = (proj: ResearchProject) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      description: proj.description || "",
      status: proj.status,
      start_date: proj.start_date ? proj.start_date.split('T')[0] : "",
      end_date: proj.end_date ? proj.end_date.split('T')[0] : "",
      funding_amount: proj.funding_amount ? proj.funding_amount.toString() : ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this research project?")) return;
    try {
      await axios.delete(`/api/admin/research-projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete research project");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        funding_amount: formData.funding_amount ? parseFloat(formData.funding_amount) : null
      };

      if (editingId) {
        await axios.put(`/api/admin/research-projects/${editingId}`, payload);
      } else {
        await axios.post("/api/admin/research-projects", payload);
      }
      setShowModal(false);
      fetchProjects();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save research project");
    }
  };

  if (loading) return <div className="p-8">Loading research projects...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Research Projects</h2>
          <p className="text-gray-500 text-sm mt-1">Manage ongoing and completed research projects</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#95111c] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#7a0e17] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">End Date</th>
                <th className="px-6 py-4">Funding</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No research projects found.
                  </td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{proj.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        proj.status === 'completed' ? 'bg-green-100 text-green-800' :
                        proj.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {proj.start_date ? new Date(proj.start_date).toLocaleDateString() : ""}
                    </td>
                    <td className="px-6 py-4">
                      {proj.end_date ? new Date(proj.end_date).toLocaleDateString() : ""}
                    </td>
                    <td className="px-6 py-4">
                      {proj.funding_amount ? `$${proj.funding_amount}` : ""}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(proj)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(proj.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
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
                {editingId ? "Edit Project" : "Add Project"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="projForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none">
                      <option value="planned">Planned</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Funding Amount</label>
                    <input type="number" step="0.01" value={formData.funding_amount} onChange={e => setFormData({...formData, funding_amount: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" form="projForm" className="px-5 py-2.5 text-sm font-medium text-white bg-[#95111c] hover:bg-[#7a0e17] rounded-xl transition-colors">
                {editingId ? "Update Project" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
