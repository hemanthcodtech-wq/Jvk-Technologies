import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaQuoteRight, FaQuoteLeft, FaTrash, FaEdit, 
  FaTimes, FaBuilding, FaSearch, FaCheckCircle, FaBriefcase, FaMoneyBillWave
} from 'react-icons/fa';

const emptyTestimonial = { 
  name: '', 
  role: '', 
  company: '', 
  package: '', 
  content: '', 
  initials: '',
  imageUrl: '' 
};

const defaultTestimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Tata Consultancy Services",
    package: "₹7.2 LPA",
    initials: "RS",
    content: "The real-time Spring Boot microservices project helped me crack the TCS technical interview on my first attempt. The mentors explained internals that no college ever covered."
  },
  {
    name: "Sneha Reddy",
    role: "Associate Cloud Engineer",
    company: "Accenture",
    package: "₹6.8 LPA",
    initials: "SR",
    content: "Coming from a non-IT background, JVK's step-by-step practical labs, daily coding challenges, and mock interviews changed my career trajectory completely."
  },
  {
    name: "Vikram Naidu",
    role: "Full Stack Developer",
    company: "Cognizant",
    package: "₹8.5 LPA",
    initials: "VN",
    content: "Real production labs and GitHub reviews were the game changer. In the interview, I demonstrated my live deployed apps on AWS. I received 3 offers through JVK placement drives."
  }
];

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ ...emptyTestimonial });
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/hero-slides/upload`,
        uploadData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}`, 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data.success) {
        setFormData(prev => ({ ...prev, imageUrl: response.data.imageUrl }));
      }
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/settings`);
      if (response.data.success) {
        const loaded = response.data.data.testimonials;
        setTestimonials(loaded || []);
      }
    } catch (error) {
      setMessage('Unable to load testimonials.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (testimonial = null, index = null) => {
    if (testimonial !== null && index !== null) {
      setEditingIndex(index);
      setFormData({
        name: testimonial.name || '',
        role: testimonial.role || '',
        company: testimonial.company || '',
        package: testimonial.package || '',
        content: testimonial.content || '',
        initials: testimonial.initials || '',
        imageUrl: testimonial.imageUrl || ''
      });
    } else {
      setEditingIndex(null);
      setFormData({ ...emptyTestimonial });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
    setFormData({ ...emptyTestimonial });
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Auto-generate initials if left empty
    let initials = formData.initials.trim();
    if (!initials) {
      const words = formData.name.trim().split(' ');
      initials = words.map(w => w[0]).join('').slice(0, 2).toUpperCase();
    }

    const payload = { ...formData, initials };

    let updatedList;
    if (editingIndex !== null) {
      updatedList = testimonials.map((item, i) => i === editingIndex ? payload : item);
    } else {
      updatedList = [...testimonials, payload];
    }

    setTestimonials(updatedList);
    handleCloseModal();
    await saveTestimonialsToBackend(updatedList);
  };

  const handleDelete = async (index) => {
    const item = testimonials[index];
    if (!window.confirm(`Are you sure you want to remove the testimonial by ${item?.name || 'this student'}?`)) return;
    const updatedList = testimonials.filter((_, i) => i !== index);
    setTestimonials(updatedList);
    await saveTestimonialsToBackend(updatedList);
  };

  const saveTestimonialsToBackend = async (list) => {
    setSaving(true);
    setMessage('');
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/settings`,
        { testimonials: list },
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
      );
      setMessage('Testimonials updated successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error saving testimonials.');
    } finally {
      setSaving(false);
    }
  };

  const filteredTestimonials = testimonials.filter(t => {
    const query = searchTerm.toLowerCase();
    return (
      (t.name || '').toLowerCase().includes(query) ||
      (t.company || '').toLowerCase().includes(query) ||
      (t.role || '').toLowerCase().includes(query) ||
      (t.package || '').toLowerCase().includes(query) ||
      (t.content || '').toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8 font-inter">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FaQuoteRight size={12} />
            <span>Learner Reviews & Placements</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            Testimonials Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage student success stories, hiring packages, and corporate placement reviews.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_6px_20px_rgba(37,99,235,0.25)] transition-all flex items-center gap-2.5 w-max text-xs lg:text-sm cursor-pointer"
        >
          <FaPlus size={13} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {message && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/90 p-4 text-sm font-semibold text-blue-800 flex items-center gap-2.5 shadow-xs">
          <FaCheckCircle className="text-blue-600 text-base shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by student, company, package..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 shadow-xs"
          />
        </div>
        <div className="text-xs font-bold text-gray-500 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-xs w-full sm:w-auto text-center">
          Total Testimonials: <span className="text-blue-600">{testimonials.length}</span>
        </div>
      </div>

      {/* Cards Grid - Styled like CourseManagement */}
      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredTestimonials.map((t, index) => {
            const actualIndex = testimonials.indexOf(t);
            return (
              <motion.div
                key={actualIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/85 backdrop-blur-2xl rounded-[2.25rem] border border-white/90 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group p-6"
              >
                {/* Header section with Avatar and Student Info */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md shrink-0 overflow-hidden">
                      {t.imageUrl ? (
                        <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                      ) : (
                        t.initials || (t.name || 'ST').slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-black text-gray-900 leading-snug truncate group-hover:text-blue-600 transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500 truncate mt-0.5">
                        {t.role || 'Alumni'}
                      </p>
                    </div>
                  </div>

                  {/* Package Badge */}
                  {t.package && (
                    <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200/90 text-xs font-black shrink-0 shadow-2xs">
                      {t.package}
                    </span>
                  )}
                </div>

                {/* Company Tag */}
                <div className="mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center gap-2 text-xs">
                    <FaBuilding className="text-blue-600 shrink-0" size={13} />
                    <span className="font-bold text-blue-950 truncate">
                      {t.company || 'Not specified'}
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote Text */}
                <div className="relative flex-1 mb-6 bg-slate-50 p-4 rounded-2xl border border-gray-200/60">
                  <FaQuoteLeft className="text-blue-200 text-base mb-1.5 opacity-80" />
                  <p className="text-xs leading-relaxed text-gray-600 line-clamp-4 font-medium italic">
                    "{t.content || 'No testimonial content added yet.'}"
                  </p>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2.5 mt-auto">
                  <button
                    onClick={() => handleOpenModal(t, actualIndex)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FaEdit size={12} />
                    <span>Edit Review</span>
                  </button>

                  <button
                    onClick={() => handleDelete(actualIndex)}
                    className="py-2.5 px-3.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Delete Testimonial"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}

          {!filteredTestimonials.length && (
            <div className="col-span-full py-16 text-center rounded-3xl border-2 border-dashed border-gray-200 bg-white/50 p-8">
              <FaQuoteRight className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-600 font-bold text-base">No testimonials found</p>
              <p className="text-gray-400 text-xs mt-1">Click "Add Testimonial" to create your first placement success story.</p>
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
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <FaTimes />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  {editingIndex !== null ? 'Modify Story' : 'New Success Story'}
                </span>
                <h2 className="text-xl font-black text-gray-900">
                  {editingIndex !== null ? 'Edit Testimonial' : 'Create Testimonial'}
                </h2>
              </div>

              <form onSubmit={handleSaveModal} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Initials (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="e.g. RS"
                      value={formData.initials}
                      onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Profile Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/avatar.png"
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white mb-2"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer bg-white border border-gray-200 text-gray-700 text-xs font-bold py-2.5 px-4 rounded-xl text-center hover:bg-gray-50 transition-colors">
                      {uploadingImage ? 'Uploading...' : 'Upload Profile Photo'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                    </label>
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                      <img src={formData.imageUrl} alt="Profile preview" className="h-10 w-10 object-cover rounded-full shadow-xs border border-gray-300" onError={e => e.target.style.display = 'none'} />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Software Engineer"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tata Consultancy Services"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Package / Salary Offered
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹7.2 LPA or ₹10.5 LPA"
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Testimonial Review Story <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the training experience, mock interviews, and placement outcomes..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

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
                    {saving ? 'Saving...' : (editingIndex !== null ? 'Update Testimonial' : 'Create Testimonial')}
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

export default AdminTestimonials;
