import { useState, useEffect } from "react";
import axios from "axios";
import { HeartHandshake, Download } from "lucide-react";

interface Donation {
  id: number;
  reference: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
  completed_at: string | null;
}

export default function Donations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("/api/admin/donations");
      if (response.data.success) {
        setDonations(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (donations.length === 0) return;
    
    const headers = ["Reference,Donor Name,Donor Email,Amount,Method,Status,Date"];
    const rows = donations.map(d => 
      `${d.reference},"${d.donor_name}","${d.donor_email}",${d.amount},${d.payment_method},${d.payment_status},${new Date(d.created_at).toISOString()}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `donations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Donations History</h2>
          <p className="text-gray-600 mt-1">View all contributions to the clinic</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <HeartHandshake className="w-6 h-6" />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 p-4 border border-red-200 rounded-xl text-red-700 font-semibold">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#95111c]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Donor Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                      No donations found yet.
                    </td>
                  </tr>
                ) : (
                  donations.map((don) => (
                    <tr key={don.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                        {don.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{don.donor_name}</div>
                        <div className="text-xs text-gray-500">{don.donor_email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#95111c]">
                        ₦{don.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                        {don.payment_method?.replace("_", " ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          don.payment_status === "success" 
                            ? "bg-green-100 text-green-700" 
                            : don.payment_status === "failed" || don.payment_status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {don.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(don.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
