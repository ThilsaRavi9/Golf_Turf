import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiGrid,
  FiBookOpen,
  FiAward,
  FiMail,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { pageTransition, fadeInUp } from '../../animations/variants';
import {
  getServices,
  createService,
  updateService,
  deleteService,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getSubscribers,
  deleteSubscriber
} from '../../services/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Form states
  const [serviceForm, setServiceForm] = useState({ id: null, title: '', description: '', image: '', category: 'Coaching' });
  const [blogForm, setBlogForm] = useState({ id: null, title: '', description: '', image: '', author: '' });
  const [courseForm, setCourseForm] = useState({ id: null, name: '', duration: '', price: '', image: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Stats
  const [stats, setStats] = useState({ services: 0, blogs: 0, courses: 0, subscribers: 0 });

  const fetchData = async () => {
    try {
      const [sData, bData, cData, subData] = await Promise.all([
        getServices().catch(() => []),
        getBlogs().catch(() => []),
        getCourses().catch(() => []),
        getSubscribers().catch(() => [])
      ]);
      setServices(sData);
      setBlogs(bData);
      setCourses(cData);
      setSubscribers(subData);
      setStats({
        services: sData.length,
        blogs: bData.length,
        courses: cData.length,
        subscribers: subData.length
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Services CRUD
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateService(serviceForm.id, serviceForm);
      } else {
        await createService(serviceForm);
      }
      resetServiceForm();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleServiceEdit = (item) => {
    setServiceForm(item);
    setIsEditing(true);
  };

  const handleServiceDelete = async (id) => {
    if (window.confirm('Delete this service?')) {
      try {
        await deleteService(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const resetServiceForm = () => {
    setServiceForm({ id: null, title: '', description: '', image: '', category: 'Coaching' });
    setIsEditing(false);
  };

  // Blogs CRUD
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateBlog(blogForm.id, blogForm);
      } else {
        await createBlog(blogForm);
      }
      resetBlogForm();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlogEdit = (item) => {
    setBlogForm(item);
    setIsEditing(true);
  };

  const handleBlogDelete = async (id) => {
    if (window.confirm('Delete this blog post?')) {
      try {
        await deleteBlog(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const resetBlogForm = () => {
    setBlogForm({ id: null, title: '', description: '', image: '', author: '' });
    setIsEditing(false);
  };

  // Courses CRUD
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...courseForm, price: parseFloat(courseForm.price) };
      if (isEditing) {
        await updateCourse(courseForm.id, payload);
      } else {
        await createCourse(payload);
      }
      resetCourseForm();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCourseEdit = (item) => {
    setCourseForm(item);
    setIsEditing(true);
  };

  const handleCourseDelete = async (id) => {
    if (window.confirm('Delete this course?')) {
      try {
        await deleteCourse(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const resetCourseForm = () => {
    setCourseForm({ id: null, name: '', duration: '', price: '', image: '', description: '' });
    setIsEditing(false);
  };

  // Newsletter Remove
  const handleSubscriberDelete = async (id) => {
    if (window.confirm('Remove subscriber?')) {
      try {
        await deleteSubscriber(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <motion.main {...pageTransition} className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold font-[Poppins] text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase">Services</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.services}</h3>
            </div>
            <FiGrid className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase">Blogs</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.blogs}</h3>
            </div>
            <FiBookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase">Courses</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.courses}</h3>
            </div>
            <FiAward className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase">Subscribers</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.subscribers}</h3>
            </div>
            <FiMail className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
          {['services', 'blogs', 'courses', 'subscribers'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setIsEditing(false); }}
              className={`px-6 py-3.5 text-sm font-semibold capitalize border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'border-green-600 text-green-700 dark:text-green-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Services Tab --- */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card h-fit">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                {isEditing ? 'Edit Service' : 'Add Service'}
              </h3>
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                  <textarea
                    rows={4}
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                  <input
                    type="text"
                    value={serviceForm.image}
                    onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  >
                    <option value="Membership">Membership</option>
                    <option value="Training">Training</option>
                    <option value="Coaching">Coaching</option>
                    <option value="Tournaments">Tournaments</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-3 bg-green-800 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors">
                    {isEditing ? 'Save Changes' : 'Create'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetServiceForm} className="p-3 bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition-colors">
                      <FiX />
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {services.map((item) => (
                <div key={item.id} className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-card flex gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.title}</h4>
                      <p className="text-xs text-green-700 dark:text-green-400 font-semibold">{item.category}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleServiceEdit(item)} className="p-2 bg-gray-50 dark:bg-dark-surface hover:bg-green-50 dark:hover:bg-green-950 text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 rounded-lg transition-colors">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleServiceDelete(item.id)} className="p-2 bg-gray-50 dark:bg-dark-surface hover:bg-red-50 dark:hover:bg-red-950 text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-400 rounded-lg transition-colors">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Blogs Tab --- */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card h-fit">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                {isEditing ? 'Edit Blog Post' : 'Add Blog Post'}
              </h3>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                  <textarea
                    rows={4}
                    value={blogForm.description}
                    onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                  <input
                    type="text"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-3 bg-green-800 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors">
                    {isEditing ? 'Save Changes' : 'Create'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetBlogForm} className="p-3 bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition-colors">
                      <FiX />
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {blogs.map((item) => (
                <div key={item.id} className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-card flex gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.title}</h4>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleBlogEdit(item)} className="p-2 bg-gray-50 dark:bg-dark-surface hover:bg-green-50 dark:hover:bg-green-950 text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 rounded-lg transition-colors">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleBlogDelete(item.id)} className="p-2 bg-gray-50 dark:bg-dark-surface hover:bg-red-50 dark:hover:bg-red-950 text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-400 rounded-lg transition-colors">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Courses Tab --- */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card h-fit">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                {isEditing ? 'Edit Course' : 'Add Course'}
              </h3>
              <form onSubmit={handleCourseSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                  <input
                    type="text"
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Duration</label>
                    <input
                      type="text"
                      value={courseForm.duration}
                      placeholder="e.g. 4 Weeks"
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      required
                      className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                      required
                      className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                  <textarea
                    rows={3}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                  <input
                    type="text"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    required
                    className="w-full mt-1.5 p-3 text-sm rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-3 bg-green-800 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors">
                    {isEditing ? 'Save Changes' : 'Create'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetCourseForm} className="p-3 bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition-colors">
                      <FiX />
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {courses.map((item) => (
                <div key={item.id} className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-card flex gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.name}</h4>
                      <p className="text-xs text-green-700 dark:text-green-400 font-semibold">{item.duration} • ${item.price}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleCourseEdit(item)} className="p-2 bg-gray-50 dark:bg-dark-surface hover:bg-green-50 dark:hover:bg-green-950 text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 rounded-lg transition-colors">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleCourseDelete(item.id)} className="p-2 bg-gray-50 dark:bg-dark-surface hover:bg-red-50 dark:hover:bg-red-950 text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-400 rounded-lg transition-colors">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Newsletter Subscribers Tab --- */}
        {activeTab === 'subscribers' && (
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-card overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-surface text-xs font-bold text-gray-400 uppercase">
                  <th className="p-5">Subscriber Email</th>
                  <th className="p-5">Joined Date</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm text-gray-700 dark:text-gray-300">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-surface/50 transition-colors">
                    <td className="p-5 font-semibold text-gray-900 dark:text-white">{sub.email}</td>
                    <td className="p-5 text-gray-400">
                      {new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => handleSubscriberDelete(sub.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-655 dark:text-red-400 rounded-lg transition-all"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {subscribers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-400">No newsletter subscribers yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.main>
  );
}
