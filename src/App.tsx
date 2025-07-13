import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './components/Layout/DashboardLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentDashboard from './pages/Student/StudentDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import ParentDashboard from './pages/Parent/ParentDashboard';

// Student Pages
import Courses from './pages/Student/Courses';
import Progress from './pages/Student/Progress';
import Assignments from './pages/Student/Assignments';
import Calendar from './pages/Student/Calendar';
import AITutor from './pages/Student/AITutor';
import Leaderboard from './pages/Student/Leaderboard';

// Teacher Pages
import MyClasses from './pages/Teacher/MyClasses';

// Shared Pages
import Profile from './pages/Shared/Profile';
import Messages from './pages/Shared/Messages';
import Notifications from './pages/Shared/Notifications';
import Analytics from './pages/Teacher/Analytics';
import AIContent from './pages/Teacher/AIContent';
import CourseManagement from './pages/Teacher/CourseManagement';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/dashboard" element={getDashboardComponent()} />
        
        {/* Shared Routes */}
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/messages" element={<Messages />} /> */}
        <Route path="/notifications" element={<Notifications />} />
        {/* <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings (Coming Soon)</h1></div>} /> */}
        
        {/* Student Routes */}
        {user?.role === 'student' && (
          <>
            <Route path="/courses" element={<Courses />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </>
        )}
        
        {/* Teacher Routes */}
        {user?.role === 'teacher' && (
          <>
            <Route path="/my-classes" element={<MyClasses />} />
            <Route path="/course-management" element={<CourseManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-content" element={<AIContent />} />
          </>
        )}
        
        {/* Parent Routes */}
        {user?.role === 'parent' && (
          <>
            <Route path="/child-progress" element={<div className="p-6"><h1 className="text-2xl font-bold">Child Progress (Coming Soon)</h1></div>} />
            <Route path="/attendance" element={<div className="p-6"><h1 className="text-2xl font-bold">Attendance (Coming Soon)</h1></div>} />
            <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports (Coming Soon)</h1></div>} />
            <Route path="/teacher-communication" element={<div className="p-6"><h1 className="text-2xl font-bold">Teacher Communication (Coming Soon)</h1></div>} />
          </>
        )}
        
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </DashboardLayout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;