import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaBuilding, FaTrash, FaEdit, FaTimes, 
  FaCheckCircle, FaGlobe, FaSearch, FaBriefcase, FaArrowUp, FaArrowDown
} from 'react-icons/fa';

const emptyLogo = { name: '', logoUrl: '' };

const suggestedPartners = [
  'TATA CONSULTANCY SERVICES', 'INFOSYS', 'WIPRO', 'COGNIZANT',
  'ACCENTURE', 'AMAZON', 'CAPGEMINI', 'TECH MAHINDRA',
  'HCL TECHNOLOGIES', 'DELOITTE', 'ORACLE', 'IBM'
];

const AdminClientLogos = () => {
  const [alumniLogos, setAlumniLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ ...emptyLogo });
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingLogo(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/hero-slides/upload`,
        uploadData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}`, 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data.success) {
        setFormData(prev => ({ ...prev, logoUrl: response.data.imageUrl }));
      }
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingLogo(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/settings`);
      if (response.data.success) {
        const loaded = response.data.data.alumniLogos;
        setAlumniLogos(loaded || []);
      }
    } catch (error) {
      setMessage('Unable to load client logos.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setFormData({ ...alumniLogos[index] });
    } else {
      setEditingIndex(null);
      setFormData({ ...emptyLogo });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
    setFormData({ ...emptyLogo });
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    let updatedList;
    if (editingIndex !== null) {
      updatedList = alumniLogos.map((item, i) => i === editingIndex ? { ...formData } : item);
    } else {
      updatedList = [...alumniLogos, { ...formData }];
    }

    setAlumniLogos(updatedList);
    handleCloseModal();
    await saveLogosToBackend(updatedList);
  };

  const handleDelete = async (index) => {
    if (!window.confirm(`Are you sure you want to remove ${alumniLogos[index]?.name || 'this logo'}?`)) return;
    const updatedList = alumniLogos.filter((_, i) => i !== index);
    setAlumniLogos(updatedList);
    await saveLogosToBackend(updatedList);
  };

  const handleQuickAdd = async (companyName) => {
    if (alumniLogos.some(l => l.name.toLowerCase() === companyName.toLowerCase())) return;
    const updatedList = [...alumniLogos, { name: companyName, logoUrl: '' }];
    setAlumniLogos(updatedList);
    await saveLogosToBackend(updatedList);
  };

  const saveLogosToBackend = async (logos) => {
    setSaving(true);
    setMessage('');
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/settings`,
        { alumniLogos: logos },
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
      );
      setMessage('Client logos saved successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error saving logos.');
    } finally {
      setSaving(false);
    }
  };

  const filteredLogos = alumniLogos.filter(logo => 
    (logo.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FaBuilding size={12} />
            <span>Hiring Partners & Corporate Network</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            Client & Alumni Logos
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage hiring partner company logos and client brand badges displayed in the corporate marquee.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_6px_20px_rgba(37,99,235,0.25)] transition-all flex items-center gap-2.5 w-max text-xs lg:text-sm cursor-pointer"
        >
          <FaPlus size={13} />
          <span>Add Company Logo</span>
        </button>
      </div>

      {message && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/90 p-4 text-sm font-semibold text-blue-800 flex items-center gap-2.5 shadow-xs">
          <FaCheckCircle className="text-blue-600 text-base shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Quick Add Presets Bar */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200/70 p-5 rounded-2xl shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
          Quick-Add Top Hiring MNCs
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedPartners.map((partner) => {
            const alreadyAdded = alumniLogos.some(l => l.name.toLowerCase() === partner.toLowerCase());
            return (
              <button
                key={partner}
                disabled={alreadyAdded || saving}
                onClick={() => handleQuickAdd(partner)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  alreadyAdded 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200/50' 
                    : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white cursor-pointer'
                }`}
              >
                <span>{alreadyAdded ? '✓' : '+'}</span>
                <span>{partner}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Counter Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 shadow-xs"
          />
        </div>
        <div className="text-xs font-bold text-gray-500 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-xs w-full sm:w-auto text-center">
          Total Companies: <span className="text-blue-600">{alumniLogos.length}</span>
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredLogos.map((logo, index) => {
            const actualIndex = alumniLogos.indexOf(logo);
            return (
              <motion.div
                key={actualIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/90 backdrop-blur-xl rounded-[1.75rem] border border-gray-200/80 p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Logo Preview Area */}
                <div className="h-28 w-full rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 mb-4 relative overflow-hidden group-hover:bg-blue-50/40 transition-colors">
                  {logo.logoUrl ? (
                    <img 
                      src={logo.logoUrl} 
                      alt={logo.name} 
                      className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-base shadow-xs mb-1">
                        {(logo.name || 'CO').slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logo Placeholder</span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-xs text-[10px] font-bold text-gray-400 border border-gray-100">
                    #{actualIndex + 1}
                  </div>
                </div>

                {/* Company Name */}
                <div className="mb-4">
                  <h3 className="font-extrabold text-gray-900 text-sm lg:text-base tracking-tight truncate group-hover:text-blue-600 transition-colors">
                    {logo.name}
                  </h3>
                  <p className="text-[11px] font-medium text-gray-400 truncate mt-0.5">
                    {logo.logoUrl ? logo.logoUrl : 'No image URL provided (uses monogram)'}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenModal(actualIndex)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FaEdit size={12} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(actualIndex)}
                    className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Delete Logo"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}

          {!filteredLogos.length && (
            <div className="col-span-full py-16 text-center rounded-3xl border-2 border-dashed border-gray-200 bg-white/50 p-8">
              <FaBuilding className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-600 font-bold text-base">No company logos found</p>
              <p className="text-gray-400 text-xs mt-1">Click "Add Company Logo" or use the quick-add buttons above to add partners.</p>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 relative"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <FaTimes />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  {editingIndex !== null ? 'Modify Partner' : 'New Corporate Partner'}
                </span>
                <h2 className="text-xl font-black text-gray-900">
                  {editingIndex !== null ? 'Edit Company Logo' : 'Add Company Logo'}
                </h2>
              </div>

              <form onSubmit={handleSaveModal} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Consultancy Services"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Logo Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/logo.png"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white mb-2"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer bg-white border border-gray-200 text-gray-700 text-xs font-bold py-2.5 px-4 rounded-xl text-center hover:bg-gray-50 transition-colors">
                      {uploadingLogo ? 'Uploading...' : 'Upload from Device'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
                    </label>
                  </div>
                </div>

                {formData.logoUrl && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase">Preview:</span>
                    <img 
                      src={formData.logoUrl} 
                      alt="Preview" 
                      className="h-8 max-w-[120px] object-contain"
                      onError={(e) => { e.target.style.opacity = '0.3'; }}
                    />
                  </div>
                )}

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-sm disabled:opacity-60 cursor-pointer"
                  >
                    {saving ? 'Saving...' : (editingIndex !== null ? 'Update Logo' : 'Add Logo')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminClientLogos;
