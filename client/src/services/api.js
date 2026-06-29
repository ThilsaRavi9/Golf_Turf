import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Services
export const getServices = (category) =>
  api.get('/services', { params: category ? { category } : {} }).then(r => r.data);

export const getService = (id) =>
  api.get(`/services/${id}`).then(r => r.data);

export const createService = (data) =>
  api.post('/services', data).then(r => r.data);

export const updateService = (id, data) =>
  api.put(`/services/${id}`, data).then(r => r.data);

export const deleteService = (id) =>
  api.delete(`/services/${id}`).then(r => r.data);

// Blogs
export const getBlogs = () =>
  api.get('/blogs').then(r => r.data);

export const getBlog = (id) =>
  api.get(`/blogs/${id}`).then(r => r.data);

export const createBlog = (data) =>
  api.post('/blogs', data).then(r => r.data);

export const updateBlog = (id, data) =>
  api.put(`/blogs/${id}`, data).then(r => r.data);

export const deleteBlog = (id) =>
  api.delete(`/blogs/${id}`).then(r => r.data);

// Courses
export const getCourses = () =>
  api.get('/courses').then(r => r.data);

export const getCourse = (id) =>
  api.get(`/courses/${id}`).then(r => r.data);

export const createCourse = (data) =>
  api.post('/courses', data).then(r => r.data);

export const updateCourse = (id, data) =>
  api.put(`/courses/${id}`, data).then(r => r.data);

export const deleteCourse = (id) =>
  api.delete(`/courses/${id}`).then(r => r.data);

// Newsletter
export const subscribeNewsletter = (email) =>
  api.post('/newsletter', { email }).then(r => r.data);

export const getSubscribers = () =>
  api.get('/newsletter').then(r => r.data);

export const deleteSubscriber = (id) =>
  api.delete(`/newsletter/${id}`).then(r => r.data);

// Gallery
export const getGallery = () =>
  api.get('/gallery').then(r => r.data);

// Testimonials
export const getTestimonials = () =>
  api.get('/testimonials').then(r => r.data);

// Contact
export const submitContact = (data) =>
  api.post('/contact', data).then(r => r.data);

export const getContacts = () =>
  api.get('/contact').then(r => r.data);

export default api;
