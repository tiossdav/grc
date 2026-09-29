import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Publication {
  id: number;
  title: string;
  abstract: string | null;
  publication_type: string;
  journal_name: string | null;
  publication_date: string | null;
  doi: string | null;
  url: string | null;
}

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    publication_type: "journal_article",
    journal_name: "",
    publication_date: "",
    doi: "",
    url: ""
  });

  const fetchPublications = async () => {
    try {
      const response = await axios.get("/api/admin/publications");
      if (response.data.success) {
        setPublications(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch publications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      abstract: "",
      publication_type: "journal_article",
      journal_name: "",
      publication_date: "",
      doi: "",
      url: ""
    });
    setShowModal(true);
  };

  const openEditModal = (pub: Publication) => {
    setEditingId(pub.id);
    setFormData({
      title: pub.title,
      abstract: pub.abstract || "",
      publication_type: pub.publication_type,
      journal_name: pub.journal_name || "",
      publication_date: pub.publication_date ? pub.publication_date.split('T')[0] : "",
      doi: pub.doi || "",
      url: pub.url || ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this publication?")) return;
    try {
      await axios.delete(`/api/admin/publications/${id}`);
      fetchPublications();
    } catch (err) {
      console.error(err);
      alert("Failed to delete publication");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/admin/publications/${editingId}`, formData);
      } else {
        await axios.post("/api/admin/publications", formData);
      }
      setShowModal(false);
      fetchPublications();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save publication");
    }
  };

  if (loading) return <div className="p-8">Loading publications...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Publications</h2>
          <p className="text-gray-500 text-sm mt-1">Manage research publications, articles, and resources</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#95111c] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#7a0e17] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Publication
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Journal/Source</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {publications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No publications found.
                  </td>
                </tr>
              ) : (
                publications.map((pub) => (
                  <tr key={pub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{pub.title}</td>
                    <td className="px-6 py-4 capitalize">{pub.publication_type.replace("_", " ")}</td>
                    <td className="px-6 py-4">{pub.journal_name}</td>
                    <td className="px-6 py-4">
                      {pub.publication_date ? new Date(pub.publication_date).toLocaleDateString() : ""}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(pub)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(pub.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
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
                {editingId ? "Edit Publication" : "Add Publication"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="pubForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Abstract / Description</label>
                    <textarea rows={4} value={formData.abstract} onChange={e => setFormData({...formData, abstract: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select value={formData.publication_type} onChange={e => setFormData({...formData, publication_type: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none">
                      <option value="journal_article">Journal Article</option>
                      <option value="conference_paper">Conference Paper</option>
                      <option value="book_chapter">Book Chapter</option>
                      <option value="book">Book</option>
                      <option value="thesis">Thesis</option>
                      <option value="report">Report</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Journal/Source Name</label>
                    <input type="text" value={formData.journal_name} onChange={e => setFormData({...formData, journal_name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                    <input type="date" value={formData.publication_date} onChange={e => setFormData({...formData, publication_date: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                    <input type="text" value={formData.doi} onChange={e => setFormData({...formData, doi: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL (Read more link)</label>
                    <input type="url" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#95111c]/20 focus:border-[#95111c] outline-none" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" form="pubForm" className="px-5 py-2.5 text-sm font-medium text-white bg-[#95111c] hover:bg-[#7a0e17] rounded-xl transition-colors">
                {editingId ? "Update Publication" : "Create Publication"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
