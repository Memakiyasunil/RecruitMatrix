import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Download, FileText, Building } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ClientPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emptyForm = {
    clientName: '', businessName: '', businessDomain: '', address: '', logo: '',
    website: '', email: '', mobile: '', gstNumber: '', panNumber: '',
    briefDescription: '', clientAbbreviation: '', interviewAddress: '', status: 'Active'
  };
  const [formData, setFormData] = useState(emptyForm);

  const fetchClients = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/clients');
      const data = await res.json();
      if (data.success) {
        setClients(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filtering
  const filteredClients = clients.filter(c => {
    const matchesSearch = c.clientName.toLowerCase().includes(search.toLowerCase()) || 
                          c.businessName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingClient(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (client) => {
    setEditingClient(client);
    setFormData({ ...client });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this client?')) {
      try {
        await fetch(`http://localhost:5000/api/v1/clients/${id}`, { method: 'DELETE' });
        fetchClients();
      } catch (error) {
        console.error("Failed to delete client:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingClient) {
        await fetch(`http://localhost:5000/api/v1/clients/${editingClient.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch(`http://localhost:5000/api/v1/clients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export functions
  const handleExportExcel = () => {
    const exportData = filteredClients.map(({id, logo, ...rest}) => rest); // exclude internal ID and logo blob
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clients");
    XLSX.writeFile(wb, "Clients_Export.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Clients List", 14, 15);
    
    const tableColumn = ["Abbrev", "Business Name", "Domain", "Email", "Mobile", "Status"];
    const tableRows = filteredClients.map(c => [
      c.clientAbbreviation, c.businessName, c.businessDomain, c.email, c.mobile, c.status
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("Clients_Export.pdf");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Setup</h1>
          <p className="text-sm text-gray-500 mt-1">Manage client profiles, domains, and contact details.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" onClick={handleExportExcel} className="text-green-700 hover:bg-green-50 border-green-200">
            <Download size={16} className="mr-2" /> Excel
          </Button>
          <Button variant="outline" onClick={handleExportPDF} className="text-red-700 hover:bg-red-50 border-red-200">
            <FileText size={16} className="mr-2" /> PDF
          </Button>
          <Button onClick={openAddModal}>
            <Plus size={18} className="mr-2" /> Add Client
          </Button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-[16px] shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-sm">
          <Input 
            icon={Search} 
            placeholder="Search clients..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="h-11 rounded-[16px] border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] w-full sm:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Client (Abbr)</th>
                <th className="px-6 py-4">Business Domain</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-10">Loading...</td></tr>
              ) : filteredClients.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No clients found.</td></tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <Building size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{client.businessName}</p>
                          <p className="text-gray-500 text-xs">{client.clientName} ({client.clientAbbreviation})</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{client.businessDomain}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{client.email}</p>
                      <p className="text-gray-500 text-xs">{client.mobile}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={client.status === 'Active' ? 'success' : 'danger'}>
                        {client.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(client)} className="p-2 text-gray-400 hover:text-[#4F46E5] hover:bg-[#4F46E5]/10 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(client.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
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

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingClient ? "Edit Client" : "Add New Client"}
        className="max-w-4xl" // Wider modal for many fields
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Full Name *</label>
              <Input required name="clientName" value={formData.clientName} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
              <Input required name="businessName" value={formData.businessName} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Domain</label>
              <Input name="businessDomain" value={formData.businessDomain} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Abbreviation</label>
              <Input name="clientAbbreviation" value={formData.clientAbbreviation} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <Input required type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <Input name="mobile" value={formData.mobile} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <Input name="website" value={formData.website} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
              <Input name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
              <Input name="panNumber" value={formData.panNumber} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                name="status"
                className="w-full h-11 rounded-[16px] border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Interview Address</label>
              <Input name="interviewAddress" value={formData.interviewAddress} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description</label>
              <textarea 
                name="briefDescription"
                className="w-full rounded-[16px] border border-gray-200 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                rows="3"
                value={formData.briefDescription}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {editingClient ? 'Save Changes' : 'Create Client'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
