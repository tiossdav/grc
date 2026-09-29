import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface BoardMember {
  id: number;
  name: string;
  role: string;
  image_url: string;
  bio: string;
  expertise: string[];
  affiliation: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export default function BoardMembers() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "Board Member",
    image_url: "",
    bio: "",
    expertise: "",
    affiliation: "",
    is_active: true,
    display_order: 0
  });

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/admin/board-members");
      if (response.data.success) {
        setMembers(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch board members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "Board Member",
      image_url: "",
      bio: "",
      expertise: "",
      affiliation: "",
      is_active: true,
      display_order: 0
    });
    setShowModal(true);
  };

  const openEditModal = (member: BoardMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role || "Board Member",
      image_url: member.image_url || "",
      bio: member.bio || "",
      expertise: member.expertise ? member.expertise.join(", ") : "",
      affiliation: member.affiliation || "",
      is_active: member.is_active,
      display_order: member.display_order || 0
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this board member?")) return;
    try {
      await axios.delete(`/api/admin/board-members/${id}`);
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete board member");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        expertise: formData.expertise.split(",").map(s => s.trim()).filter(s => s)
      };

      if (editingId) {
        await axios.put(`/api/admin/board-members/${editingId}`, payload);
      } else {
        await axios.post("/api/admin/board-members", payload);
      }
      setShowModal(false);
      fetchMembers();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save board member");
    }
  };

  if (loading) return <div className="p-8">Loading board members...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Board Members</h2>
          <p className="text-gray-500 text-sm mt-1">Manage the Board of Directors shown on the About page</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#95111c] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#7a0e17] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Affiliation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No board members found. Add one to get started.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      <div className="flex items-center gap-3">
                        {member.image_url ? (
                          <img src={member.image_url} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">
                            {member.name.charAt(0)}
                          </div>
                        )}
                        {member.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">{member.role}</td>
                    <td className="px-6 py-4">{member.affiliation}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        member.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(member)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
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
                {editingId ? "Edit Board Member" : "Add Board Member"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="boardMemberForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
                    <input type="text" value={formData.affiliation} onChange={e => setFormData({...formData, affiliation: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Cloudinary link)</label>
                    <input type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea rows={4} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all"></textarea>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expertise (Comma separated)</label>
                    <input type="text" value={formData.expertise} onChange={e => setFormData({...formData, expertise: e.target.value})} placeholder="e.g. Linguistics, Language Policy" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={formData.is_active ? "true" : "false"} onChange={e => setFormData({...formData, is_active: e.target.value === "true"})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all">
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none transition-all" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" form="boardMemberForm" className="px-5 py-2.5 text-sm font-medium text-white bg-[#95111c] hover:bg-[#7a0e17] rounded-xl transition-colors">
                {editingId ? "Update Member" : "Create Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
