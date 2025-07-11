// src/api/api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Axios instance with optional interceptors
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// You can also set Authorization header here automatically if storing token in localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------------- Auth -------------------

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
}) => {
  const res = await apiClient.post('/auth/register', data);
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
  role: 'student' | 'teacher';
}) => {
  const res = await apiClient.post('/auth/login', data);
  return res.data;
};

export const verifyToken = async () => {
  const res = await apiClient.get('/auth/verify');
  return res.data;
};

// ------------------- Users -------------------

export const getProfile = async () => {
  const res = await apiClient.get('/users/profile');
  return res.data;
};

export const updateProfile = async (data: {
  name?: string;
  preferences?: Record<string, any>;
}) => {
  const res = await apiClient.put('/users/profile', data);
  return res.data;
};

export const getStudents = async () => {
  const res = await apiClient.get('/users/students');
  return res.data;
};

// ------------------- Courses -------------------

export const getCourses = async () => {
  const res = await apiClient.get('/courses');
  return res.data;
};

export const createCourse = async (data: {
  title: string;
  description: string;
}) => {
  const res = await apiClient.post('/courses', data);
  return res.data;
};

export const getCourseById = async (id: string) => {
  const res = await apiClient.get(`/courses/${id}`);
  return res.data;
};

// ------------------- AI -------------------

export const chatWithAI = async (_inputMessage: string, _selectedSubject: string, data: {
  message: string;
  subject?: string;
  context?: string;
}) => {
  const res = await apiClient.post('/ai/chat', data);
  return res.data;
};

export const generateContent = async (data: {
  topic: string;
  difficulty: string;
  contentType: string;
  targetAudience: string;
}) => {
  const res = await apiClient.post('/ai/generate-content', data);
  return res.data;
};

export const analyzePerformance = async (data: {
  studentData: any;
  subject: string;
}) => {
  const res = await apiClient.post('/ai/analyze-performance', data);
  return res.data;
};

// ------------------- Health -------------------

export const healthCheck = async () => {
  const res = await apiClient.get('/health');
  return res.data;
};

export const getAllStudents = async () => {
  const res = await apiClient.get('/users/students');
  return res.data;
};

export const getMyProfile = async () => {
  const res = await apiClient.get('/users/profile');
  return res.data;
};

export const getAllCourses = async () => {
  const res = await apiClient.get('/courses');
  return res.data;
};

export const submitAssignment = async (courseId:any, assignmentId:any) => {
  const res = await apiClient.post(`/courses/${courseId}/assignments/${assignmentId}/submit`);
  return res.data;
};

export const addStudentToCourse = async (courseId:any, studentId:any) => {
  const res=await apiClient.post(`/courses/${courseId}/add-student`, { studentId });
  return res.data;
};

export const addAssignmentToCourse = async (courseId:any, assignment:any) => {
  const res=await apiClient.post(`/courses/${courseId}/add-assignment`, assignment);
  return res.data;
};